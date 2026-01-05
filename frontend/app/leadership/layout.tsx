import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Leadership | Sunyani Municipal Assembly",
    description: "Meet the dedicated leaders serving Sunyani Municipal and working towards our community's growth and development.",
};

export default function LeadershipLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
