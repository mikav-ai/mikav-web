import type { Metadata } from "next";
import { SupportForm } from "@/components/console/shared/forms/support-form";

export const metadata: Metadata = {
  title: "Help",
};

export default function HelpPage() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-900">Help</h2>
        <p className="mt-2 text-sm text-gray-500">
          Need help with something? Submit a support request and we&apos;ll
          get back to you.
        </p>
        <div className="mt-6">
          <SupportForm />
        </div>
      </div>
    </div>
  );
}
