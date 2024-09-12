import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';

import router from './router';
import QueryProvider from './providers/QueryProvider';
import TokenProvider from './providers/TokenProvider';
import { Toaster } from './providers/ToastProviders';

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      }
    >
      <TokenProvider>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </TokenProvider>

      <Toaster />
    </Suspense>
  );
}

export default App;
