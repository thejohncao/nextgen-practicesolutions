"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { MapPin, Mail, Calendar } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left - Info */}
            <div>
              <h1 className="text-4xl font-normal md:text-5xl">Get in touch.</h1>
              <p className="mt-6 text-lg text-[var(--color-text-soft)]">
                Ready to transform your practice? Fill out the form or book a strategy call
                directly — we&apos;ll get back to you within one business day.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <Calendar className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                      Book a Strategy Call
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                      Free 30-minute call to assess your practice and build a custom plan.
                    </p>
                    <a
                      href="#book-a-call"
                      className="mt-2 inline-block text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-light)]"
                    >
                      Schedule now &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <Mail className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                      Email
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                      hello@nextgenpractice.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10">
                    <MapPin className="h-5 w-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                      Location
                    </h3>
                    <p className="mt-1 text-sm text-[var(--color-text-soft)]">
                      Orange County, CA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="rounded-2xl border border-[var(--color-border)] bg-white p-8">
              {submitted ? (
                <div className="flex min-h-[300px] items-center justify-center text-center">
                  <div>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-success)]/10">
                      <Mail className="h-6 w-6 text-[var(--color-success)]" />
                    </div>
                    <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                      Message sent!
                    </h3>
                    <p className="mt-2 text-[var(--color-text-soft)]">
                      We&apos;ll get back to you within one business day.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="h-11 w-full rounded-lg border border-[var(--color-border)] px-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="h-11 w-full rounded-lg border border-[var(--color-border)] px-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="practice" className="mb-2 block text-sm font-medium">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      id="practice"
                      className="h-11 w-full rounded-lg border border-[var(--color-border)] px-4 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-[var(--color-border)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center rounded-lg bg-[var(--color-primary)] text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary-light)]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
