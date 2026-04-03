/** Structured copy for CheckYourself (must match `portfolio.ts` slug). */

export const CHECKYOURSELF_CASE_STUDY_SLUG = "check-yourself-app" as const;

export const checkYourselfCaseStudy = {
  tagline:
    "A mobile platform enabling at-home STD testing kit ordering and result tracking, designed to break down systemic barriers to sexual health access in the Philippines.",
  meta: [
    { label: "Timeline", value: "Feb – Apr 2025" },
    { label: "Platform", value: "Mobile (iOS)" },
    {
      label: "Methods",
      value: "Interviews · Prototyping · Usability Testing",
    },
  ],
  empathize: {
    intro:
      "User interviews surfaced three interconnected barriers that compound each other: geography, stigma, and awareness gaps, making access to sexual health testing acutely difficult for many Filipinos.",
    metrics: [
      {
        value: "418%",
        label: "HIV growth rate",
        sub: "Rise in new infections in the Philippines from 2010 to 2022",
      },
      {
        value: "55",
        label: "Daily diagnoses",
        sub: "Average new HIV diagnoses per day as of March 2024",
      },
      {
        value: "401K",
        label: "Projected cases",
        sub: "Estimated cases by 2030 if the current trend continues",
      },
    ],
    barriersUncovered: {
      title: "Barriers uncovered in research",
      items: [
        {
          title: "Access",
          subtitle: "Geographic & financial barriers",
          body: "No nearby clinics, high transport costs, and limited free testing, especially outside urban areas.",
        },
        {
          title: "Privacy & stigma",
          subtitle: "Social risk of being seen",
          body: "Fear of judgment, discrimination, or being outed, especially for LGBTQ+ individuals in conservative communities.",
        },
        {
          title: "Awareness",
          subtitle: "Misconceptions & delayed testing",
          body: 'Many only test when symptomatic; fear of a positive result and the myth that HIV is a death sentence discourages testing entirely.',
        },
      ],
    },
    quote:
      "Some individuals fear judgment from healthcare professionals, friends, or family members if they are seen at an STD clinic.",
    teamReflection: {
      quote:
        "There will always be a deeper layer to a user's problem. Effective solutions require understanding the emotions and fears users carry, not just the surface-level inconveniences.",
      attribution: "Team reflection",
    },
  },
  define: {
    intro:
      "Interview themes were synthesized into a Point of View statement that reframed the challenge, from logistics to human dignity, and three How Might We questions that guided ideation.",
    pov: {
      user: "A sexually active adult in a rural area facing challenges accessing healthcare and sexual health information.",
      needs: "Convenient, private STD testing and reliable guidance on managing their sexual health.",
      insights:
        "Geographical isolation, stigma, and misinformation form a compounding barrier that discourages proactive care even when the user wants to act.",
    },
    hmw: [
      "Make STD testing more accessible in rural areas?",
      "Make sexual health services more affordable for individuals facing financial challenges?",
      "Improve public understanding and awareness of sexual health?",
    ],
    sdgs: [
      "SDG 3: Good Health & Well-Being",
      "SDG 5: Gender Equality",
      "SDG 10: Reduced Inequalities",
    ],
  },
  ideate: {
    intro:
      "The team expanded beyond simple clinic logistics to a holistic platform that combines test kit delivery, specialist messaging, and educational content, with privacy as the core design principle.",
    features: [
      {
        title: "At-home test kits",
        body: "Confidential ordering and activation, with step-by-step result tracking entirely in-app.",
      },
      {
        title: "Doctor messaging",
        body: "Private, encrypted conversations with healthcare professionals for guidance and follow-ups.",
      },
      {
        title: "Appointment booking",
        body: "Schedule consultations or mobile testing van visits with date, location, and reminder support.",
      },
      {
        title: "Education hub",
        body: "Videos, tutorials, and resources to dispel myths and encourage proactive sexual health management.",
      },
      {
        title: "Drone & truck delivery",
        body: "Innovative logistics for rural and underserved areas where traditional couriers can't reach.",
      },
      {
        title: "Health records",
        body: "Profile-based file storage for prescriptions, lab results, and medical history in one place.",
      },
    ],
  },
  prototype: {
    intro:
      "The design went through three iterative rounds: wireframes to establish core flows, then a refined high-fidelity version incorporating user feedback at each stage.",
    iterations: [
      {
        label: "Iteration 01: Lo-fi",
        focus: "Structure & flow",
        body: "Core navigation validated; feedback requested better visual design and notification organization.",
      },
      {
        label: "Iteration 02: Hi-fi",
        focus: "Visual design + security",
        body: "Password masking, email verification, and direct doctor messaging added based on user feedback.",
      },
      {
        label: "Iteration 03: Hi-fi",
        focus: "Clarity & onboarding",
        body: "Structured address fields, city selection screen, and tutorial screens added to reduce first-time confusion.",
      },
    ],
    loFi: {
      title: "Low-fidelity",
      description:
        "Wireframes establishing structure, user flow, and core functionality without visual design constraints.",
      bullets: [
        "Home dashboard",
        "Kit ordering flow",
        "Appointment scheduler",
        "Messages hub",
        "User profile",
      ],
    },
    hiFi: {
      title: "High-fidelity",
      description:
        "Full visual design with branding, interactivity, and real content, refined from three rounds of user feedback.",
      bullets: [
        "Registration & email verification",
        "Personalized home screen",
        "Schedule with reminders",
        "Order with delivery tracking",
        "Profile with medical history",
      ],
    },
    iterationNote:
      "Passwords are now hidden with asterisks and a verification code system was added to enhance security and user trust.",
    iterationAttribution: "Prototype #2 iteration note",
  },
  test: {
    intro:
      "Three rounds of usability testing produced iterative refinements: from structural layout issues in prototype one to input clarity in prototype three.",
    liked: [
      "Straightforward and easy to navigate",
      "Simplistic, clean color scheme",
      "Clear instructions throughout",
      "Feature-complete for the core tasks",
    ],
    improve: [
      "More detailed address input fields",
      "Separate notification categories",
      "Tutorial screens for first-time users",
      "Non-prescription medication ordering",
    ],
  },
  insights: {
    title: "Key Insights",
    insights: [
      "The most important thing the Design Thinking process revealed was that the barrier to STD testing in the Philippines is not primarily medical—it's social and systemic.",
      "Before research, the team assumed cost was the dominant obstacle. Interviews quickly complicated that assumption. While financial barriers were real, the more powerful deterrents were stigma, fear of judgment, and the anxiety of being seen seeking help. The solution couldn't just be cheaper testing, it had to be invisible testing. Private, discreet, and available without any of the social exposure that in-person testing requires.",
      "That realization reshaped every design decision: the emphasis on confidential delivery, the messaging system's privacy framing, the ability to track results without visiting a clinic, and the educational resources designed to reduce the shame and misinformation that keep people from acting."
    ]
  }
} as const;
