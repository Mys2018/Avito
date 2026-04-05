import {type ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface QueryProviderProp {
  children: ReactNode
}

export const QueryProvider = ({children} : QueryProviderProp) => {
  const [queryClient] = useState(
      () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                refetchOnWindowFocus: false,
                retry: 1
              }
            }
          })
  )

  return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
  )
}