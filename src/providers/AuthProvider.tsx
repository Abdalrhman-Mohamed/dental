'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

const publicRoutes = ['/auth', '/', '/about', '/contact'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('auth');

    if (!token && !publicRoutes.includes(pathname)) {
      router.push('/auth');
    }

    if (token && pathname === '/auth') {
      router.push('/');
    }
  }, [pathname, router]);

  return <>{children}</>;
}