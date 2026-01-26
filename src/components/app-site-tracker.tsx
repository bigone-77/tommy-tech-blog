// src/components/app-site-tracker.tsx
'use client';

import { useEffect } from 'react';

import { trackSiteVisit } from '@/app/page.actions';

export function SiteTracker({ ip }: { ip: string }) {
  useEffect(() => {
    trackSiteVisit(ip);
  }, [ip]);

  return null;
}
