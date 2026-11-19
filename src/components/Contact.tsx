import { useState, type FormEvent } from "react";
import { content } from "../content";
import { Nav } from "./Nav";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ContactProps {
  onNavigateHome: () => void;
  onNavigateSection: (section: string) => void;
}

type Status = "idle" | "sending" | "success" | "error";

interface FormValues {
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

const emptyForm: FormValues = {
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;

export function Contact({ onNavigateHome, onNavigateSection }: ContactProps) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<"email" | "subject" | "message", string>>
  >({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const { ref: formRef, isVisible: isFormVisible } =
    useScrollReveal<HTMLFormElement>();

  const setField = (field: keyof FormValues) => (value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field !== "honeypot") {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (values.subject.length > 200) {
      next.subject = "Subject must be 200 characters or fewer.";
    }
    const message = values.message.trim();
    if (message.length < MESSAGE_MIN) {
      next.message = `Message must be at least ${MESSAGE_MIN} characters.`;
    } else if (message.length > MESSAGE_MAX) {
      next.message = `Message must be ${MESSAGE_MAX} characters or fewer.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    setServerError("");

    // Honeypot filled: almost certainly a bot. Pretend success, send nothing.
    if (values.honeypot !== "") {
      setStatus("success");
      setValues(emptyForm);
      return;
    }

    if (!validate()) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          honeypot: values.honeypot,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }
      setStatus("success");
      setValues(emptyForm);
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const inputClass = (field: "email" | "subject" | "message") =>
    `contact__field${errors[field] ? " contact__field--invalid" : ""}`;

  return (
    <main className="works-page contact-page">
      <div className="works-page__header">
        <a
          href="#"
          className="works-page__back-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          aria-label="Back to home page"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </a>
        <Nav activeSection="contact" onNavigate={onNavigateSection} />
      </div>

      <section className="works-page__content" aria-labelledby="contact-title">
        <div className="works-page__title-group">
          <h1 id="contact-title" className="works-page__title">
            {content.contact.heading}
          </h1>
          <p className="contact-page__intro">{content.contact.intro}</p>
        </div>

        {status === "success" ? (
          <div
            className="contact__status contact__status--success"
            role="status"
          >
            <p>
              Your message has been sent successfully. I&apos;ll get back to you
              soon!
            </p>
            <button
              type="button"
              className="contact__reset-btn"
              onClick={() => setStatus("idle")}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            ref={formRef}
            className={`contact__form${isFormVisible ? " is-visible" : ""}`}
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot: hidden from users, catches bots */}
            <div className="contact__honeypot" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={values.honeypot}
                onChange={(e) => setField("honeypot")(e.target.value)}
              />
            </div>

            <div className="contact__row">
              <div className="contact__group">
                <label className="contact__label" htmlFor="contact-email">
                  Your email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  className={inputClass("email")}
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(e) => setField("email")(e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />
                {errors.email && (
                  <p id="contact-email-error" className="contact__error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="contact__group">
                <label className="contact__label" htmlFor="contact-subject">
                  Subject <span className="contact__optional">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  className={inputClass("subject")}
                  type="text"
                  name="subject"
                  maxLength={200}
                  placeholder="What is this about?"
                  value={values.subject}
                  onChange={(e) => setField("subject")(e.target.value)}
                  aria-invalid={errors.subject ? true : undefined}
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                />
                {errors.subject && (
                  <p id="contact-subject-error" className="contact__error">
                    {errors.subject}
                  </p>
                )}
              </div>
            </div>

            <div className="contact__group">
              <label className="contact__label" htmlFor="contact-message">
                Your message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                className={inputClass("message")}
                name="message"
                rows={7}
                required
                minLength={MESSAGE_MIN}
                maxLength={MESSAGE_MAX}
                placeholder="Tell me about your project, idea, or question..."
                value={values.message}
                onChange={(e) => setField("message")(e.target.value)}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />
              {errors.message && (
                <p id="contact-message-error" className="contact__error">
                  {errors.message}
                </p>
              )}
            </div>

            {status === "error" && serverError && (
              <div
                className="contact__status contact__status--error"
                role="alert"
              >
                {serverError}
              </div>
            )}

            <button
              type="submit"
              className="contact__submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
