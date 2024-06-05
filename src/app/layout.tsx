import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Olympiad",
  description: "Organize olympiads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html>
        <body>
            <div>
                <nav className="bg-gray-800 p-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="text-white text-lg font-bold">
                            <Link href="/">Home</Link>
                        </div>
                        <div className="flex space-x-4">
                            <Link href="/quest/my" className="text-gray-300 hover:text-white">
                                My Quests
                            </Link>
                            <Link href="/quest/create" className="text-gray-300 hover:text-white">
                                Create Quest
                            </Link>
                            <Link href="/auth/signin" className="text-gray-300 hover:text-white">
                                Sign In
                            </Link>
                            <Link href="/auth/signup" className="text-gray-300 hover:text-white">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </nav>
                <main>{children}</main>
            </div>
        </body>
        </html>
    );
}
