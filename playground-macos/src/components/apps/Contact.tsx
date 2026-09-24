import React, { useState } from "react";
import WindowTemplate from "../WindowTemplate";
import { CONTACT_FORM_URL } from "~/configs/contact";
import { portfolioPillButtonClassName } from "~/utils/portfolioStyles";

interface ContactProps {
  embedded?: boolean;
}

const Contact: React.FC<ContactProps> = ({ embedded }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    data.set("_replyto", email);
    data.set("_subject", name ? `Portfolio message from ${name}` : "Portfolio contact form");
    data.set("_captcha", "false");
    data.set("_template", "table");

    try {
      const res = await fetch(CONTACT_FORM_URL, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inner = (
      <div
        className={`flex min-h-0 min-w-0 w-full flex-1 flex-col items-center justify-start px-2 md:justify-center md:p-8 ${
          embedded ? "py-3" : "py-6"
        }`}
      >
        {submitted ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2rem',
              fontWeight: 600,
              fontStyle: 'italic',
              fontSize: '1.2rem',
              textAlign: 'center',
              color: '#f4f0ff',
            }}
          >
            {"Thank you! I look forward to speaking with you.".split('').map((char, i) => (
              <span
                key={i}
                className="shine-letter"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        ) : (
          <>
            {!embedded && (
            <h2
              style={{
                color: '#f4f0ff',
                textShadow: `
                  0 0 6px rgba(200,160,255,0.4),
                  0 0 12px rgba(200,160,255,0.3)
                `,
                fontWeight: 700,
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}
            >
              Contact Me
            </h2>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md flex-col gap-4 touch-manipulation"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="min-h-[48px] rounded border border-purple-200 bg-white/90 p-3 text-base text-gray-900 outline-none focus:border-purple-400"
                required
                autoComplete="name"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="min-h-[48px] rounded border border-purple-200 bg-white/90 p-3 text-base text-gray-900 outline-none focus:border-purple-400"
                required
                autoComplete="email"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={6}
                className="min-h-[140px] rounded border border-purple-200 bg-white/90 p-3 text-base text-gray-900 outline-none focus:border-purple-400"
                required
              />
              {error && <div className="text-sm text-red-600">{error}</div>}
              <button
                type="submit"
                className={`${portfolioPillButtonClassName} w-full`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </>
        )}
      </div>
  );

  if (embedded) return inner;
  return <WindowTemplate>{inner}</WindowTemplate>;
};

export default Contact; 