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
        <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
          Summary
        </h4>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          On a team of six, I ran a usability evaluation of the free version of
          Microsoft Teams&apos; calendar feature. We wanted to know whether
          someone could pick it up without training, where the workflow broke
          down, and how well the system communicated when things went wrong. We
          tested it with people aged 18 to 30 who were comfortable with digital
          calendars but new to Teams.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Joining a meeting was easy. Almost everything else was harder than it
          should have been. People struggled to reschedule, could not find
          features they needed, and missed the system&apos;s feedback when the
          connection dropped. Ambiguous button labels and quiet error states
          turned simple tasks into guessing games.
        </p>
      </MiddleSection>

      {/* Hero image */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p1.jpg"
          alt="Microsoft Teams calendar interface"
          width={4032}
          height={3024}
        />
      </WideSection>

      {/* Section 2 — Introduction */}
      <MiddleSection className="mb-20">
        <SectionHeading>Introduction</SectionHeading>
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
              Purpose
            </h4>
            <p className="text-base text-muted-foreground leading-relaxed mb-3">
              We wanted to see how the calendar holds up in realistic scenarios:
              can a new user adopt it without training, where does the interface
              get in the way, and does the system speak up when the connection
              fails? Those three questions shaped everything from task design to
              how we ran the sessions.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
              Research Questions
            </h4>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-base text-muted-foreground">
                How satisfied are users with the calendar&apos;s overall
                usability?
              </li>
              <li className="text-base text-muted-foreground">
                How effective are the meeting creation and rescheduling
                workflows?
              </li>
              <li className="text-base text-muted-foreground">
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
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            We tested with six participants aged 18 to 30, all based in Lund.
            Everyone knew tools like Google Calendar well but had never used
            Teams, which is exactly the kind of user the free version needs to
            win over. Each session combined think-aloud tasks, task completion
            metrics, and questionnaires before and after.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Sessions ran in a controlled lab setup so conditions stayed
            comparable across participants. We framed every task as a realistic
            scenario, scheduling a meeting, checking who could attend, losing
            the connection mid-task, and observed how people actually behaved
            before asking what they thought.
          </p>
          <div>
            <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
              Tasks
            </h4>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-base text-muted-foreground">
                <span className="font-medium">
                  Joining a Scheduled Meeting:
                </span>{' '}
                Testing ease of access to ongoing meetings.
              </li>
              <li className="text-base text-muted-foreground">
                <span className="font-medium">Creating a New Meeting:</span>{' '}
                Evaluating workflow steps for scheduling new meetings.
              </li>
              <li className="text-base text-muted-foreground">
                <span className="font-medium">
                  Checking Availability and Rescheduling:
                </span>{' '}
                Assessing ability to view invitee availability and execute
                rescheduling.
              </li>
              <li className="text-base text-muted-foreground">
                <span className="font-medium">
                  Starting and Ending a Meeting:
                </span>{' '}
                Observing clarity of meeting control actions.
              </li>
              <li className="text-base text-muted-foreground">
                <span className="font-medium">
                  Recognizing Connection Loss:
                </span>{' '}
                Testing effectiveness of connection status communication.
              </li>
              <li className="text-base text-muted-foreground">
                <span className="font-medium">
                  Rescheduling Without Internet:
                </span>{' '}
                Observing user behavior during offline rescheduling attempts.
              </li>
              <li className="text-base text-muted-foreground">
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
          width={1920}
          height={1032}
          rounded={false}
        />
      </WideSection>

      {/* Section 5 — Results */}
      <MiddleSection className="mb-20">
        <SectionHeading>Results</SectionHeading>
        <div className="space-y-6">
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Joining meetings went smoothly for almost everyone, helped by the
            pop-up notifications. But even the successful tasks showed small
            cracks: some participants initially dismissed the meeting
            notification because it looked like any other alert.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Creating a meeting mostly worked, but the confirmation was so vague
            that people did not trust it. Several participants copied the
            meeting link manually or recreated the meeting just to make sure the
            invitation had actually gone out. When users build their own
            verification workarounds, the interface has failed to close the
            loop.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Rescheduling was the hardest task. Participants could not find RSVP
            details or check attendee availability, and some wandered into the
            &apos;Events&apos; tab expecting calendar functionality. The
            information simply was not where people expected it to be.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Connection loss was the quietest failure. Everyone found the problem
            eventually, but many only after repeated failed clicks, because the
            status indicator was subtle enough to miss entirely. The
            &apos;Leave&apos; and &apos;End Meeting&apos; buttons added
            confusion of their own, since it was unclear how they differed.
          </p>
        </div>
      </MiddleSection>

      {/* Section 6 — Two charts stacked */}
      <WideSection className="mb-20 space-y-6">
        <ProjectImage
          src="/resource/projects/p1_plot_satisfaction.png"
          alt="Satisfaction Ratings"
          rounded={false}
        />
        <ProjectImage
          src="/resource/projects/p1_plot_time_realize.png"
          alt="Feedback Clarity During Connection Issues"
          rounded={false}
        />
      </WideSection>

      {/* Section 7 — Analysis & Discussion */}
      <MiddleSection className="mb-20">
        <SectionHeading>Analysis &amp; Discussion</SectionHeading>
        <div className="space-y-6">
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The pattern across tasks was consistent: the calendar handles the
            happy path well and gets progressively worse the further you stray
            from it. Joining a meeting is one click with a clear notification.
            Creating and rescheduling take more effort and offer more ways to go
            wrong, and when the connection drops, the interface gives almost no
            guidance to users who expect real-time syncing and visible error
            states.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Labels kept tripping people up. &apos;Join&apos; made some users
            think they were interrupting an ongoing meeting rather than starting
            one, and the &apos;Events&apos; section looked enough like a
            calendar that people ended up there by mistake. Terminology and
            icons that match user mental models would remove most of this
            friction for free.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The biggest structural problem is RSVP tracking in the free version.
            The paid version shows RSVP responses directly in the calendar; the
            free version forces you to jump between chat and calendar to piece
            the answer together. That split is what made participants doubt
            whether their invitations had gone out at all, and no amount of
            label polish fixes it.
          </p>
        </div>
      </MiddleSection>

      {/* Section 8 — Recommendations */}
      <MiddleSection className="mb-20">
        <SectionHeading>Recommendations</SectionHeading>
        <ol className="list-decimal list-inside space-y-2">
          <li className="text-base text-muted-foreground">
            <span className="font-medium">
              Enhance Connection Feedback Visibility:
            </span>{' '}
            Implement prominent connection status indicators, such as centered
            banners with color-coded states.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium">
              Improve RSVP and Invitation Management:
            </span>{' '}
            Embed RSVP responses directly in calendar and chat views for unified
            information access.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium">Refine Action Labels:</span> Replace
            ambiguous terms like &quot;Join&quot; with contextually clear labels
            like &quot;Start Meeting&quot; for new sessions.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium">
              Introduce Interactive Onboarding:
            </span>{' '}
            Implement guided tutorials covering critical workflows including
            meeting creation, rescheduling, RSVP tracking, and connection
            handling.
          </li>
          <li className="text-base text-muted-foreground">
            <span className="font-medium">Enhance Confirmation Patterns:</span>{' '}
            Supplement or replace modal dialogs with persistent visual
            confirmations like checkmarks or status messages.
          </li>
        </ol>
      </MiddleSection>

      {/* Section 9 — Reflection */}
      <MiddleSection className="mb-20">
        <SectionHeading>What I took away</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Watching six people struggle with the same quiet error states taught
          me more about feedback design than any heuristic list. The product did
          not lack features, it lacked answers to the question users kept
          asking: did that work? Since then, closing that loop is one of the
          first things I look for in any interface I evaluate or build.
        </p>
      </MiddleSection>
    </>
  );
}
