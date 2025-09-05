'use client';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  FileText,
  FlaskConical,
  LayoutDashboard,
  PieChart,
  User,
  TrendingUp,
  Languages,
  Moon,
  Sun,
} from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { useTheme } from 'next-themes';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/lessons', icon: BookOpen, label: 'Lessons' },
  { href: '/sandbox', icon: FlaskConical, label: 'Sandbox' },
  { href: '/portfolio', icon: PieChart, label: 'Portfolio' },
  { href: '/summarizer', icon: FileText, label: 'Summarizer' },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <TrendingUp className="size-5 text-primary" />
              </Button>
              <h1 className="text-lg font-semibold tracking-tight">FinLit Leap</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.label}
                    >
                      <span>
                        <item.icon />
                        <span>{item.label}</span>
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Separator className="my-2" />
            <Link href="/profile" passHref>
              <SidebarMenuButton asChild isActive={pathname === '/profile'}>
                <span>
                  <User />
                  <span>Profile</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Optional: Add a search bar here later */}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Languages className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem disabled>Hindi (coming soon)</DropdownMenuItem>
                <DropdownMenuItem disabled>Tamil (coming soon)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/100" alt="User Avatar" data-ai-hint="person" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <footer className="px-4 md:px-6 py-3 border-t">
            <p className="text-xs text-muted-foreground text-center">
              For educational purposes only. Not investment advice.
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
