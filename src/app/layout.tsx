import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import FloatingNav from './components/Navbar/FloatingNav';
import ThemeToggle from './components/ThemeToggle';
import { ProjectHoverProvider } from './contexts/ProjectHoverContext';
import { ThemeProvider } from './contexts/ThemeContext';
import QueryProvider from './components/QueryProvider';

export const metadata: Metadata = {
  title: 'André Roxhage | Software Design Engineer',
  description:
    'Software Design Engineer specializing in frontend development, UX design, and creativity psychology. I create intuitive digital products, solving complex challenges with a human-centered approach. Explore my portfolio for more.',
  keywords:
    'André Roxhage, Software Design Engineer, frontend development, UX design, creativity psychology, human-centered design, digital products, user experience, UI/UX, design thinking, product design, web development',
  authors: [{ name: 'André Roxhage' }],
  openGraph: {
    title: 'André Roxhage - Projects and Portfolio',
    description:
      "Discover André Roxhage's portfolio, projects, and voluntary work.",
    images: ['/images/preview.png'],
    url: 'https://andreroxhage.com',
    type: 'website',
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const FOIWT_SCRIPT = `(function(){try{var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(s==='dark'||(s!=='light'&&d))document.documentElement.classList.add('dark')}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ scrollBehavior: 'smooth' }}
      className="overflow-x-hidden w-full font-sans"
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: FOIWT_SCRIPT }} />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <QueryProvider>
            <ProjectHoverProvider>
              <FloatingNav />
              <ThemeToggle />
              {children}
            </ProjectHoverProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
