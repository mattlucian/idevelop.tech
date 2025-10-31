import type { WebDesignServiceData } from '@/types/service'

export const webDesignServiceData: WebDesignServiceData = {
  // Navigation
  breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Web Design & Development' }],

  // Hero Section
  hero: {
    title: 'Beautiful, Conversion-Focused Websites',
    subtitle:
      'Stop settling for cookie-cutter templates. Get professional, mobile-responsive design on Shopify, WordPress, or custom platforms—with SEO preservation, conversion optimization, and fixed-fee pricing.',
    colorScheme: 'cyan',
  },

  // Tab Configuration
  tabs: [
    { id: 'design', label: 'Design Process' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'migration', label: 'Migration' },
  ],

  // Benefits Section
  benefits: [
    {
      title: 'Conversion-Focused Design',
      description:
        'Every design decision is driven by your business goals. User journey mapping, A/B testing, and analytics ensure your site converts visitors into customers.',
    },
    {
      title: 'Zero-Downtime Migration',
      description:
        'Move to better platforms without losing search rankings. Complete SEO preservation with 301 redirects, content optimization, and performance improvements.',
    },
    {
      title: 'Mobile-First Approach',
      description:
        'Responsive designs that look perfect on any device. Mobile-optimized layouts ensure your site works beautifully from 320px to 4K displays.',
    },
  ],

  expertiseBadge: {
    title: 'Full-Stack Web Development',
    description:
      'Professional design and development on Shopify, WordPress, and custom platforms with ongoing support.',
  },

  // What I Offer / How It Works
  whatIOffer: [
    'Professional design on Shopify, WordPress, and custom platforms',
    'Mobile-responsive, brand-aligned designs that convert visitors',
    'Website migration with SEO preservation and performance optimization',
    'Conversion rate optimization and analytics setup to measure results',
    'Ongoing design support for continuous improvement',
  ],

  howItWorks: [
    'Free consultation to understand your brand and business goals',
    'Fixed-fee proposal based on estimated hours (no surprise charges)',
    'Regular progress updates with design mockups and staging site access',
    'Training and documentation included for projects over 10 hours',
    'Launch support and post-launch optimization',
  ],

  // Portfolio Section
  portfolio: {
    title: 'Recent Client Work',
    items: [
      {
        name: 'Safari SA',
        url: 'https://safarisa.net',
        logo: '/images/partners/safarisa_net.avif',
        description: 'Website built on Shopify for Optics & Safari Products provider',
      },
      {
        name: 'Masdun',
        url: 'https://masdun.co.za',
        logo: '/images/partners/masdun_co_za.avif',
        description: 'Frame and picture album eCommerce business',
      },
      {
        name: 'Mr. Mochas Pet Supplies',
        url: 'https://mrmochaspet.com',
        logo: '/images/partners/mrmochas-dark-logo.png',
        description: 'Custom Shopify website design for healthy pet supplies retailer',
      },
    ],
    testimonial: {
      quote:
        "[Matt's] expertise, knowledge, and experience in systems, software, and all technical aspects are exceptional",
      author: 'Neil',
      role: 'CEO at SafariSA',
    },
  },

  // CTA Section
  cta: {
    title: 'Ready to Build a Website That Converts?',
    subtitle:
      "Let's discuss your design needs and create a website that reflects your brand and drives results.",
    buttonText: 'Schedule a Free Consultation',
  },

  // Design Process Visualization
  designProcess: {
    steps: [
      {
        icon: '🎯',
        title: 'Discover',
        description: 'Brand audit, goal setting, and competitive analysis',
      },
      {
        icon: '📝',
        title: 'Content',
        description: 'Gather copy, images, and assets for your site',
      },
      {
        icon: '🎨',
        title: 'Design',
        description: 'Create mockups that reflect your brand identity',
      },
      {
        icon: '💻',
        title: 'Develop',
        description: 'Build on staging with regular progress updates',
      },
      {
        icon: '🧪',
        title: 'Test',
        description: 'Cross-browser and device testing for quality',
      },
      {
        icon: '🚀',
        title: 'Launch',
        description: 'Go live and optimize for conversions',
      },
    ],
  },

  // Platform Expertise
  platforms: [
    {
      name: 'Shopify',
      description: 'Custom theme development and app integration for eCommerce success',
      features: ['Custom themes', 'App integration', 'Checkout optimization', 'Store migration'],
    },
    {
      name: 'WordPress',
      description: 'WooCommerce and custom WordPress solutions with focus on performance',
      features: ['Custom themes', 'WooCommerce setup', 'Plugin development', 'Performance tuning'],
    },
    {
      name: 'Custom Solutions',
      description: 'Vue, React, and modern frameworks for complex web applications',
      features: [
        'Vue.js/React',
        'API integration',
        'Custom functionality',
        'Scalable architecture',
      ],
    },
  ],

  // Migration Checklist
  migrationSteps: [
    { phase: 'Pre-Migration', items: ['Content audit', 'SEO baseline', 'URL mapping', 'Backup'] },
    {
      phase: 'Migration',
      items: ['Content transfer', 'Design implementation', '301 redirects', 'Staging testing'],
    },
    {
      phase: 'Post-Migration',
      items: ['SEO monitoring', 'Performance check', 'Analytics setup', 'User testing'],
    },
  ],
}
