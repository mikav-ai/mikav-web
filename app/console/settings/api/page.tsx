import { redirect } from "next/navigation";

export default function ApiPage() {
  redirect("/console/chat?settings=api");
}
