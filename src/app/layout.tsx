import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUA - 你说什么",
  description: "选择正确的回答，赢得好感 — 微信聊天模拟器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
