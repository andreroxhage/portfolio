import { Project } from '@/app/types';

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="hover:bg-white bg-primary-whiteish/60 p-4 rounded-3xl group transition-all duration-150">
    <div className="text-primary-blackish flex justify-between items-center">
      <label className="text-lg md:text-xl font-semibold text-primary-grey">
        {project.title}
      </label>
      <span>{project.date}</span>
    </div>
    <p className="text-base md:text-lg font-light text-primary-grey mt-2 text-left">
      {project.subtitle}
    </p>
    <div className="flex flex-wrap gap-2 mt-4">
      {project.tags.map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="px-3 py-1 rounded-xl border border-gray-800/40 text-primary-grey-brighter w-fit text-xs cursor-default cursor-pointer"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);
export default ProjectCard;
