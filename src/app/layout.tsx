import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { AppSidebar } from '@/components/app-sidebar';
import { ApolloProvider } from '@/components/provider/apollo-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import './globals.css';

const pretendard = localFont({
  src: '../assets/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Tommy Tech Blog',
  description: '프론트엔드 개발 로그',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={pretendard.className}>
        <ApolloProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
              <SidebarInset>
                <header className='bg-background/50 sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-6 backdrop-blur-md md:hidden'>
                  <div className='bg-border h-4 w-[1px]' />
                  <span className='text-sm font-bold tracking-tight'>
                    Tommy Shin
                  </span>
                </header>

                <div className='relative flex min-h-screen flex-col'>
                  <main className='@container/main relative flex-1'>
                    {children}
                  </main>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
