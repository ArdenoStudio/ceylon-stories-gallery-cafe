/**
 * Ardeno OS — Supabase Migration Runner
 * Executes all SQL migration files against the live Supabase instance.
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function runMigrations() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const migrationsDir = path.resolve(__dirname, '..', 'supabase', 'migrations');
  
  if (!fs.existsSync(migrationsDir)) {
    console.error('❌ Migrations directory not found:', migrationsDir);
    process.exit(1);
  }

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`\n🗄️  Ardeno OS — Running ${files.length} migrations against live Supabase\n${'═'.repeat(60)}\n`);

  let passed = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');
    const shortName = file.replace('20260324', '').replace('.sql', '');

    try {
      // Execute raw SQL via Supabase's rpc or rest endpoint
      const { error } = await supabase.rpc('exec_sql', { query: sql }).single();
      
      if (error) {
        // Fallback: try direct fetch to the SQL endpoint
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          },
          body: JSON.stringify({ query: sql }),
        });
        
        if (!response.ok) {
          // Final fallback: log and mark for manual execution
          console.log(`  ⚠️  ${shortName} — Needs manual execution via SQL Editor`);
          failed++;
          continue;
        }
      }

      console.log(`  ✅ ${shortName}`);
      passed++;
    } catch (e: any) {
      console.log(`  ⚠️  ${shortName} — ${e.message?.slice(0, 60)}`);
      failed++;
    }
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`📊 Migrations: ${passed} applied | ${failed} need manual SQL Editor`);
  
  if (failed > 0) {
    console.log(`\n💡 For failed migrations, copy the SQL from supabase/migrations/ and`);
    console.log(`   paste into your Supabase Dashboard → SQL Editor → New Query → Run.`);
  }
  
  console.log(`${'═'.repeat(60)}\n`);
}

runMigrations();
