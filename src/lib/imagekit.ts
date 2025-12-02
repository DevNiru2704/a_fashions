/**
 * ImageKit Utility
 * Converts local image paths to ImageKit CDN URLs
 */

const IMAGEKIT_BASE_URL = `https://ik.imagekit.io/${process.env.NEXT_PUBLIC_IMAGEKIT_ID || 'zqjkk9ui6'}`;

/**
 * Converts a local asset path to ImageKit CDN URL
 * @param path - Local path starting with /assets/images or /assets/videos
 * @returns Full ImageKit CDN URL
 * 
 * @example
 * getImageKitUrl('/assets/images/catalog/product.webp')
 * // Returns: https://ik.imagekit.io/zqjkk9ui6/images/catalog/product.webp
 */
export function getImageKitUrl(path: string): string {
    // Remove /assets prefix
    const cleanPath = path.replace(/^\/assets\//, '');

    return `${IMAGEKIT_BASE_URL}/${cleanPath}`;
}

/**
 * Converts an array of local paths to ImageKit URLs
 * @param paths - Array of local paths
 * @returns Array of ImageKit CDN URLs
 */
export function getImageKitUrls(paths: string[]): string[] {
    return paths.map(getImageKitUrl);
}

/**
 * Get ImageKit URL with transformations
 * @param path - Local path
 * @param transformations - ImageKit transformation parameters
 * @returns ImageKit URL with transformations
 * 
 * @example
 * getImageKitUrlWithTransform('/assets/images/product.webp', { width: 800, quality: 80 })
 * // Returns: https://ik.imagekit.io/zqjkk9ui6/images/product.webp?tr=w-800,q-80
 */
export function getImageKitUrlWithTransform(
    path: string,
    transformations: {
        width?: number;
        height?: number;
        quality?: number;
        format?: 'webp' | 'jpg' | 'png';
        blur?: number;
    }
): string {
    const baseUrl = getImageKitUrl(path);
    const params: string[] = [];

    if (transformations.width) params.push(`w-${transformations.width}`);
    if (transformations.height) params.push(`h-${transformations.height}`);
    if (transformations.quality) params.push(`q-${transformations.quality}`);
    if (transformations.format) params.push(`f-${transformations.format}`);
    if (transformations.blur) params.push(`bl-${transformations.blur}`);

    if (params.length === 0) return baseUrl;

    return `${baseUrl}?tr=${params.join(',')}`;
}

/**
 * Direct ImageKit URL (for already uploaded images)
 * Use this if you have the direct ImageKit URL
 */
export const IMAGEKIT_URL = IMAGEKIT_BASE_URL;

export default getImageKitUrl;
