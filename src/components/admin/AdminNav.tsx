import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Users,
  BookOpen,
  Settings,
  BarChart,
  CreditCard,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: BarChart,
    roles: ['content-admin', 'super-admin']
  },
  {
    title: 'Benutzer',
    href: '/admin/users',
    icon: Users,
    roles: ['super-admin']
  },
  {
    title: 'Module',
    href: '/admin/modules',
    icon: BookOpen,
    roles: ['content-admin', 'super-admin']
  },
  {
    title: 'Abrechnung',
    href: '/admin/billing',
    icon: CreditCard,
    roles: ['super-admin']
  },
  {
    title: 'Einstellungen',
    href: '/admin/settings',
    icon: Settings,
    roles: ['super-admin']
  }
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
              pathname === item.href
                ? 'bg-gray-800 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white"
          asChild
        >
          <Link href="/auth/logout">
            <LogOut className="w-5 h-5 mr-2" />
            Abmelden
          </Link>
        </Button>
      </div>
    </nav>
  )
} 