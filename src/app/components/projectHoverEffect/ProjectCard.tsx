import { motion } from 'framer-motion';
import type { GridItem } from '@/app/types';
import { PlusIcon } from '@heroicons/react/24/outline';
import { BUTTON_PRESS_SCALE } from '@/app/lib/motion';

const ProjectCard = ({ item }: { item: GridItem }) => (
  <motion.div
    whileTap={{ scale: BUTTON_PRESS_SCALE }}
    className="bg-surface-dark inset-shadow-border-glow rounded-[28px] corner-squircle hover:bg-surface-dark-elevated cursor-pointer transition-all duration-150 p-6"
  >
    <div className="flex items-center gap-4">
      <PlusIcon className="w-5 h-5 text-surface-dark-muted shrink-0" />
      <h3 className="text-base md:text-lg font-medium text-surface-dark-foreground">
        {item.title}
      </h3>
    </div>
  </motion.div>
);
export default ProjectCard;
