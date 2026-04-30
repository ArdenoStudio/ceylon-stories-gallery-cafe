import Hero from '@/src/components/Hero';
import dynamic from 'next/dynamic';
import { sql } from '@/src/lib/db';
import { toMenuItem } from '@/src/types/menu';
import type { MenuItemRow } from '@/src/types/menu';

const WhatIsNew = dynamic(() => import('@/src/components/WhatIsNew'));
const FeaturedDrinks = dynamic(() => import('@/src/components/FeaturedDrinks'));
const Lounge = dynamic(() => import('@/src/components/Lounge'));
const Story = dynamic(() => import('@/src/components/Story'));

export default async function HomePage() {
  let whatsNewItems: ReturnType<typeof toMenuItem>[] = [];
  try {
    const rows = await sql`
      SELECT * FROM menu_items
      WHERE is_available = true
        AND tag IS NOT NULL AND tag <> ''
      ORDER BY display_order
      LIMIT 8
    `;
    whatsNewItems = (rows as MenuItemRow[]).map(toMenuItem);
  } catch {
    // DB unavailable in this environment — section hidden gracefully
  }

  return (
    <>
      <Hero />
      {whatsNewItems.length > 0 && <WhatIsNew items={whatsNewItems} />}
      <FeaturedDrinks />
      <Lounge />
      <Story />
    </>
  );
}
