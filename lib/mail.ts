import nodemailer from "nodemailer";

/**
 * Gmail SMTP Mailer for Muhammadi Studio
 *
 * Uses Google's secure SMTP server (smtp.gmail.com).
 * Required environment variables:
 *   - GMAIL_USER: Your full Gmail address (e.g. studio@gmail.com)
 *   - GMAIL_APP_PASSWORD: 16-character Google App Password (not your standard account password)
 *   - NOTIFICATION_RECIPIENT: (Optional) Email where new leads & bookings should be delivered
 */

interface SendMailResult {
  success: boolean;
  simulated: boolean;
  message: string;
  messageId?: string;
  error?: string;
}

export function getMailConfig() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || "";
  const pass = (process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || "").replace(/\s+/g, "");
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = port === 465;
  const fromName = process.env.SMTP_FROM_NAME || "Muhammadi Studio";
  const recipient =
    process.env.NOTIFICATION_RECIPIENT || user || "contact@muhammadistudio.com";

  const isConfigured = Boolean(user && pass);

  return {
    user,
    pass,
    host,
    port,
    secure,
    fromName,
    recipient,
    isConfigured,
  };
}

export function createGmailTransporter() {
  const config = getMailConfig();

  if (!config.isConfigured) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

/**
 * Generates brand HTML wrapper with dark theme & gold accent
 */
function brandHtmlWrapper(title: string, bodyContent: string) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body { margin: 0; padding: 0; background-color: #0B0B0B; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F5F5F5; }
      .container { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #272727; border-radius: 16px; overflow: hidden; }
      .header { padding: 32px 24px; text-align: center; background: linear-gradient(180deg, #181818 0%, #121212 100%); border-bottom: 1px solid #272727; }
      .logo-title { font-size: 22px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; margin: 0; }
      .logo-gold { color: #C9A227; }
      .logo-subtitle { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #A1A1AA; margin-top: 6px; }
      .content { padding: 32px 24px; }
      .heading { font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0; }
      .field-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
      .field-table td { padding: 12px 14px; border-bottom: 1px solid #222222; font-size: 14px; }
      .field-label { color: #A1A1AA; width: 35%; font-weight: 500; }
      .field-value { color: #FFFFFF; font-weight: 600; }
      .badge { display: inline-block; padding: 4px 10px; border-radius: 9999px; background: rgba(201, 162, 39, 0.15); border: 1px solid rgba(201, 162, 39, 0.4); color: #C9A227; font-size: 12px; font-weight: 600; }
      .message-box { background: #181818; border-left: 3px solid #C9A227; padding: 16px; border-radius: 8px; margin: 20px 0; font-size: 14px; line-height: 1.6; color: #E4E4E7; }
      .footer { padding: 24px; text-align: center; border-top: 1px solid #222222; font-size: 12px; color: #71717A; background-color: #0E0E0E; }
      .footer a { color: #C9A227; text-decoration: none; }
    </style>
  </head>
  <body>
    <div style="padding: 24px 12px;">
      <div class="container">
        <div class="header">
          <h1 class="logo-title">Muhammadi <span class="logo-gold">Studio</span></h1>
          <div class="logo-subtitle">Cinematography &amp; Photography · Co-Founder: Attiq Butt</div>
        </div>
        <div class="content">
          ${bodyContent}
        </div>
        <div class="footer">
          <p style="margin: 0 0 6px 0;">Muhammadi Studio · Studio 4, Media City, Downtown Art District</p>
          <p style="margin: 0;">Phone &amp; WhatsApp: +1 (555) 840-7890 · <a href="https://muhammadistudio.com">muhammadistudio.com</a></p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Send Contact Inquiry notification to studio admin and acknowledgment to client
 */
export async function sendContactNotification({
  name,
  email,
  topic,
  message,
}: {
  name: string;
  email: string;
  topic?: string;
  message: string;
}): Promise<SendMailResult> {
  const config = getMailConfig();

  // If credentials are not yet configured in environment variables, simulate gracefully
  if (!config.isConfigured) {
    console.log("------------------------------------------------------------");
    console.log("📨 [GMAIL SMTP NOTIFICATION — SIMULATED MODE]");
    console.log(`To Studio: ${config.recipient}`);
    console.log(`From Client: ${name} <${email}>`);
    console.log(`Topic: ${topic || "General Inquiry"}`);
    console.log(`Message: ${message}`);
    console.log("💡 To send real emails via Gmail SMTP, set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local");
    console.log("------------------------------------------------------------");

    return {
      success: true,
      simulated: true,
      message:
        "Inquiry received successfully! (Gmail SMTP simulated: configure GMAIL_USER and GMAIL_APP_PASSWORD in .env.local to dispatch real emails).",
    };
  }

  try {
    const transporter = createGmailTransporter()!;

    // 1. Email to Studio (Admin Notification)
    const adminHtml = brandHtmlWrapper(
      `New Inquiry from ${name}`,
      `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 class="heading" style="margin: 0;">New Studio Inquiry 📩</h2>
        <span class="badge">New Lead</span>
      </div>
      <p style="color: #A1A1AA; font-size: 14px; margin: 0 0 16px 0;">
        A new inquiry has been submitted via the Muhammadi Studio website contact form:
      </p>
      <table class="field-table">
        <tr>
          <td class="field-label">Client Name</td>
          <td class="field-value">${name}</td>
        </tr>
        <tr>
          <td class="field-label">Email Address</td>
          <td class="field-value"><a href="mailto:${email}" style="color: #C9A227;">${email}</a></td>
        </tr>
        <tr>
          <td class="field-label">Selected Topic</td>
          <td class="field-value">${topic || "General Inquiry"}</td>
        </tr>
      </table>
      <p style="font-size: 13px; font-weight: 600; color: #C9A227; text-transform: uppercase; margin: 20px 0 8px 0; letter-spacing: 1px;">Client Message:</p>
      <div class="message-box">
        ${message.replace(/\n/g, "<br>")}
      </div>
      <p style="font-size: 12px; color: #71717A; margin-top: 24px;">
        Hit 'Reply' directly in your email client to respond to ${name}.
      </p>
      `
    );

    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to: config.recipient,
      replyTo: email,
      subject: `[Muhammadi Studio Lead] ${name} — ${topic || "New Inquiry"}`,
      html: adminHtml,
    });

    // 2. Confirmation email to the client
    const clientHtml = brandHtmlWrapper(
      "Thank you for contacting Muhammadi Studio",
      `
      <h2 class="heading">Thank you, ${name}!</h2>
      <p style="color: #E4E4E7; font-size: 15px; line-height: 1.6;">
        We have received your message regarding <strong>${topic || "our services"}</strong>.
      </p>
      <p style="color: #A1A1AA; font-size: 14px; line-height: 1.6;">
        Our team, led by Co-Founder <strong>Attiq Butt</strong> and Master Photographer <strong>Muhammad Usman</strong>, reviews inquiries carefully. A member of our production team will be in touch with you within 24 hours.
      </p>
      <div class="message-box">
        <strong>A copy of your message:</strong><br><br>
        "${message.replace(/\n/g, "<br>")}"
      </div>
      <p style="color: #A1A1AA; font-size: 13px; line-height: 1.6;">
        If you have an urgent inquiry or upcoming wedding date, feel free to call or WhatsApp us directly at <strong>+1 (555) 840-7890</strong>.
      </p>
      `
    );

    await transporter.sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to: email,
      subject: "We received your message — Muhammadi Studio",
      html: clientHtml,
    });

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
      message: "Notification sent successfully via Gmail SMTP!",
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to send email via SMTP";
    console.error("❌ Gmail SMTP Error:", error);
    return {
      success: false,
      simulated: false,
      error: errorMsg,
      message: "Failed to dispatch email. Check Gmail SMTP credentials in .env.local.",
    };
  }
}

/**
 * Send Booking Notification for new shoots/appointments
 */
export async function sendBookingNotification({
  bookingId,
  serviceName,
  price,
  barberName,
  date,
  time,
  durationMin,
  clientName,
  clientPhone,
  clientEmail,
  notes,
}: {
  bookingId: string;
  serviceName: string;
  price: number;
  barberName: string;
  date: string;
  time: string;
  durationMin: number;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  notes?: string;
}): Promise<SendMailResult> {
  const config = getMailConfig();

  if (!config.isConfigured) {
    console.log("------------------------------------------------------------");
    console.log("📅 [GMAIL SMTP BOOKING NOTIFICATION — SIMULATED MODE]");
    console.log(`Booking ID: ${bookingId}`);
    console.log(`Service: ${serviceName} ($${price})`);
    console.log(`Director / Lead: ${barberName}`);
    console.log(`Schedule: ${date} at ${time} (${durationMin} mins)`);
    console.log(`Client: ${clientName} (${clientPhone}) ${clientEmail ? `<${clientEmail}>` : ""}`);
    if (notes) console.log(`Notes: ${notes}`);
    console.log("💡 To send real emails via Gmail SMTP, set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local");
    console.log("------------------------------------------------------------");

    return {
      success: true,
      simulated: true,
      message: "Booking confirmed! (Gmail SMTP notification simulated).",
    };
  }

  try {
    const transporter = createGmailTransporter()!;

    // Admin notification email
    const adminHtml = brandHtmlWrapper(
      `New Shoot Booking: ${clientName}`,
      `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h2 class="heading" style="margin: 0;">New Shoot Reserved! 🎬</h2>
        <span class="badge" style="background: rgba(34, 197, 94, 0.15); border-color: rgba(34, 197, 94, 0.4); color: #22C55E;">Confirmed</span>
      </div>
      <p style="color: #A1A1AA; font-size: 14px; margin: 0 0 16px 0;">
        A new production session has been booked on the Muhammadi Studio platform:
      </p>
      <table class="field-table">
        <tr>
          <td class="field-label">Booking Reference</td>
          <td class="field-value" style="color: #C9A227;">#${bookingId}</td>
        </tr>
        <tr>
          <td class="field-label">Production Service</td>
          <td class="field-value">${serviceName}</td>
        </tr>
        <tr>
          <td class="field-label">Investment / Price</td>
          <td class="field-value" style="color: #C9A227;">$${price.toLocaleString()}</td>
        </tr>
        <tr>
          <td class="field-label">Lead Director / Artist</td>
          <td class="field-value">${barberName}</td>
        </tr>
        <tr>
          <td class="field-label">Scheduled Date</td>
          <td class="field-value">${date}</td>
        </tr>
        <tr>
          <td class="field-label">Call Time</td>
          <td class="field-value">${time} (${durationMin} min duration)</td>
        </tr>
        <tr>
          <td class="field-label">Client Name</td>
          <td class="field-value">${clientName}</td>
        </tr>
        <tr>
          <td class="field-label">Client Phone</td>
          <td class="field-value"><a href="tel:${clientPhone}" style="color: #C9A227;">${clientPhone}</a></td>
        </tr>
        ${
          clientEmail
            ? `<tr>
                <td class="field-label">Client Email</td>
                <td class="field-value"><a href="mailto:${clientEmail}" style="color: #C9A227;">${clientEmail}</a></td>
              </tr>`
            : ""
        }
      </table>
      ${
        notes
          ? `<p style="font-size: 13px; font-weight: 600; color: #C9A227; text-transform: uppercase; margin: 20px 0 8px 0; letter-spacing: 1px;">Shoot Details / Client Vision:</p>
             <div class="message-box">${notes.replace(/\n/g, "<br>")}</div>`
          : ""
      }
      `
    );

    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to: config.recipient,
      replyTo: clientEmail || undefined,
      subject: `[Muhammadi Studio Booking] ${serviceName} with ${barberName} (${clientName})`,
      html: adminHtml,
    });

    // If client email provided, send them confirmation too
    if (clientEmail) {
      const clientHtml = brandHtmlWrapper(
        "Your Shoot is Confirmed — Muhammadi Studio",
        `
        <h2 class="heading">Booking Confirmed! 🎥</h2>
        <p style="color: #E4E4E7; font-size: 15px; line-height: 1.6;">
          Dear ${clientName}, your production session with <strong>${barberName}</strong> has been successfully registered.
        </p>
        <table class="field-table">
          <tr>
            <td class="field-label">Booking Reference</td>
            <td class="field-value" style="color: #C9A227;">#${bookingId}</td>
          </tr>
          <tr>
            <td class="field-label">Service</td>
            <td class="field-value">${serviceName}</td>
          </tr>
          <tr>
            <td class="field-label">Date & Time</td>
            <td class="field-value">${date} at ${time}</td>
          </tr>
          <tr>
            <td class="field-label">Location</td>
            <td class="field-value">Studio 4, Media City, Downtown Art District</td>
          </tr>
          <tr>
            <td class="field-label">Total Fee</td>
            <td class="field-value" style="color: #C9A227;">$${price.toLocaleString()}</td>
          </tr>
        </table>
        <p style="color: #A1A1AA; font-size: 14px; line-height: 1.6;">
          Our creative coordinator will reach out prior to your shoot to confirm wardrobe palettes, mood-boards, and call-sheet details.
        </p>
        `
      );

      await transporter.sendMail({
        from: `"${config.fromName}" <${config.user}>`,
        to: clientEmail,
        subject: `Your Booking is Confirmed — Muhammadi Studio (#${bookingId})`,
        html: clientHtml,
      });
    }

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
      message: "Booking email dispatched successfully via Gmail SMTP!",
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to send booking email";
    console.error("❌ Gmail SMTP Booking Error:", error);
    return {
      success: false,
      simulated: false,
      error: errorMsg,
      message: "Failed to dispatch booking notification via SMTP.",
    };
  }
}

/**
 * Send Official Approval & Confirmation Email to Client
 * Triggered when Admin (Atiq Butt) approves a pending event booking.
 */
export async function sendBookingApprovalConfirmation({
  bookingId,
  clientName,
  clientEmail,
  clientPhone,
  functions,
  date,
  time,
  venue,
  adminNotes,
}: {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  functions: string[];
  date: string;
  time: string;
  venue?: string;
  adminNotes?: string;
}): Promise<SendMailResult> {
  const config = getMailConfig();

  if (!config.isConfigured) {
    console.log("============================================================");
    console.log("🎉 [GMAIL SMTP CLIENT APPROVAL CONFIRMATION — SIMULATED MODE]");
    console.log(`Booking ID: #${bookingId}`);
    console.log(`Client: ${clientName} (${clientPhone}) <${clientEmail}>`);
    console.log(`Functions: ${functions.join(", ")}`);
    console.log(`Date & Time: ${date} at ${time}`);
    console.log(`Venue: ${venue || "Main Bazar, New Plaza, Shop No: 2"}`);
    console.log("Studio Address: Main Bazar, New Plaza, Shop No: 2, Pakistan");
    console.log("Contact / WhatsApp: 0313-7526305 (Atiq Butt)");
    if (adminNotes) console.log(`Admin Notes: ${adminNotes}`);
    console.log("============================================================");

    return {
      success: true,
      simulated: true,
      message: `Approval confirmed for ${clientName}! (Simulated email logged for ${clientEmail}).`,
    };
  }

  try {
    const transporter = createGmailTransporter()!;

    const functionListHtml = functions
      .map(
        (f) =>
          `<span style="display: inline-block; background: rgba(201, 162, 39, 0.15); border: 1px solid rgba(201, 162, 39, 0.4); color: #C9A227; font-size: 13px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; margin: 3px 4px 3px 0;">✓ ${f}</span>`
      )
      .join(" ");

    const clientHtml = brandHtmlWrapper(
      `Event Booking Approved: ${clientName}`,
      `
      <div style="text-align: center; margin-bottom: 24px;">
        <span class="badge" style="background: rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.5); color: #22C55E; font-size: 13px; padding: 6px 14px;">
          ✓ Officially Approved & Confirmed
        </span>
        <h2 class="heading" style="margin: 14px 0 6px 0; font-size: 26px;">Your Event is Officially Confirmed! 🎬🎉</h2>
        <p style="color: #C9A227; font-size: 14px; font-weight: 600; margin: 0; letter-spacing: 0.5px;">
          "Dream It... We Plan It... You Enjoy It!"
        </p>
      </div>

      <p style="color: #E4E4E7; font-size: 15px; line-height: 1.6;">
        Dear <strong>${clientName}</strong>,
      </p>
      <p style="color: #A1A1AA; font-size: 14px; line-height: 1.6;">
        We are thrilled to inform you that your event booking has been personally reviewed and <strong>APPROVED</strong> by <strong>Atiq Butt</strong> (Owner & Lead Event Director). All requested setups, cinematography crew, and decorations are officially locked for your date.
      </p>

      <table class="field-table" style="margin: 20px 0;">
        <tr>
          <td class="field-label">Booking Reference</td>
          <td class="field-value" style="color: #C9A227; font-weight: 700;">#${bookingId}</td>
        </tr>
        <tr>
          <td class="field-label">Confirmed Function(s)</td>
          <td class="field-value">${functionListHtml}</td>
        </tr>
        <tr>
          <td class="field-label">Scheduled Date</td>
          <td class="field-value" style="color: #FFFFFF; font-weight: 600;">${date}</td>
        </tr>
        <tr>
          <td class="field-label">Call Time</td>
          <td class="field-value">${time}</td>
        </tr>
        <tr>
          <td class="field-label">Venue / Event Location</td>
          <td class="field-value">${venue || "Client Designated Venue"}</td>
        </tr>
        <tr>
          <td class="field-label">Client Name</td>
          <td class="field-value">${clientName}</td>
        </tr>
        <tr>
          <td class="field-label">Client Phone</td>
          <td class="field-value"><a href="tel:${clientPhone}" style="color: #C9A227;">${clientPhone}</a></td>
        </tr>
      </table>

      ${
        adminNotes
          ? `
          <div style="background: rgba(201, 162, 39, 0.08); border-left: 3px solid #C9A227; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 13px; color: #C9A227; font-weight: 600; text-transform: uppercase;">Message from Atiq Butt:</p>
            <p style="margin: 6px 0 0 0; font-size: 14px; color: #E4E4E7; line-height: 1.5;">${adminNotes.replace(/\n/g, "<br>")}</p>
          </div>
          `
          : ""
      }

      <div style="border-top: 1px solid #272727; padding-top: 20px; margin-top: 24px;">
        <h4 style="color: #FFFFFF; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Studio Office & Contact Details:</h4>
        <p style="color: #A1A1AA; font-size: 13px; line-height: 1.6; margin: 4px 0;">
          📍 <strong>Studio Location:</strong> Main Bazar, New Plaza, Shop No: 2, Pakistan<br>
          📞 <strong>Call & WhatsApp:</strong> <a href="tel:03137526305" style="color: #C9A227; font-weight: 600;">0313-7526305</a><br>
          👤 <strong>Event Director:</strong> Atiq Butt (Owner)<br>
          🌐 <strong>Website:</strong> <a href="https://muhammadi-studio.vercel.app" style="color: #C9A227;">muhammadi-studio.vercel.app</a>
        </p>
      </div>

      <div style="background: #181818; border: 1px solid #272727; border-radius: 8px; padding: 14px; margin-top: 20px; text-align: center;">
        <p style="color: #C9A227; font-size: 14px; font-weight: 600; margin: 0;">
          "Your Event, Our Responsibility, Memories Forever! ❤️"
        </p>
      </div>
      `
    );

    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.user}>`,
      to: clientEmail,
      subject: `🎉 Booking Officially Confirmed — Muhammadi Studio & Event Management (#${bookingId})`,
      html: clientHtml,
    });

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
      message: `Official confirmation email sent to ${clientEmail}!`,
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to send approval email";
    console.error("❌ Approval Email Error:", error);
    return {
      success: false,
      simulated: false,
      error: errorMsg,
      message: "Failed to dispatch approval confirmation email.",
    };
  }
}

/**
 * Verify SMTP connection status
 */
export async function testSmtpConnection() {
  const config = getMailConfig();

  if (!config.isConfigured) {
    return {
      configured: false,
      success: false,
      message: "SMTP is in simulation mode. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env.local to activate live sending.",
    };
  }

  try {
    const transporter = createGmailTransporter()!;
    await transporter.verify();
    return {
      configured: true,
      success: true,
      message: `Successfully connected to Gmail SMTP (${config.host}:${config.port}) as ${config.user}!`,
    };
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Failed to verify SMTP connection with Gmail.";
    return {
      configured: true,
      success: false,
      message: errorMsg,
    };
  }
}
