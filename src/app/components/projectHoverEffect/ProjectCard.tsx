import { motion } from 'framer-motion';
import { Project } from '@/app/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { BUTTON_PRESS_SCALE } from '@/app/lib/motion';

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    whileTap={{ scale: BUTTON_PRESS_SCALE }}
    className="bg-gray-900 border border-white/10 rounded-4xl hover:bg-gray-800 cursor-pointer transition-all duration-150 p-6"
  >
    <div className="flex items-center gap-4">
      <PlusIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
      <h3 className="text-base md:text-lg font-medium text-gray-100">
        {project.title}
      </h3>
    </div>
  </motion.div>
);
export default ProjectCard;
