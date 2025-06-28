import type { Metadata } from "next";
import "./globals.css";

import { UIProvider } from "@yamada-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AlertSnackProvider } from "@/components/provider";

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
                <UIProvider>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
                        <AlertSnackProvider>
                            {children}
                        </AlertSnackProvider>
                    </GoogleOAuthProvider>
                </UIProvider>
            </body>
        </html>
    );
}
