import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

import router from './router';
import QueryProvider from './providers/QueryProvider';
import TokenProvider from './providers/TokenProvider';
import { Toaster } from './providers/ToastProviders';
import { GOOGLE_CLIENT_ID } from './constants/variables';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      }
    >
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <QueryProvider>
          <UserProvider>
            <TokenProvider>
              <RouterProvider router={router} />
            </TokenProvider>
          </UserProvider>
        </QueryProvider>
      </GoogleOAuthProvider>

      <Toaster />
    </Suspense>
  );
}

export default App;
