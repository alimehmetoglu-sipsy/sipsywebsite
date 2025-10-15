import { StrapiResponse } from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  method?: string;
  headers?: HeadersInit;
  body?: string;
  cache?: RequestCache;
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

/**
 * Fetch data from Strapi API
 */
export async function fetchAPI<T>(
  path: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    defaultHeaders['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const mergedOptions: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  const url = `${STRAPI_URL}/api${path}`;

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Get single entry by slug
 */
export async function getBySlug<T>(
  contentType: string,
  slug: string,
  populate: string = '*'
): Promise<T | null> {
  try {
    const response = await fetchAPI<T[]>(
      `/${contentType}?filters[slug][$eq]=${slug}&populate=${populate}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    return response.data && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    console.error(`Error fetching ${contentType} by slug:`, error);
    return null;
  }
}

/**
 * Get all entries of a content type
 */
export async function getAll<T>(
  contentType: string,
  populate: string = '*',
  sort: string = 'publishedAt:desc'
): Promise<T[]> {
  try {
    const response = await fetchAPI<T[]>(
      `/${contentType}?populate=${populate}&sort=${sort}`,
      {
        next: { revalidate: 60 },
      }
    );

    return response.data || [];
  } catch (error) {
    console.error(`Error fetching ${contentType}:`, error);
    return [];
  }
}

/**
 * Get image URL from Strapi
 */
export function getStrapiImageUrl(url: string): string {
  if (!url) return '';

  // If the URL is already absolute, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}
