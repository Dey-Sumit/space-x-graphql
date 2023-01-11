import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

/* React Query Client*/
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: (failureCount, error: any) => failureCount < 3 && error?.response?.status >= 500, // retry on 5xx errors for 3 times
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
