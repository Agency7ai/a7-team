export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface CaseStudy {
  client: string;
  outcome: string;
  metric: string;
  tag: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  initials: string;
}

const services: Service[] = [
  {
    title: 'Product Strategy',
    description:
      'We turn ambiguous goals into a roadmap your team can ship against, backed by research and measurable outcomes.',
    icon: '◎',
  },
  {
    title: 'Design & Brand',
    description:
      'Identity, design systems, and interfaces that make your product feel inevitable — not just usable.',
    icon: '◇',
  },
  {
    title: 'Engineering',
    description:
      'Senior full-stack engineers who embed with your team and ship production software from week one.',
    icon: '⌘',
  },
  {
    title: 'Growth',
    description:
      'Positioning, funnels, and lifecycle experiments that turn a great product into predictable revenue.',
    icon: '↗',
  },
];

const stats: Stat[] = [
  { label: 'Products shipped', value: '120+' },
  { label: 'Avg. time to launch', value: '6 wks' },
  { label: 'Client retention', value: '94%' },
  { label: 'Senior operators', value: '30' },
];

const caseStudies: CaseStudy[] = [
  {
    client: 'Northwind Fintech',
    outcome: 'Rebuilt onboarding and cut drop-off in half.',
    metric: '-51% churn',
    tag: 'Fintech',
  },
  {
    client: 'Lumen Health',
    outcome: 'Launched a care portal used by 40k patients.',
    metric: '40k users',
    tag: 'Health',
  },
  {
    client: 'Orbit Commerce',
    outcome: 'Scaled checkout to handle Black Friday peaks.',
    metric: '9x traffic',
    tag: 'Commerce',
  },
];

const team: TeamMember[] = [
  {
    name: 'Ava Reyes',
    role: 'Founder & CEO',
    focus: 'Strategy, partnerships',
    initials: 'AR',
  },
  {
    name: 'Marcus Lin',
    role: 'Head of Engineering',
    focus: 'Platform, reliability',
    initials: 'ML',
  },
  {
    name: 'Sofia Haddad',
    role: 'Design Director',
    focus: 'Brand, design systems',
    initials: 'SH',
  },
  {
    name: 'Devin Okafor',
    role: 'Growth Lead',
    focus: 'Lifecycle, analytics',
    initials: 'DO',
  },
  {
    name: 'Priya Nair',
    role: 'Principal Product Manager',
    focus: 'Discovery, delivery',
    initials: 'PN',
  },
  {
    name: 'Theo Bauer',
    role: 'Staff Engineer',
    focus: 'Frontend, DX',
    initials: 'TB',
  },
];

export function getServices(): Service[] {
  return services;
}

export function getStats(): Stat[] {
  return stats;
}

export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getTeam(): TeamMember[] {
  return team;
}
