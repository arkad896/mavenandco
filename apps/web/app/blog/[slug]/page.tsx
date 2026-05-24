import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Sparkles, Quote, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../../../lib/blog';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Maven & Co. Blog`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    openGraph: {
      title: `${post.title} | Maven & Co. Blog`,
      description: post.schemaDescription,
      type: "article",
      publishedTime: new Date(post.date).toISOString().split('T')[0],
      authors: [post.author.name],
      url: `https://itsmaven.in/blog/${post.slug}`,
      images: [
        {
          url: "https://itsmaven.in/logo.png",
          width: 800,
          height: 800,
          alt: "Maven & Co. Logo",
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    }
  };
}

export default function BlogPostReader({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Find index of first paragraph section to apply Drop-Cap
  const firstParagraphIdx = post.sections.findIndex(s => s.type === 'paragraph');

  // Custom JSON-LD dynamic metadata Injection
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.schemaDescription,
    "datePublished": new Date(post.date).toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Maven & Co.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://itsmaven.in/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://itsmaven.in/blog/${post.slug}`
    }
  };

  return (
    <div className="min-h-screen bg-[#12352A] text-[#FDFCF0] font-body relative overflow-hidden selection:bg-[#C9A84C] selection:text-[#0A2119]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background grain */}
      <div className="grain" aria-hidden="true" />

      {/* Decorative ambient vector grid & glow */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -top-[10%] -left-[10%] w-[60%] h-[40%] bg-[radial-gradient(circle,rgba(201,168,76,0.02)_0%,transparent_70%)] blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Premium Header */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 sm:px-8 py-6 flex justify-between items-center border-b border-[#C9A84C]/10 bg-[#12352A]/80 backdrop-blur-md">
        <Link href="/blog" className="flex items-center gap-2 group text-xs font-mono uppercase tracking-widest text-[#FDFCF0]/70 hover:text-[#C9A84C] transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </Link>
        <Link href="/" className="flex flex-col group text-center focus:outline-none">
          <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#FDFCF0] group-hover:text-[#C9A84C] transition-colors duration-500">
            MAVEN
          </span>
          <span className="text-[8px] font-mono tracking-[0.25em] text-[#8FAF95] uppercase leading-none">
            HOSPITALITY OS
          </span>
        </Link>
        <Link 
          href="/#inquire"
          className="text-[10px] font-mono uppercase tracking-widest bg-[#C9A84C] text-[#0A2119] hover:bg-[#FDFCF0] px-4 py-2 rounded-full transition-all duration-300 font-bold"
        >
          Inquire Now
        </Link>
      </nav>

      {/* Editorial Content Container */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-16 relative z-10">
        
        {/* Breadcrumb & Category */}
        <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase text-[#8FAF95] mb-6">
          <span className="text-[#C9A84C] border border-[#C9A84C]/25 bg-[#C9A84C]/5 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        {/* Big Serif Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight tracking-tight mb-8 text-[#FDFCF0] border-b border-[#C9A84C]/10 pb-8">
          {post.title}
        </h1>

        {/* Author Bio Header Card */}
        <div className="flex items-center gap-4 bg-[#0A2119]/40 border border-[#C9A84C]/10 p-4 sm:p-5 rounded-2xl backdrop-blur-sm mb-12 max-w-lg">
          <div className="w-12 h-12 rounded-full bg-[#1C4A38] border border-[#C9A84C]/25 flex items-center justify-center font-mono text-xs font-bold text-[#C9A84C]">
            {post.author.avatar}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#FDFCF0]">{post.author.name}</span>
            <span className="text-[10px] font-mono text-[#8FAF95] uppercase tracking-wider">{post.author.role}</span>
          </div>
        </div>

        {/* Article Body */}
        <article className="prose prose-invert max-w-none text-[#FDFCF0]/90 text-sm sm:text-base leading-relaxed space-y-8 font-light">
          {post.sections.map((section, idx) => {
            if (section.type === 'paragraph') {
              // Apply physical-newspaper drop cap style if it is the first paragraph
              if (idx === firstParagraphIdx && section.content) {
                const firstChar = section.content.charAt(0);
                const restOfPara = section.content.slice(1);
                return (
                  <p key={idx} className="relative first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-[#C9A84C] first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                    {firstChar}
                    {restOfPara}
                  </p>
                );
              }
              return (
                <p key={idx} className="leading-relaxed text-[#FDFCF0]/85">
                  {section.content}
                </p>
              );
            }

            if (section.type === 'heading') {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFCF0] mt-12 mb-4 tracking-tight border-l-2 border-[#C9A84C] pl-4">
                  {section.content}
                </h2>
              );
            }

            if (section.type === 'quote') {
              return (
                <div key={idx} className="my-10 bg-[#0A2119]/60 border-y border-[#C9A84C]/20 py-8 px-6 sm:px-10 relative rounded-md text-center max-w-3xl mx-auto">
                  <Quote className="w-8 h-8 text-[#C9A84C]/20 absolute top-4 left-4" />
                  <p className="text-base sm:text-lg font-serif italic text-[#E8C97A] mb-3 leading-relaxed">
                    "{section.content}"
                  </p>
                  <span className="text-[9px] font-mono tracking-widest text-[#C9A84C] uppercase">— MAVEN HOSPITALITY OS STATEMENT</span>
                </div>
              );
            }

            if (section.type === 'list' && section.items) {
              return (
                <ul key={idx} className="space-y-4 my-8 pl-4">
                  {section.items.map((item, itemIdx) => {
                    const [title, desc] = item.split(': ');
                    return (
                      <li key={itemIdx} className="flex gap-3 items-start text-xs sm:text-sm text-[#FDFCF0]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 shrink-0" />
                        <p>
                          <strong className="text-[#C9A84C] font-mono tracking-wide uppercase text-[11px] mr-1">{title}:</strong>
                          {desc}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              );
            }

            if (section.type === 'stats') {
              return (
                <div key={idx} className="my-8 bg-gradient-to-r from-[#0A2119] to-[#1C4A38]/30 border border-[#C9A84C]/15 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6 max-w-2xl mx-auto">
                  <span className="text-4xl sm:text-5xl font-serif font-bold text-[#C9A84C] tracking-tight text-glow border-b sm:border-b-0 sm:border-r border-[#C9A84C]/10 pb-3 sm:pb-0 sm:pr-6 shrink-0 min-w-[140px] text-center">
                    {section.statNumber}
                  </span>
                  <p className="text-xs sm:text-sm font-mono text-[#8FAF95] leading-relaxed text-center sm:text-left">
                    {section.statLabel}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </article>

        {/* Dynamic bottom CTA Card */}
        <div className="mt-16 border border-[#C9A84C]/20 bg-gradient-to-b from-[#0A2119] to-[#12352A] p-8 sm:p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <Sparkles className="w-6 h-6 text-[#C9A84C] mx-auto mb-4" />
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFCF0] mb-3">
            Ready to Protect Your Bottom Line?
          </h3>
          <p className="text-xs sm:text-sm text-[#8FAF95] max-w-lg mx-auto mb-8 font-light leading-relaxed">
            Stop paying commission leakages to third-party aggregator networks. Build your brand identity, direct-ordering pipelines, and CRM systems with Maven OS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/#inquire"
              className="text-xs font-mono uppercase tracking-widest bg-[#C9A84C] text-[#0A2119] hover:bg-[#FDFCF0] px-6 py-3 rounded-full transition-all duration-300 font-bold"
            >
              Get a Free Consultation
            </Link>
            <Link 
              href="/#pricing"
              className="text-xs font-mono uppercase tracking-widest text-[#C9A84C] hover:text-[#FDFCF0] flex items-center gap-1"
            >
              <span>Explore Flat Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>

      {/* Styled Footer */}
      <footer className="border-t border-[#C9A84C]/10 py-12 text-center text-xs font-mono text-[#8FAF95]/50 relative z-10 max-w-7xl mx-auto">
        <p>© 2026 Maven & Co. | Built to boost margins.</p>
      </footer>
    </div>
  );
}
