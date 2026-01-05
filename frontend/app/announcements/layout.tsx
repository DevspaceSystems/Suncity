import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Public Notices & Proclamations | Sunyani Municipal Assembly",
    description: "Verified administrative notices, emergency alerts, and community bulletins directly from the Municipal Secretariat.",
};

export default function AnnouncementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
