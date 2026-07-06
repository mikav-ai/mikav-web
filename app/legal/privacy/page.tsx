import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed text-gray-700">
        <p>
          Mikav AI (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects
          your privacy. This policy explains what information we collect and
          how we use it.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">1. Information We Collect</h2>
        <p>
          We collect account information (name, email), usage data (chat
          history, preferences), and technical data (device, browser) to
          operate and improve the service.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">2. How We Use Information</h2>
        <p>
          Your data is used to provide and personalize the service, respond
          to support requests, and improve our models and datasets. We do not
          sell your personal data.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">3. Data Storage</h2>
        <p>
          Data is stored securely using Supabase infrastructure with
          row-level security policies restricting access to your own data.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">4. Your Rights</h2>
        <p>
          You may access, update, or delete your account data at any time
          from your profile settings, or by contacting us directly.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">5. Third Parties</h2>
        <p>
          We use trusted third-party services (such as Supabase) to operate
          Mikav. These providers are bound by their own privacy and security
          obligations.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">6. Contact</h2>
        <p>
          For privacy questions, contact us at{" "}
          <a href="mailto:hello@mikav.info" className="text-primary hover:underline">
            hello@mikav.info
          </a>
          .
        </p>
      </section>
    </div>
  );
}
