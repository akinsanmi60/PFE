import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { AuthProvider } from '@contexts/AuthProvider';

export interface RouteWrapperProps {
  children?: React.ReactNode;
  enableQueryRetries?: boolean;
  initialRoute?: string;
}

export function RouteWrapper({
  children,
  enableQueryRetries = false,
  initialRoute = '/',
}: RouteWrapperProps) {
  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: enableQueryRetries } },
      }),
    [enableQueryRetries],
  );

  //Handling the case when children is not provided is important to prevent potential errors or unexpected behavior in the application.
  if (!children) {
    return <div>No content available</div>;
  }

  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

//Creating the queryClient instance outside of the RouteWrapper component can lead to unnecessary re-creations of the queryClient when the component re-renders.
// By creating the queryClient inside the RouteWrapper component using the useMemo hook, we can ensure that the queryClient is only created once and reused across renders, improving performance.
