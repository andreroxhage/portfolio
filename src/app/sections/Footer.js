'use client';
import { motion } from 'framer-motion';
import { footerLinks } from '@/app/data/nav';
import MagneticWrapper from '@/app/components/MagneticWrapper';
import { links } from '@/app/data/nav';

export default function Footer() {
  const backgroundImage = '/resource/20220611-IMG_5691.jpg'; // 20220611-IMG_5691 or familjen.jpg

  return (
    <div id="contact" className="min-h-fit p-0 surface-lock-dark">
      <div
        className="w-full h-full rounded-t-[40px] corner-squircle bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Gradient overlay — darker on mobile */}
        <div className="absolute inset-0 rounded-t-[40px] corner-squircle bg-gradient-to-b from-black/85 to-black md:from-black/80 md:to-black" />

        <div className="relative flex flex-col justify-between overflow-hidden w-full h-full">
          <div
            id="footer-container"
            className="relative w-full h-full overflow-hidden sm:py-14 py-0 flex flex-col justify-between"
          >
            <footer className="overflow-x-hidden">
              <div className="max-w-7xl mx-auto pt-8 pb-24 sm:pt-12 md:pt-16 px-5 sm:px-6 md:px-4">
                <div className="w-full flex px-1 py-2 justify-end">
                  <MagneticWrapper>
                    <motion.a
                      className="rounded-full h-16 w-16 bg-neutral-600 items-center justify-center text-neutral-200 hover:text-primary-500 hover:bg-neutral-600 transition-all duration-300 ease-in-out hover:scale-110 flex"
                      href={'#header'}
                      aria-label="Scroll to top"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                        />
                      </svg>
                    </motion.a>
                  </MagneticWrapper>
                </div>
                <div className="grid grid-cols-10 gap-y-4 sm:gap-y-2 justify-between pb-1 font-normal">
                  <div className="col-span-10 md:col-span-6 w-full">
                    <span className="text-lg md:text-xl text-surface-dark-foreground/50 font-medium tracking-tight col-start-8 col-span-3">
                      Connect
                      <hr className="h-0.5 pt-2 border-surface-dark-foreground md:zmr-12 my-3 sm:my-2" />
                    </span>

                    {footerLinks.map((link, i) => {
                      const { title, href } = link;

                      return (
                        <motion.a
                          key={i}
                          href={href}
                          className="col-start-8 col-span-3 flex items-center mb-3 sm:mb-2 text-lg md:text-xl text-surface-dark-foreground py-1 -ml-1 pl-1"
                          whileHover={{
                            color: 'oklch(var(--accent))',
                            fill: 'oklch(var(--accent))',
                            translateX: 10,
                          }}
                          whileTap={{ scale: 0.95 }}
                          initial={{
                            color: 'oklch(var(--surface-dark-foreground))',
                            fill: 'oklch(var(--surface-dark-foreground))',
                            opacity: 0,
                            translateX: 0,
                          }}
                          viewport={{ once: true }}
                          whileInView={{
                            opacity: 1,
                            transition: {
                              delay: 0.2 * i,
                              duration: 0.4,
                              ease: 'easeInOut',
                            },
                          }}
                          transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                          }}
                        >
                          {title}
                        </motion.a>
                      );
                    })}
                  </div>
                  <div className="col-span-10 md:col-span-4 w-full md:mt-0 mt-12 sm:mt-14">
                    <span className="text-lg md:text-xl text-surface-dark-foreground/50 font-medium tracking-tight col-start-1 col-span-7">
                      Navigation
                      <hr className="h-0.5 pt-2 border-surface-dark-foreground w-full my-3 sm:my-2" />
                    </span>
                    {links.map((link, i) => {
                      const { title, href } = link;
                      return (
                        <motion.a
                          key={i}
                          href={href}
                          className="col-start-1 col-span-7 flex items-center mb-3 sm:mb-2 text-lg md:text-xl text-surface-dark-foreground py-1 -ml-1 pl-1"
                          whileHover={{
                            color: 'oklch(var(--accent))',
                            fill: 'oklch(var(--accent))',
                            translateX: 10,
                          }}
                          whileTap={{ scale: 0.95 }}
                          initial={{
                            color: 'oklch(var(--surface-dark-foreground))',
                            fill: 'oklch(var(--surface-dark-foreground))',
                            opacity: 0,
                            translateX: 0,
                          }}
                          viewport={{ once: true }}
                          whileInView={{
                            opacity: 1,
                            transition: {
                              delay: 0.2 * i,
                              duration: 0.4,
                              ease: 'easeInOut',
                            },
                          }}
                          transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                          }}
                        >
                          {title}
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
