#!/usr/bin/env node

/**
 * ImageKit Migration Script
 * Automatically converts all local /assets paths to ImageKit CDN URLs
 * 
 * Usage: node scripts/migrate-to-imagekit.js
 */

const fs = require('fs');
const path = require('path');

const IMAGEKIT_BASE = 'https://ik.imagekit.io/zqjkk9ui6';

// Files to update
const filesToUpdate = [
    // Components
    'src/app/components/who_we_are/ProcessSection.tsx',
    'src/app/components/catalogue/ProductsSection.tsx',
    'src/app/components/home/WhatWeMake.tsx',
    'src/app/components/home/VideoCurtain.tsx',
    'src/app/components/home/KeyFigures.tsx',
    'src/app/components/home/WhoWeAre.tsx',
    'src/app/components/home/LogoSection.tsx',

    // Data files
    'src/data/ourStory.ts',
    'src/data/catalogProducts.ts',

    // Config files
    'src/lib/seo.ts',
    'src/app/manifest.ts',
];

function convertPath(localPath) {
    // Remove /assets prefix and prepend ImageKit URL
    return localPath.replace(/["']\/assets\/(images|videos)\/([^"']+)["']/g, (match, type, rest) => {
        return `"${IMAGEKIT_BASE}/${type}/${rest}"`;
    });
}

function migrateFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        return;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const updated = convertPath(content);

    if (content === updated) {
        console.log(`✓ No changes needed: ${filePath}`);
        return;
    }

    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
}

console.log('🚀 Starting ImageKit migration...\n');

filesToUpdate.forEach(migrateFile);

console.log('\n✨ Migration complete!');
console.log('\n📝 Next steps:');
console.log('1. Review changes with: git diff');
console.log('2. Test the application: npm run dev');
console.log('3. If everything looks good, you can delete /public/assets/images');
console.log('4. Keep /public/assets/fonts (not on ImageKit)');
