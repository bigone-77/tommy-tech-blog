import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';

import { AppBreadCrumb } from '@/components/app-breadcrumb';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteTracker } from '@/components/app-site-tracker';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

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
              <SiteTracker ip={ip} />
              <AppSidebar />
              <SidebarInset>
                <header className='bg-background/80 sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md transition-all duration-200'>
                  <SidebarTrigger className='hover:bg-accent -ml-1 transition-colors duration-200' />
                  <AppBreadCrumb />
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
