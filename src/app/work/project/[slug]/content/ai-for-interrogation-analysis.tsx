'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';

export default function AIInterrogationContent() {
  return (
    <>
      {/* Section 1 — Summary + Key Outcomes */}
      <MiddleSection className="mb-20 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Summary
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            My design work for the FENRIR system was a consulting assignment for
            Damalytics. We tackled a massive operational bottleneck for an
            intelligence service. Interrogators face extreme cognitive limits in
            the field. They have to listen, formulate questions, assess
            credibility, and document everything simultaneously. We quickly
            realized this constant multitasking leads to cognitive overload and
            biases like confirmation or anchoring.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            FENRIR is a secure, offline-first workbench. Our design work went
            beyond the interface. We also architected the backend by building a
            local Retrieval-Augmented Generation (RAG) system and a secure data
            pipeline to run entirely offline. We decided to treat AI as a
            socio-cognitive teammate rather than a passive automation tool. We
            introduced deliberate &quot;frictional design&quot; to ensure
            analysts remain the active decision-makers. The software handles the
            mechanical work of reading transcripts and rebuilding timelines, but
            the human always remains in control.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Key outcomes
          </h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Reduced cognitive load.
              </span>{' '}
              The system automatically pulls out names, places, and events from
              transcripts so interrogators can focus on strategic analysis
              instead of note-taking.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Mitigated biases.
              </span>{' '}
              Frictional design patterns force users to document their initial
              thoughts and verify flagged claims. This directly counters
              automation and confirmation biases.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Accelerated workflows.
              </span>{' '}
              The software automatically maps evidence against Priority
              Intelligence Requirements (PIRs). This cuts down the time needed
              to convert raw interviews into actionable reports.
            </li>
          </ol>
        </div>
      </MiddleSection>

      {/* Section 2 — Mockup Showcase */}
      <WideSection className="mb-20 space-y-12">
        <div className="space-y-4">
          <ProjectImage
            src="/resource/projects/fenrir_1.png"
            alt="FENRIR System UI showcasing the progressive intelligence workspace"
            width={1920}
            height={1080}
            rounded={true}
            size="full"
          />
          <p className="text-center text-sm text-muted-foreground">
            The FENRIR workbench, designed for secure, offline-first
            intelligence analysis.
          </p>
        </div>
      </WideSection>

      {/* Section 3 — The challenge */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The challenge</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            The multitasking bottleneck
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Intelligence interrogators have to conduct interviews, interpret
            nuances, and draft structured reports all at once. This cognitive
            load degrades working memory and opens the door to biases. We
            cooperated with an authority for user evaluations and requirements
            specifications to really understand this workflow. We found that
            when an interview ends, analysts face the massive task of manually
            reviewing recordings. This amplifies the risk of forgetting details
            and losing intelligence.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The core design challenge was introducing AI assistance without
            creating automation bias. Users have a dangerous tendency to blindly
            trust machine-generated output and stop thinking critically. In
            intelligence work, an unverified hallucination can cause
            catastrophic real-world consequences. We knew we could not just
            build a system that gave the answers.
          </p>
        </div>
      </MiddleSection>

      {/* Section 4 — Mockup Showcase 2 */}
      <WideSection className="mb-20 space-y-12">
        <div className="space-y-4">
          <ProjectImage
            src="/resource/projects/fenrir_2.svg"
            alt="FENRIR workspace showing automated PIR tracking and gap analysis"
            width={1920}
            height={1080}
            rounded={true}
            size="xxl"
          />
          <p className="text-center text-sm text-muted-foreground">
            Automated tracking of Priority Intelligence Requirements (PIRs),
            visualizing knowns and intelligence gaps.
          </p>
        </div>
      </WideSection>

      {/* Section 5 — The Solution & Design Process */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The solution &amp; design process</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Frictional design
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            We solved the automation bias problem by rooting the system
            architecture in frictional design. FENRIR acts as a socio-cognitive
            teammate rather than an all-knowing oracle. The interface introduces
            deliberate friction. It requires the interrogator to write down
            their initial thoughts before viewing any AI outputs. It also
            mandates active verification of flagged claims. This guarantees the
            human remains the accountable decision-maker.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Progressive intelligence workspace
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            We structured the UI around a modular three-panel layout. It
            combines a structured findings dashboard, the raw transcript with
            synchronized audio playback, and a protocol drafting editor. This
            progressive setup lets analysts start working immediately without
            waiting for a full analysis cycle to finish.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Architecting the AI pipeline
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Because cloud processing was out of the question, we built a local
            Retrieval-Augmented Generation (RAG) pipeline that processes
            interrogation transcripts completely offline. We used an agentic
            workflow to handle complex reasoning tasks and broke down the
            analysis into specialized steps. Through rigorous prompt
            engineering, we ensured the local models remained highly accurate
            and grounded in the source data. This prevented hallucinations and
            created traceability for all insights.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            End-to-end traceability
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Every generated claim, summary, and assessment links directly to the
            exact source line in the transcript. We built a contextual chat and
            retrieval engine to handle this. When a user clicks a citation, the
            interface highlights the raw dialogue. This anchors all insights in
            verifiable facts and separates objective observations from
            subjective assessments.
          </p>
        </div>
      </MiddleSection>

      {/* Section 6 — Impact & Value */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Impact &amp; value</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Transforming the analyst&apos;s workflow
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            FENRIR handles the mechanical heavy lifting of reading transcripts,
            finding key names, and rebuilding timelines. This compresses the
            turnaround time for raw intelligence. It reduces verification
            fatigue and minimizes the risk of critical details slipping through
            the cracks. The result is a much higher quality of intelligence
            reports.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The real value of this design is that it equips decision-makers with
            faster and more reliable intelligence. It achieves this while
            maintaining strict operational security and human accountability. I
            keep thinking about how small design choices, like forcing a user to
            verify a claim before proceeding, can fundamentally change how we
            interact with AI.
          </p>
        </div>
      </MiddleSection>
    </>
  );
}
