import Footer from '@/app/sections/Footer';
import { HeroSection } from '@/app/sections/HeroSection';
import AtWorkSection from '@/app/sections/AtWorkSection';
import RecentProjects from '@/app/sections/RecentProjects';
import ElsewhereSection from '@/app/sections/ElsewhereSection';
import ZoomParallax from '@/app/components/ZoomParallax/ZoomParallax';
import MobilePhotoCollage from '@/app/components/MobilePhotoCollage';
import OceanTransitionLoader from '@/app/components/OceanTransition/OceanTransitionLoader';

export default function Home() {
  return (
    <main className="h-full">
      {/* Professional Zone — adapts to light/dark mode */}
      <HeroSection />
      <AtWorkSection />

      {/* Personal Zone — warm light surface */}
      <div className="hidden lg:block xl:px-12 lg:px-0 px-24 py-16 bg-linear-to-b from-background via-secondary to-secondary">
        <RecentProjects />
      </div>
      <OceanTransitionLoader>
        <ElsewhereSection />
      </OceanTransitionLoader>

      <div className="relative z-10 bg-secondary">
        <MobilePhotoCollage />
        <div className="hidden md:block bg-secondary">
          <ZoomParallax />
        </div>
      </div>

      <Footer />
    </main>
  );
}
