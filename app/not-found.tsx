import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-gray-700">Page not found</p>
      <Link
        href="/console/chat"
        className="mt-8 inline-flex items-center px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium transition-colors hover:bg-primary/90"
      >
        Back to Console
      </Link>
    </div>
  );
}
