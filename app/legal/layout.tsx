import { AppLayout } from "@/components/app";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        {children}
      </div>
    </AppLayout>
  );
}
