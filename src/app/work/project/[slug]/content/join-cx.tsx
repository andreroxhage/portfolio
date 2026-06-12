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
            Customer Data Platforms (CDPs) and loyalty programs shouldn’t feel
            like rocket science. As the Lead Product Designer and Design
            Engineer for Join, I led the product redesign of their enterprise
            loyalty platform. The goal was to transform complex customer data
            into clear insights and intuitive workflows.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            By bridging the gap between product strategy, UX design, and
            frontend implementation, I redesigned the interface from the ground
            up. The resulting design simplified complex configuration steps,
            improved dashboard usability, and helped clients launch loyalty
            programs without engineering support.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Key Outcomes
          </h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Improved Platform Adoption:
              </span>{' '}
              Rewritten dashboard layouts and simplified data visualizations
              improved usability and user engagement.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Streamlined Loyalty Configurations:
              </span>{' '}
              Replaced a tedious configuration flow with an interactive loyalty
              program builder.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Unified Component Library:
              </span>{' '}
              Built and documented a comprehensive design system in Vue,
              improving code quality, platform consistency, and developer
              velocity.
            </li>
          </ol>
        </div>
      </MiddleSection>

      {/* Section 2 — Mockup Showcase (Segments) */}
      <WideSection className="mb-20 space-y-12">
        <div className="space-y-4">
          <ProjectImage
            src="/resource/joinMockup1.png"
            alt="Join CX segment builder showing visual audience selection rules"
            width={1920}
            height={1080}
            rounded={true}
            size="sm"
          />
          <p className="text-center text-sm text-muted-foreground">
            Segment builder, allowing marketers to target groups of customers
            based on dynamic shopping habits and tiers.
          </p>
        </div>
      </WideSection>

      {/* Section 3 — Design Process & Problem */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The Challenge</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Simplifying the Complexity of Customer Data
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Loyalty marketers deal with vast amounts of fragmented transactional
            and behavioral data. In the previous version of the platform,
            building a simple campaign—such as targeting customers who hadn’t
            bought anything in 30 days and offering them double points—required
            complex queries and configuration.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            This high cognitive load led to frequent setup errors, delayed
            campaign launches, and heavy reliance on the Join support team. The
            product needed to hide database complexity behind an elegant, visual
            rule-builder.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Core Objectives
          </h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Enhance Data Clarity:
              </span>{' '}
              Provide marketers with a clear overview of their program’s health,
              conversion rates, and member value distributions.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Streamline Campaign Setups:
              </span>{' '}
              Transform reward rules, point systems, and triggers into a visual,
              error-free workflow.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Ensure Component Reusability:
              </span>{' '}
              Bridge design and code by establishing a robust design system that
              speeds up feature releases.
            </li>
          </ol>
        </div>
      </MiddleSection>

      {/* Section 4 — Mockup 2 Showcase (Dashboard) */}
      <WideSection className="mb-20 space-y-12">
        <div className="space-y-4">
          <ProjectImage
            src="/resource/joinMockup2.png"
            alt="Join CX platform dashboard showing customer loyalty analytics and campaign performance"
            width={1920}
            height={1080}
            rounded={true}
            size="sm"
          />
          <p className="text-center text-sm text-muted-foreground">
            The redesigned dashboard interface, highlighting key customer
            lifetime metrics and active loyalty program stats.
          </p>
        </div>
      </WideSection>

      {/* Section 5 — Execution, Architecture & Business Impact */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The Solution &amp; Engineering</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Bridging Design and Code
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            As a Design Engineer, I didn’t just hand off Figma links. I
            partnered with the engineering team to construct a modular UI
            library in Vue. I focused heavily on micro-interactions, responsive
            dashboard grids, and visual animations to make the data exploration
            process feel fast, tactile, and premium.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Using custom data visualizations built with Recharts, I created
            widgets that allow users to drill down into specific customer
            profiles, tracking purchase histories, points balances, and loyalty
            events in real time.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Platform Consistency &amp; Client Acquisitions
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Redesigning the Join platform did more than just satisfy design
            standards—it directly supported user adoption and client
            acquisitions:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Client Wins:
              </span>{' '}
              Improved usability and visual clarity of the analytics dashboard
              directly contributed to key enterprise client acquisitions,
              onboarding Filmstaden, Önska, and Bauhaus to the platform.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Reduced Support Overhead:
              </span>{' '}
              Simplifying the configuration flows eliminated common merchant
              setup errors, enabling self-guided onboarding and reducing
              reliance on customer support.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Enhanced Campaign Velocity:
              </span>{' '}
              By making the segmentation logic visual and intuitive, marketing
              managers could launch targeted customer loyalty campaigns
              independently without developer assistance.
            </li>
          </ul>
        </div>
      </MiddleSection>
    </>
  );
}
