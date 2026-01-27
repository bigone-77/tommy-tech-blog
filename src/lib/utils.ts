import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (
  date: string | Date | null | undefined,
  formatStr: string,
): string => {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return format(dateObj, formatStr, { locale: ko });
};

export const calculateReadingTime = (content: string): number => {
  const WORDS_PER_MINUTE = 200;

  const words = content.trim().split(/\s+/).length;

  const minutes = words / WORDS_PER_MINUTE;

  const roundedTime = Math.ceil(minutes / 5) * 5;

  return Math.max(5, roundedTime);
};

export function parseTilDate(date: string | undefined): Date {
  if (!date) return new Date();
  const isNumeric = /^\d+$/.test(date);
  const parsed = isNumeric ? new Date(Number(date)) : new Date(date);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}
