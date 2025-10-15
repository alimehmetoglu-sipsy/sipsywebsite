// Strapi Response Wrapper
export interface StrapiData<T> {
  id: number;
  attributes: T;
}

// Navigation Item
export interface NavigationItem {
  label: string;
  href: string;
  order: number;
}

// Hero Section
export interface HeroSection {
  title: string;
  highlightedText: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  certifiedPartners: Array<{
    name: string;
    logo?: string;
  }>;
}

// Icon type for Strapi IconHub
export interface StrapiIcon {
  iconName?: string;
  iconData?: string;
  width?: number;
  height?: number;
  isSvgEditable?: boolean;
  isIconNameEditable?: boolean;
}

// Service
export interface Service {
  title: string;
  description: string;
  icon: StrapiIcon | string | null;
  keyTools?: string;
  link?: string;
  linkText: string;
  color: 'accent' | 'secondary';
  order: number;
}

// Value Proposition
export interface ValueProposition {
  title: string;
  description: string;
  icon: StrapiIcon | string | null;
  order: number;
}

// Case Study
export interface CaseStudy {
  title: string;
  subtitle?: string;
  description: string;
  results: Array<{
    metric: string;
    value: string;
  }>;
  icon: StrapiIcon | string | null;
  featured: boolean;
  buttonText: string;
}

// Testimonial
export interface Testimonial {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorInitials?: string;
  rating: number;
  featured: boolean;
}

// Metric
export interface Metric {
  value: string;
  label: string;
  order: number;
}

// Partner
export interface Partner {
  name: string;
  logo?: string;
  order: number;
}

// Process Step
export interface ProcessStep {
  title: string;
  description: string;
  icon?: StrapiIcon | string | null;
  stepNumber?: number;
  order: number;
}

// Blog Post
export interface BlogPost {
  title: string;
  excerpt?: string;
  category?: string;
  publishDate?: string;
}

// CTA Section
export interface CtaSection {
  title: string;
  description?: string;
  buttonText?: string;
}

// Footer
export interface Footer {
  links?: any;
  companyDescription?: string;
  socialLinks?: any;
  copyright?: string;
}

// Solution
export interface Solution {
  title: string;
  subtitle?: string;
  slug: string;
  shortDescription?: string;
  service?: Service & { id: number };
  icon: StrapiIcon | string | null;
  featured: boolean;
  order: number;

  // Tools used
  tools?: Array<{
    name: string;
    description?: string;
  }>;

  // Project details
  project?: {
    projectName: string;
    clientInfo?: string;

    // Problem section
    problemTitle?: string;
    problemDescription?: string;
    problemPoints?: Array<{
      emoji?: string;
      text: string;
    }>;

    // Solution section
    solutionTitle?: string;
    solutionDescription?: string;
    solutionSteps?: Array<{
      emoji?: string;
      text: string;
    }>;

    // Results section
    resultsTitle?: string;
    results?: Array<{
      emoji?: string;
      metric: string;
      value: string;
    }>;

    // Metrics comparison
    beforeMetrics?: Array<{
      label: string;
      value: string;
    }>;
    afterMetrics?: Array<{
      label: string;
      value: string;
    }>;

    savings?: string;
  };

  // Hero CTA customization
  heroCTA?: {
    primaryButtonText?: string;
    secondaryButtonText?: string;
  };

  // Technologies section
  technologiesSection?: {
    title?: string;
    description?: string;
  };

  // Before/After section
  beforeAfterSection?: {
    title?: string;
    description?: string;
  };

  // FAQs
  faqs?: Array<{
    question: string;
    answer: string;
    order?: number;
  }>;

  // Final CTA section
  finalCTA?: {
    title?: string;
    description?: string;
    options?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    contactPhone?: string;
    contactEmail?: string;
    guarantees?: string;
  };

  // Related solutions teaser
  relatedSolutionsSection?: {
    title?: string;
    description?: string;
  };

  // Visual suggestions
  visuals?: Array<{
    type: string;
    description: string;
  }>;
}
