import Footer from '@/app/sections/Footer';
import { HeroSection } from '@/app/sections/HeroSection';
import AtWorkSection from '@/app/sections/AtWorkSection';
import PhilosophyCards from '@/app/sections/PhilosophyCards';
import RecentProjects from '@/app/sections/RecentProjects';
import ElsewhereSection from '@/app/sections/ElsewhereSection';
import Photography from '@/app/sections/Photography';
import ZoomParallax from '@/app/components/ZoomParallax/ZoomParallax';
import MobilePhotoCollage from '@/app/components/MobilePhotoCollage';
import WebGLCanvasLoader from '@/app/components/WebGLCanvas/WebGLCanvasLoader';

export default function Home() {
  return (
    <main className="h-full">
      <WebGLCanvasLoader />
      {/* Professional Zone — adapts to light/dark mode */}
      <HeroSection />
      <AtWorkSection />
      <PhilosophyCards />

      {/* Personal Zone — warm light surface */}
      <RecentProjects />
      <ElsewhereSection />

      <div className="bg-secondary">
        <Photography />
        <MobilePhotoCollage />
        <div className="hidden md:block bg-background">
          <ZoomParallax />
        </div>
      </div>

      <Footer />
    </main>
  );
}
