'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  BookOpen,
  FolderCode,
  Github,
  Mail,
  PenTool,
  User,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { ThemeToggleButton } from './theme-toggle-button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const navItems = [
  { href: '/blog', label: '블로그', icon: BookOpen },
  { href: '/til', label: '오늘 배운 것', icon: PenTool },
  { href: '/project', label: '프로젝트', icon: FolderCode },
  { href: '/about-me', label: '소개', icon: User },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Sidebar collapsible='icon' className='border-r-0' {...props}>
      <SidebarHeader className='h-16 justify-center group-data-[mobile=true]:mt-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              className='hover:bg-transparent'
              asChild
            >
              <Link href='/'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src='https://avatars.githubusercontent.com/u/106367655?v=4' />
                  <AvatarFallback className='rounded-lg'>TM</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden'>
                  <span className='truncate font-semibold'>Tommy Shin</span>
                  <span className='text-muted-foreground truncate text-[10px]'>
                    Front-end Developer
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      isActive={isActive}
                      className={cn(
                        'h-10 transition-all duration-200 ease-in-out',
                        isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-bold'
                          : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/70',
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon
                          className={cn(
                            'size-4 transition-colors',
                            isActive
                              ? 'text-sidebar-accent-foreground'
                              : 'text-muted-foreground',
                          )}
                        />
                        <span className='group-data-[collapsible=icon]:hidden'>
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
            Connect
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip='이메일 보내기'
                  className='h-9'
                >
                  <a href='mailto:contact@tommyshin.com'>
                    <Mail className='size-4' />
                    <span className='group-data-[collapsible=icon]:hidden'>
                      이메일
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip='GitHub' className='h-9'>
                  <a href='https://github.com' target='_blank' rel='noreferrer'>
                    <Github className='size-4' />
                    <span className='group-data-[collapsible=icon]:hidden'>
                      GitHub
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className='flex items-center justify-between px-4 py-2 group-data-[collapsible=icon]:justify-center'>
          <div className='flex flex-col group-data-[collapsible=icon]:hidden'>
            <span className='text-muted-foreground text-[10px] font-medium'>
              © 2026
            </span>
            <span className='text-muted-foreground text-[10px]'>
              Tommy Shin
            </span>
          </div>
          <ThemeToggleButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
