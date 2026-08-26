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
  // In Resend free mode without a custom verified domain, from MUST be onboarding@resend.dev
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const emailBodyText = `
New Legal Consultation Request
---------------------------------------
Attorney: Mulualem Demissie Zerihun
Office: Lideta Sub-City, Merkato Mall, 1st Floor, Office No. 134, Addis Ababa

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

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Mulualem Law Office <${fromEmail}>`,
          to: [firmEmail],
          reply_to: email,
          subject: `[New Legal Inquiry] ${practiceArea} - ${name}`,
          text: emailBodyText,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Resend API Error details:", data);
        return false;
      }

      console.log("Email notification sent successfully:", data);
      return true;
    } catch (err) {
      console.error("Email notification dispatch exception:", err);
      return false;
    }
  }

  // Fallback logging in local dev
  console.log("=== [EMAIL NOTIFICATION DISPATCHED] ===");
  console.log(`To: ${firmEmail}`);
  console.log(`Subject: [New Legal Inquiry] ${practiceArea} - ${name}`);
  console.log(emailBodyText);
  console.log("========================================");

  return true;
}
