'use client';

import React from 'react';
import { MiddleSection, WideSection } from '@/app/components/ProjectLayout';
import { Lead, P, SectionHeading } from '@/components/experiment/Prose';
import { ProgressiveMedia } from '@/app/components/ProgressiveMedia';

export default function MalmoMuseum3DMapContent() {
  return (
    <>
      {/* Hook */}
      <MiddleSection className="mb-20 space-y-4">
        <Lead>
          Museum maps are flat, and buildings are not. Standing in Malmö museum
          with a folded paper map, you are constantly translating: this
          rectangle is that hall, this staircase icon is somewhere behind me,
          the exhibit I want is one floor up and apparently through a wall. I
          wanted to see what wayfinding would feel like if the map matched the
          space instead of abstracting it away.
        </Lead>
        <P>
          This was a short design iteration, a few focused rounds of exploration
          rather than a full project. That constraint was part of the fun: how
          far can one concept get when the scope is deliberately small?
        </P>
      </MiddleSection>

      {/* The concept */}
      <MiddleSection className="mb-10 space-y-4">
        <SectionHeading>The concept</SectionHeading>
        <P>
          The idea is an interactive 3D navigator: the museum as a spatial model
          you can turn, tilt, and tap. Instead of decoding a legend, you
          recognize the building itself, floors stack the way they do in
          reality, and exhibits sit where you would actually walk to find them.
          Selecting an exhibit highlights it in place, so the answer to
          &quot;where is it?&quot; is visual and immediate rather than a
          coordinate hunt.
        </P>
        <P>
          The hard design problem was restraint. A 3D scene can easily become a
          toy that shows off angles nobody needs. The iterations kept pulling
          back toward calm: limited camera freedom, one clear focus at a time,
          and interface elements that stay quiet until the visitor asks for
          them. The goal was for the digital space to feel natural, not
          overwhelming.
        </P>
      </MiddleSection>

      {/* Visual */}
      <WideSection className="mb-20">
        <ProgressiveMedia
          videoIdentifier="i2"
          imageSrc="/resource/projects/i2_poster.jpg"
          imageAlt="Interactive 3D wayfinding prototype for the Malmö museum"
          aspectRatio="720/1564"
          rounded
          className="max-w-sm mx-auto"
        />
      </WideSection>

      {/* Closer */}
      <MiddleSection className="mb-20 space-y-4">
        <SectionHeading>What I learned</SectionHeading>
        <P>
          Translating a physical space into a digital one is mostly a
          subtraction exercise. Every detail I removed from the model made the
          navigation clearer, and the moments that worked best were the ones
          where the interface disappeared entirely. I am still curious about
          spatial UX, it shows up again in my VR work, and this small iteration
          is where that thread started.
        </P>
      </MiddleSection>
    </>
  );
}
