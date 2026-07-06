import Image from "next/image";
import Link from "next/link";

const productLinks = [
  { label: "Chat", href: "/console/chat" },
  { label: "Groups", href: "/console/groups" },
  { label: "Settings", href: "/console/settings" },
  { label: "Help", href: "/console/help" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Roadmap", href: "/roadmap" },
  { label: "Contact", href: "mailto:hello@mikav.info" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Policy", href: "/legal/cookies" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/mikav-ai" },
  { label: "GitHub", href: "https://github.com/mikav-ai" },
  { label: "X", href: "https://x.com/mikav_ai" },
  { label: "Hugging Face", href: "https://huggingface.co/mikav-ai" },
];

export function AppFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Product</h3>
            <ul className="mt-3 space-y-2">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Company</h3>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Social</h3>
            <ul className="mt-3 space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
          <Image
            src="/icons/app/icon-dark.png"
            alt="Mikav"
            width={28}
            height={28}
          />
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mikav AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
