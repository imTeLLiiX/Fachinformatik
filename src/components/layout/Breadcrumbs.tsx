import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)}>
      <Link 
        href="/"
        className="flex items-center text-gray-500 hover:text-gray-700"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link
            href={item.href}
            className={cn(
              'ml-2',
              index === items.length - 1
                ? 'text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            )}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
} 