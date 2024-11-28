import Provider from "@/components/SessionProvider";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "applySmart",
  description:
    "applySmart is your all-in-one solution for managing applications to universities and companies. Stay organized and never miss an opportunity.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="bg-[#e6e6e6]">
            <Header session={session} />
            <main className="max-w-7xl mx-auto">{children}</main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
