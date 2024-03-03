import Image from 'next/image';
import Contact from './sections/Contact';
import Header from './sections/Header';
import About from './sections/About';
import Photography from './sections/Photography';
import CurrentWork from './sections/CurrentWork';
import Resume from './components/Resume';

export default function Home() {
	return (
		<main className='min-h-screen  bg-primary-vanilla w-max-screen'>
			<Header></Header>
			<About></About>
			<CurrentWork />
			<Photography />
			<Contact></Contact>
		</main>
	);
}
