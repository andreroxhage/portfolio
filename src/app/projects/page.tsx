'use client';
import { motion } from 'framer-motion';
import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { footerLinks } from '@/app/data';
import ProfilePicture from '../../../public/resource/profileImage.jpg';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ProjectsGrid = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGrid'),
  { ssr: false }
);
const ProjectsGridMobile = dynamic(
  () => import('@/app/components/projectHoverEffect/ProjectsGridMobile'),
  { ssr: false }
);

const HeaderLink: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <Link href={href}>
    <label className="text-sm md:text-base font-medium text-primary-grey-brighter cursor-pointer hover:text-secondary-green-darker transition-all duration-300">
      {label}
    </label>
  </Link>
);

const ProfileSection: React.FC = () => (
  <div className="flex gap-8 items-center justify-start">
    <Image
      className="h-auto w-16 lg:w-24 rounded-full drop-shadow-lg shadow-md md:shadow-customShadow"
      src={ProfilePicture}
      placeholder="blur"
      alt="André Roxhage profile picture"
      priority
      width={96}
      height={96}
    />
    <div className="flex flex-col gap-[6px] justify-center items-start">
      <h1 className="text-xl md:text-2xl font-bold text-primary-blackish">
        André Roxhage
      </h1>
      <h2 className="text-sm md:text-base font-medium text-primary-grey">
        Software Design Engineer
      </h2>
    </div>
  </div>
);

const ProjectsPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationLinks = useMemo(
    () => [
      { href: '/#about', label: 'About' },
      { href: footerLinks[2].href, label: 'Email' },
      { href: footerLinks[0].href, label: 'LinkedIn' },
    ],
    []
  );

  const animationConfig = useMemo(
    () => ({
      animate: {
        backgroundColor: ['#FAF5F0', '#DEF5F0', '#FAF0F4'],
      },
      transition: {
        duration: 16,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
      },
    }),
    []
  );

  return (
    <motion.div id="header" {...animationConfig}>
      <div className="max-w-5xl px-4 mx-auto h-full min-h-screen flex flex-col">
        <div className="md:pt-36 pt-20 md:pb-4 pb-0 flex md:flex-row flex-col items-center justify-between">
          <ProfileSection />

          <nav className="hidden md:flex flex-col gap-[6px] justify-center items-start">
            <div className="flex gap-4">
              {navigationLinks.map(link => (
                <HeaderLink key={link.href} {...link} />
              ))}
            </div>
          </nav>
        </div>

        {isMobile ? <ProjectsGridMobile /> : <ProjectsGrid />}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
