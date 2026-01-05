import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jobs & Careers | Sunyani Municipal",
    description: "Explore job opportunities and career openings in Sunyani.",
};

export default function JobsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
