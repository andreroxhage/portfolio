'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { projectRegistry } from '@/app/data/projects';
import { ideaRegistry } from '@/app/data/ideas';
import { cn } from '@/lib/utils';
import { GalleryCard } from './GalleryCard';
import { IdeaCard } from './IdeaCard';
import { IconList, IconLayoutGrid } from '@tabler/icons-react';

type SortKey = 'year-desc' | 'year-asc' | 'title-asc';
type ViewMode = 'list' | 'rich';
type TabValue = 'projects' | 'ideas';

const VIEW_STORAGE_KEY = 'gallery-view-mode';

export function TabbedGallery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sort, setSort] = useState<SortKey>('year-desc');

  // View mode: query param > localStorage > default 'list'
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const paramView = searchParams.get('view');
    if (paramView === 'rich') {
      return 'rich';
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(VIEW_STORAGE_KEY);
      if (stored === 'rich' || stored === 'list') {
        return stored;
      }
    }
    return 'list';
  });

  // Tab: query param > default 'projects'
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabValue>(
    tabParam === 'ideas' ? 'ideas' : 'projects'
  );

  const updateQueryParams = useCallback(
    (newTab: TabValue, newView: ViewMode) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newTab === 'ideas') {
        params.set('tab', 'ideas');
      } else {
        params.delete('tab');
      }

      if (newView === 'rich') {
        params.set('view', 'rich');
      } else {
        params.delete('view');
      }

      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ''}`, {
        scroll: false,
      });
    },
    [searchParams, router, pathname]
  );

  const handleTabChange = (value: string) => {
    const tab = value as TabValue;
    setActiveTab(tab);
    updateQueryParams(tab, viewMode);
  };

  const handleViewToggle = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem(VIEW_STORAGE_KEY, mode);
    updateQueryParams(activeTab, mode);
  };

  // Sync from URL on external navigation
  useEffect(() => {
    const paramTab = searchParams.get('tab');
    const paramView = searchParams.get('view');
    if (paramTab === 'ideas' && activeTab !== 'ideas') {
      setActiveTab('ideas');
    }
    if (paramTab !== 'ideas' && activeTab === 'ideas') {
      setActiveTab('projects');
    }
    if (paramView === 'rich' && viewMode !== 'rich') {
      setViewMode('rich');
    }
    if (paramView !== 'rich' && viewMode === 'rich') {
      setViewMode('list');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const sortFn = (
    a: { date: string; title: string },
    b: { date: string; title: string }
  ) => {
    if (sort === 'year-asc') {
      return a.date.localeCompare(b.date);
    }
    if (sort === 'title-asc') {
      return a.title.localeCompare(b.title);
    }
    return b.date.localeCompare(a.date);
  };

  const sortedProjects = useMemo(
    () => [...projectRegistry].sort(sortFn),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sort]
  );

  const sortedIdeas = useMemo(
    () => [...ideaRegistry].sort(sortFn),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sort]
  );

  return (
    <section className="bg-secondary w-full">
      <div className="max-w-8xl mx-auto px-4 py-16">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {/* Header */}
          <div className="flex items-start justify-between gap-8 mb-10">
            <div>
              <p className="text-xs text-surface-dark-muted/60 uppercase tracking-widest mb-3">
                Selected work
              </p>
              <h2 className="text-2xl font-medium text-surface-dark-foreground leading-snug max-w-sm">
                Design & research across interaction, product, and UX
              </h2>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 pt-1">
              <TabsList
                className={cn(
                  'bg-surface-dark-card rounded-full p-1 corner-squircle h-auto'
                )}
              >
                <TabsTrigger
                  value="projects"
                  className={cn(
                    'rounded-full px-5 py-1.5 text-xs font-medium text-surface-dark-muted',
                    'data-[state=active]:bg-primary-500 data-[state=active]:text-white data-[state=active]:shadow-none',
                    'transition-colors duration-200'
                  )}
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="ideas"
                  className={cn(
                    'rounded-full px-5 py-1.5 text-xs font-medium text-surface-dark-muted',
                    'data-[state=active]:bg-primary-500 data-[state=active]:text-white data-[state=active]:shadow-none',
                    'transition-colors duration-200'
                  )}
                >
                  Ideas
                </TabsTrigger>
              </TabsList>

              {/* View toggle */}
              <div className="flex bg-surface-dark-card rounded-full p-1 corner-squircle">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleViewToggle('list')}
                  className={cn(
                    'h-7 w-7 rounded-full',
                    viewMode === 'list'
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'text-surface-dark-muted hover:text-surface-dark-foreground hover:bg-transparent'
                  )}
                  aria-label="List view"
                >
                  <IconList size={14} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleViewToggle('rich')}
                  className={cn(
                    'h-7 w-7 rounded-full',
                    viewMode === 'rich'
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'text-surface-dark-muted hover:text-surface-dark-foreground hover:bg-transparent'
                  )}
                  aria-label="Preview view"
                >
                  <IconLayoutGrid size={14} />
                </Button>
              </div>

              <Select value={sort} onValueChange={v => setSort(v as SortKey)}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectItem value="year-desc">Newest first</SelectItem>
                  <SelectItem value="year-asc">Oldest first</SelectItem>
                  <SelectItem value="title-asc">A → Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Top border of list */}
          <div className="border-t border-surface-dark-elevated" />

          <TabsContent value="projects" className="mt-0">
            {sortedProjects.map(project => (
              <GalleryCard
                key={project.projectSlug}
                project={project}
                viewMode={viewMode}
              />
            ))}
          </TabsContent>

          <TabsContent value="ideas" className="mt-0">
            {sortedIdeas.map(idea => (
              <IdeaCard key={idea.id} idea={idea} viewMode={viewMode} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
