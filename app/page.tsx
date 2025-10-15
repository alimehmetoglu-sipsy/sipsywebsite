import Navigation from '@/components/Navigation';
import ClientHome from '@/components/ClientHome';
import {
  getHeroSection,
  getValuePropositions,
  getServices,
  getMetrics,
  getFeaturedCaseStudies,
  getFeaturedTestimonials,
  getPartners,
  getProcessSteps,
  getBlogPosts,
  getCtaSection,
  getFooter,
} from '@/lib/strapi';

export default async function Home() {
  // Fetch all data from Strapi with default language (tr)
  const [
    heroData,
    valuePropositions,
    services,
    metrics,
    caseStudies,
    testimonials,
    partners,
    processSteps,
    blogPosts,
    ctaSectionData,
    footerData,
  ] = await Promise.all([
    getHeroSection('tr'),
    getValuePropositions('tr'),
    getServices('tr'),
    getMetrics('tr'),
    getFeaturedCaseStudies('tr'),
    getFeaturedTestimonials('tr'),
    getPartners('tr'),
    getProcessSteps('tr'),
    getBlogPosts('tr'),
    getCtaSection('tr'),
    getFooter('tr'),
  ]);

  // Prepare initial data for ClientHome
  const initialData = {
    heroData,
    valuePropositions: valuePropositions || [],
    services: services || [],
    metrics: metrics || [],
    caseStudies: caseStudies || [],
    testimonials: testimonials || [],
    partners: partners || [],
    processSteps: processSteps || [],
    blogPosts: blogPosts || [],
    ctaSectionData,
    footerData,
  };

  return (
    <>
      {/* Navigation Bar */}
      <Navigation />

      {/* Client-side rendered content with language support */}
      <ClientHome initialData={initialData} />
    </>
  );
}
