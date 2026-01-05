import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "News & Media | Sunyani Municipal",
    description: "Official news, announcements, and press releases from Sunyani Municipal.",
};

export default function NewsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
