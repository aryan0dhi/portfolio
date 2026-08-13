export const profile = {
  name: "Aryan Dhillon",
  role: "Software Engineer",
  tagline: "I build software that moves information through complex systems.",
  disciplines: ["Embedded", "AI", "Infrastructure", "Full-stack"],
  school: "Purdue · Computer Engineering · '27",
  email: "adaryan55@gmail.com",
  phone: "913-915-0317",
  github: "https://github.com/aryan0dhi",
  githubHandle: "aryan0dhi",
  linkedin: "https://www.linkedin.com/in/aryan-dhillon",
  resume: "/Aryan-Dhillon-Resume.pdf",
  available: true,
  availableText: "Open to Work",
};

export type Project = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  dates: string;
  proves: string;
  status: string;
  role: string;
  impact: string;
  filters: string[];
  theme: "garmin" | "vaila" | "datamine" | "invest" | "beamrail";
  blurb: string;
  summary: string;
  highlights: string[];
  stack: string[];
  link?: { label: string; href: string };
  linkNote?: string;
  tagline?: string;
};

export const projects: Project[] = [
  {
    id: "garmin",
    index: "01",
    name: "Garmin",
    subtitle: "Software Engineering Intern · Olathe, KS",
    dates: "May 2026 – Present",
    proves: "Embedded",
    status: "Internship",
    role: "Embedded SWE intern",
    impact: "Production release support",
    filters: ["Embedded"],
    theme: "garmin",
    blurb:
      "Embedded C for TCAS I airborne collision-avoidance software, shipped to a production release.",
    summary:
      "Embedded C development for legacy TCAS I airborne traffic surveillance software, supporting production release.",
    highlights: [
      "Contributed to embedded C development for legacy TCAS I airborne traffic surveillance software supporting a production release.",
      "Implemented software changes, debugged issues, and executed module and system tests to verify traffic surveillance behavior.",
      "Updated requirements and reviewed code/test changes to keep requirements, implementation, verification, and documentation consistent.",
    ],
    stack: ["Embedded C", "Debugging", "Module testing", "System testing", "Verification", "Traceability"],
  },
  {
    id: "vaila",
    index: "02",
    name: "Vaila",
    subtitle: "AI social scheduling · Personal project",
    dates: "March 2026 – Present",
    proves: "Full-stack · AI · Infrastructure",
    status: "In development",
    role: "Founder / full-stack builder",
    impact: "Private calendar scheduling",
    filters: ["Full-Stack", "AI/ML", "Backend"],
    theme: "vaila",
    tagline: "Times that fit the plan, not just your calendar.",
    blurb:
      "A full-stack, AI-powered social scheduling app across web and iOS, with private calendar syncing.",
    summary:
      "A full-stack, AI-powered social scheduling app across web and iOS. Describe a plan in plain words; Vaila compares calendars privately and returns times that actually make sense.",
    highlights: [
      "Built a full-stack AI scheduling platform across React web, SwiftUI iOS, FastAPI, PostgreSQL, Redis, and cloud deployment infrastructure.",
      "Designed a hybrid scheduling engine combining deterministic calendar conflict detection with OpenAI-powered ranking for 1:1, guest, and group flows.",
      "Integrated Google Calendar, Outlook/Microsoft Graph, and Apple Calendar with OAuth, token refresh, availability syncing, and confirmed event creation.",
      "Improved backend scalability with Redis-backed ARQ workers, caching, PostgreSQL indexing, Alembic migrations, connection-pool tuning, and Sentry observability.",
    ],
    stack: ["React", "SwiftUI", "FastAPI", "PostgreSQL", "Redis", "OAuth", "OpenAI"],
    link: { label: "Visit vaila.dev", href: "https://vaila.dev" },
  },
  {
    id: "datamine",
    index: "03",
    name: "The Data Mine",
    subtitle: "John Deere Project · Data Science Researcher · West Lafayette, IN",
    dates: "August 2025 – May 2026",
    proves: "AI / ML",
    status: "Research",
    role: "Data science researcher",
    impact: "1,000+ time series",
    filters: ["AI/ML"],
    theme: "datamine",
    blurb:
      "LSTM demand forecasting across 1,000+ part-location time series for John Deere.",
    summary:
      "LSTM-based multivariate time-series forecasting for monthly replacement-part demand across 1,000+ part-location time series.",
    highlights: [
      "Developed an LSTM-based multivariate time-series forecasting model predicting monthly replacement-part demand across 1,000+ part-location series from 12-month historical sequences.",
      "Engineered features from historical demand and external economic indicators (Equipment Made, Manufacturers' Equipment Inventory, PPI Manufacturing) to improve accuracy.",
      "Evaluated probabilistic forecasts with RMSE, Mean Winkler Interval Score, and 90% prediction interval coverage; presented at the Data Mine Corporate Partners Symposium.",
    ],
    stack: ["Python", "TensorFlow/Keras", "Pandas", "NumPy", "scikit-learn", "Time-series"],
  },
  {
    id: "invest",
    index: "04",
    name: "Investment Analytics Platform",
    subtitle: "Personal project",
    dates: "March 2026",
    proves: "Data / Quant",
    status: "Personal project",
    role: "Solo builder",
    impact: "5 years market data",
    filters: ["AI/ML"],
    theme: "invest",
    blurb:
      "A modular backtesting engine for trading strategies over 5 years of market data.",
    summary:
      "An investment analytics and backtesting platform to simulate trading strategies on five years of historical market data.",
    highlights: [
      "Built an analytics and backtesting platform with a Streamlit frontend to simulate strategies on 5 years of historical OHLCV data from Yahoo Finance.",
      "Designed a modular backtesting engine supporting 3 configurable strategies with portfolio state management, buy-and-hold benchmarking, Sharpe ratio, max drawdown, and return analysis.",
      "Added risk controls including position sizing, stop-loss logic, regime filtering, and volatility filtering to evaluate performance across market conditions.",
    ],
    stack: ["Python", "Streamlit", "Pandas", "NumPy", "Backtesting"],
    link: {
      label: "View source",
      href: "https://github.com/aryan0dhi/investment-analytics-platform",
    },
  },
  {
    id: "beamrail",
    index: "05",
    name: "BEAMRail",
    subtitle: "Innovation Intern (Startup) · Remote",
    dates: "April 2025 – August 2025",
    proves: "Backend / Automation",
    status: "Internship",
    role: "Backend / automation intern",
    impact: "Report workflow automation",
    filters: ["Backend"],
    theme: "beamrail",
    blurb:
      "Backend and automation for BEAMRaiL — an AI search-warrant drafting platform built for law enforcement.",
    summary:
      "An innovation internship at BEAMRaiL — an AI platform that helps officers draft search warrants on the forms their courts already accept, and catch the gaps before a judge does. I built backend components, automation pipelines, and dashboard UX.",
    highlights: [
      "Developed backend application components and automation pipelines for ID scan processing and report workflows, reducing officer reporting time significantly.",
      "Redesigned the dashboard UI/UX to streamline report submission, audio logging, and data ingestion workflows.",
      "Participated in Agile sprints using Git/GitHub.",
    ],
    stack: ["Backend", "Automation", "Dashboard UI/UX", "Agile", "Git/GitHub"],
    link: { label: "Visit BEAMRail product site", href: "https://www.beamrail.com/" },
    linkNote:
      "Live product/company site for the warrant-drafting platform I supported with backend automation and dashboard workflow work.",
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  dates: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "Garmin",
    role: "Software Engineering Intern",
    location: "Olathe, KS",
    dates: "May 2026 – Present",
    points: [
      "Embedded C development for legacy TCAS I airborne traffic surveillance software supporting production release.",
      "Module and system testing, debugging, and requirements/verification/documentation consistency.",
    ],
  },
  {
    company: "The Data Mine (John Deere Project)",
    role: "Undergraduate Data Science Researcher",
    location: "West Lafayette, IN",
    dates: "August 2025 – May 2026",
    points: [
      "LSTM multivariate forecasting across 1,000+ part-location series; evaluated with RMSE, MWIS, and 90% interval coverage.",
      "Presented results at the Data Mine Corporate Partners Symposium.",
    ],
  },
  {
    company: "Handshake AI",
    role: "AI Trainer",
    location: "Remote",
    dates: "January 2026 – May 2026",
    points: [
      "Evaluated AI-generated image edits against prompt requirements for accuracy and visual consistency.",
      "Documented structured feedback on model failure cases to improve output reliability and prompt adherence.",
    ],
  },
  {
    company: "BEAMRail Solutions Group LLC",
    role: "Innovation Intern (Startup)",
    location: "Remote",
    dates: "April 2025 – August 2025",
    points: [
      "Built backend components and automation pipelines for ID scan processing and report workflows, cutting officer reporting time.",
      "Redesigned dashboard UI/UX for report submission, audio logging, and data ingestion; worked in Agile sprints with Git/GitHub.",
    ],
  },
];

export const skills = {
  Languages: ["C", "C++", "Python", "Java", "Swift", "SQL"],
  "Frameworks & Tools": [
    "React",
    "SwiftUI",
    "FastAPI",
    "Streamlit",
    "Git",
    "PostgreSQL",
    "Redis",
    "REST APIs",
    "OAuth",
  ],
  "Data & ML": ["Pandas", "NumPy", "scikit-learn", "TensorFlow/Keras"],
};

export const education = {
  school: "Purdue University",
  location: "West Lafayette, IN",
  degree: "B.S. Computer Engineering, Minor in Business Economics",
  graduation: "Expected May 2027",
  concentrations: "Software Engineering, AI/ML",
  coursework:
    "Data Structures & Algorithms, Artificial Intelligence, Object-Oriented Programming, Data Science, C/C++",
};

export const resume = {
  updated: "July 2026",
};

export const skillTiers = [
  {
    level: "Core",
    items: ["C", "C++", "Python", "React", "FastAPI", "PostgreSQL"],
  },
  {
    level: "Used in production",
    items: ["Embedded C", "SwiftUI", "Redis", "OAuth", "Pandas"],
  },
  {
    level: "Learning deeper",
    items: ["Distributed systems", "ML evaluation", "Verification", "AI infra"],
  },
];

export const testimonials = [
  {
    quote:
      "Aryan brings the rare mix of systems thinking and product taste: he can reason through low-level constraints and still care deeply about the user experience.",
    source: "Engineering mentor",
    context: "Project collaboration",
  },
  {
    quote:
      "He is strongest when the problem is ambiguous, technical, and cross-functional. He asks crisp questions, then turns the answers into working software.",
    source: "Technical collaborator",
    context: "Full-stack product work",
  },
];

export const nowItems = [
  {
    label: "Building",
    text: "Vaila's scheduling engine, iOS flow, and infrastructure reliability.",
  },
  {
    label: "Learning",
    text: "Better embedded verification habits, distributed systems patterns, and ML evaluation.",
  },
  {
    label: "Open to",
    text: "2026 software engineering internships across embedded, backend, AI infrastructure, and full-stack product work.",
  },
];
