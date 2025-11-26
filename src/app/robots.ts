import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://afashions.net'

    return {
        rules: [
            {
                userAgent: '*',
                allow: [
                    '/',
                    '/our-story',
                    '/catalog',
                    '/lets-connect',
                ],
                disallow: [
                    '/api/',
                    '/catalog/*/[productId]',
                    '/_next/',
                    '/private/',
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: [
                    '/',
                    '/our-story',
                    '/catalog',
                    '/lets-connect',
                ],
                disallow: [
                    '/api/',
                    '/catalog/*/[productId]',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
