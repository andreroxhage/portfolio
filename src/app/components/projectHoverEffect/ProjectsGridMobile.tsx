import React from 'react';
import { projects } from '@/app/data/projects';
import { ideas } from '@/app/data/ideas';
import type { GridItem, GalleryItem } from '@/app/types';
import { galleryItemToGridItem } from '@/app/types';
import { AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import GifDialogMobile from './VideoDialogMobile';
import ProjectCard from './ProjectCard';

interface ProjectGridMobileProps {
  items?: GridItem[];
}

const ProjectGridMobile: React.FC<ProjectGridMobileProps> = ({
  items: itemsProp,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GridItem | null>(null);

  const allItems = useMemo(() => {
    if (itemsProp) {
      return itemsProp;
    }
    const gallery: GalleryItem[] = [...projects, ...ideas];
    return gallery.map(galleryItemToGridItem).sort((a, b) => a.order - b.order);
  }, [itemsProp]);

  return (
    <div className="flex flex-col h-full justify-between items-center pb-12 flex-grow">
      <div className="flex flex-col gap-12 pb-24 pt-12 w-full h-full overflow-y-auto">
        <div className="flex flex-col gap-4">
          {allItems.map(item => (
            <button
              key={item.id}
              className="cursor-pointer text-left"
              onClick={() => {
                setDialogOpen(true);
                setCurrentItem(item);
              }}
            >
              <ProjectCard item={item} />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {dialogOpen && currentItem && (
          <GifDialogMobile
            item={currentItem}
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGridMobile;
