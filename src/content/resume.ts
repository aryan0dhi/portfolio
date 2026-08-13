/**
 * Single source of truth for all site copy.
 *
 * Every factual claim here is supported by the résumé at
 * public/Aryan-Dhillon-Resume.pdf (Aug 2026). Nothing is embellished:
 *  - BEAMRail's impact stays qualitative ("significantly") — no invented %.
 *  - The John Deere work names its evaluation metrics but no values,
 *    because the résumé reports none.
 *  - Vaila is "prepared for App Store launch", never "launched".
 *    No user counts, downloads, revenue, or ratings anywhere.
 */

export const profile = {
  name: 'Aryan Dhillon',
  role: 'Software Engineer',
  disciplines: [
    'embedded firmware',
    'distributed systems',
    'applied machine learning',
    'full-stack product',
  ],
  lede:
    'I work across embedded firmware, distributed systems, applied machine learning, and full-stack product — and go deep at each.',
  school: 'Purdue University',
  degree: 'BS Computer Engineering, minor in Business Economics',
  location: 'West Lafayette, IN',
  graduation: 'May 2027',
  gpa: '3.51 / 4.00',
  concentrations: ['Software Engineering', 'AI/ML'],
  coursework: [
    'Data Structures & Algorithms',
    'Artificial Intelligence',
    'Object-Oriented Programming',
    'Data Science',
    'C/C++',
  ],
} as const;

export const contact = {
  email: 'adaryan55@gmail.com',
  phone: '913-915-0317',
  github: 'https://github.com/aryan0dhi',
  githubLabel: 'github.com/aryan0dhi',
  linkedin: 'https://www.linkedin.com/in/aryan-dhillon',
  resume: '/Aryan-Dhillon-Resume.pdf',
} as const;

/* ---------------------------------------------------------------- */
/* Anchor 1 — Vaila. Product energy, layered treatment.              */
/* ---------------------------------------------------------------- */

export const vaila = {
  id: 'vaila',
  name: 'Vaila',
  role: 'Founder & CEO',
  period: 'March 2026 — Present',
  url: 'https://vaila.dev',
  urlLabel: 'vaila.dev',
  kicker: 'Product, end to end',
  headline: 'One person, every layer of a real product.',
  summary:
    'An AI scheduling platform for iOS, founded and built independently — SwiftUI and React on the surface, FastAPI, PostgreSQL, and Redis underneath, and prepared for App Store launch.',
  pillars: [
    {
      label: 'The engine',
      body:
        'A hybrid scheduling engine that pairs deterministic calendar conflict detection with OpenAI-powered ranking, across 1:1, guest, and group scheduling.',
    },
    {
      label: 'The integrations',
      body:
        'Google Calendar, Outlook / Microsoft Graph, and Apple Calendar over OAuth — token refresh, availability syncing, provider entitlements, and confirmed event creation.',
    },
    {
      label: 'The infrastructure',
      body:
        'Redis-backed workers, PostgreSQL indexing, database migrations, connection-pool tuning, job tracking, and Sentry observability.',
    },
  ],
  stack: ['SwiftUI', 'React', 'FastAPI', 'PostgreSQL', 'Redis'],
} as const;

/* ---------------------------------------------------------------- */
/* Anchor 2 — Garmin. Rigor, shown as a verification sequence.       */
/* ---------------------------------------------------------------- */

export const garmin = {
  id: 'garmin',
  name: 'Garmin',
  role: 'Software Engineering Intern',
  location: 'Olathe, KS',
  period: 'May 2026 — August 2026',
  kicker: 'Engineering under certification',
  headline: 'Eight changes, each one proven four times over.',
  summary:
    'Software written inside a formal certification process, where nothing ships on the strength of the author’s own confidence.',
  count: '8',
  countLabel: 'Formal change requests closed',
  programme: 'DO-178B airborne software certification · GTS 8x0 v5.03 · 2026 release',
  stages: [
    { n: '01', name: 'Requirements', body: 'Written and traced before implementation begins.' },
    { n: '02', name: 'Embedded C', body: 'Implementation against a certified baseline.' },
    { n: '03', name: 'Test updates', body: 'Verification revised in step with the change.' },
    { n: '04', name: 'Independent review', body: 'Someone other than the author has to agree it holds.' },
  ],
  also: [
    'Contributed to TCAS mode synchronization, ADS-B In status validation, and traffic system self-test improvements across multiple libraries and codebases.',
    'Updated the X-Plane traffic simulation plugin to support new aircraft simulation models, validating surveillance behavior through generated flight tracks.',
  ],
} as const;

/* ---------------------------------------------------------------- */
/* Depth proof 1 — KV store. Numbers lead.                           */
/* ---------------------------------------------------------------- */

export const kvStore = {
  id: 'kv-store',
  name: 'Distributed Key-Value Store',
  role: 'Java',
  period: 'February 2026',
  kicker: 'Systems depth',
  headline: 'Built from the hash table up.',
  summary:
    'A distributed key-value store written from primitives — custom hash table, consistent-hash sharding, crash-safe persistence, and a non-blocking server speaking the RESP protocol.',
  headlineFigure: { value: '1.9M', unit: 'WAL records/sec', label: 'Recovered on restart' },
  measurements: [
    { metric: 'Average probes per lookup, open-addressing hash table', value: '1.37' },
    { metric: 'Sustained throughput, 32 concurrent clients', value: '65K ops/sec' },
    { metric: 'Virtual nodes per node, consistent-hash ring', value: '160' },
    { metric: 'Write-ahead log recovery on restart, with group commit', value: '1.9M rec/sec' },
  ],
  notes: [
    'Non-blocking concurrent TCP server built on java.nio, implementing the RESP protocol.',
    'Lock-free, zero-allocation metrics pipeline — LongAdder counters and fixed-memory latency histograms exposing p50, p99, and p99.9.',
  ],
} as const;

/* ---------------------------------------------------------------- */
/* Depth proof 2 — John Deere. Method, deliberately not numbers.     */
/* ---------------------------------------------------------------- */

export const johnDeere = {
  id: 'forecasting',
  name: 'Demand Forecasting',
  org: 'The Data Mine · John Deere',
  role: 'Undergraduate Data Science Researcher',
  location: 'West Lafayette, IN',
  period: 'August 2025 — May 2026',
  kicker: 'Applied machine learning',
  headline: 'Forecasts that report their own uncertainty.',
  summary:
    'Monthly replacement-part demand across more than a thousand part-location series — evaluated as a probabilistic forecast rather than a single number, and presented to the corporate partner.',
  method: [
    { n: '01', name: 'Series', body: '1,000+ part-location time series.' },
    { n: '02', name: 'Sequences', body: '12-month historical demand windows.' },
    { n: '03', name: 'Features', body: 'Equipment Made, Manufacturers’ Equipment Inventory, PPI Manufacturing.' },
    { n: '04', name: 'Model', body: 'LSTM-based multivariate forecaster.' },
    { n: '05', name: 'Evaluation', body: 'RMSE, Mean Winkler Interval Score, 90% prediction interval coverage.' },
  ],
  outcome: 'Results presented at the Data Mine Corporate Partners Symposium.',
} as const;

/* ---------------------------------------------------------------- */
/* Supporting — compact, visibly lighter.                            */
/* ---------------------------------------------------------------- */

export const supporting = [
  {
    id: 'beamrail',
    name: 'BEAMRail Solutions Group',
    role: 'Innovation Intern',
    period: 'April 2025 — August 2025',
    meta: 'Startup · Remote',
    body:
      'Backend application components and automation pipelines for ID scan processing and report workflows, significantly reducing officer reporting time. Redesigned the dashboard UI/UX around report submission, audio logging, and data ingestion.',
  },
  {
    id: 'investment-analytics',
    name: 'Investment Analytics Platform',
    role: 'Python',
    period: 'September 2025',
    meta: 'Streamlit · Yahoo Finance',
    body:
      'A modular backtesting engine over five years of historical OHLCV data — three configurable strategies, portfolio state management, buy-and-hold benchmarking, Sharpe ratio and max drawdown analysis, with position sizing, stop-loss, regime and volatility filters.',
  },
] as const;

export const footnote = {
  name: 'Handshake AI',
  role: 'AI Trainer',
  period: 'January 2026 — May 2026',
  body:
    'Evaluated AI-generated image edits against prompt requirements and documented model failure cases.',
} as const;

/* ---------------------------------------------------------------- */
/* Capabilities — grouped by engineering function, not alphabet soup */
/* ---------------------------------------------------------------- */

export const capabilities = [
  { group: 'Embedded & Systems', items: ['C', 'C++', 'Java', 'Concurrency', 'java.nio'] },
  {
    group: 'Backend & Infrastructure',
    items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'REST APIs', 'OAuth', 'SQL'],
  },
  { group: 'AI & Data', items: ['TensorFlow / Keras', 'scikit-learn', 'Pandas', 'NumPy'] },
  { group: 'Product & Interface', items: ['React', 'SwiftUI', 'Swift', 'Streamlit', 'Git'] },
] as const;

/* ---------------------------------------------------------------- */

export const navSections = [
  { id: 'vaila', label: 'Vaila' },
  { id: 'garmin', label: 'Garmin' },
  { id: 'kv-store', label: 'Systems' },
  { id: 'forecasting', label: 'Forecasting' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'contact', label: 'Contact' },
] as const;
