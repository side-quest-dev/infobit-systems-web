import type { Service, Problem, Industry, Engagement, FaqItem, Metric, NavItem, ProcessStep, Value, ExperienceEntry, ContactSignal } from '@/types'

export const siteConfig = {
    name: 'InfoBit Systems',
    tagline: 'Platform Engineering for High-Traffic Products',
    description:
        'Senior platform engineering consultancy focused on high-traffic systems, backend architecture and cloud-native infrastructure. Java · Spring Boot · Microservices · Kubernetes.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://infobit.systems',
    email: 'contact@infobit.systems',
    linkedin: 'https://linkedin.com/company/infobitsystems',
    github: 'https://github.com/side-quest-dev',
    x: 'https://x.com/infobitsystems',

    // ── SEO defaults ─────────────────────────────────────────────────────────
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'InfoBit Systems',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@infobitsystems',
    },

    // ── Navigation ───────────────────────────────────────────────────────────
    nav: [
        { label: 'Solutions', href: '/#problems' },
        { label: 'Services', href: '/services' },
        { label: 'Expertise', href: '/#expertise' },
        { label: 'About', href: '/about' },
    ] satisfies NavItem[],

    // ── Trust metrics ────────────────────────────────────────────────────────
    metrics: [
        { value: '15+', label: 'Years engineering experience' },
        { value: 'Production', label: 'Systems running for years' },
        { value: '50M+', label: 'Transactions processed' },
        { value: '99.9%', label: 'Uptime track record' },
        { value: '24/7', label: 'Infrastructure support' },
    ] satisfies Metric[],

    // ── Services ─────────────────────────────────────────────────────────────
    services: [
        {
            slug: 'platform-architecture',
            title: 'Platform Architecture',
            shortDesc: 'Designing scalable system architectures for high-traffic products. Built for growth from day one.',
            description: 'We design backend system architectures that handle real traffic — from domain modeling and service boundaries to data flows and infrastructure topology. Architecture decisions define your ceiling for years. We get them right the first time.',
            icon: 'layers',
            color: 'blue',
            highlights: [
                'System design and domain modeling',
                'Service decomposition and boundaries',
                'Data architecture and flow design',
                'Scalability and reliability planning',
                'Technical documentation and ADRs',
            ],
            manifesto: "Architecture decisions made in week one define your system's ceiling for years. A wrong service boundary, a poorly chosen data model, a monolith where distribution was needed — these compound. We treat architecture as a strategic engineering discipline, not a whiteboard exercise.",
            when: [
                'Building a new platform from scratch',
                'Current architecture is limiting product velocity',
                'Scaling a monolith and need a migration strategy',
                'External technical review before a major investment',
                'Team needs documented architecture decisions',
            ],
        },
        {
            slug: 'backend-development',
            title: 'Backend Development',
            shortDesc: 'Building reliable backend services with Java, Spring Boot and modern microservices.',
            description: 'Production-grade backend engineering with Java and Spring Boot at its core. We build high-concurrency APIs, event-driven microservices, and complex business logic for platforms where correctness and performance are non-negotiable.',
            icon: 'cpu',
            color: 'blue',
            highlights: [
                'Java / Spring Boot microservices',
                'High-concurrency REST and GraphQL APIs',
                'Event-driven architecture with Kafka',
                'Domain-driven design and CQRS',
                'Code review and engineering standards',
            ],
            manifesto: 'Backend systems that handle real traffic are not built the same way as standard CRUD applications. High concurrency, data consistency, failure isolation, event ordering — these require experience that most teams build only after their first production incident.',
            when: [
                'Need senior Java / Spring Boot engineering capacity',
                'Building event-driven microservices with Kafka',
                'Existing APIs are too slow or fragile under load',
                'Complex business logic needs reliable implementation',
                'Engineering standards and code quality need establishing',
            ],
        },
        {
            slug: 'cloud-infrastructure',
            title: 'Cloud Infrastructure',
            shortDesc: 'Deploying and scaling platforms on AWS and GCP using Kubernetes and automated pipelines.',
            description: 'Cloud-native infrastructure that scales with your product. From Kubernetes cluster design to CI/CD automation and observability — we build the infrastructure layer that lets your team ship with confidence.',
            icon: 'cloud',
            color: 'teal',
            highlights: [
                'Kubernetes cluster design and management',
                'AWS and GCP multi-cloud strategy',
                'Terraform infrastructure-as-code',
                'CI/CD pipelines and GitOps',
                'Monitoring, alerting and observability',
            ],
            manifesto: 'Cloud infrastructure is not DevOps checkbox work. Done well, it enables zero-downtime deployments, automatic scaling, and full system observability. Done poorly, it becomes the reason your platform goes down at 3am.',
            when: [
                'Migrating from on-premise or basic hosting to cloud-native',
                'Kubernetes setup needs redesign or optimization',
                'Need infrastructure-as-code and automated pipelines',
                'Monitoring and alerting is insufficient for production',
                'Infrastructure costs growing faster than business value',
            ],
        },
        {
            slug: 'system-optimization',
            title: 'System Optimization',
            shortDesc: 'Fixing performance bottlenecks in systems already running in production.',
            description: 'Systematic performance engineering for production systems under real load. We profile, identify bottlenecks, tune databases and redesign architecture where needed — without disrupting business operations.',
            icon: 'activity',
            color: 'teal',
            highlights: [
                'Production performance profiling',
                'Database query optimization',
                'Caching strategy and implementation',
                'Infrastructure cost optimization',
                'Architecture bottleneck elimination',
            ],
            manifesto: 'Performance problems in production are rarely simple. They involve the interaction between application code, database queries, caching behavior, infrastructure sizing and network latency. Fixing them requires systematic profiling, not guesswork.',
            when: [
                'API response times degrading as data volume grows',
                'Database queries becoming a bottleneck',
                'Infrastructure costs higher than expected',
                'Latency spikes under peak traffic',
                'Performance audit needed before a major launch',
            ],
        },
    ] satisfies Service[],

    // ── Problems ─────────────────────────────────────────────────────────────
    problems: [
        {
            q: "Platform can't handle growing traffic?",
            a: "We design scalable backend architectures and cloud infrastructure built for high concurrency — before you hit the ceiling, not after.",
            icon: 'trending-up',
        },
        {
            q: "Stuck with a legacy system that's too risky to change?",
            a: "We modernize legacy platforms using gradual migration strategies — no big bang rewrites, no business disruption.",
            icon: 'archive',
        },
        {
            q: "Performance degrading as data volumes grow?",
            a: "System profiling, backend architecture review, query optimization and capacity planning for high-throughput workloads.",
            icon: 'alert-circle',
        },
        {
            q: "Building a new platform from scratch?",
            a: "From system architecture design to production deployment. We set the foundations that scale for years without costly rebuilds.",
            icon: 'layers',
        },
        {
            q: "Architecture slowing down your product development?",
            a: "Wrong architecture decisions compound fast. We audit existing systems and redesign for velocity — so your team ships features, not hotfixes.",
            icon: 'zap',
        },
    ] satisfies Problem[],

    // ── Industries ───────────────────────────────────────────────────────────
    industries: [
        {
            title: 'Gaming & Sports Betting',
            desc: 'High-throughput event processing, real-time odds engines, live data pipelines and scalable wagering infrastructure.',
            icon: 'monitor',
        },
        {
            title: 'Fintech & Payments',
            desc: 'Transaction processing, payment infrastructure, fraud detection systems and regulatory-compliant backend platforms.',
            icon: 'credit-card',
        },
        {
            title: 'Enterprise SaaS',
            desc: 'Multi-tenant platforms, workflow automation, B2B integrations and complex domain modeling for large organizations.',
            icon: 'building',
        },
        {
            title: 'Data Platforms',
            desc: 'Real-time streaming, event-driven data pipelines, analytical platforms and high-volume transactional systems.',
            icon: 'database',
        },
        {
            title: 'Marketplaces',
            desc: 'Inventory management, search infrastructure, recommendation engines and order processing at high volume.',
            icon: 'shopping-cart',
        },
        {
            title: 'High-transaction Platforms',
            desc: 'Systems processing large transaction volumes with strict latency, consistency and reliability requirements.',
            icon: 'dollar-sign',
        },
    ] satisfies Industry[],

    // ── Engagement models ────────────────────────────────────────────────────
    engagements: [
        {
            badge: 'Consulting',
            title: 'Architecture Consulting',
            desc: 'Short engagements focused on system design, technical audits and platform strategy. Ideal when you need expert input without committing to full delivery.',
            items: [
                'Scalable system architecture design',
                'Technical audit and risk assessment',
                'Cloud infrastructure planning',
                'Documentation and team handoff',
            ],
        },
        {
            badge: 'Partnership',
            title: 'Development Partnership',
            desc: 'Working with your team to build or scale backend platforms. We embed as senior engineers — driving architecture and delivery alongside your team.',
            items: [
                'Architecture decisions and code review',
                'Senior engineering alongside your team',
                'Performance and scalability strategy',
                'Technology stack guidance',
            ],
        },
        {
            badge: 'Long-term',
            title: 'Engineering Support',
            desc: 'Helping maintain and evolve complex production systems over time. Ongoing operations, performance tuning and proactive scaling as you grow.',
            items: [
                '24/7 infrastructure monitoring',
                'Incident response and on-call support',
                'Continuous performance optimization',
                'System evolution and scaling',
            ],
        },
    ] satisfies Engagement[],

    // ── Hero tech stack pills ────────────────────────────────────────────────
    techStack: ['Java', 'Spring Boot', 'Microservices', 'Kafka', 'React', 'Kubernetes', 'Cloud Infrastructure'],

    // ── Expertise groups ─────────────────────────────────────────────────────
    expertiseGroups: [
        { tag: 'Backend', items: ['Java · Spring Boot', 'Microservices architecture', 'Event-driven systems', 'REST & GraphQL APIs', 'Node.js · Python'] },
        { tag: 'Frontend', items: ['React · Next.js', 'TypeScript', 'Progressive Web Apps', 'Component design systems'] },
        { tag: 'Infrastructure', items: ['Kubernetes · Docker', 'AWS · GCP', 'Terraform / IaC', 'CI/CD pipelines', 'Monitoring & observability'] },
        { tag: 'Data & Messaging', items: ['Apache Kafka', 'PostgreSQL · MySQL', 'Redis · Elasticsearch', 'MongoDB', 'Data pipelines & ETL'] },
    ],

    // ── Manifesto items ──────────────────────────────────────────────────────
    manifestoItems: [
        { label: 'The cost of wrong backend decisions', text: "Architecture decisions compound. A data model chosen in week one, a service boundary drawn under deadline pressure, a caching strategy that works at 1k users — these become the constraints that define your system's ceiling. Most companies don't realize this until the ceiling is already limiting growth." },
        { label: 'Technical debt is a rate of interest', text: "Shortcuts taken early don't disappear — they accrue. Every feature built on a fragile foundation costs more than the last. The teams that contact us are usually paying that interest: slower delivery, higher infrastructure cost, increased operational risk." },
        { label: 'Our approach', text: 'We design systems with the failure modes in mind — the traffic spikes, the data volume growth, the integration complexity that arrives at scale. Not because we\'re pessimistic, but because production reality rewards systems that were built for it.' },
    ],

    // ── Problems — wide card bullets ─────────────────────────────────────────
    problemsBullets: [
        'High-traffic platforms handling millions of events per day',
        'Complex backend architectures with demanding reliability requirements',
        'Distributed cloud infrastructure built for real-world scale',
        'Mission-critical systems where downtime directly impacts revenue',
    ],

    // ── Process steps ────────────────────────────────────────────────────────
    processSteps: [
        { n: '1', title: 'Discovery', desc: 'Understanding your system, constraints and architecture challenges before writing a line of code.' },
        { n: '2', title: 'Architecture', desc: 'System design documented and reviewed with your team. Risks identified and addressed early.' },
        { n: '3', title: 'Development', desc: 'Agile delivery with weekly demos. Real progress visible every week, not every quarter.' },
        { n: '4', title: 'Deployment', desc: 'Zero-downtime launch, full monitoring from day one. We stay on post-launch.' },
    ] satisfies ProcessStep[],

    // ── About — values ───────────────────────────────────────────────────────
    values: [
        { icon: 'users', title: 'Senior engineers only', desc: 'No juniors on your project. Every engineer has direct production experience with high-traffic, complex backend systems. You get the same people from kick-off to delivery.' },
        { icon: 'layers', title: 'Architecture before implementation', desc: 'Every engagement starts with system design, not code. We document architecture decisions, review with your team, and identify risks before writing the first line.' },
        { icon: 'activity', title: 'Production-proven thinking', desc: "We've seen platforms fail at scale — not in theory, but in production. We design systems accounting for failure modes that only become visible under real traffic." },
        { icon: 'check', title: 'Long-term responsibility', desc: "We build systems we're prepared to operate and support. Retainer options available for ongoing infrastructure support, performance tuning and platform evolution." },
        { icon: 'shield', title: 'Reliability by design', desc: 'Backend systems architected to survive traffic spikes, infrastructure failures and unexpected scale — not patched when issues arise.' },
        { icon: 'message', title: 'Transparent collaboration', desc: 'Weekly progress updates. Architecture decisions documented. No surprises. You always know exactly where your project stands and why every decision was made.' },
    ] satisfies Value[],

    // ── About — experience entries ────────────────────────────────────────────
    aboutExperience: [
        { title: 'Gaming & Sports Betting', desc: 'Real-time event systems, high-volume wagering platforms, odds processing engines and ticket settlement infrastructure.' },
        { title: 'Fintech & Payments', desc: 'Transaction processing backends, financial data platforms and compliance-critical system architecture.' },
        { title: 'Enterprise SaaS', desc: 'Multi-tenant platforms, workflow automation and complex B2B integrations for large organizations.' },
        { title: 'Cloud-native Infrastructure', desc: 'Kubernetes clusters, auto-scaling, multi-cloud deployments and DevOps automation at enterprise scale.' },
    ] satisfies ExperienceEntry[],

    // ── Contact page ─────────────────────────────────────────────────────────
    contactSignals: [
        { icon: 'clock', title: '24-hour response', desc: 'We respond to all project inquiries within 24 hours.' },
        { icon: 'users', title: 'Engineer-to-engineer', desc: "You'll speak with a senior engineer, not a sales representative." },
        { icon: 'activity', title: 'Technical focus', desc: 'Discovery calls focus on your system, architecture and challenges — not pricing.' },
    ] satisfies ContactSignal[],

    contactWhenItems: [
        'Platform scaling beyond current architecture capacity',
        'Backend architecture redesign or microservices migration',
        'Migration to cloud-native infrastructure',
        'Performance bottlenecks affecting user experience',
        'Legacy system modernization without disruption',
        'New platform needing architecture-first engineering',
    ] satisfies string[],

    // ── FAQ ──────────────────────────────────────────────────────────────────
    faq: [
        {
            q: 'What kind of companies do you work with?',
            a: "We evaluate fit by the complexity of the engineering problem, not company size. We work with funded startups building their core platform, enterprises scaling critical systems, and smaller teams facing a technically hard challenge — performance bottlenecks, architecture redesign, or building a foundation that needs to last. If the problem is genuinely complex, we want to hear about it.",
        },
        {
            q: 'What does a typical engagement look like?',
            a: "Every engagement starts with a technical discovery call — no sales presentation, purely engineering conversation. From there we scope the architecture, agree on approach and define timelines. Engagements range from focused architecture consulting (weeks) to long-term development and operations (months or ongoing retainer). We stay involved as long as the platform needs senior engineering attention.",
        },
        {
            q: 'How quickly can you start, and how do you respond to inquiries?',
            a: "We respond to all project inquiries within 24 hours. For serious engagements we aim to schedule a technical discussion within 48 hours of first contact. Project start depends on current availability and scope — we'll be transparent about both from the first call.",
        },
    ] satisfies FaqItem[],
}
