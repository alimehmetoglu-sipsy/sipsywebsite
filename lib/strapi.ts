const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

async function fetchAPI(path: string, locale: string = 'tr', options: RequestInit = {}) {
  // Add locale parameter to the URL
  const separator = path.includes('?') ? '&' : '?';
  const url = `${STRAPI_URL}/api${path}${separator}locale=${locale}`;

  // Check if this is a solutions endpoint (don't fallback for solutions)
  const isSolutionsEndpoint = path.includes('/solutions');

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.warn(`Failed to fetch from Strapi: ${response.statusText}`);

      // If Turkish locale fails and we're not already trying English, fallback to English
      // BUT: Don't fallback for solutions endpoint - they are locale-specific
      if (locale !== 'en' && !isSolutionsEndpoint) {
        console.warn(`Falling back to English locale for ${path}`);
        return fetchAPI(path, 'en', options);
      }

      return { data: null };
    }

    const data = await response.json();

    // If Turkish request succeeded but returned null or empty data, try English fallback
    // BUT: Don't fallback for solutions endpoint - they are locale-specific
    if (locale !== 'en' && !isSolutionsEndpoint && (!data.data || data.data === null || (Array.isArray(data.data) && data.data.length === 0))) {
      console.warn(`Turkish content not found for ${path}, falling back to English`);
      return fetchAPI(path, 'en', options);
    }

    return data;
  } catch (error) {
    console.warn(`Failed to connect to Strapi: ${error}`);
    return { data: null };
  }
}

// Navigation Items
export async function getNavigationItems(locale: string = 'tr') {
  const data = await fetchAPI('/navigation-items?sort=order:asc', locale);
  return data.data;
}

// Hero Section
export async function getHeroSection(locale: string = 'tr') {
  const data = await fetchAPI('/hero-section', locale);
  return data.data;
}

// Services
export async function getServices(locale: string = 'tr') {
  const data = await fetchAPI('/services?sort=order:asc', locale);
  return data.data;
}

// Value Propositions
export async function getValuePropositions(locale: string = 'tr') {
  const data = await fetchAPI('/value-propositions?sort=order:asc', locale);
  return data.data;
}

// Case Studies
export async function getCaseStudies(locale: string = 'tr') {
  const data = await fetchAPI('/case-studies', locale);
  return data.data;
}

export async function getFeaturedCaseStudies(locale: string = 'tr') {
  const data = await fetchAPI('/case-studies?filters[featured][$eq]=true', locale);
  return data.data;
}

// Testimonials
export async function getTestimonials(locale: string = 'tr') {
  const data = await fetchAPI('/testimonials', locale);
  return data.data;
}

export async function getFeaturedTestimonials(locale: string = 'tr') {
  const data = await fetchAPI('/testimonials?filters[featured][$eq]=true', locale);
  return data.data;
}

// Metrics
export async function getMetrics(locale: string = 'tr') {
  const data = await fetchAPI('/metrics?sort=order:asc', locale);
  return data.data;
}

// Partners
export async function getPartners(locale: string = 'tr') {
  const data = await fetchAPI('/partners?sort=order:asc', locale);
  return data.data;
}

// Process Steps
export async function getProcessSteps(locale: string = 'tr') {
  const data = await fetchAPI('/process-steps?sort=order:asc', locale);
  return data.data;
}

// Blog Posts
export async function getBlogPosts(locale: string = 'tr') {
  const data = await fetchAPI('/blog-posts', locale);
  return data.data;
}

// CTA Section
export async function getCtaSection(locale: string = 'tr') {
  const data = await fetchAPI('/cta-section', locale);
  return data.data;
}

// Footer
export async function getFooter(locale: string = 'tr') {
  const data = await fetchAPI('/footer', locale);
  return data.data;
}

// Solutions
export async function getSolutions(locale: string = 'tr') {
  const data = await fetchAPI('/solutions?sort=order:asc&populate=*', locale);
  return data.data;
}

export async function getFeaturedSolutions(locale: string = 'tr') {
  const data = await fetchAPI('/solutions?filters[featured][$eq]=true&sort=order:asc&populate=*', locale);
  return data.data;
}

export async function getSolutionBySlug(slug: string, locale: string = 'tr') {
  // Using populate=deep to get all nested components
  const data = await fetchAPI(`/solutions?filters[slug][$eq]=${slug}&populate=deep`, locale);
  return data.data?.[0];
}

export async function getSolutionsByService(serviceId: number, locale: string = 'tr') {
  const data = await fetchAPI(`/solutions?filters[service][id][$eq]=${serviceId}&sort=order:asc&populate=*`, locale);
  return data.data;
}
