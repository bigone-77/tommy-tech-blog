import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { AppSidebar } from '@/components/app-sidebar';
import { ApolloProvider } from '@/components/provider/apollo-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { Separator } from '@/components/ui/separator';
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
                <header className='bg-background/80 sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md transition-all duration-200'>
                  <SidebarTrigger className='hover:bg-accent -ml-1 transition-colors duration-200' />

                  <Separator className='!h-6' orientation='vertical' />

                  <div className='flex items-center gap-2'>
                    <span className='truncate text-sm font-semibold tracking-tight'>
                      Tommy Shin
                    </span>
                  </div>
                </header>

                <div className='relative flex flex-1 flex-col'>
                  <main className='@container/main relative flex-1 p-6 lg:p-10'>
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
