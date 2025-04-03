import '@fontsource-variable/inter';
import '@fontsource/poppins';
import { Provider } from 'jotai';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Loader } from './layout/Loader';
import { AppRouter } from './routes/AppRouter';
import './styles/index.css';


createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Loader />}>
    <Provider>
      <AppRouter />
    </Provider>
  </Suspense>
)
