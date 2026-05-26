import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context.js';
import { eventEmitter } from './events.js';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  getSystemStatus: publicProcedure.query(() => {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      service: 'tRPC Express API Service',
    };
  }),

  greetUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).default('Developer'),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Welcome, ${input.name}! Your tRPC monorepo is fully functional and type-safe.`,
      };
    }),

  submitInquiry: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(10, 'Phone number must be at least 10 digits'),
        businessName: z.string().min(1, 'Business name is required'),
        businessType: z.enum(['Restaurant', 'Cafe', 'Hotel', 'Cloud Kitchen', 'Resort', 'Other']),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log('📬 [API] New Hospitality Inquiry Received:', input);
      
      const inquiry = await ctx.prisma.inquiry.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
          businessName: input.businessName,
          businessType: input.businessType,
          notes: input.notes || null,
        },
      });

      return {
        success: true,
        inquiryId: inquiry.id,
        message: `Thank you, ${input.name}! We have received your inquiry for "${input.businessName}". Our hospitality onboarding team will contact you at ${input.phone} and via email at ${input.email} shortly.`,
      };
    }),

  getInquiries: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.inquiry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }),

  updateInquiryStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(['New', 'Contacted', 'Converted', 'Archived']),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updated = await ctx.prisma.inquiry.update({
        where: { id: input.id },
        data: { status: input.status },
      });
      return { success: true, inquiry: updated };
    }),

  createCheckoutSession: publicProcedure
    .input(
      z.object({
        tierId: z.enum(['starter', 'full-os', 'enterprise']),
        businessName: z.string().optional(),
        email: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      console.log('💳 [API] Initiating Simulated Stripe Checkout Session for tier:', input.tierId);
      
      const pricingTiers = {
        'starter': { name: 'Starter OS Plan', price: 14999 },
        'full-os': { name: 'Full Hospitality OS', price: 29999 },
        'enterprise': { name: 'Enterprise Custom', price: 89999 },
      };

      const selected = pricingTiers[input.tierId];
      const sessionId = `cs_live_${Math.random().toString(36).substring(2, 15)}`;
      const clientSecret = `seti_secret_${Math.random().toString(36).substring(2, 20)}`;

      return {
        success: true,
        sessionId,
        clientSecret,
        tierId: input.tierId,
        tierName: selected.name,
        price: selected.price,
        currency: 'INR',
        checkoutUrl: `https://checkout.stripe.com/pay/${sessionId}`,
        timestamp: new Date().toISOString(),
      };
    }),

  simulatePOSOrder: publicProcedure
    .input(
      z.object({
        brandId: z.string().default('fine-dining'),
        tableId: z.number().min(1).max(20),
        amount: z.number().min(1),
        itemsCount: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log('🍔 [API] Simulating POS Order checkout:', input);
      
      const payload = {
        type: 'POS_ORDER',
        brandId: input.brandId,
        tableId: input.tableId,
        amount: input.amount,
        itemsCount: input.itemsCount,
        timestamp: new Date().toISOString(),
        message: `Table ${input.tableId} checked out for ₹${input.amount.toLocaleString('en-IN')} (${input.itemsCount} items)`
      };

      eventEmitter.emit('live-event', payload);

      return {
        success: true,
        payload
      };
    }),

  simulateWhatsAppMessage: publicProcedure
    .input(
      z.object({
        brandId: z.string().default('fine-dining'),
        senderName: z.string().min(1),
        messageText: z.string().min(1),
        intent: z.string().default('General Booking'),
      })
    )
    .mutation(async ({ input }) => {
      console.log('💬 [API] Simulating Incoming WhatsApp Message:', input);
      
      const payload = {
        type: 'WHATSAPP_LOG',
        brandId: input.brandId,
        senderName: input.senderName,
        messageText: input.messageText,
        intent: input.intent,
        timestamp: new Date().toISOString(),
        message: `WhatsApp from ${input.senderName}: "${input.messageText}" [Intent: ${input.intent}]`
      };

      eventEmitter.emit('live-event', payload);

      return {
        success: true,
        payload
      };
    }),

  simulateAdImpression: publicProcedure
    .input(
      z.object({
        brandId: z.string().default('fine-dining'),
        platform: z.enum(['Instagram Reels', 'Facebook Feed', 'Local Maps']),
        budget: z.number().min(1),
      })
    )
    .mutation(async ({ input }) => {
      console.log('📢 [API] Simulating Meta Ad Impression:', input);
      
      const payload = {
        type: 'AD_IMPRESSION',
        brandId: input.brandId,
        platform: input.platform,
        budget: input.budget,
        timestamp: new Date().toISOString(),
        message: `Campaign impression on ${input.platform} | Daily Spend: ₹${input.budget}`
      };

      eventEmitter.emit('live-event', payload);

      return {
        success: true,
        payload
      };
    }),

  getBrands: publicProcedure.query(async ({ ctx }) => {
    let brands = await ctx.prisma.brand.findMany({
      orderBy: { createdAt: 'asc' },
    });

    if (brands.length === 0) {
      console.log('🌱 [API] Seeding default brands in SQLite dev.db...');
      const defaultBrands = [
        {
          id: 'fine-dining',
          name: 'The Heritage Room',
          type: 'Fine Dining Restaurant',
          accent: '#C9A84C',
          icon: 'utensils',
          passphrase: 'venuepass',
          spend: 14500,
          impressions: 185200,
          ctr: 4.85,
          roas: 6.4,
          sales: 124000,
          occupancy: '92%',
          growth: '+18.4%',
          adHeadline: 'Experience Culinary Heritage',
          adDescription: 'Savor Michelin-inspired traditional recipes recreated with fresh seasonal ingredients. Indulge in our curated 7-course tasting menu.',
          adImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
          adCta: 'Book Fine Table',
          waTriggers: '/reserve,/menu,/private-dining',
          waReply: 'Welcome to The Heritage Room reservation desk! 🌟 We have open tables tonight at 7:30 PM and 9:00 PM. Would you like to reserve a premium gold-view booth for 2 guests?',
          tablesJson: JSON.stringify([
            { id: 1, label: 'Table 1', size: 4, status: 'occupied', bill: 8500, items: ['7-Course Tasting', 'Heritage Reserve Wine'] },
            { id: 2, label: 'Table 2', size: 2, status: 'checkout', bill: 4200, items: ['Truffle Lobster Risotto', 'Saffron Gelato'] },
            { id: 3, label: 'Table 3', size: 6, status: 'free', bill: 0, items: [] },
            { id: 4, label: 'Table 4', size: 2, status: 'occupied', bill: 3800, items: ['Smoked Lamb Cutlets', 'Cardamom Martini'] },
            { id: 5, label: 'Table 5', size: 4, status: 'free', bill: 0, items: [] },
            { id: 6, label: 'Table 6', size: 8, status: 'occupied', bill: 14200, items: ['Chef Special Roast Platter', 'Vintage Cabernet'] },
          ]),
        },
        {
          id: 'cafe',
          name: 'Brew & Bound',
          type: 'Boutique Coffee & Bistro',
          accent: '#D4A373',
          icon: 'coffee',
          passphrase: 'venuepass',
          spend: 8200,
          impressions: 210400,
          ctr: 5.92,
          roas: 5.1,
          sales: 48500,
          occupancy: '74%',
          growth: '+24.1%',
          adHeadline: 'Your Daily Fuel & Sanctuary',
          adDescription: 'Slow-drip specialty roasts meet freshly baked sourdough pastries. The perfect space to work, read, or catch up with friends.',
          adImageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
          adCta: 'Claim Free Espresso',
          waTriggers: '/offers,/order-pastry,/location',
          waReply: 'Hey there from Brew & Bound! ☕ Join our Coffee Club today and get a complimentary freshly-baked croissant with your first brew. Reply with /offers to see today\'s specials!',
          tablesJson: JSON.stringify([
            { id: 1, label: 'Bar 1', size: 1, status: 'occupied', bill: 450, items: ['Cold Brew Siphon', 'Almond Croissant'] },
            { id: 2, label: 'Table 1', size: 2, status: 'free', bill: 0, items: [] },
            { id: 3, label: 'Table 2', size: 4, status: 'occupied', bill: 1800, items: ['Avocado Sourdough Toast', 'Flat White', 'Matcha Latte'] },
            { id: 4, label: 'Table 3', size: 2, status: 'checkout', bill: 920, items: ['Classic Cappuccino', 'Pistachio Cruffin'] },
            { id: 5, label: 'Table 4', size: 2, status: 'occupied', bill: 680, items: ['Pour Over Coffee', 'Lemon Tart'] },
            { id: 6, label: 'Bar 2', size: 1, status: 'free', bill: 0, items: [] },
          ]),
        },
        {
          id: 'cloud-kitchen',
          name: 'Bowl & Box Co.',
          type: 'Cloud Kitchen & Delivery',
          accent: '#E76F51',
          icon: 'store',
          passphrase: 'venuepass',
          spend: 18900,
          impressions: 340500,
          ctr: 3.74,
          roas: 4.8,
          sales: 195000,
          occupancy: 'N/A',
          growth: '+31.6%',
          adHeadline: 'Gourmet Meal Boxes, Delivered Hot',
          adDescription: 'Perfectly balanced, high-protein bowls and executive meal combos delivered in premium eco-friendly, spill-safe packaging in under 25 mins.',
          adImageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
          adCta: 'Order 30% Off',
          waTriggers: '/order-now,/menu-cloud,/track-box',
          waReply: 'Thanks for choosing Bowl & Box! 🥗 Tap /order-now to open our instant WhatsApp-web menu with exclusive 30% discount code prefilled.',
          tablesJson: JSON.stringify([
            { id: 1, label: 'Delivery #104', size: 1, status: 'occupied', bill: 1200, items: ['Keto Teriyaki Bowl', 'Clean Kombucha'] },
            { id: 2, label: 'Prep Station 1', size: 1, status: 'checkout', bill: 640, items: ['Butter Chicken Bowl', 'Garlic Naan'] },
            { id: 3, label: 'Delivery #105', size: 1, status: 'free', bill: 0, items: [] },
            { id: 4, label: 'Prep Station 2', size: 1, status: 'occupied', bill: 950, items: ['Tofu Harvest Salad', 'Detox Green Juice'] },
            { id: 5, label: 'Delivery #106', size: 1, status: 'free', bill: 0, items: [] },
            { id: 6, label: 'Prep Station 3', size: 1, status: 'occupied', bill: 1120, items: ['Spicy Salmon Poke Bowl', 'Matcha Latte'] },
          ]),
        }
      ];

      for (const brand of defaultBrands) {
        await ctx.prisma.brand.create({ data: brand });
      }

      brands = await ctx.prisma.brand.findMany({
        orderBy: { createdAt: 'asc' },
      });
    }

    return brands;
  }),

  getBrandById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const brand = await ctx.prisma.brand.findUnique({
        where: { id: input.id },
      });
      if (!brand) {
        throw new Error(`Brand with ID "${input.id}" not found.`);
      }
      return brand;
    }),

  generateOnboardingToken: publicProcedure
    .input(z.object({ inquiryId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      console.log('🔑 [API] Generating Onboarding Token for Inquiry:', input.inquiryId);
      const token = `MAVEN-ONB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      await ctx.prisma.inquiry.update({
        where: { id: input.inquiryId },
        data: { onboardingToken: token },
      });
      return { success: true, token };
    }),

  verifyOnboardingToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input, ctx }) => {
      console.log('🔍 [API] Verifying Onboarding Token:', input.token);
      const inquiry = await ctx.prisma.inquiry.findUnique({
        where: { onboardingToken: input.token },
      });
      if (!inquiry) {
        throw new Error('Invalid onboarding token.');
      }
      if (inquiry.status === 'Converted') {
        throw new Error('This onboarding space has already been converted and activated.');
      }
      return {
        success: true,
        inquiryId: inquiry.id,
        businessName: inquiry.businessName,
        businessType: inquiry.businessType,
        contactName: inquiry.name,
        email: inquiry.email,
      };
    }),

  onboardBrand: publicProcedure
    .input(
      z.object({
        brandId: z.string().min(2, 'Slug must be at least 2 characters'),
        name: z.string().min(1, 'Brand name is required'),
        type: z.string().min(1, 'Business type is required'),
        accent: z.string().min(4, 'Hex color is required'),
        icon: z.enum(['utensils', 'coffee', 'store', 'sparkles']),
        passphrase: z.string().min(4, 'Passphrase must be at least 4 characters').default('venuepass'),
        dishes: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
            price: z.number(),
          })
        ),
        adHeadline: z.string().min(1, 'Headline is required'),
        adDescription: z.string().min(1, 'Ad description is required'),
        adImageUrl: z.string().url().default('https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80'),
        adCta: z.string().default('Claim Offer'),
        waTriggers: z.string().min(1),
        waReply: z.string().min(1),
        onboardingToken: z.string().min(1, 'Onboarding token is required'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log('🚀 [API] Onboarding New Hospitality Brand with Token:', input.name, input.onboardingToken);

      // Verify onboarding token
      const inquiry = await ctx.prisma.inquiry.findUnique({
        where: { onboardingToken: input.onboardingToken }
      });
      if (!inquiry) {
        throw new Error('Invalid onboarding token.');
      }
      if (inquiry.status === 'Converted') {
        throw new Error('This onboarding space has already been converted and activated.');
      }

      const dishNames = input.dishes.map(d => d.name);
      const fallbackDishes = dishNames.length > 0 ? dishNames : ['Chef Gourmet Special', 'House Specialty Drink'];

      const generatedTables = [
        { id: 1, label: 'Table 1', size: 4, status: 'occupied', bill: 4200, items: [fallbackDishes[0], 'Premium Mocktail'] },
        { id: 2, label: 'Table 2', size: 2, status: 'checkout', bill: 2400, items: [fallbackDishes[1] || fallbackDishes[0]] },
        { id: 3, label: 'Table 3', size: 6, status: 'free', bill: 0, items: [] },
        { id: 4, label: 'Table 4', size: 2, status: 'occupied', bill: 1800, items: [fallbackDishes[2] || fallbackDishes[0], 'Chef Special Dessert'] },
        { id: 5, label: 'Table 5', size: 4, status: 'free', bill: 0, items: [] },
        { id: 6, label: 'Table 6', size: 8, status: 'free', bill: 0, items: [] },
      ];

      const brand = await ctx.prisma.brand.create({
        data: {
          id: input.brandId,
          name: input.name,
          type: input.type,
          accent: input.accent,
          icon: input.icon,
          passphrase: input.passphrase,
          spend: 12000,
          impressions: 150000,
          ctr: 4.2,
          roas: 5.5,
          sales: 85000,
          occupancy: '70%',
          growth: '+12.5%',
          adHeadline: input.adHeadline,
          adDescription: input.adDescription,
          adImageUrl: input.adImageUrl,
          adCta: input.adCta,
          waTriggers: input.waTriggers,
          waReply: input.waReply,
          tablesJson: JSON.stringify(generatedTables),
        },
      });

      // Update the inquiry status and consume the token
      await ctx.prisma.inquiry.update({
        where: { id: inquiry.id },
        data: { 
          status: 'Converted',
          onboardingToken: null // Consume/Clear token
        },
      });
      console.log(`✅ [API] Inquiry ${inquiry.id} converted and token consumed.`);

      eventEmitter.emit('live-event', {
        type: 'SYSTEM',
        brandId: brand.id,
        message: `Brand "${brand.name}" onboarded and system pipeline activated successfully!`,
        payload: { action: 'ONBOARD', brandId: brand.id },
      });

      return {
        success: true,
        brandId: brand.id,
        message: `Congratulations! "${brand.name}" has been registered. They can now log in using passphrase: "${brand.passphrase}".`,
      };
    }),
});

export type AppRouter = typeof appRouter;

