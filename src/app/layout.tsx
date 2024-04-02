import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar/Navbar';

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
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
