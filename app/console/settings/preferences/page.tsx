import { redirect } from "next/navigation";

export default function PreferencesPage() {
  redirect("/console/chat?settings=preferences");
}
