'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';

export default function JoinCXContent() {
  return (
    <>
      {/* Section 1 — summary + key outcomes */}
      <MiddleSection className="mb-20 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Summary
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            I worked at Join for several years, moving from leading an initial
            platform redesign to eventually designing and implementing a series
            of new features. Customer Data Platforms and loyalty programs can be
            difficult to use, but they do not have to feel like rocket science.
            During my time as a Design Engineer, I took on the challenge of
            turning their enterprise loyalty platform into something people
            actually understood.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            I redesigned the interface from the ground up. I did not just hand
            off Figma files, I actively built out the frontend components. This
            allowed me to systematically simplify complex configuration steps
            and improve dashboard usability. Ultimately, clients could launch
            entire loyalty programs without needing to ask for support.
          </p>
        </div>

        {/* Section 2 — Mockup Showcase (Segments) */}
        <WideSection className="mb-20 space-y-12">
          <div className="space-y-4">
            <ProjectImage
              src="/resource/joinMockup1.png"
              alt="Join CX segment builder showing visual audience selection rules"
              width={1920}
              height={1080}
              rounded={true}
              size="xl"
            />
            <p className="text-center text-sm text-muted-foreground">
              The Segment Builder allowed marketers to target groups of
              customers based on dynamic shopping habits and tiers.
            </p>
          </div>
        </WideSection>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Key outcomes
          </h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Improved Platform Adoption.
              </span>{' '}
              I rewrote dashboard layouts and simplified data visualizations to
              make the platform highly usable for our clients.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Streamlined Configurations.
              </span>{' '}
              I replaced tedious setup flows with interactive workflows like a
              drag-and-drop Journey Builder.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Unified Component Library.
              </span>{' '}
              I built and documented a comprehensive design system in both Figma
              and Vue. This improved our code quality and helped developers ship
              features much faster but also helped brand consistency.
            </li>
          </ol>
        </div>
      </MiddleSection>

      {/* Section 3 — The Challenge & Core Thread */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The challenge</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Understanding the data complexity
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Marketers deal with an overwhelming amount of fragmented
            transactional and behavioral data. In the older version of the
            platform, building a simple campaign required complex queries. There
            was a lot of data to understand and visualize. This caused frequent
            setup errors and delayed campaign launches. Marketers ended up
            relying heavily on the Join support team just to do their jobs. I
            realized the product had to rethink this complexity through
            interface interactions that simplified large tasks into smaller,
            easier ones.
          </p>
        </div>
      </MiddleSection>

      {/* Section 5 — Redesigned customer profile showcase */}
      <WideSection className="mb-20 space-y-12">
        <div className="space-y-4">
          <ProjectImage
            src="/resource/joinProfileRedesign.png"
            alt="Join CX redesigned customer profile page showing loyalty tier, active points, and customer value metrics"
            width={3024}
            height={2048}
            rounded={true}
            size="xxl"
          />
          <p className="text-center text-sm text-muted-foreground">
            The redesigned customer profile, highlighting key customer lifetime
            metrics and active loyalty program stats.
          </p>
        </div>
      </WideSection>

      {/* Section 4 — Feature Highlights */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Interactive workflows</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Visualizing the business
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            To give marketers a clearer overview of their business, I redesigned
            the customer profiles for better data visualization. I also
            introduced an Insights feature specifically designed for visualizing
            business statistics, taking data from multiple sources through our
            integrations. This allowed users to better understand their loyalty
            program&apos;s results and guide their marketing decisions without
            parsing spreadsheets.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Simplifying campaign setups
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The Segment Builder was just the beginning. I focused on
            transforming reward rules and point systems into visual workflows.
            For example, I redesigned the Journey Builder into a drag-and-drop
            canvas. This allowed marketers to gain a much better overview of the
            customer lifecycle and construct complex automation rules visually.
          </p>
        </div>

        {/* Journey Builder canvas showcase */}
        <WideSection className="mb-4 space-y-12">
          <div className="space-y-4">
            <ProjectImage
              src="/resource/joinJourneyCanvas.png"
              alt="Join CX Journey Builder create-journey screen with drag-and-drop trigger, entry, and reward-action blocks"
              width={3824}
              height={2484}
              rounded={true}
              size="xxl"
            />
            <p className="text-center text-sm text-muted-foreground">
              The Journey Builder as a drag-and-drop canvas, where marketers
              compose a journey by dragging triggers, entry rules, and reward
              actions into place.
            </p>
          </div>
        </WideSection>
      </MiddleSection>

      {/* Section 6 — Execution, Architecture & Business Impact */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The Solution &amp; Engineering</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Bridging Design and Code
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            As a Design Engineer, I never just handed off Figma links. I
            partnered directly with the engineering team to construct a modular
            UI library in Vue. I spent a lot of time on micro-interactions,
            responsive dashboard grids, and animations. I wanted the data
            exploration process to feel fast and tactile.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            I used custom data visualizations to create widgets that allow users
            to drill down into specific customer profiles. They could track
            purchase histories, points balances, and loyalty events in real time
            without feeling overwhelmed.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Real business impact
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Redesigning the Join platform went far beyond satisfying design
            standards. It directly drove user adoption and helped us win major
            deals.
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Major Client Wins.
              </span>{' '}
              The improved usability of the product directly contributed to
              onboarding enterprise clients like Filmstaden, Önska, and Bauhaus.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Reduced support overhead.
              </span>{' '}
              I simplified the configuration flows to eliminate common setup
              errors. This allowed for self-guided onboarding and drastically
              reduced support tickets.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Enhanced campaign velocity.
              </span>{' '}
              Because I made the segmentation logic visual and intuitive,
              marketing managers finally had the freedom to launch targeted
              loyalty campaigns completely on their own.
            </li>
          </ol>
        </div>

        <div>
          <p className="text-base text-muted-foreground leading-relaxed italic mt-4 border-l-2 border-surface-dark-muted pl-4">
            Looking back on my years at Join, I realize that building enterprise
            software is less about adding features and more about aggressively
            removing friction. The real win was seeing non-technical users
            confidently navigate complex data without fear of breaking the
            system.
          </p>
        </div>
      </MiddleSection>
    </>
  );
}
