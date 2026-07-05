import { redirect } from "next/navigation";

export default function AccountPage() {
  redirect("/console/chat?settings=account");
}
