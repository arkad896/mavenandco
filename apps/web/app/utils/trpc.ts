import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@maven/api';

export const trpc = createTRPCReact<AppRouter>();
