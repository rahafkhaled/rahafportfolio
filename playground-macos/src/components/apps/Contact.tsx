import React, { useState } from 'react';
import WindowTemplate from '../WindowTemplate';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formspree.io/f/mnnvwgod', {
        method: 'POST',
        body: data,
        headers: {
          Accept: 'application/json',
        },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WindowTemplate>
      <div className="h-full w-full flex flex-col items-center justify-center p-8">
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="p-3 rounded border border-purple-200 focus:border-purple-400 outline-none bg-white/90 text-gray-900"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="p-3 rounded border border-purple-200 focus:border-purple-400 outline-none bg-white/90 text-gray-900"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                className="p-3 rounded border border-purple-200 focus:border-purple-400 outline-none bg-white/90 text-gray-900"
                required
              />
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="font-semibold py-2 px-6 rounded transition-colors bg-gray-600/80 hover:bg-gray-700/90 border-none"
                style={{
                  color: '#f4f0ff',
                  textShadow: `
                    0 0 6px rgba(200,160,255,0.1),
                    0 0 12px rgba(200,160,255,0.1)
                  `
                }}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          </>
        )}
      </div>
    </WindowTemplate>
  );
};

export default Contact; 