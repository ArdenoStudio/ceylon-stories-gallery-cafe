'use client';

import PageTransition from '@/src/components/PageTransition';

/**
 * Next.js template.tsx re-mounts on every navigation,
 * giving us a fresh animation trigger for page transitions.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
