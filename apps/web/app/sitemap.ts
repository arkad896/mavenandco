import { MetadataRoute } from 'next';
import { BLOG_POSTS } from '../lib/blog';
import { CASE_STUDIES } from '../lib/case-studies';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://itsmaven.in';

  // Base and static pages
  const staticUrls = [
    '',
    '/marketing',
    '/blog',
    '/case-studies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Programmatically fetch dynamic blog post links
  const blogUrls = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Programmatically fetch dynamic case study links
  const caseStudyUrls = CASE_STUDIES.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(study.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...blogUrls, ...caseStudyUrls];
}
