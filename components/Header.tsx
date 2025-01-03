"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BiSolidGraduation } from "react-icons/bi";
import { usePathname } from "next/navigation";

export default function Header(session: any) {
  const pathName = usePathname();
  return (
    <header className="bg-primary text-primary-foreground fixed w-full">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex flex-row gap-1 items-center">
          <BiSolidGraduation />
          applySmart
        </Link>

        <nav className="flex space-x-4 items-center">
          <Link href="/dashboard" className={pathName === "/dashboard" ? "border-b-white border-b-4" : ""}>
            Dashboard
          </Link>
          {session.session ? (
            <ul>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </ul>
          ) : (
            <Button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="bg-white text-[#2f6783] hover:bg-[#e6e6e6]"
            >
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
