import Image from "next/image";
import Link from "next/link";

export function AppHeader() {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-gray-200 bg-white">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/app/icon-dark.png"
          alt="Mikav"
          width={28}
          height={28}
        />
        <span className="text-base font-semibold text-gray-900">Mikav</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          href="/auth/login"
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/auth/signup"
          className="text-sm px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Sign up
        </Link>
      </nav>
    </header>
  );
}
