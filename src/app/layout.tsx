import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar/Navbar';
import Head from 'next/head';

export const metadata: Metadata = {
	title: 'André Roxhage',
	description: 'Learn more about me and my projects.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' style={{ scrollBehavior: 'smooth' }} className='overflow-x-hidden w-full'>
			<head>
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
			</head>
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
