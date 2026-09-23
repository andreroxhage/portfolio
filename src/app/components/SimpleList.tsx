import { projectRegistry } from '@/app/data/projects';
import { experimentRegistry } from '@/app/data/experiments';
import { writingRegistry } from '@/app/data/writing';
import { ListRow } from '@/app/components/ListRow';
import Link from 'next/link';

export function SimpleList() {
  const projects = [...projectRegistry].sort((a, b) => a.order - b.order);
  const experiments = [...experimentRegistry].sort((a, b) => a.order - b.order);
  const writing = [...writingRegistry].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-2.5xl mx-auto px-4 py-24">
      {/* Profile header */}
      <div className="mb-12 md:mb-24">
        <div>
          <Link
            href="/"
            className="text-base font-semibold text-foreground leading-snug"
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
        <p className="text-base leading-tight tracking-wide font-semibold text-foreground mb-4 md:mb-6">
          Today
        </p>
        <p className="text-base text-muted-foreground/90 leading-relaxed tracking-wide text-balance">
          I&apos;m a design engineer at Netlight, blending software development
          with design. <br />I care about how products feel and impact us, and
          enjoy making complex things feel simple.
        </p>
      </section>

      {/* Projects */}
      <section className="md:mt-24 mt-16">
        <p className="text-base leading-tight tracking-wide font-semibold text-foreground mb-2 md:mb-4">
          Projects
        </p>
        <ul className="list-none">
          {projects.map(p => (
            <li key={p.projectSlug}>
              <ListRow
                title={p.title}
                description={p.subtitle}
                href={`/work/project/${p.projectSlug}`}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Writing — only rendered when registry has entries */}
      {writing.length > 0 && (
        <section className="md:mt-24 mt-16">
          <p className="text-base leading-tight tracking-wide font-semibold text-foreground mb-2 md:mb-4">
            Writing
          </p>
          <ul className="list-none">
            {writing.map(w => (
              <li key={w.writingSlug}>
                <ListRow
                  title={w.title}
                  description={w.subtitle}
                  href={w.url ?? `/work/writing/${w.writingSlug}`}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experiments */}
      <section className="md:mt-24 mt-16">
        <p className="text-base leading-tight tracking-wide font-semibold text-foreground mb-2 md:mb-4">
          Experiments
        </p>
        <ul className="list-none">
          {experiments.map(e => (
            <li key={e.id}>
              <ListRow
                title={e.title}
                description={e.subtitle}
                href={`/work/experiment/${e.experimentSlug}`}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
