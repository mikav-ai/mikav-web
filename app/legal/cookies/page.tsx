import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed text-gray-700">
        <p>
          This Cookie Policy explains how Mikav AI uses cookies and similar
          technologies on our website and console application.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device that help
          websites remember information about your visit.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">2. Cookies We Use</h2>
        <p>
          We use essential cookies to keep you signed in and remember your
          session, and preference cookies to remember settings like
          &quot;Remember me&quot;. We do not use third-party advertising
          cookies.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">3. Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings.
          Disabling essential cookies may affect your ability to sign in and
          use the console.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">4. Contact</h2>
        <p>
          Questions about cookies? Email us at{" "}
          <a href="mailto:hello@mikav.info" className="text-primary hover:underline">
            hello@mikav.info
          </a>
          .
        </p>
      </section>
    </div>
  );
}
