export const links = [
  {
    title: 'Home',
    href: '/#header',
  },
  {
    title: 'Work & Projects',
    href: '/projects',
  },
  {
    title: 'Contact',
    href: '/#contact',
  },
  {
    title: 'Photography',
    href: '/#photography',
  },
];

export const header = {
  title: 'ANDRÉ ROXHAGE',
  currently:
    'Software Design Engineer, blending software development and design with a passion for improving user experience',
};

export const about = [
  {
    title: 'Engineering',
    description: `I got into engineering by wondering how everyday products shape our routines. I like building digital stuff that’s usable, reliable, and grounded in real user needs. I’ve shipped with cross‑functional teams in agile setups, and I’m currently doing a Master’s in ICT to deepen the technical side.`,
  },
  {
    title: 'Psychology',
    description: `My interest in psychology is about understanding why people do what they do, and using that to make better products. I focus on creativity psychology to spark ideas and keep the experience grounded in how people actually think and feel. With a Bachelor’s in Psychology plus my engineering toolkit, I take a holistic approach so every touchpoint feels straightforward and genuinely considerate.`,
  },
];

export const currentWork = [
  {
    sectionTitle: 'Recent work',
    title: 'Join',
    description: `In my role as a Software Design Engineer, I bridge the gap between design and development, working closely with cross-functional teams to create a seamless and intuitive customer data platform. My involvement spans from front-end development to strategic design decisions, ensuring that usability and user-centricity remain central to every solution. Leading a comprehensive redesign effort, I focused on enhancing the platform’s usability, making it more intuitive and easy to learn.`,
    resumeTitle: 'Are you a LinkedIn stalker?',
  },
];

export const ideas = [
  {
    id: 'i1',
    title: 'Join',
    subtitle:
      "Customer data platforms shouldn't feel like rocket science. I led Join's redesign to turn complex data into clear insights and intuitive workflows, improving usability and driving adoption",
    videoAlt: 'Join customer data platform interface',
    date: '2023 – Current',
    roundedCorners: false,
    imageSlider: ['/resource/joinMockup1.png', '/resource/joinMockup2.png'],
    intervalTime: 5000,
    order: 1,
  },
  {
    id: 'i2',
    title: 'Malmö museum 3D map',
    subtitle:
      'Museum maps are flat and confusing. This concept reimagines wayfinding with an interactive 3D navigator that helps visitors explore exhibits spatially',
    videoAlt: 'Malmö museum map website to navigate',
    date: '2025',
    order: 5,
  },
];

export const projects = [
  {
    title: 'Spotify events',
    subtitle:
      'What if event invitations felt like Spotify Wrapped? This concept turns invites into personalized music experiences, using data and design to build excitement before the party even starts',
    headerSrc: '/resource/projects/p2_gaim.jpeg',
    image: '/resource/projects/p4_d_a.png',
    titleColor: '#739966',
    date: '2025',
    projectSlug: 'spotify-events',
    imageAlt: 'Spotify events concept design in Figma',
    order: 2,
    sections: [
      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'text',
            subtitle: 'Summary',
            column: 'left',
            paragraphs: [
              'Spotify has long been synonymous with personalization, creativity, and dynamic user engagement. By integrating these principles into event invitations, this concept leverages Spotify’s existing strengths in User-Generated Content (UGC) and Data-Driven Innovation (DDI) to create an entirely new way of inviting, engaging, and exciting guests.',
            ],
          },
          {
            type: 'text',
            subtitle: 'Problem Statement',
            column: 'left',
            paragraphs: [
              'Digital invitations often get lost in feeds or lack interactive elements, making it difficult for hosts to track attendees and build excitement before events. Users need a more immersive, music-driven solution that addresses these pain points: low response rates and minimal personalization.',
              'This concept takes inspiration from Spotify Wrapped, combining emotional resonance, personalization, and vibrant visual and auditory design. Imagine receiving an invitation that is more than an announcement, it is an experience. Personalized playlists, dynamic visuals, and engaging interactions like shared playlists and discussions set the tone before the event even begins.',
            ],
          },
          {
            type: 'list',
            style: 'number',
            column: 'left',
            subtitle: 'Key Features',
            items: [
              {
                prefix: 'Customizable Invitations',
                text: 'Hosts can prepare playlists, choose a theme and add personal touches like photos and messages.',
              },
              {
                prefix: 'Personalized Guest Experiences',
                text: "Each recipient gets an interactive invitation complete with event details, the host's curated playlist, and algorithmically generated playlists that blend guest preferences or match the event theme.",
              },
              {
                prefix: 'Integration with Spotify Ecosystem',
                text: 'From saving playlists to syncing calendars, the invitation seamlessly connects with users’ digital habits.',
              },
              {
                prefix: 'Emotional Engagement',
                text: 'Dynamic visuals, animations, and music previews build anticipation and excitement.',
              },
            ],
          },
          {
            type: 'text',
            column: 'left',
            paragraphs: [
              'By bridging Spotify’s strength in crafting personalized experiences with event planning, this feature offers a memorable, music-centric invitation process, making it a key part of how people connect and celebrate.',
            ],
          },
          {
            type: 'video',
            column: 'right',
            src: '/resource/projects/p4.mp4',
            alt: 'Conceptual Design of Scroll Select Authentication',
          },
        ],
      },
      {
        title: 'Design Process',
        layout: 'middle',
        content: [
          {
            type: 'text',
            paragraphs: [
              'This concept was born from user research and insights into how people plan and experience events. A survey of 43 respondents revealed key pain points in managing invitations and RSVPs, and a desire for personalized invitations and an openness to music-integrated solutions.',
            ],
          },
          {
            type: 'text',
            subtitle: 'Project Scope',
            paragraphs: [
              'This project focuses on the guest experience, from receiving an invitation via SMS, email, or in-app Spotify notification to opening it, exploring playlists, and completing an RSVP. By concentrating on this specific user segment, every touchpoint is optimized for ease, engagement, and emotional connection, ensuring the experience speaks directly to guest needs and expectations.',
            ],
          },
          {
            subtitle: 'Objectives',
            type: 'list',
            style: 'number',
            items: [
              {
                prefix: 'Deliver an Immersive Invitation Experience',
                text: 'Create invitations that spark curiosity and resonate emotionally, reflecting the event’s essence in a way that feels fresh and memorable.',
              },
              {
                prefix: 'Simplified Guest Interaction',
                text: 'Reduce barriers for attendees by ensuring that finding event details, responding, and integrating invitations into their personal schedules is effortless.',
              },
              {
                prefix:
                  'Leverage Existing Strengths for Personalized Engagement',
                text: "By utilizing the platform's existing user data, brand identity, and music-driven insights through DDI principles, invitations are customized to create a sense of connection and enhance overall event appeal.",
              },
            ],
          },
        ],
      },
      {
        title: 'User Research: Key Insights',
        layout: 'middle',
        content: [
          {
            type: 'text',
            paragraphs: [
              'To ensure the concept addressed real user needs, a survey of 43 respondents (23 male, 20 female, primarily aged 25–34) was conducted to understand how people create and respond to event invitations.',
            ],
          },
          {
            type: 'text',
            subtitle: 'Digital Reliance, Yet Cumbersome RSVP Management',
            paragraphs: [
              'Most respondents already rely on social media, email, and messaging apps to send invitations. When asked about their go-to methods, social media emerged as the most frequently used, likely due to its convenience and wide reach. However, they often experience low visibility: invitations get buried in notifications or feeds, reducing response rates. On a 5-point Likert scale, respondents rated their likelihood of adopting digital invitation tools at 4.35, indicating strong interest in more robust online solutions for event management.',
            ],
          },
          {
            type: 'image',
            src: '/resource/projects/p4_methods.svg',
            alt: 'methods used for sending invitations: primarily social media then messaging apps and paper invitations',
          },
          {
            type: 'text',
            subtitle: 'Challenges in Managing Invitations',
            paragraphs: [
              'Participants cited managing RSVPs (accepts, declines, no-shows) and dealing with last-minute changes as major pain points. They want an easy way to respond, get reminders, and stay updated on any event changes, without wading through multiple messages.',
            ],
          },
          {
            type: 'text',
            subtitle: 'Openness to Music Integration',
            paragraphs: [
              "An impressive 42% expressed interest in including music elements in their invitations. Many respondents believe music sets the tone for an event and builds excitement beforehand. Whether it's a casual get-together or a formal occasion, a curated playlist communicates the vibe instantly. Music integration becomes a key differentiator, offering a more immersive experience through UGC-driven playlists and personalized previews that elevate invitations beyond static text and images.",
            ],
          },
        ],
      },
      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'image',
            column: 'left',
            src: '/resource/projects/p4_music.svg',
            alt: 'methods used for sending invitations: primarily social media then messaging apps and paper invitations',
          },
          {
            type: 'image',
            column: 'right',
            src: '/resource/projects/p4_music_how.svg',
            alt: 'methods used for sending invitations: primarily social media then messaging apps and paper invitations',
          },
        ],
      },
      {
        title: '',
        layout: 'middle',
        content: [
          {
            type: 'text',
            subtitle: 'Personalization & Emotional Resonance',
            paragraphs: [
              "On a scale of 1 to 5, respondents rated personalization at 3.44, indicating they generally find it important in event invitations. Despite the moderate quantitative rating, qualitative responses revealed that personalization demonstrates the host's genuine effort. Recipients who feel valued are more inclined to attend, fostering positive emotional connections before the event begins.",
              "Whether highlighting a theme (beach party, formal gala) or sharing a personal note, customization helps guests understand the event's vibe. Personalized invites stand out in cluttered inboxes and social feeds, increasing engagement and timely RSVPs.",
            ],
          },
          {
            type: 'text',
            subtitle: 'Conclusion',
            paragraphs: [
              'From the survey findings, it’s evident that users are inclined to use digital platforms for invitations but struggle with RSVP management, last-minute updates, and limited personalization options. Their openness to integrating music presents an untapped opportunity to enrich invitations and create a more immersive, memorable experience.',
            ],
          },
        ],
      },
      {
        title: 'Ideation & Prototyping',
        layout: 'middle',
        content: [
          {
            type: 'text',
            subtitle: 'Persona Development',
            paragraphs: [
              'Meet Kate: a tech-savvy 30-year-old who loves hosting parties. Creating this persona helped ground the design in realistic user goals and behaviors, ensuring feature decisions aligned with authentic user needs.',
            ],
          },
        ],
      },
      {
        title: '',
        layout: 'full-width',
        content: [
          {
            type: 'image',
            size: 'xl',
            src: '/resource/projects/p4_persona.png',
            alt: 'methods used for sending invitations: primarily social media then messaging apps and paper invitations',
          },
        ],
      },
      {
        title: '',
        layout: 'middle',
        content: [
          {
            type: 'text',
            subtitle: 'Early Sketches & Prototyping',
            paragraphs: [
              "With a clear direction emerging, I began validating ideas through rough sketches and lo-fi wireframes. Recognizing that hand sketching isn't my strongest skill, I quickly transitioned to Figma to refine concepts with higher fidelity.",
            ],
          },
          {
            type: 'image',
            src: '/resource/projects/p4_lofi.png',
            alt: 'Persona Kate',
          },

          {
            type: 'text',
            subtitle: 'User Flows and Scenarios',
            paragraphs: [
              'I refined user flows to address key interactions through a concrete scenario: Kate finishes customizing her 30th birthday invite using Spotify Events. She selects a confetti animation to capture the festive mood and pairs it with her curated 90s playlist. When her friend Maria taps the link, she is greeted by the animated intro, followed by a clear event summary showing date, time, and location. With one tap, Maria RSVPs by selecting "Accept!" and immediately adds the event to her Google Calendar. Curious about the music, she scrolls down to preview tracks and hits "Save to Library" to get into the party spirit beforehand. The flow feels effortless and engaging, leaving Maria excited to celebrate.',
            ],
          },
        ],
      },
      {
        title: '',
        layout: 'full-width',
        content: [
          {
            type: 'image',
            size: 'xl',
            src: '/resource/projects/p4_flow.svg',
            alt: 'methods used for sending invitations: primarily social media then messaging apps and paper invitations',
          },
        ],
      },
      {
        title: '',
        layout: 'middle',
        content: [
          {
            type: 'text',
            subtitle: 'Feature Prioritization',
            paragraphs: [
              'To address core user needs, I mapped and prioritized functionalities based on user goals and technical feasibility, as shown in the table below:',
            ],
          },
        ],
      },
      {
        title: '',
        layout: 'full-width',
        content: [
          {
            type: 'text',
            paragraphs: [],
          },
          {
            type: 'image',
            size: 'xl',
            src: '/resource/projects/p4_table.svg',
            alt: 'Table of functions and user goal mapping and prioritization',
          },
        ],
      },

      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'text',
            subtitle: 'Calendar & Maps Integration',
            column: 'left',
            paragraphs: [
              'In the final design, “Add to Calendar” and “Open in Maps” appear both as quick actions in the dialog drawer and as interactive links on the date or address. This keeps navigation straightforward and ensures guests can quickly sync the event to their schedules. Additionally, social sharing options enable plus-one invites or event-sharing, depending on the host’s chosen settings, and an RSVP deadline can be displayed to encourage timely responses.',
            ],
          },
          {
            type: 'text',
            subtitle: 'Attendees & Discussion',
            column: 'left',
            paragraphs: [
              'The event landing page showcases attendees alongside a discussion section, allowing guests to see who is attending, share excitement, and coordinate details: planning pre-parties, carpools, or outfit themes. To provide deeper functionality, dedicated sub-pages will handle attendee management and structured discussions, giving hosts and guests full control over conversation flow.',
            ],
          },
          {
            type: 'image',
            size: 'xl',
            column: 'right',
            src: '/resource/projects/p4_d_a.png',
            alt: 'Prototype of the Spotify Events feature showing a dropdown with quick actions',
          },
        ],
      },
      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'text',
            column: 'left',
            subtitle: 'Guest Blend & Ethical Considerations',
            paragraphs: [
              "A core feature is the Guest Blend playlist, which algorithmically combines guests' music preferences into a cohesive soundtrack. However, not all users are comfortable sharing listening data, raising important design ethics questions. To address privacy concerns, the feature is permission-based: guests opt in or remain anonymous, ensuring those who prefer privacy aren't forced to reveal personal preferences. If participants consent, the system incorporates their individual favorites or shared taste profiles. When hosts set an event theme (like an '80s party), the algorithm filters tracks to match that vibe while still reflecting guest input. This approach balances inclusivity with privacy, ensuring everyone can be represented in the playlist, but only if they choose to be.",
            ],
          },
          {
            type: 'text',
            column: 'left',
            subtitle: 'Host Playlist & Collaborative Additions',
            paragraphs: [
              "Beyond Guest Blend, the host's personal playlist sets the baseline vibe, offering a curated selection that reflects the event theme. Optionally, hosts can enable manual track additions, allowing guests to enrich the atmosphere or showcase personal favorites. This dual-layered system (host curation plus collaborative UGC input) balances creative control with communal participation, enhancing shared ownership of both the music and the celebration.",
            ],
          },
          {
            type: 'text',
            column: 'left',
            subtitle:
              'Psychological Perspectives & Inspiration from Spotify Wrapped',
            paragraphs: [
              'Spotify Wrapped demonstrates how DDI-powered storytelling can spark widespread engagement by transforming user data into shareable, emotionally resonant content. Its success stems from behavioral and social theories: critical mass theory explains how initial adopters sharing their "music personality" create viral loops that motivate others to participate. Meanwhile, Wrapped avoids information overload despite processing extensive data by filtering insights into concise, visually appealing "stories." The feature also leverages common-ground theory: shared musical tastes foster identity and belonging among listeners.',
              "Applying these principles to Spotify Events could similarly encourage viral sharing and community-building around invitations. By reframing event details into digestible, personalized experiences through DDI, each guest feels deeper connections to hosts and attendees. Blending music preferences creates instant unity through UGC, boosting anticipation before celebrations begin. Through strategies that manage data complexity, spark social momentum, and establish common ground, Spotify Events offers a compelling, communal approach to digital invitations, mirroring Wrapped's success with listening habits.",
            ],
          },
          {
            type: 'image',
            column: 'right',
            size: 'sm',
            src: '/resource/projects/p4_ugd.png',
          },
        ],
      },
      {
        title: 'Final Evaluation',
        layout: 'middle',
        content: [
          {
            type: 'text',
            subtitle: 'Technical Constraints & Considerations',
            paragraphs: [
              "Guest notifications and reminders rely on Spotify account integration. Without an account, participants won't receive automated updates, increasing the risk of missed changes or late RSVPs. While email and SMS can partially mitigate this, a seamless experience requires robust account linkage. Collecting email addresses at the RSVP stage ensures guests without Spotify accounts still receive timely updates, reducing overlooked details and duplicate sign-ups.",
              "Creating Guest Blend playlists requires accurate attendee data mapping. Without knowing which Spotify accounts correspond to accepted invitations, the system cannot tailor combined playlists reflecting each guest's taste profile. Robust data structures and authentication flows must collect, process, and match these inputs, ensuring music recommendations are both personalized and relevant to confirmed attendees. The ideal scenario involves native Spotify delivery with fallback links for non-users.",
              'Balancing music playback with content readability presents another UX challenge. If playlists continue playing during content consumption, guests may struggle to focus on event details. A potential solution involves dynamic volume control: fading audio when users scroll through text-heavy sections, ensuring music enhances atmosphere without overwhelming core information.',
            ],
          },
          {
            type: 'text',
            subtitle: 'Outcomes & Future Opportunities',
            paragraphs: [
              'Early prototype testing revealed strong enthusiasm for music-integrated invitations and playful visual elements. Several enhancements could elevate this concept further: gamified elements like interactive music quizzes could spark friendly competition, while AI DJ X integration might tailor playlists to individual preferences in real-time. This project addresses only a fraction of a full-scale "Spotify Events" feature: managing private vs. public events, browsing upcoming gatherings, and implementing granular access controls represent essential next steps.',
              "This project demonstrates how Spotify's expertise in personalization and engagement through DDI and UGC principles can extend into event planning. By combining music, dynamic visuals, and intuitive functionality, the concept redefines how people invite, engage, and celebrate, transforming simple invitations into memorable, community-driven experiences.",
              "On a personal note, I'm deeply passionate about bringing this concept to life. As someone aspiring to join Spotify, these ideas showcase my dedication to user-centric design while aligning with Spotify's mission to connect people through music. I would welcome the opportunity to help shape this feature, enabling hosts and guests to celebrate in more immersive, musical ways.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Login experience in VR',
    subtitle:
      "Typing passwords in VR breaks immersion. This project introduces Scroll Select Authentication, a novel login method designed for GAIM's VR shooting platform that keeps users in the action",
    headerSrc: '/resource/projects/p2_gaim.jpeg',
    titleColor: '#668799',
    subtitleColor: '#768288',
    date: '2024',
    projectSlug: 'login-experience-in-vr',
    image: '/resource/projects/p2_hifi.jpeg',
    imageAlt: 'Scroll Select Authentication in VR',
    order: 3,
    sections: [
      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'text',
            subtitle: 'Summary',
            column: 'left',
            paragraphs: [
              'Conducted as part of the "Working Environment Project" course, this collaborative effort with four team members addressed authentication challenges in Virtual Reality (VR). The project focused on designing an innovative login method tailored to immersive VR environments, specifically for GAIM\'s VR shooting application.',
              'Traditional authentication methods, typing passwords on virtual keyboards, are cumbersome, error-prone, and disruptive to immersion. Our objective was to develop a solution that enhances usability, maintains robust security, and integrates seamlessly into VR interaction paradigms.',
            ],
          },
          {
            type: 'link',
            text: 'Visit GAIM',
            column: 'left',
            href: 'https://www.gaim.com/',
          },
          {
            type: 'list',
            style: 'number',
            column: 'left',
            subtitle: 'Key Outcomes',
            items: [
              'Scroll Select Authentication: Novel interaction pattern combining horizontal scrolling with object selection to streamline VR login processes.',
              'Immersion-First Design: Built on VR-specific interaction principles to maintain engagement and presence.',
              "Contextual Integration: Seamlessly integrated with GAIM's weapon-style controllers, ensuring thematic consistency with the shooting application.",
            ],
          },
          {
            type: 'video',
            column: 'right',
            src: '/resource/projects/p2_hifi.mp4 ',
            alt: 'Conceptual Design of Scroll Select Authentication',
          },
        ],
      },
      {
        title: 'Introduction',
        layout: 'middle',
        content: [
          {
            subtitle: 'Problem Statement',
            type: 'text',
            paragraphs: [
              "Current VR login methods are cumbersome and break immersion. Typing passwords on virtual keyboards is slow, error-prone, and disrupts interaction flow. This problem intensifies in applications like GAIM's VR shooting experiences, where users handle specialized controllers. A more intuitive, efficient, and secure authentication solution tailored to VR interaction paradigms is essential for maintaining usability and presence.",
            ],
          },
          {
            subtitle: 'Project Objectives',
            type: 'list',
            style: 'number',
            items: [
              'Research: Explore alternative authentication methods for VR, focusing on reducing friction, increasing efficiency, and maintaining security.',
              'Design: Create conceptual and high-fidelity prototypes that integrate seamlessly into immersive VR environments.',
              'Prototyping: Develop a functional Unity prototype demonstrating the Scroll Select Authentication interaction pattern.',
            ],
          },
        ],
      },
      {
        title: 'Design Process',
        layout: 'middle',
        content: [
          {
            subtitle: 'Research & Ideation',
            type: 'text',
            paragraphs: [
              "We reviewed existing VR authentication methods and design guidelines, including gesture-based systems like RubikAuth and ergonomic principles for immersive interaction. We also analyzed Apple's and Meta's VR development guidelines to understand platform-specific best practices.",
            ],
          },
          {
            type: 'text',
            paragraphs: [
              "Following research, we brainstormed and sketched concepts to explore innovative approaches. Scroll Select Authentication emerged as a promising solution, combining horizontal scrolling with object selection to create an intuitive login experience. Concepts were evaluated based on usability, security robustness, and integration feasibility with GAIM's VR shooting application.",
            ],
          },
          {
            type: 'image',
            src: '/resource/projects/p2_affinity.png',
            alt: 'Ideation Process for Scroll Select Authentication',
          },
        ],
      },
      {
        layout: 'two-col',
        content: [
          {
            subtitle: 'Conceptual Design - Scroll Select Authentication',
            type: 'text',
            column: 'left',
            paragraphs: [
              "This method combines horizontal scrolling and object selection for seamless authentication. The interaction design leverages VR's spatial capabilities and is tailored for single-button controllers, particularly GAIM's weapon-style controllers. This ensures the authentication process aligns with application theming while maintaining ease of use.",
              "Scroll Select Authentication integrates directly with GAIM's existing controller mechanics, allowing users to navigate and input credentials without device switching. This thematic alignment enhances immersion by repurposing the controller's natural mechanics for authentication without breaking interaction flow. Single-button functionality simplifies actions, ensuring accessibility for users across experience levels.",
              'This integration strengthens user engagement within the VR environment while eliminating external input devices, reinforcing the immersive, streamlined experience essential to VR applications.',
            ],
          },
          {
            subtitle: 'User Flow',
            column: 'right',
            type: 'list',
            style: 'number',
            items: [
              "Center Selection: A key appears in the center of the user's field of view for focus and precision.",
              'Horizontal Scrolling: Users move the controller left or right to scroll through available keys.',
              'Row Navigation: Users switch between rows containing letters, numbers, special characters, and control options.',
              'Key Selection: Once the desired key is centered, users press the controller button to confirm.',
              'Authentication: Users navigate to the "Login" key to complete authentication.',
            ],
          },
          {
            type: 'image',
            column: 'right',
            src: '/resource/projects/p2_concept.png',
            alt: 'High-Fidelity Prototype of Scroll Select Authentication',
          },
          {
            subtitle: 'Unity Implementation',
            type: 'text',
            paragraphs: [
              'The prototype was developed in Unity, leveraging advanced VR interaction systems and controller APIs. Key features included spatial navigation, precise key selection with visual feedback, and haptic response mechanisms for confirmation.',
            ],
          },
          {
            type: 'image',
            src: '/resource/projects/vr-login-prototype.jpg',
            alt: 'High-Fidelity Prototype of Scroll Select Authentication',
          },
          {
            subtitle: 'Initial Usability Insights',
            type: 'text',
            paragraphs: [
              'Early testing focused on speed, error rate, and user satisfaction. Participants found the method intuitive and engaging, with reduced cognitive load compared to virtual keyboard approaches. However, challenges in gesture precision and scrolling sensitivity highlighted areas requiring refinement.',
            ],
          },
        ],
      },
      {
        layout: 'middle',
        content: [
          {
            subtitle: 'Technical Implementation',
            type: 'text',
            paragraphs: [
              "The high-fidelity prototype brought Scroll Select Authentication to life using Unity's VR interaction framework. Users navigate a dynamic horizontal scrolling interface, hover over directional zones to switch between character sets, and make selections with a single button press. This implementation ensures ergonomic ease and precision while maintaining immersion.",
              'Key technical features include hover-based navigation with spatial mapping, real-time text field updates, and seamless row transitions between character sets (letters, numbers, symbols, control actions). Integration with VR controller ensures users can authenticate efficiently without breaking engagement with the virtual environment. This prototype demonstrates how authentication can be reimagined to enhance usability, reduce input errors, and maintain presence in VR applications, establishing a foundation for iterative refinement.',
            ],
          },
          {
            subtitle: 'User Testing & Evaluation',
            type: 'text',
            paragraphs: [
              'User testing involved eight participants with varying VR experience levels, from novices to a VR researcher. The evaluation focused on usability, efficiency, and interaction intuitiveness, revealing insights into user behavior and system performance.',
              'Participants noted high efficiency once familiar with the interaction mechanics, with one expert user completing name entry error-free after initial adjustment. However, challenges emerged: sensitivity calibration issues, unclear interaction flow, and difficulty locating control actions like "Erase" or "Enter." Some found scrolling speed excessive, while others felt key spacing made navigation tedious. Suggested improvements included onboarding animations, clearer row grouping, and enhanced hover feedback. Despite learning curves, most users recognized the approach\'s potential and value with iterative refinement.',
            ],
          },
        ],
      },
      {
        title: 'Final Evaluation',
        layout: 'middle',
        content: [
          {
            type: 'text',
            paragraphs: [
              'Scroll Select Authentication successfully demonstrated a novel approach to VR authentication, prioritizing immersion and efficiency. User feedback highlighted key strengths: alignment with VR controller mechanics, precise single-button interactions, and maintained presence during authentication. Testing also revealed improvement areas: enhanced onboarding, optimized sensitivity calibration, and more intuitive placement of control actions.',
              'Proposed refinements include differentiated scroll speeds based on character type, hover delay for error mitigation, and animations clarifying row transitions. These adjustments could significantly enhance usability and reduce confusion. The project met its objectives of exploring innovative VR authentication methods, establishing a foundation for iterative development. With continued refinement and user testing, Scroll Select Authentication demonstrates strong potential to benchmark intuitive, immersive VR authentication systems.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Usability evaluation',
    subtitle:
      "Where does Microsoft Teams' free calendar fall short? Through hands-on testing with new users, this evaluation uncovers friction points and offers practical improvements for scheduling and RSVP tracking",
    headerSrc: '/resource/projects/p1.jpg',
    titleColor: '#686699',
    subtitleColor: '#767688',
    date: '2024',
    projectSlug: 'usability-evaluation-of-microsoft-teams-calendar-feature',
    image: '/resource/projects/p1.jpeg',
    imageAlt: 'Usability Evaluation of Microsoft Teams Calendar Feature',
    order: 4,
    sections: [
      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'text',
            subtitle: 'Summary',
            column: 'left',
            paragraphs: [
              "This usability evaluation, conducted as part of a group project with six members, assessed the Microsoft Teams Free calendar feature, focusing on usability challenges, user satisfaction, and actionable improvements. By simulating real-world tasks with digitally experienced users aged 18-30, we uncovered key insights into the platform's strengths and weaknesses.",
              'Basic tasks like joining meetings proved intuitive, but users struggled with rescheduling, feature discovery, and interpreting system feedback during connection issues. Ambiguous labels and limited guidance during technical disruptions caused delays and confusion.',
              'Key findings: System messages, especially during connection loss, require enhanced visibility. RSVP tracking needs streamlining with real-time updates. Interactive onboarding should familiarize new users with core features. Button labels need refinement to align with user mental models.',
            ],
          },
          {
            type: 'image',
            column: 'right',
            src: '/resource/projects/p1.jpg',
          },
        ],
      },
      {
        title: 'Introduction',
        layout: 'middle',
        content: [
          {
            subtitle: 'Purpose',
            type: 'text',
            paragraphs: [
              "This evaluation examines how users interact with Microsoft Teams' calendar feature in realistic scenarios. We aimed to assess whether new users can adopt the system without dedicated training, identify usability improvement opportunities, and evaluate system feedback quality during connection disruptions.",
            ],
          },
          {
            subtitle: 'Research Questions',
            type: 'list',
            style: 'number',
            items: [
              "How satisfied are users with the calendar's overall usability?",
              'How effective are the meeting creation and rescheduling workflows?',
              'Does Microsoft Teams provide adequate feedback during connection failures?',
            ],
          },
        ],
      },
      {
        title: 'Methodology',
        layout: 'middle',
        content: [
          {
            type: 'text',
            paragraphs: [
              'The evaluation involved six participants aged 18-30, all based in Lund, Sweden, who were familiar with digital calendar tools like Google Calendar but new to Microsoft Teams. Participants completed tasks replicating typical usage scenarios: scheduling meetings, checking attendee availability, and handling connection disruptions. Data collection employed Think Aloud protocol, task completion metrics, and pre/post-test questionnaires, ensuring comprehensive user experience insights.',
              'Testing occurred in a controlled lab environment to minimize distractions and standardize conditions across sessions. Tasks were framed as realistic scenarios to capture authentic interactions. Observers documented user behavior while participants provided feedback through structured questionnaires and open-ended discussions.',
            ],
          },

          {
            type: 'list',
            subtitle: 'Tasks',
            style: 'number',
            items: [
              'Joining a Scheduled Meeting: Testing ease of access to ongoing meetings.',
              'Creating a New Meeting: Evaluating workflow steps for scheduling new meetings.',
              'Checking Availability and Rescheduling: Assessing ability to view invitee availability and execute rescheduling.',
              'Starting and Ending a Meeting: Observing clarity of meeting control actions.',
              'Recognizing Connection Loss: Testing effectiveness of connection status communication.',
              'Rescheduling Without Internet: Observing user behavior during offline rescheduling attempts.',
              'Logging Out: Testing discoverability and execution of logout functionality.',
            ],
          },
        ],
      },
      {
        title: '',
        layout: 'full-width',
        content: [
          {
            type: 'image',
            src: '/resource/projects/p1screenshot.jpg',
            alt: 'Microsoft Teams Calendar Interface',
          },
        ],
      },
      {
        title: 'Results',
        layout: 'middle',
        content: [
          {
            type: 'text',
            paragraphs: [
              'The evaluation identified patterns in user behavior and task performance. Basic tasks like joining meetings achieved high success rates, with participants leveraging intuitive features like pop-up notifications. However, even successful tasks revealed minor interface ambiguities causing delays, some users initially overlooked meeting notifications, mistaking them for unrelated alerts.',
              'Meeting creation proved moderately successful but exposed critical usability issues. Participants often remained uncertain whether invitations had been sent, as confirmation dialogs lacked clarity. This uncertainty led some users to duplicate efforts, manually copying links or recreating meetings for verification.',
              'Rescheduling emerged as the most challenging task. Participants struggled to locate RSVP details and check attendee availability, with some navigating to incorrect sections like the "Events" tab. These difficulties highlighted inconsistencies in information architecture and access patterns within the calendar interface.',
              'Connection loss further complicated task completion. While all participants eventually identified the issue, many only recognized it after repeated failed interactions. System feedback was subtle and easily overlooked, contributing to frustration and wasted effort. Similarly, "Leave" and "End Meeting" buttons confused participants due to unclear functional differentiation.',
            ],
          },
        ],
      },
      {
        title: '',
        layout: 'two-col',
        content: [
          {
            type: 'image',
            src: '/resource/projects/p1_plot_satisfaction.png',
            alt: 'Satisfaction Ratings',
            column: 'left',
          },
          {
            type: 'image',
            src: '/resource/projects/p1_plot_time_realize.png',
            alt: 'Feedback Clarity During Connection Issues',
            column: 'right',
          },
        ],
      },
      {
        title: 'Analysis & Discussion',
        layout: 'middle',
        content: [
          {
            type: 'text',
            paragraphs: [
              'The evaluation provided detailed insights into Microsoft Teams calendar strengths and weaknesses. Joining meetings proved most intuitive, benefiting from clear notifications and streamlined workflows. However, creating and rescheduling meetings required additional effort and introduced error opportunities. Inadequate guidance during connection disruptions compounded these challenges, particularly for participants expecting real-time syncing or prominent error states.',
              'Labeling and navigation emerged as recurring themes in user feedback. The term "Join" led some users to believe they were interrupting ongoing meetings rather than initiating new ones. Similarly, the "Events" section was mistaken for calendar functionality due to icon similarity. These findings underscore the importance of aligning interface terminology and iconography with user mental models to reduce cognitive load and improve task efficiency.',
              'RSVP tracking represented a significant pain point in the free version, where the absence of real-time RSVP updates drastically impacted usability. Unlike the paid version, which integrates RSVP responses seamlessly into the calendar view, the free version forces navigation between chat and calendar views. This disjointed information architecture led to confusion, with participants often doubting whether invitations were successfully transmitted.',
            ],
          },
        ],
      },
      {
        title: 'Recommendations',
        layout: 'middle',
        content: [
          {
            type: 'list',
            style: 'number',
            items: [
              'Enhance Connection Feedback Visibility: Implement prominent connection status indicators, such as centered banners with color-coded states.',
              'Improve RSVP and Invitation Management: Embed RSVP responses directly in calendar and chat views for unified information access.',
              'Refine Action Labels: Replace ambiguous terms like "Join" with contextually clear labels like "Start Meeting" for new sessions.',
              'Introduce Interactive Onboarding: Implement guided tutorials covering critical workflows including meeting creation, rescheduling, RSVP tracking, and connection handling.',
              'Enhance Confirmation Patterns: Supplement or replace modal dialogs with persistent visual confirmations like checkmarks or status messages.',
            ],
          },
        ],
      },
    ],
  },
];

export const resume = [
  {
    title: 'Education',
    icon: 'academic-cap',
    content: [
      {
        subtitle:
          'Master in Engineering, Information & Communication Technologies',
        company: 'Lund University, Sweden',

        date: '2020 – 2026',
      },
      {
        subtitle: 'Bachelor of Arts in Psychology',
        company: 'Lund University, Sweden',

        date: '2022 – 2026',
      },
    ],
  },
  {
    title: 'Experience',
    content: [
      {
        subtitle: 'Software Design Engineer',
        company: 'InterMail',
        date: '2023 – Current',
      },
      {
        subtitle: 'Teaching Assistant - Interaction Design',
        company: 'Lund University',
        date: '2023 – 2024',
      } /*
			{
				subtitle: 'Salesperson',
				company: 'Mattssons Foto',
				date: '2021 – 2023',
			},*/,
      {
        subtitle: 'Head of Photography for a volunteer organization',
        company: 'Lundakarnevalen',
        date: '2021 – 2023',
      },
      {
        subtitle:
          'Marketing Manager & Graphic Designer for a volunteer organization',
        company: 'Teknikfokus, Career Fair',
        date: '2021 – 2022',
      },
      {
        subtitle: 'Ranger soldier',
        company: 'The Swedish Armed Forces',
        date: '2018 – 2019',
      },
    ],
  },
  {
    title: 'Skills',
    content: [
      {
        subtitle: 'Creative:',
        items: ['Figma, Adobe Illustrator, Photoshop and Lightroom'],
      },
      {
        subtitle: 'Programming:',
        items: [
          'React, Vue, TypeScript, Tailwind, Bootstrap, Java SQL, and Python',
        ],
      },
      {
        subtitle: 'Certifications:',
        items: ['Foundations of User Experience Design - Coursera'],
      },
    ],
  },
];

export const photo = {
  title: 'Visual storytelling',
  description:
    'In my free time, I enjoy hanging out with friends and capturing moments with my camera. This hobby keeps my creativity alive and often sparks fresh ideas, leading me towards innovative approaches and creative solutions.',
};

export const VoluntaryProjects = [
  {
    title: 'Lundakarnevalen',
    description: `During my time as the Head of Photography for Lundakarnevalen, I had the privilege of leading a dedicated team of photographers and editors. Together, we documented the organization and its events for marketing purposes. Through effective leadership and project management, we ensured that our work captured the essence of the organization, demonstrating strong attention to detail and commitment to excellence. Additionally, collaborating with the editorial team to publish a book was a rewarding experience, resulting in the distribution of every single copy as attendees eagerly sought to collect a piece of the carnival's memories.`,
    year: '2022',
  },
  {
    title: 'Teknikfokus - Career Fair',
    description: `As the Marketing Manager & Graphic Designer for Teknikfokus, Career Fair, I embraced the opportunity to enhance the organization's online presence and visual identity. Through innovative marketing strategies, we significantly increased social media publicity and engagement, fostering a stronger connection with our audience. Crafting a cohesive and visually appealing graphic profile was a fulfilling endeavor, as it allowed me to combine creativity with adherence to brand guidelines. These experiences taught me the importance of effective communication, strategic planning, and creative problem-solving in achieving organizational goals.`,
    year: '2021',
  },
  { sectionTitle: 'Voluntary Work' },
];

export const footerLinks = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andreroxhage/',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/andreroxhage/',
  },
  {
    title: 'andreroxhage74@gmail.com',
    href: 'mailto:andreroxhage74@gmail.com',
  },
];
