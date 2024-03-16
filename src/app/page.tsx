import Image from 'next/image';
import Contact from './sections/Contact';
import Header from './sections/Header';
import About from './sections/About';
import Photography from './sections/Photography';
import CurrentWork from './sections/CurrentWork';
import Resume from './components/Resume';
import VoluntaryWork from './sections/VoluntaryWork';
import {SparklesCore} from './components/sparkles';
import ZoomParallax from './components/ZoomParallax/ZoomParallax';
import Footer from './sections/Footer';

export default function Home() {
	return (
		<main className='h-full bg-primary-blackish'>
			<Header></Header>
			<About></About>
			<CurrentWork />
			<Contact></Contact>
			<div className='bg-primary-vanilla'>
				<Photography />
				<ZoomParallax></ZoomParallax>
			</div>
			<VoluntaryWork />
			<Footer />
		</main>
	);
}
