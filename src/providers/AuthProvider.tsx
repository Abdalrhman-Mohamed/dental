'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (!token) {
      router.push('/auth');
    }
  }, []);

  return <>{children}</>;
}