import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help",
};

export default function HelpPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Help</h2>
    </div>
  );
}
