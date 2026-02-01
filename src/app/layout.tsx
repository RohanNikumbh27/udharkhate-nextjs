import "@/styles/index.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
    title: "Udharkhate",
    description: "Manage your business accounts",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#6C47FF",
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
