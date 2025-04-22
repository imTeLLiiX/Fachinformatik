import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BookOpen,
  Users,
  Settings,
  BarChart,
  CreditCard,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: BarChart },
  { name: 'Kurse', href: '/admin/courses', icon: BookOpen },
  { name: 'Benutzer', href: '/admin/users', icon: Users },
  { name: 'Abonnements', href: '/admin/subscriptions', icon: CreditCard },
  { name: 'Einstellungen', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => {
            // TODO: Implement logout
            window.location.href = '/login';
          }}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Abmelden</span>
        </button>
      </div>
    </div>
  );
} 