// Netlify Function: POST /api/contact
// Sends contact-form submissions to CONTACT_EMAIL via Resend.
// All credentials live in server-side environment variables only.

interface ContactPayload {
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  honeypot?: unknown;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
const SUBJECT_MAX = 200;

// Simple in-memory rate limit: 3 submissions per email/IP per 10 minutes.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

// Strip control characters and CRLF to prevent header injection.
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/; // eslint-disable-line no-control-regex
function sanitize(value: string): string {
  return value.replace(CONTROL_CHARS, " ").trim();
}

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

export const handler = async (event: {
  httpMethod: string;
  headers: Record<string, string | undefined>;
  body: string | null;
}) => {
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  const env = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env ?? {};
  const contactEmail = env.CONTACT_EMAIL;
  const resendApiKey = env.RESEND_API_KEY;

  if (!contactEmail || !resendApiKey) {
    console.error(
      "Missing CONTACT_EMAIL or RESEND_API_KEY environment variables.",
    );
    return json(500, { error: "Server is not configured to send email yet." });
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body ?? "{}") as ContactPayload;
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  // Honeypot: silently accept so bots do not learn they were caught.
  if (typeof payload.honeypot === "string" && payload.honeypot !== "") {
    return json(200, { ok: true });
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const subject = typeof payload.subject === "string" ? payload.subject : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return json(400, { error: "Please enter a valid email address." });
  }
  if (subject.length > SUBJECT_MAX) {
    return json(400, { error: "Subject must be 200 characters or fewer." });
  }
  if (message.length < MESSAGE_MIN || message.length > MESSAGE_MAX) {
    return json(400, {
      error: `Message must be between ${MESSAGE_MIN} and ${MESSAGE_MAX} characters.`,
    });
  }

  const rateKey = `${email}|${event.headers["x-nf-client-connection-ip"] ?? event.headers["client-ip"] ?? "unknown"}`;
  if (isRateLimited(rateKey)) {
    return json(429, { error: "Too many messages. Please try again later." });
  }

  // Final sanitization for anything embedded in the email body.
  const safeEmail = sanitize(email);
  const safeSubject = sanitize(subject) || "New message from portfolio";
  const safeMessage = sanitize(message);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [contactEmail],
        reply_to: safeEmail,
        subject: safeSubject,
        text:
          `You have a new message from your portfolio contact form.\n\n` +
          `From: ${safeEmail}\n` +
          `Subject: ${safeSubject}\n\n` +
          `${safeMessage}`,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend API error:", response.status, detail);
      return json(502, {
        error: "Failed to send your message. Please try again.",
      });
    }

    return json(200, { ok: true });
  } catch (error) {
    console.error("Contact handler error:", error);
    return json(502, {
      error: "Failed to send your message. Please try again.",
    });
  }
};
