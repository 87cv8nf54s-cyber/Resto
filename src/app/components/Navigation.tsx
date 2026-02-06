'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="ZZPCV Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`hidden sm:inline-block text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === '/pricing' ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              Prijzen
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Bekijk Templates
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
