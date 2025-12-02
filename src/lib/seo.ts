import { Metadata } from 'next'

// Base configuration
const siteConfig = {
    name: 'A Fashions',
    url: 'https://afashions.net',
    ogImage: "https://ik.imagekit.io/zqjkk9ui6/images/og-image.jpg",
    description: 'Premium leather goods manufacturer in Kolkata, India. Specialized in handcrafted leather bags, wallets, belts and accessories. BSCI & SEDEX certified facility with in-house tannery.',
    keywords: [
        // Core Business
        'leather goods manufacturer India',
        'premium leather bags Kolkata',
        'handcrafted leather products',
        'leather wallet manufacturer',
        'custom leather goods',

        // Manufacturing & Capabilities
        'BSCI certified leather manufacturer',
        'SEDEX certified factory',
        'in-house leather tannery',
        'leather goods OEM ODM',
        'private label leather products',
        'bulk leather goods manufacturer',

        // Product Specific
        'women leather handbags manufacturer',
        'men leather wallets wholesale',
        'genuine leather belts bulk',
        'leather accessories supplier',
        'small leather goods manufacturer',

        // Quality & Craftsmanship
        'artisan leather craftsmen',
        'full-grain leather products',
        'traditional leather craftsmanship',
        'quality leather manufacturing',
        'skilled leather artisans Kolkata',

        // Export & B2B
        'leather goods exporter India',
        'European leather brands supplier',
        'US leather goods manufacturer',
        'international leather supplier',
        'leather goods B2B India',

        // Sustainability & Ethics
        'ethical leather manufacturing',
        'sustainable leather goods',
        'LWG certified tannery',
        'eco-friendly leather products',
        'responsible leather sourcing',

        // Location Specific
        'Kolkata leather manufacturer',
        'Indian leather goods exporter',
        'Bengal leather craftsmanship',
        'India leather factory',

        // Services
        'leather product design development',
        'custom leather manufacturing',
        'leather goods sampling',
        'leather product prototyping',
        'end-to-end leather manufacturing',
    ],
}

// Default metadata for all pages
export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [
        {
            name: 'A Fashions',
            url: siteConfig.url,
        },
    ],
    creator: 'A Fashions',
    publisher: 'A Fashions',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: 'A Fashions - Premium Leather Goods',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: '@afashions',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: "https://ik.imagekit.io/zqjkk9ui6/images/afashions_favicon.svg",
        shortcut: "https://ik.imagekit.io/zqjkk9ui6/images/afashions_favicon.svg",
        apple: "https://ik.imagekit.io/zqjkk9ui6/images/afashions_favicon.svg",
    },
    manifest: '/manifest.json',
    verification: {
        google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
    },
    alternates: {
        canonical: siteConfig.url,
    },
    category: 'business',
}

// Page-specific metadata
export const pageMetadata = {
    home: {
        title: 'A Fashions - Premium Leather Goods Manufacturer | Kolkata, India',
        description: 'Leading leather goods manufacturer in Kolkata specializing in handcrafted bags, wallets, belts. BSCI & SEDEX certified. In-house tannery. Export quality leather products to Europe & USA.',
        keywords: [
            'leather goods manufacturer Kolkata',
            'premium leather bags India',
            'certified leather factory',
            'leather exporter India',
            'handcrafted leather products',
            'BSCI SEDEX certified manufacturer',
            'in-house tannery India',
            'quality leather goods supplier',
        ],
        openGraph: {
            title: 'A Fashions - Premium Leather Goods Manufacturer',
            description: 'Crafting world-class leather products since establishment. From our Kolkata facility to global markets.',
            url: siteConfig.url,
        },
    },

    ourStory: {
        title: 'Our Story - Heritage Craftsmanship & Modern Innovation | A Fashions',
        description: 'Founded in Kolkata, India - a city celebrated for leather heritage. Young, dynamic manufacturer blending traditional craftsmanship with sustainable practices. Meet our artisans, see our process.',
        keywords: [
            'leather manufacturer history',
            'Kolkata leather heritage',
            'artisan leather craftsmen',
            'leather manufacturing process',
            'design development team',
            'quality assurance leather',
            'ethical leather manufacturing',
            'sustainable leather production',
            'BSCI SEDEX compliance',
            'leather tannery operations',
        ],
        openGraph: {
            title: 'Our Story - A Fashions Leather Heritage',
            description: 'Two friends united by leather craft. From Kolkata workshops to international markets - discover our journey.',
            url: `${siteConfig.url}/our-story`,
        },
    },

    catalog: {
        title: 'Leather Product Catalog - Bags, Wallets, Belts & Accessories | A Fashions',
        description: 'Browse our collection of premium leather products. Women\'s & men\'s bags, wallets, belts, and accessories. Custom manufacturing available. OEM/ODM services for brands worldwide.',
        keywords: [
            'leather product catalog',
            'women leather bags',
            'men leather wallets',
            'leather belts collection',
            'leather accessories',
            'custom leather manufacturing',
            'OEM leather products',
            'ODM leather goods',
            'private label leather',
            'bulk leather orders',
        ],
        openGraph: {
            title: 'Product Catalog - A Fashions Leather Goods',
            description: 'Explore our range of handcrafted leather products. Quality manufacturing for discerning brands.',
            url: `${siteConfig.url}/catalog`,
        },
    },

    contact: {
        title: 'Contact Us - Let\'s Create Together | A Fashions',
        description: 'Connect with A Fashions for custom leather manufacturing, sampling, or partnership inquiries. Kolkata-based facility serving global brands. Fast response, flexible MOQ.',
        keywords: [
            'leather manufacturer contact',
            'leather goods inquiry',
            'custom leather order',
            'leather manufacturing quote',
            'OEM leather inquiry',
            'leather sampling request',
            'Kolkata leather factory contact',
            'leather supplier India',
        ],
        openGraph: {
            title: 'Contact A Fashions - Your Leather Manufacturing Partner',
            description: 'Ready to bring your leather product vision to life? Get in touch with our team.',
            url: `${siteConfig.url}/lets-connect`,
        },
    },
}

// Schema.org structured data
export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'A Fashions',
    url: siteConfig.url,
    logo: `${siteConfig.url}/assets/images/afashions_favicon.svg`,
    description: siteConfig.description,
    address: {
        '@type': 'PostalAddress',
        streetAddress: '62, Mathewartala Road, Tangra',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        postalCode: '700046',
        addressCountry: 'IN',
    },
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Business Inquiries',
        telephone: '+91 9163327474',
        email: 'info@afashions.net',
    },
    sameAs: [
        // Add your social media URLs here
        // 'https://www.linkedin.com/company/afashions',
        // 'https://www.instagram.com/afashions',
    ],
    areaServed: [
        {
            '@type': 'Country',
            name: 'India',
        },
        {
            '@type': 'Country',
            name: 'United States',
        },
        {
            '@type': 'Place',
            name: 'Europe',
        },
    ],
    knowsAbout: [
        'Leather Manufacturing',
        'Leather Goods Production',
        'Custom Leather Products',
        'Quality Assurance',
        'Ethical Manufacturing',
    ],
}

export const manufacturingBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': siteConfig.url,
    name: 'A Fashions',
    image: siteConfig.ogImage,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: '+91 9163327474',
    email: 'info@afashions.net',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '62, Mathewartala Road, Tangra',
        addressLocality: 'Kolkata',
        addressRegion: 'West Bengal',
        postalCode: '700046',
        addressCountry: 'IN',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 22.5726, // Update with actual coordinates
        longitude: 88.3639,
    },
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '$$',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '50',
    },
}

// Helper function to generate metadata for specific pages
export function generatePageMetadata(pageKey: keyof typeof pageMetadata): Metadata {
    const page = pageMetadata[pageKey];
    return {
        metadataBase: new URL(siteConfig.url),
        title: page.title,
        description: page.description,
        keywords: [...siteConfig.keywords, ...page.keywords],
        openGraph: {
            ...defaultMetadata.openGraph,
            title: page.openGraph.title,
            description: page.openGraph.description,
            url: page.openGraph.url,
        },
        twitter: {
            ...defaultMetadata.twitter,
            title: page.openGraph.title,
            description: page.openGraph.description,
        },
        alternates: {
            canonical: page.openGraph.url,
        },
    } as Metadata;
}

export { siteConfig }
