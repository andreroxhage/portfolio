import React from 'react';
import { MiddleSection, SectionHeading } from '@/app/components/ProjectLayout';

export default function AiAsASecondOpinion() {
  return (
    <MiddleSection>
      <SectionHeading>The Question of Timing</SectionHeading>
      <p className="text-surface-dark-muted leading-relaxed mb-6">
        My thesis investigated a specific and underexplored dimension of AI in
        clinical settings: not whether AI can assist with diagnosis, but{' '}
        <em>when</em> that assistance should arrive. The study examined how the
        timing of AI input — relative to a clinician&apos;s own reasoning
        process — shapes the quality of the final diagnostic decision.
        Specifically, it compared two conditions: receiving AI output before
        forming an independent judgment, and receiving it after.
      </p>

      <SectionHeading>What the Study Found</SectionHeading>
      <p className="text-surface-dark-muted leading-relaxed mb-6">
        The findings point in a consistent direction. When clinicians encounter
        an AI recommendation before engaging in their own analysis — the
        &ldquo;first opinion&rdquo; condition — they tend to anchor on it. Their
        reasoning narrows, and the AI&apos;s output effectively displaces rather
        than supplements their judgment. In the &ldquo;second opinion&rdquo;
        condition, the dynamic inverts. Having already committed to a
        preliminary assessment, clinicians engage with the AI output more
        critically. They integrate it where it adds value and push back where
        their own reasoning diverges — a genuinely collaborative dynamic rather
        than passive adoption.
      </p>

      <SectionHeading>Why This Matters for Design</SectionHeading>
      <p className="text-surface-dark-muted leading-relaxed mb-6">
        These findings carry direct consequences for how AI diagnostic tools are
        built and deployed. A system that surfaces its recommendation at the
        start of a clinical encounter — however accurate — may inadvertently
        reduce the quality of human reasoning it was meant to support. The
        interaction order is not a neutral implementation detail; it is a design
        decision with measurable effects on clinical outcomes. Tools built
        around the second-opinion model, which prompt the clinician to record
        their initial assessment before revealing AI output, preserve
        independent thinking while still making AI guidance available.
      </p>

      <p className="text-surface-dark-muted leading-relaxed mb-6">
        The broader implication is that the value of AI in high-stakes
        professional domains depends as much on workflow integration as on model
        performance. An AI system that outperforms human clinicians in isolation
        can still degrade the system it operates within if its output arrives at
        the wrong moment. Designing for appropriate timing is therefore not a UX
        concern grafted onto an otherwise technical problem — it is central to
        whether the tool helps at all.
      </p>
    </MiddleSection>
  );
}
