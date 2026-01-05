import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Businesses | Sunyani Municipal",
    description: "Browse local businesses and investment opportunities in Sunyani.",
};

export default function BusinessLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
