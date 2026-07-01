// The four resumes the LLM chooses between for each role. Full text is embedded so the LLM
// has ground truth to work from (cover letters etc. must never invent skills or experience
// beyond what's here).
export const RESUMES = {
  support: {
    label: "Technical Support Resume",
    roles:
      "Technical Support Engineer, Support Engineer, Application/Product Support, QA Engineer",
    fitSignals: "Debugging, ticket triage, customer troubleshooting, technical documentation.",
    text: `DEMIAN SIMS
+1 (917) 459-4058 | demiansims@gmail.com | New York, NY, USA | linkedin.com/in/demiansims

Software engineer with hands-on customer and technical support experience. I bridge the gap
between customers and engineering: I can read the code, reproduce the bug, debug an API, and then
explain the fix in plain language a non-technical user understands. Comfortable owning the whole
loop from first ticket to resolution, with a track record of clear written communication,
documentation, and calm client-facing service under pressure.

PROFESSIONAL SUMMARY

Software Engineer (Contract) | NEC Laboratories America
Mar 2026 - May 2026 · Remote
- Shipped React / TypeScript UI improvements for an AI-driven enterprise product, partnering
  directly with designers and backend engineers to land new workflows.
- Diagnosed and fixed performance and reliability issues in production, translating technical
  constraints into changes non-technical stakeholders could sign off on.

Software Developer (Contract) | Avandar Labs
Jul 2025 - Oct 2025 · New York, NY
- Fixed state-management and reliability issues across core Data Explorer workflows, reducing UI
  bugs and regressions.
- Worked hand-in-hand with the founder to scope features and refine UX, then wrote tests and
  documentation so new engineers could onboard faster.
- Built a natural-language query layer so non-technical users could search and filter data
  without writing SQL, a direct win for end-user usability.

Meter Service Representative | National Grid
Nov 2024 - Mar 2025 · Brooklyn, NY
- Performed in-person service checks across NYC boroughs, logging data in real time with handheld
  software and escalating safety issues.
- Managed tight schedules and multiple service requests independently while keeping
  communication professional and calm.

Customer & Technical Support | Prius Kings
Apr 2024 - Nov 2024 · Brooklyn, NY
- Owned inbound calls, emails, and online inquiries, guiding customers from first question
  through completed service.
- Answered product and technical questions, addressed concerns, and provided timely follow-up to
  keep satisfaction high.
- Maintained detailed records in CRM and Office tools; coordinated with technicians and logistics
  to relay technical updates to customers.

Fullstack Software Engineer | Olivine, Inc.
Nov 2022 - Mar 2024 · Remote
- Shipped features across React, React Native, and Node for climate-risk analytics used by large
  industrial clients.
- Supported API integrations with Postman and improved QA guides, speeding up onboarding for
  engineers and support teams.
- Added strict typing to legacy code, cutting runtime errors and improving stability across core
  screens.

Frontend Software Engineer | RethinkFirst
Aug 2021 - Oct 2022 · Remote
- Co-built an internal Admin Portal (React + GraphQL) giving operations and client-success teams
  better visibility into key workflows.
- Partnered with design and PM to reduce friction in onboarding and data entry.

Software Engineer | CoFiMD
May 2021 - Aug 2021 · Remote
- Built full-stack features (React / Rails) for a healthcare billing platform; improved billing
  workflows, cutting support questions and duplicate submissions.

Software Engineer | TML Information Services
Sep 2019 - May 2020 · Westbury, NY
- Built React dashboards backed by Rails and AWS to process driving records from all 50 states.
- Reduced the bug backlog through tight collaboration with QA and support, and improved internal
  tooling reliability and documentation.

EARLIER BACKGROUND
Composer / Producer, The Music Playground (2015-2020): 11+ years delivering client work under
tight deadlines for startups, agencies, and national brands; strong client-facing communication
and revision handling.
Hospitality Professional, NYC fine dining (2008-2012): high-volume guest service and consultative
sales; consistently exceeded sales goals.

SKILLS
Technical: JavaScript / TypeScript, React, Node.js, REST APIs, GraphQL, SQL / Postgres, Postman,
Git & GitHub, Docker (basics), browser dev tools, log reading & debugging, AWS (basics)
Support & Tools: Zendesk, CRM systems, ticket triage, technical writing / documentation,
Confluence, JIRA, customer onboarding, QA & issue reproduction, software testing
Human: Clear written & verbal communication, de-escalation, empathy, cross-team collaboration,
working independently under deadline

EDUCATION
The Flatiron School - Bootcamp, Computer Science
University of Miami - Bachelor's, Music`,
  },
  solutions: {
    label: "Solutions Engineer Resume",
    roles:
      "Solutions Engineer, Sales Engineer, Technical Account Manager, Implementation or Onboarding Specialist",
    fitSignals:
      "Client-facing technical work, demos, onboarding, stakeholder translation, requirements gathering.",
    text: `DEMIAN SIMS
+1 (917) 459-4058 | demiansims@gmail.com | New York, NY, USA | linkedin.com/in/demiansims

Client-facing software engineer who translates business needs into working product. I've scoped
features directly with founders, walked non-technical stakeholders through technical tradeoffs,
and owned onboarding from kickoff to adoption. Comfortable running point on a client relationship
end to end: understanding the ask, building or configuring the solution, and making sure the
rollout sticks.

PROFESSIONAL SUMMARY

Software Engineer (Contract) | NEC Laboratories America
Mar 2026 - May 2026 · Remote
- Partnered directly with designers and backend engineers to scope and land new workflows for an
  AI-driven enterprise product.
- Translated production performance constraints into changes that non-technical stakeholders
  could understand and approve.

Software Developer (Contract) | Avandar Labs
Jul 2025 - Oct 2025 · New York, NY
- Worked hand-in-hand with the founder to scope features and refine UX, acting as the technical
  voice in product decisions.
- Built a natural-language query layer so non-technical, client-facing users could self-serve
  data without writing SQL, directly reducing support load.
- Wrote documentation and onboarding material that shortened ramp time for new engineers and
  stakeholders.

Customer & Technical Support | Prius Kings
Apr 2024 - Nov 2024 · Brooklyn, NY
- Acted as the trusted point of contact for customers end to end, from first inquiry through
  onboarding and service completion.
- Guided customers through available options, identifying upsell opportunities based on need and
  consistently contributing to service revenue.
- Coordinated with technicians and logistics teams to relay technical updates and keep
  installation schedules on track.

Fullstack Software Engineer | Olivine, Inc.
Nov 2022 - Mar 2024 · Remote
- Delivered features for climate-risk analytics clients, working across React, React Native, and
  Node for large industrial portfolios.
- Designed gamification workflows that increased user engagement and session completion, a
  direct product-adoption win.
- Improved QA guides and API integration support, speeding onboarding for engineering and support
  teams.

Frontend Software Engineer | RethinkFirst
Aug 2021 - Oct 2022 · Remote
- Co-built an internal Admin Portal (React + GraphQL) that gave operations and client-success
  teams direct visibility into key workflows.
- Worked with design and PM to refine user flows and reduce friction in client onboarding and
  data entry.

Software Engineer | CoFiMD
May 2021 - Aug 2021 · Remote
- Built full-stack features (React / Rails) for a healthcare billing platform, improving
  workflows clinicians relied on daily.
- Reduced support questions and duplicate submissions by simplifying key billing usability.

Software Engineer | TML Information Services
Sep 2019 - May 2020 · Westbury, NY
- Built React dashboards backed by Rails and AWS to process driving records from all 50 states
  for ops teams.
- Improved internal tooling reliability and documentation, giving ops teams faster turnaround on
  customer requests.

EARLIER BACKGROUND
Composer / Producer, The Music Playground (2015-2020): 11+ years managing direct client
relationships end to end, from creative brief through final delivery, for startups, agencies,
and national brands.
Hospitality Professional, NYC fine dining (2008-2012): consultative wine and beverage sales,
high-touch guest relationships, and off-site event coordination for high-profile clients.

SKILLS
Client-Facing: Requirements gathering, stakeholder communication, onboarding & implementation,
technical demos, consultative selling, account management, de-escalation
Technical: JavaScript / TypeScript, React, Node.js, REST APIs, GraphQL, SQL / Postgres, Postman,
Git & GitHub, AWS (basics), Docker (basics)
Tools: Zendesk, CRM systems, JIRA, Confluence, Excel / Sheets, technical documentation

EDUCATION
The Flatiron School - Bootcamp, Computer Science
University of Miami - Bachelor's, Music`,
  },
  sde: {
    label: "Fullstack SDE Resume",
    roles:
      "Software Engineer, Frontend Engineer, Fullstack Engineer, Backend Engineer, Software Solutions Engineer, Platform Engineer, Solutions Architect (when hands-on, not client-facing)",
    fitSignals:
      "Hands-on general software engineering: React/TypeScript, Node.js, containerization, CI/CD, backend services, systems and infra work. Use for roles focused on shipping engineering work, not client-facing outreach. Also use when a title says 'Solutions' but the role description is really asking for architecture and hands-on engineering.",
    text: `DEMIAN SIMS
+1 (917) 459-4058 | demiansims@gmail.com | Brooklyn, New York, NY, USA | LinkedIn | GitHub | Portfolio

PROFESSIONAL SUMMARY
Systems-aware full-stack engineer (5+ years) specializing in data-heavy React/TypeScript applications
where performance and correctness matter. I build the interface layer between complex backends (AI,
analytics, large datasets) and human users, review queues, validation workflows, in-browser
computation. Experienced in containerized service architecture, CI/CD pipeline design, and
Kubernetes-orchestrated deployments. Recently reduced million-row query times from minutes to
seconds using DuckDB-WASM for client-side aggregation.

PROFESSIONAL EXPERIENCE

NEC Laboratories America | Software Engineer (Contract)
March 2026 - May 2026 · Remote
- Built AI-assisted frontend workflows and review queues; designed clear system boundaries between
  the AI/MCP server layer and the React frontend, establishing inspectable data flow and component
  contracts at each integration point.
- Reduced UI friction in core enterprise workflows by simplifying state flows and eliminating
  redundant actions.
- Shipped production components with performance fixes that improved perceived responsiveness
  across large datasets.
- Partnered closely with backend and research teams to translate AI outputs into usable,
  inspectable UI patterns rather than black-box automation.
- Implemented new designs for a React Native mobile experience.
- Refined AI-assisted workflows using TypeScript for diff visualizations.

Avandar Labs | Software Developer (Contract)
July 2025 - October 2025 · New York, NY
- Architected the end-to-end data pipeline from heterogeneous sources (CSV, Google Sheets, Airtable)
  through AI-driven transformation to validated UI output, with explicit human-in-the-loop
  checkpoints preventing hallucinated results from reaching end users.
- Integrated DuckDB-WASM as a client-side compute layer, cutting data load times by 70% and
  enabling in-browser aggregation at scale across million-row datasets without server round-trips.
- Developed high-volume data interfaces using React and TanStack; reduced UI bug rates by 30%.
- Collaborated with cross-functional teams to optimize essential features, improving product launch
  processes and minimizing user-reported issues by 15%.
- Implemented new designs for a React Native mobile experience.
- Integrated Supabase for rapid backend development, utilizing real-time database capabilities to
  synchronize user state and enhance collaborative features across the platform.

Olivine, Inc | Software Engineer
November 2022 - March 2024 · Remote
- Migrated frontend services to Azure Kubernetes Service (AKS), orchestrating containerized
  deployments that enabled zero-downtime releases and horizontal scaling for high-traffic
  climate-risk analytics workloads.
- Established robust CI/CD pipelines within Azure DevOps, automating test, build, and deployment
  stages across environments to ensure confident continuous delivery and reduce release overhead.
- Drove development of high-performance React/TypeScript features for climate analytics, applying
  component architecture and render optimization strategies to maintain responsiveness under large
  industrial portfolio datasets.
- Engineered mobile user interfaces, increasing engagement by 30%; designed gamification workflows
  improving session completion rates and retention.
- Refined legacy codebases by implementing modern TypeScript patterns and rigorous unit testing,
  significantly reducing runtime errors and improving overall system stability for critical
  production features.
- Managed relational data integrity using PostgreSQL on Azure, optimizing query performance for
  complex analytical datasets and ensuring high availability for critical climate infrastructure.

RethinkFirst | Frontend Software Engineer
August 2021 - October 2022 · Remote
- Led the development of an internal Admin Portal using React, HTML, and CSS, enhancing visibility
  into workflows and increasing operational efficiency by 30%.
- Optimized GraphQL queries and implemented caching strategies, resulting in a 50% reduction in API
  response times, significantly improving app performance.
- Contributed to a shared TypeScript/React Native/React codebase, leveraging React Hook Forms to
  streamline form handling, which reduced development time by 25%.
- Enhanced accessibility features across core functionalities, reducing recurring support issues by
  40%, and improving overall user satisfaction.
- Collaborated with design and PM teams to refine user flows, leveraging CSS for improved
  aesthetics, thus reducing friction in onboarding processes.
- Leveraged MySQL for robust data storage and retrieval, streamlining backend operations and
  supporting scalable application growth through efficient schema design.

CoFiMd | Software Engineer
May 2021 - August 2021 · Remote
- Built full-stack features in Ruby on Rails for a healthcare billing platform used by clinicians.
- Improved usability of key billing workflows, reducing support questions and duplicate submissions.

TML Information Services | Software Engineer
September 2019 - May 2020 · Westbury, NY
- Built React dashboards backed by Rails and AWS for processing driving records from all 50 states.
- Normalized and standardized driving record data from 50 state DMVs, building ETL pipelines that
  reduced data inconsistencies by 80% and improved processing accuracy.
- Reduced bug backlog through tight collaboration with QA and support teams.
- Improved internal tooling reliability and documentation, giving ops teams faster turnaround on
  customer requests.
- Implemented DynamoDB for high-throughput data access patterns, significantly reducing latency for
  real-time record processing and improving overall system responsiveness.

SKILLS
Claude, HTML/CSS, JavaScript, TypeScript, React.js, React Native, Next.js, SQL, Ruby on Rails,
REST APIs, Agile, Redux, Testing, Tailwind, LangGraph, Zustand, TanStack, RTK, Docker

PORTFOLIO
Whim, NYC Local Events Aggregator: Built a normalized multi-source data pipeline in Next.js/
TypeScript pulling from Ticketmaster API, a Playwright-based Dice.fm scraper, NYC Parks Socrata,
and Songkick into one unified event feed. Used Drizzle ORM + Neon Postgres for storage and Mapbox
GL for geospatial event discovery.
Sprig, AI-Powered Mind Mapping App: Built an interactive mind-mapping tool with Next.js, Neon,
Drizzle, and React Flow, supporting three distinct LLM interaction modes (Manual, Suggest,
Autopilot). Designed a constrained 15-character node-label system with full concept text stored
separately, plus a DAG-based cross-link navigation layer for non-linear idea exploration.
DDIA RAG, Conversational Study Tool for "Designing Data-Intensive Applications": Built a full RAG
pipeline over the DDIA textbook using Next.js, pgvector (Neon), Drizzle ORM, and LlamaParse for
document ingestion, with LangGraph orchestrating the chat pipeline. Used TogetherAI (Llama 3.3 70B)
for embeddings and generation.

EDUCATION
The Flatiron School - Bootcamp, Computer Science
University of Miami - Bachelor's, Music`,
  },
  ai_sde: {
    label: "AI-Focused SDE Resume",
    roles:
      "AI Engineer, LLM Engineer, AI Frontend Engineer, AI Platform Engineer, RAG/Agentic Engineer, ML Engineer (applied)",
    fitSignals:
      "AI/LLM engineering: RAG pipelines, agentic systems, LLM integration, AI platform work, MCP servers, LLM-driven UI. Use when the role centers on building AI systems. Also use when a title says 'Research' or 'Solutions' but the described work is really applied AI/ML engineering.",
    text: `DEMIAN SIMS
+1 (917) 459-4058 | demiansims@gmail.com | Brooklyn, New York, NY, USA | LinkedIn | GitHub | Portfolio

DEVELOPER SUMMARY
Systems-aware full-stack engineer (5+ years) specializing in data-heavy React/TypeScript applications
where performance and correctness matter. I build the interface layer between complex backends (AI,
analytics, large datasets) and human users, review queues, validation workflows, in-browser
computation. Experienced in containerized service architecture, CI/CD pipeline design, and
Kubernetes-orchestrated deployments. Recently reduced million-row query times from minutes to
seconds using DuckDB-WASM for client-side aggregation.

PROFESSIONAL EXPERIENCE

NEC Laboratories America | AI Frontend Consultant (Contract)
March 2026 - May 2026 · Remote
- Brought in to surface Python ML/AI-driven MCP servers on the frontend, servers handling real-time
  task tracking, RAG cross-referencing, and LLM-powered fact-checking with next-step advisory.
- Designed clear API contracts and system boundaries between the MCP server layer and the React
  frontend, enabling modular, independently deployable AI pipeline components with inspectable data
  flow at each boundary.
- Implemented LLM-driven dynamic design tokens, color palettes and layout parameters generated at
  runtime based on model inference, rendered live in React/TypeScript.
- Translated opaque AI pipeline outputs into human-readable React interfaces: diff views, source
  panels, and validation queues, establishing a consistent output inspection pattern across the
  system.

Avandar Labs | Software Developer (Contract)
July 2025 - October 2025 · New York, NY
- Designed the end-to-end data pipeline architecture from heterogeneous sources (CSV, Google
  Sheets, Airtable) through LLM-driven natural language transformation to validated, curated UI
  output, with explicit review stages preventing hallucinated results from reaching end users.
- Integrated DuckDB-WASM for in-browser analytics, architecting a client-side compute layer that
  cut data load times by 70% and enabled aggregation at scale across million-row datasets without
  server round-trips.
- Implemented human-in-the-loop validation checkpoints as first-class architectural components in
  the AI output pipeline.

Olivine, Inc | Software Engineer
November 2022 - March 2024 · Remote
- Containerized and orchestrated frontend services using Docker and Kubernetes (EKS), enabling
  zero-downtime deployments and horizontal scaling for high-traffic climate-risk analytics
  workloads.
- Established and maintained CI/CD pipelines automating test, build, and deployment stages across
  staging and production environments, reducing release friction and enabling confident continuous
  delivery.
- Engineered React Native interfaces that increased user engagement 30%; designed gamification
  workflows improving session completion rates and retention.
- Eliminated runtime errors across core screens by migrating legacy JavaScript to TypeScript.
- Built high-performance React/TypeScript features for large industrial portfolio datasets,
  applying component architecture and render optimization strategies to hold responsiveness as a
  first-class constraint.
- Leveraged Claude and Cursor to accelerate development cycles, automating boilerplate generation
  and debugging complex React/TypeScript issues.

RethinkFirst | Frontend Software Engineer
August 2021 - October 2022 · Remote
- Led Admin Portal build in React; optimized GraphQL queries and caching strategies resulting in
  50% reduction in API response times.
- Enhanced accessibility features reducing recurring support issues by 40%.

PORTFOLIO
Whim, NYC Local Events Aggregator: Built a normalized multi-source data pipeline in Next.js/
TypeScript pulling from Ticketmaster API, a Playwright-based Dice.fm scraper, NYC Parks Socrata,
and Songkick into one unified event feed. Used Drizzle ORM + Neon Postgres for storage and Mapbox
GL for geospatial event discovery.
Sprig, AI-Powered Mind Mapping App: Built an interactive mind-mapping tool with Next.js, Neon,
Drizzle, and React Flow, supporting three distinct LLM interaction modes (Manual, Suggest,
Autopilot). Designed a constrained 15-character node-label system plus a DAG-based cross-link
navigation layer for non-linear idea exploration.
DDIA RAG, Conversational Study Tool for "Designing Data-Intensive Applications": Built a full RAG
pipeline over the DDIA textbook using Next.js, pgvector (Neon), Drizzle ORM, and LlamaParse for
document ingestion, with LangGraph orchestrating the chat pipeline. Used TogetherAI (Llama 3.3
70B) for embeddings and generation, enabling conversational Q&A. Diagnosed and resolved real
data-quality failures post-launch, driving a move from naive to deterministic chunking.

SKILLS
Claude, Cursor, HTML/CSS, TypeScript, LangGraph, React.js, React Native, Next.js, Node.js, SQL,
Redux, Zustand, Ruby on Rails, Testing, Accessibility, Tailwind, RAG, DevOps, CI/CD, REST APIs,
GraphQL, Docker, AWS, Agile

EDUCATION
The Flatiron School - Bootcamp, Computer Science
University of Miami - Bachelor's, Music`,
  },
} as const;

export type ResumeKey = keyof typeof RESUMES;

export function resumeOptionsSummary(): string {
  return Object.entries(RESUMES)
    .map(
      ([key, r]) =>
        `"${key}" (${r.label}). Target roles: ${r.roles}. Strongest fit signals: ${r.fitSignals}\n\nFull resume text:\n${r.text}`,
    )
    .join("\n\n---\n\n");
}
