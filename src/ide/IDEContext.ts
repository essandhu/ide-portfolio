import { createContext } from 'react';
import type { IDEContextValue } from './IDEProvider';

export const IDEContext = createContext<IDEContextValue | null>(null);
