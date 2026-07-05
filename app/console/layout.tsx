import { ConsoleLayout } from "@/components/console";

export default function ConsoleRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConsoleLayout>{children}</ConsoleLayout>;
}
