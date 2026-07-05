import Link from "next/link";

export function AppFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white py-6 px-6">
      <div className="flex flex-col items-center gap-2 text-sm text-gray-500">
        <div className="flex gap-4">
          <Link href="/auth/login" className="hover:text-gray-900 transition-colors">
            Sign in
          </Link>
          <Link href="/auth/signup" className="hover:text-gray-900 transition-colors">
            Sign up
          </Link>
          <a
            href="https://github.com/mikav-ai/mikav-web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Mikav AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
