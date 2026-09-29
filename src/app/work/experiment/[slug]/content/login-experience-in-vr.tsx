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
  ExternalLink,
  ItemList,
  Lead,
  P,
  SectionHeading,
} from '@/components/experiment/Prose';

export default function LoginExperienceInVRContent() {
  return (
    <>
      {/* Summary + video */}
      <MiddleSection className="mb-10 space-y-10">
        <div className="space-y-4">
          <Lead>
            Logging into a VR app usually means poking at a floating keyboard,
            one letter at a time. It is slow, it is error-prone, and it drops
            you straight out of the experience you came for. On a team of five,
            I worked on a better way to sign in for GAIM&apos;s VR shooting
            platform, where you are already holding a weapon-style controller
            and the last thing you want is to put it down to type.
          </Lead>
          <P>
            Our answer was Scroll Select Authentication: you scroll horizontally
            through characters and confirm each one with a single button press,
            using the controller you are already holding. I helped shape the
            concept, build the Unity prototype, and run the user testing that
            told us what actually worked.
          </P>
          <ExternalLink href="https://www.gaim.com/">Visit GAIM</ExternalLink>
        </div>

        <Block title="Key outcomes">
          <ItemList
            items={[
              {
                title: 'A working VR login without a keyboard.',
                body: 'Scroll to a character, press to confirm. The whole flow runs on the single button people already use in the game.',
              },
              {
                title: 'Immersion stayed intact.',
                body: 'Reusing the weapon-style controller kept the sign-in on theme, so authenticating felt like part of the experience instead of a detour out of it.',
              },
              {
                title: 'Testing pointed us to what to fix next.',
                body: 'Eight participants showed us where the idea held up and where sensitivity, discoverability, and scroll speed needed work.',
              },
            ]}
          />
        </Block>
      </MiddleSection>

      <WideSection className="mb-20">
        <ProgressiveMedia
          videoIdentifier="login-experience-in-vr"
          imageSrc="/resource/projects/p2_poster.jpg"
          imageAlt="Scroll Select Authentication VR prototype"
          aspectRatio="1/1"
          rounded
          className="max-w-sm mx-auto"
        />
      </WideSection>

      {/* Section 2 - the problem */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>The problem</SectionHeading>
        <P>
          Typing in VR is genuinely awkward. You aim at a virtual keyboard and
          jab out characters one by one, which is slow and easy to get wrong. On
          GAIM&apos;s shooting platform the friction is worse, because people
          are holding specialized controllers built for aiming, not typing. We
          took this on as part of the Working Environment Project course, and
          the brief was simple to state and hard to solve: sign people in
          without pulling them out of the world they came to be in.
        </P>
        <P>
          So the real question was how to make authentication feel native to VR.
          It had to be quick, hard to mess up, secure enough to trust, and it
          had to work with the hardware players were already holding rather than
          against it.
        </P>
      </MiddleSection>

      {/* Section 3 - research and the idea */}
      <MiddleSection className="mb-20 space-y-8">
        <SectionHeading>Finding the idea</SectionHeading>

        <div className="space-y-4">
          <P>
            We started by looking at how others had approached this: gesture
            systems like RubikAuth, ergonomic guidelines for immersive
            interaction, and the VR development guidelines from Apple and Meta.
            Then we sketched. Scroll Select Authentication came out of that
            round of ideation as the concept that best balanced usability,
            security, and the reality of GAIM&apos;s single-button controllers.
          </P>
          <ProjectImage
            src="/resource/projects/p2_affinity.png"
            alt="Ideation process for Scroll Select Authentication"
            width={3824}
            height={4506}
            rounded={false}
          />
        </div>

        <div className="space-y-4">
          <P>
            The interaction itself is deliberately simple. A character sits in
            the center of your view. You tilt the controller left or right to
            scroll through the row, switch rows to reach letters, numbers,
            symbols, or controls, and press the button to lock in each
            character. To finish, you scroll to Login. One input device, one
            button, no keyboard. Because it borrows the controller&apos;s own
            mechanics, the whole thing stays on theme with the shooting
            experience instead of breaking it.
          </P>
        </div>
      </MiddleSection>

      {/* Section 4 - building the prototype */}
      <MiddleSection className="mb-8 space-y-4">
        <SectionHeading>Building it in Unity</SectionHeading>
        <P>
          I built the high-fidelity prototype in Unity using its VR interaction
          framework. You hover into directional zones to switch between
          character sets, watch the text field update in real time, and confirm
          with a single press. Visual feedback and haptics on each selection
          give you a clear sense that the input landed, which matters a lot when
          there is no physical keyboard to feel.
        </P>
        <ProjectImage
          src="/resource/projects/p2_hifi.jpeg"
          alt="High-fidelity prototype of Scroll Select Authentication"
          width={965}
          height={965}
        />
      </MiddleSection>

      <WideSection className="mb-20">
        <ProjectImage
          src="/resource/projects/p2_concept.png"
          alt="Concept for Scroll Select Authentication"
          width={811}
          height={387}
          rounded={false}
        />
      </WideSection>

      {/* Section 5 - user testing */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>What testing told us</SectionHeading>
        <P>
          We tested with eight participants, from complete VR novices to a VR
          researcher, and watched how they handled the sign-in. Once people got
          the hang of the mechanic, it was fast. One expert user entered their
          name error-free after a short adjustment. That told us the core idea
          was sound.
        </P>
        <P>
          The rough edges were just as useful. Scroll sensitivity needed
          calibration, since some people found it too fast while others felt the
          key spacing made navigation tedious. Control actions like Erase and
          Enter were hard to find. And the flow was not obvious enough on the
          first try. From that we proposed concrete fixes: onboarding animations
          to teach the interaction, clearer grouping of rows, stronger hover
          feedback, scroll speeds tuned to character type, and a short hover
          delay to catch accidental selections.
        </P>
      </MiddleSection>

      {/* Section 6 - reflection */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>What I took away</SectionHeading>
        <P>
          We set out to prove you could authenticate in VR without a keyboard
          and without breaking immersion, and the prototype did exactly that.
          Its strengths were the parts that leaned into VR: it fit the
          controller mechanics, the single-button interaction stayed precise,
          and people never had to leave the experience to log in. Its weak spots
          were all things testing surfaced early enough to design around.
        </P>
        <P>
          What stuck with me is how much of a good VR interaction lives in the
          small stuff, like how fast a scroll feels or whether a button gives
          you a satisfying nudge back. I came away curious about designing for
          space and motion instead of flat screens, where the interface is
          something you move through rather than something you point at.
        </P>
      </MiddleSection>
    </>
  );
}
