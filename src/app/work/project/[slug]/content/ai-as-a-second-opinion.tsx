import React from 'react';
import { MiddleSection, SectionHeading } from '@/app/components/ProjectLayout';

export default function AiAsASecondOpinion() {
  return (
    <MiddleSection>
      <SectionHeading>The question of timing</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        I worked with TalkToAlba, a clinical AI startup, on a question that
        usually gets lost in the hype around medical AI. It is not really about
        whether an AI can help a clinician reach a diagnosis. It is about when
        the AI should speak up. A suggestion that lands too early can quietly
        take over someone&apos;s reasoning. To find out where that line sits, I
        designed and ran a controlled experiment with 51 mental health
        professionals.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        I split the clinicians into three groups. The first interviewed a
        patient and committed to a diagnosis with no AI input, only seeing the
        AI&apos;s take at the very end. The second saw the AI&apos;s suggestion
        before they even met the patient, and again afterward. The third did the
        interview first, then consulted the AI before locking in a final
        diagnosis.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        To make it realistic, I built three interactive simulated patients from
        real, anonymized clinical transcripts. This is where most of the prompt
        engineering went. Instead of telling the model to &quot;act
        depressed&quot; or &quot;act manic,&quot; I mapped out state sheets for
        mood, energy, and speech, so each persona reacted organically to
        whatever the clinician asked, without slipping into textbook jargon.
      </p>

      <SectionHeading>What I found</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        The pattern was hard to miss. Clinicians who saw the AI&apos;s
        recommendation before the interview finished landed on the right
        diagnosis 38.5% of the time. The ones who interviewed the patient first
        and only then looked at the AI hit 72.2%. Seeing the AI&apos;s opinion
        too early worked like a cognitive anchor, quietly narrowing where people
        looked.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        Trust was the other half of the story. When TalkToAlba was right, 75.0%
        of clinicians got the diagnosis right. When it was wrong, that dropped
        to 31.6%. Most people simply followed the incorrect suggestion. That is
        automation bias in action, and it is exactly the failure mode you do not
        want in a clinical tool.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        Interestingly, the clinicians themselves preferred getting help after
        the interview rather than before. The AI did not speed up the diagnosis
        itself, but it clearly helped with documentation, drafting patient
        journal notes much faster.
      </p>

      <SectionHeading>Designing for cognitive safety</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        This timing question is not a small detail. It is a design decision with
        real safety weight. Surface a recommendation too early and it displaces
        human reasoning. The person anchors on the suggestion and stops hunting
        for evidence that contradicts it.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        So the answer is to design deliberate second-opinion workflows. The
        interface should ask the clinician to record their own observations and
        first read before it reveals anything the AI thinks. Holding the
        AI&apos;s analysis back until the human has done their own work is a
        simple move, but it protects independent judgment and designs against
        automation bias.
      </p>

      <SectionHeading>What I took from it</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        This is exactly the kind of problem I like working on, where psychology
        and engineering meet. Building safe AI products is not really about
        model accuracy or data pipelines. It is about workflow, and about when
        information reaches a person. I translated these findings into concrete
        decision-support patterns, like prompting clinicians to record their own
        assessment first, which TalkToAlba&apos;s team used to shape a more
        trust-centered interface. If we build tools for high-stakes decisions,
        the timing of information deserves as much design care as the features
        themselves.
      </p>
    </MiddleSection>
  );
}
