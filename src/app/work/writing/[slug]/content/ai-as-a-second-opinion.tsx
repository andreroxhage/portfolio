import React from 'react';
import { MiddleSection, SectionHeading } from '@/app/components/ProjectLayout';

export default function AiAsASecondOpinion() {
  return (
    <MiddleSection>
      <SectionHeading>The Question of Timing</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        I studied both computer science and psychology because I wanted to
        understand how to build interfaces that actually fit the way people
        think. For my bachelor&apos;s thesis at Lund University, I looked at a
        simple question that often gets lost in the hype around medical AI: it
        is not about whether an AI can help doctors diagnose patients, but
        exactly when it should speak up. To test this, I partnered with
        TalkToAlba, a clinical AI startup, and set up an experiment with 51
        mental health professionals.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        I split the clinicians into three groups. The first group interviewed a
        patient and diagnosed them without any AI help, only seeing the
        AI&apos;s thoughts at the very end. The second group saw the AI&apos;s
        suggestions before they even met the patient, and again afterward. The
        third group did the interview first, then consulted the AI before
        committing to their final diagnosis.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        To make the test realistic, we built three interactive, simulated
        patient personas based on actual, anonymized clinical transcripts. We
        spent a lot of time on the prompt engineering here, mapping out state
        sheets for mood, energy, and speech patterns instead of just telling the
        model to &quot;act depressed&quot; or &quot;act manic.&quot; This made
        the simulated patients react organically to the interviewers without
        using textbook medical jargon.
      </p>

      <SectionHeading>What the Study Uncovered</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        The results were not statistically significant, mostly because of our
        small sample size and how hard it is to balance case difficulty, but the
        descriptive trends were telling. Clinicians who saw the AI
        recommendations before the interview ended up with a final diagnostic
        accuracy of 38.5%. In comparison, those who interviewed the patient
        first and looked at the AI afterward achieved 72.2% accuracy. This
        suggests that seeing the AI&apos;s opinion too early can act as a
        cognitive anchor, narrowing a clinician&apos;s focus.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        We also saw how easily clinicians trusted the tool. When TalkToAlba was
        correct, 75.0% of the clinicians got the diagnosis right. But when the
        AI was wrong, clinician accuracy plummeted to 31.6%. Most clinicians
        simply followed the incorrect AI suggestion, which points to a real
        danger of automation bias.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        Clinicians themselves preferred getting help after the interview rather
        than before. And while the AI did not save time during the diagnostic
        process itself, it did speed up documentation when generating patient
        journal notes, showing a clear administrative win.
      </p>

      <SectionHeading>Designing for Cognitive Safety</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        This timing issue is not just an academic detail. It is a design choice
        with massive safety implications. When an interface surfaces a
        recommendation too early, it displaces human reasoning. The user anchors
        on the suggestion and stops looking for contradictory evidence.
      </p>

      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        We need to design second-opinion workflows. The interface should prompt
        the user to write down their own observations and initial thoughts
        before revealing what the AI thinks. By hiding the AI&apos;s analysis
        until the human has done the initial work, we can design against
        automation bias and preserve independent judgment.
      </p>

      <SectionHeading>Reflection and the Bridge</SectionHeading>
      <p className="text-base text-surface-dark-muted leading-relaxed mb-6">
        This project showed me why we need design engineers who understand
        psychology. Building safe AI products is not just about model accuracy
        or data piping. It is about workflow design. If we build tools for
        high-stakes decisions, we have to design the timing of information as
        carefully as the features themselves.
      </p>
    </MiddleSection>
  );
}
