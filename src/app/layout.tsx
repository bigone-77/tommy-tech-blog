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
              <SidebarInset>
                <header className='bg-background/50 sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-6 backdrop-blur-md md:hidden'>
                  <SidebarTrigger />
                  <div className='bg-border h-4 w-[1px]' />
                  <span className='text-sm font-bold tracking-tight'>
                    Tommy Shin
                  </span>
                </header>

                <main className='bg-background @container flex-1 overflow-y-auto'>
                  <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='mx-auto flex max-w-5xl flex-col gap-4 p-4 @md:gap-6 @md:p-6 @lg:gap-8 @lg:p-10'>
                      {children}
                    </div>
                  </div>
                </main>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
