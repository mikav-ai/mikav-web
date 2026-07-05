import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/console/chat?settings=profile");
}
