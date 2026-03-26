import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IDEProvider } from './ide/IDEProvider';
import { IDE } from './ide/IDE';
import './ide/editor/ghost-comments.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IDEProvider>
      <IDE />
    </IDEProvider>
  </StrictMode>,
);
