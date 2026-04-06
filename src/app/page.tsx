import Footer from '@/app/sections/Footer';
import Header from '@/app/sections/Header';
import Photography from '@/app/sections/Photography';
import CurrentWork from '@/app/sections/CurrentWork';
import ZoomParallax from '@/app/components/ZoomParallax/ZoomParallax';
import MobilePhotoCollage from '@/app/components/MobilePhotoCollage';

export default function Home() {
  return (
    <main className="h-full bg-secondary">
      <Header />
      <CurrentWork />
      <div className="bg-secondary">
        <Photography />
        <MobilePhotoCollage />
        <div className="hidden md:block">
          <ZoomParallax />
        </div>
      </div>
      <Footer />
    </main>
  );
}
