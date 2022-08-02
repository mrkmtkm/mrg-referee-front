import React, { ReactNode, useEffect, useState } from 'react';
import { AdminService } from '@/services';
import { useRouter } from 'next/router';
import { Admin } from '@/entities';
import { AdminContext } from '@/contexts';
interface Props {
  children: ReactNode;
}
export const AdminAuth = ({ children }: Props) => {
  const router = useRouter();
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);

  async function fetchData() {
    try {
      setCurrentAdmin(await AdminService.me());
    } catch (e) {
      router.push('/admin/login');
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return currentAdmin ? (
    <AdminContext.Provider value={currentAdmin}>
      {children}
    </AdminContext.Provider>
  ) : null;
};
