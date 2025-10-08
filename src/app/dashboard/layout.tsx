'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiMail, 
  FiCreditCard, 
  FiSettings, 
  FiUser, 
  FiMenu, 
  FiX, 
  FiLogOut,
  FiChevronDown,
  FiBell
} from 'react-icons/fi';
import { ThemeToggle } from '@/components/theme-toggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    name: 'Home',
    href: '/dashboard',
    icon: FiHome,
  },
  {
    name: 'Domains',
    href: '/dashboard/domains',
    icon: FiHome,
  },
  {
    name: 'Mailboxes',
    href: '/dashboard/mailboxes',
    icon: FiMail,
  },
  {
    name: 'Deliverability',
    href: '/dashboard/deliverability',
    icon: FiMail,
  },
  {
    name: 'Billing',
    href: '/dashboard/billing',
    icon: FiCreditCard,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: FiSettings,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border lg:translate-x-0 lg:static lg:inset-0"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FiMail className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">EmailSaaS</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-border">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <FiChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-card border border-border rounded-lg shadow-lg py-2"
                  >
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={() => {
                        // Handle logout
                        console.log('Logout clicked');
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">
              {sidebarItems.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile user menu */}
            <div className="lg:hidden relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              >
                <span className="text-sm font-medium text-primary-foreground">
                  {user.name.charAt(0)}
                </span>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <FiSettings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={() => {
                        // Handle logout
                        console.log('Logout clicked');
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>Sign out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}