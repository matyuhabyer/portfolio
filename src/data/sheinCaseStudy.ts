/** Structured copy for the SHEIN case study (must match `portfolio.ts` slug). */

export const SHEIN_CASE_STUDY_SLUG = "shein-mobile-app-redesign" as const;

export const sheinCaseStudy = {
  outcomeWidget: {
    meta: [
      { label: "Timeline", value: "Feb – Apr 2025" },
      { label: "Methods", value: "Interview · Thematic Analysis · Usability Test" },
      { label: "Team size", value: "4 members" },
      { label: "Tools", value: "Figma · Zoom · Google Docs · FigJam" },
    ],
    processPhases: [
      {
        step: "01: Research",
        title: "Discover",
        body: "5 semi-structured interviews · purposive sampling · thematic analysis",
        cardClass:
          "border-violet-500/25 bg-gradient-to-br from-violet-200/95 to-violet-100/80 text-violet-950 dark:from-violet-950/50 dark:to-violet-900/40 dark:text-violet-100",
      },
      {
        step: "02: Define",
        title: "Synthesize",
        body: "4 RQs · 4 themes · 3 personas · 6 user stories",
        cardClass:
          "border-emerald-500/25 bg-gradient-to-br from-emerald-200/95 to-emerald-100/80 text-emerald-950 dark:from-emerald-950/45 dark:to-emerald-900/35 dark:text-emerald-50",
      },
      {
        step: "03: Design",
        title: "Prototype",
        body: "Lo-fi wireframes → hi-fi prototype with 5 new features",
        cardClass:
          "border-amber-500/25 bg-gradient-to-br from-amber-200/90 to-amber-50/90 text-amber-950 dark:from-amber-950/40 dark:to-amber-900/30 dark:text-amber-50",
      },
      {
        step: "04: Evaluate",
        title: "Test",
        body: "Think-aloud protocol · 11 tasks · 4/5 pain points resolved",
        cardClass:
          "border-rose-500/25 bg-gradient-to-br from-rose-200/90 to-rose-100/80 text-rose-950 dark:from-rose-950/45 dark:to-rose-900/35 dark:text-rose-50",
      },
    ],
    metrics: [
      { value: "5", label: "Participants interviewed" },
      { value: "4", label: "Thematic insights" },
      { value: "80%", label: "Pain points resolved in testing" },
    ],
    outcomes: [
      {
        status: "resolved" as const,
        title: "Cluttered interface",
        detail: "Three-tier nav, single swipeable banner, added whitespace.",
      },
      {
        status: "resolved" as const,
        title: "Search limitations",
        detail: "SH-AI-N conversational AI assistant bridges keyword gaps.",
      },
      {
        status: "resolved" as const,
        title: "Overwhelming promotions",
        detail: "Consolidated Rewards section; voucher expiration clearly flagged.",
      },
      {
        status: "resolved" as const,
        title: "Sizing inconsistency",
        detail: "Interactive size guide with personalized fit recommendation.",
      },
      {
        status: "partial" as const,
        title: "Impulsive buying",
        detail:
          "Confirmation dialog implemented; insufficient for behavioral change.",
      },
    ],
    quote: {
      text: "Ang daming ways para puntahan yung product. It gives you options, tapos parang walang rason, para hindi mo mahanap yung hinahanap mo.",
      attribution: "Usability test participant",
      context: "on the redesigned search experience",
    },
  },
  problem: {
    intro: [
      "SHEIN is one of the world's largest fast-fashion platforms, but its mobile app experience tells a messier story. Despite its enormous catalog and loyal user base, the interface actively works against the people using it.",
      "Before designing anything, we needed to understand the real friction points, not just the obvious ones. We set out to answer four core questions:",
    ],
    questions: [
      "What emotions do users experience when using SHEIN?",
      "What factors bring users back to the app?",
      "How does the UI/UX affect users' efficiency in core tasks?",
      "How do users perceive the ease and challenges of navigating SHEIN?",
    ],
  },
  research: {
    paragraphs: [
      "We conducted **semi-structured remote interviews** via Zoom with **5 participants** recruited through purposive sampling. Each participant was 18+ years old with active experience using and ordering through the SHEIN mobile app. One session was run as a joint interview to surface comparative perspectives between two users in real time.",
      "Sessions were recorded and transcribed using Zoom's AI Companion feature. We analyzed the transcripts through **thematic analysis**, identifying recurring patterns, frustrations, and behaviors across all five interviews.",
    ],
  },
  findings: {
    intro: "Four themes emerged from the data:",
    themes: [
      {
        title: "Mixed Emotions: The Rollercoaster",
        body: "Users described shopping on SHEIN as an emotional rollercoaster. Excitement from discovering options quickly gave way to frustration from being buried in them. Regret from impulsive purchases was a recurring thread.",
        quote: {
          text: "You go through so many things; sometimes you find the one you want, then there's no size… I would say really, there's no one emotion when it comes to shopping on SHEIN.",
          attribution: "Interviewee #3",
        },
      },
      {
        title: "What Keeps Users Coming Back",
        body: "Convenience, targeted social media advertising, and discount stacking were the three primary drivers of return visits. Notably, users expressed disappointment that SHEIN has scaled back voucher stacking, a feature they once loved.",
      },
      {
        title: "Core Task Friction",
        body: "The UI actively impedes the three core tasks: browsing and searching, adding to cart, and checking out. An overwhelming interface, inaccurate search results, inconsistent vendor sizing, and broken voucher validation all contributed to abandoned purchases and post-purchase regret.",
        quote: {
          text: "I still could not find the item I needed because when I was searching for it, the app kept suggesting everything but the item I was looking for.",
          attribution: "Interviewee #3",
        },
      },
      {
        title: "Navigation: Powerful but Punishing",
        body: "Users who knew what they wanted found SHEIN's category and filter system reasonably effective. Users who didn't, or who came from an external link, were often left stranded on the homepage, unable to find what they'd clicked on.",
      },
    ],
  },
  opportunities: [
    "The cluttered categories section overwhelms users before they even begin searching.",
    "Excessive features and promotions create cognitive overload and distract from the core shopping flow.",
    "Inconsistent sizing across vendors leaves users dependent on scrolling through reviews just to determine their size.",
    "Voucher management is broken: expired codes appear valid, prices change at checkout, and codes are hard to type manually.",
    "The checkout flow enables impulsive purchasing without giving users a meaningful moment to reconsider.",
  ],
  userStories: {
    headers: ["User Type", "Goal", "Outcome"] as const,
    rows: [
      {
        userType: "Frugal shopper",
        goal: "Maximize vouchers and discounts",
        outcome: "Reduce spending without compromising items needed",
      },
      {
        userType: "Impulsive buyer",
        goal: "Avoid buyer's remorse",
        outcome: "Prevent regretting or canceling purchases",
      },
      {
        userType: "Need-based shopper",
        goal: "Find products quickly",
        outcome: "Get what's needed efficiently, without hassle",
      },
      {
        userType: "Trend-following shopper",
        goal: "See similar items on a product page",
        outcome: "Avoid repetitive searching",
      },
      {
        userType: "Visual browser",
        goal: "See precise, clear product images",
        outcome: "Verify quality before buying",
      },
      {
        userType: "Practical shopper",
        goal: "See accurate size charts and stock",
        outcome: "Avoid abandoning purchases due to size confusion",
      },
    ],
  },
  visualStrategy: {
    paragraphs: [
      "Before touching any screens, we established a design direction grounded in the research.",
      "**Streamlining the interface** meant collapsing redundant navigation into a single three-tier menu (Home → Categories → Subcategories), condensing promotional banners into one swipeable carousel, and creating a dedicated Rewards section to house all vouchers and discounts.",
      "**Visual language** was anchored in a monochromatic black-and-white palette, already associated with SHEIN's brand, with strategic use of gold for vouchers and promotions (exclusivity, urgency without aggression) and green for call-to-action buttons (permission, not pressure).",
      "**Typography** used SHEIN's custom Schein Sans for headings and Open Runde, a rounded variant of Inter, for body text. Research in typography psychology shows users prefer rounded fonts by up to 26%, and the softer geometry aligned with the calmer, less overwhelming experience we were designing toward.",
      "**Brand voice** was defined to shift tone by context: exciting and persuasive on banners, direct and clear in categories, reassuring in sizing, and encouraging at checkout: never pushy, never confusing.",
    ],
  },
  features: [
    {
      title: "Checkout Confirmation Dialog",
      body: "A confirmation modal before finalizing purchase gives users a deliberate pause point, directly addressing the impulsive buying cycle identified in the research.",
    },
    {
      title: "SH-AI-N: Conversational AI Smart Search Assistant",
      body: "When users can't describe what they want in keywords, a conversational AI assistant bridges the gap, allowing natural language queries like \"I'm looking for a white slim-fit top for sports.\"",
    },
    {
      title: "Interactive Size Guide",
      body: "Users consistently relied on scrolling reviews to find \"size up\" or \"true to size\" comments. The interactive size guide collects the user's height, weight, and preferred fit to generate a personalized recommendation for each product, removing that friction entirely.",
    },
    {
      title: "Voucher Expiration Visibility",
      body: "Vouchers that are expired or invalid are clearly flagged before checkout, not revealed as an error at the point of payment. Auto-apply logic selects the best available voucher without requiring manual code entry.",
    },
    {
      title: "Dark Mode",
      body: "Reduces visual fatigue, improves readability in low-light environments, and addresses the \"overwhelming\" quality of SHEIN's existing interface. Multiple interviewees described the app as visually exhausting.",
    },
  ],
  prototypes: {
    loFi: {
      label: "Low-Fidelity Prototype",
      description:
        "Established the core navigation architecture and interaction patterns: three-tier navigation, progressive disclosure, size guide flow, and staged checkout. Wireframes focused on structure and user flow over aesthetics.",
      url: "https://www.figma.com/proto/PVa8jKMPEc79J2G2vMc0pW/Pookies---SHEIN-Redesign-Lo-Fi?node-id=5-2&t=ezp7zqPKxEA14LzC-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A2",
      linkText: "View Lo-Fi Prototype on Figma",
    },
    hiFi: {
      label: "High-Fidelity Prototype",
      description:
        "Placeholder content was replaced with real product imagery, completed UI components, and the full SHEIN color palette and typography system. All proposed features were implemented: SH-AI-N, the size guide, dark mode, the checkout confirmation dialog, and the auto-apply voucher system.",
      url: "https://www.figma.com/proto/PVa8jKMPEc79J2G2vMc0pW/Pookies---SHEIN-Redesign?page-id=340%3A1818&node-id=340-1820&viewport=3423%2C-421%2C0.71&t=0xY41v8PH9zs0g72-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=340%3A1820",
      linkText: "View Hi-Fi Prototype on Figma",
    },
    nielsen:
      "Design decisions in the hi-fi were validated against Nielsen's 10 Usability Heuristics at every screen, from visibility of system status (active nav icons, page titles) to error prevention (confirmation dialogs, expired voucher flags) to flexibility and efficiency of use (three parallel paths to find any product).",
  },
  usability: {
    method: "Think-aloud protocol",
    participant:
      "One participant matching the \"Impulsive Buyer\" persona, a returning interviewee from MCO1 already familiar with the redesign's context.",
    duration: "Up to 1 hour",
    tasks:
      "11 tasks spanning dark mode toggling, product discovery via all three search paths, size guide use, voucher application, cart review, and checkout.",
    worked: {
      intro:
        "The redesign successfully addressed four of the five major pain points identified in research.",
      bullets: [
        "The cluttered interface was resolved; the participant described the redesign as \"straight to the point\" and more navigable than the original.",
        "SH-AI-N was a standout success; the participant used all three discovery methods interchangeably and found them complementary rather than redundant.",
        "The consolidated promotions banner was appreciated for giving users control over their browsing pace.",
        "The interactive size guide was described as \"very useful,\" with the participant noting the availability of size guide, size options, and size chart all in one place.",
        "Dark mode received immediate positive verbal and non-verbal reactions.",
      ],
    },
    didntWork: {
      intro:
        "The checkout confirmation pop-up failed to curb impulsive purchasing behavior for this particular user. As an impulsive buyer, they clicked through the modal without meaningfully engaging with it, and product suggestions on the order details screen compounded the issue by surfacing more items to buy immediately after checkout.",
      quote: {
        text: "As an impulsive buyer, hindi talaga napigilan yung pagiging impulsive ko. Siguro that's a skill issue sa end ko.",
        attribution: "Usability Test Participant",
      },
    },
  },
  outcomes: {
    rows: [
      {
        pain: "Cluttered UI",
        solution: "Streamlined navigation, single scrollable banner, added whitespace",
        resolved: "yes" as const,
      },
      {
        pain: "Search limitations",
        solution: "SH-AI-N Conversational AI Assistant",
        resolved: "yes" as const,
      },
      {
        pain: "Overwhelming promotions",
        solution: "Consolidated Rewards section",
        resolved: "yes" as const,
      },
      {
        pain: "Impulsive buying / buyer's remorse",
        solution: "Checkout confirmation pop-up",
        resolved: "partial" as const,
      },
      {
        pain: "Sizing inconsistency",
        solution: "Interactive size guide + size chart",
        resolved: "yes" as const,
      },
    ],
    reflection: [
      "The project surfaced an important UX lesson: designing for behavior change is fundamentally different from designing for usability. Making an interface easier to use is a solvable problem. Interrupting a deeply ingrained impulsive behavior pattern through interface design alone is not, and acknowledging that boundary honestly is itself a meaningful insight.",
      "The participant also raised a consideration the team hadn't fully addressed: older users and users with psychosocial disabilities (the participant has ADHD and self-identified as someone whose attention is pulled toward highlighted clickable items). Inclusive design for attention and cognitive diversity is a clear next step for future iterations.",
      "Additionally, allowing users multiple ways to achieve the same goal increases efficiency and aligns with Flexibility and Efficiency of Use. Acknowledging business-driven UX trade-offs is equally important: some frustrating designs are intentional business strategies, and good UX requires balancing user satisfaction with business goals.",
    ],
  },
} as const;

export function figmaEmbedSrc(protoUrl: string): string {
  return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(protoUrl)}`;
}
