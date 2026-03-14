import Contact from './sections/Contact';
import Header from './sections/Header';
import About from './sections/About';
import Photography from './sections/Photography';
import CurrentWork from './sections/CurrentWork';
import VoluntaryWork from './sections/VoluntaryWork';
import ZoomParallax from './components/ZoomParallax/ZoomParallax';
import Footer from './sections/Footer';

export default function Home() {
  return (
    <main className="h-full bg-secondary">
      <Header></Header>
      <CurrentWork />

      <div className="bg-secondary">
        <Photography />
        <ZoomParallax></ZoomParallax>
      </div>
      <About></About>
      <Contact></Contact>
      <VoluntaryWork />
      <Footer />
    </main>
  );
}
