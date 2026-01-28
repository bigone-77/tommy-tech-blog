'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { breadcrumbStore } from '@/lib/breadcrumb-store';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

const ROUTE_MAP: Record<string, string> = {
  blog: '블로그',
  til: '오늘 배운 것',
  project: '프로젝트',
  'about-me': '소개',
};

export function AppBreadCrumb() {
  const pathname = usePathname();

  const [dynamicTitle, setDynamicTitle] = useState(breadcrumbStore.get());

  useEffect(() => {
    const unsubscribe = breadcrumbStore.subscribe(setDynamicTitle);

    return () => unsubscribe();
  }, []);

  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href='/'>Hello, Tommy</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;

          const label =
            isLast && dynamicTitle
              ? dynamicTitle
              : ROUTE_MAP[segment] || segment;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className='font-medium'>
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
