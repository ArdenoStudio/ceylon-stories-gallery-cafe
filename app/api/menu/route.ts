import { NextResponse } from 'next/server';
import { sql } from '@/src/lib/db';
import { toMenuItem } from '@/src/types/menu';
import type { MenuItemRow } from '@/src/types/menu';

export async function GET() {
  try {
    const rows = await sql`
      select * from menu_items
      where is_available = true
      order by category, display_order
    `;

    return NextResponse.json((rows as MenuItemRow[]).map(toMenuItem));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
