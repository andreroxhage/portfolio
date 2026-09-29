'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  ProjectImage,
} from '@/app/components/ProjectLayout';
import {
  Block,
  ItemList,
  Lead,
  P,
  SectionHeading,
} from '@/components/experiment/Prose';

export default function UsabilityEvaluationMicrosoftTeams() {
  return (
    <>
      {/* Section 1 - Summary */}
      <MiddleSection className="mb-10 space-y-4">
        <Lead>
          On a team of six, I ran a usability evaluation of the free version of
          Microsoft Teams&apos; calendar feature. We wanted to know whether
          someone could pick it up without training, where the workflow broke
          down, and how well the system communicated when things went wrong. We
          tested it with people aged 18 to 30 who were comfortable with digital
          calendars but new to Teams.
        </Lead>
        <P>
          Joining a meeting was easy. Almost everything else was harder than it
          should have been. People struggled to reschedule, could not find
          features they needed, and missed the system&apos;s feedback when the
          connection dropped. Ambiguous button labels and quiet error states
          turned simple tasks into guessing games.
        </P>
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

      {/* Section 2 - Introduction */}
      <MiddleSection className="mb-20">
        <SectionHeading>Introduction</SectionHeading>
        <div className="space-y-10">
          <Block title="Purpose">
            <P>
              We wanted to see how the calendar holds up in realistic scenarios:
              can a new user adopt it without training, where does the interface
              get in the way, and does the system speak up when the connection
              fails? Those three questions shaped everything from task design to
              how we ran the sessions.
            </P>
          </Block>
          <Block title="Research questions">
            <ItemList
              items={[
                {
                  body: "How satisfied are users with the calendar's overall usability?",
                },
                {
                  body: 'How effective are the meeting creation and rescheduling workflows?',
                },
                {
                  body: 'Does Microsoft Teams provide adequate feedback during connection failures?',
                },
              ]}
            />
          </Block>
        </div>
      </MiddleSection>

      {/* Section 3 - Methodology */}
      <MiddleSection className="mb-20">
        <SectionHeading>Methodology</SectionHeading>
        <div className="space-y-4">
          <P>
            We tested with six participants aged 18 to 30, all based in Lund.
            Everyone knew tools like Google Calendar well but had never used
            Teams, which is exactly the kind of user the free version needs to
            win over. Each session combined think-aloud tasks, task completion
            metrics, and questionnaires before and after.
          </P>
          <P>
            Sessions ran in a controlled lab setup so conditions stayed
            comparable across participants. We framed every task as a realistic
            scenario (scheduling a meeting, checking who could attend, losing
            the connection mid-task) and observed how people actually behaved
            before asking what they thought.
          </P>
          <Block title="Tasks" className="pt-6">
            <ItemList
              columns={2}
              items={[
                {
                  title: 'Joining a scheduled meeting',
                  body: 'Testing ease of access to ongoing meetings.',
                },
                {
                  title: 'Creating a new meeting',
                  body: 'Evaluating workflow steps for scheduling new meetings.',
                },
                {
                  title: 'Checking availability and rescheduling',
                  body: 'Assessing ability to view invitee availability and execute rescheduling.',
                },
                {
                  title: 'Starting and ending a meeting',
                  body: 'Observing clarity of meeting control actions.',
                },
                {
                  title: 'Recognizing connection loss',
                  body: 'Testing effectiveness of connection status communication.',
                },
                {
                  title: 'Rescheduling without internet',
                  body: 'Observing user behavior during offline rescheduling attempts.',
                },
                {
                  title: 'Logging out',
                  body: 'Testing discoverability and execution of logout functionality.',
                },
              ]}
            />
          </Block>
        </div>
      </MiddleSection>

      {/* Section 4 - Wide screenshot */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p1screenshot.jpg"
          alt="Microsoft Teams Calendar Interface"
          width={1920}
          height={1032}
          rounded={false}
        />
      </WideSection>

      {/* Section 5 - Results */}
      <MiddleSection className="mb-10">
        <SectionHeading>Results</SectionHeading>
        <div className="space-y-4">
          <P>
            Joining meetings went smoothly for almost everyone, helped by the
            pop-up notifications. But even the successful tasks showed small
            cracks: some participants initially dismissed the meeting
            notification because it looked like any other alert.
          </P>
          <P>
            Creating a meeting mostly worked, but the confirmation was so vague
            that people did not trust it. Several participants copied the
            meeting link manually or recreated the meeting just to make sure the
            invitation had actually gone out. When users build their own
            verification workarounds, the interface has failed to close the
            loop.
          </P>
          <P>
            Rescheduling was the hardest task. Participants could not find RSVP
            details or check attendee availability, and some wandered into the
            &apos;Events&apos; tab expecting calendar functionality. The
            information simply was not where people expected it to be.
          </P>
          <P>
            Connection loss was the quietest failure. Everyone found the problem
            eventually, but many only after repeated failed clicks, because the
            status indicator was subtle enough to miss entirely. The
            &apos;Leave&apos; and &apos;End Meeting&apos; buttons added
            confusion of their own, since it was unclear how they differed.
          </P>
        </div>
      </MiddleSection>

      {/* Section 6 - Two charts stacked */}
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

      {/* Section 7 - Analysis & Discussion */}
      <MiddleSection className="mb-20">
        <SectionHeading>Analysis and discussion</SectionHeading>
        <div className="space-y-4">
          <P>
            The pattern across tasks was consistent: the calendar handles the
            happy path well and gets progressively worse the further you stray
            from it. Joining a meeting is one click with a clear notification.
            Creating and rescheduling take more effort and offer more ways to go
            wrong, and when the connection drops, the interface gives almost no
            guidance to users who expect real-time syncing and visible error
            states.
          </P>
          <P>
            Labels kept tripping people up. &apos;Join&apos; made some users
            think they were interrupting an ongoing meeting rather than starting
            one, and the &apos;Events&apos; section looked enough like a
            calendar that people ended up there by mistake. Terminology and
            icons that match user mental models would remove most of this
            friction for free.
          </P>
          <P>
            The biggest structural problem is RSVP tracking in the free version.
            The paid version shows RSVP responses directly in the calendar. The
            free version forces you to jump between chat and calendar to piece
            the answer together. That split is what made participants doubt
            whether their invitations had gone out at all, and no amount of
            label polish fixes it.
          </P>
        </div>
      </MiddleSection>

      {/* Section 8 - Recommendations */}
      <MiddleSection className="mb-20">
        <SectionHeading>Recommendations</SectionHeading>
        <ItemList
          items={[
            {
              title: 'Enhance connection feedback visibility',
              body: 'Implement prominent connection status indicators, such as centered banners with color-coded states.',
            },
            {
              title: 'Improve RSVP and invitation management',
              body: 'Embed RSVP responses directly in calendar and chat views for unified information access.',
            },
            {
              title: 'Refine action labels',
              body: 'Replace ambiguous terms like "Join" with contextually clear labels like "Start Meeting" for new sessions.',
            },
            {
              title: 'Introduce interactive onboarding',
              body: 'Implement guided tutorials covering critical workflows including meeting creation, rescheduling, RSVP tracking, and connection handling.',
            },
            {
              title: 'Enhance confirmation patterns',
              body: 'Supplement or replace modal dialogs with persistent visual confirmations like checkmarks or status messages.',
            },
          ]}
        />
      </MiddleSection>

      {/* Section 9 - Reflection */}
      <MiddleSection className="mb-20">
        <SectionHeading>What I took away</SectionHeading>
        <P>
          Watching six people struggle with the same quiet error states taught
          me more about feedback design than any heuristic list. The product did
          not lack features, it lacked answers to the question users kept
          asking: did that work? Since then, closing that loop is one of the
          first things I look for in any interface I evaluate or build.
        </P>
      </MiddleSection>
    </>
  );
}
