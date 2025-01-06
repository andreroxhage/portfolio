export const links = [
  {
    title: "Home",
    href: "/#header",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Work",
    href: "/#work",
  },
  {
    title: "Photography",
    href: "/#photography",
  },
  {
    title: "Voluntary Work",
    href: "/#voluntary-work",
  },
];

export const header = {
  title: "ANDRÉ ROXHAGE",
  currently:
    "Software Design Engineer, blending software development and design with a passion for enhancing user experiences",
};

export const about = [
  {
    title: "Engineering",
    description: `My journey in engineering started with a curiosity for how products influence our daily lives. With a focus on crafting digital solutions that center on user needs, my work spans from software development to design. I’ve gained significant experience in cross-functional teams and agile projects. Pursuing a Master's in Engineering, specializing in Information and Communication Technologies, has allowed me to further deepen my technical expertise.`,
  },
  {
    title: "Psychology",
    description: `My passion for psychology stems from a desire to understand human behavior and its application to digital products. Specializing in creativity psychology, I use these insights to foster innovation and ensure that the user experience resonates deeply with individuals. My Bachelor’s degree in Psychology, combined with my engineering skills, allows me to take a holistic approach to product design, ensuring that every touchpoint is both functional and empathetic to users’ needs.`,
  },
];

export const currentWork = [
  {
    sectionTitle: "Current Work",
    title: "InterMail",
    description: `In my role as a Software Design Engineer, I bridge the gap between design and development, working closely with cross-functional teams to create a seamless and intuitive customer data platform. My involvement spans from front-end development to strategic design decisions, ensuring that usability and user-centricity remain central to every solution. Leading a comprehensive redesign effort, I focused on enhancing the platform’s usability, making it more intuitive and easy to learn.`,
    tags: {
      tag1: "Frontend",
      tag2: "UX",
      tag3: "SaaS",
      tag4: "Vue",
      tag5: "Bootstrap",
      tag6: "Figma",
    },
    resumeTitle: "Are You a LinkedIn Stalker?",
  },
];

export const projects = [
  {
    title: "Login Experience in VR",
    subtitle: "Innovative Authentication Method for GAIM",
    headerSrc: "/resource/projects/p2_gaim.jpeg",
    titleColor: "#d4edff",
    subtitleColor: "#c2d9e9",
    date: "2024",
    projectSlug: "login-experience-in-vr",
    ...getProjectAssets("login-experience-in-vr"),
    tags: ["VR", "Authentication", "GAIM", "Design Process"],
    image: "/resource/projects/vr-login.jpg",
    imageAlt: "Scroll Select Authentication in VR",
    sections: [
      {
        title: "Executive Summary",
        layout: "two-col",
        content: [
          {
            type: "text",
            column: "left",
            paragraphs: [
              "This project was conducted as part of the “Working Environment Project” course, with a group of four members collaborating to address the challenges of authentication in Virtual Reality (VR). The project focused on designing a innovative login method tailored to immersive VR environments, particularly for GAIM’s VR shooting application.",
              "The problem stemmed from traditional authentication methods, such as typing passwords on virtual keyboards, which are cumbersome, error-prone, and disruptive to the immersive experience. Our objective was to develop a solution that enhances usability, maintains robust security, and integrates seamlessly into the VR experience.",
            ],
          },
          {
            type: "link",
            text: "Visit GAIM",
            column: "left",
            href: "https://www.gaim.com/",
          },
          {
            type: "list",
            style: "number",
            column: "left",
            subtitle: "Key Outcomes",
            items: [
              "Scroll Select Authentication: A novel interaction design combining horizontal scrolling and object selection to streamline login processes in VR.",
              "Innovative Immersion: Designed with VR-specific principles to maintain user engagement and immersion.",
              "Theme Integration: Seamlessly integrated with GAIM’s VR shooting application, ensuring consistency with the overall user experience.",
            ],
          },
          {
            type: "image",
            column: "right",
            src: "/resource/projects/p2_hifi.gif",
            alt: "Conceptual Design of Scroll Select Authentication",
          },
        ],
      },
      {
        title: "Introduction",
        layout: "middle",
        content: [
          {
            subtitle: "Problem Statement",
            type: "text",
            paragraphs: [
              "Current VR login methods are cumbersome and detract from the immersive experience. Typing passwords on virtual keyboards is slow, error-prone, and breaks the flow of interaction. This problem is intensified in applications like GAIM’s VR shooting experiences, where users handle integrated controllers. A more intuitive, efficient, and secure authentication solution tailored to VR environments is essential to enhance usability and maintain immersion.",
            ],
          },
          {
            subtitle: "Project Objectives",
            type: "list",
            style: "number",
            items: [
              "Research: Explore alternative login methods suited for VR, focusing on reducing frustration, increasing efficiency, and maintaining robust security.",
              "Design: Create conceptual and high-fidelity prototypes that integrate seamlessly into VR environments.",
              "Prototyping: Develop a functional prototype in Unity to demonstrate the Scroll Select Authentication method.",
            ],
          },
        ],
      },
      {
        title: "Design Process",
        layout: "middle",
        content: [
          {
            subtitle: "Research & Ideation",
            type: "text",
            paragraphs: [
              "We reviewed existing VR authentication methods and design guidelines, including gesture-based systems like RubikAuth and ergonomic principles for immersive interaction, as well as Apple's and Meta's guidelines for developing VR applications.",
            ],
          },
          {
            type: "text",
            paragraphs: [
              "After conducting research, we brainstormed ideas and sketched concepts to explore innovative approaches. The Scroll Select Authentication method emerged as a promising solution, combining horizontal scrolling with object selection to create an intuitive and engaging login experience. Other concepts were evaluated based on usability, security, and integration with GAIM’s VR application.",
            ],
          },
          {
            type: "image",
            src: "/resource/projects/p2_affinity.png",
            alt: "Ideation Process for Scroll Select Authentication",
          },
        ],
      },
      {
        layout: "two-col",
        content: [
          {
            subtitle: "Conceptual Design - Scroll Select Authentication",
            type: "text",
            column: "left",
            paragraphs: [
              "This method combines horizontal scrolling and object selection for a seamless login experience. The interaction design leverages VR’s spatial capabilities and is tailored to fit environments where single-button controllers or weapon controllers are used, such as GAIM’s VR shooting platform. This ensures that the authentication process aligns with the thematic consistency of the application while maintaining ease of use.",
              "The Scroll Select Authentication method seamlessly integrates with GAIM’s weapon-style controllers, allowing users to navigate and input credentials without needing to detach or switch devices. This thematic alignment enhances immersion, as the controller’s natural mechanics are repurposed for authentication without breaking the flow of interaction. The single-button functionality simplifies actions, ensuring accessibility even for less experienced users.",
              "This integration not only strengthens the user’s sense of engagement within the VR environment but also eliminates the need for external input devices, reinforcing the immersive and streamlined experience that is essential to VR applications.",
            ],
          },
          {
            subtitle: "User Flow",
            column: "right",
            type: "list",
            style: "number",
            items: [
              "Center Selection: A key appears in the center of the user’s field of view for focus and precision.",
              "Horizontal Scrolling: Users move the controller left or right to scroll through keys.",
              "Row Navigation: Switching between rows for letters, numbers, special characters, and control options.",
              "Key Selection: Once the desired key is centered, the user presses the controller button.",
              "Completion: Users navigate to the “Login” key to authenticate.",
            ],
          },
          {
            type: "image",
            column: "right",
            src: "/resource/projects/p2_concept.png",
            alt: "High-Fidelity Prototype of Scroll Select Authentication",
          },
          {
            subtitle: "High-Fidelity Prototype",
            type: "text",
            paragraphs: [
              "The prototype was developed in Unity, leveraging advanced VR interactions and controls. Key features included spatial navigation, precise key selection, and immersive feedback mechanisms.",
            ],
          },
          {
            type: "image",
            src: "/resource/projects/vr-login-prototype.jpg",
            alt: "High-Fidelity Prototype of Scroll Select Authentication",
          },
          {
            subtitle: "Usability Evaluation",
            type: "text",
            paragraphs: [
              "User testing focused on speed, error rate, and satisfaction. Participants found the method intuitive and engaging, with reduced cognitive load compared to traditional approaches. However, challenges in gesture precision highlighted areas for improvement.",
            ],
          },
        ],
      },
      {
        layout: "middle",
        content: [
          {
            subtitle: "High-Fidelity Prototype",
            type: "text",
            paragraphs: [
              "The high-fidelity prototype brought the Scroll Select Authentication concept to life, using Unity to create an immersive and intuitive VR login experience. Users navigate a dynamic horizontal scrolling interface, hover over directional zones to switch between character sets, and make selections with a single button. This setup ensures ergonomic ease, precision, while maintaining immersion.",
              "Key features include hover-based navigation, real-time text updates in the input field, and seamless transitions between rows of characters (letters, numbers, symbols, and controls). The integration with VR controllers ensures users can authenticate efficiently without breaking their engagement with the virtual environment. This prototype successfully demonstrates how authentication can be reimagined to enhance usability, reduce errors, and maintain immersion in VR applications, setting a foundation for future development and evaluation.",
            ],
          },
          {
            subtitle: "User Testing",
            type: "text",
            paragraphs: [
              "User testing was conducted with eight participants of varying VR experience levels, including both novice users and a VR researcher. The goal was to evaluate the usability, efficiency, and intuitiveness of the Scroll Select Authentication system. The testing revealed several insights into user behavior, strengths, and potential areas for improvement.",
              "Participants noted the system’s efficiency once they understood the interaction mechanics, with one expert user quickly writing their name without errors after an initial adjustment period. However, challenges included sensitivity issues, confusion about the interaction flow, and difficulty locating specific actions like “Erase” or “Enter.” Some participants found the scrolling speed too fast, while others felt the distance between keys made navigation tedious. Suggestions such as onboarding animations, clearer grouping of rows, and hover-based feedback emerged as potential fixes to enhance the overall experience. Despite initial learning curves, most users appreciated the innovative approach and saw its potential with refinements.",
            ],
          },
        ],
      },
      {
        title: "Final Evaluation",
        layout: "middle",
        content: [
          {
            type: "text",
            paragraphs: [
              "The Scroll Select Authentication system successfully demonstrated a novel approach to VR login methods, prioritizing immersion and efficiency. User feedback highlighted the method’s strengths, including its alignment with VR controller mechanics and its capacity for precise, single-button interactions. However, testing also revealed areas for improvement, such as better onboarding, optimized sensitivity, and more intuitive placement of key actions like “Enter” and “Erase.”",
              "Proposed adjustments, including differentiated scroll speeds, hover delay for error mitigation, and animations to clarify row movements, could significantly enhance usability and reduce confusion. Overall, the project met its objectives of exploring innovative VR login methods, offering a foundation for further refinement and development. With iterative design and continued user testing, the Scroll Select Authentication method has strong potential to set a benchmark for intuitive and immersive VR authentication systems.",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Usability Evaluation",
    subtitle: "Microsoft Teams Calendar",
    headerSrc: "/resource/projects/p1.jpg",
    titleColor: "#5059C9",
    subtitleColor: "#6264A7",
    date: "2024",
    projectSlug: "usability-evaluation-of-microsoft-teams-calendar-feature",
    ...getProjectAssets(
      "usability-evaluation-of-microsoft-teams-calendar-feature",
    ),
    tags: ["Usability Evaluation", "Microsoft Teams", "Calendar Feature"],
    image: "/resource/projects/p1.jpeg",
    imageAlt: "Usability Evaluation of Microsoft Teams Calendar Feature",
    sections: [
      {
        title: "Executive Summary",
        layout: "two-col",
        content: [
          {
            type: "text",
            title: "Overview",
            column: "left",
            paragraphs: [
              "This usability evaluation, conducted as part of a school project in a group of six, assessed the Microsoft Teams Free calendar feature, focusing on its usability challenges, user satisfaction, and actionable improvements. By simulating real-world tasks with young, digitally experienced users, we uncovered key insights into the platform’s strengths and weaknesses.",
              "Basic tasks like joining meetings were intuitive, but users struggled with rescheduling meetings, locating features, and understanding system feedback during connection issues. Ambiguous labels and limited guidance during technical disruptions led to delays and confusion.",
              "System messages, especially during connection loss, should be more visible and clear. RSVP tracking should be streamlined and provide real-time updates. An interactive onboarding experience should be introduced to familiarize new users with core features. Button labels like “Start Meeting” and “End Meeting” should be clearer and align with user expectations.",
            ],
          },
          {
            type: "image",
            column: "right",
            src: "/resource/projects/p1.jpg",
          },
        ],
      },
      {
        title: "Introduction",
        layout: "middle",
        content: [
          {
            subtitle: "Purpose",
            type: "text",
            paragraphs: [
              "The purpose of this evaluation is to understand how people interact with Microsoft Teams’ calendar feature in a real-world setting. We aim to discover whether new users can easily get started without dedicated training, identify where the experience might be improved, and assess the quality of feedback provided during connection hiccups.",
            ],
          },
          {
            subtitle: "Research Questions",
            type: "list",
            style: "number",
            items: [
              "How satisfied are users with the calendar’s overall usability?",
              "How effective is the process of creating and rescheduling meetings?",
              "Does Microsoft Teams provide sufficient feedback during connection loss?",
            ],
          },
        ],
      },
      {
        title: "Methodology",
        layout: "middle",
        content: [
          {
            type: "text",
            paragraphs: [
              "The evaluation involved six participants aged 18–30, all based in Lund, Sweden, who were familiar with other digital calendar tools like Google Calendar but new to Microsoft Teams. Participants completed a series of tasks designed to replicate typical usage scenarios, such as scheduling meetings, checking attendee availability, and handling connection disruptions. Data collection methods included the Think Aloud protocol, task completion metrics, and pre- and post-test questionnaires, ensuring a comprehensive understanding of user experiences.",
              "Testing was conducted in a controlled lab environment to minimize distractions and standardize conditions across sessions. Each task was framed as a real-world scenario to capture authentic interactions. Observers documented user behavior, while participants provided feedback through structured questionnaires and open-ended discussions.",
            ],
          },

          {
            type: "list",
            subtitle: "Tasks",
            style: "number",
            items: [
              "Joining a Scheduled Meeting: Testing ease of access to an ongoing meeting.",
              "Creating a New Meeting: Evaluating the steps to schedule a new meeting.",
              "Checking Availability and Rescheduling: Assessing users’ ability to view invitee availability and reschedule if needed.",
              "Starting and Ending a Meeting: Observing the ease of ending meetings without inadvertently leaving.",
              "Recognizing Connection Loss: Testing how effectively users detect connection loss.",
              "Rescheduling Without Internet: Observing user behavior when attempting to reschedule offline.",
              "Logging Out: Testing users’ ability to find and use the logout option.",
            ],
          },
        ],
      },
      {
        title: "",
        layout: "full-width",
        content: [
          {
            type: "image",
            src: "/resource/projects/p1screenshot.jpg",
            alt: "Microsoft Teams Calendar Interface",
          },
        ],
      },
      {
        title: "Results",
        layout: "middle",
        content: [
          {
            type: "text",
            paragraphs: [
              "The evaluation identified several patterns in user behavior and task performance. Basic tasks, such as joining a meeting, were completed with high success rates, with most participants relying on intuitive features like pop-up notifications. However, even in these tasks, minor interface ambiguities caused delays. For instance, some users initially overlooked meeting notifications, mistaking them for unrelated alerts.",
              "Creating a meeting was moderately successful but revealed critical usability issues. Participants were often uncertain whether the invitation had been sent, as the confirmation dialog lacked clarity. This led some users to duplicate efforts, manually copying links or recreating meetings to ensure the task was completed.",
              "Rescheduling meetings emerged as the most challenging task. Participants struggled to locate RSVP details and check attendee availability, with some navigating to unrelated sections, such as the “Events” tab. These difficulties highlighted inconsistencies in how information was presented and accessed within the calendar interface.",
              "Connection loss further complicated task completion. Although all participants eventually identified the issue, many only realized it after repeated failed interactions. The system’s feedback was subtle and easily overlooked, contributing to frustration and wasted effort. Similarly, the “Leave” and “End Meeting” buttons confused participants, as the interface did not clearly differentiate their functions.",
            ],
          },
        ],
      },
      {
        title: "",
        layout: "two-col",
        content: [
          {
            type: "image",
            src: "/resource/projects/p1_plot_satisfaction.png",
            alt: "Satisfaction Ratings",
            column: "left",
          },
          {
            type: "image",
            src: "/resource/projects/p1_plot_time_realize.png",
            alt: "Feedback Clarity During Connection Issues",
            column: "right",
          },
        ],
      },
      {
        title: "Analysis & Discussion", // write these and add lots of diagrams from the report
        layout: "middle",
        content: [
          {
            type: "text",
            paragraphs: [
              "The evaluation provided a detailed understanding of where the Microsoft Teams calendar succeeds and where it falters. Joining meetings was the most intuitive function, benefiting from clear notifications and streamlined workflows. However, creating and rescheduling meetings required additional effort and introduced opportunities for user error. The lack of clear guidance during connection disruptions compounded these challenges, especially for participants who expected real-time syncing or prominent error messages.",
              "Labeling and navigation emerged as recurring themes in user feedback. For example, the term “Join” led some users to believe they were interrupting an ongoing meeting rather than starting a new one. Similarly, the “Events” section was mistaken for a calendar feature, as its icon closely resembled the calendar symbol. These findings underscore the importance of aligning interface terminology and iconography with user expectations to reduce cognitive load and improve task efficiency.",
              "RSVP tracking was a significant pain point in the free version of Microsoft Teams, where the absence of real-time RSVP updates drastically impacted usability. Unlike the paid version, which integrates RSVP responses seamlessly into the calendar, the free version forces users to navigate between the chat and calendar views to find this information. This disjointed process led to confusion, with participants often doubting whether their invitations were successfully sent or received.",
            ],
          },
        ],
      },
      {
        title: "Recommendations",
        layout: "middle",
        content: [
          {
            type: "list",
            style: "number",
            items: [
              "Enhance Connection Feedback Visibility: Make connection status more visible, such as using a centered banner with color-coded feedback.",
              "Improve RSVP and Invitation Management: Embed RSVP responses in the main calendar or chat view.",
              "Refine Key Function Labels: Use 'Start' instead of 'Join' for initiating new sessions.",
              "Introduce an Onboarding Tutorial: Cover critical tasks such as creating and rescheduling meetings, RSVP tracking, and handling connection loss.",
              "Enhance Meeting Confirmation and Feedback: Replace or supplement confirmation pop-ups with checkmarks or notification messages.",
            ],
          },
        ],
      },
    ],
  },
];

function getProjectAssets(projectSlug) {
  const cardImage = {
    "usability-evaluation-of-microsoft-teams-calendar-feature": `
      <svg width="100%" height="100%" viewBox="2 2 20 20" xmlns="http://www.w3.org/2000/svg" role="presentation" data-tid="titlebar-teams-icon" class="___ffs1ii0" fill="currentColor" aria-hidden="true">
        <path d="M21.0344 10.0012H16.8734L15.7124 10.9402V15.5972C15.7124 17.3262 17.1134 18.7282 18.8424 18.7282C20.5724 18.7282 21.9734 17.3262 21.9734 15.5972V10.9402C21.9734 10.4222 21.5534 10.0012 21.0344 10.0012Z" fill="#5059C9"></path>
        <path d="M22 7C22 8.104 21.105 9 20 9C18.895 9 18 8.104 18 7C18 5.896 18.895 5 20 5C21.105 5 22 5.896 22 7Z" fill="#5059C9"></path>
        <path d="M9.89214 10.0046H17.0961C17.5921 10.0046 17.9941 10.4066 17.9941 10.9026V16.5946C17.9941 19.0306 16.0201 21.0046 13.5841 21.0046H13.4041C10.9681 21.0046 8.99414 19.0306 8.99414 16.5946V10.9026C8.99414 10.4066 9.39614 10.0046 9.89214 10.0046Z" fill="#7B83EB"></path>
        <path d="M16.9065 5.99999C16.9065 7.60499 15.6055 8.90699 13.9995 8.90699C12.3945 8.90699 11.0935 7.60499 11.0935 5.99999C11.0935 4.39499 12.3945 3.09299 13.9995 3.09299C15.6055 3.09299 16.9065 4.39499 16.9065 5.99999Z" fill="#7B83EB"></path>
        <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M15.0001 8.6814V8.0004C15.0001 7.4504 14.5281 7.0004 13.9511 7.0004H11.2711C11.6881 8.0944 12.7391 8.8754 13.9801 8.8754C14.3401 8.8754 14.6821 8.8014 15.0001 8.6814ZM8.99414 10.9024C8.99414 10.4064 9.39614 10.0044 9.89214 10.0044H15.0001V17.8394C15.0001 18.3894 14.3821 19.0004 13.7451 19.0004H9.71514C9.26214 18.3074 8.99414 17.4834 8.99414 16.5944V10.9024Z" fill="black"></path>
        <path d="M3 18C2.45 18 2 17.55 2 17V7C2 6.45 2.45 6 3 6H13C13.55 6 14 6.45 14 7V17C14 17.55 13.55 18 13 18H3Z" fill="#4B53BC"></path>
        <path d="M11.0001 10H8.83511V15.82H7.41211V10H5.23511V8.57001H11.0001V10Z" fill="white"></path>
      </svg>`,
    "login-experience-in-vr": `
      <Image
        src="/resource/projects/p2_hifi.gif"
        alt="Scroll Select Authentication in VR"
        className="w-full rounded-lg"
        width={700}
        height={475}
      />`,
  };

  return {
    cardImage: cardImage[projectSlug] || "",
  };
}

export const resume = [
  {
    title: "Education",
    icon: "academic-cap",
    content: [
      {
        subtitle:
          "Master in Engineering, Information & Communication Technologies",
        company: "Lund University, Sweden",

        date: "2020 – 2026",
      },
      {
        subtitle: "Bachelor of Arts in Psychology",
        company: "Lund University, Sweden",

        date: "2022 – 2026",
      },
    ],
  },
  {
    title: "Experience",
    content: [
      {
        subtitle: "Software Design Engineer",
        company: "InterMail",
        date: "2023 – Current",
      },
      {
        subtitle: "Teaching Assistant - Interaction Design",
        company: "Lund University",
        date: "2023 – 2024",
      } /*
			{
				subtitle: 'Salesperson',
				company: 'Mattssons Foto',
				date: '2021 – 2023',
			},*/,
      {
        subtitle: "Head of Photography for a volunteer organization",
        company: "Lundakarnevalen",
        date: "2021 – 2023",
      },
      {
        subtitle:
          "Marketing Manager & Graphic Designer for a volunteer organization",
        company: "Teknikfokus, Career Fair",
        date: "2021 – 2022",
      },
      {
        subtitle: "Ranger soldier",
        company: "The Swedish Armed Forces",
        date: "2018 – 2019",
      },
    ],
  },
  {
    title: "Skills",
    content: [
      {
        subtitle: "Creative:",
        items: ["Figma, Adobe Illustrator, Photoshop and Lightroom"],
      },
      {
        subtitle: "Programming:",
        items: [
          "React, Vue, TypeScript, Tailwind, Bootstrap, Java SQL, and Python",
        ],
      },
      {
        subtitle: "Certifications:",
        items: ["Foundations of User Experience Design - Coursera"],
      },
    ],
  },
];

export const photo = {
  title: "Visual Storytelling",
  description:
    "In my free time, I enjoy hanging out with friends and capturing moments with my camera. This hobby keeps my creativity alive and often sparks fresh ideas, leading me towards innovative approaches and creative solutions.",
};

export const VoluntaryProjects = [
  {
    title: "Lundakarnevalen",
    description: `During my time as the Head of Photography for Lundakarnevalen, I had the privilege of leading a dedicated team of photographers and editors. Together, we documented the organization and its events for marketing purposes. Through effective leadership and project management, we ensured that our work captured the essence of the organization, demonstrating strong attention to detail and commitment to excellence. Additionally, collaborating with the editorial team to publish a book was a rewarding experience, resulting in the distribution of every single copy as attendees eagerly sought to collect a piece of the carnival's memories.`,
    year: "2022",
  },
  {
    title: "Teknikfokus - Career Fair",
    description: `As the Marketing Manager & Graphic Designer for Teknikfokus, Career Fair, I embraced the opportunity to enhance the organization's online presence and visual identity. Through innovative marketing strategies, we significantly increased social media publicity and engagement, fostering a stronger connection with our audience. Crafting a cohesive and visually appealing graphic profile was a fulfilling endeavor, as it allowed me to combine creativity with adherence to brand guidelines. These experiences taught me the importance of effective communication, strategic planning, and creative problem-solving in achieving organizational goals.`,
    year: "2021",
  },
  { sectionTitle: "Voluntary Work" },
];

export const footerLinks = [
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/andreroxhage/",
  },
  {
    title: "GitHub",
    href: "https://github.com/andreroxhage/",
  },
  {
    title: "andreroxhage74@gmail.com",
    href: "mailto:andreroxhage74@gmail.com",
  },
];
