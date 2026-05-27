'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from '../utils/trpc';
import { getApiUrl } from '../utils/apiConfig';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getApiUrl()}/trpc`,
          headers() {
            if (typeof window !== 'undefined') {
              const sessionStr = localStorage.getItem('maven_session');
              if (sessionStr) {
                try {
                  const session = JSON.parse(sessionStr);
                  if (session.token) {
                    return {
                      Authorization: `Bearer ${session.token}`,
                    };
                  }
                } catch (e) {
                  // Ignore
                }
              }
            }
            return {};
          },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
