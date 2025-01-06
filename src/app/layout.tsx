import type { Metadata } from "next";
import "./globals.css";

import { UIProvider, ColorModeScript } from "@yamada-ui/react";
import { AlertSnackProvider } from "@/components/provider"

export const metadata: Metadata = {
    title: "MHJoinUp",
    description: "モンスターハンター参加型配信用、参加希望者管理アプリ",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ColorModeScript />
                <UIProvider>
                    <AlertSnackProvider>
                        {children}
                    </AlertSnackProvider>
                </UIProvider>
            </body>
        </html>
    );
}
