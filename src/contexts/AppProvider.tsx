import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import FormProvider from './FormProvider';
import ModalProvider from './ModalProvider';
import { AuthProvider } from './AuthProvider';
import { ToastContainer } from 'react-toastify';

type ProviderProps = {
  children: React.ReactNode;
};

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        height: '100vh',
        fontFamily: 'Inter',
        boxSizing: 'border-box',
      },
    },
  },
});

export default function AppProviders({ children }: ProviderProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
        cacheTime: 600000,
      },
      mutations: {
        useErrorBoundary: false,
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ModalProvider>
          <FormProvider>
            <QueryClientProvider client={queryClient}>
              {children}
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-left"
              />
              <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </QueryClientProvider>
          </FormProvider>
        </ModalProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
