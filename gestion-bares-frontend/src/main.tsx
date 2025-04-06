import '@fontsource-variable/inter';
import '@fontsource/poppins';
import { Provider } from 'jotai';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Loading } from './layouts/Loading.tsx';
import { AppRouter } from './routes/AppRouter.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loading />}>
    <Provider>
      <AppRouter />
    </Provider>
  </Suspense>
);
