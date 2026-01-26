'use server';

import { prisma } from '@/lib/prisma';

export async function trackSiteVisit(ip: string) {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const existingVisit = await prisma.siteVisit.findFirst({
      where: {
        ip: ip,
        createdAt: { gte: oneDayAgo },
      },
    });

    if (existingVisit) return { success: false };

    await prisma.siteVisit.create({
      data: { ip },
    });

    return { success: true };
  } catch (e) {
    console.error('사이트 방문 기록 실패:', e);
    return { success: false };
  }
}

export async function getTotalVisitors() {
  return await prisma.siteVisit.count();
}
