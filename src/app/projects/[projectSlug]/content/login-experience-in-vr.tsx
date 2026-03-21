'use client';

import React from 'react';
import {
  MiddleSection,
  TwoColSection,
  SectionHeading,
  ProjectImage,
} from '@/app/components/ProjectLayout';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';

export default function LoginExperienceInVRContent() {
  return (
    <>
      {/* Section 1 — two-col: summary + video */}
      <TwoColSection className="mb-16">
        <TwoColSection.Left className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
              Summary
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              Conducted as part of the &lsquo;Working Environment Project&rsquo;
              course, this collaborative effort with four team members addressed
              authentication challenges in Virtual Reality (VR). The project
              focused on designing an innovative login method tailored to
              immersive VR environments, specifically for GAIM&apos;s VR
              shooting application.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              Traditional authentication methods, typing passwords on virtual
              keyboards, are cumbersome, error-prone, and disruptive to
              immersion. Our objective was to develop a solution that enhances
              usability, maintains robust security, and integrates seamlessly
              into VR interaction paradigms.
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
            <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
              Key Outcomes
            </h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Scroll Select Authentication:
                </span>{' '}
                Novel interaction pattern combining horizontal scrolling with
                object selection to streamline VR login processes.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Immersion-First Design:
                </span>{' '}
                Built on VR-specific interaction principles to maintain
                engagement and presence.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Contextual Integration:
                </span>{' '}
                Seamlessly integrated with GAIM&apos;s weapon-style controllers,
                ensuring thematic consistency with the shooting application.
              </li>
            </ol>
          </div>
        </TwoColSection.Left>

        <TwoColSection.Right>
          <ProgressiveMedia
            videoIdentifier="login-experience-in-vr"
            imageSrc="/resource/projects/p2_hifi.jpeg"
            imageAlt="Scroll Select Authentication VR prototype"
            aspectRatio="9/16"
            rounded
            className="w-full max-h-[700px] mx-auto"
          />
        </TwoColSection.Right>
      </TwoColSection>

      {/* Section 2 — middle: introduction */}
      <MiddleSection className="mb-16 space-y-6">
        <SectionHeading>Introduction</SectionHeading>

        <div>
          <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
            Problem Statement
          </h4>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Current VR login methods are cumbersome and break immersion. Typing
            passwords on virtual keyboards is slow, error-prone, and disrupts
            interaction flow. This problem intensifies in applications like
            GAIM&apos;s VR shooting experiences, where users handle specialized
            controllers. A more intuitive, efficient, and secure authentication
            solution tailored to VR interaction paradigms is essential for
            maintaining usability and presence.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
            Project Objectives
          </h4>
          <ol className="list-decimal pl-5 space-y-1">
            <li className="text-base md:text-lg text-muted-foreground">
              <span className="font-semibold text-surface-dark-foreground">
                Research:
              </span>{' '}
              Explore alternative authentication methods for VR, focusing on
              reducing friction, increasing efficiency, and maintaining
              security.
            </li>
            <li className="text-base md:text-lg text-muted-foreground">
              <span className="font-semibold text-surface-dark-foreground">
                Design:
              </span>{' '}
              Create conceptual and high-fidelity prototypes that integrate
              seamlessly into immersive VR environments.
            </li>
            <li className="text-base md:text-lg text-muted-foreground">
              <span className="font-semibold text-surface-dark-foreground">
                Prototyping:
              </span>{' '}
              Develop a functional Unity prototype demonstrating the Scroll
              Select Authentication interaction pattern.
            </li>
          </ol>
        </div>
      </MiddleSection>

      {/* Section 3 — middle: design process */}
      <MiddleSection className="mb-16 space-y-6">
        <SectionHeading>Design Process</SectionHeading>

        <div>
          <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
            Research &amp; Ideation
          </h4>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            We reviewed existing VR authentication methods and design
            guidelines, including gesture-based systems like RubikAuth and
            ergonomic principles for immersive interaction. We also analyzed
            Apple&apos;s and Meta&apos;s VR development guidelines to understand
            platform-specific best practices.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Following research, we brainstormed and sketched concepts to explore
            innovative approaches. Scroll Select Authentication emerged as a
            promising solution, combining horizontal scrolling with object
            selection to create an intuitive login experience. Concepts were
            evaluated based on usability, security robustness, and integration
            feasibility with GAIM&apos;s VR shooting application.
          </p>
          <ProjectImage
            src="/resource/projects/p2_affinity.png"
            alt="Ideation Process for Scroll Select Authentication"
          />
        </div>
      </MiddleSection>

      {/* Section 4 — two-col: conceptual design + user flow */}
      <TwoColSection className="mb-16">
        <TwoColSection.Left className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
              Conceptual Design &mdash; Scroll Select Authentication
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              This method combines horizontal scrolling and object selection for
              seamless authentication. The interaction design leverages
              VR&apos;s spatial capabilities and is tailored for single-button
              controllers, particularly GAIM&apos;s weapon-style controllers.
              This ensures the authentication process aligns with application
              theming while maintaining ease of use.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              Scroll Select Authentication integrates directly with GAIM&apos;s
              existing controller mechanics, allowing users to navigate and
              input credentials without device switching. This thematic
              alignment enhances immersion by repurposing the controller&apos;s
              natural mechanics for authentication without breaking interaction
              flow. Single-button functionality simplifies actions, ensuring
              accessibility for users across experience levels.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              This integration strengthens user engagement within the VR
              environment while eliminating external input devices, reinforcing
              the immersive, streamlined experience essential to VR
              applications.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
              Unity Implementation
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              The prototype was developed in Unity, leveraging advanced VR
              interaction systems and controller APIs. Key features included
              spatial navigation, precise key selection with visual feedback,
              and haptic response mechanisms for confirmation.
            </p>
            <ProjectImage
              src="/resource/projects/vr-login-prototype.jpg"
              alt="High-Fidelity Prototype of Scroll Select Authentication"
            />
          </div>

          <div>
            <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
              Initial Usability Insights
            </h4>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
              Early testing focused on speed, error rate, and user satisfaction.
              Participants found the method intuitive and engaging, with reduced
              cognitive load compared to virtual keyboard approaches. However,
              challenges in gesture precision and scrolling sensitivity
              highlighted areas requiring refinement.
            </p>
          </div>
        </TwoColSection.Left>

        <TwoColSection.Right className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
              User Flow
            </h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Center Selection:
                </span>{' '}
                A key appears in the center of the user&apos;s field of view for
                focus and precision.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Horizontal Scrolling:
                </span>{' '}
                Users move the controller left or right to scroll through
                available keys.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Row Navigation:
                </span>{' '}
                Users switch between rows containing letters, numbers, special
                characters, and control options.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Key Selection:
                </span>{' '}
                Once the desired key is centered, users press the controller
                button to confirm.
              </li>
              <li className="text-base md:text-lg text-muted-foreground">
                <span className="font-semibold text-surface-dark-foreground">
                  Authentication:
                </span>{' '}
                Users navigate to the &ldquo;Login&rdquo; key to complete
                authentication.
              </li>
            </ol>
          </div>
          <ProjectImage
            src="/resource/projects/p2_concept.png"
            alt="High-Fidelity Prototype of Scroll Select Authentication"
          />
        </TwoColSection.Right>
      </TwoColSection>

      {/* Section 5 — middle: technical implementation + user testing */}
      <MiddleSection className="mb-16 space-y-6">
        <div>
          <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
            Technical Implementation
          </h4>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            The high-fidelity prototype brought Scroll Select Authentication to
            life using Unity&apos;s VR interaction framework. Users navigate a
            dynamic horizontal scrolling interface, hover over directional zones
            to switch between character sets, and make selections with a single
            button press. This implementation ensures ergonomic ease and
            precision while maintaining immersion.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Key technical features include hover-based navigation with spatial
            mapping, real-time text field updates, and seamless row transitions
            between character sets (letters, numbers, symbols, control actions).
            Integration with VR controller ensures users can authenticate
            efficiently without breaking engagement with the virtual
            environment. This prototype demonstrates how authentication can be
            reimagined to enhance usability, reduce input errors, and maintain
            presence in VR applications, establishing a foundation for iterative
            refinement.
          </p>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-surface-dark-foreground mb-2">
            User Testing &amp; Evaluation
          </h4>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            User testing involved eight participants with varying VR experience
            levels, from novices to a VR researcher. The evaluation focused on
            usability, efficiency, and interaction intuitiveness, revealing
            insights into user behavior and system performance.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
            Participants noted high efficiency once familiar with the
            interaction mechanics, with one expert user completing name entry
            error-free after initial adjustment. However, challenges emerged:
            sensitivity calibration issues, unclear interaction flow, and
            difficulty locating control actions like &lsquo;Erase&rsquo; or
            &lsquo;Enter.&rsquo; Some found scrolling speed excessive, while
            others felt key spacing made navigation tedious. Suggested
            improvements included onboarding animations, clearer row grouping,
            and enhanced hover feedback. Despite learning curves, most users
            recognized the approach&apos;s potential and value with iterative
            refinement.
          </p>
        </div>
      </MiddleSection>

      {/* Section 6 — middle: final evaluation */}
      <MiddleSection className="mb-16 space-y-6">
        <SectionHeading>Final Evaluation</SectionHeading>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
          Scroll Select Authentication successfully demonstrated a novel
          approach to VR authentication, prioritizing immersion and efficiency.
          User feedback highlighted key strengths: alignment with VR controller
          mechanics, precise single-button interactions, and maintained presence
          during authentication. Testing also revealed improvement areas:
          enhanced onboarding, optimized sensitivity calibration, and more
          intuitive placement of control actions.
        </p>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
          Proposed refinements include differentiated scroll speeds based on
          character type, hover delay for error mitigation, and animations
          clarifying row transitions. These adjustments could significantly
          enhance usability and reduce confusion. The project met its objectives
          of exploring innovative VR authentication methods, establishing a
          foundation for iterative development. With continued refinement and
          user testing, Scroll Select Authentication demonstrates strong
          potential to benchmark intuitive, immersive VR authentication systems.
        </p>
      </MiddleSection>
    </>
  );
}
