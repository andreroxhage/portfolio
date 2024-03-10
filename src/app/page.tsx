import Image from 'next/image';
import Contact from './sections/Contact';
import Header from './sections/Header';
import About from './sections/About';
import Photography from './sections/Photography';
import CurrentWork from './sections/CurrentWork';
import Resume from './components/Resume';
import VoluntaryWork from './sections/VoluntaryWork';
import {SparklesCore} from './components/sparkles';

export default function Home() {
	return (
		<main className='h-full bg-primary-blackish w-max-screen'>
			<Header></Header>
			<About></About>
			<CurrentWork />
			<Contact></Contact>
			<div className='h-screen'>{/* Dont remove this*/}</div>
			<Photography />
			<VoluntaryWork />
		</main>
	);
}
