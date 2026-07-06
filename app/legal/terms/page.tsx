import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: July 2026</p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed text-gray-700">
        <p>
          Welcome to Mikav. By accessing or using our services, you agree to
          be bound by these Terms of Service. Please read them carefully.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">1. Use of Service</h2>
        <p>
          Mikav is an open-source AI copilot and Malayalam language model
          provided for personal, educational, and commercial use in
          accordance with our license terms. You agree not to misuse the
          service or help anyone else do so.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">2. Accounts</h2>
        <p>
          You are responsible for maintaining the security of your account
          and for all activity that occurs under it. Notify us immediately of
          any unauthorized use.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">3. Open Source</h2>
        <p>
          Mikav's source code, models, and datasets are released under open
          licenses. Refer to the project repository for specific license
          terms applicable to each component.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">4. Disclaimer</h2>
        <p>
          The service is provided &quot;as is&quot; without warranties of any
          kind. Mikav AI is not liable for any damages arising from use of the
          service.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">5. Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          service after changes constitutes acceptance of the new terms.
        </p>

        <h2 className="text-lg font-semibold text-gray-900">6. Contact</h2>
        <p>
          Questions about these terms? Reach us at{" "}
          <a href="mailto:hello@mikav.info" className="text-primary hover:underline">
            hello@mikav.info
          </a>
          .
        </p>
      </section>
    </div>
  );
}
