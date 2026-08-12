export const SECTION_IDS = {
  HERO: 'hero',
  ABOUT: 'about',
  SKILLS: 'skills',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  EDUCATION: 'education',
  CERTIFICATIONS: 'certifications',
  CONTACT: 'contact',
  FOOTER: 'footer',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: SECTION_IDS.HERO, label: 'Home' },
  { id: SECTION_IDS.ABOUT, label: 'About' },
  { id: SECTION_IDS.SKILLS, label: 'Skills' },
  { id: SECTION_IDS.EXPERIENCE, label: 'Experience' },
  { id: SECTION_IDS.PROJECTS, label: 'Projects' },
  { id: SECTION_IDS.EDUCATION, label: 'Education' },
  { id: SECTION_IDS.CERTIFICATIONS, label: 'Certifications' },
  { id: SECTION_IDS.CONTACT, label: 'Contact' },
] as const;

export const NAV_ACTIVE_INTERSECTION_ROOT_MARGIN_TOP = '-40%';
export const NAV_ACTIVE_INTERSECTION_THRESHOLD = 0.01;
export const SCROLL_BEHAVIOUR_SMOOTH_OPTIONS: ScrollToOptions = {
  behavior: 'smooth',
} as const;

export const NAVBAR_HEIGHT_PX = 68;
export const SCROLL_PADDING_TOP_PX = NAVBAR_HEIGHT_PX + 24;

export const REVEAL_INTERSECTION_THRESHOLD = 0.15;
export const REVEAL_ROOT_MARGIN_TOP = '0px';
export const REVEAL_ROOT_MARGIN_BOTTOM = '-10%';

export const PORTFOLIO_NAME = 'Komala L';
export const PORTFOLIO_INITIALS = 'KL';
export const PORTFOLIO_ROLE = 'MERN Stack Developer';
export const PORTFOLIO_ROLE_ALT = 'React · Node.js · Express · MongoDB';
export const PORTFOLIO_EMAIL = 'lk0106687@gmail.com';
export const PORTFOLIO_LOCATION = 'Bengaluru, India';
export const PORTFOLIO_SOCIALS = {
    GITHUB: 'https://github.com/Komala-L',
    LINKEDIN: 'https://www.linkedin.com/in/komala-l-dev/',
    MAIL: `mailto:${PORTFOLIO_EMAIL}`,
} as const;

export const HERO_TAGLINE =
  'Crafting calm, computational interfaces at the intersection of design and engineering.';
export const HERO_INTRO =
  "I'm a frontend engineer building production-grade web experiences with a focus on animation systems, interaction, and performance. Previously contributed to design systems, developer tools, and high-traffic product surfaces.";

export const HERO_PRIMARY_CTA_LABEL = 'View my work';
export const HERO_SECONDARY_CTA_LABEL = 'Get in touch';
