import * as React from 'react';

import Link from 'next/link';

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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  H4Typography,
  LargeTypography,
  MutedTypography,
} from '@/components/ui/typography';

import { ThemeToggleButton } from './theme-toggle-button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SIDEBAR_PADDING = 'p-5';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className='flex items-center justify-between group-data-[collapsible=icon]:justify-center'>
              <div className='flex items-center gap-3 group-data-[collapsible=icon]:hidden'>
                <Avatar>
                  <AvatarImage src='https://avatars.githubusercontent.com/u/106367655?v=4' />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
                <LargeTypography>Tommy Shin</LargeTypography>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {/* 2. Content: 소개 및 목차 */}
      <SidebarContent>
        {/* 소개글 섹션 */}
        {/* <SidebarGroup
          className={cn(
            'group-data-[collapsible=icon]:hidden',
            SIDEBAR_PADDING,
          )}
        >
          <H4Typography>소개</H4Typography>
          <PTypography>
            안녕하세요, 신토미입니다. 소프트웨어 엔지니어로서의 기록을 담는 저의
            🌿 디지털 정원입니다.
          </PTypography>
        </SidebarGroup>

        <SidebarSeparator /> */}

        {/* 목차 섹션 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { href: '/blog', label: '블로그', icon: BookOpen },
                { href: '/til', label: '오늘 배운 것', icon: PenTool },
                { href: '/projects', label: '프로젝트', icon: FolderCode },
                { href: '/about-me', label: '소개', icon: User },
              ].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <LargeTypography>{item.label}</LargeTypography>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />

      {/* 3. Footer: 연결 및 저작권 */}
      <SidebarFooter>
        <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
          <H4Typography>연결하기</H4Typography>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href='mailto:contact@tommyshin.com'>
                  <Mail />
                  <MutedTypography>이메일 보내기</MutedTypography>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href='https://github.com' target='_blank' rel='noreferrer'>
                  <Github />
                  <MutedTypography>GitHub</MutedTypography>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <div className='flex items-center justify-between p-2 group-data-[collapsible=icon]:hidden'>
          <MutedTypography>© 2026 Tommy Shin</MutedTypography>
          <ThemeToggleButton />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
