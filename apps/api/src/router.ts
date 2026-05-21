import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { Context } from './context.js';

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
    .mutation(({ input }) => {
      console.log('📬 [API] New Hospitality Inquiry Received:', input);
      return {
        success: true,
        message: `Thank you, ${input.name}! We have received your inquiry for "${input.businessName}". Our hospitality onboarding team will contact you at ${input.phone} and via email at ${input.email} shortly.`,
      };
    }),
});

export type AppRouter = typeof appRouter;

