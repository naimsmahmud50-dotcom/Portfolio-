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

    // 5. Automated Multi-Tier Email & Notification Dispatch Engine
    const targetEmail = process.env.NOTIFICATION_EMAIL || "naimsmahmud50@gmail.com";
    let emailDispatched = false;

    // Route A: Resend API (if RESEND_API_KEY is configured in Vercel or environment)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [targetEmail],
            reply_to: sanitizedData.email,
            subject: `[Portfolio Inquiry] ${sanitizedData.subject} - from ${sanitizedData.name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; color: #0f172a;">
                <h2 style="color: #0284c7; margin-top: 0;">📬 New Portfolio Client Inquiry</h2>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <p><strong>Client Name:</strong> ${sanitizedData.name}</p>
                <p><strong>Email Address:</strong> <a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></p>
                <p><strong>Service Type:</strong> ${sanitizedData.serviceType}</p>
                <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; margin-top: 16px; border: 1px solid #e2e8f0;">
                  <strong style="display: block; margin-bottom: 8px; color: #334155;">Message Content:</strong>
                  <p style="white-space: pre-wrap; margin: 0; color: #0f172a; line-height: 1.6;">${sanitizedData.message}</p>
                </div>
                <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Dispatched from Mahmud Hasan's Portfolio Sentinel.</p>
              </div>
            `,
          }),
        });

        if (resendRes.ok) {
          emailDispatched = true;
        } else {
          console.warn("Resend API dispatch failed with status:", resendRes.status);
        }
      } catch (resendErr) {
        console.error("Resend API dispatch error:", resendErr);
      }
    }

    // Route B: Autonomous Zero-Config Direct HTTP Forwarding (FormSubmit AJAX Transport)
    // Ensures leads reach naimsmahmud50@gmail.com even without any third-party API keys configured!
    if (!emailDispatched) {
      try {
        const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: sanitizedData.name,
            email: sanitizedData.email,
            _replyto: sanitizedData.email,
            serviceType: sanitizedData.serviceType,
            _subject: `[Portfolio Lead] ${sanitizedData.subject} (from ${sanitizedData.name})`,
            message: sanitizedData.message,
            _template: "table",
            _captcha: "false",
          }),
        });

        if (formSubmitRes.ok) {
          emailDispatched = true;
        } else {
          console.warn("FormSubmit dispatch warning:", await formSubmitRes.text());
        }
      } catch (fsErr) {
        console.error("FormSubmit transport error:", fsErr);
      }
    }

    // Route C: WhatsApp Business Cloud API Integration (Optional Webhook Notification)
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
