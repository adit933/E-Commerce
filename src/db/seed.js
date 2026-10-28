import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./index.js";
import { Category } from "../models/category.models.js";
import { Product } from "../models/product.models.js";
import slugify from "slugify";

// Ensure environment variables are loaded regardless of current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

/**
 * Seed Dataset:
 * 10 Categories, exactly 15 realistic products per category = 150 products total.
 * 
 * Supplied Pexels Photo:
 * https://images.pexels.com/photos/5926245/pexels-photo-5926245.jpeg (Tote/Shopping bags)
 * Used in "Bags and Accessories" where photograph context is authentic.
 */
const seedData = [
  // ==========================================
  // 1. FOOTWEAR (15 Products)
  // ==========================================
  {
    name: "Footwear",
    description: "Explore premium men's and women's footwear ranging from high-performance running shoes and sneakers to casual loafers and formal shoes.",
    products: [
      {
        name: "Nike Air Zoom Pegasus 40",
        description: "Responsive road running shoes featuring dual Zoom Air units and engineered mesh upper for lightweight breathability and comfort.",
        price: 10495,
        discountPercentage: 15,
        stock: 45,
        brand: "Nike",
        rating: 4.6,
        numReviews: 320,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_nike_pegasus40" }]
      },
      {
        name: "Adidas Ultraboost Light Running Shoes",
        description: "Next-generation running shoes engineered with 30% lighter Boost material and a Primeknit+ adaptive upper for high energy return.",
        price: 14999,
        discountPercentage: 20,
        stock: 30,
        brand: "Adidas",
        rating: 4.8,
        numReviews: 450,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_adidas_ultraboost" }]
      },
      {
        name: "Puma Velocity Nitro 2 Running Shoes",
        description: "Versatile daily running shoe with Nitro foam cushioning for explosive response and PumaGrip rubber outsole for multi-surface traction.",
        price: 7499,
        discountPercentage: 25,
        stock: 50,
        brand: "Puma",
        rating: 4.4,
        numReviews: 180,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_puma_nitro2" }]
      },
      {
        name: "Skechers Go Walk 6 Walking Shoes",
        description: "Slip-on walking shoes built with high-rebound Hyper Pillar technology and Air-Cooled Goga Mat insole for all-day comfort.",
        price: 4999,
        discountPercentage: 10,
        stock: 65,
        brand: "Skechers",
        rating: 4.5,
        numReviews: 290,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_skechers_gowalk6" }]
      },
      {
        name: "Asics Gel-Kayano 30 Stability Shoes",
        description: "Engineered stability road running shoes featuring 4D Guidance System and PureGEL cushioning for structured distance training.",
        price: 13599,
        discountPercentage: 12,
        stock: 25,
        brand: "Asics",
        rating: 4.7,
        numReviews: 210,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_asics_kayano30" }]
      },
      {
        name: "Nike Air Force 1 '07 Sneakers",
        description: "Iconic streetwear basketball shoes crafted with crisp stitched leather overlays and encapsulated Nike Air cushioning.",
        price: 8195,
        discountPercentage: 5,
        stock: 40,
        brand: "Nike",
        rating: 4.8,
        numReviews: 890,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_nike_af1" }]
      },
      {
        name: "Adidas Originals Stan Smith Shoes",
        description: "Timeless court sneakers made with sustainable Primegreen materials, perforated 3-Stripes, and clean minimalist white aesthetics.",
        price: 6999,
        discountPercentage: 15,
        stock: 55,
        brand: "Adidas",
        rating: 4.5,
        numReviews: 610,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_adidas_stansmith" }]
      },
      {
        name: "Puma Smash v2 Leather Sneakers",
        description: "Classic tennis-inspired everyday sneakers with soft synthetic leather upper, comfortable sockliner, and durable rubber sole.",
        price: 2499,
        discountPercentage: 35,
        stock: 85,
        brand: "Puma",
        rating: 4.2,
        numReviews: 740,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_puma_smashv2" }]
      },
      {
        name: "Woodland Camel Outdoor Leather Boots",
        description: "Heavy-duty outdoor ankle boots designed with genuine nubuck leather, rust-resistant eyelets, and grooved traction rubber soles.",
        price: 4295,
        discountPercentage: 20,
        stock: 35,
        brand: "Woodland",
        rating: 4.3,
        numReviews: 310,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_woodland_boots" }]
      },
      {
        name: "Clarks Tilden Walk Oxford Formal Shoes",
        description: "Sophisticated derby lace-up formal dress shoes made with genuine full-grain leather and Cushion Soft foam padding.",
        price: 5499,
        discountPercentage: 18,
        stock: 28,
        brand: "Clarks",
        rating: 4.4,
        numReviews: 150,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_clarks_oxford" }]
      },
      {
        name: "Red Tape Classic Derby Formal Shoes",
        description: "Polished black formal leather shoes for office wear, featuring perforated brogue styling and shock-absorbing TPR soles.",
        price: 1899,
        discountPercentage: 60,
        stock: 90,
        brand: "Red Tape",
        rating: 4.1,
        numReviews: 520,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_redtape_derby" }]
      },
      {
        name: "Bata Comfit Casual Slip-On Loafers",
        description: "Lightweight flexible everyday driving loafers crafted with soft faux leather and memory-foam cushioned footbeds.",
        price: 1499,
        discountPercentage: 15,
        stock: 70,
        brand: "Bata",
        rating: 4.0,
        numReviews: 230,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_bata_loafers" }]
      },
      {
        name: "Reebok Nano X3 Training Shoes",
        description: "High-performance cross-training and gym shoes equipped with Lift and Run Chassis system and Flexweave woven upper.",
        price: 8999,
        discountPercentage: 22,
        stock: 32,
        brand: "Reebok",
        rating: 4.6,
        numReviews: 175,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_reebok_nanox3" }]
      },
      {
        name: "Converse Chuck Taylor All Star Canvas",
        description: "The world's most iconic high-top canvas sneaker with vulcanized rubber sole, classic star ankle patch, and vintage vibe.",
        price: 3999,
        discountPercentage: 10,
        stock: 60,
        brand: "Converse",
        rating: 4.7,
        numReviews: 950,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_converse_chucktaylor" }]
      },
      {
        name: "Crocs Classic Unisex Clogs",
        description: "Iconic lightweight ventilated clogs made from signature Croslite material with pivoting heel straps for versatile wear.",
        price: 2995,
        discountPercentage: 15,
        stock: 110,
        brand: "Crocs",
        rating: 4.6,
        numReviews: 1420,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", public_id: "footwear_crocs_classic" }]
      }
    ]
  },

  // ==========================================
  // 2. CLOTHING (15 Products)
  // ==========================================
  {
    name: "Clothing",
    description: "Discover contemporary fashion apparel for everyday lifestyle, formal office wear, active athletic workouts, and casual outings.",
    products: [
      {
        name: "Levi's 511 Slim Fit Men's Jeans",
        description: "Modern slim-cut stretch denim jeans designed with room to move, five-pocket styling, and durable reinforced stitching.",
        price: 2799,
        discountPercentage: 20,
        stock: 75,
        brand: "Levi's",
        rating: 4.5,
        numReviews: 620,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_levis_511" }]
      },
      {
        name: "Levi's 501 Original Straight Fit Jeans",
        description: "The timeless original straight-leg blue denim jeans with signature button fly, copper rivets, and non-stretch rugged twill.",
        price: 3499,
        discountPercentage: 15,
        stock: 50,
        brand: "Levi's",
        rating: 4.6,
        numReviews: 480,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_levis_501" }]
      },
      {
        name: "Allen Solly Men's Slim Fit Formal Shirt",
        description: "Crisp cotton formal button-down work shirt tailored with a spread collar, single-cuff sleeves, and wrinkle-resistant fabric.",
        price: 1699,
        discountPercentage: 25,
        stock: 80,
        brand: "Allen Solly",
        rating: 4.3,
        numReviews: 340,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_allensolly_shirt" }]
      },
      {
        name: "Peter England Men's Cotton Formal Trousers",
        description: "Flat-front slim-fit formal trousers crafted from a breathable cotton blend with slanted side pockets for corporate wear.",
        price: 1499,
        discountPercentage: 30,
        stock: 65,
        brand: "Peter England",
        rating: 4.2,
        numReviews: 290,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_peterengland_trousers" }]
      },
      {
        name: "U.S. Polo Assn. Solid Cotton Polo T-Shirt",
        description: "Breathable piqué cotton polo shirt featuring signature embroidered chest logo, ribbed collar, and two-button placket.",
        price: 1299,
        discountPercentage: 35,
        stock: 95,
        brand: "U.S. Polo Assn.",
        rating: 4.4,
        numReviews: 780,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_uspa_polo" }]
      },
      {
        name: "Nike Dri-FIT Men's Training T-Shirt",
        description: "Sweat-wicking athletic workout tee with Dri-FIT microfiber polyester fabric to keep you cool and dry during intense sets.",
        price: 1795,
        discountPercentage: 10,
        stock: 60,
        brand: "Nike",
        rating: 4.6,
        numReviews: 410,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_nike_drifit" }]
      },
      {
        name: "Adidas Essentials 3-Stripes Tracksuit",
        description: "Complete sporty training tracksuit including zip jacket and tapered pants finished with iconic 3-stripes down both sides.",
        price: 4599,
        discountPercentage: 25,
        stock: 40,
        brand: "Adidas",
        rating: 4.5,
        numReviews: 260,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_adidas_tracksuit" }]
      },
      {
        name: "Puma Men's Full-Zip Fleece Hoodie",
        description: "Warm casual pullover fleece hoodie with drawcord adjustable hood, kangaroo pockets, and soft brushed interior lining.",
        price: 2499,
        discountPercentage: 40,
        stock: 55,
        brand: "Puma",
        rating: 4.3,
        numReviews: 310,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_puma_hoodie" }]
      },
      {
        name: "Zara Regular Fit Linen Blend Casual Shirt",
        description: "Relaxed resort-collar casual shirt woven from airy linen blend yarn for premium lightweight comfort during warmer seasons.",
        price: 2990,
        discountPercentage: 10,
        stock: 35,
        brand: "Zara",
        rating: 4.4,
        numReviews: 190,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_zara_linen" }]
      },
      {
        name: "H&M Relaxed Fit Heavyweight Crewneck Sweatshirt",
        description: "Drop-shoulder relaxed streetwear pullover sweatshirt tailored with soft brushed thermal cotton blend and ribbed trims.",
        price: 1999,
        discountPercentage: 15,
        stock: 70,
        brand: "H&M",
        rating: 4.5,
        numReviews: 530,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_hm_sweatshirt" }]
      },
      {
        name: "Tommy Hilfiger Casual Checked Oxford Shirt",
        description: "Classic American check button-down casual shirt with embroidered flag logo on the chest and premium combed cotton weave.",
        price: 3999,
        discountPercentage: 20,
        stock: 30,
        brand: "Tommy Hilfiger",
        rating: 4.6,
        numReviews: 180,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_tommy_oxford" }]
      },
      {
        name: "Raymond Contemporary Fit Two-Piece Suit",
        description: "Tailored poly-wool formal two-piece blazer and trouser set crafted for weddings, formal receptions, and executive boardroom meetings.",
        price: 8999,
        discountPercentage: 15,
        stock: 20,
        brand: "Raymond",
        rating: 4.7,
        numReviews: 110,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_raymond_suit" }]
      },
      {
        name: "Wrangler Men's Regular Fit Denim Jacket",
        description: "Rugged trucker style denim jacket featuring button-flap chest pockets, welt hand pockets, and adjustable waist tabs.",
        price: 2999,
        discountPercentage: 30,
        stock: 45,
        brand: "Wrangler",
        rating: 4.4,
        numReviews: 220,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_wrangler_jacket" }]
      },
      {
        name: "Under Armour Tech 2.0 Short Sleeve Tee",
        description: "Ultra-soft quick-drying gym shirt designed with 4-way stretch fabrication and anti-odor technology for athletes.",
        price: 1999,
        discountPercentage: 15,
        stock: 50,
        brand: "Under Armour",
        rating: 4.5,
        numReviews: 160,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_underarmour_tee" }]
      },
      {
        name: "Flying Machine Mid-Rise Skinny Fit Jeans",
        description: "Youthful washed denim jeans with heavy enzyme washing, comfortable stretch recovery, and classic back pocket stitching.",
        price: 1599,
        discountPercentage: 45,
        stock: 85,
        brand: "Flying Machine",
        rating: 4.1,
        numReviews: 390,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg", public_id: "clothing_flyingmachine_jeans" }]
      }
    ]
  },

  // ==========================================
  // 3. ELECTRONICS (15 Products)
  // ==========================================
  {
    name: "Electronics",
    description: "High-grade audio gear, portable speakers, streaming accessories, and digital electronics from world-renowned audio and tech manufacturers.",
    products: [
      {
        name: "Sony WH-1000XM5 Wireless Headphones",
        description: "Industry-leading wireless noise cancelling over-ear headphones with two processors, eight microphones, and 30 hours of battery life.",
        price: 26990,
        discountPercentage: 15,
        stock: 25,
        brand: "Sony",
        rating: 4.8,
        numReviews: 890,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_sony_wh1000xm5" }]
      },
      {
        name: "Bose QuietComfort 45 Bluetooth Headphones",
        description: "Legendary noise cancelling headphones with TriPort acoustic architecture, Quiet and Aware modes, and plush ear cushions.",
        price: 22900,
        discountPercentage: 12,
        stock: 20,
        brand: "Bose",
        rating: 4.7,
        numReviews: 420,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_bose_qc45" }]
      },
      {
        name: "Sennheiser HD 450SE Bluetooth Wireless Headphones",
        description: "Active noise cancellation wireless closed-back headphones with AAC and aptX Low Latency support and 30-hour playback.",
        price: 7990,
        discountPercentage: 40,
        stock: 35,
        brand: "Sennheiser",
        rating: 4.3,
        numReviews: 260,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_sennheiser_hd450se" }]
      },
      {
        name: "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
        description: "Rugged IP67 waterproof and dustproof portable Bluetooth speaker delivering powerful 2-way sound with deep dual passive radiators.",
        price: 9999,
        discountPercentage: 20,
        stock: 60,
        brand: "JBL",
        rating: 4.6,
        numReviews: 1150,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_jbl_flip6" }]
      },
      {
        name: "Marshall Emberton II Wireless Bluetooth Speaker",
        description: "Iconic vintage-inspired compact portable speaker featuring True Stereophonic 360-degree sound and 30+ hours of playtime.",
        price: 14999,
        discountPercentage: 10,
        stock: 30,
        brand: "Marshall",
        rating: 4.7,
        numReviews: 340,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_marshall_emberton2" }]
      },
      {
        name: "boAt Rockerz 450 On-Ear Bluetooth Headphones",
        description: "Affordable wireless on-ear headset packing 40mm dynamic drivers, padded earcups, and up to 15 hours of musical playtime.",
        price: 1299,
        discountPercentage: 65,
        stock: 150,
        brand: "boAt",
        rating: 4.1,
        numReviews: 3200,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_boat_rockerz450" }]
      },
      {
        name: "Sony WF-1000XM5 True Wireless Earbuds",
        description: "Premium noise cancelling earbuds powered by dual feedback microphones, high-resolution audio wireless, and AI call clarity.",
        price: 21990,
        discountPercentage: 10,
        stock: 40,
        brand: "Sony",
        rating: 4.6,
        numReviews: 310,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_sony_wf1000xm5" }]
      },
      {
        name: "Apple AirPods Pro (2nd Generation, USB-C)",
        description: "Adaptive Audio wireless earbuds with H2 chip, Pro-level Active Noise Cancellation, personalized spatial audio, and MagSafe case.",
        price: 22999,
        discountPercentage: 8,
        stock: 45,
        brand: "Apple",
        rating: 4.9,
        numReviews: 1850,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_apple_airpodspro2" }]
      },
      {
        name: "JBL Cinema SB271 Dolby Digital Soundbar 220W",
        description: "2.1 channel soundbar with wireless subwoofer delivering 220W of room-filling sound with dedicated voice clarity sound mode.",
        price: 10999,
        discountPercentage: 35,
        stock: 25,
        brand: "JBL",
        rating: 4.4,
        numReviews: 490,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_jbl_sb271" }]
      },
      {
        name: "boAt Airdopes 141 Bluetooth Truly Wireless Earbuds",
        description: "Budget TWS earbuds boasting 42 hours total playback, ENx noise cancellation for calls, and ASAP Charge fast re-powering.",
        price: 1099,
        discountPercentage: 70,
        stock: 200,
        brand: "boAt",
        rating: 4.0,
        numReviews: 4500,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_boat_airdopes141" }]
      },
      {
        name: "Anker Soundcore Motion+ Hi-Res Bluetooth Speaker",
        description: "30W portable Hi-Res audio speaker with ultra-wide frequency range, custom EQ, and BassUp technology for punchy low-ends.",
        price: 7499,
        discountPercentage: 25,
        stock: 35,
        brand: "Anker",
        rating: 4.5,
        numReviews: 280,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_anker_motionplus" }]
      },
      {
        name: "Amazon Echo Dot 5th Gen Smart Speaker with Alexa",
        description: "Smart voice-controlled speaker with vibrant bass response, motion detection sensor, and built-in smart home automation controls.",
        price: 4499,
        discountPercentage: 20,
        stock: 90,
        brand: "Amazon",
        rating: 4.4,
        numReviews: 1600,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_amazon_echodot5" }]
      },
      {
        name: "Sony SRS-XB100 Compact Wireless Speaker",
        description: "Pocket-sized Bluetooth speaker with sound diffusion processor, extra bass tuning, IP67 waterproof shell, and 16-hour battery.",
        price: 3990,
        discountPercentage: 20,
        stock: 70,
        brand: "Sony",
        rating: 4.5,
        numReviews: 530,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_sony_xb100" }]
      },
      {
        name: "OnePlus Bullets Wireless Z2 Neckband Earphones",
        description: "Ergonomic magnetic neckband earphones featuring 12.4mm bass drivers, IP55 sweat resistance, and 30 hours of continuous battery.",
        price: 1699,
        discountPercentage: 25,
        stock: 130,
        brand: "OnePlus",
        rating: 4.3,
        numReviews: 2100,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_oneplus_bulletsz2" }]
      },
      {
        name: "Marshall Stanmore III Bluetooth Home Speaker",
        description: "Heavy-duty home audio speaker with vintage fret fretwork, brass analog control knobs, and wide multi-directional soundstage.",
        price: 34999,
        discountPercentage: 5,
        stock: 15,
        brand: "Marshall",
        rating: 4.8,
        numReviews: 140,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", public_id: "elec_marshall_stanmore3" }]
      }
    ]
  },

  // ==========================================
  // 4. HOME APPLIANCES (15 Products)
  // ==========================================
  {
    name: "Home Appliances",
    description: "Energy-efficient and reliable kitchen and home utility appliances engineered to enhance modern domestic comfort and convenience.",
    products: [
      {
        name: "LG 242L 3-Star Smart Inverter Double Door Refrigerator",
        description: "Frost-free double door refrigerator with smart inverter compressor, Door Cooling+ airflow vents, and toughened glass shelves.",
        price: 25990,
        discountPercentage: 22,
        stock: 20,
        brand: "LG",
        rating: 4.5,
        numReviews: 680,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_lg_242l_fridge" }]
      },
      {
        name: "Samsung 236L 3-Star Digital Inverter Frost-Free Refrigerator",
        description: "Double door refrigerator featuring energy-saving Digital Inverter technology, all-around cooling vents, and deodorizing filter.",
        price: 24490,
        discountPercentage: 20,
        stock: 25,
        brand: "Samsung",
        rating: 4.4,
        numReviews: 540,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_samsung_236l_fridge" }]
      },
      {
        name: "Whirlpool 190L 4-Star Single Door Direct-Cool Refrigerator",
        description: "Compact single door refrigerator featuring 9 hours of cooling retention during power cuts and easy manual defrosting.",
        price: 15290,
        discountPercentage: 18,
        stock: 35,
        brand: "Whirlpool",
        rating: 4.3,
        numReviews: 430,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_whirlpool_190l_fridge" }]
      },
      {
        name: "LG 7 Kg 5-Star Fully-Automatic Front Loading Washing Machine",
        description: "Inverter Direct Drive front load washer with steam wash hygiene cycle, 6 Motion DD technology, and whisper-quiet motor.",
        price: 28990,
        discountPercentage: 24,
        stock: 18,
        brand: "LG",
        rating: 4.6,
        numReviews: 810,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_lg_7kg_frontload" }]
      },
      {
        name: "Samsung 7 Kg 5-Star Fully-Automatic Top Load Washing Machine",
        description: "Top loading washing machine with EcoBubble technology, Diamond Drum fabric care, and Magic Filter for lint-free garments.",
        price: 16990,
        discountPercentage: 23,
        stock: 30,
        brand: "Samsung",
        rating: 4.3,
        numReviews: 650,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_samsung_7kg_topload" }]
      },
      {
        name: "IFB 6.5 Kg 5-Star Front Load Washing Machine",
        description: "German-engineered front load washing machine with Aqua Energie hard water treatment filter, cradle wash, and auto imbalance correction.",
        price: 23490,
        discountPercentage: 19,
        stock: 15,
        brand: "IFB",
        rating: 4.4,
        numReviews: 320,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_ifb_65kg_washer" }]
      },
      {
        name: "Philips HD9252/90 4.1L Digital Air Fryer",
        description: "Rapid Air technology electric air fryer requiring up to 90% less oil, complete with touchscreen LED display and 7 cooking presets.",
        price: 7999,
        discountPercentage: 30,
        stock: 50,
        brand: "Philips",
        rating: 4.6,
        numReviews: 920,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_philips_airfryer" }]
      },
      {
        name: "Panasonic 23L Convection Microwave Oven",
        description: "All-in-one convection microwave oven with 360-degree heat distribution, 61 auto cook menus, and stainless steel interior cavity.",
        price: 10490,
        discountPercentage: 28,
        stock: 25,
        brand: "Panasonic",
        rating: 4.4,
        numReviews: 380,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_panasonic_microwave" }]
      },
      {
        name: "Dyson V8 Absolute Cordless Vacuum Cleaner",
        description: "Lightweight cordless stick vacuum powered by digital motor V8 with whole-machine filtration capturing 99.99% of microscopic dust.",
        price: 29900,
        discountPercentage: 15,
        stock: 12,
        brand: "Dyson",
        rating: 4.7,
        numReviews: 290,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_dyson_v8_vacuum" }]
      },
      {
        name: "Eureka Forbes Quick Clean DX 1200W Canister Vacuum",
        description: "Compact 1200-watt canister vacuum cleaner with dust bag full indicator, automatic cord winder, and versatile accessory attachments.",
        price: 3499,
        discountPercentage: 35,
        stock: 40,
        brand: "Eureka Forbes",
        rating: 4.1,
        numReviews: 560,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_eureka_vacuum" }]
      },
      {
        name: "Havells 25L Storage Water Heater Geyser",
        description: "5-star rated electric storage water heater with Feroglas-coated inner tank, Incoloy glass-lined heating element, and shock-safe plug.",
        price: 8290,
        discountPercentage: 32,
        stock: 30,
        brand: "Havells",
        rating: 4.3,
        numReviews: 310,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_havells_geyser" }]
      },
      {
        name: "Crompton Ozone 75L Desert Air Cooler",
        description: "Heavy-duty desert air cooler featuring high-density honeycomb cooling pads, motorized louvers, and an ice chamber for rapid cooling.",
        price: 9999,
        discountPercentage: 28,
        stock: 22,
        brand: "Crompton",
        rating: 4.2,
        numReviews: 450,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_crompton_cooler" }]
      },
      {
        name: "Bajaj Majesty 16-Litre Oven Toaster Griller",
        description: "Stainless steel OTG oven with baking, grilling, and toasting modes, 60-minute auto shut-off timer, and cool-touch handles.",
        price: 3299,
        discountPercentage: 25,
        stock: 45,
        brand: "Bajaj",
        rating: 4.1,
        numReviews: 270,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_bajaj_otg" }]
      },
      {
        name: "Voltas 1.5 Ton 3-Star Inverter Split Air Conditioner",
        description: "Adjustable 4-in-1 inverter split AC with 100% copper condenser coil, anti-dust filter, and turbo cooling for peak summer heat.",
        price: 31990,
        discountPercentage: 35,
        stock: 15,
        brand: "Voltas",
        rating: 4.3,
        numReviews: 730,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_voltas_15ton_ac" }]
      },
      {
        name: "Mi Smart Air Purifier 4 with True HEPA Filter",
        description: "Intelligent indoor air purifier with 360-degree filtration, high-precision laser particle sensor, and smart app voice controls.",
        price: 13999,
        discountPercentage: 12,
        stock: 28,
        brand: "Xiaomi",
        rating: 4.5,
        numReviews: 340,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg", public_id: "appl_mi_airpurifier4" }]
      }
    ]
  },

  // ==========================================
  // 5. MOBILE PHONES (15 Products)
  // ==========================================
  {
    name: "Mobile Phones",
    description: "Flagship smartphones, mid-range value champions, and dependable mobile phones packed with latest processors and cameras.",
    products: [
      {
        name: "Apple iPhone 15 (128GB, Black)",
        description: "Dynamic Island flagship smartphone featuring 48MP main camera, A16 Bionic chip, all-day battery life, and universal USB-C.",
        price: 69999,
        discountPercentage: 12,
        stock: 35,
        brand: "Apple",
        rating: 4.8,
        numReviews: 2100,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_apple_iphone15" }]
      },
      {
        name: "Apple iPhone 15 Pro Max (256GB, Natural Titanium)",
        description: "Titanium aerospace design smartphone with A17 Pro gaming chip, customizable Action button, and 5x optical telephoto lens.",
        price: 148900,
        discountPercentage: 5,
        stock: 15,
        brand: "Apple",
        rating: 4.9,
        numReviews: 950,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_apple_iphone15promax" }]
      },
      {
        name: "Samsung Galaxy S24 Ultra 5G (256GB, Titanium Gray)",
        description: "AI-powered flagship smartphone with built-in S-Pen, Snapdragon 8 Gen 3 processor, 200MP camera, and flat Dynamic AMOLED 2X display.",
        price: 129999,
        discountPercentage: 7,
        stock: 20,
        brand: "Samsung",
        rating: 4.8,
        numReviews: 870,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_samsung_s24ultra" }]
      },
      {
        name: "Samsung Galaxy S23 FE 5G (128GB, Graphite)",
        description: "Fan Edition smartphone offering flagship-grade nightography camera, smooth 120Hz AMOLED display, and IP68 water resistance.",
        price: 39999,
        discountPercentage: 33,
        stock: 40,
        brand: "Samsung",
        rating: 4.4,
        numReviews: 610,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_samsung_s23fe" }]
      },
      {
        name: "Samsung Galaxy A55 5G (128GB, Awesome Navy)",
        description: "Premium metal-frame mid-range smartphone with 50MP OIS camera, Corning Gorilla Glass Victus+, and 5000mAh battery.",
        price: 36999,
        discountPercentage: 10,
        stock: 45,
        brand: "Samsung",
        rating: 4.3,
        numReviews: 380,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_samsung_a55" }]
      },
      {
        name: "OnePlus 12 5G (256GB, Silky Black)",
        description: "Top-tier smartphone engineered with 4th Gen Hasselblad camera system, Snapdragon 8 Gen 3 chipset, and 100W SUPERVOOC charging.",
        price: 64999,
        discountPercentage: 8,
        stock: 30,
        brand: "OnePlus",
        rating: 4.7,
        numReviews: 740,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_oneplus_12" }]
      },
      {
        name: "OnePlus Nord CE 4 5G (128GB, Dark Chrome)",
        description: "Performance mid-range smartphone with Snapdragon 7 Gen 3 chipset, 100W fast wired charging, and 5500mAh high-density battery.",
        price: 24999,
        discountPercentage: 10,
        stock: 60,
        brand: "OnePlus",
        rating: 4.4,
        numReviews: 890,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_oneplus_nordce4" }]
      },
      {
        name: "Google Pixel 8 (128GB, Hazel)",
        description: "Google Tensor G3 smartphone featuring breakthrough computational photography, Best Take photo editing, and 7 years of OS updates.",
        price: 59999,
        discountPercentage: 20,
        stock: 22,
        brand: "Google",
        rating: 4.6,
        numReviews: 450,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_google_pixel8" }]
      },
      {
        name: "Google Pixel 7a (128GB, Charcoal)",
        description: "Affordable flagship photography smartphone featuring Google Tensor G2 processor, 64MP dual cameras, and wireless charging support.",
        price: 36999,
        discountPercentage: 18,
        stock: 30,
        brand: "Google",
        rating: 4.4,
        numReviews: 620,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_google_pixel7a" }]
      },
      {
        name: "Xiaomi Redmi Note 13 Pro 5G (128GB, Midnight Black)",
        description: "Value powerhouse smartphone featuring 200MP OIS camera, 1.5K 120Hz AMOLED curved display, and 67W turbo turbo charging.",
        price: 21999,
        discountPercentage: 15,
        stock: 70,
        brand: "Xiaomi",
        rating: 4.3,
        numReviews: 1250,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_xiaomi_note13pro" }]
      },
      {
        name: "Xiaomi Redmi 13C 5G (128GB, Starlight Black)",
        description: "Budget 5G smartphone with MediaTek Dimensity 6100+ processor, 90Hz smooth HD+ display, and long-lasting 5000mAh battery.",
        price: 10499,
        discountPercentage: 25,
        stock: 90,
        brand: "Xiaomi",
        rating: 4.1,
        numReviews: 1580,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_xiaomi_redmi13c" }]
      },
      {
        name: "Realme 12 Pro+ 5G (256GB, Submarine Blue)",
        description: "Luxury watch design smartphone equipped with 64MP periscope telephoto portrait camera and Snapdragon 7s Gen 2 chipset.",
        price: 29999,
        discountPercentage: 12,
        stock: 50,
        brand: "Realme",
        rating: 4.4,
        numReviews: 530,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_realme_12proplus" }]
      },
      {
        name: "Realme Narzo 60x 5G (128GB, Stellar Green)",
        description: "Slim 5G budget smartphone packing 50MP AI primary camera, 33W SUPERVOOC charging, and 120Hz dynamic ultra-smooth display.",
        price: 11999,
        discountPercentage: 20,
        stock: 80,
        brand: "Realme",
        rating: 4.2,
        numReviews: 810,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_realme_narzo60x" }]
      },
      {
        name: "Motorola Edge 50 Pro 5G (256GB, Black Beauty)",
        description: "Pantone-validated camera and display smartphone with 125W TurboPower charging, vegan leather finish, and IP68 waterproof chassis.",
        price: 31999,
        discountPercentage: 14,
        stock: 40,
        brand: "Motorola",
        rating: 4.5,
        numReviews: 490,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_moto_edge50pro" }]
      },
      {
        name: "iQOO Neo 9 Pro 5G (128GB, Fiery Red)",
        description: "Gaming-focused smartphone featuring flagship Snapdragon 8 Gen 2 chipset, Q1 supercomputing display chip, and 120W flash charge.",
        price: 34999,
        discountPercentage: 10,
        stock: 35,
        brand: "iQOO",
        rating: 4.6,
        numReviews: 680,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", public_id: "mobile_iqoo_neo9pro" }]
      }
    ]
  },

  // ==========================================
  // 6. COMPUTERS AND LAPTOPS (15 Products)
  // ==========================================
  {
    name: "Computers and Laptops",
    description: "High-performance computing systems, slim ultrabooks, gaming rigs, and ergonomic computer monitors and peripherals.",
    products: [
      {
        name: "Apple MacBook Air M2 Chip (13.6-inch, 256GB SSD)",
        description: "Strikingly thin notebook with 13.6-inch Liquid Retina display, Apple M2 chip, 1080p FaceTime HD camera, and 18 hours of battery.",
        price: 89990,
        discountPercentage: 10,
        stock: 25,
        brand: "Apple",
        rating: 4.8,
        numReviews: 1100,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_apple_macbookairm2" }]
      },
      {
        name: "Apple MacBook Pro M3 Chip (14.2-inch, 512GB SSD)",
        description: "Professional creative laptop equipped with M3 processor, Liquid Retina XDR screen, studio mics, and MagSafe 3 fast charging.",
        price: 159900,
        discountPercentage: 6,
        stock: 15,
        brand: "Apple",
        rating: 4.9,
        numReviews: 410,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_apple_macbookprom3" }]
      },
      {
        name: "Dell Inspiron 3520 Laptop (12th Gen Intel i5, 16GB, 512GB SSD)",
        description: "Reliable 15.6-inch business laptop with 12th Gen Intel Core i5 processor, 120Hz FHD anti-glare screen, and fast PCIe NVMe storage.",
        price: 48990,
        discountPercentage: 18,
        stock: 35,
        brand: "Dell",
        rating: 4.3,
        numReviews: 480,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_dell_inspiron3520" }]
      },
      {
        name: "HP Pavilion 15 (AMD Ryzen 5, 16GB, 512GB SSD)",
        description: "Sleek aluminum laptop featuring AMD Ryzen 5 7530U CPU, audio by B&O, backlit keyboard, and HP Fast Charge technology.",
        price: 54990,
        discountPercentage: 15,
        stock: 30,
        brand: "HP",
        rating: 4.4,
        numReviews: 530,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_hp_pavilion15" }]
      },
      {
        name: "Lenovo IdeaPad Slim 3 (12th Gen Intel Core i3, 8GB, 512GB)",
        description: "Lightweight everyday laptop built with military-grade ruggedness, Dolby Audio stereo speakers, and privacy webcam shutter.",
        price: 33990,
        discountPercentage: 28,
        stock: 45,
        brand: "Lenovo",
        rating: 4.2,
        numReviews: 690,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_lenovo_ideapadslim3" }]
      },
      {
        name: "ASUS ROG Strix G16 Gaming Laptop (Intel i7, RTX 4060, 16GB)",
        description: "Powerhouse gaming laptop featuring 13th Gen Intel Core i7, NVIDIA GeForce RTX 4060 GPU, ROG Intelligent Cooling, and 165Hz FHD panel.",
        price: 114990,
        discountPercentage: 12,
        stock: 18,
        brand: "ASUS",
        rating: 4.7,
        numReviews: 290,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_asus_rogstrixg16" }]
      },
      {
        name: "ASUS Vivobook 16X (12th Gen Intel i5, 16GB, 512GB SSD)",
        description: "Big-screen creator notebook featuring 16-inch 16:10 display, 180-degree lay-flat hinge, and antimicrobial keyboard guard.",
        price: 47990,
        discountPercentage: 22,
        stock: 40,
        brand: "ASUS",
        rating: 4.3,
        numReviews: 380,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_asus_vivobook16x" }]
      },
      {
        name: "Acer Nitro V Gaming Laptop (AMD Ryzen 7, RTX 4050, 16GB)",
        description: "High-octane e-sports gaming rig with dual fans, NitroSense software management, 144Hz IPS panel, and DTS:X Ultra audio.",
        price: 74990,
        discountPercentage: 20,
        stock: 22,
        brand: "Acer",
        rating: 4.4,
        numReviews: 320,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_acer_nitrov" }]
      },
      {
        name: "Lenovo Legion 5 Pro Gaming Laptop (AMD Ryzen 7, RTX 4070)",
        description: "Esports-grade tournament laptop with 16-inch WQXGA 240Hz PureSight gaming screen, ColdFront 5.0 vapor chamber, and TrueStrike keyboard.",
        price: 139990,
        discountPercentage: 10,
        stock: 12,
        brand: "Lenovo",
        rating: 4.8,
        numReviews: 180,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_lenovo_legion5pro" }]
      },
      {
        name: "Dell 27-inch 4K UHD IPS Monitor (S2721QS, FreeSync)",
        description: "Ultra-sharp 4K computer monitor with HDR support, 99% sRGB color gamut, AMD FreeSync, and fully height-adjustable ergonomic stand.",
        price: 24999,
        discountPercentage: 25,
        stock: 25,
        brand: "Dell",
        rating: 4.6,
        numReviews: 340,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_dell_27monitor" }]
      },
      {
        name: "LG 24-inch FHD IPS Ultragear Gaming Monitor (144Hz)",
        description: "Fast-paced IPS gaming screen with 1ms response time, 144Hz refresh rate, AMD FreeSync Premium, and borderless 3-side bezel.",
        price: 10999,
        discountPercentage: 35,
        stock: 50,
        brand: "LG",
        rating: 4.5,
        numReviews: 870,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_lg_ultragear24" }]
      },
      {
        name: "Logitech MX Master 3S Wireless Performance Mouse",
        description: "Quiet click ergonomic office mouse with 8K DPI track-on-glass sensor, MagSpeed electromagnetic scrolling, and multi-computer Flow control.",
        price: 8995,
        discountPercentage: 15,
        stock: 55,
        brand: "Logitech",
        rating: 4.8,
        numReviews: 920,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_logitech_mxmaster3s" }]
      },
      {
        name: "Logitech MX Mechanical Wireless Illuminated Keyboard",
        description: "Low-profile mechanical keyboard with tactile quiet switches, smart backlighting proximity sensors, and dual Mac/Windows keycaps.",
        price: 12995,
        discountPercentage: 12,
        stock: 35,
        brand: "Logitech",
        rating: 4.7,
        numReviews: 410,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_logitech_mxmech" }]
      },
      {
        name: "Keychron K2 Wireless Mechanical Gaming Keyboard",
        description: "Compact 75% layout Bluetooth mechanical keyboard with Gateron G Pro switches, RGB backlighting, and hot-swappable PCB.",
        price: 6999,
        discountPercentage: 10,
        stock: 40,
        brand: "Keychron",
        rating: 4.6,
        numReviews: 280,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_keychron_k2" }]
      },
      {
        name: "HP 15s Thin and Light Laptop (Intel Core i5, 8GB, 512GB SSD)",
        description: "Portable 15.6-inch laptop with micro-edge bezel display, fast charging battery, and integrated Intel Iris Xe graphics for students.",
        price: 42990,
        discountPercentage: 20,
        stock: 38,
        brand: "HP",
        rating: 4.2,
        numReviews: 510,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/18105/pexels-photo.jpg", public_id: "comp_hp_15s" }]
      }
    ]
  },

  // ==========================================
  // 7. HOME AND KITCHEN (15 Products)
  // ==========================================
  {
    name: "Home and Kitchen",
    description: "Essential non-stick cookware, durable stainless steel pressure cookers, and insulated food and water containers for modern kitchens.",
    products: [
      {
        name: "Prestige Svachh Deluxe Alpha Stainless Steel Pressure Cooker 3L",
        description: "Spillage control pressure cooker crafted with heavy-gauge 304 food-grade stainless steel and Alpha base induction bottom.",
        price: 2150,
        discountPercentage: 25,
        stock: 60,
        brand: "Prestige",
        rating: 4.4,
        numReviews: 820,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_prestige_cooker3l" }]
      },
      {
        name: "Hawkins Contura Hard Anodised Pressure Cooker 3L",
        description: "Curved body pressure cooker made with 60-micron thick hard anodised body for faster heat absorption and easier stirring.",
        price: 1875,
        discountPercentage: 15,
        stock: 70,
        brand: "Hawkins",
        rating: 4.6,
        numReviews: 1450,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_hawkins_contura" }]
      },
      {
        name: "Prestige Omega Deluxe Granite 3-Piece Non-Stick Cookware Set",
        description: "Stain-resistant cookware ensemble including fry pan, kadai with glass lid, and flat omni tawa with 5-layer durable granite coating.",
        price: 2890,
        discountPercentage: 35,
        stock: 45,
        brand: "Prestige",
        rating: 4.3,
        numReviews: 610,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_prestige_graniteset" }]
      },
      {
        name: "Pigeon by Stovekraft Cruise 1800W Induction Cooktop",
        description: "Energy-efficient electromagnetic induction stove with 7 Indian preset cooking menus and dual heat sensor safety protection.",
        price: 1499,
        discountPercentage: 50,
        stock: 80,
        brand: "Pigeon",
        rating: 4.1,
        numReviews: 1200,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_pigeon_induction" }]
      },
      {
        name: "Philips Daily Collection 750W Mixer Grinder with 3 Jars",
        description: "High-torque 750-watt motor kitchen mixer grinder with stainless steel leak-proof jars and specialized tough masala grinding blades.",
        price: 3299,
        discountPercentage: 28,
        stock: 55,
        brand: "Philips",
        rating: 4.4,
        numReviews: 940,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_philips_mixer750w" }]
      },
      {
        name: "Wonderchef Nutri-blend 400W Mixer Grinder and Blender",
        description: "Compact personal countertop blender featuring 22000 RPM high-speed operation, surgical-grade steel blades, and 2 unbreakable jars.",
        price: 2499,
        discountPercentage: 40,
        stock: 65,
        brand: "Wonderchef",
        rating: 4.3,
        numReviews: 780,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_wonderchef_nutriblend" }]
      },
      {
        name: "Milton Thermosteel Flip Lid Insulated Flask 1000ml",
        description: "Double-walled vacuum insulated flask constructed from 304 stainless steel maintaining liquids piping hot or icy cold for 24 hours.",
        price: 899,
        discountPercentage: 20,
        stock: 110,
        brand: "Milton",
        rating: 4.5,
        numReviews: 2300,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_milton_thermosteel" }]
      },
      {
        name: "Borosil Glass Lunch Box Set of 3 with Insulated Bag",
        description: "100% borosilicate microwave-safe and oven-safe glass food containers with airtight leakproof silicone gasket lids.",
        price: 1199,
        discountPercentage: 25,
        stock: 90,
        brand: "Borosil",
        rating: 4.6,
        numReviews: 1120,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_borosil_lunchset" }]
      },
      {
        name: "Cello Checkers Plastic Air Tight Food Containers (Set of 18)",
        description: "BPA-free stackable pantry modular storage canisters with transparent bodies and textured easy-grip checker designs.",
        price: 699,
        discountPercentage: 45,
        stock: 120,
        brand: "Cello",
        rating: 4.1,
        numReviews: 850,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_cello_checkers18" }]
      },
      {
        name: "Kent Grand Plus RO Water Purifier with UV and UF",
        description: "Multi-stage RO+UV+UF+TDS water purifier with In-Tank UV disinfection lamp and mineral ROTM technology for pure drinking water.",
        price: 14499,
        discountPercentage: 24,
        stock: 25,
        brand: "Kent",
        rating: 4.4,
        numReviews: 530,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_kent_grandplus" }]
      },
      {
        name: "Aquaguard Aura 7L Water Purifier with Active Copper",
        description: "Advanced domestic water purifier with Active Copper zinc booster cartridge and 8-stage purification suited for all water sources.",
        price: 12999,
        discountPercentage: 28,
        stock: 30,
        brand: "Aquaguard",
        rating: 4.3,
        numReviews: 480,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_aquaguard_aura" }]
      },
      {
        name: "Pigeon 1.5L Stainless Steel Electric Kettle",
        description: "Cordless 1500W electric water kettle featuring 360-degree swivel base, auto shut-off boil dry protection, and indicator lamp.",
        price: 649,
        discountPercentage: 55,
        stock: 140,
        brand: "Pigeon",
        rating: 4.0,
        numReviews: 2900,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_pigeon_kettle" }]
      },
      {
        name: "Prestige Iris Plus 750W Mixer Grinder with 4 Jars",
        description: "Heavy-duty kitchen appliance equipped with 3 stainless steel grinding jars plus an additional juicer jar with extraction sieve.",
        price: 2999,
        discountPercentage: 42,
        stock: 50,
        brand: "Prestige",
        rating: 4.2,
        numReviews: 1350,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_prestige_irisplus" }]
      },
      {
        name: "Hawkins Futura Hard Anodised Non-Stick Dosa Tava 28cm",
        description: "Heavy 4.88mm thick hard anodised flat round griddle with premium non-stick coating for crispy dosas and flaky parathas.",
        price: 1420,
        discountPercentage: 12,
        stock: 65,
        brand: "Hawkins",
        rating: 4.5,
        numReviews: 760,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_hawkins_dosatava" }]
      },
      {
        name: "Milton Spotzero Classic Spin Mop with Steel Wringer",
        description: "Floor cleaning spin mop system with 360-degree rotating microfiber mop head, sturdy stainless steel wringer bucket, and drainage plug.",
        price: 1099,
        discountPercentage: 35,
        stock: 85,
        brand: "Milton",
        rating: 4.2,
        numReviews: 1890,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg", public_id: "kitchen_milton_spinmop" }]
      }
    ]
  },

  // ==========================================
  // 8. BEAUTY AND PERSONAL CARE (15 Products)
  // ==========================================
  {
    name: "Beauty and Personal Care",
    description: "Grooming trimmers, hair styling tools, rejuvenating skincare essentials, and premium personal hygiene products.",
    products: [
      {
        name: "Philips All-in-One Trimmer Series 3000 (9-in-1 Kit)",
        description: "Versatile men's grooming kit with self-sharpening stainless steel blades, nose trimmer, and multiple beard and hair stubble combs.",
        price: 1699,
        discountPercentage: 25,
        stock: 75,
        brand: "Philips",
        rating: 4.4,
        numReviews: 1350,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_philips_trimmer3000" }]
      },
      {
        name: "Philips Multi Grooming Kit Series 7000 (14-in-1 DualCut)",
        description: "Precision metal trimmer with DualCut technology, showerproof rubber grip, and lithium-ion battery delivering up to 120 minutes runtime.",
        price: 3799,
        discountPercentage: 20,
        stock: 40,
        brand: "Philips",
        rating: 4.6,
        numReviews: 620,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_philips_trimmer7000" }]
      },
      {
        name: "Dyson Supersonic Hair Dryer (Iron/Fuchsia)",
        description: "Ultra-fast digital motor hair dryer engineered to protect hair from extreme heat damage while increasing smoothness and shine.",
        price: 34900,
        discountPercentage: 5,
        stock: 15,
        brand: "Dyson",
        rating: 4.8,
        numReviews: 290,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_dyson_hairdryer" }]
      },
      {
        name: "Nivea Men Dark Spot Reduction Face Wash 100g (Pack of 2)",
        description: "Deep cleansing facial cleanser for men enriched with Whitanat Vita Complex Plus to remove oiliness, dirt, and impurities.",
        price: 399,
        discountPercentage: 25,
        stock: 150,
        brand: "Nivea",
        rating: 4.3,
        numReviews: 2100,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_nivea_facewash" }]
      },
      {
        name: "Nivea Soft Light Moisturizing Cream 300ml",
        description: "Light non-greasy refreshing daily skin cream enriched with Jojoba oil and Vitamin E for deeply moisturized soft glowing skin.",
        price: 349,
        discountPercentage: 30,
        stock: 180,
        brand: "Nivea",
        rating: 4.5,
        numReviews: 3400,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_nivea_softcream" }]
      },
      {
        name: "Dove Deeply Nourishing Body Wash 800ml",
        description: "Gentle sulfate-free foaming body wash with NutriumMoisture technology that penetrates deeply into the surface layers of skin.",
        price: 449,
        discountPercentage: 25,
        stock: 130,
        brand: "Dove",
        rating: 4.4,
        numReviews: 1950,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_dove_bodywash" }]
      },
      {
        name: "L'Oreal Paris Revitalift 1.5% Hyaluronic Acid Serum 30ml",
        description: "Intense hydrating anti-aging face serum formulated with micro hyaluronic acid molecules to visibly plump skin and reduce fine lines.",
        price: 699,
        discountPercentage: 30,
        stock: 110,
        brand: "L'Oreal Paris",
        rating: 4.5,
        numReviews: 1820,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_loreal_serum" }]
      },
      {
        name: "The Derma Co 1% Hyaluronic Sunscreen Aqua Gel SPF 50",
        description: "Broad-spectrum PA++++ sunscreen with ultra-light water-like consistency that leaves zero white cast and protects against blue light.",
        price: 449,
        discountPercentage: 15,
        stock: 140,
        brand: "The Derma Co",
        rating: 4.4,
        numReviews: 2450,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_dermaco_sunscreen" }]
      },
      {
        name: "Beardo Godfather Beard Oil for Men 30ml",
        description: "Premium nourishing beard conditioning oil blended with mineral oil, almond oil, and castor oil to soften coarse facial hair.",
        price: 299,
        discountPercentage: 25,
        stock: 160,
        brand: "Beardo",
        rating: 4.2,
        numReviews: 1150,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_beardo_beardoil" }]
      },
      {
        name: "Philips Hair Straightener Heated Brush BHH880/10",
        description: "Ceramic tourmaline coated paddle brush that detangles and straightens hair in 5 minutes with ThermoProtect technology.",
        price: 2695,
        discountPercentage: 22,
        stock: 60,
        brand: "Philips",
        rating: 4.5,
        numReviews: 870,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_philips_hairbrush" }]
      },
      {
        name: "Minimalist 10% Niacinamide Face Serum with Zinc 30ml",
        description: "Targeted facial serum clinically tested to reduce acne marks, control sebum activity, and strengthen damaged skin barriers.",
        price: 569,
        discountPercentage: 10,
        stock: 125,
        brand: "Minimalist",
        rating: 4.6,
        numReviews: 1640,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_minimalist_niacinamide" }]
      },
      {
        name: "Biotique Morning Nectar Flawless Skin Moisturizer 190ml",
        description: "Ayurvedic daily herbal moisturizing lotion containing pure honey, wheatgerm, and seaweed extracts for all skin types.",
        price: 249,
        discountPercentage: 35,
        stock: 170,
        brand: "Biotique",
        rating: 4.1,
        numReviews: 1420,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_biotique_moisturizer" }]
      },
      {
        name: "Gillette Fusion5 ProGlide Men's Razor with FlexBall",
        description: "Advanced precision shaving razor with 5 anti-friction blades, FlexBall handle contouring, and enhanced lubrastrip.",
        price: 699,
        discountPercentage: 15,
        stock: 90,
        brand: "Gillette",
        rating: 4.5,
        numReviews: 980,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_gillette_proglide" }]
      },
      {
        name: "Forest Essentials Delicate Facial Cleanser Kashmiri Saffron 200ml",
        description: "Luxury Ayurvedic facial wash infused with pure Kashmiri saffron, kewda water, and neem leaves to purify and brighten skin tone.",
        price: 1550,
        discountPercentage: 5,
        stock: 45,
        brand: "Forest Essentials",
        rating: 4.7,
        numReviews: 310,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_forestessentials_cleanser" }]
      },
      {
        name: "Mamaearth Onion Hair Fall Control Shampoo 400ml",
        description: "Plant-keratin enriched hair strengthening shampoo formulated with onion seed oil to combat breakage and nourish hair follicles.",
        price: 499,
        discountPercentage: 20,
        stock: 135,
        brand: "Mamaearth",
        rating: 4.1,
        numReviews: 2200,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg", public_id: "beauty_mamaearth_shampoo" }]
      }
    ]
  },

  // ==========================================
  // 9. BAGS AND ACCESSORIES (15 Products)
  // * Uses supplied Pexels Photo (5926245)
  // ==========================================
  {
    name: "Bags and Accessories",
    description: "Sturdy travel luggage trolleys, ergonomic laptop backpacks, designer leather wallets, and wristwatches for everyday style.",
    products: [
      {
        name: "American Tourister Ivy Polypropylene 68cm Hard Suitcase",
        description: "Durable scratch-resistant polypropylene check-in luggage with 360-degree silent spinner wheels and recessed TSA numeric lock.",
        price: 3599,
        discountPercentage: 60,
        stock: 40,
        brand: "American Tourister",
        rating: 4.3,
        numReviews: 920,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_amtourister_ivy" }]
      },
      {
        name: "Skybags Trooper 55cm Cabin Luggage Trolley",
        description: "Hard-sided lightweight polycarbonate cabin suitcase with dual wheels, push-button trolley handle, and internal dividers.",
        price: 2499,
        discountPercentage: 58,
        stock: 55,
        brand: "Skybags",
        rating: 4.2,
        numReviews: 1180,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_skybags_trooper" }]
      },
      {
        name: "Wildcraft 44L Waterproof Outdoor Hiking Rucksack",
        description: "Heavy-duty ergonomic trekking backpack equipped with padded hip belt, rain cover compartment, and reinforced nylon seams.",
        price: 2199,
        discountPercentage: 35,
        stock: 50,
        brand: "Wildcraft",
        rating: 4.5,
        numReviews: 640,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_wildcraft_rucksack" }]
      },
      {
        name: "Safari Pentagon 3-Piece Trolley Luggage Set",
        description: "Comprehensive 3-piece polycarbonate family luggage set (55cm, 65cm, 75cm) featuring textured scratch-defending exterior shells.",
        price: 6999,
        discountPercentage: 72,
        stock: 25,
        brand: "Safari",
        rating: 4.1,
        numReviews: 830,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_safari_pentagonset" }]
      },
      {
        name: "American Tourister Valex 28L Everyday Laptop Backpack",
        description: "Water-resistant multi-compartment daypack with dedicated 15.6-inch laptop pocket, side mesh bottle holders, and air-mesh back padding.",
        price: 1299,
        discountPercentage: 55,
        stock: 95,
        brand: "American Tourister",
        rating: 4.3,
        numReviews: 1420,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_amtourister_valex" }]
      },
      {
        name: "Titan Karishma Analog Black Dial Men's Watch",
        description: "Classic dress watch featuring a refined black dial with metallic indices, mineral crystal glass, and polished stainless steel strap.",
        price: 1995,
        discountPercentage: 15,
        stock: 80,
        brand: "Titan",
        rating: 4.5,
        numReviews: 1650,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", public_id: "bags_titan_karishma" }]
      },
      {
        name: "Fastrack Casual Analog Round Dial Unisex Watch",
        description: "Youthful minimalist wristwatch designed with a silicone strap, quartz analog movement, and water resistance up to 30 meters.",
        price: 1295,
        discountPercentage: 20,
        stock: 110,
        brand: "Fastrack",
        rating: 4.2,
        numReviews: 2100,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", public_id: "bags_fastrack_casual" }]
      },
      {
        name: "Fossil Grant Chronograph Dark Brown Leather Watch",
        description: "Heritage chronograph watch boasting cream dial with roman numerals, stop-watch subdials, and interchangeable genuine leather band.",
        price: 9995,
        discountPercentage: 30,
        stock: 30,
        brand: "Fossil",
        rating: 4.6,
        numReviews: 480,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", public_id: "bags_fossil_grant" }]
      },
      {
        name: "Wildcraft 21L Work and College Backpack",
        description: "Compact two-compartment casual backpack crafted with high-density polyester and moisture-wicking shoulder straps.",
        price: 999,
        discountPercentage: 40,
        stock: 130,
        brand: "Wildcraft",
        rating: 4.2,
        numReviews: 980,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_wildcraft_21l" }]
      },
      {
        name: "Urban Forest Oliver Black Genuine Leather Men's Wallet",
        description: "Handcrafted bifold leather wallet featuring RFID blocking lining, currency bill dividers, and multiple credit card slots.",
        price: 699,
        discountPercentage: 55,
        stock: 140,
        brand: "Urban Forest",
        rating: 4.3,
        numReviews: 1750,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_urbanforest_wallet" }]
      },
      {
        name: "Tommy Hilfiger Men's Leather Reversible Belt",
        description: "Versatile dual-sided black and brown leather formal belt with rotatable metal buckle and embossed Tommy Hilfiger branding.",
        price: 2199,
        discountPercentage: 35,
        stock: 60,
        brand: "Tommy Hilfiger",
        rating: 4.4,
        numReviews: 320,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_tommy_belt" }]
      },
      // Here we utilize the supplied Pexels Photo: https://images.pexels.com/photos/5926245/pexels-photo-5926245.jpeg
      {
        name: "Lavie Women's Betula Medium Faux Leather Tote Handbag",
        description: "Spacious multi-pocket women's shopping tote handbag made with premium textured synthetic leather and sturdy top carry handles.",
        price: 1499,
        discountPercentage: 65,
        stock: 85,
        brand: "Lavie",
        rating: 4.2,
        numReviews: 890,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/5926245/pexels-photo-5926245.jpeg", public_id: "bags_lavie_tote_5926245" }]
      },
      // Here we also utilize the supplied Pexels Photo: https://images.pexels.com/photos/5926245/pexels-photo-5926245.jpeg
      {
        name: "Caprese Women's Solid Faux Leather Shoulder Sling Bag",
        description: "Chic compact shoulder sling bag featuring organized zipper pockets, adjustable metal chain strap, and elegant metallic logo.",
        price: 1799,
        discountPercentage: 55,
        stock: 70,
        brand: "Caprese",
        rating: 4.1,
        numReviews: 540,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/5926245/pexels-photo-5926245.jpeg", public_id: "bags_caprese_sling_5926245" }]
      },
      {
        name: "Casio Vintage Digital Unisex Stainless Steel Watch A168WA",
        description: "Retro timeless digital watch equipped with ElectroLuminescence backlight, 1/100-second stopwatch, daily alarm, and auto-calendar.",
        price: 2695,
        discountPercentage: 10,
        stock: 65,
        brand: "Casio",
        rating: 4.7,
        numReviews: 1320,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg", public_id: "bags_casio_a168wa" }]
      },
      {
        name: "Mokobara The Transit Carry-On Luggage 40L",
        description: "Modern hard-shell cabin trolley crafted from unbreakable German Makrolon polycarbonate with Hinomoto silent whisper wheels.",
        price: 7999,
        discountPercentage: 20,
        stock: 35,
        brand: "Mokobara",
        rating: 4.6,
        numReviews: 410,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg", public_id: "bags_mokobara_transit" }]
      }
    ]
  },

  // ==========================================
  // 10. SPORTS AND FITNESS (15 Products)
  // ==========================================
  {
    name: "Sports and Fitness",
    description: "Durable workout gear, yoga accessories, professional sports balls, and home fitness training equipment.",
    products: [
      {
        name: "Decathlon Domyos Hex Dumbbells 5kg (Pair)",
        description: "Hexagonal anti-roll rubber coated cast-iron dumbbells with knurled ergonomic chrome handles for home and gym strength training.",
        price: 1999,
        discountPercentage: 10,
        stock: 50,
        brand: "Decathlon",
        rating: 4.6,
        numReviews: 720,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_decathlon_dumbbells" }]
      },
      {
        name: "Boldfit 13mm Anti-Skid NBR Yoga Mat with Carrying Strap",
        description: "Extra thick high-density exercise and yoga mat with ribbed textured surface to provide non-slip cushioning for joints.",
        price: 899,
        discountPercentage: 45,
        stock: 120,
        brand: "Boldfit",
        rating: 4.4,
        numReviews: 1840,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_boldfit_yogamat" }]
      },
      {
        name: "Yonex Nanoray 7000I Graphite Badminton Racquet",
        description: "Head-light graphite badminton racquet engineered with Aero-Box frame for swift lightning-fast swing speed and sharp smashes.",
        price: 2190,
        discountPercentage: 30,
        stock: 65,
        brand: "Yonex",
        rating: 4.5,
        numReviews: 1290,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_yonex_nanoray7000i" }]
      },
      {
        name: "Yonex Mavis 350 Nylon Shuttlecock (Pack of 6, Green Cap)",
        description: "Slow speed precision flight nylon shuttles designed to closely mimic the recovery time and trajectory of natural feather shuttles.",
        price: 1099,
        discountPercentage: 15,
        stock: 140,
        brand: "Yonex",
        rating: 4.7,
        numReviews: 3100,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_yonex_mavis350" }]
      },
      {
        name: "Nivia Storm Football (Size 5, Rubber Moulded)",
        description: "32-panel rubber moulded training football with reinforced butyl bladder for superior air retention on hard concrete and turf.",
        price: 549,
        discountPercentage: 30,
        stock: 110,
        brand: "Nivia",
        rating: 4.2,
        numReviews: 1650,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_nivia_storm" }]
      },
      {
        name: "Cosco Light Cricket Tennis Ball (Pack of 6)",
        description: "High-grade heavy-duty rubber core cricket balls with fluorescent wool felt covering for tournaments and casual street matches.",
        price: 480,
        discountPercentage: 20,
        stock: 150,
        brand: "Cosco",
        rating: 4.3,
        numReviews: 890,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_cosco_cricketballs" }]
      },
      {
        name: "SG Sierra Plus Kashmir Willow Cricket Bat (Full Size)",
        description: "Handcrafted Kashmir willow cricket bat with thick power-drive edges, Sarawak cane handle, and protective chevron grip.",
        price: 2499,
        discountPercentage: 25,
        stock: 40,
        brand: "SG",
        rating: 4.3,
        numReviews: 410,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_sg_sierraplus" }]
      },
      {
        name: "Decathlon Kipsta Hardground Football Turf Shoes",
        description: "Agile low-profile football studs designed with numerous small rubber cleats for optimal grip on hard artificial turf pitches.",
        price: 1699,
        discountPercentage: 15,
        stock: 60,
        brand: "Decathlon",
        rating: 4.4,
        numReviews: 530,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_decathlon_turfshoes" }]
      },
      {
        name: "Strauss Skipping Rope with Anti-Slip Aluminum Handles",
        description: "Adjustable 360-degree ball-bearing steel wire speed jump rope for boxing, cardiovascular endurance, and HIIT workouts.",
        price: 399,
        discountPercentage: 40,
        stock: 160,
        brand: "Strauss",
        rating: 4.3,
        numReviews: 1120,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_strauss_skippingrope" }]
      },
      {
        name: "Boldfit Heavy Resistance Bands Set for Home Exercise",
        description: "Set of 5 color-coded natural latex resistance loop bands for physical therapy, leg warmups, glute activation, and home fitness.",
        price: 699,
        discountPercentage: 50,
        stock: 95,
        brand: "Boldfit",
        rating: 4.5,
        numReviews: 1460,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_boldfit_resistancebands" }]
      },
      {
        name: "Nivia Orthopedic Neoprene Knee Support Sleeve",
        description: "Anatomically contoured compression knee brace providing joint stability, pain relief, and heat retention during heavy squats.",
        price: 429,
        discountPercentage: 25,
        stock: 100,
        brand: "Nivia",
        rating: 4.3,
        numReviews: 720,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_nivia_kneesupport" }]
      },
      {
        name: "Decathlon Quechua 20L Water-Resistant Hiking Backpack",
        description: "Ultra-compact and sturdy day hiking backpack featuring foam padded back ventilation, thumb loops, and waterproof fabric coating.",
        price: 799,
        discountPercentage: 10,
        stock: 130,
        brand: "Decathlon",
        rating: 4.6,
        numReviews: 2400,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_decathlon_quechua20l" }]
      },
      {
        name: "Cosco Super Volleyball (Moulded, Size 4)",
        description: "Durable nylon-wound synthetic leather volleyball engineered for indoor court games and outdoor recreational beach play.",
        price: 620,
        discountPercentage: 25,
        stock: 75,
        brand: "Cosco",
        rating: 4.2,
        numReviews: 590,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_cosco_volleyball" }]
      },
      {
        name: "Cockatoo CTM-05 1.5 HP Motorized Treadmill for Home",
        description: "Foldable home motorized running machine with LED display tracking speed, distance, time, and calories burned with safety key.",
        price: 16990,
        discountPercentage: 45,
        stock: 12,
        brand: "Cockatoo",
        rating: 4.4,
        numReviews: 210,
        isFeatured: false,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_cockatoo_treadmill" }]
      },
      {
        name: "Flexnest Adjustable Dumbbell Set (2.5kg to 24kg)",
        description: "Space-saving quick-turn dial selector dumbbell replacing 15 separate weights with smooth rack locking mechanism.",
        price: 14999,
        discountPercentage: 25,
        stock: 18,
        brand: "Flexnest",
        rating: 4.7,
        numReviews: 160,
        isFeatured: true,
        isActive: true,
        images: [{ url: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg", public_id: "sports_flexnest_adjustabledumbbell" }]
      }
    ]
  }
];

/**
 * Main seeding routine:
 * - Upserts categories by name (preserving existing category IDs and records)
 * - Upserts products by name & brand (linking them to their respective category ID)
 * - Safe and repeatable: NEVER drops database or deletes users/orders/carts/reviews
 */
const seedDB = async () => {
  try {
    console.log("==================================================");
    console.log("Starting Safe and Repeatable Database Seeding...");
    console.log("==================================================");

    // 1. Pre-validation of seed dataset
    if (seedData.length !== 10) {
      throw new Error(`Expected exactly 10 categories, found ${seedData.length}`);
    }

    let datasetTotalProducts = 0;
    for (const cat of seedData) {
      if (cat.products.length !== 15) {
        throw new Error(`Category "${cat.name}" has ${cat.products.length} products, expected exactly 15.`);
      }
      datasetTotalProducts += cat.products.length;
    }

    if (datasetTotalProducts !== 150) {
      throw new Error(`Expected exactly 150 products, found ${datasetTotalProducts}`);
    }

    console.log(`Verified seed dataset: 10 categories, 15 products each (${datasetTotalProducts} products total).`);

    // 2. Connect to MongoDB using existing project connection
    await connectDB();

    let categoriesInserted = 0;
    let categoriesUpdated = 0;
    let productsInserted = 0;
    let productsUpdated = 0;

    const categorySummary = [];

    // 3. Process categories and their products safely
    for (const catData of seedData) {
      // Compute standard slug
      const slug = slugify(catData.name, {
        replacement: "-",
        lower: false,
        strict: false,
        locale: "vi",
        trim: true
      });

      // Find or create category by unique name
      // Use findByIdAndUpdate / findOneAndUpdate to avoid broken pre("save") hook in category.models.js
      let categoryDoc = await Category.findOne({ name: catData.name });

      if (categoryDoc) {
        categoryDoc = await Category.findByIdAndUpdate(
          categoryDoc._id,
          {
            $set: {
              description: catData.description,
              slug: slug,
              isActive: true
            }
          },
          { new: true, runValidators: true }
        );
        categoriesUpdated++;
      } else {
        categoryDoc = await Category.findOneAndUpdate(
          { name: catData.name },
          {
            $set: {
              name: catData.name,
              slug: slug,
              description: catData.description,
              isActive: true
            }
          },
          { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
        );
        categoriesInserted++;
      }

      let catProductsCount = 0;

      // Upsert products for this category
      for (const prodData of catData.products) {
        const productPayload = {
          name: prodData.name,
          description: prodData.description,
          price: prodData.price,
          discountPercentage: prodData.discountPercentage,
          stock: prodData.stock,
          category: categoryDoc._id,
          brand: prodData.brand,
          rating: prodData.rating,
          numReviews: prodData.numReviews,
          isFeatured: prodData.isFeatured,
          isActive: prodData.isActive,
          images: prodData.images
        };

        // Match existing product by unique combination of name and brand
        const existingProduct = await Product.findOne({
          name: prodData.name,
          brand: prodData.brand
        });

        if (existingProduct) {
          await Product.findByIdAndUpdate(
            existingProduct._id,
            { $set: productPayload },
            { runValidators: true }
          );
          productsUpdated++;
        } else {
          await Product.create(productPayload);
          productsInserted++;
        }

        catProductsCount++;
      }

      categorySummary.push({
        category: catData.name,
        categoryId: categoryDoc._id.toString(),
        productsCount: catProductsCount
      });
    }

    // 4. Seeding Summary Report
    console.log("\n==================================================");
    console.log("Seeding Execution Summary");
    console.log("==================================================");
    console.log(`Categories Processed: ${seedData.length} (Inserted: ${categoriesInserted}, Updated: ${categoriesUpdated})`);
    console.log(`Products Processed  : ${productsInserted + productsUpdated} (Inserted: ${productsInserted}, Updated: ${productsUpdated})`);
    console.log("--------------------------------------------------");
    console.log("Breakdown by Category:");
    for (const item of categorySummary) {
      console.log(` - ${item.category.padEnd(26)} : ${item.productsCount} products (ID: ${item.categoryId})`);
    }
    console.log("==================================================");
    console.log("Seeding Completed Successfully! No unrelated data was modified.");

    // 5. Direct Database Verification via Live MongoDB Queries
    console.log("\n==================================================");
    console.log("Verifying Seed Data via Live MongoDB Queries...");
    console.log("==================================================");

    const verifiedDbName = mongoose.connection.db.databaseName;
    console.log(`Database Name: ${verifiedDbName}`);
    if (verifiedDbName !== "E-Commerce") {
      throw new Error(`Connected to unexpected database: ${verifiedDbName}`);
    }

    const seedCategoryNames = seedData.map((c) => c.name);
    const dbCategories = await Category.find({ name: { $in: seedCategoryNames } });
    console.log(`Verified Categories in DB: ${dbCategories.length} / 10`);
    if (dbCategories.length !== 10) {
      throw new Error(`Expected 10 seed categories in DB, found ${dbCategories.length}`);
    }

    const catIdMap = new Map();
    for (const cat of dbCategories) {
      catIdMap.set(cat.name, cat._id);
    }

    let totalVerifiedProducts = 0;
    console.log("\nPer-Category Product Counts in MongoDB:");
    for (const catData of seedData) {
      const catId = catIdMap.get(catData.name);
      const prodNames = catData.products.map((p) => p.name);

      const dbProds = await Product.find({
        category: catId,
        name: { $in: prodNames }
      });

      console.log(` - ${catData.name.padEnd(26)} : ${dbProds.length} / 15 products`);

      if (dbProds.length !== 15) {
        throw new Error(`Category "${catData.name}" has ${dbProds.length} products, expected exactly 15!`);
      }

      for (const prod of dbProds) {
        if (!prod.category || prod.category.toString() !== catId.toString()) {
          throw new Error(`Invalid category reference on product "${prod.name}"`);
        }
        if (!prod.name || !prod.description || prod.price == null || prod.stock == null || !prod.brand) {
          throw new Error(`Product "${prod.name}" missing required fields`);
        }
        if (prod.description.length < 20 || prod.description.length > 500) {
          throw new Error(`Product "${prod.name}" description length violates schema constraints`);
        }
        if (prod.rating < 0 || prod.rating > 5) {
          throw new Error(`Product "${prod.name}" rating ${prod.rating} out of bounds`);
        }
        if (!Array.isArray(prod.images) || prod.images.length === 0 || !prod.images[0].url) {
          throw new Error(`Product "${prod.name}" image structure invalid`);
        }
      }

      totalVerifiedProducts += dbProds.length;
    }

    console.log(`\nTotal Seeded Products Verified in DB: ${totalVerifiedProducts} / 150`);
    if (totalVerifiedProducts !== 150) {
      throw new Error(`Expected exactly 150 seeded products in DB, found ${totalVerifiedProducts}`);
    }

    console.log("All 150 products and 10 categories successfully verified in MongoDB!");

    // 6. Clean connection teardown
    await mongoose.connection.close();
    console.log("MongoDB connection closed cleanly.");
    process.exit(0);

  } catch (error) {
    console.error("\n[SEED ERROR]: Seeding process failed:", error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close().catch(() => {});
    }
    process.exit(1);
  }
};

// Execute if run directly via node
seedDB();
