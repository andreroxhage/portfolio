'use client';
import { motion } from 'framer-motion';
import { footerLinks } from '@/app/data/nav';
import { FollowerPointerCard } from '@/app/components/followCursor';
import MagneticWrapper from '@/app/components/MagneticWrapper';
import { links } from '@/app/data/nav';

export default function Footer() {
  const backgroundImage = '/resource/20220611-IMG_5691.jpg'; // 20220611-IMG_5691 or familjen.jpg

  const TitleComponent = ({ title }) => (
    <div>
      <p className="z-5">{title}</p>
    </div>
  );

  return (
    <div id="contact" className="h-screen p-0 surface-lock-dark">
      <div
        className="w-full h-full rounded-t-[40px] corner-squircle"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col justify-between overflow-hidden w-full h-full">
          <div
            id="footer-container"
            className="relative w-full h-full overflow-hidden py-14 flex flex-col justify-between"
          >
            <FollowerPointerCard
              title={<TitleComponent title={'Connect'} />}
              className="h-full z-20 flex-1"
            >
              <div className="max-w-7xl mx-auto flex flex-col items-start justify-end w-full h-full overflow-hidden pb-30">
                <div className="flex flex-col items-start justify-center">
                  <motion.h2
                    className="px-4 md:text-6xl text-5xl text-surface-dark-foreground leading-tight font-medium"
                    initial={{ opacity: 0, translateY: 60 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeOut',
                    }}
                    viewport={{ once: true }}
                  >
                    Are you ready to connect?
                  </motion.h2>
                </div>
              </div>
            </FollowerPointerCard>
            <footer className="overflow-x-hidden">
              <div className="max-w-7xl mx-auto pt-8 pb-24 sm:pt-12 md:pt-16 px-5 sm:px-6 md:px-4">
                <div className="w-full flex px-1 py-2 justify-end">
                  <MagneticWrapper>
                    <motion.a
                      className="rounded-full h-16 w-16 bg-neutral-800 items-center justify-center text-neutral-200 hover:text-primary-600 hover:bg-neutral-700 transition-all duration-300 ease-in-out hover:scale-110 flex"
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
                    <span className="text-xl md:text-2xl text-surface-dark-foreground font-medium tracking-tight col-start-8 col-span-3">
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
                    <span className="text-xl md:text-2xl text-surface-dark-foreground font-medium tracking-tight col-start-1 col-span-7">
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
