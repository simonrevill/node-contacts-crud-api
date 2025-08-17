import {
  QueryClient,
  QueryClientProvider,
  type QueryClientConfig,
} from "@tanstack/react-query";

export const createQueryClient = (): {
  queryClient: QueryClient;
  QueryClientProvider: typeof QueryClientProvider;
} => {
  const isPlaywrightTest = import.meta.env.VITE_TEST_ENV === "playwright";

  const queryClientPlaywrightConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  };

  const queryClient = new QueryClient(
    isPlaywrightTest ? queryClientPlaywrightConfig : undefined
  );

  return {
    queryClient,
    QueryClientProvider,
  };
};
