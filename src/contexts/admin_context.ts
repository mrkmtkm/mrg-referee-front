import { createContext } from 'react';
import { Admin } from '@/entities';

export const AdminContext = createContext<Admin | null>(null);
