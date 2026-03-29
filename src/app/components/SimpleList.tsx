import { projectRegistry } from '@/app/data/projects';
import { ideaRegistry } from '@/app/data/ideas';
import { writingRegistry } from '@/app/data/writing';
import { ListRow } from '@/app/components/ListRow';

export function SimpleList() {
  const projects = [...projectRegistry].sort((a, b) => a.order - b.order);
  const ideas = [...ideaRegistry].sort((a, b) => a.order - b.order);
  const writing = [...writingRegistry].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Projects */}
      <section>
        <p className="text-xs uppercase tracking-widest text-surface-dark-muted/60 mb-4">
          Projects
        </p>
        {projects.map(p => (
          <ListRow
            key={p.projectSlug}
            title={p.title}
            description={p.subtitle}
            href={`/projects/${p.projectSlug}`}
          />
        ))}
      </section>

      {/* Writing — only rendered when registry has entries */}
      {writing.length > 0 && (
        <section className="mt-12">
          <p className="text-xs uppercase tracking-widest text-surface-dark-muted/60 mb-4">
            Writing
          </p>
          {writing.map(w => (
            <ListRow
              key={w.writingSlug}
              title={w.title}
              description={w.subtitle}
              href={w.url ?? `/writing/${w.writingSlug}`}
            />
          ))}
        </section>
      )}

      {/* Ideas */}
      <section className="mt-12">
        <p className="text-xs uppercase tracking-widest text-surface-dark-muted/60 mb-4">
          Ideas
        </p>
        {ideas.map(i => (
          <ListRow
            key={i.id}
            title={i.title}
            description={i.subtitle}
            href={`/ideas/${i.ideaSlug}`}
          />
        ))}
      </section>
    </div>
  );
}
