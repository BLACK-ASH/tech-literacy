import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { Session } from "@/lib/Auth/auth-client";

const MobileNav = ({
  session,
  links,
  pathname,
}: {
  session: Session | null;
  links: { id: number; title: string; href: string }[];
  pathname: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="size-4 text-primary" />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className="flex items-center gap-2">
              <h1 className="font-bold text-primary text-xl md:text-2xl">
                Blackash - Tech 
              </h1>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-2 px-4">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`py-2 text-base w-full ${
                pathname === link.href
                  ? "text-primary font-semibold underline underline-offset-4"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <SheetFooter>
          <div className="mt-3 flex flex-col gap-2 w-full">
            {session && (
              <p className="text-sm text-muted-foreground">
                {session.user.name}
              </p>
            )}
            {session ? (
              <div className="flex ">
                <LogoutButton className="flex-1" />
                <ThemeToggle />
              </div>
            ) : (
              <div className="flex ">
                <Button asChild className="flex-1">
                  <Link href="/login">Login</Link>
                </Button>
                <ThemeToggle />
              </div>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
