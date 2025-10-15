// Strapi Base Types
export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: any;
    url: string;
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Content Types
export interface PageContent {
  title: string;
  description: string;
  content: string;
  slug: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseStudy {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  slug: string;
  publishedAt: string;
  featuredImage?: {
    data: StrapiImage;
  };
}

export interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  category: string;
  readTime: number;
  publishedAt: string;
  featuredImage?: {
    data: StrapiImage;
  };
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  slug: string;
}
