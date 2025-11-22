import { PRODUCT_MODELS } from '@/data/catalogProducts';

/**
 * Seeded random number generator for consistent results
 * Uses a simple Linear Congruential Generator (LCG)
 */
function seededRandom(seed: number): () => number {
    let state = seed;
    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296;
        return state / 4294967296;
    };
}

/**
 * Fetches random product images from catalog
 * Ensures no duplicate products or images
 * Uses seeded randomization for consistent SSR/client rendering
 * @param threshold - Number of random images to fetch (default: 10)
 * @param seed - Seed for random number generator (default: 42)
 * @returns Array of unique random product image URLs
 */
export function getRandomProductImages(threshold: number = 10, seed: number = 42): string[] {
    const random = seededRandom(seed);
    const usedProducts = new Set<string>();
    const usedImages = new Set<string>();
    const randomImages: string[] = [];

    // Create a shuffled copy of products using seeded random
    const shuffledProducts = [...PRODUCT_MODELS].sort(() => random() - 0.5);

    for (const product of shuffledProducts) {
        // Skip if we already have enough images
        if (randomImages.length >= threshold) break;

        // Skip if product already used
        if (usedProducts.has(product.id)) continue;

        // Get all available images for this product (thumbnail + gallery)
        const availableImages = [
            product.image,
            ...product.galleryImages
        ].filter(img => !usedImages.has(img)); // Filter out already used images

        if (availableImages.length === 0) continue;

        // Pick a random image from this product's available images
        const randomIndex = Math.floor(random() * availableImages.length);
        const selectedImage = availableImages[randomIndex];

        // Add to results and tracking sets
        randomImages.push(selectedImage);
        usedProducts.add(product.id);
        usedImages.add(selectedImage);
    }

    // If we don't have enough images, fill with remaining unique images
    if (randomImages.length < threshold) {
        const allImages = PRODUCT_MODELS.flatMap(product => [
            product.image,
            ...product.galleryImages
        ]);

        const remainingImages = allImages
            .filter(img => !usedImages.has(img))
            .sort(() => random() - 0.5);

        for (const img of remainingImages) {
            if (randomImages.length >= threshold) break;
            randomImages.push(img);
            usedImages.add(img);
        }
    }

    return randomImages;
}
