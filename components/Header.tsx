"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BiSolidGraduation } from "react-icons/bi";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex flex-row gap-1 items-center">
          <BiSolidGraduation />
          applySmart
        </Link>
        <nav>
          {session ? (
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/applications">Applications</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/calendar">Calendar</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
              </li>
              <Button variant="ghost" onClick={() => signOut()}>
                Sign Out
              </Button>
            </ul>
          ) : (
            <Button onClick={() => signIn("google")} className="bg-white text-[#2f6783] hover:bg-[#e6e6e6]">
              Sign In
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
