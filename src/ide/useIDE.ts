import { useContext } from 'react';
import { IDEContext } from './IDEContext';
import type { IDEContextValue } from './IDEProvider';

export function useIDE(): IDEContextValue {
  const context = useContext(IDEContext);
  if (!context) {
    throw new Error('useIDE must be used within an IDEProvider');
  }
  return context;
}
