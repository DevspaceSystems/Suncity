import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events | Sunyani Municipal",
    description: "Stay updated with upcoming civic events and festivals in Sunyani.",
};

export default function EventsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
