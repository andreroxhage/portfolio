'use client';
import Image from 'next/image';
import ScrollScaleWrapper from '@/app/components/ScrollScaleWrapper';
import { projects } from '@/app/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectNavigation from '@/app/components/ProjectNavigation';
import { useState, useEffect, useRef } from 'react';
import VideoLoadingAnimation from '@/app/components/VideoLoadingAnimation';

export default function Page({ params }: { params: { projectSlug: string } }) {
  const project = projects.find(p => p.projectSlug === params.projectSlug);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: [0, 1],
  });
  const hue = useTransform(scrollYProgress, [0, 0.3], ['#FAEFDE', '#fafaf8']);

  useEffect(() => {
    fetch(`/api/videos?project=${params.projectSlug}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setVideoUrl(data[0].video_url);
        }
      });
  }, [params.projectSlug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semium text-gray-500">
        Project not found
      </div>
    );
  }

  return (
    <motion.div id="header" style={{ backgroundColor: hue }}>
      <header className="max-w-7xl mx-auto px-4 w-full flex justify-start items-start py-20">
        <div className="flex flex-row items-baseline gap-4">
          <motion.h1
            className="text-4xl md:text-6xl font-medium tracking-tighter text-secondary-green-darker"
            style={{ color: project.titleColor || '#739966' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            {project.title}
          </motion.h1>
          {project.date && (
            <motion.h3
              className="text-lg md:text-2xl font-normal opacity-80"
              style={{
                color: project.subtitleColor || '#788876',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
                delay: 0.1,
              }}
            >
              {project.date}
            </motion.h3>
          )}
        </div>
      </header>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 pt-2 grid grid-cols-10 gap-8">
        {'sections' in project &&
          project.sections.map((section: any, index: number) => {
            const { title = '', layout = 'middle', content = [] } = section;

            const layoutClasses = {
              middle:
                'mb-12 md:col-start-3 col-start-1 md:col-span-6 col-span-10',
              'two-col': 'mb-12 col-span-10',
              'full-width': 'mb-12 col-span-10',
            };
            const sectionWrapperClasses =
              layoutClasses[layout as keyof typeof layoutClasses] ||
              'mb-12 col-span-10';

            return (
              <motion.div
                key={index}
                className={sectionWrapperClasses}
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                viewport={{ once: true }}
              >
                {title && layout !== 'two-col' && (
                  <h2 className="text-2xl md:text-3xl font-semium text-brand-grey-brighter mb-3">
                    {title}
                  </h2>
                )}

                {layout === 'two-col' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                      {title && (
                        <h2 className="text-2xl md:text-3xl font-semium text-brand-grey-brighter mb-0">
                          {title}
                        </h2>
                      )}
                      {content
                        .filter(
                          (c: { column: string }) =>
                            'column' in c && c.column === 'left'
                        )
                        .map((c: any, i: number) => renderContent(c, i))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      {content
                        .filter(
                          (c: any) => 'column' in c && c.column === 'right'
                        )
                        .map((c: any, i: number) => renderContent(c, i))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {content.map((c: any, i: number) => renderContent(c, i))}
                  </div>
                )}
              </motion.div>
            );
          })}
      </div>
      <ProjectNavigation
        projects={projects}
        currentProjectSlug={params.projectSlug}
      />
    </motion.div>
  );

  // Helper function to render dynamic content
  function renderContent(content: any, key: number, colSpan = 'col-span-10') {
    if (!content) {
      return null;
    }

    const imageSizes = {
      sm: {
        width: 384,
        height: 261,
        sizes: '(max-width: 768px) 100vw, 24rem',
        className: 'max-w-sm mx-auto',
      },
      default: {
        width: 700,
        height: 475,
        sizes: '(max-width: 768px) 100vw, 33vw',
        className: '',
      },
      xl: {
        width: 1200,
        height: 815,
        sizes: '(max-width: 1200px) 100vw, 1200px',
        className: 'max-w-[1200px] mx-auto',
      },
    };

    const sizeConfig =
      imageSizes[(content.size as keyof typeof imageSizes) || 'default'];

    switch (content.type) {
      case 'title':
        return (
          <h3
            key={key}
            className="text-xl md:text-2xl font-semium text-brand-grey-brighter mb-2"
          >
            {content.text}
          </h3>
        );

      case 'text':
        return (
          <div
            key={key}
            className={`${colSpan} font-medium text-brand-grey-brighter`}
          >
            {content.subtitle && (
              <h4 className="text-xl font-semium mb-2">{content.subtitle}</h4>
            )}
            {content.paragraphs?.map((paragraph: string, pIndex: number) => (
              <p className="m-0 text-base md:text-lg mb-2" key={pIndex}>
                {paragraph}
              </p>
            ))}
          </div>
        );

      case 'list':
        return (
          <div key={key} className={`${colSpan} text-brand-grey-brighter`}>
            {content.subtitle && (
              <h4 className="text-xl font-semium mb-2">{content.subtitle}</h4>
            )}
            {content.style === 'bullet' ? (
              <ul className="list-disc pl-5">
                {content.items.map(
                  (
                    item: string | { prefix: string; text: string },
                    index: number
                  ) => (
                    <li key={index} className="text-base md:text-lg">
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          <span className="font-medium">{item.prefix}:</span>{' '}
                          {item.text}
                        </>
                      )}
                    </li>
                  )
                )}
              </ul>
            ) : (
              <ol className="list-decimal pl-5">
                {content.items.map(
                  (
                    item: string | { prefix: string; text: string },
                    index: number
                  ) => (
                    <li key={index} className="text-base md:text-lg">
                      {typeof item === 'string' ? (
                        item
                      ) : (
                        <>
                          <span className="font-medium">{item.prefix}:</span>{' '}
                          {item.text}
                        </>
                      )}
                    </li>
                  )
                )}
              </ol>
            )}
          </div>
        );

      case 'image':
        return (
          <ScrollScaleWrapper
            key={key}
            fade={true}
            className={`${colSpan} mt-8 ${sizeConfig.className}`}
          >
            <Image
              src={content.src}
              alt={content.alt || 'Section image'}
              className="rounded-lg w-full"
              sizes={sizeConfig.sizes}
              width={sizeConfig.width}
              height={sizeConfig.height}
            />
            {content.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {content.caption}
              </p>
            )}
          </ScrollScaleWrapper>
        );
      case 'video':
        if (!videoUrl) {
          return null;
        }
        return (
          <ScrollScaleWrapper
            key={key}
            fade={true}
            className="w-full h-full flex justify-center"
          >
            <div className="relative">
              {content.loading && (
                <VideoLoadingAnimation className="absolute inset-0 backdrop-blur-sm rounded-[40px]" />
              )}
              <video
                className={`max-w-full max-h-full object-contain rounded-[40px] transition-opacity duration-300 ${
                  content.loading ? 'opacity-0' : 'opacity-100'
                }`}
                autoPlay
                loop
                muted
                playsInline
                poster={content.poster}
                preload="metadata"
                style={{
                  maxHeight: '900px',
                  objectFit: content.objectFit || 'cover',
                }}
              >
                <source
                  src={videoUrl}
                  type={content.videoType || 'video/mp4'}
                />
                Your browser does not support the video tag.
              </video>

              {content.caption && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {content.caption}
                </p>
              )}
            </div>
          </ScrollScaleWrapper>
        );

      case 'link':
        return (
          <a
            key={key}
            href={content.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary-green-darker hover:underline"
          >
            {content.text}
          </a>
        );

      default:
        return null;
    }
  }
}
