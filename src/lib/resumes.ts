// The two resumes the LLM chooses between for each role. Full text is embedded so the LLM
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
