import type { Metadata } from "next";
import "./globals.css";
import "./external-style-shit.css";
export const metadata: Metadata = {
  title: "Cyber School",
  description: "Cyber School is an innovative online platform offering interactive courses, cybersecurity labs, and hands-on learning to help students master digital skills and stay ahead in the tech world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}
