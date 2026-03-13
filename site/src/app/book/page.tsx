import type { Metadata } from "next";
import { CheckCircle, Clock, BarChart3, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call",
  description:
    "30 minutes, zero pressure. See your custom ROI breakdown and recommended growth package.",
};

const expectations = [
  {
    icon: BarChart3,
    text: "We'll review your assessment scores together",
  },
  {
    icon: Package,
    text: "You'll see a custom ROI breakdown for your practice",
  },
  {
    icon: CheckCircle,
    text: "We'll recommend a package — no pressure, no contracts",
  },
];

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "";

export default function BookPage() {
  return (
    <>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl font-normal tracking-tight text-[var(--color-text-primary)] md:text-5xl">
              Let&apos;s find your revenue leaks
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-secondary)]">
              30 minutes, zero pressure.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-5">
            {/* Calendly Embed */}
            <div className="lg:col-span-3">
              <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] overflow-hidden">
                {calendlyUrl ? (
                  <iframe
                    src={calendlyUrl}
                    className="h-[650px] w-full border-0"
                    title="Schedule a strategy call"
                  />
                ) : (
                  <div className="flex h-[650px] flex-col items-center justify-center p-8 text-center">
                    <Clock className="mb-4 h-12 w-12 text-[var(--color-text-tertiary)]" />
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-body)" }}>
                      Booking Coming Soon
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                      Our scheduling system is being set up. Email us at{" "}
                      <a
                        href="mailto:hello@nextgenpractice.org"
                        className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
                      >
                        hello@nextgenpractice.org
                      </a>{" "}
                      to book your call.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* What to Expect */}
            <div className="lg:col-span-2">
              <div className="rounded-[14px] border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-8">
                <h2 className="text-xl font-normal text-[var(--color-text-primary)]">
                  What to expect
                </h2>
                <ul className="mt-6 space-y-5">
                  {expectations.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.text} className="flex gap-3">
                        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-10 rounded-lg bg-[var(--color-bg-tertiary)] p-5 text-center">
                  <p className="text-3xl font-normal text-[var(--color-accent)]" style={{ fontFamily: "var(--font-display)" }}>
                    $147K
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    Average revenue recovered in the first year
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
