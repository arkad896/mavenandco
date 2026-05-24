const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Ensure public directory exists
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'maven-brochure.pdf');

// Check for custom persistent final brochure
const finalPath = path.join(publicDir, 'maven-brochure-final.pdf');
if (fs.existsSync(finalPath)) {
  console.log('✅ [Brochure Generator] Custom final brochure detected! Copying over...');
  try {
    fs.copyFileSync(finalPath, outputPath);
    console.log('✅ [Brochure Generator] Custom final brochure copied successfully! Bypassing PDF generation.');
    process.exit(0);
  } catch (err) {
    console.error('❌ [Brochure Generator] Error copying custom final brochure:', err);
  }
}

console.log(`🚀 [Brochure Generator] Initializing PDF generation -> ${outputPath}`);

// Create a new A4 document
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 40, right: 40 },
  autoFirstPage: false
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Design System Constants
const COLORS = {
  green: '#12352A',
  greenLight: '#1C4A38',
  greenDark: '#0A2119',
  gold: '#C9A84C',
  goldLight: '#E8C97A',
  cream: '#FDFCF0',
  textMuted: '#556B5C',
  textDark: '#1E2D24',
  white: '#FFFFFF',
  redLight: '#FCA5A5',
  redBg: '#2E1010'
};

const FONTS = {
  serif: 'Times-Roman',
  serifBold: 'Times-Bold',
  serifItalic: 'Times-Italic',
  sans: 'Helvetica',
  sansBold: 'Helvetica-Bold',
  sansOblique: 'Helvetica-Oblique'
};

// Helper: Draw borders
function drawBorders(doc, isDarkTheme) {
  const borderColor = COLORS.gold;
  
  // Outer double-border
  doc.save();
  doc.lineWidth(1);
  doc.strokeColor(borderColor);
  doc.rect(20, 20, 555.28, 801.89).stroke();
  
  doc.lineWidth(0.5);
  doc.rect(24, 24, 547.28, 793.89).stroke();
  doc.restore();

  // Draw corner decorative accents
  const corners = [
    { x: 20, y: 20, dx: 10, dy: 10 },
    { x: 575.28, y: 20, dx: -10, dy: 10 },
    { x: 20, y: 821.89, dx: 10, dy: -10 },
    { x: 575.28, y: 821.89, dx: -10, dy: -10 }
  ];
  
  doc.save();
  doc.lineWidth(1.5);
  doc.strokeColor(COLORS.gold);
  corners.forEach(c => {
    doc.moveTo(c.x, c.y).lineTo(c.x + c.dx, c.y).stroke();
    doc.moveTo(c.x, c.y).lineTo(c.x, c.y + c.dy).stroke();
  });
  doc.restore();
}

// Helper: Draw Header & Footer for inside pages
function drawHeaderFooter(doc, pageNum, pageTitle, isDarkTheme) {
  doc.save();
  doc.font(FONTS.sansBold).fontSize(8).fillColor(isDarkTheme ? COLORS.gold : COLORS.green);
  
  // Running Header
  doc.text('MAVEN HOSPITALITY OPERATING SYSTEM', 40, 32);
  doc.font(FONTS.sans).text(pageTitle.toUpperCase(), 350, 32, { align: 'right', width: 205 });
  
  // Header divider
  doc.lineWidth(0.5).strokeColor(isDarkTheme ? 'rgba(201, 168, 76, 0.3)' : 'rgba(18, 53, 42, 0.15)');
  doc.moveTo(40, 44).lineTo(555.28, 44).stroke();
  
  // Running Footer
  doc.moveTo(40, 798).lineTo(555.28, 798).stroke();
  doc.font(FONTS.sans).text('Confidential Client Information | Technical Blueprint 2026', 40, 804);
  doc.font(FONTS.sansBold).text(`PAGE ${pageNum}`, 350, 804, { align: 'right', width: 205 });
  doc.restore();
}


// ==========================================
// PAGE 1: COVER PAGE (Dark Green Theme)
// ==========================================
doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });

// Fill background
doc.rect(0, 0, 595.28, 841.89).fill(COLORS.greenDark);
drawBorders(doc, true);

// Header details
doc.save();
doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.gold).text('THE HOSPITALITY PRINT EDITION', 40, 80, { characterSpacing: 1.5 });
doc.fontSize(8).fillColor(COLORS.cream).text('PRODUCT OVERVIEW & TECHNICAL SPECIFICATIONS', 40, 95);

// Main Logo Typography
doc.font(FONTS.serifBold).fontSize(56).fillColor(COLORS.gold).text('MAVEN', 40, 160);
doc.font(FONTS.sansBold).fontSize(11).fillColor(COLORS.cream).text('HOSPITALITY OS', 42, 220, { characterSpacing: 4 });

// Elegant Gold Accent Lines
doc.lineWidth(1).strokeColor(COLORS.gold).moveTo(40, 245).lineTo(200, 245).stroke();
doc.lineWidth(0.5).strokeColor(COLORS.gold).moveTo(40, 249).lineTo(150, 249).stroke();

// Subtitle
doc.font(FONTS.serifItalic).fontSize(20).fillColor(COLORS.goldLight).text('The Operating System for Restaurants, Hotels & Cafes', 40, 275);

// The Core Value Pitch
doc.font(FONTS.sans).fontSize(11).fillColor(COLORS.cream).text(
  'A single, unified platform that consolidates your brand marketing, organic content creation, local search engine optimization, customer CRM, loyalty engine, table QR digital menus, point of sale operations, and real-time inventory tracking. We replace up to five fragmented vendor subscriptions and agencies with one high-performing operating system, served under a single flat-fee rate of ₹29,999/month. Completely commission-free.',
  40, 320, { width: 480, align: 'justify', lineGap: 6 }
);

// Decorative Box (Technical Specifications Summary)
const techBoxY = 470;
doc.rect(40, techBoxY, 515.28, 120).fill(COLORS.greenLight);
doc.rect(40, techBoxY, 515.28, 120).lineWidth(0.5).strokeColor(COLORS.gold);

doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.gold).text('SYSTEM BRIEF & PARAMETERS', 55, techBoxY + 15);
doc.lineWidth(0.5).strokeColor(COLORS.gold).moveTo(55, techBoxY + 30).lineTo(200, techBoxY + 30).stroke();

const items = [
  '• Flat Subscription: INR 29,999/month (No contract)',
  '• 0% Commissions: Free table QR order checkout loops',
  '• Included Hardware Integrations: POS & Kitchen Display Systems',
  '• Direct Support: 24/7 Automated Webhook & API Monitoring',
  '• Deployment Window: Completed in 14 days maximum'
];

doc.font(FONTS.sans).fontSize(9.5).fillColor(COLORS.cream);
items.forEach((item, idx) => {
  const isLeft = idx < 3;
  const colX = isLeft ? 55 : 300;
  const rowY = techBoxY + 45 + (idx % 3) * 20;
  doc.text(item, colX, rowY);
});

// Footer Cover Details
doc.font(FONTS.sans).fontSize(8.5).fillColor(COLORS.gold).text('DEVELOPED BY MAVEN HOSPITALITY PVT. LTD.', 40, 740);
doc.fillColor(COLORS.cream).text('TECHNICAL BLUEPRINT & DEPLOYMENT SPECIFICATIONS VERSION 4.2', 40, 755);
doc.text('© 2026 MAVEN LABS INC. ALL RIGHTS RESERVED.', 40, 770);

doc.save();
doc.font(FONTS.sansBold).fontSize(14).fillColor(COLORS.gold).text('₹29,999/mo', 400, 740, { align: 'right', width: 155 });
doc.fontSize(8.5).fillColor(COLORS.cream).text('Flat Agency Rate', 400, 760, { align: 'right', width: 155 });
doc.restore();


// ==========================================
// PAGE 2: WHAT WE DO (Soft Cream Theme - Inside Pages)
// ==========================================
doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });

// Fill background
doc.rect(0, 0, 595.28, 841.89).fill(COLORS.cream);
drawBorders(doc, false);
drawHeaderFooter(doc, 2, 'What We Do: Core Platform Services', false);

// Page Title
doc.font(FONTS.serifBold).fontSize(28).fillColor(COLORS.green).text('The 8 Core Services', 40, 65);
doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.gold).text('INTEGRATED MARKETING & OPERATIONAL MODULES', 42, 100, { characterSpacing: 1.5 });

// Introduction paragraph
doc.font(FONTS.sans).fontSize(9.5).fillColor(COLORS.textDark).text(
  'Maven consolidates all required guest-acquisition channels, automated communications, and operations dashboards into a single, cohesive unit. This eliminates the massive administrative friction, high payroll overhead, and data gaps of managing separate agencies and SaaS portals.',
  40, 115, { width: 515.28, align: 'justify', lineGap: 3 }
);

// Services Layout: 2 Columns of 4 services each
const services = [
  {
    num: '01',
    title: 'Meta Ads (Paid Social)',
    tag: 'DRIVE CONVERSIONS & FOOTFALL',
    desc: 'Hyper-local geofenced Facebook and Instagram ad campaigns. We map a strict radius around your locations, direct high-intent local foodies directly to bookings or private QR checkouts, design aesthetic video ads, and handle optimization continuously.'
  },
  {
    num: '02',
    title: 'Organic Content Creation',
    tag: 'BRAND IDENTITY & SOCIAL INTEGRITY',
    desc: 'A complete custom social media calendar written in your exact brand voice. Includes cinematic Instagram Reels scripts, visual feed layout grids, custom high-engagement story sequences, and daily cross-posting to Google Maps.'
  },
  {
    num: '03',
    title: 'Local SEO Optimization',
    tag: 'RANK #1 ON GOOGLE SEARCH',
    desc: 'We place your brand at the absolute peak of Google Maps results for local search terms (e.g. "italian restaurant near me"). Includes citation building, review generation automation, schema injection, and search profile maintenance.'
  },
  {
    num: '04',
    title: 'WhatsApp Cloud Automation',
    tag: 'OFFICIAL API CONCIERGE 24/7',
    desc: 'Meta\'s native Cloud API integrated into your reservation loops. Guests receive instant table availability answers, booking updates, abandoned checkouts recovery, and opt-in newsletters. Zero third-party platform middleman fees.'
  },
  {
    num: '05',
    title: 'Customer CRM & Loyalty',
    tag: 'MAXIMIZE LIFETIME VALUE',
    desc: 'We log guest history, preferences, average ticket spend, and visit frequencies. The CRM automatically triggers anniversary discounts, personalized WhatsApp campaigns, and automated win-back voucher codes if a guest lapses for 30 days.'
  },
  {
    num: '06',
    title: 'QR Menus & Table Ordering',
    tag: '0% COMMISSIONS DIRECT ORDERS',
    desc: 'Frictionless table-side digital menus designed to match your restaurant aesthetic. Diners scan and browse high-resolution dishes with allergen markers, order, request waiters, or pay. No app downloads required.'
  },
  {
    num: '07',
    title: 'POS & Inventory (Free Package)',
    tag: 'WORTH INR 5,000/MO - INCLUDED FREE',
    desc: 'Full enterprise front-of-house billing, recipe costing charts, role-based staff log-ins, cashier drawer verification, and back-of-house stock tracking. Fully integrated with your table-side QR orders and WhatsApp concierge.'
  },
  {
    num: '08',
    title: 'Managed Custom Web Portal',
    tag: 'SECURE, HIGH-SPEED STATIC HUBS',
    desc: 'A premium, custom website designed, developed, and managed by our core engineering team. Hosted on lighting-fast CDN nodes, fully secure SSL, and optimized for instant keyword indexing.'
  }
];

const startY = 175;
const rowHeight = 145;
const colWidth = 240;

services.forEach((s, idx) => {
  const colIdx = idx % 2;
  const rowIdx = Math.floor(idx / 2);
  
  const x = colIdx === 0 ? 40 : 315;
  const y = startY + rowIdx * rowHeight;
  
  // Render service
  doc.save();
  // Draw subtle top gold line
  doc.lineWidth(0.5).strokeColor('rgba(201, 168, 76, 0.4)').moveTo(x, y).lineTo(x + colWidth, y).stroke();
  
  // Service Number & Title
  doc.font(FONTS.serifBold).fontSize(13).fillColor(COLORS.green).text(`${s.num}. ${s.title}`, x, y + 10);
  // Tagline
  doc.font(FONTS.sansBold).fontSize(7.5).fillColor(COLORS.gold).text(s.tag, x, y + 25, { characterSpacing: 1 });
  // Description
  doc.font(FONTS.sans).fontSize(8.5).fillColor(COLORS.textDark).text(s.desc, x, y + 38, { width: colWidth, align: 'justify', lineGap: 3 });
  doc.restore();
});


// ==========================================
// PAGE 3: HOW WE DO IT (Soft Cream Theme - Technical Stack)
// ==========================================
doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });

// Fill background
doc.rect(0, 0, 595.28, 841.89).fill(COLORS.cream);
drawBorders(doc, false);
drawHeaderFooter(doc, 3, 'How We Do It: Technical Architecture', false);

// Page Title
doc.font(FONTS.serifBold).fontSize(28).fillColor(COLORS.green).text('Engineering Architecture', 40, 65);
doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.gold).text('SYSTEM PROTOCOLS, REAL-TIME PIPELINES & DATA FLOW', 42, 100, { characterSpacing: 1.5 });

// Architecture grid
const archItems = [
  {
    title: 'Edge Runtime Infrastructure',
    desc: 'Our applications run on Vercel\'s Edge Network. Next.js serverless functions render content from geographically close nodes, yielding sub-50ms Time-to-First-Byte (TTFB) and ensuring zero downtime even during massive traffic spikes.'
  },
  {
    title: 'Type-Safe Core API Protocol',
    desc: 'We utilize a tRPC API protocol which bridges the frontend and Express backend. This guarantees 100% compile-time type-safety across shared packages, completely preventing interface mismatches, broken APIs, and silent runtime crashes.'
  },
  {
    title: 'Real-Time Server-Sent Events (SSE)',
    desc: 'Unidirectional, persistent TCP streams push changes instantly. When a guest scans a QR code and places an order, the Express backend broadcasts the payload to the cashier terminal and Kitchen Display System (KDS) under 100ms. No database-heavy polling required.'
  },
  {
    title: 'Database Schema Isolation & Security',
    desc: 'Our database uses Prisma and Prisma Better-SQLite3 adapters. The system is designed with rigorous multi-tenant data boundaries, guaranteeing that customer CRM records, reservation ledgers, and transaction credentials are securely isolated.'
  }
];

const archStartY = 125;
const archRowHeight = 90;

archItems.forEach((a, idx) => {
  const y = archStartY + idx * archRowHeight;
  
  doc.save();
  // Draw subtle gold underline
  doc.lineWidth(0.5).strokeColor('rgba(201, 168, 76, 0.4)').moveTo(40, y).lineTo(555.28, y).stroke();
  
  // Icon/Bullet placeholder
  doc.rect(40, y + 15, 6, 6).fill(COLORS.gold);
  
  // Title
  doc.font(FONTS.serifBold).fontSize(13).fillColor(COLORS.green).text(a.title, 55, y + 12);
  // Description
  doc.font(FONTS.sans).fontSize(9).fillColor(COLORS.textDark).text(a.desc, 55, y + 28, { width: 500, align: 'justify', lineGap: 3 });
  doc.restore();
});

// Technical Spotlight Box: Inventory Decrement Engine
const spotlightY = 490;
doc.rect(40, spotlightY, 515.28, 125).fill(COLORS.greenLight);
doc.rect(40, spotlightY, 515.28, 125).lineWidth(0.5).strokeColor(COLORS.gold);

doc.save();
doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.gold).text('SPOTLIGHT: RECIPE-LEVEL INVENTORY DECREMENT ENGINE', 55, spotlightY + 15);
doc.lineWidth(0.5).strokeColor(COLORS.gold).moveTo(55, spotlightY + 28).lineTo(365, spotlightY + 28).stroke();

doc.font(FONTS.sans).fontSize(8.5).fillColor(COLORS.cream).text(
  'Unlike basic POS software that only tracks overall product sales, Maven runs an active relational recipe matrix linked directly to your digital inventory sheets. Every checkout triggers an atomic transaction that resolves recipes to their exact raw units:\n\n' +
  '• 1x Truffle Tagliolini -> Auto-decrements 6g imported truffle, 120g artisanal flour, and 1 egg.\n' +
  '• 1x Burrata Salad -> Auto-decrements 1 unit of fresh burrata and 80g of heirloom cherry tomatoes.\n\n' +
  'If any raw ingredient stock hits a pre-configured buffer threshold (e.g. Truffles remaining: < 50g), the system immediately halts orders for that item, displays a warning on the cashier monitor, and triggers an automated low-stock WhatsApp alert to the kitchen supervisor.',
  55, spotlightY + 38, { width: 485, align: 'justify', lineGap: 3 }
);
doc.restore();

// Flow Diagram Representation
const diagY = 640;
doc.save();
doc.font(FONTS.serifBold).fontSize(12).fillColor(COLORS.green).text('Real-Time Data Pipeline Diagram', 40, diagY);
doc.lineWidth(0.5).strokeColor('rgba(201, 168, 76, 0.5)').moveTo(40, diagY + 16).lineTo(555.28, diagY + 16).stroke();

// Draw 4 workflow blocks
const blocks = ['1. Dynamic QR Menu', '2. Serverless API', '3. Relational DB', '4. Live SSE Push'];
const blockW = 105;
const blockH = 40;
const blockGap = 30;

blocks.forEach((block, idx) => {
  const bx = 40 + idx * (blockW + blockGap);
  const by = diagY + 35;
  
  // Draw Box
  doc.rect(bx, by, blockW, blockH).fill(COLORS.greenDark);
  doc.rect(bx, by, blockW, blockH).lineWidth(0.5).strokeColor(COLORS.gold).stroke();
  
  // Draw Text
  doc.font(FONTS.sansBold).fontSize(8).fillColor(COLORS.cream).text(block, bx, by + 16, { align: 'center', width: blockW });
  
  // Draw Arrow to next (except last)
  if (idx < 3) {
    const ax = bx + blockW + 5;
    const ay = by + 20;
    doc.lineWidth(1).strokeColor(COLORS.gold);
    doc.moveTo(ax, ay).lineTo(ax + blockGap - 10, ay).stroke();
    // arrowhead
    doc.moveTo(ax + blockGap - 13, ay - 3).lineTo(ax + blockGap - 10, ay).lineTo(ax + blockGap - 13, ay + 3).stroke();
  }
});
doc.restore();


// ==========================================
// PAGE 4: WHAT IT SAVES (Soft Cream Theme - ROI Audit)
// ==========================================
doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });

// Fill background
doc.rect(0, 0, 595.28, 841.89).fill(COLORS.cream);
drawBorders(doc, false);
drawHeaderFooter(doc, 4, 'What It Saves: Financial ROI Ledger', false);

// Page Title
doc.font(FONTS.serifBold).fontSize(28).fillColor(COLORS.green).text('Economic ROI Ledger', 40, 65);
doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.gold).text('COST LEAKAGE AUDIT & FINANCIAL INTEGRATION OPTIONS', 42, 100, { characterSpacing: 1.5 });

// Explanatory ROI paragraph
doc.font(FONTS.sans).fontSize(9.5).fillColor(COLORS.textDark).text(
  'A high-end restaurant with a monthly online delivery and table ordering volume of ₹5,00,000 typically loses significant profit margins to aggregator commission structures, external creative retainers, billing POS softwares, and messaging services. We bundle this entire operational workflow into a single flat subscription, plugging leakage instantly.',
  40, 115, { width: 515.28, align: 'justify', lineGap: 3.5 }
);

// ROI TABLE
const tableY = 175;
const tableW = 515.28;
const col1W = 215.28;
const col2W = 150;
const col3W = 150;

// Table Header
doc.rect(40, tableY, tableW, 25).fill(COLORS.green);
doc.rect(40, tableY, tableW, 25).lineWidth(0.5).strokeColor(COLORS.gold).stroke();

doc.save();
doc.font(FONTS.sansBold).fontSize(8.5).fillColor(COLORS.gold);
doc.text('EXPENSE CATEGORY', 50, tableY + 9);
doc.text('THE FRAGMENTED WAY', 40 + col1W + 10, tableY + 9);
doc.text('THE MAVEN WAY', 40 + col1W + col2W + 10, tableY + 9);
doc.restore();

// Table Rows
const rows = [
  { cat: '20% Aggregator Commissions (on ₹5L)', old: '₹1,00,000 / month', new: '₹0 (Flat Direct Orders)' },
  { cat: 'Creative & Meta Social Agency Fee', old: '₹25,000 / month', new: 'Included Flat in Retainer' },
  { cat: 'Billing & POS Subscription (Petpooja/POSist)', old: '₹4,000 / month', new: 'Included FREE' },
  { cat: 'WhatsApp API & Broadcast SaaS (WATI/Interakt)', old: '₹5,000 / month', new: 'Included Flat' },
  { cat: 'Managed Web Hosting & Support (SSL/Dev)', old: '₹2,000 / month', new: 'Included Flat' }
];

let currentY = tableY + 25;
rows.forEach((row, idx) => {
  const isEven = idx % 2 === 0;
  // Alternating row background
  if (isEven) {
    doc.rect(40, currentY, tableW, 25).fill('rgba(28, 74, 56, 0.05)');
  }
  doc.rect(40, currentY, tableW, 25).lineWidth(0.5).strokeColor('rgba(201, 168, 76, 0.3)').stroke();
  
  doc.save();
  doc.font(FONTS.sans).fontSize(9).fillColor(COLORS.textDark);
  doc.text(row.cat, 50, currentY + 9);
  doc.fillColor('rgba(220, 38, 38, 0.8)').text(row.old, 40 + col1W + 10, currentY + 9);
  doc.font(FONTS.sansBold).fillColor(COLORS.green).text(row.new, 40 + col1W + col2W + 10, currentY + 9);
  doc.restore();
  
  currentY += 25;
});

// Total Row
doc.rect(40, currentY, tableW, 30).fill(COLORS.greenDark);
doc.rect(40, currentY, tableW, 30).lineWidth(0.5).strokeColor(COLORS.gold).stroke();

doc.save();
doc.font(FONTS.sansBold).fontSize(9.5).fillColor(COLORS.gold);
doc.text('ESTIMATED MONTHLY TOTAL', 50, currentY + 11);
doc.fillColor(COLORS.redLight).text('₹1,36,000 / month', 40 + col1W + 10, currentY + 11);
doc.fillColor(COLORS.cream).text('₹29,999 / month', 40 + col1W + col2W + 10, currentY + 11);
doc.restore();

currentY += 30;

// Savings Callout Banner
const bannerY = currentY + 25;
doc.rect(40, bannerY, tableW, 90).fill('rgba(201, 168, 76, 0.1)');
doc.rect(40, bannerY, tableW, 90).lineWidth(0.5).strokeColor(COLORS.gold).stroke();

doc.save();
doc.font(FONTS.serifBold).fontSize(16).fillColor(COLORS.green).text('Guaranteed Bottom-Line Impact', 55, bannerY + 18);
doc.font(FONTS.sansBold).fontSize(18).fillColor(COLORS.green).text('₹1,06,001 / month saved', 335, bannerY + 16, { align: 'right', width: 200 });

doc.font(FONTS.sans).fontSize(8.5).fillColor(COLORS.textDark).text(
  'By shifting reservation acquisition to social media channels, routing customer bookings via WhatsApp Cloud, and serving digital digital table QR ordering natively, Maven completely plugs revenue leaks. You retain 100% of your order volume margins, resulting in an estimated INR 12.7 Lakhs in newly recaptured annual profits.',
  55, bannerY + 45, { width: 485, align: 'justify', lineGap: 3 }
);
doc.restore();

// Plan packages details
const pkgY = bannerY + 115;
doc.font(FONTS.serifBold).fontSize(14).fillColor(COLORS.green).text('Simple, Flat Contract-Free Packages', 40, pkgY);
doc.lineWidth(0.5).strokeColor('rgba(201, 168, 76, 0.4)').moveTo(40, pkgY + 18).lineTo(555.28, pkgY + 18).stroke();

const pkgs = [
  {
    title: 'THE BASIC OS (Marketing focus)',
    sub: '₹19,999/mo flat rate',
    desc: 'Includes core Meta Ads, organic Instagram management, 5 reels script designs, and local SEO citation generation. Designed for brands that already have a dedicated billing system but require robust local customer acquisition.'
  },
  {
    title: 'THE FULL ENTERPRISE OS (Recommended)',
    sub: '₹29,999/mo flat rate',
    desc: 'All 8 Services included. Meta Ads, content management, WhatsApp Cloud API concierge, customer CRM, table QR menu flows, recipe-level Point of Sale software, kitchen display system support, and custom web portals. Completely contract-free.'
  }
];

pkgs.forEach((pkg, idx) => {
  const px = 40 + idx * 270;
  doc.save();
  doc.font(FONTS.sansBold).fontSize(10).fillColor(COLORS.green).text(pkg.title, px, pkgY + 30, { width: 245 });
  doc.font(FONTS.sansBold).fontSize(10).fillColor(COLORS.gold).text(pkg.sub, px, pkgY + 44);
  doc.font(FONTS.sans).fontSize(8.5).fillColor(COLORS.textDark).text(pkg.desc, px, pkgY + 58, { width: 245, align: 'justify', lineGap: 3 });
  doc.restore();
});


// ==========================================
// PAGE 5: GUEST JOURNEY & FAQS (Dark Green Theme)
// ==========================================
doc.addPage({ size: 'A4', margins: { top: 40, bottom: 40, left: 40, right: 40 } });

// Fill background
doc.rect(0, 0, 595.28, 841.89).fill(COLORS.greenDark);
drawBorders(doc, true);
drawHeaderFooter(doc, 5, 'How It Helps: Guest Lifecycle & Roadmap', true);

// Title
doc.font(FONTS.serifBold).fontSize(28).fillColor(COLORS.gold).text('Lifecycle & FAQs', 40, 65);
doc.font(FONTS.sansBold).fontSize(9).fillColor(COLORS.cream).text('THE GUEST JOURNEY PIPELINE & SYSTEM DEPLOYMENT ROADMAP', 42, 100, { characterSpacing: 1.5 });

// Two-column layout: Left column is Guest Journey & Onboarding, Right column is FAQ
const leftColX = 40;
const rightColX = 305;
const colW = 250;

// LEFT COLUMN
doc.save();
doc.font(FONTS.serifBold).fontSize(13).fillColor(COLORS.gold).text('The 8-Step Guest Lifecycle', leftColX, 125);
doc.lineWidth(0.5).strokeColor(COLORS.gold).moveTo(leftColX, 140).lineTo(leftColX + colW, 140).stroke();

const steps = [
  '1. Discover: Geofenced Ads & local SEO find guests.',
  '2. Engagement: WhatsApp Cloud Auto answers bookings.',
  '3. Scan: Table QR code displays beautiful dynamic menus.',
  '4. Checkout: Frictionless table-side digital orders flow.',
  '5. Processing: Instant billing syncs KDS in kitchen.',
  '6. Inventory: Stock logs recipes & decrements.',
  '7. Database: CRM logs history, averages, profiles.',
  '8. Return: automated anniversary loops re-engage VIPs.'
];

doc.font(FONTS.sans).fontSize(8.5).fillColor(COLORS.cream);
steps.forEach((step, idx) => {
  doc.text(step, leftColX, 150 + idx * 22, { width: colW });
});

// Onboarding Timeline below steps
const obY = 345;
doc.font(FONTS.serifBold).fontSize(13).fillColor(COLORS.gold).text('14-Day Onboarding Roadmap', leftColX, obY);
doc.lineWidth(0.5).strokeColor(COLORS.gold).moveTo(leftColX, obY + 15).lineTo(leftColX + colW, obY + 15).stroke();

const timeline = [
  '• Days 1-3: Marketing Audit & Asset Capture',
  '• Days 4-7: WhatsApp API Setup & Menu Translation',
  '• Days 8-11: POS Inventory Setup & Table QR Prints',
  '• Days 12-13: Meta Campaign Dev & Server Integration',
  '• Day 14: System Live Operations!'
];

timeline.forEach((item, idx) => {
  doc.text(item, leftColX, obY + 25 + idx * 20, { width: colW });
});
doc.restore();


// RIGHT COLUMN: FAQs
doc.save();
doc.font(FONTS.serifBold).fontSize(13).fillColor(COLORS.gold).text('Frequently Asked Questions', rightColX, 125);
doc.lineWidth(0.5).strokeColor(COLORS.gold).moveTo(rightColX, 140).lineTo(rightColX + colW, 140).stroke();

const faqs = [
  {
    q: 'Do I need to buy expensive billing hardware?',
    a: 'No. The Maven Point of Sale runs natively on standard tablets, iPads, PCs, and web browsers. There is zero hardware lock-in. You can use your existing thermal printers and hardware routers.'
  },
  {
    q: 'Can I keep my existing Petpooja or POSist billing?',
    a: 'Absolutely. If you are already locked into a POS subscription and only require our marketing, SEO, and WhatsApp automation modules, you can opt for our Basic OS tier.'
  },
  {
    q: 'Are there hidden setup fees or long-term contracts?',
    a: 'None. Maven operates strictly under a month-to-month flat-rate subscription. You can upgrade, downgrade, or cancel at any time with a simple 30-day notice.'
  },
  {
    q: 'How do you prevent data leaks or service downtime?',
    a: 'Our systems use isolated Prisma-managed transactional SQLite databases for each brand. The landing and POS interfaces are served via Vercel Edge networks ensuring 99.9% uptime.'
  }
];

doc.font(FONTS.sansBold).fontSize(8.5).fillColor(COLORS.gold);
faqs.forEach((faq, idx) => {
  const y = 150 + idx * 115;
  doc.font(FONTS.sansBold).fontSize(8.5).fillColor(COLORS.gold).text(`Q: ${faq.q}`, rightColX, y, { width: colW });
  doc.font(FONTS.sans).fontSize(8.2).fillColor(COLORS.cream).text(`A: ${faq.a}`, rightColX, y + 15, { width: colW, align: 'justify', lineGap: 3 });
});
doc.restore();


// DIRECT BACK-COVER CALL TO ACTION (Bottom banner across page)
const ctaBoxY = 620;
doc.rect(40, ctaBoxY, 515.28, 140).fill(COLORS.greenLight);
doc.rect(40, ctaBoxY, 515.28, 140).lineWidth(0.5).strokeColor(COLORS.gold).stroke();

doc.save();
doc.font(FONTS.serifBold).fontSize(20).fillColor(COLORS.gold).text('Deploy Your Custom System', 55, ctaBoxY + 20);
doc.font(FONTS.sans).fontSize(9.5).fillColor(COLORS.cream).text(
  'Ready to consolidate your branding and tech stack while reclaiming your aggregator margins? Book your onboarding audit call with our core product engineering team today. We\'ll audit your current cost leakage and walk you through the custom portal features.\n\n' +
  'Email: deployments@maven.hospitality  |  Web: maven.hospitality  |  Suite 404, Tech Plaza, BLR',
  55, ctaBoxY + 45, { width: 485, align: 'justify', lineGap: 4 }
);
doc.restore();

// End of doc
doc.end();

writeStream.on('finish', () => {
  console.log('✅ [Brochure Generator] PDF brochure created successfully!');
});
writeStream.on('error', (err) => {
  console.error('❌ [Brochure Generator] Error compiling PDF brochure:', err);
});
