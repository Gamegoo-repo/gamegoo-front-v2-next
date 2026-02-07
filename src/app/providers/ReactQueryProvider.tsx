"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: (failureCount, error) => {
          if (error instanceof TypeError) return false;
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 60,
        enabled: true,
      },
      mutations: {
        onError: (error) => {
          console.error("뮤테이션 오류:", error);
        },
      },
    },
  });

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const client = createQueryClient();

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === "development"} />
    </QueryClientProvider>
  );
}
