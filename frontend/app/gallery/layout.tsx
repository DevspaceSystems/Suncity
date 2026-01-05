import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Visual Gallery | Sunyani Municipal Portrait",
    description: "Professional photography documenting the growth, culture, and natural beauty of the Sunyani Municipality.",
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
