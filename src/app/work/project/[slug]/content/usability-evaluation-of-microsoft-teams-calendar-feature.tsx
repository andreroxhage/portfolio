'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';

export default function UsabilityEvaluationMicrosoftTeams() {
  return (
    <>
      {/* Section 1 — Summary */}
      <MiddleSection className="mb-20 space-y-6">
        <h4 className="text-xl font-medium tracking-tight text-surface-dark-foreground mb-2">
          Summary
        </h4>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
          This usability evaluation, conducted as part of a group project with
          six members, assessed the Microsoft Teams Free calendar feature,
          focusing on usability challenges, user satisfaction, and actionable
          improvements. By simulating real-world tasks with digitally
          experienced users aged 18-30, we uncovered key insights into the
          platform&apos;s strengths and weaknesses.
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
          Basic tasks like joining meetings proved intuitive, but users
          struggled with rescheduling, feature discovery, and interpreting
          system feedback during connection issues. Ambiguous labels and limited
          guidance during technical disruptions caused delays and confusion.
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
          Key findings: System messages, especially during connection loss,
          require enhanced visibility. RSVP tracking needs streamlining with
          real-time updates. Interactive onboarding should familiarize new users
          with core features. Button labels need refinement to align with user
          mental models.
        </p>
      </MiddleSection>

      {/* Hero image */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p1.jpg"
          alt="Microsoft Teams calendar interface"
        />
      </WideSection>

      {/* Section 2 — Introduction */}
      <MiddleSection className="mb-20">
        <SectionHeading>Introduction</SectionHeading>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-medium tracking-tight text-surface-dark-foreground mb-2">
              Purpose
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              This evaluation examines how users interact with Microsoft
              Teams&apos; calendar feature in realistic scenarios. We aimed to
              assess whether new users can adopt the system without dedicated
              training, identify usability improvement opportunities, and
              evaluate system feedback quality during connection disruptions.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-medium tracking-tight text-surface-dark-foreground mb-2">
              Research Questions
            </h4>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-base md:text-lg text-muted-foreground">
                How satisfied are users with the calendar&apos;s overall
                usability?
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                How effective are the meeting creation and rescheduling
                workflows?
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                Does Microsoft Teams provide adequate feedback during connection
                failures?
              </li>
            </ol>
          </div>
        </div>
      </MiddleSection>

      {/* Section 3 — Methodology */}
      <MiddleSection className="mb-20">
        <SectionHeading>Methodology</SectionHeading>
        <div className="space-y-6">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            The evaluation involved six participants aged 18-30, all based in
            Lund, Sweden, who were familiar with digital calendar tools like
            Google Calendar but new to Microsoft Teams. Participants completed
            tasks replicating typical usage scenarios: scheduling meetings,
            checking attendee availability, and handling connection disruptions.
            Data collection employed Think Aloud protocol, task completion
            metrics, and pre/post-test questionnaires, ensuring comprehensive
            user experience insights.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Testing occurred in a controlled lab environment to minimize
            distractions and standardize conditions across sessions. Tasks were
            framed as realistic scenarios to capture authentic interactions.
            Observers documented user behavior while participants provided
            feedback through structured questionnaires and open-ended
            discussions.
          </p>
          <div>
            <h4 className="text-xl font-medium tracking-tight text-surface-dark-foreground mb-2">
              Tasks
            </h4>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">
                  Joining a Scheduled Meeting:
                </span>{' '}
                Testing ease of access to ongoing meetings.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">Creating a New Meeting:</span>{' '}
                Evaluating workflow steps for scheduling new meetings.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">
                  Checking Availability and Rescheduling:
                </span>{' '}
                Assessing ability to view invitee availability and execute
                rescheduling.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">
                  Starting and Ending a Meeting:
                </span>{' '}
                Observing clarity of meeting control actions.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">
                  Recognizing Connection Loss:
                </span>{' '}
                Testing effectiveness of connection status communication.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">
                  Rescheduling Without Internet:
                </span>{' '}
                Observing user behavior during offline rescheduling attempts.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-medium">Logging Out:</span> Testing
                discoverability and execution of logout functionality.
              </li>
            </ol>
          </div>
        </div>
      </MiddleSection>

      {/* Section 4 — Wide screenshot */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p1screenshot.jpg"
          alt="Microsoft Teams Calendar Interface"
        />
      </WideSection>

      {/* Section 5 — Results */}
      <MiddleSection className="mb-20">
        <SectionHeading>Results</SectionHeading>
        <div className="space-y-6">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            The evaluation identified patterns in user behavior and task
            performance. Basic tasks like joining meetings achieved high success
            rates, with participants leveraging intuitive features like pop-up
            notifications. However, even successful tasks revealed minor
            interface ambiguities causing delays, some users initially
            overlooked meeting notifications, mistaking them for unrelated
            alerts.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Meeting creation proved moderately successful but exposed critical
            usability issues. Participants often remained uncertain whether
            invitations had been sent, as confirmation dialogs lacked clarity.
            This uncertainty led some users to duplicate efforts, manually
            copying links or recreating meetings for verification.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Rescheduling emerged as the most challenging task. Participants
            struggled to locate RSVP details and check attendee availability,
            with some navigating to incorrect sections like the
            &apos;Events&apos; tab. These difficulties highlighted
            inconsistencies in information architecture and access patterns
            within the calendar interface.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Connection loss further complicated task completion. While all
            participants eventually identified the issue, many only recognized
            it after repeated failed interactions. System feedback was subtle
            and easily overlooked, contributing to frustration and wasted
            effort. Similarly, &apos;Leave&apos; and &apos;End Meeting&apos;
            buttons confused participants due to unclear functional
            differentiation.
          </p>
        </div>
      </MiddleSection>

      {/* Section 6 — Two charts stacked */}
      <WideSection className="mb-20 space-y-6">
        <ProjectImage
          src="/resource/projects/p1_plot_satisfaction.png"
          alt="Satisfaction Ratings"
        />
        <ProjectImage
          src="/resource/projects/p1_plot_time_realize.png"
          alt="Feedback Clarity During Connection Issues"
        />
      </WideSection>

      {/* Section 7 — Analysis & Discussion */}
      <MiddleSection className="mb-20">
        <SectionHeading>Analysis &amp; Discussion</SectionHeading>
        <div className="space-y-6">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            The evaluation provided detailed insights into Microsoft Teams
            calendar strengths and weaknesses. Joining meetings proved most
            intuitive, benefiting from clear notifications and streamlined
            workflows. However, creating and rescheduling meetings required
            additional effort and introduced error opportunities. Inadequate
            guidance during connection disruptions compounded these challenges,
            particularly for participants expecting real-time syncing or
            prominent error states.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Labeling and navigation emerged as recurring themes in user
            feedback. The term &apos;Join&apos; led some users to believe they
            were interrupting ongoing meetings rather than initiating new ones.
            Similarly, the &apos;Events&apos; section was mistaken for calendar
            functionality due to icon similarity. These findings underscore the
            importance of aligning interface terminology and iconography with
            user mental models to reduce cognitive load and improve task
            efficiency.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            RSVP tracking represented a significant pain point in the free
            version, where the absence of real-time RSVP updates drastically
            impacted usability. Unlike the paid version, which integrates RSVP
            responses seamlessly into the calendar view, the free version forces
            navigation between chat and calendar views. This disjointed
            information architecture led to confusion, with participants often
            doubting whether invitations were successfully transmitted.
          </p>
        </div>
      </MiddleSection>

      {/* Section 8 — Recommendations */}
      <MiddleSection className="mb-20">
        <SectionHeading>Recommendations</SectionHeading>
        <ol className="list-decimal list-inside space-y-2">
          <li className="text-base md:text-lg text-muted-foreground">
            <span className="font-medium">
              Enhance Connection Feedback Visibility:
            </span>{' '}
            Implement prominent connection status indicators, such as centered
            banners with color-coded states.
          </li>
          <li className="text-base md:text-lg text-muted-foreground">
            <span className="font-medium">
              Improve RSVP and Invitation Management:
            </span>{' '}
            Embed RSVP responses directly in calendar and chat views for unified
            information access.
          </li>
          <li className="text-base md:text-lg text-muted-foreground">
            <span className="font-medium">Refine Action Labels:</span> Replace
            ambiguous terms like &quot;Join&quot; with contextually clear labels
            like &quot;Start Meeting&quot; for new sessions.
          </li>
          <li className="text-base md:text-lg text-muted-foreground">
            <span className="font-medium">
              Introduce Interactive Onboarding:
            </span>{' '}
            Implement guided tutorials covering critical workflows including
            meeting creation, rescheduling, RSVP tracking, and connection
            handling.
          </li>
          <li className="text-base md:text-lg text-muted-foreground">
            <span className="font-medium">Enhance Confirmation Patterns:</span>{' '}
            Supplement or replace modal dialogs with persistent visual
            confirmations like checkmarks or status messages.
          </li>
        </ol>
      </MiddleSection>
    </>
  );
}
