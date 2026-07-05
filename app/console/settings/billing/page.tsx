import { redirect } from "next/navigation";

export default function BillingPage() {
  redirect("/console/chat?settings=billing");
}
