'use client';

import { useEffect } from 'react';

import { incrementView } from '../page.actions';

interface Props {
  postId: string;
}

export function ViewCounter({ postId }: Props) {
  useEffect(() => {
    const trackView = async () => {
      try {
        await incrementView(postId);
      } catch (error) {
        console.error('Failed to increment view count:', error);
      }
    };

    trackView();
  }, [postId]);

  return null;
}
