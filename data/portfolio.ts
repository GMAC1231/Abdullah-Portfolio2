export type ProjectCategory =
  | "React"
  | "Frontend"
  | "Mobile"
  | "Full Stack"
  | "Firebase"
  | "Guide"
  | "Portfolio"
  | "Game";

export type ProjectInternship = {
  company: string;
  program: string;
  linkedInUrl: string;
  websiteUrl?: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  highlights: string[];
  challenge: string;
  solution: string;
  outcome: string;
  liveUrl?: string;
  deploymentUrl?: string;
  githubUrl?: string;
  internship?: ProjectInternship;
  featured?: boolean;
  visual:
    | "dashboard"
    | "services"
    | "commerce"
    | "scooter"
    | "weather"
    | "mobile"
    | "guide"
    | "portfolio"
    | "flower"
    | "meditation"
    | "food"
    | "game";
};

export const projects: Project[] = [
  {
    slug: "taskflow-firebase",
    title: "TaskFlow — Firebase Project Management Web App",
    shortTitle: "TaskFlow",
    eyebrow: "SoftGrowTech Internship Final Project",
    summary:
      "A secure Firebase web application with authentication, real-time Firestore data, analytics, CRUD workflows, and responsive project-management screens.",
    description:
      "TaskFlow was developed as the final project of my remote internship with SoftGrowTech. It is a deployed project-management web application where registered users receive a private browser-based workspace for projects, tasks, priorities, progress, deadlines, and team members.",
    categories: ["React", "Frontend", "Firebase", "Full Stack"],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Authentication",
      "Cloud Firestore",
      "Recharts",
      "GitHub Actions",
    ],
    highlights: [
      "Email and password authentication",
      "Private user-specific Firestore collections",
      "Real-time projects, tasks, and team data",
      "Search, filters, modals, themes, and analytics",
      "Responsive mobile and desktop layouts",
      "Automatic GitHub Pages deployment",
      "Final project completed during the SoftGrowTech internship",
    ],
    challenge:
      "Create a complete responsive application with real data, secure authentication, reusable components, and a deployment workflow that works on GitHub Pages.",
    solution:
      "I designed a component-based Next.js interface, connected it to Firebase Authentication and Firestore, applied user-scoped security rules, and configured a static-export GitHub Actions pipeline.",
    outcome:
      "The final application allows anyone to register and test the product while keeping each account's projects, tasks, and team records isolated and secure.",
    liveUrl: "https://gmac1231.github.io/taskflow-firebase/login/",
    githubUrl: "https://github.com/GMAC1231/taskflow-firebase",
    internship: {
      company: "SoftGrowTech",
      program: "Remote Frontend Development Internship — Final Project",
      linkedInUrl:
        "https://www.linkedin.com/company/officialsoftgrowtech/posts/?feedView=all",
    },
    featured: true,
    visual: "dashboard",
  },
  {
    slug: "smartfixoman",
    title: "SmartFixOman — Household Service Management Platform",
    shortTitle: "SmartFixOman",
    eyebrow: "Lead Developer / Project Design",
    summary:
      "A mobile service platform connecting customers and service providers through requests, chat, bidding, notifications, and real-time updates.",
    description:
      "SmartFixOman focuses on making household-service discovery and communication easier. Customers can submit service requests while providers can review opportunities, communicate, and respond through a structured workflow.",
    categories: ["Mobile", "Full Stack", "Firebase"],
    technologies: ["Flutter", "Dart", "Python", "Flask", "Firebase", "REST APIs", "GitHub"],
    highlights: [
      "Customer and service-provider workflows",
      "Service requests and bidding",
      "Real-time chat and status updates",
      "Notification-oriented architecture",
      "Cross-platform mobile interface",
    ],
    challenge:
      "Design a multi-role platform that keeps service requests, communication, status changes, and provider responses understandable for both customers and professionals.",
    solution:
      "I combined a Flutter mobile interface with Flask APIs and Firebase real-time features, separating role-specific screens and simplifying the request lifecycle.",
    outcome:
      "The result is a practical service-management concept with clear workflows, real-time communication, and room for future marketplace expansion.",
    githubUrl: "https://github.com/GMAC1231/SmarrtfixOman",
    featured: true,
    visual: "services",
  },
  {
    slug: "neon-food-express",
    title: "Neon Food Express — Online Food Ordering System",
    shortTitle: "Neon Food Express",
    eyebrow: "Frontend Food Ordering Project",
    summary:
      "A neon-styled online food-ordering interface with menu discovery, category browsing, order selection, and a responsive customer journey.",
    description:
      "Neon Food Express is a frontend food-ordering project designed around a bold restaurant identity and a simple ordering flow. Customers can explore menu items, review food categories, select products, and move through a clear browser-based ordering experience.",
    categories: ["Frontend"],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "DOM Interaction",
      "GitHub",
    ],
    highlights: [
      "Neon restaurant-inspired visual identity",
      "Responsive menu and food-category presentation",
      "Interactive item-selection workflow",
      "Clear pricing and order-summary interface",
      "Reusable frontend components and sections",
      "Public source repository",
    ],
    challenge:
      "Create an attractive food-ordering interface that keeps menu browsing, product selection, pricing, and the customer journey easy to understand without relying on a backend system.",
    solution:
      "I organized the experience into clear menu categories, reusable food cards, prominent calls to action, and responsive layouts while using JavaScript for client-side interactions.",
    outcome:
      "The project demonstrates frontend interface design, DOM-based interaction, responsive restaurant branding, and a practical online-ordering workflow.",
    githubUrl: "https://github.com/GMAC1231/food-ordering-system",
    visual: "food",
  },
  {
    slug: "ecommerce-capstone",
    title: "Complete E-Commerce Website",
    shortTitle: "E-Commerce Capstone",
    eyebrow: "Qwetrum Technologies Internship Capstone",
    summary:
      "A polished multi-page storefront with product discovery, filtering, sorting, cart persistence, validation, and a responsive checkout experience.",
    description:
      "This capstone brought together the frontend skills developed during the Qwetrum Technologies internship. It includes a complete customer journey from browsing products to reviewing the cart and completing the checkout interface.",
    categories: ["Frontend"],
    technologies: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "localStorage", "GitHub Pages"],
    highlights: [
      "Home, shop, product, cart, and checkout pages",
      "Search, filtering, and sorting",
      "Persistent shopping cart using localStorage",
      "Responsive product layouts",
      "Checkout form validation",
      "Final capstone completed during the Qwetrum Technologies internship",
    ],
    challenge:
      "Build a complete and consistent shopping experience using frontend technologies while preserving cart data between pages and browser sessions.",
    solution:
      "I created reusable interface patterns, structured product data in JavaScript, and implemented localStorage-based cart state with validation and responsive behavior.",
    outcome:
      "The final capstone demonstrates a complete frontend e-commerce flow and was deployed publicly through GitHub Pages.",
    liveUrl: "https://gmac1231.github.io/Capstone-Complete-E-Commerce-Website/",
    githubUrl: "https://github.com/GMAC1231/Capstone-Complete-E-Commerce-Website",
    internship: {
      company: "Qwetrum Technologies",
      program: "Web Development Internship — Capstone Project",
      linkedInUrl: "https://www.linkedin.com/company/qwetrum-technologies/",
      websiteUrl: "https://www.qwetrumtechnologies.tech/",
    },
    featured: true,
    visual: "commerce",
  },
  {
    slug: "e-scooter-rental",
    title: "E-Scooter Rental System",
    shortTitle: "E-Scooter Rental",
    eyebrow: "Diploma Project",
    summary:
      "An eco-friendly campus rental concept with scooter availability, rental records, responsive screens, and Firebase-backed data planning.",
    description:
      "The system was designed for a university-campus environment where students can discover available scooters, understand rental information, and interact with a clear responsive interface.",
    categories: ["Frontend", "Firebase"],
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "Firebase", "RAD"],
    highlights: [
      "Responsive rental interface",
      "Availability and rental-record concepts",
      "Firebase data integration",
      "Rapid Application Development process",
    ],
    challenge:
      "Present rental availability and user actions clearly across different screen sizes while planning a simple cloud-connected data structure.",
    solution:
      "I designed a responsive workflow and used Firebase concepts to organize availability and rental information during the development process.",
    outcome:
      "The project demonstrates practical interface design for a sustainable campus-mobility service.",
    visual: "scooter",
  },
  {
    slug: "weather-app",
    title: "Weather2 — Android Mobile Weather App",
    shortTitle: "Weather2 Mobile",
    eyebrow: "Android Mobile Application",
    summary:
      "A mobile weather application designed in Android Studio to present weather information through a clean, readable, and responsive phone interface.",
    description:
      "Weather2 is an Android mobile application focused on presenting changing weather information through structured screens and an easy-to-read mobile layout. The project demonstrates native Android interface development, data presentation, and preference persistence.",
    categories: ["Mobile", "Firebase"],
    technologies: [
      "Android Studio",
      "Java",
      "Firebase",
      "Mobile UI",
      "Weather Data",
      "GitHub",
    ],
    highlights: [
      "Native Android mobile interface",
      "Weather-information presentation",
      "Clear temperature and condition hierarchy",
      "Firebase-supported data handling",
      "Saved user preferences",
      "Public GitHub source repository",
    ],
    challenge:
      "Organize changing weather information in a mobile interface that remains clear, readable, and convenient to use on different Android screen sizes.",
    solution:
      "I used structured Android views, a strong information hierarchy, and saved preferences to create a consistent mobile experience for returning users.",
    outcome:
      "The project improved my Android Studio, Java, mobile-interface, and data-presentation skills while producing a focused weather application.",
    githubUrl: "https://github.com/GMAC1231/Weather2",
    visual: "weather",
  },
  {
    slug: "monopoly-professional-rule-guide",
    title: "Monopoly — Professional Rules Guide",
    shortTitle: "Monopoly Rules Guide",
    eyebrow: "Professional Reference Website",
    summary:
      "A polished, responsive Monopoly rules reference that organizes gameplay guidance into a clear and professional browser-based experience.",
    description:
      "This project is a professional rule-guide website, not a playable game. It presents Monopoly guidance through structured sections, readable explanations, and a responsive interface designed for quick reference before or during a game.",
    categories: ["Frontend", "Guide"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Information Architecture", "Responsive Design", "GitHub Pages"],
    highlights: [
      "Structured rule categories and explanations",
      "Professional reference-focused interface",
      "Clear typographic and content hierarchy",
      "Responsive reading experience",
      "Quick browser-based rules access",
      "Public GitHub Pages deployment",
    ],
    challenge:
      "Organize detailed Monopoly rules into a website that remains easy to scan, understand, and reference without presenting the content as a playable game.",
    solution:
      "I arranged the content into focused guide sections, used strong visual hierarchy and reusable information blocks, and applied responsive styling so the rules remain readable across desktop and mobile devices.",
    outcome:
      "The result is a professional rule-reference website that demonstrates frontend design, information organization, responsive layout development, and user-focused content presentation.",
    liveUrl: "https://gmac1231.github.io/Monopoly/",
    githubUrl: "https://github.com/GMAC1231/Monopoly",
    visual: "guide",
  },
  {
    slug: "original-developer-portfolio",
    title: "Abdullah Portfolio — Original Developer Website",
    shortTitle: "Original Portfolio",
    eyebrow: "Personal Portfolio Project",
    summary:
      "My original responsive developer portfolio presenting projects, technical skills, certificates, experience, contact information, and downloadable career documents.",
    description:
      "This portfolio was created to organize my development journey into a public website. It combines project showcases, skills, certificates, responsive navigation, interactive motion, and direct links for recruiters and collaborators.",
    categories: ["Frontend", "Portfolio"],
    technologies: ["HTML5", "CSS3", "JavaScript", "Intersection Observer", "Responsive Design", "GitHub Pages"],
    highlights: [
      "Responsive desktop and mobile navigation",
      "Animated section reveals while scrolling",
      "Projects, experience, and certificate presentation",
      "Downloadable CV and document access",
      "Direct GitHub, LinkedIn, and contact links",
      "Public GitHub Pages deployment",
    ],
    challenge:
      "Present a large amount of career information without overwhelming visitors, while keeping the website responsive, professional, and easy to navigate.",
    solution:
      "I organized the content into clearly separated sections, added reusable visual patterns, implemented responsive navigation and scroll-based reveals, and optimized the experience for both recruiters and mobile visitors.",
    outcome:
      "The website became a central public profile for sharing my projects, qualifications, technical skills, certificates, and professional contact information.",
    liveUrl: "https://gmac1231.github.io/Abdullah-Portfolio/",
    githubUrl: "https://github.com/GMAC1231/Abdullah-Portfolio",
    visual: "portfolio",
  },
  {
    slug: "flower-shop-e-plant-shopping",
    title: "FlowerShop — E-Plant Shopping Store",
    shortTitle: "FlowerShop",
    eyebrow: "React Frontend Project",
    summary:
      "A responsive plant-shopping storefront built with reusable React components, product browsing, shopping-cart interactions, and clear client-side state.",
    description:
      "FlowerShop is a component-based React storefront for browsing plants and organizing a simple shopping journey. The project focuses on reusable product presentation, responsive layouts, client-side interactions, and a clear path from product discovery to cart review.",
    categories: ["React", "Frontend"],
    technologies: [
      "React",
      "JavaScript",
      "CSS3",
      "State Management",
      "Reusable Components",
      "GitHub Pages",
    ],
    highlights: [
      "Responsive plant and flower storefront",
      "Reusable product-card components",
      "Product browsing and category presentation",
      "Shopping-cart and quantity interactions",
      "Client-side state-driven interface",
      "GitHub deployment workflow",
    ],
    challenge:
      "Create a shopping interface that presents multiple products clearly, keeps repeated product layouts reusable, and maintains cart-related interactions without making the customer journey feel complicated.",
    solution:
      "I separated the storefront into reusable React components, organized the product information into structured data, and used client-side state to keep shopping interactions consistent across the application.",
    outcome:
      "The project strengthened my React component architecture, responsive e-commerce design, and state-management skills while producing a polished plant-shopping experience.",
    liveUrl: "https://gmac1231.github.io/e-plantShopping/",
    githubUrl: "https://github.com/GMAC1231/e-plantShopping",
    visual: "flower",
  },
  {
    slug: "meditation-app",
    title: "MeditationApp — React Native Wellness Experience",
    shortTitle: "MeditationApp",
    eyebrow: "React Native / Expo Project",
    summary:
      "A calming mobile meditation interface created with reusable React Native components, an Expo workflow, and state-driven interaction patterns.",
    description:
      "MeditationApp is a mobile-focused wellness project designed to present meditation content through a calm and approachable interface. It demonstrates reusable cross-platform components, structured mobile screens, and state-based user interactions using React Native and Expo.",
    categories: ["React", "Mobile", "Frontend"],
    technologies: [
      "React Native",
      "Expo",
      "JavaScript",
      "Mobile UI",
      "Reusable Components",
      "State Management",
    ],
    highlights: [
      "Calm meditation-focused mobile interface",
      "Reusable cross-platform UI components",
      "Structured session and content screens",
      "State-driven navigation and interaction",
      "Expo-based development workflow",
      "Public GitHub source repository",
    ],
    challenge:
      "Design a mobile wellness interface that feels calm and simple while keeping repeated elements reusable and supporting state-driven interactions across multiple screens.",
    solution:
      "I built the interface with reusable React Native components, separated repeated visual patterns, and used Expo to develop and test the mobile experience efficiently.",
    outcome:
      "The project improved my React Native, Expo, component-design, and mobile-interface skills while demonstrating a focused wellness application concept.",
    githubUrl: "https://github.com/GMAC1231/meditationApp",
    visual: "meditation",
  },
  {
    slug: "unity-game-development-collection",
    title: "Unity Game Development Collection",
    shortTitle: "Unity Game Collection",
    eyebrow: "Michigan State University Specialization",
    summary:
      "A collection of Unity projects spanning a 2D shooter, 2D platformer, first-person shooter, 3D platformer, and an original capstone prototype.",
    description:
      "This game-development collection was completed through Michigan State University’s five-course Game Design and Development with Unity specialization. The work combines game-design theory with practical Unity production across 2D and 3D projects, culminating in an original playable capstone prototype.",
    categories: ["Game"],
    technologies: [
      "Unity",
      "C#",
      "2D Game Development",
      "3D Game Development",
      "Gameplay Prototyping",
      "Level Design",
    ],
    highlights: [
      "2D shooter game project",
      "2D platformer game project",
      "First-person shooter project",
      "3D platformer project",
      "Original game-design capstone prototype",
      "Game mechanics, level design, iteration, and playtesting",
    ],
    challenge:
      "Apply game-design principles across multiple genres while learning to translate mechanics, levels, player feedback, and technical implementation into playable Unity experiences.",
    solution:
      "I developed four guided Unity projects and then planned and produced an original capstone prototype, using iterative design, reusable gameplay systems, level construction, and testing to improve the player experience.",
    outcome:
      "The specialization expanded my software-development portfolio into interactive game production and strengthened my Unity, C#, prototyping, level-design, and gameplay-system skills.",
    liveUrl: "https://abdullah0364.itch.io/",
    visual: "game",
  },

];

export const skillGroups = [
  {
    title: "Frontend Development",
    description: "Responsive, accessible interfaces and reusable web components.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"],
    icon: "code",
  },
  {
    title: "Mobile Development",
    description: "Cross-platform and native mobile application experiences.",
    skills: ["Flutter", "Dart", "React Native", "Expo", "Android Studio", "Java", "Swift", "Mobile UI/UX", "Notifications"],
    icon: "mobile",
  },
  {
    title: "Backend & APIs",
    description: "Practical backend services, integrations, and application workflows.",
    skills: ["Python", "Flask", "REST APIs", "Spring Boot", "Google SMTP", "Node.js", "Express", "Django"],
    icon: "server",
  },
  {
    title: "Database & Cloud",
    description: "Authentication, real-time data, storage, and secure access.",
    skills: ["Firebase Authentication", "Cloud Firestore", "Realtime Database", "MySQL", "SQL", "NoSQL"],
    icon: "database",
  },
  {
    title: "Data & Analytics",
    description: "Data preparation, modelling, visualisation, and evidence-based decisions.",
    skills: ["Python", "R", "Tableau", "Statistics", "Regression Analysis", "Machine Learning", "Predictive Modelling", "Business Intelligence", "Data Pipelines"],
    icon: "analytics",
  },
  {
    title: "Game Development",
    description: "Interactive 2D and 3D experiences built through iterative design and prototyping.",
    skills: ["Unity", "C#", "2D Games", "3D Games", "Platformers", "First-Person Games", "Gameplay Prototyping", "Level Design"],
    icon: "game",
  },
  {
    title: "Tools & Workflow",
    description: "Version control, documentation, deployment, and development operations.",
    skills: ["Git", "GitHub", "GitHub Actions", "VS Code", "Anaconda", "LaTeX", "Overleaf", "Docker", "Kubernetes", "GitHub Pages"],
    icon: "tools",
  },
  {
    title: "AI-Assisted Development",
    description: "Using AI responsibly to improve speed, debugging, logic review, and documentation.",
    skills: ["Generative AI", "Prompt Engineering", "Code Generation", "Logic Review", "AI-Assisted Debugging", "Python AI Applications", "Flask AI Services"],
    icon: "sparkles",
  },
];

export const experiences = [
  {
    period: "June 2026 – July 2026",
    role: "Frontend Development Intern",
    organization: "SoftGrowTech · Remote",
    description:
      "Completed a four-week frontend-development internship and built responsive JavaScript projects plus TaskFlow, a Next.js and Firebase project-management dashboard with authentication, Firestore CRUD operations, analytics, themes, modals, notifications, and GitHub Pages deployment.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  {
    period: "June 2026",
    role: "Remote Web Development Intern",
    organization: "Qwetrum Technologies · Remote",
    description:
      "Built a REST Countries application, timed quiz, validated multi-step form with saved progress, mini e-commerce interface, and complete shopping capstone using responsive design, JavaScript ES6+, external APIs, localStorage, filtering, sorting, and cart management.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "REST APIs", "GitHub Pages"],
  },
  {
    period: "Ongoing",
    role: "Independent Software Developer",
    organization: "Self-Directed Project Development · Oman / Remote",
    description:
      "Design and build web and mobile applications using Flutter, Android Studio, React, Next.js, Flask, Python, and Firebase while integrating authentication, real-time data, REST APIs, automated email services, and AI-assisted development workflows.",
    tags: ["Flutter", "React", "Next.js", "Flask", "Firebase", "GitHub"],
  },
];

export const certificates = [
  {
    title: "Web Development Remote Internship",
    issuer: "Qwetrum Technologies",
    date: "June 2026",
    courses: "4-week internship",
    category: "Internship",
    skills: ["Responsive Web Development", "JavaScript", "APIs", "E-Commerce"],
    file: "/documents/Qwetrum-Web-Development-Internship.pdf",
  },
  {
    title: "IBM iOS & Android Mobile App Developer",
    issuer: "IBM Skills Network",
    date: "February 2026",
    courses: "14 courses",
    category: "Mobile",
    skills: ["Flutter", "Dart", "React Native", "Swift", "Mobile UI/UX"],
    file: "/documents/IBM-Mobile-App-Developer.pdf",
  },
  {
    title: "IBM AI Developer Professional Certificate",
    issuer: "IBM Skills Network",
    date: "January 2026",
    courses: "10 courses",
    category: "AI",
    skills: ["Generative AI", "Prompt Engineering", "Python", "Flask", "AI Applications"],
    file: "/documents/IBM-AI-Developer.pdf",
  },
  {
    title: "IBM Full Stack Software Developer",
    issuer: "IBM Skills Network",
    date: "June 2025",
    courses: "15 courses",
    category: "Full Stack",
    skills: ["React", "Node.js", "Django", "Flask", "Docker", "Kubernetes"],
    file: "/documents/IBM-Full-Stack-Developer.pdf",
  },
  {
    title: "Game Design and Development with Unity",
    issuer: "Michigan State University",
    date: "January 29, 2025",
    courses: "5 courses",
    category: "Game",
    skills: ["Unity", "C#", "2D Games", "3D Games", "Game Capstone"],
    file: "/documents/Game-Design-and-Development-with-Unity.pdf",
  },
  {
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google / Coursera",
    date: "July 22, 2024",
    courses: "3 courses",
    category: "Business Intelligence",
    skills: ["Data Models", "Data Pipelines", "Dashboards", "Reporting", "Stakeholder Insights"],
    file: "/documents/Google-Business-Intelligence.pdf",
  },
  {
    title: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "July 14, 2024",
    courses: "7 courses",
    category: "Data Analytics",
    skills: ["Python", "Statistics", "Regression", "Machine Learning", "Predictive Modelling"],
    file: "/documents/Google-Advanced-Data-Analytics.pdf",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    date: "September 14, 2023",
    courses: "8 courses",
    category: "Data Analytics",
    skills: ["Spreadsheets", "SQL", "Tableau", "R", "Data Visualisation"],
    file: "/documents/Google-Data-Analytics.pdf",
  },
];

export const contactLinks = {
  email: "abdullahmshafiq098@gmail.com",
  phone: "+968 92287421",
  whatsapp: "https://api.whatsapp.com/send?phone=96892287421",
  github: "https://github.com/GMAC1231",
  linkedin: "https://www.linkedin.com/in/abdullah-muhammad-30948623b/",
  itch: "https://abdullah0364.itch.io/",
};
