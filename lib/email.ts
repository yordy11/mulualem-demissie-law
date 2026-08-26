interface SendConsultationEmailParams {
  name: string;
  email: string;
  phone?: string;
  practiceArea: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
}

export async function sendConsultationNotification({
  name,
  email,
  phone,
  practiceArea,
  preferredDate,
  preferredTime,
  message,
}: SendConsultationEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  const firmEmail = process.env.FIRM_NOTIFICATION_EMAIL || "mulualemdm66@gmail.com";

  const emailBodyText = `
New Legal Consultation Request
---------------------------------------
Attorney: Mulualem Demissie Zerihun
Office: Lideta Sub-City, Merkato Mall, Office No. 134, Addis Ababa

Client Details:
- Full Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Practice Area: ${practiceArea}
- Preferred Date: ${preferredDate || "Flexible"}
- Preferred Time: ${preferredTime || "Flexible"}

Matter Overview:
${message || "No additional notes provided."}

---------------------------------------
Submitted via Mulualem Demissie Zerihun Law Portal
  `.trim();

  // If Resend API key is provided, send real live email
  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Mulualem Demissie Law <inquiries@demissielaw.com>",
          to: [firmEmail],
          subject: `[New Inquiry] ${practiceArea} - ${name}`,
          text: emailBodyText,
        }),
      });

      return res.ok;
    } catch (err) {
      console.error("Email notification dispatch error:", err);
      return false;
    }
  }

  // Log notification to server console in local development
  console.log("=== [EMAIL NOTIFICATION DISPATCHED] ===");
  console.log(`To: ${firmEmail}`);
  console.log(`Subject: [New Inquiry] ${practiceArea} - ${name}`);
  console.log(emailBodyText);
  console.log("========================================");

  return true;
}
