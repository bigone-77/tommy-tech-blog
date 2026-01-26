'use client';

import { useEffect } from 'react';

type Listener = (title: string | null) => void;
let currentTitle: string | null = null;
const listeners = new Set<Listener>();

export const breadcrumbStore = {
  set: (title: string | null) => {
    currentTitle = title;
    listeners.forEach((listener) => listener(title));
  },
  get: () => currentTitle,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function BreadcrumbSetter({ title }: { title: string }) {
  useEffect(() => {
    breadcrumbStore.set(title);
    return () => breadcrumbStore.set(null);
  }, [title]);

  return null;
}
