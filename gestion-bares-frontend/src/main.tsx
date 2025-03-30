import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { AppRouter } from './routes/AppRouter';
import '@fontsource-variable/inter';
import '@fontsource/poppins';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
