const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars view engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    eq: (a, b) => a === b,
    contains: (str, substr) => {
      if (!str || !substr) return false;
      return String(str).includes(String(substr));
    },
    isUXProject: (project) => {
      if (!project) return false;
      const label = project.label || '';
      const tech = project.tech || '';
      return label.includes('UX') || tech.includes('UX');
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Portfolio data
const portfolioData = {
  profile: {
    name: "Matthew Benison Javier",
    title: "UX Engineer & Researcher",
    email: "matthewbenisonjavier@gmail.com",
    linkedin: "https://www.linkedin.com/in/matthewbenisonjavier/",
    instagram: "https://www.instagram.com/matyuhabyer/",
    github: "https://github.com/matyuhabyer",
    resume: "/assets/Matthew_Javier_Resume_2025.pdf"
  },
  about: {
    subtitle: "Bridging people and technology, one design at a time.",
    paragraphs: [
      "Detail-oriented and adaptable Information Technology student with hands-on experience in UX research & design, database administration, cloud computing, IT support, and full-stack web development. Proficient in SQL, Node.js, MongoDB, JavaScript/TypeScript, HTML/CSS (Tailwind), Figma, and cloud platforms (AWS, Azure). Experienced in leadership roles across student organizations. Seeking opportunities in UX/Product Design & Research, Database Administration, Cloud Computing, Data Analytics, Project Management, Quality Assurance, IT Support, and Web Development roles."
    ]
  },
  techStack: {
    frontend: [
      { name: "HTML5", image: "/assets/tech/html5.png" },
      { name: "CSS3", image: "/assets/tech/css3.png" },
      { name: "JavaScript", image: "/assets/tech/javascript.png" },
      { name: "TypeScript", image: "/assets/tech/typescript.png" },
      { name: "Tailwind CSS", image: "/assets/tech/tailwindcss.png" }
    ],
    backend: [
      { name: "Node.js", image: "/assets/tech/nodejs.png" },
      { name: "Java", image: "/assets/tech/java.png" },
      { name: "PHP", image: "/assets/tech/php.png" },
      { name: "Python", image: "/assets/tech/python.png" },
      { name: "C", image: "/assets/tech/c.png" }
    ],
    cloud: [
      { name: "AWS", image: "/assets/tech/aws.png" },
      { name: "Azure", image: "/assets/tech/azure.png" },
      { name: "Oracle", image: "/assets/tech/oracle.png" },
      { name: "MongoDB", image: "/assets/tech/mongodb.png" },
      { name: "MySQL", image: "/assets/tech/sql.png" }
    ],
    tools: [
      { name: "Git", image: "/assets/tech/git.png" },
      { name: "GitHub", image: "/assets/icons/mdi_github.svg" },
      { name: "Figma", image: "/assets/tech/figma.png" },
      { name: "Canva", image: "/assets/tech/canva.png" },
      { name: "Linux", image: "/assets/tech/linux.png" },
      { name: "MySQL Workbench", image: "/assets/tech/mysqlworkbench.png" },
      { name: "DBeaver", image: "/assets/tech/dbeaver.png" },
      { name: "VSCode", image: "/assets/tech/vscode.png" },
      { name: "JetBrains IntelliJ", image: "/assets/tech/intellij.png" },
      { name: "Apache NetBeans", image: "/assets/tech/netbeans.png" },
      { name: "Cursor", image: "/assets/tech/cursor.png" },
      { name: "Discord", image: "/assets/tech/discord.png" },
      { name: "Vercel", image: "/assets/tech/vercel.png" }
    ]
  },
  projects: [
    {
      slug: "shein-mobile-app-research",
      name: "SHEIN Mobile App Redesign & Research",
      label: "UX Case Study",
      tech: "Figma · UX Research · UI Design",
      description: "Redesigned the SHEIN mobile shopping experience through qualitative UX research and prototyping focusing on core tasks and user pain points.",
      longDescription: "Led a two-month research and redesign of the SHEIN mobile application focused on browsing, adding to cart, and checkout flows. Conducted qualitative interviews to identify user pain points, ideated solutions through user journey maps and wireframes, and validated high-fidelity prototypes with moderated usability testing.",
      role: "UX Lead · UI/UX Researcher & Designer",
      timeline: "February - April 2025",
      highlights: [
        "Conducted 5 semi-structured user interviews to analyze user behavior, surface pain points, and improve user retention and efficiency when using the app.",
        "Synthesized findings with thematic analysis, mapped the end-to-end customer journey, and defined opportunity areas to guide ideation.",
        "Redesign Solution: Streamlined navigation, reducing ads/banners into one scrollable banner, addition of whitespace, AI Search Assistant, consolidated rewards section, checkout confirmation pop-up, interactive size guide",
        "Applied Interaction Design Patterns and Nielsen's 10 Usability Heuristics to identify and prioritize usability issues.",
        "Performed moderated usability tests using the think-aloud protocol and recorded task completion times and verbal/non-verbal feedback to inform iterative design changes.",
        "Delivered comprehensive documentation and design rationale; received top course scores and faculty commendation for research rigor and justification."
      ],
      lessonsLearned: [
        "<strong>Behavioral Design Over Logic</strong> – A logically correct solution (like a confirmation pop-up) may not change user behavior; effective design must reframe the decision process itself.",
        "<strong>Flexibility Builds Confidence</strong> – Allowing users multiple ways to achieve the same goal increases efficiency and aligns with Nielsen’s Flexibility and Efficiency of Use heuristic.",
        "<strong>Small Visual Tweaks, Big Impact</strong> – Simple visual improvements like dark mode or decluttered layouts can significantly reduce fatigue and enhance user satisfaction.",
        "<strong>Recognizing Business-Driven UX Trade-offs</strong> – Some frustrating designs are intentional business strategies; good UX requires balancing user satisfaction with business goals."
      ],
      image: "/assets/images/shein-image.jpg",
      heroImage: "/assets/images/shein-hero-image.jpg",
      ctaLabel: "View Presentation & Interactive Prototype",
      ctaUrl: "https://www.figma.com/deck/oFKoRUJctJmpkMra78mZIe/MCO5_Pookies?node-id=1-42&t=1j6DcZ7VNGDh3Q2h-1"
    },
    {
      slug: "check-yourself-app",
      name: "CheckYourself Mobile Application",
      label: "UX Case Study",
      tech: "Figma · UX Research · UI Design",
      description: "Conducted end-to-end UX research to design a privacy-first mobile app addressing barriers to STD testing in the Philippines, focused on overcoming user stigma and accessibility issues",
      longDescription: "Led a healthcare UX case study for a mobile health app concept that provides confidential at-home STD testing kits and consultations to address critical gaps in the Philippines' public health system. Through the design thinking process, it was identified that deep-seated societal stigma and privacy fears, rather than logistical access, were the primary user barriers. The high-fidelity prototype delivers a complete and secure ecosystem that includes confidential ordering, tele-consultations with doctors, educational resources, and lab result tracking.",
      role: "UX Lead · UI/UX Researcher & Designer",
      timeline: "Februrary – April 2025",
      highlights: [
        "Led user research and ideation for a telehealth app enabling STD consultation and at-home test kit ordering.",
        "Conducted semi-structured interviews, developed POV statements, and generated HMW questions to frame design opportunities; facilitated ideation (Crazy 8’s) and brainstorming sessions.",
        "Ran usability sessions and captured insights with feedback capture grids to guide iterations and improve user flows.",
        "Conducted three cycles of iterative prototype testing, using feedback grids to implement critical UI/UX improvements like security verification and tutorial screens."
      ],
      lessonsLearned: [ 
        "<strong>Empathy Uncovers the Real Problem</strong> – User interviews revealed that the main barrier wasn’t logistics but fear and stigma, shifting the design focus toward psychological safety.", 
        "<strong>Design for Trust and Safety</strong> – For a sensitive health issue, the product must be a 'safe space,' not just a tool. Building user trust through privacy-first features (like at-home kits and secure chats) is the primary goal.", 
        "<strong>Iterate to Eliminate Confusion</strong> – Iterative testing on simple flows is critical. User feedback on the ordering process exposed major confusion, which was resolved by adding simple tutorial screens, a small change that fixed a major usability gap.", 
        "<strong>Design thinking is Essential for Innovation</strong> – Applying design thinking ensures that solutions stay human-centered and adaptive throughout development."
      ],
      image: "/assets/images/checkyourself-image.jpg",
      heroImage: "/assets/images/checkyourself-hero-image.jpg",
      ctaLabel: "View Interactive Prototype (Use iPhone SE as Device)",
      ctaUrl: "https://www.figma.com/proto/ON7M6aCXSSSUqPIinw8r0Y/ISDESTH?page-id=0%3A1&node-id=19-97&starting-point-node-id=75%3A480&t=jZ39LpHCs7vmP8sg-1"
    },
    {
      slug: "tafteria-web-application",
      name: "Tafteria: Establishments Review Web Application",
      label: "Full-Stack Development",
      tech: "Figma · HTML/Tailwind CSS · JavaScript · Node.js · Express.js · MongoDB",
      description: "Led full-stack development of a web application that allows users in Taft, Manila to disvover and review local establishments.",
      longDescription: "Tafteria is a review-based web application designed for the Taft, Manila community to explore, rate, and share feedback about local establishments. As the Full-Stack Developer and Database Engineer, I led the development of both the front-end and back-end systems. I designed and implemented REST API endpoints using Node.js and Express.js, and structured a MongoDB database with flexible document schemas to support user-generated reviews and content. On the client side, I developed features for user registration, CRUD operations for reviews and users, and search functionality with filters for easier discoverability. Through this project, I strengthened my understanding of full-stack architecture, data modeling, and user-centered web design, while building a platform that connects the Taft community through authentic local insights.",
      role: "Full-Stack Developer, Database Engineer/Administrator",
      timeline: "June – August 2024",
      highlights: [
        "Led full-stack development of a local establishments review platform; implemented user registration, CRUD for reviews and users, and robust search functionality.",
        "Built REST API endpoints (Node.js) and used MongoDB for flexible review/document schemas to support user-generated content.",
        "Integrated client-side forms and validation, implemented search filters to improve discoverability of establishments."
      ],
      image: "/assets/images/tafteria-image.jpg",
      heroImage: "/assets/images/tafteria-hero-image.jpg",
      ctaLabel: "View Source on GitHub",
      ctaUrl: "https://github.com/matyuhabyer/tafteria-web-application"
    },
    {
      slug: "cinema-database-application",
      name: "Simple Cinema Database Application",
      label: "Database Design & Development",
      tech: "HTML/CSS · JavaScript · JSP · MySQL · Apache NetBeans",
      description: "Developed a web-based database application to manage key cinema operations, including employee records, movie schedules, showtimes, and concession inventory.",
      longDescription: "The Cinema Management System is a web-based database application project for the CCINFOM (Information Management) course in the College of Computer Studies at De La Salle University. It is developed to streamline the operations of a cinema, allowing employees to manage employees, available movies, movie screenings, showtimes, and available snacks. It is also developed for processing transactions for tickets and snacks for customers and generates reports on the cinema's overall sales (tickets and snacks) and movie gross sales (sales per movie). The system provides functionalities for both administrators and customers, ensuring smooth and efficient cinema operations.",
      role: "Full-Stack Developer, Database Engineer/Administrator",
      timeline: "January – February 2025",
      highlights: [
        "Built a web-based cinema management system with CRUD modules for employees, movies, screenings, showtimes, and concessions.",
        "Implemented transaction handling and automated sales reports for daily reconciliation and management insights.",
        "Designed normalized relational schema and optimized SQL queries to support scalability and efficient data retrieval.",
        "Strengthened understanding of full-stack web development, database engineering and administration, and data-driven application design."
      ],
      image: "/assets/images/cinemadb-image.jpg",
      heroImage: "/assets/images/cinemadb-hero-image.jpg",
      ctaLabel: "View Source on GitHub",
      ctaUrl: "https://github.com/matyuhabyer/cinema-db-app"
    },
    {
      slug: "forum-friends-web-application",
      name: "Forum Friends Web Application",
      label: "Full-Stack Development",
      tech: "HTML/CSS · JavaScript · Node.js · Express.js · MongoDB",
      description: "Developed role-based access control features for a forum web application, enabling secure user authentication, content moderation, and administrative dashboards for managing users and discussions.",
      longDescription: "Forum Friends is a full-stack forum web application designed to foster community interaction while maintaining security and accountability. As the Backend Developer, I implemented a role-based access control system (User, Manager, Admin) to manage permissions across content and user management modules. The project also included security-focused features such as password change functionality, audit logs, and application logs to improve traceability. Manager and Admin dashboards were built to enable content moderation, user management, and reporting tools, ensuring the platform upholds community standards and operational oversight.",
      role: "Backend Developer – Security & Access Control",
      timeline: "June – August 2025",
      highlights: [
        "Implemented a role-based access control (RBAC) system with User, Manager, and Admin permissions for secure content and user management.",
        "Developed security features including password change functionality, audit logs, and application logs to ensure accountability.",
        "Built Manager and Admin dashboards for moderation, user management, and analytics to support operational oversight.",
        "Enhanced understanding of system security, backend administration, and scalable full-stack web development."
      ],
      image: "/assets/images/forumfriends-image.jpg",
      heroImage: "/assets/images/forumfriends-hero-image.jpg",
      ctaLabel: "View Source on GitHub",
      ctaUrl: "https://github.com/matyuhabyer/ITSECWB-CaseStudy"
    }
  ],
  certifications: [
    {
      title: "HTML Fundamentals",
      issuer: "CodeCred",
      date: "September 2025",
      link: "https://www.codecred.dev/verify/50172402-feb9-4a23-ae7a-b35262e62c86"
    },
    {
      title: "SQL Fundamentals",
      issuer: "CodeCred",
      date: "September 2025",
      link: "https://www.codecred.dev/verify/5e996eff-0a21-4fa4-9c94-551297c4044f"
    },
    {
      title: "Foundations of User Experience (UX) Design",
      issuer: "Google",
      date: "August 2025",
      link: "https://coursera.org/share/bf24ece9c0b5d166a9c83e25c27513f2"
    },
    {
      title: "Intermediate Python",
      issuer: "DataCamp",
      date: "August 2025",
      link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/ed056d2bc2876a9fb4c2ad739514d35f9ff02535"
    },
    {
      title: "Introduction to Python",
      issuer: "DataCamp",
      date: "August 2025",
      link: "https://www.datacamp.com/completed/statement-of-accomplishment/course/57ef229361f0bd59eca54c45aeb1404e3f28bad7"
    },
    {
      title: "Design Thinking for Innovation & Impact",
      issuer: "Limitless Lab",
      date: "May 2025",
      link: "/assets/certifications/Limitless Lab - Design Thinking.pdf"
    },
    {
      title: "UI/UX Principles",
      issuer: "CodeCred",
      date: "May 2025",
      link: "https://www.codecred.dev/verify/5c60b1ad-3428-4283-af6c-578b7b0ed2d7"
    },
    {
      title: "Introduction to Data Science",
      issuer: "Cisco",
      date: "December 2024",
      link: "https://www.credly.com/badges/9e73a0e1-115f-4535-887f-bec8e25c87fa"
    },
    {
      title: "Certified Lean Six Sigma White Belt",
      issuer: "The Council for Six Sigma Certification (CSSC)",
      date: "November 2024",
      link: "/assets/certifications/JAVIER - Official_Certification_Issued_Lean_Six_Sigma_White_Belt_Certification.pdf"
    },
    {
      title: "SQL (Advanced)",
      issuer: "HackerRank",
      date: "May 2024",
      link: "https://www.hackerrank.com/certificates/d3b21bdaafc2"
    },
    {
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco",
      date: "April 2024",
      link: "https://www.credly.com/badges/8215e034-8664-462e-8251-7001a73c26f6"
    },
    {
      title: "SQL (Intermediate)",
      issuer: "HackerRank",
      date: "February 2024",
      link: "https://www.hackerrank.com/certificates/adf4469d0612"
    },
    {
      title: "SQL (Basic)",
      issuer: "HackerRank",
      date: "February 2024",
      link: "https://www.hackerrank.com/certificates/4b44e3952171"
    }
  ],
  education: {
    university: "De La Salle University - Manila",
    course: "Bachelor of Science in Information Technology",
    dates: "September 2022 – Present",
    cgpa: "3.307+ / 4.00",
    highlights: [
      "Honorable Mention Standing (CGPA of 3.2 and above)",
      "DOST-SEI Merit Scholar"
    ]
  },
  organizations: [
    {
      name: "La Salle Computer Society",
      dates: "September 2024 - August 2025",
      role: "Associate Vice President for Publicity and Creatives",
      highlights: [
        "Led a committee of 10 members for one of the organization’s flagship events, achieving: +2,100% views, +1,100% reach, +2,100% visits, and +4,900% follows on publicity campaigns.",
        "Designed publicity materials and handled social media management for various projects and events under the organization that boosted university engagement.",
        "Collaborated with other officers on event branding, creative design, and organizational promotions."
      ]
    },
    {
      name: "Computer Studies Government",
      dates: "February 2024 – September 2025",
      role: "Director for Integrated Marketing Communications - Publicity",
      highlights: [
        "Managed publicity for the college student government’s social media platforms, engaging an audience of over 1,000 students and reaching a broader network of 5,000+ people.",
        "Coordinated and fulfilled publicity requests from various project leaders and committees to ensure cohesive communication.",
        "Collaborated with the Student Services Committee to effectively disseminate information, addressing student concerns related to both academic and non-academic services, including enlistment processes."
      ]
    },
    {
      name: "College of Computer Studies Creatives",
      dates: "November 2023 - May 2025",
      role: "Executive for Social Media Graphics",
      highlights: [
        "Designed publicity materials about the college and CCS-related events under the Assistant Dean for External Affairs and Lasallian Mission."
      ]
    },
    {
      name: "Animo Film Lab",
      dates: "November 2023 - August 2024",
      role: "Assistant Vice President for Documentations and Logistics",
      highlights: [
        "Oversaw the document processing of the organization such as passing of letters, entry permits, reservation of venues, and equipment entry.",
        "Oversaw the deadlines for the pre-activity and post-activity requirements of the projects implemented.",
        "Took charge in the compilation of the organization’s documents, making sure that papers are complete and have met all the requirements."
      ]
    },
    {
      name: "LEAP 2024 Central Committee",
      dates: "April 2024 - July 2024",
      role: "Assistant Team Head for Documentations",
      highlights: [
        "Worked on managing the post-activity documents of the LEAP projects.",
        "Reviewed and compiled documents completed by the other LEAP committees for approval."
      ]
    }
  ]
};

// Routes
app.get('/', (req, res) => {
  res.render('about', { 
    data: portfolioData,
    currentPage: 'about'
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    data: portfolioData,
    currentPage: 'about'
  });
});

app.get('/experience', (req, res) => {
  res.render('experience', { 
    data: portfolioData,
    currentPage: 'experience'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', { 
    data: portfolioData,
    currentPage: 'projects'
  });
});

app.get('/projects/:slug', (req, res) => {
  const project = portfolioData.projects.find(item => item.slug === req.params.slug);

  if (!project) {
    return res.status(404).render('project-not-found', {
      data: portfolioData,
      currentPage: 'projects',
      title: 'Project Not Found'
    });
  }

  res.render('project-detail', {
    data: portfolioData,
    currentPage: 'projects',
    project,
    title: project.name
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
