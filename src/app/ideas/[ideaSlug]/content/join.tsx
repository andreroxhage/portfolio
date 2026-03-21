import { MiddleSection, SectionHeading } from '@/app/components/ProjectLayout';

export default function JoinContent() {
  return (
    <MiddleSection>
      <SectionHeading>About this project</SectionHeading>
      <p className="text-surface-dark-muted leading-relaxed mb-6">
        Customer data platforms shouldn&apos;t feel like rocket science. I led
        Join&apos;s redesign to turn complex data into clear insights and
        intuitive workflows, improving usability and driving adoption.
      </p>
      <SectionHeading>Approach</SectionHeading>
      <p className="text-surface-dark-muted leading-relaxed mb-6">
        Working closely with stakeholders and end-users, I mapped out the
        existing pain points and reimagined the core workflows. The focus was on
        reducing cognitive load while maintaining the power users needed.
      </p>
    </MiddleSection>
  );
}
