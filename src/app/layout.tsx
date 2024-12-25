import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
