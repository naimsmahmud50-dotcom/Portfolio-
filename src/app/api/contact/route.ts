import { NextRequest, NextResponse } from "next/server";
import { parseContactSubmission } from "@/utils/contact-schema";
import { checkRateLimit } from "@/utils/rate-limiter";

const MAX_PAYLOAD_BYTES = 10 * 1024; // 10 Kilobytes maximum payload guard

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction for Rate Limiting & Audit Logging
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    // 2. Sliding-Window Rate Limiter Guard (5 submissions per 10 minutes)
    const rateLimit = checkRateLimit(clientIp, {
      windowMs: 10 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a few minutes before submitting another message.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.retryAfterSeconds),
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          },
        }
      );
    }

    // 3. Request Body Size Guard (DoS & Buffer Overflow Defense)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        { error: "Payload too large. Maximum submission size is 10 KB." },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed request payload. JSON body is required." },
        { status: 400 }
      );
    }

    // 4. Strict Runtime Schema Validation with Zod
    const validation = parseContactSubmission(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        {
          error: validation.firstError || "Invalid submission parameters",
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const sanitizedData = validation.data;

    // 5. WhatsApp Business Cloud API Integration (Optional Webhook Notification)
    const whatsappToken = process.env.WHATSAPP_CLOUD_API_TOKEN;
    const whatsappPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const whatsappRecipient = process.env.WHATSAPP_RECIPIENT_PHONE || "8801767850859";

    if (whatsappToken && whatsappPhoneId) {
      try {
        await fetch(`https://graph.facebook.com/v19.0/${whatsappPhoneId}/messages`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${whatsappToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: whatsappRecipient,
            type: "text",
            text: {
              body: `📬 Portfolio Lead from ${sanitizedData.name} (${sanitizedData.email})\nTopic: ${sanitizedData.subject}\nType: ${sanitizedData.serviceType}\nMessage: ${sanitizedData.message}`,
            },
          }),
        });
      } catch (waErr) {
        // Log on server only, never expose internal WhatsApp API failures to client
        console.error("WhatsApp Cloud API notification error:", waErr);
      }
    }

    // 6. Return Clean Enterprise Response with Rate-Limit Telemetry
    return NextResponse.json(
      {
        success: true,
        message: "Message received. Thank you — I'll get back to you as soon as possible.",
      },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      }
    );
  } catch (error) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please reach out directly via email or WhatsApp." },
      { status: 500 }
    );
  }
}
