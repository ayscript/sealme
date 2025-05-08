import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/gunplay 3d.otf",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Seal Me",
  description: "Anony mous group chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0E1217" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="text-center text-sm text-gray-500 py-4">
          <p>
            &copy; {new Date().getFullYear()}{" "}
          </p>
          <p>By using this application, you agrre to our terms and conditions stated <a href="/terms.html" className="text-blue-500 underline">here</a></p>
        </footer>
      </body>
    </html>
  );
}
