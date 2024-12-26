import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "André Roxhage",
  description:
    "Software Design Engineer specializing in frontend development, UX design, and creativity psychology. I create intuitive digital products, solving complex challenges with a human-centered approach. Explore my portfolio for more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ scrollBehavior: "smooth" }}
      className="overflow-x-hidden w-full"
    >
      <Head>
        {/* General SEO Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="André Roxhage, Software Design Engineer, frontend development, UX design, creativity psychology, human-centered design, digital products, user experience, UI/UX, design thinking, product design, web development"
        />
        <meta name="author" content="André Roxhage" />
        {/* Open Graph (for social media sharing) */}
        <meta
          property="og:title"
          content="André Roxhage - Projects and Portfolio"
        />
        <meta
          property="og:description"
          content="Discover André Roxhage’s portfolio, projects, and voluntary work."
        />
        <meta property="og:image" content="/images/preview.png" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <title>{"André Roxhage | Software Design Engineer"}</title>
        <meta
          name="description"
          content={
            metadata.description ??
            "Software Design Engineer specializing in frontend development, UX design, and creativity psychology. I create intuitive digital products, solving complex challenges with a human-centered approach. Explore my portfolio for more."
          }
        />
      </Head>
      <body>
        <Navbar />
        <main></main>
        {children}
      </body>
    </html>
  );
}
