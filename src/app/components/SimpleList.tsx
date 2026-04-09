import { projectRegistry } from '@/app/data/projects';
import { ideaRegistry } from '@/app/data/ideas';
import { writingRegistry } from '@/app/data/writing';
import { ListRow } from '@/app/components/ListRow';
import Link from 'next/link';

export function SimpleList() {
  const projects = [...projectRegistry].sort((a, b) => a.order - b.order);
  const ideas = [...ideaRegistry].sort((a, b) => a.order - b.order);
  const writing = [...writingRegistry].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-2.5xl mx-auto px-4 py-24">
      {/* Profile header */}
      <div className="mb-12 md:mb-24">
        <div>
          <Link
            href="/"
            className="text-base font-medium text-foreground leading-snug"
          >
            André Roxhage
          </Link>
          <p className="text-base text-muted-foreground/90 leading-snug">
            Design Engineer
          </p>
        </div>
      </div>

      {/* About */}
      <section className="md:mt-12 mt-8">
        <p className="text-base leading-tight tracking-wide font-medium text-foreground mb-4 md:mb-6">
          Today
        </p>
        <p className="text-base text-muted-foreground/90 leading-relaxed tracking-wide text-balance">
          I&apos;m a design engineer at Netlight, blending software development
          with design. I care about how products feel and impact us, and enjoy
          making complex things feel simple.
        </p>
      </section>

      {/* Projects */}
      <section className="md:mt-24 mt-16">
        <p className="text-base leading-tight tracking-wide font-medium text-foreground mb-2 md:mb-4">
          Projects
        </p>
        {projects.map(p => (
          <ListRow
            key={p.projectSlug}
            title={p.title}
            description={p.subtitle}
            href={`/work/project/${p.projectSlug}`}
          />
        ))}
      </section>

      {/* Writing — only rendered when registry has entries */}
      {writing.length > 0 && (
        <section className="md:mt-24 mt-16">
          <p className="text-base leading-tight tracking-wide font-medium text-foreground mb-2 md:mb-4">
            Writing
          </p>
          {writing.map(w => (
            <ListRow
              key={w.writingSlug}
              title={w.title}
              description={w.subtitle}
              href={w.url ?? `/work/writing/${w.writingSlug}`}
            />
          ))}
        </section>
      )}

      {/* Ideas */}
      <section className="md:mt-24 mt-16">
        <p className="text-base leading-tight tracking-wide font-medium text-foreground mb-2 md:mb-4">
          Ideas
        </p>
        {ideas.map(i => (
          <ListRow
            key={i.id}
            title={i.title}
            description={i.subtitle}
            href={`/work/idea/${i.ideaSlug}`}
          />
        ))}
      </section>
    </div>
  );
}
