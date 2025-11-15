#!/bin/bash
set -e

cd "public/assets/images/catalog_images"

echo "=== Step 1: Recursively rename all directories to lowercase with underscores ==="

# Function to rename directories recursively (depth-first)
rename_dirs() {
    local dir="$1"
    
    # First, recurse into subdirectories
    for subdir in "$dir"*/; do
        [ -d "$subdir" ] || continue
        rename_dirs "$subdir"
    done
    
    # Then rename directories in current level
    for d in "$dir"*/; do
        [ -d "$d" ] || continue
        
        # Get basename and parent
        base=$(basename "$d")
        parent=$(dirname "$d")
        
        # Convert to lowercase with underscores
        new_base=$(echo "$base" | tr 'A-Z ' 'a-z_')
        
        # Rename if different
        if [ "$base" != "$new_base" ]; then
            echo "Renaming directory: $d -> $parent/$new_base"
            mv "$d" "$parent/$new_base"
        fi
    done
}

# Start recursive renaming from current directory
rename_dirs "./"

echo ""
echo "=== Step 2: Find and compress all image files recursively ==="

# Find all image files (png, jpg, jpeg) recursively
find . -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r filepath; do
    # Get directory and filename
    dir=$(dirname "$filepath")
    filename=$(basename "$filepath")
    
    # Convert filename to lowercase with underscores (without extension)
    name_no_ext="${filename%.*}"
    new_name=$(echo "$name_no_ext" | tr 'A-Z ' 'a-z_')
    output="$dir/${new_name}.webp"
    
    echo "Compressing: $filepath -> $output"
    
    # Compress to WebP
    ffmpeg -y -loglevel error -i "$filepath" -vcodec libwebp -lossless 0 -q:v 75 -compression_level 6 "$output"
    
    # Delete original after successful compression
    if [ -f "$output" ]; then
        rm "$filepath"
        echo "  ✓ Deleted original: $filepath"
    else
        echo "  ✗ Warning: Failed to create $output, keeping original"
    fi
done

echo ""
echo "=== All done! ==="
echo "Directory structure normalized and all images compressed to WebP"
