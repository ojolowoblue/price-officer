import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Loader2Icon } from 'lucide-react';

import router from './router';

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Loader2Icon className="animate-spin" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
