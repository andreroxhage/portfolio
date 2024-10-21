import type { Metadata } from "next"
import "./globals.css"
import Navbar from "./components/Navbar/Navbar"
import Head from "next/head"

export const metadata: Metadata = {
    title: "André Roxhage",
    description: "Software Design Engineer with a background in frontend development, UX design, and creativity psychology. I specialize in building intuitive, user-friendly digital products and solving complex technical challenges with a human-centered approach. Explore my portfolio to see how I integrate design thinking, development, and psychology to deliver innovative solutions.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" style={{ scrollBehavior: "smooth" }} className="overflow-x-hidden w-full">
            <Head>
                {/* General SEO Tags */}
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="André Roxhage, Software Design Engineer, frontend development, UX design, creativity psychology, human-centered design, digital products." />
                <meta name="author" content="André Roxhage" />

                {/* Open Graph (for social media sharing) */}
                <meta property="og:title" content="André Roxhage - Projects and Portfolio" />
                <meta
                    property="og:description"
                    content="Discover André Roxhage’s portfolio, projects, and voluntary work."
                />
                <meta property="og:image" content="/images/preview.png" />
                <meta property="og:url" content="https://yourdomain.com" />
                <meta property="og:type" content="website" />

                {/* Favicons */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />

                <title>{'André Roxhage'}</title>
                <meta name="description" content={metadata.description ?? 'Software Design Engineer with a background in frontend development, UX design, and creativity psychology. I specialize in building intuitive, user-friendly digital products and solving complex technical challenges with a human-centered approach. Explore my portfolio to see how I integrate design thinking, development, and psychology to deliver innovative solutions.'} />
            </Head>
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
