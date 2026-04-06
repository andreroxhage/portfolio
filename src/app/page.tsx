import Footer from '@/app/sections/Footer';
import Header from '@/app/sections/Header';
import Photography from '@/app/sections/Photography';
import CurrentWork from '@/app/sections/CurrentWork';
import ZoomParallax from '@/app/components/ZoomParallax/ZoomParallax';

export default function Home() {
  return (
    <main className="h-full bg-secondary">
      <Header />
      <CurrentWork />
      <div className="bg-secondary">
        <Photography />
        <ZoomParallax />
      </div>
      <Footer />
    </main>
  );
}
