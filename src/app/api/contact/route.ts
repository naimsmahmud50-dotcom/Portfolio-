import { NextRequest, NextResponse } from "next/server";
import { validateContactSubmission } from "@/utils/contact-validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateContactSubmission(body);

    if (!result.valid || !result.sanitized) {
      return NextResponse.json({ error: result.error || "Invalid submission" }, { status: 400 });
    }

    const sanitizedData = result.sanitized;

    // 3. Mode B: WhatsApp Business Cloud API Integration (Section 18)
    // Server-side architecture ready for environment variables
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
        // Log on server only, never crash client response
        console.error("WhatsApp Cloud API notification error:", waErr);
      }
    }

    // Return clean success state (Section 40)
    return NextResponse.json(
      {
        success: true,
        message: "Message received. Thank you — I'll get back to you as soon as possible.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please use direct email or WhatsApp." },
      { status: 500 }
    );
  }
}
