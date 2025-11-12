"use client";
import { useRef, use } from "react";
import { notFound } from "next/navigation";
import Navbar from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import ProductDetail from "../../../components/catalogue/ProductDetail";

interface Product {
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    fullDescription: string;
    features: string[];
    specifications: {
        material: string;
        lining: string;
        hardware: string;
        dimensions: string;
        weight: string;
    };
    images: {
        thumbnail: string;
        hover: string;
        gallery: string[];
    };
}

const PRODUCTS_DATA: Product[] = [
    // Women's Bag Models
    {
        slug: "af-01",
        title: "AF-01",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Elegant and functional women's leather bag crafted with precision and care. This model combines timeless design with modern functionality.",
        fullDescription: "The AF-01 represents the perfect fusion of style and practicality. Handcrafted from premium leather, this bag is designed to complement the modern woman's lifestyle. Features spacious interior with multiple compartments for organization. Every stitch, every detail is carefully considered to ensure durability and aesthetic appeal.",
        features: [
            "Premium full-grain leather",
            "Hand-stitched construction",
            "Multiple compartments for organization",
            "Adjustable straps",
            "Durable hardware",
            "Available in multiple colors"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "35cm x 28cm x 12cm",
            weight: "850g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
            ]
        }
    },
    {
        slug: "af-02",
        title: "AF-02",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Sophisticated women's leather bag with elegant design. Perfect for both professional and casual settings.",
        fullDescription: "The AF-02 model showcases refined craftsmanship with attention to every detail. This versatile bag transitions seamlessly from office to evening, offering both style and functionality. Premium leather construction ensures longevity while maintaining a sophisticated appearance.",
        features: [
            "Premium full-grain leather",
            "Hand-stitched construction",
            "Interior zip pocket",
            "Adjustable shoulder strap",
            "Magnetic closure",
            "Dust bag included"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "32cm x 25cm x 10cm",
            weight: "720g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
            ]
        }
    },
    {
        slug: "dermaverde",
        title: "DermaVerde",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Signature DermaVerde collection piece. A statement bag that combines luxury with everyday practicality.",
        fullDescription: "The DermaVerde is our signature piece, representing the pinnacle of our craftsmanship. This exclusive design features unique detailing and premium materials, making it a true investment piece. Perfect for those who appreciate fine leather goods.",
        features: [
            "Signature DermaVerde design",
            "Premium Italian leather",
            "Hand-stitched construction",
            "Multiple compartments",
            "Gold-tone hardware",
            "Limited edition"
        ],
        specifications: {
            material: "Italian full-grain leather",
            lining: "Suede",
            hardware: "Gold-plated brass",
            dimensions: "38cm x 30cm x 14cm",
            weight: "920g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
            ]
        }
    },
    {
        slug: "af-03",
        title: "AF-03",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Versatile women's leather bag with contemporary design. Perfect for daily use with ample storage space.",
        fullDescription: "The AF-03 combines modern aesthetics with practical functionality. This bag features a spacious main compartment and multiple pockets for organization. Crafted from premium leather, it's designed to be your everyday companion.",
        features: [
            "Premium full-grain leather",
            "Spacious main compartment",
            "Multiple interior pockets",
            "Comfortable shoulder strap",
            "Secure zip closure",
            "Lightweight design"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "36cm x 27cm x 11cm",
            weight: "780g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
            ]
        }
    },
    {
        slug: "af-04",
        title: "AF-04",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Compact yet spacious women's bag with elegant silhouette. Ideal for both work and leisure.",
        fullDescription: "The AF-04 strikes the perfect balance between size and functionality. Its compact exterior belies a surprisingly spacious interior, making it ideal for those who want to travel light without sacrificing essentials.",
        features: [
            "Premium full-grain leather",
            "Compact design",
            "Surprisingly spacious interior",
            "Detachable shoulder strap",
            "Magnetic snap closure",
            "Interior zip pocket"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "30cm x 24cm x 9cm",
            weight: "650g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "af-05",
        title: "AF-05",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Classic tote bag design with modern touches. Spacious and stylish for everyday use.",
        fullDescription: "The AF-05 is a timeless tote that never goes out of style. With its generous capacity and structured design, it's perfect for carrying everything you need throughout your day while maintaining an elegant appearance.",
        features: [
            "Premium full-grain leather",
            "Tote bag design",
            "Large capacity",
            "Reinforced handles",
            "Interior organizer pockets",
            "Structured silhouette"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "40cm x 32cm x 13cm",
            weight: "950g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
            ]
        }
    },
    {
        slug: "af-06",
        title: "AF-06",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Sophisticated crossbody bag with adjustable strap. Perfect for hands-free convenience.",
        fullDescription: "The AF-06 offers the ultimate in hands-free convenience without compromising on style. Its crossbody design and adjustable strap make it perfect for busy days, while the premium leather ensures you always look polished.",
        features: [
            "Premium full-grain leather",
            "Crossbody design",
            "Adjustable strap length",
            "Secure flap closure",
            "Multiple card slots",
            "Compact yet functional"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "25cm x 18cm x 8cm",
            weight: "520g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
            ]
        }
    },
    {
        slug: "af-07",
        title: "AF-07",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Evening bag with elegant design. Perfect for special occasions and formal events.",
        fullDescription: "The AF-07 is designed for those special moments when you want to make an impression. Its refined design and premium materials make it the perfect companion for evening events, dinners, and celebrations.",
        features: [
            "Premium full-grain leather",
            "Evening bag design",
            "Elegant silhouette",
            "Chain strap option",
            "Compact interior",
            "Luxurious finish"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Satin",
            hardware: "Gold-plated brass",
            dimensions: "22cm x 15cm x 6cm",
            weight: "380g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
            ]
        }
    },
    // Men's Bag Models
    {
        slug: "mb-01",
        title: "MB-01",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Professional men's leather bag designed for the modern businessman. Combines durability with refined aesthetics.",
        fullDescription: "The MB-01 is crafted for professionals who demand both style and substance. Features dedicated laptop compartment and multiple organizational pockets. Built to withstand daily use while maintaining a polished appearance.",
        features: [
            "Durable leather construction",
            "Padded laptop compartment (15 inch)",
            "Multiple organizational pockets",
            "Reinforced handles",
            "Water-resistant treatment",
            "Professional aesthetic"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "40cm x 30cm x 12cm",
            weight: "1100g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=1200&q=80",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
            ]
        }
    },
    {
        slug: "mb-02",
        title: "MB-02",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Versatile messenger bag for the modern professional. Perfect for daily commute and business travel.",
        fullDescription: "The MB-02 messenger bag combines classic styling with contemporary functionality. Ideal for carrying your laptop, documents, and essentials with ease and style.",
        features: [
            "Durable leather construction",
            "Messenger bag design",
            "Padded laptop sleeve",
            "Adjustable shoulder strap",
            "Quick-access front pocket",
            "Professional look"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "38cm x 28cm x 10cm",
            weight: "950g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80"
            ]
        }
    },
    {
        slug: "mb-03",
        title: "MB-03",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Compact briefcase with timeless design. Perfect for important meetings and presentations.",
        fullDescription: "The MB-03 briefcase exudes professionalism and sophistication. Its compact size makes it easy to carry while still providing ample space for your essentials.",
        features: [
            "Premium leather construction",
            "Briefcase design",
            "Document organizer",
            "Secure lock closure",
            "Comfortable handle",
            "Timeless style"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "42cm x 32cm x 8cm",
            weight: "1200g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
            ]
        }
    },
    {
        slug: "mb-04",
        title: "MB-04",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Backpack design with professional styling. Ideal for tech-savvy professionals.",
        fullDescription: "The MB-04 combines the convenience of a backpack with professional aesthetics. Perfect for those who need to carry more while maintaining a polished appearance.",
        features: [
            "Leather backpack design",
            "Padded laptop compartment",
            "Multiple pockets",
            "Comfortable straps",
            "USB charging port",
            "Modern professional look"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "35cm x 45cm x 15cm",
            weight: "1300g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
            ]
        }
    },
    {
        slug: "mb-05",
        title: "MB-05",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Weekend duffle bag with sophisticated design. Perfect for short trips and gym sessions.",
        fullDescription: "The MB-05 is your perfect weekend companion. Spacious enough for a short trip yet stylish enough for any occasion.",
        features: [
            "Spacious duffle design",
            "Premium leather",
            "Shoe compartment",
            "Adjustable shoulder strap",
            "Multiple pockets",
            "Versatile use"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "50cm x 30cm x 25cm",
            weight: "1400g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80"
            ]
        }
    },
    {
        slug: "mb-06",
        title: "MB-06",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Slim portfolio bag for minimalists. Carries essentials with maximum style.",
        fullDescription: "The MB-06 is designed for those who prefer to travel light. Its slim profile doesn't compromise on functionality or style.",
        features: [
            "Slim portfolio design",
            "Premium leather",
            "Document sleeves",
            "Tablet compartment",
            "Minimalist aesthetic",
            "Lightweight"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "35cm x 27cm x 4cm",
            weight: "650g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
            ]
        }
    },
    {
        slug: "mb-07",
        title: "MB-07",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Crossbody bag with urban style. Perfect for casual outings and everyday use.",
        fullDescription: "The MB-07 offers a more casual approach to men's bags. Its crossbody design provides hands-free convenience with a stylish edge.",
        features: [
            "Crossbody design",
            "Premium leather",
            "Adjustable strap",
            "Multiple compartments",
            "Urban style",
            "Compact size"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "28cm x 22cm x 8cm",
            weight: "580g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=800&q=80",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
            ]
        }
    },
    {
        slug: "womens-bag",
        title: "WOMEN'S BAG",
        subtitle: "LEATHER",
        category: "Bags",
        description: "Elegant and functional women's leather bags crafted with precision and care. Each piece combines timeless design with modern functionality.",
        fullDescription: "Our women's bag collection represents the perfect fusion of style and practicality. Handcrafted from premium leather, each bag is designed to complement the modern woman's lifestyle. From spacious totes to compact crossbody bags, our collection offers versatility without compromising on elegance. Every stitch, every detail is carefully considered to ensure durability and aesthetic appeal.",
        features: [
            "Premium full-grain leather",
            "Hand-stitched construction",
            "Multiple compartments for organization",
            "Adjustable straps",
            "Durable hardware",
            "Available in multiple colors"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Cotton canvas",
            hardware: "Brass",
            dimensions: "Various sizes available",
            weight: "Varies by model"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
                "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
            ]
        }
    },
    {
        slug: "mens-bag",
        title: "MEN'S BAG",
        subtitle: "PRODUCT",
        category: "Bags",
        description: "Sophisticated men's leather bags designed for the modern professional. Combining rugged durability with refined aesthetics.",
        fullDescription: "Our men's bag collection is crafted for those who demand both style and substance. Whether you're heading to the office or embarking on a weekend adventure, these bags are built to last. Featuring robust construction, thoughtful organization, and timeless design, each piece is an investment in quality craftsmanship.",
        features: [
            "Durable leather construction",
            "Laptop compartment",
            "Multiple pockets for organization",
            "Reinforced handles and straps",
            "Water-resistant treatment",
            "Professional aesthetic"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Polyester",
            hardware: "Stainless steel",
            dimensions: "Various sizes available",
            weight: "Varies by model"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1617886322207-baac2c5a3b5d?w=1200&q=80",
                "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
            ]
        }
    },
    // Men's Wallet Models
    {
        slug: "mw-01",
        title: "MW-01",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Slim men's leather wallet with classic bifold design. Perfect for everyday carry.",
        fullDescription: "The MW-01 is a timeless bifold wallet crafted from premium leather. Its slim profile fits comfortably in your pocket while providing ample space for cards and cash. The leather develops a beautiful patina over time.",
        features: [
            "Bifold design",
            "Premium full-grain leather",
            "Multiple card slots",
            "Bill compartment",
            "Slim profile",
            "Ages beautifully"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "None",
            dimensions: "11cm x 9cm x 2cm",
            weight: "80g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "mw-02",
        title: "MW-02",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Minimalist cardholder for the modern man. Compact and functional.",
        fullDescription: "The MW-02 cardholder is designed for those who prefer to carry less. Its minimalist design holds your essential cards while maintaining an ultra-slim profile.",
        features: [
            "Minimalist design",
            "Premium leather",
            "4-6 card capacity",
            "Ultra-slim profile",
            "RFID protection",
            "Durable construction"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "None",
            dimensions: "10cm x 7cm x 0.5cm",
            weight: "40g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "mw-03",
        title: "MW-03",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Trifold wallet with coin pocket. Maximum organization in compact form.",
        fullDescription: "The MW-03 offers exceptional organization with its trifold design. Features a dedicated coin pocket and multiple card slots.",
        features: [
            "Trifold design",
            "Coin pocket",
            "Multiple card slots",
            "Bill compartment",
            "ID window",
            "Compact when folded"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "Snap closure",
            dimensions: "12cm x 10cm x 3cm",
            weight: "120g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "mw-04",
        title: "MW-04",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Money clip wallet for minimalists. Sleek and sophisticated.",
        fullDescription: "The MW-04 combines a money clip with card slots for the ultimate minimalist wallet. Perfect for those who carry cash.",
        features: [
            "Money clip design",
            "Card slots",
            "Slim profile",
            "Premium leather",
            "Stainless steel clip",
            "Minimalist aesthetic"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "Stainless steel clip",
            dimensions: "11cm x 8cm x 1cm",
            weight: "60g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "mw-05",
        title: "MW-05",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Long wallet with zipper closure. Spacious and secure.",
        fullDescription: "The MW-05 long wallet offers maximum capacity with secure zipper closure. Ideal for those who need to carry more.",
        features: [
            "Long wallet design",
            "Zipper closure",
            "Multiple compartments",
            "Coin pocket",
            "Card slots",
            "Spacious interior"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "YKK zipper",
            dimensions: "19cm x 10cm x 2.5cm",
            weight: "150g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "mw-06",
        title: "MW-06",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Vertical wallet with unique design. Stand out from the crowd.",
        fullDescription: "The MW-06 features a unique vertical orientation that sets it apart. Functional and stylish.",
        features: [
            "Vertical design",
            "Premium leather",
            "Card slots",
            "Bill compartment",
            "Unique orientation",
            "Conversation starter"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "None",
            dimensions: "9cm x 12cm x 2cm",
            weight: "90g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "mw-07",
        title: "MW-07",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Travel wallet with passport holder. Perfect for globetrotters.",
        fullDescription: "The MW-07 is designed for travelers. Features dedicated passport slot and multiple compartments for travel documents.",
        features: [
            "Travel wallet design",
            "Passport holder",
            "Multiple compartments",
            "Card slots",
            "Pen holder",
            "Boarding pass pocket"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "None",
            dimensions: "24cm x 13cm x 2cm",
            weight: "180g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    // Women's Wallet Models
    {
        slug: "ww-01",
        title: "WW-01",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Elegant women's wallet with multiple compartments. Style meets functionality.",
        fullDescription: "The WW-01 is designed for the modern woman who values both style and organization. Features multiple card slots and compartments.",
        features: [
            "Elegant design",
            "Multiple compartments",
            "Card slots",
            "Coin pocket",
            "Bill compartment",
            "Premium leather"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "Snap closure",
            dimensions: "19cm x 10cm x 3cm",
            weight: "140g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "ww-02",
        title: "WW-02",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Compact clutch wallet for evenings. Sophisticated and chic.",
        fullDescription: "The WW-02 doubles as a clutch for evening events. Compact yet spacious enough for essentials.",
        features: [
            "Clutch design",
            "Detachable wrist strap",
            "Card slots",
            "Phone pocket",
            "Elegant finish",
            "Versatile use"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Satin",
            hardware: "Gold-tone snap",
            dimensions: "20cm x 11cm x 2cm",
            weight: "160g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "ww-03",
        title: "WW-03",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Zipper wallet with wrist strap. Secure and convenient.",
        fullDescription: "The WW-03 features full zipper closure for maximum security. Includes convenient wrist strap for easy carrying.",
        features: [
            "Zipper closure",
            "Wrist strap",
            "Multiple compartments",
            "Card slots",
            "Coin pocket",
            "Secure design"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "YKK zipper",
            dimensions: "20cm x 11cm x 3cm",
            weight: "170g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "ww-04",
        title: "WW-04",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Slim cardholder for minimalists. Elegant simplicity.",
        fullDescription: "The WW-04 is perfect for those who prefer to carry less. Slim design with essential card slots.",
        features: [
            "Slim cardholder",
            "Premium leather",
            "4-6 card capacity",
            "Minimalist design",
            "RFID protection",
            "Elegant finish"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "None",
            dimensions: "10cm x 7cm x 0.5cm",
            weight: "35g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "ww-05",
        title: "WW-05",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Trifold wallet with photo slots. Keep memories close.",
        fullDescription: "The WW-05 features photo slots alongside card compartments. Perfect for keeping loved ones close.",
        features: [
            "Trifold design",
            "Photo slots",
            "Card compartments",
            "Coin pocket",
            "Bill compartment",
            "Sentimental design"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "Snap closure",
            dimensions: "13cm x 10cm x 3cm",
            weight: "130g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "ww-06",
        title: "WW-06",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Envelope wallet with flap closure. Timeless elegance.",
        fullDescription: "The WW-06 features a classic envelope design with magnetic flap closure. Timeless and sophisticated.",
        features: [
            "Envelope design",
            "Magnetic flap",
            "Card slots",
            "Bill compartment",
            "Slim profile",
            "Timeless style"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "Magnetic closure",
            dimensions: "19cm x 9cm x 1.5cm",
            weight: "110g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "ww-07",
        title: "WW-07",
        subtitle: "LEATHER",
        category: "Wallets",
        description: "Crossbody wallet phone case. Hands-free convenience.",
        fullDescription: "The WW-07 combines wallet and phone case with crossbody strap. Perfect for hands-free days.",
        features: [
            "Phone case wallet",
            "Crossbody strap",
            "Card slots",
            "Adjustable strap",
            "Hands-free design",
            "Multi-functional"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Microfiber",
            hardware: "Adjustable strap",
            dimensions: "18cm x 10cm x 2cm",
            weight: "120g"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
            ]
        }
    },
    {
        slug: "wallet",
        title: "WALLET",
        subtitle: "LEATHER",
        category: "Accessories",
        description: "Slim and elegant leather wallets that fit perfectly in your pocket. Designed for everyday carry with style and functionality.",
        fullDescription: "Our wallet collection showcases the art of minimalist design. Each wallet is carefully crafted to hold your essentials without the bulk. Premium leather ages beautifully over time, developing a unique patina that tells your story. From classic bifolds to modern cardholders, we offer styles that suit every preference.",
        features: [
            "Slim profile design",
            "RFID protection available",
            "Multiple card slots",
            "Bill compartment",
            "Coin pocket options",
            "Premium leather that ages beautifully"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Leather",
            hardware: "None or minimal",
            dimensions: "Standard wallet sizes",
            weight: "Lightweight"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
            ]
        }
    },
    {
        slug: "belt",
        title: "BELT",
        subtitle: "VISUAL STORYTELLING",
        category: "Accessories",
        description: "Handcrafted leather belts that complete your look. Built to last with premium materials and expert craftsmanship.",
        fullDescription: "A belt is more than just a functional accessory—it's a statement piece. Our leather belts are crafted from single pieces of premium leather, ensuring strength and longevity. Each belt features carefully selected hardware and precise stitching. Available in various widths and finishes, our belts complement both casual and formal attire.",
        features: [
            "Single-piece leather construction",
            "Solid brass or stainless steel buckles",
            "Hand-finished edges",
            "Multiple hole spacing",
            "Various width options",
            "Classic and contemporary styles"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "None (single piece)",
            hardware: "Brass or stainless steel buckle",
            dimensions: "Various lengths and widths",
            weight: "Medium"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1664285612706-b32633c95820?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=958",
            hover: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1664285612706-b32633c95820?w=800&q=80",
                "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=1200&q=80"
            ]
        }
    },
    {
        slug: "other-hard-goods",
        title: "OTHER HARD GOODS",
        subtitle: "COLLECTION",
        category: "Accessories",
        description: "A curated collection of leather accessories and hard goods. From keychains to cardholders, each piece is crafted with attention to detail.",
        fullDescription: "Our hard goods collection encompasses a range of leather accessories designed to enhance your daily life. Each item is crafted with the same attention to detail and quality standards as our larger pieces. These accessories make perfect gifts or personal indulgences, offering a taste of luxury in everyday objects.",
        features: [
            "Diverse product range",
            "Premium leather construction",
            "Functional designs",
            "Gift-ready presentation",
            "Durable hardware",
            "Timeless aesthetics"
        ],
        specifications: {
            material: "Full-grain leather",
            lining: "Varies by product",
            hardware: "Brass or stainless steel",
            dimensions: "Varies by product",
            weight: "Varies by product"
        },
        images: {
            thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            hover: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
            gallery: [
                "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80"
            ]
        }
    }
];

interface PageProps {
    params: Promise<{
        category: string;
        productId: string;
    }>;
}

export default function ProductPage({ params }: PageProps) {
    const navRef = useRef<HTMLElement>(null);
    const { category, productId } = use(params);
    const product = PRODUCTS_DATA.find((p) => p.slug === productId);

    if (!product) {
        notFound();
    }

    // Category slug to product slug mapping
    const CATEGORY_PRODUCTS: Record<string, string[]> = {
        "womens-bag": ["af-01", "af-02", "dermaverde", "af-03", "af-04", "af-05", "af-06", "af-07"],
        "mens-bag": ["mb-01", "mb-02", "mb-03", "mb-04", "mb-05", "mb-06", "mb-07"],
        "mens-wallet": ["mw-01", "mw-02", "mw-03", "mw-04", "mw-05", "mw-06", "mw-07"],
        "womens-wallet": ["ww-01", "ww-02", "ww-03", "ww-04", "ww-05", "ww-06", "ww-07"],
        "belt": ["bl-01", "bl-02", "bl-03", "bl-04", "bl-05", "bl-06", "bl-07"],
        "other-hard-goods": ["hg-01", "hg-02", "hg-03", "hg-04", "hg-05", "hg-06", "hg-07"]
    };

    // Get products in the same category
    const categoryProductSlugs = CATEGORY_PRODUCTS[category] || [];
    const currentIndex = categoryProductSlugs.indexOf(productId);

    // Find previous and next products within the same category
    const previousProduct = currentIndex > 0 ? (() => {
        const prevSlug = categoryProductSlugs[currentIndex - 1];
        const prevProduct = PRODUCTS_DATA.find((p) => p.slug === prevSlug);
        return prevProduct ? {
            slug: prevProduct.slug,
            title: prevProduct.title,
            image: prevProduct.images.thumbnail
        } : undefined;
    })() : undefined;

    const nextProduct = currentIndex < categoryProductSlugs.length - 1 ? (() => {
        const nextSlug = categoryProductSlugs[currentIndex + 1];
        const nextProd = PRODUCTS_DATA.find((p) => p.slug === nextSlug);
        return nextProd ? {
            slug: nextProd.slug,
            title: nextProd.title,
            image: nextProd.images.thumbnail
        } : undefined;
    })() : undefined;

    return (
        <>
            <Navbar navRef={navRef} />
            <main className="relative w-full bg-black">
                <ProductDetail
                    product={product}
                    categorySlug={category}
                    previousProduct={previousProduct}
                    nextProduct={nextProduct}
                />
            </main>
            <Footer />
        </>
    );
}
