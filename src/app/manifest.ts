import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'A Fashions - Premium Leather Goods Manufacturer',
        short_name: 'A Fashions',
        description: 'World-class leather bags, wallets, belts and accessories. Kolkata-based manufacturer blending traditional craftsmanship with modern design. BSCI & SEDEX certified.',
        start_url: '/',
        display: 'standalone',
        background_color: '#E8E8E8',
        theme_color: '#000000',
        orientation: 'portrait-primary',
        icons: [
            {
                src: '/assets/images/afashions_favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any',
            },
            {
                src: '/assets/images/afashions_favicon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'maskable',
            },
        ],
        categories: [
            'business',
            'shopping',
            'lifestyle',
        ],
        lang: 'en-US',
        dir: 'ltr',
    }
}
