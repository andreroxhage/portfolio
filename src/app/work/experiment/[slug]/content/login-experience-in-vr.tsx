'use client';

import React from 'react';
import {
  MiddleSection,
  WideSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';

export default function LoginExperienceInVRContent() {
  return (
    <>
      {/* Section 1 — summary + video */}
      <MiddleSection className="mb-20 space-y-6">
        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Summary
          </h4>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Logging into a VR app usually means poking at a floating keyboard,
            one letter at a time. It is slow, it is error-prone, and it drops
            you straight out of the experience you came for. On a team of five,
            I worked on a better way to sign in for GAIM&apos;s VR shooting
            platform, where you are already holding a weapon-style controller
            and the last thing you want is to put it down to type.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            Our answer was Scroll Select Authentication: you scroll horizontally
            through characters and confirm each one with a single button press,
            using the controller you are already holding. I helped shape the
            concept, build the Unity prototype, and run the user testing that
            told us what actually worked.
          </p>
          <a
            href="https://www.gaim.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:underline text-sm"
          >
            Visit GAIM &rarr;
          </a>
        </div>

        <div>
          <h4 className="text-lg font-medium tracking-tight text-surface-dark-foreground mb-2">
            Key outcomes
          </h4>
          <ol className="list-decimal pl-5 space-y-2">
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                A working VR login without a keyboard.
              </span>{' '}
              Scroll to a character, press to confirm. The whole flow runs on
              the single button people already use in the game.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Immersion stayed intact.
              </span>{' '}
              Reusing the weapon-style controller kept the sign-in on theme, so
              authenticating felt like part of the experience instead of a
              detour out of it.
            </li>
            <li className="text-base text-muted-foreground">
              <span className="font-medium text-surface-dark-foreground">
                Testing pointed us to what to fix next.
              </span>{' '}
              Eight participants showed us where the idea held up and where
              sensitivity, discoverability, and scroll speed needed work.
            </li>
          </ol>
        </div>
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

      {/* Section 2 — the problem */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>The problem</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          Typing in VR is genuinely awkward. You aim at a virtual keyboard and
          jab out characters one by one, which is slow and easy to get wrong. On
          GAIM&apos;s shooting platform the friction is worse, because people
          are holding specialized controllers built for aiming, not typing. We
          took this on as part of the Working Environment Project course, and
          the brief was simple to state and hard to solve: sign people in
          without pulling them out of the world they came to be in.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          So the real question was how to make authentication feel native to VR.
          It had to be quick, hard to mess up, secure enough to trust, and it
          had to work with the hardware players were already holding rather than
          against it.
        </p>
      </MiddleSection>

      {/* Section 3 — research and the idea */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Finding the idea</SectionHeading>

        <div>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            We started by looking at how others had approached this: gesture
            systems like RubikAuth, ergonomic guidelines for immersive
            interaction, and the VR development guidelines from Apple and Meta.
            Then we sketched. Scroll Select Authentication came out of that
            round of ideation as the concept that best balanced usability,
            security, and the reality of GAIM&apos;s single-button controllers.
          </p>
          <ProjectImage
            src="/resource/projects/p2_affinity.png"
            alt="Ideation process for Scroll Select Authentication"
            width={3824}
            height={4506}
            rounded={false}
          />
        </div>

        <div>
          <p className="text-base text-muted-foreground leading-relaxed mb-3">
            The interaction itself is deliberately simple. A character sits in
            the center of your view. You tilt the controller left or right to
            scroll through the row, switch rows to reach letters, numbers,
            symbols, or controls, and press the button to lock in each
            character. To finish, you scroll to Login. One input device, one
            button, no keyboard. Because it borrows the controller&apos;s own
            mechanics, the whole thing stays on theme with the shooting
            experience instead of breaking it.
          </p>
        </div>
      </MiddleSection>

      {/* Section 4 — building the prototype */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>Building it in Unity</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          I built the high-fidelity prototype in Unity using its VR interaction
          framework. You hover into directional zones to switch between
          character sets, watch the text field update in real time, and confirm
          with a single press. Visual feedback and haptics on each selection
          give you a clear sense that the input landed, which matters a lot when
          there is no physical keyboard to feel.
        </p>
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

      {/* Section 5 — user testing */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>What testing told us</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          We tested with eight participants, from complete VR novices to a VR
          researcher, and watched how they handled the sign-in. Once people got
          the hang of the mechanic, it was fast. One expert user entered their
          name error-free after a short adjustment. That told us the core idea
          was sound.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          The rough edges were just as useful. Scroll sensitivity needed
          calibration, since some people found it too fast while others felt the
          key spacing made navigation tedious. Control actions like Erase and
          Enter were hard to find. And the flow was not obvious enough on the
          first try. From that we proposed concrete fixes: onboarding animations
          to teach the interaction, clearer grouping of rows, stronger hover
          feedback, scroll speeds tuned to character type, and a short hover
          delay to catch accidental selections.
        </p>
      </MiddleSection>

      {/* Section 6 — reflection */}
      <MiddleSection className="mb-20 space-y-6">
        <SectionHeading>What I took away</SectionHeading>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          We set out to prove you could authenticate in VR without a keyboard
          and without breaking immersion, and the prototype did exactly that.
          Its strengths were the parts that leaned into VR: it fit the
          controller mechanics, the single-button interaction stayed precise,
          and people never had to leave the experience to log in. Its weak spots
          were all things testing surfaced early enough to design around.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">
          What stuck with me is how much of a good VR interaction lives in the
          small stuff, like how fast a scroll feels or whether a button gives
          you a satisfying nudge back. I came away curious about designing for
          space and motion instead of flat screens, where the interface is
          something you move through rather than something you point at.
        </p>
      </MiddleSection>
    </>
  );
}
