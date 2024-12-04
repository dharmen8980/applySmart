"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { BiLogoGoogle } from "react-icons/bi";
import { Check } from "lucide-react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-[65svh] w-full ">
      <div className="mx-auto p-12 bg-white rounded-xl space-y-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Log in to your account</h2>
        <p className="text-center text-gray-600 mb-8">Use your Google account to access our platform quickly and securely.</p>
        <Button
          variant="outline"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full py-6 text-lg border-2 border-gray-400 rounded-xl bg-primary text-white "
        >
          <BiLogoGoogle className="mr-2 h-5 w-5" />
          Sign in with Google
        </Button>
        <p className="mt-8 text-center text-sm text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
