import "@/styles/index.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Udharkhate",
    description: "Manage your business accounts",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-background text-foreground">
                {children}
            </body>
        </html>
    );
}
