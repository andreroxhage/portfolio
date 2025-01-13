"use client";
import Image from "next/image";
import ScrollScaleWrapper from "@/app/components/ScrollScaleWrapper";
import { projects } from "@/app/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProjectNavigation from "@/app/components/ProjectNavigation";

export default function Page({ params }: { params: { projectSlug: string } }) {
  const project = projects.find((p) => p.projectSlug === params.projectSlug);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: [0, 1],
  });
  const hue = useTransform(scrollYProgress, [0, 0.3], ["#FAEFDE", "#fafaf8"]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-500">
        Project not found
      </div>
    );
  }

  return (
    <motion.div id="header" style={{ backgroundColor: hue }}>
      {project.headerSrc ? (
        <header
          className="h-2/6 md:h-2/5 flex justify-center items-start md:items-center py-12 md:py-36"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${project.headerSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-secondary-green-darker mb-2"
              style={{ color: project.titleColor || "#739966" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {project.title}
            </motion.h1>

            {project.subtitle && (
              <motion.h2
                className="text-lg md:text-xl font-medium mt-2"
                style={{
                  color: project.subtitleColor || "#D3E9C2",
                }}
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.1,
                }}
              >
                {project.subtitle}
              </motion.h2>
            )}
            {project.date && (
              <motion.h3
                className="text-lg md:text-xl font-extralight mt-2"
                style={{
                  color: project.subtitleColor || "#D3E9C2",
                }}
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: 0.1,
                }}
              >
                {project.date}
              </motion.h3>
            )}
          </div>
        </header>
      ) : (
        <header className="flex flex-col items-center justify-center min-h-[40vh] bg-primary-grey-light text-center px-4 bg-primary-blackish">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-secondary-green-darker mb-2"
            style={{ color: project.titleColor || "#739966" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {project.title}
          </motion.h1>

          {project.subtitle && (
            <motion.h2
              className="text-lg md:text-xl font-mediummt-2"
              style={{
                color: project.subtitleColor || "#D3E9C2",
              }}
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.1,
              }}
            >
              {project.subtitle}
            </motion.h2>
          )}
        </header>
      )}

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 pt-12 grid grid-cols-10 gap-8">
        {"sections" in project &&
          project.sections.map((section: any, index: number) => {
            const { title = "", layout = "middle", content = [] } = section;

            const layoutClasses = {
              middle:
                "mb-12 md:col-start-3 col-start-1 md:col-span-6 col-span-10",
              "two-col": "mb-12 col-span-10",
              "full-width": "mb-12 col-span-10",
            };
            const sectionWrapperClasses =
              layoutClasses[layout as keyof typeof layoutClasses] ||
              "mb-12 col-span-10";

            return (
              <motion.div
                key={index}
                className={sectionWrapperClasses}
                initial={{ opacity: 0, translateY: 60 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {title && layout !== "two-col" && (
                  <h2 className="text-2xl md:text-3xl font-semibold text-primary-grey-brighter mb-4">
                    {title}
                  </h2>
                )}

                {layout === "two-col" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                      {title && (
                        <h2 className="text-2xl md:text-3xl font-semibold text-primary-grey-brighter mb-4">
                          {title}
                        </h2>
                      )}
                      {content
                        .filter(
                          (c: { column: string }) =>
                            "column" in c && c.column === "left"
                        )
                        .map((c: any, i: number) => renderContent(c, i))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                      {content
                        .filter(
                          (c: any) => "column" in c && c.column === "right"
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
  function renderContent(content: any, key: number, colSpan = "col-span-10") {
    if (!content) {
      return null;
    }

    switch (content.type) {
      case "title":
        return (
          <h3
            key={key}
            className="text-xl md:text-2xl font-semibold text-primary-grey-brighter mb-4"
          >
            {content.text}
          </h3>
        );

      case "text":
        return (
          <div
            key={key}
            className={`${colSpan} text-base md:text-lg font-medium text-primary-grey-brighter`}
          >
            {content.subtitle && (
              <h4 className="text-lg font-semibold mb-2">{content.subtitle}</h4>
            )}
            {content.paragraphs?.map((paragraph: string, pIndex: number) => (
              <p className="m-0 text-base md:text-lg mb-4" key={pIndex}>
                {paragraph}
              </p>
            ))}
          </div>
        );

      case "list":
        return (
          <div key={key} className={`${colSpan} text-primary-grey-brighter`}>
            {content.subtitle && (
              <h4 className="text-lg font-semibold mb-2">{content.subtitle}</h4>
            )}
            {content.style === "bullet" ? (
              <ul className="list-disc pl-5">
                {content.items.map((item: string, index: number) => (
                  <li key={index} className="text-base md:text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <ol className="list-decimal pl-5">
                {content.items.map((item: string, index: number) => (
                  <li key={index} className="text-base md:text-lg">
                    {item}
                  </li>
                ))}
              </ol>
            )}
          </div>
        );

      case "enumeration":
        return (
          <div key={key} className={`${colSpan} text-primary-grey-brighter`}>
            {content.subtitle && (
              <h4 className="text-lg font-semibold mb-2">{content.subtitle}</h4>
            )}
            <ol className="list-decimal pl-5">
              {content.items.map((item: { text: string }, index: number) => (
                <li key={index} className="text-base md:text-lg">
                  {item.text}
                </li>
              ))}
            </ol>
          </div>
        );

      case "image":
        return (
          <ScrollScaleWrapper
            key={key}
            fade={true}
            className={`${colSpan} mt-8`}
          >
            <Image
              src={content.src}
              alt={content.alt || "Section image"}
              className="w-full rounded-lg"
              layout="responsive"
              width={700}
              height={475}
            />
          </ScrollScaleWrapper>
        );

      case "link":
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
