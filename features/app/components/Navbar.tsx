"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/Auth/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./MobileNav";
import LogoutButton from "./LogoutButton";

const links = [
  { id: 1, title: "Home", href: "/" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending, error, refetch } = useSession();

  return (
    <header className="sticky top-0 left-0 w-full border-b z-50">
      <nav className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <h1 className="font-bold text-primary text-xl md:text-2xl">
            Blackash - Tech 
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Button
              key={link.id}
              variant="link"
              asChild
              className={`text-base transition-colors ${
                pathname === link.href
                  ? "text-primary font-semibold underline underline-offset-4"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Link href={link.href}>{link.title}</Link>
            </Button>
          ))}
        </ul>

        {/* Auth + Theme */}
        <div className="hidden md:flex items-center gap-2">
          {session && (
            <p className="mr-2 text-sm text-muted-foreground">
              {session.user.name}
            </p>
          )}
          {session ? (
            <LogoutButton />
          ) : (
            <Button size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <MobileNav session={session} links={links} pathname={pathname} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
