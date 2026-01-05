import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sunyani Municipal | Official Website",
    description: "Official digital platform for Sunyani Municipal, Bono Region, Ghana. Discover our history, culture, businesses, job opportunities, and community events.",
    keywords: ["Sunyani", "Ghana", "Bono Region", "Municipal", "Business Directory", "Jobs", "Tourism"],
    authors: [{ name: "Sunyani Municipal" }],
    openGraph: {
        title: "Sunyani Municipal",
        description: "Official digital platform for Sunyani, Ghana",
        type: "website",
        locale: "en_GH",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
