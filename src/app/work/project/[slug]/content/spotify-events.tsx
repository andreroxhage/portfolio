'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';

export default function SpotifyEventsContent() {
  return (
    <>
      {/* Section 1 — summary + video */}
      <MiddleSection className="mb-12 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Summary
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Spotify has long been synonymous with personalization, creativity,
            and dynamic user engagement. By integrating these principles into
            event invitations, this concept leverages Spotify&apos;s existing
            strengths in User-Generated Content (UGC) and Data-Driven Innovation
            (DDI) to create an entirely new way of inviting, engaging, and
            exciting guests.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Problem Statement
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Digital invitations often get lost in feeds or lack interactive
            elements, making it difficult for hosts to track attendees and build
            excitement before events. Users need a more immersive, music-driven
            solution that addresses these pain points: low response rates and
            minimal personalization.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            This concept takes inspiration from Spotify Wrapped, combining
            emotional resonance, personalization, and vibrant visual and
            auditory design. Imagine receiving an invitation that is more than
            an announcement, it is an experience. Personalized playlists,
            dynamic visuals, and engaging interactions like shared playlists and
            discussions set the tone before the event even begins.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Key Features
          </h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Customizable Invitations:
              </span>{' '}
              Hosts can prepare playlists, choose a theme and add personal
              touches like photos and messages.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Personalized Guest Experiences:
              </span>{' '}
              Each recipient gets an interactive invitation complete with event
              details, the host&apos;s curated playlist, and algorithmically
              generated playlists that blend guest preferences or match the
              event theme.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Integration with Spotify Ecosystem:
              </span>{' '}
              From saving playlists to syncing calendars, the invitation
              seamlessly connects with users&apos; digital habits.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Emotional Engagement:
              </span>{' '}
              Dynamic visuals, animations, and music previews build anticipation
              and excitement.
            </li>
          </ol>
          <p className="text-base text-muted-foreground leading-relaxed mt-3">
            By bridging Spotify&apos;s strength in crafting personalized
            experiences with event planning, this feature offers a memorable,
            music-centric invitation process, making it a key part of how people
            connect and celebrate.
          </p>
        </div>
      </MiddleSection>

      <WideSection className="mb-20">
        <ProgressiveMedia
          videoIdentifier="spotify-events"
          imageSrc="/resource/projects/p4_poster.jpg"
          imageAlt="Spotify Events prototype showing event invitation screen"
          aspectRatio="6/13"
          rounded
          className="max-w-sm mx-auto"
        />
      </WideSection>

      {/* Section 2 — middle: design process */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Design Process</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          This concept was born from user research and insights into how people
          plan and experience events. A survey of 43 respondents revealed key
          pain points in managing invitations and RSVPs, and a desire for
          personalized invitations and an openness to music-integrated
          solutions.
        </p>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Project Scope
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            This project focuses on the guest experience, from receiving an
            invitation via SMS, email, or in-app Spotify notification to opening
            it, exploring playlists, and completing an RSVP. By concentrating on
            this specific user segment, every touchpoint is optimized for ease,
            engagement, and emotional connection, ensuring the experience speaks
            directly to guest needs and expectations.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Objectives
          </h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Deliver an Immersive Invitation Experience:
              </span>{' '}
              Create invitations that spark curiosity and resonate emotionally,
              reflecting the event&apos;s essence in a way that feels fresh and
              memorable.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Simplified Guest Interaction:
              </span>{' '}
              Reduce barriers for attendees by ensuring that finding event
              details, responding, and integrating invitations into their
              personal schedules is effortless.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Leverage Existing Strengths for Personalized Engagement:
              </span>{' '}
              By utilizing the platform&apos;s existing user data, brand
              identity, and music-driven insights through DDI principles,
              invitations are customized to create a sense of connection and
              enhance overall event appeal.
            </li>
          </ol>
        </div>
      </MiddleSection>

      {/* Section 3 — middle: user research */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>User Research: Key Insights</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          To ensure the concept addressed real user needs, a survey of 43
          respondents (23 male, 20 female, primarily aged 25&ndash;34) was
          conducted to understand how people create and respond to event
          invitations.
        </p>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Digital Reliance, Yet Cumbersome RSVP Management
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Most respondents already rely on social media, email, and messaging
            apps to send invitations. When asked about their go-to methods,
            social media emerged as the most frequently used, likely due to its
            convenience and wide reach. However, they often experience low
            visibility: invitations get buried in notifications or feeds,
            reducing response rates. On a 5-point Likert scale, respondents
            rated their likelihood of adopting digital invitation tools at 4.35,
            indicating strong interest in more robust online solutions for event
            management.
          </p>
          <ProjectImage
            src="/resource/projects/p4_methods.svg"
            alt="Methods used for sending invitations"
            width={716}
            height={404}
            bg="light"
            size="xl"
          />
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Challenges in Managing Invitations
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Participants cited managing RSVPs (accepts, declines, no-shows) and
            dealing with last-minute changes as major pain points. They want an
            easy way to respond, get reminders, and stay updated on any event
            changes, without wading through multiple messages.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Openness to Music Integration
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            An impressive 42% expressed interest in including music elements in
            their invitations. Many respondents believe music sets the tone for
            an event and builds excitement beforehand. Whether it&apos;s a
            casual get-together or a formal occasion, a curated playlist
            communicates the vibe instantly. Music integration becomes a key
            differentiator, offering a more immersive experience through
            UGC-driven playlists and personalized previews that elevate
            invitations beyond static text and images.
          </p>
        </div>
      </MiddleSection>

      {/* Section 4 — music survey images */}
      <WideSection className="mb-20 space-y-6">
        <ProjectImage
          src="/resource/projects/p4_music.svg"
          alt="Music interest survey results"
          width={571}
          height={376}
          bg="light"
          size="xl"
        />
        <ProjectImage
          src="/resource/projects/p4_music_how.svg"
          alt="How music integration would work"
          width={716}
          height={440}
          bg="light"
          size="xl"
        />
      </WideSection>

      {/* Section 5 — middle: personalization + conclusion */}
      <MiddleSection className="mb-20 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Personalization &amp; Emotional Resonance
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            On a scale of 1 to 5, respondents rated personalization at 3.44,
            indicating they generally find it important in event invitations.
            Despite the moderate quantitative rating, qualitative responses
            revealed that personalization demonstrates the host&apos;s genuine
            effort. Recipients who feel valued are more inclined to attend,
            fostering positive emotional connections before the event begins.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Whether highlighting a theme (beach party, formal gala) or sharing a
            personal note, customization helps guests understand the
            event&apos;s vibe. Personalized invites stand out in cluttered
            inboxes and social feeds, increasing engagement and timely RSVPs.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Conclusion
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            From the survey findings, it&apos;s evident that users are inclined
            to use digital platforms for invitations but struggle with RSVP
            management, last-minute updates, and limited personalization
            options. Their openness to integrating music presents an untapped
            opportunity to enrich invitations and create a more immersive,
            memorable experience.
          </p>
        </div>
      </MiddleSection>

      {/* Section 6 — middle: ideation + persona development */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Ideation &amp; Prototyping</SectionHeading>
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Persona Development
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Meet Kate: a tech-savvy 30-year-old who loves hosting parties.
            Creating this persona helped ground the design in realistic user
            goals and behaviors, ensuring feature decisions aligned with
            authentic user needs.
          </p>
        </div>
      </MiddleSection>

      {/* Section 7 — wide: persona image */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_persona.png"
          alt="Persona Kate"
          width={1748}
          height={1438}
          rounded={false}
        />
      </WideSection>

      {/* Section 8 — middle: sketches + user flows */}
      <MiddleSection className="mb-20 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Early Sketches &amp; Prototyping
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            With a clear direction emerging, I began validating ideas through
            rough sketches and lo-fi wireframes. Recognizing that hand sketching
            isn&apos;t my strongest skill, I quickly transitioned to Figma to
            refine concepts with higher fidelity.
          </p>
          <ProjectImage
            src="/resource/projects/p4_lofi.png"
            alt="Lo-fi wireframes of the Spotify Events prototype"
            width={1753}
            height={868}
            rounded={false}
          />
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            User Flows and Scenarios
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            I refined user flows to address key interactions through a concrete
            scenario: Kate finishes customizing her 30th birthday invite using
            Spotify Events. She selects a confetti animation to capture the
            festive mood and pairs it with her curated 90s playlist. When her
            friend Maria taps the link, she is greeted by the animated intro,
            followed by a clear event summary showing date, time, and location.
            With one tap, Maria RSVPs by selecting &lsquo;Accept!&rsquo; and
            immediately adds the event to her Google Calendar. Curious about the
            music, she scrolls down to preview tracks and hits &lsquo;Save to
            Library&rsquo; to get into the party spirit beforehand. The flow
            feels effortless and engaging, leaving Maria excited to celebrate.
          </p>
        </div>
      </MiddleSection>

      {/* Section 9 — wide: user flow diagram */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_flow.svg"
          alt="User flow diagram for the Spotify Events feature"
          width={2527}
          height={1592}
        />
      </WideSection>

      {/* Section 10 — middle: feature prioritization intro */}
      <MiddleSection className="mb-20 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Feature Prioritization
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            To address core user needs, I mapped and prioritized functionalities
            based on user goals and technical feasibility, as shown in the table
            below:
          </p>
        </div>
      </MiddleSection>

      {/* Section 11 — wide: prioritization table */}
      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_table.svg"
          alt="Table of functions and user goal mapping and prioritization"
          width={1385}
          height={672}
          bg="light"
        />
      </WideSection>

      {/* Section 12 — calendar/attendees + prototype image */}
      <MiddleSection className="mb-12 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Calendar &amp; Maps Integration
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            In the final design, &lsquo;Add to Calendar&rsquo; and &lsquo;Open
            in Maps&rsquo; appear both as quick actions in the dialog drawer and
            as interactive links on the date or address. This keeps navigation
            straightforward and ensures guests can quickly sync the event to
            their schedules. Additionally, social sharing options enable
            plus-one invites or event-sharing, depending on the host&apos;s
            chosen settings, and an RSVP deadline can be displayed to encourage
            timely responses.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Attendees &amp; Discussion
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The event landing page showcases attendees alongside a discussion
            section, allowing guests to see who is attending, share excitement,
            and coordinate details: planning pre-parties, carpools, or outfit
            themes. To provide deeper functionality, dedicated sub-pages will
            handle attendee management and structured discussions, giving hosts
            and guests full control over conversation flow.
          </p>
        </div>
      </MiddleSection>

      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_d_a.png"
          alt="Prototype of the Spotify Events feature showing a dropdown with quick actions"
          width={1678}
          height={1708}
          rounded={false}
        />
      </WideSection>

      {/* Section 13 — guest blend/psychology + UGC diagram */}
      <MiddleSection className="mb-12 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Guest Blend &amp; Ethical Considerations
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            A core feature is the Guest Blend playlist, which algorithmically
            combines guests&apos; music preferences into a cohesive soundtrack.
            However, not all users are comfortable sharing listening data,
            raising important design ethics questions. To address privacy
            concerns, the feature is permission-based: guests opt in or remain
            anonymous, ensuring those who prefer privacy aren&apos;t forced to
            reveal personal preferences. If participants consent, the system
            incorporates their individual favorites or shared taste profiles.
            When hosts set an event theme (like an &lsquo;80s party), the
            algorithm filters tracks to match that vibe while still reflecting
            guest input. This approach balances inclusivity with privacy,
            ensuring everyone can be represented in the playlist, but only if
            they choose to be.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Host Playlist &amp; Collaborative Additions
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Beyond Guest Blend, the host&apos;s personal playlist sets the
            baseline vibe, offering a curated selection that reflects the event
            theme. Optionally, hosts can enable manual track additions, allowing
            guests to enrich the atmosphere or showcase personal favorites. This
            dual-layered system (host curation plus collaborative UGC input)
            balances creative control with communal participation, enhancing
            shared ownership of both the music and the celebration.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Psychological Perspectives &amp; Inspiration from Spotify Wrapped
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Spotify Wrapped demonstrates how DDI-powered storytelling can spark
            widespread engagement by transforming user data into shareable,
            emotionally resonant content. Its success stems from behavioral and
            social theories: critical mass theory explains how initial adopters
            sharing their &lsquo;music personality&rsquo; create viral loops
            that motivate others to participate. Meanwhile, Wrapped avoids
            information overload despite processing extensive data by filtering
            insights into concise, visually appealing &lsquo;stories.&rsquo; The
            feature also leverages common-ground theory: shared musical tastes
            foster identity and belonging among listeners.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Applying these principles to Spotify Events could similarly
            encourage viral sharing and community-building around invitations.
            By reframing event details into digestible, personalized experiences
            through DDI, each guest feels deeper connections to hosts and
            attendees. Blending music preferences creates instant unity through
            UGC, boosting anticipation before celebrations begin. Through
            strategies that manage data complexity, spark social momentum, and
            establish common ground, Spotify Events offers a compelling,
            communal approach to digital invitations, mirroring Wrapped&apos;s
            success with listening habits.
          </p>
        </div>
      </MiddleSection>

      <MiddleSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_ugd.png"
          alt="UGC and DDI principles diagram"
          size="sm"
          width={784}
          height={1704}
          rounded={false}
        />
      </MiddleSection>

      {/* Section 14 — middle: final evaluation */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Final Evaluation</SectionHeading>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Technical Constraints &amp; Considerations
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Guest notifications and reminders rely on Spotify account
            integration. Without an account, participants won&apos;t receive
            automated updates, increasing the risk of missed changes or late
            RSVPs. While email and SMS can partially mitigate this, a seamless
            experience requires robust account linkage. Collecting email
            addresses at the RSVP stage ensures guests without Spotify accounts
            still receive timely updates, reducing overlooked details and
            duplicate sign-ups.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Creating Guest Blend playlists requires accurate attendee data
            mapping. Without knowing which Spotify accounts correspond to
            accepted invitations, the system cannot tailor combined playlists
            reflecting each guest&apos;s taste profile. Robust data structures
            and authentication flows must collect, process, and match these
            inputs, ensuring music recommendations are both personalized and
            relevant to confirmed attendees. The ideal scenario involves native
            Spotify delivery with fallback links for non-users.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Balancing music playback with content readability presents another
            UX challenge. If playlists continue playing during content
            consumption, guests may struggle to focus on event details. A
            potential solution involves dynamic volume control: fading audio
            when users scroll through text-heavy sections, ensuring music
            enhances atmosphere without overwhelming core information.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Outcomes &amp; Future Opportunities
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Early prototype testing revealed strong enthusiasm for
            music-integrated invitations and playful visual elements. Several
            enhancements could elevate this concept further: gamified elements
            like interactive music quizzes could spark friendly competition,
            while AI DJ X integration might tailor playlists to individual
            preferences in real-time. This project addresses only a fraction of
            a full-scale &lsquo;Spotify Events&rsquo; feature: managing private
            vs. public events, browsing upcoming gatherings, and implementing
            granular access controls represent essential next steps.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            This project demonstrates how Spotify&apos;s expertise in
            personalization and engagement through DDI and UGC principles can
            extend into event planning. By combining music, dynamic visuals, and
            intuitive functionality, the concept redefines how people invite,
            engage, and celebrate, transforming simple invitations into
            memorable, community-driven experiences.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            On a personal note, I&apos;m deeply passionate about bringing this
            concept to life. As someone aspiring to join Spotify, these ideas
            showcase my dedication to user-centric design while aligning with
            Spotify&apos;s mission to connect people through music. I would
            welcome the opportunity to help shape this feature, enabling hosts
            and guests to celebrate in more immersive, musical ways.
          </p>
        </div>
      </MiddleSection>
    </>
  );
}
