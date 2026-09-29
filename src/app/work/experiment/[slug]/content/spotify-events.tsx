'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  ProjectImage,
} from '@/app/components/ProjectLayout';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';
import {
  Block,
  ItemList,
  Lead,
  P,
  SectionHeading,
} from '@/components/experiment/Prose';

// Rhythm: prose sits 40px above the figure it introduces (mb-10), and 80px
// (mb-20) separates one topic from the next.
export default function SpotifyEventsContent() {
  return (
    <>
      {/* Summary, problem and features, then the prototype video */}
      <MiddleSection className="mb-10 space-y-10">
        <Lead>
          Spotify has long been synonymous with personalization, creativity, and
          dynamic user engagement. By integrating these principles into event
          invitations, this concept builds on Spotify&apos;s existing strengths
          in User-Generated Content (UGC) and Data-Driven Innovation (DDI) to
          create an entirely new way of inviting, engaging, and exciting guests.
        </Lead>

        <Block title="Problem statement">
          <P>
            Digital invitations often get lost in feeds or lack interactive
            elements, making it difficult for hosts to track attendees and build
            excitement before events. Users need a more immersive, music-driven
            solution that addresses these pain points: low response rates and
            minimal personalization.
          </P>
          <P>
            This concept takes inspiration from Spotify Wrapped, combining
            emotional resonance, personalization, and vibrant visual and
            auditory design. Imagine receiving an invitation that is more than
            an announcement, it is an experience. Personalized playlists,
            dynamic visuals, and engaging interactions like shared playlists and
            discussions set the tone before the event even begins.
          </P>
        </Block>

        <Block title="Key features">
          <ItemList
            items={[
              {
                title: 'Customizable invitations',
                body: 'Hosts can prepare playlists, choose a theme and add personal touches like photos and messages.',
              },
              {
                title: 'Personalized guest experiences',
                body: "Each recipient gets an interactive invitation complete with event details, the host's curated playlist, and algorithmically generated playlists that blend guest preferences or match the event theme.",
              },
              {
                title: 'Integration with the Spotify ecosystem',
                body: "From saving playlists to syncing calendars, the invitation connects with users' digital habits.",
              },
              {
                title: 'Emotional engagement',
                body: 'Dynamic visuals, animations, and music previews build anticipation and excitement.',
              },
            ]}
          />
          <P>
            By bridging Spotify&apos;s strength in crafting personalized
            experiences with event planning, this feature offers a memorable,
            music-centric invitation process, making it a key part of how people
            connect and celebrate.
          </P>
        </Block>
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

      {/* Design process */}
      <MiddleSection className="mb-20 space-y-10">
        <SectionHeading>Design process</SectionHeading>
        <P>
          This concept was born from user research and insights into how people
          plan and experience events. A survey of 43 respondents revealed key
          pain points in managing invitations and RSVPs, and a desire for
          personalized invitations and an openness to music-integrated
          solutions.
        </P>

        <Block title="Project scope">
          <P>
            This project focuses on the guest experience, from receiving an
            invitation via SMS, email, or in-app Spotify notification to opening
            it, exploring playlists, and completing an RSVP. By concentrating on
            this specific user segment, every touchpoint is optimized for ease,
            engagement, and emotional connection, ensuring the experience speaks
            directly to guest needs and expectations.
          </P>
        </Block>

        <Block title="Objectives">
          <ItemList
            items={[
              {
                title: 'Deliver an immersive invitation experience',
                body: "Create invitations that spark curiosity and resonate emotionally, reflecting the event's essence in a way that feels fresh and memorable.",
              },
              {
                title: 'Simplified guest interaction',
                body: 'Reduce barriers for attendees by ensuring that finding event details, responding, and integrating invitations into their personal schedules is effortless.',
              },
              {
                title:
                  'Build on existing strengths for personalized engagement',
                body: "By using the platform's existing user data, brand identity, and music-driven insights through DDI principles, invitations are customized to create a sense of connection and enhance overall event appeal.",
              },
            ]}
          />
        </Block>
      </MiddleSection>

      {/* User research */}
      <MiddleSection className="mb-10 space-y-10">
        <SectionHeading>User research: key insights</SectionHeading>
        <P>
          To ensure the concept addressed real user needs, a survey of 43
          respondents (23 male, 20 female, primarily aged 25-34) was conducted
          to understand how people create and respond to event invitations.
        </P>

        <Block title="Digital reliance, yet cumbersome RSVP management">
          <P>
            Most respondents already rely on social media, email, and messaging
            apps to send invitations. When asked about their go-to methods,
            social media emerged as the most frequently used, likely due to its
            convenience and wide reach. However, they often experience low
            visibility: invitations get buried in notifications or feeds,
            reducing response rates. On a 5-point Likert scale, respondents
            rated their likelihood of adopting digital invitation tools at 4.35,
            indicating strong interest in more robust online solutions for event
            management.
          </P>
          <ProjectImage
            src="/resource/projects/p4_methods.svg"
            alt="Methods used for sending invitations"
            width={716}
            height={404}
            bg="light"
            size="xl"
            className="pt-2"
          />
        </Block>

        <Block title="Challenges in managing invitations">
          <P>
            Participants cited managing RSVPs (accepts, declines, no-shows) and
            dealing with last-minute changes as major pain points. They want an
            easy way to respond, get reminders, and stay updated on any event
            changes, without wading through multiple messages.
          </P>
        </Block>

        <Block title="Openness to music integration">
          <P>
            42% expressed interest in including music elements in their
            invitations. Many respondents believe music sets the tone for an
            event and builds excitement beforehand. Whether it&apos;s a casual
            get-together or a formal occasion, a curated playlist communicates
            the vibe instantly. Music integration becomes a key differentiator,
            offering a more immersive experience through UGC-driven playlists
            and personalized previews that take invitations beyond static text
            and images.
          </P>
        </Block>
      </MiddleSection>

      {/* Music survey charts */}
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

      {/* Personalization + conclusion */}
      <MiddleSection className="mb-20 space-y-10">
        <Block title="Personalization and emotional resonance">
          <P>
            On a scale of 1 to 5, respondents rated personalization at 3.44,
            indicating they generally find it important in event invitations.
            Despite the moderate quantitative rating, qualitative responses
            revealed that personalization demonstrates the host&apos;s genuine
            effort. Recipients who feel valued are more inclined to attend,
            fostering positive emotional connections before the event begins.
          </P>
          <P>
            Whether highlighting a theme (beach party, formal gala) or sharing a
            personal note, customization helps guests understand the
            event&apos;s vibe. Personalized invites stand out in cluttered
            inboxes and social feeds, increasing engagement and timely RSVPs.
          </P>
        </Block>

        <Block title="Conclusion">
          <P>
            From the survey findings, it&apos;s evident that users are inclined
            to use digital platforms for invitations but struggle with RSVP
            management, last-minute updates, and limited personalization
            options. Their openness to integrating music presents an untapped
            opportunity to enrich invitations and create a more immersive,
            memorable experience.
          </P>
        </Block>
      </MiddleSection>

      {/* Ideation: persona */}
      <MiddleSection className="mb-10 space-y-10">
        <SectionHeading>Ideation and prototyping</SectionHeading>
        <Block title="Persona development">
          <P>
            Meet Kate: a tech-savvy 30-year-old who loves hosting parties.
            Creating this persona helped ground the design in realistic user
            goals and behaviors, ensuring feature decisions aligned with
            authentic user needs.
          </P>
        </Block>
      </MiddleSection>

      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_persona.png"
          alt="Persona Kate"
          width={1748}
          height={1438}
          rounded={false}
        />
      </WideSection>

      {/* Sketches + user flows */}
      <MiddleSection className="mb-10 space-y-10">
        <Block title="Early sketches and prototyping">
          <P>
            With a clear direction emerging, I began validating ideas through
            rough sketches and lo-fi wireframes. Recognizing that hand sketching
            isn&apos;t my strongest skill, I quickly transitioned to Figma to
            refine concepts with higher fidelity.
          </P>
          <ProjectImage
            src="/resource/projects/p4_lofi.png"
            alt="Lo-fi wireframes of the Spotify Events prototype"
            width={1753}
            height={868}
            rounded={false}
            className="pt-2"
          />
        </Block>

        <Block title="User flows and scenarios">
          <P>
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
          </P>
        </Block>
      </MiddleSection>

      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_flow.svg"
          alt="User flow diagram for the Spotify Events feature"
          width={2527}
          height={1592}
        />
      </WideSection>

      {/* Feature prioritization */}
      <MiddleSection className="mb-10">
        <Block title="Feature prioritization">
          <P>
            To address core user needs, I mapped and prioritized functionalities
            based on user goals and technical feasibility, as shown in the table
            below.
          </P>
        </Block>
      </MiddleSection>

      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p4_table.svg"
          alt="Table of functions and user goal mapping and prioritization"
          width={1385}
          height={672}
          bg="light"
        />
      </WideSection>

      {/* Calendar, attendees + prototype image */}
      <MiddleSection className="mb-10 space-y-10">
        <Block title="Calendar and maps integration">
          <P>
            In the final design, &lsquo;Add to Calendar&rsquo; and &lsquo;Open
            in Maps&rsquo; appear both as quick actions in the dialog drawer and
            as interactive links on the date or address. This keeps navigation
            straightforward and ensures guests can quickly sync the event to
            their schedules. Additionally, social sharing options enable
            plus-one invites or event-sharing, depending on the host&apos;s
            chosen settings, and an RSVP deadline can be displayed to encourage
            timely responses.
          </P>
        </Block>

        <Block title="Attendees and discussion">
          <P>
            The event landing page showcases attendees alongside a discussion
            section, allowing guests to see who is attending, share excitement,
            and coordinate details: planning pre-parties, carpools, or outfit
            themes. To provide deeper functionality, dedicated sub-pages will
            handle attendee management and structured discussions, giving hosts
            and guests full control over conversation flow.
          </P>
        </Block>
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

      {/* Guest blend, psychology + UGC diagram */}
      <MiddleSection className="mb-10 space-y-10">
        <Block title="Guest Blend and ethical considerations">
          <P>
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
          </P>
        </Block>

        <Block title="Host playlist and collaborative additions">
          <P>
            Beyond Guest Blend, the host&apos;s personal playlist sets the
            baseline vibe, offering a curated selection that reflects the event
            theme. Optionally, hosts can enable manual track additions, allowing
            guests to enrich the atmosphere or showcase personal favorites. This
            dual-layered system (host curation plus collaborative UGC input)
            balances creative control with communal participation, enhancing
            shared ownership of both the music and the celebration.
          </P>
        </Block>

        <Block title="Psychological perspectives and inspiration from Spotify Wrapped">
          <P>
            Spotify Wrapped demonstrates how DDI-powered storytelling can spark
            widespread engagement by transforming user data into shareable,
            emotionally resonant content. Its success stems from behavioral and
            social theories: critical mass theory explains how initial adopters
            sharing their &lsquo;music personality&rsquo; create viral loops
            that motivate others to participate. Meanwhile, Wrapped avoids
            information overload despite processing extensive data by filtering
            insights into concise, visually appealing &lsquo;stories.&rsquo; The
            feature also draws on common-ground theory: shared musical tastes
            foster identity and belonging among listeners.
          </P>
          <P>
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
          </P>
        </Block>
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

      {/* Final evaluation */}
      <MiddleSection className="mb-20 space-y-10">
        <SectionHeading>Final evaluation</SectionHeading>

        <Block title="Technical constraints and considerations">
          <P>
            Guest notifications and reminders rely on Spotify account
            integration. Without an account, participants won&apos;t receive
            automated updates, increasing the risk of missed changes or late
            RSVPs. While email and SMS can partially mitigate this, a smooth
            experience requires robust account linkage. Collecting email
            addresses at the RSVP stage ensures guests without Spotify accounts
            still receive timely updates, reducing overlooked details and
            duplicate sign-ups.
          </P>
          <P>
            Creating Guest Blend playlists requires accurate attendee data
            mapping. Without knowing which Spotify accounts correspond to
            accepted invitations, the system cannot tailor combined playlists
            reflecting each guest&apos;s taste profile. Robust data structures
            and authentication flows must collect, process, and match these
            inputs, ensuring music recommendations are both personalized and
            relevant to confirmed attendees. The ideal scenario involves native
            Spotify delivery with fallback links for non-users.
          </P>
          <P>
            Balancing music playback with content readability presents another
            UX challenge. If playlists continue playing during content
            consumption, guests may struggle to focus on event details. A
            potential solution involves dynamic volume control: fading audio
            when users scroll through text-heavy sections, ensuring music
            enhances atmosphere without overwhelming core information.
          </P>
        </Block>

        <Block title="Outcomes and future opportunities">
          <P>
            Early prototype testing revealed strong enthusiasm for
            music-integrated invitations and playful visual elements. Several
            additions could take this concept further: gamified elements like
            interactive music quizzes could spark friendly competition, while AI
            DJ X integration might tailor playlists to individual preferences in
            real-time. This project addresses only a fraction of a full-scale
            &lsquo;Spotify Events&rsquo; feature: managing private vs. public
            events, browsing upcoming gatherings, and implementing granular
            access controls represent essential next steps.
          </P>
          <P>
            This project demonstrates how Spotify&apos;s expertise in
            personalization and engagement through DDI and UGC principles can
            extend into event planning. By combining music, dynamic visuals, and
            intuitive functionality, the concept rethinks how people invite,
            engage, and celebrate, turning simple invitations into memorable,
            community-driven experiences.
          </P>
          <P>
            On a personal note, I would love to bring this concept to life. As
            someone aspiring to join Spotify, these ideas showcase my dedication
            to user-centric design while aligning with Spotify&apos;s mission to
            connect people through music. I would welcome the opportunity to
            help shape this feature, enabling hosts and guests to celebrate in
            more immersive, musical ways.
          </P>
        </Block>
      </MiddleSection>
    </>
  );
}
