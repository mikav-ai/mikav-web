import { SettingsSidebar } from "@/components/console/pages/settings";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      <div className="mt-6 flex gap-8">
        <SettingsSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
