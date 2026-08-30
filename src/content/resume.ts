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
    'embedded systems',
    'distributed systems',
    'machine learning',
    'full-stack development',
  ],
  lede:
    'I’m a Computer Engineering student at Purdue building software across embedded systems, distributed systems, machine learning, and full-stack development.',
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
  // Positioning line for the title spread — recruiting status, editable here.
  status: 'Open to new-grad roles',
  thesis: ['Hi, I’m Aryan.', 'I’m a software engineer.'],
} as const;

/* Title-spread contents — the four anchor works, in reading order.
   Sourced from the sections below so the index never drifts from them. */
export const worksIndex = [
  { no: '01', id: 'vaila', name: 'Vaila', discipline: 'Product · Founder', period: '2026' },
  { no: '02', id: 'garmin', name: 'Garmin', discipline: 'Embedded · DO-178B', period: '2026' },
  {
    no: '03',
    id: 'kv-store',
    name: 'Distributed KV Store',
    discipline: 'Systems · Java',
    period: '2026',
  },
  {
    no: '04',
    id: 'forecasting',
    name: 'Demand Forecasting',
    discipline: 'Applied ML · John Deere',
    period: '2025',
  },
] as const;

export const contact = {
  email: 'adaryan55@gmail.com',
  phone: '913-915-0317',
  github: 'https://github.com/aryan0dhi',
  githubLabel: 'github.com/aryan0dhi',
  linkedin: 'https://www.linkedin.com/in/aryan-dhillon',
  linkedinLabel: 'in/aryan-dhillon',
  resume: '/Aryan-Dhillon-Resume.pdf',
  timezone: 'West Lafayette, IN · ET',
  // 30-minute call booking link. Swap for a real Vaila / Cal.com / Calendly
  // booking page; until then the button falls back to an email request.
  scheduleUrl: 'https://vaila.dev',
  scheduleLabel: 'schedule a 30-min call',
  // Short stack line for the contact rail.
  stack: 'C · Python · Swift · TypeScript',
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
    'An AI scheduling platform for iOS, founded and built independently. SwiftUI and React on the surface; FastAPI, PostgreSQL, and Redis underneath. Prepared for App Store launch.',
  pillars: [
    {
      label: 'The engine',
      body:
        'A hybrid scheduling engine that pairs deterministic calendar conflict detection with OpenAI-powered ranking, across 1:1, guest, and group scheduling.',
    },
    {
      label: 'The integrations',
      body:
        'Google Calendar, Outlook / Microsoft Graph, and Apple Calendar over OAuth, with token refresh, availability syncing, provider entitlements, and confirmed event creation.',
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
  period: 'August 2026',
  kicker: 'Systems depth',
  repo: 'https://github.com/aryan0dhi/distributed-kv-store',
  repoLabel: 'github.com/aryan0dhi/distributed-kv-store',
  headline: 'Built from the hash table up.',
  summary:
    'A distributed key-value store written from primitives. A non-blocking server speaking the RESP protocol, a custom hash table, consistent-hash sharding, and a crash-safe write-ahead log. Zero dependencies: JDK 17 and javac only.',
  // The motivation, and it points back at the Vaila section above.
  why:
    'Vaila runs its background job workers on Redis. Using it was easy; explaining it wasn\u2019t \u2014 I couldn\u2019t have said how it stores a key, what happens to the data if the process dies, or what sharding it across machines would take. So I built one and found out.',
  // The request data path — the shape of the system, stage by stage.
  flow: [
    {
      name: 'Client',
      core: false,
      detail:
        'redis-cli and redis-benchmark drive it unmodified. RESP2 is verified against the real Redis 8 clients.',
    },
    {
      name: 'Java NIO server',
      core: false,
      detail:
        'Several non-blocking java.nio event loops, each owning its connections for life: no thread-per-connection, and no locking on connection state.',
    },
    {
      name: 'RESP parser',
      core: false,
      detail:
        'Incremental Redis wire-protocol parser; CONFIG GET and HELLO answered so real tooling negotiates cleanly.',
    },
    {
      name: 'Hash table',
      core: true,
      detail:
        'A hand-written open-addressing table with SipHash-keyed hashing. A lookup settles in about 1.4 probes on average.',
    },
    {
      name: 'Write-ahead log',
      core: false,
      detail:
        'Writes hit a group-committed WAL before acknowledgement; a cold start replays 1.9M records/sec.',
    },
  ],
  // Primary evidence: the 32-client throughput benchmark and its latencies.
  benchmark: {
    value: '65K',
    unit: 'ops/sec',
    context:
      'Sustained across 32 concurrent clients, unpipelined request/response, measured on an M2 over loopback.',
    p50: '480µs',
    p99: '656µs',
  },
  // Why the implementation is interesting — figures sit in open space.
  implementation: [
    {
      figure: '28.1%',
      note: 'of keys move when the ring grows from 3 to 4 nodes under consistent hashing with 160 virtual nodes each, against ~75% for a plain hash-mod-N.',
    },
    {
      figure: 'p50 · p99 · p99.9',
      note: 'read straight from fixed-memory latency histograms and LongAdder counters: a lock-free, zero-allocation metrics path.',
    },
    {
      figure: '895K ops/sec',
      note: 'served once pipelining removes the round trip, measured by redis-benchmark. The unpipelined ceiling above is the network, not the store.',
    },
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
    'Monthly replacement-part demand across more than a thousand part-location series, evaluated as a probabilistic forecast rather than a single number, and presented to the corporate partner.',
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
      'A modular backtesting engine over five years of historical OHLCV data: three configurable strategies, portfolio state management, buy-and-hold benchmarking, Sharpe ratio and max drawdown analysis, with position sizing, stop-loss, regime and volatility filters.',
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
