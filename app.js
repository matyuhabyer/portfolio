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
    eq: (a, b) => a === b
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
    title: "Lifelong Learner",
    email: "matthewbenisonjavier@gmail.com",
    linkedin: "https://www.linkedin.com/in/matthewbenisonjavier/",
    instagram: "https://www.instagram.com/matyuhabyer/",
    github: "https://github.com/matyuhabyer",
    resume: "/assets/JAVIER, M.B. T. - RESUME.pdf"
  },
  about: {
    subtitle: "Bridging people and technology, one design at a time.",
    paragraphs: [
      "I am Matthew Benison T. Javier, a detail-oriented and adaptable Information Technology student at De La Salle University – Manila with a strong foundation in research, design, and computing. As a DOST-SEI Merit Scholar, I strive for academic excellence while sharpening both technical expertise and leadership skills.",
      "I previously contributed to organizations such as the La Salle Computer Society and the Computer Studies Government, where I've led publicity and creative initiatives that boosted university engagement and strengthened my abilities in leadership, communication, and project management.",
      "My professional interests span UI/UX design and research, Human–Computer Interaction, Data Analytics, Database Administration, Cloud Computing, Project Management, Quality Assurance, and Web Application Development—fields where I can combine creativity and technical skills to build solutions that bridge people and technology and enhance everyday life."
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
      { name: "VSCode", image: "/assets/tech/vscode.png" },
      { name: "JetBrains IntelliJ", image: "/assets/tech/intellij.png" },
      { name: "Cursor", image: "/assets/tech/cursor.png" },
      { name: "Discord", image: "/assets/tech/discord.png" },
      { name: "Vercel", image: "/assets/tech/vercel.png" }
    ]
  },
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

// Start server
app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
  console.log(`Available routes:`);
  console.log(`  - http://localhost:${PORT}/about`);
  console.log(`  - http://localhost:${PORT}/experience`);
  console.log(`  - http://localhost:${PORT}/projects`);
});
