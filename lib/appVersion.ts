import { cache } from 'react';
import { supabase } from '@/lib/supabase';

export type AppVersionRow = {
  id: string;
  version: string;
  is_major: boolean;
  grace_period_days: number;
  download_url: string | null;
  release_notes: string | null;
  updated_at: string;
};

// Plain numeric major.minor.patch comparison, ported from the app's own
// lib/appVersionGate.ts — never `order by version desc` in the query itself,
// since Postgres sorts that column as text ('1.10.0' would sort before
// '1.9.0'). Missing/non-numeric segments read as 0.
export function compareVersions(a: string, b: string): number {
  const partsA = a.split('.').map((n) => parseInt(n, 10) || 0);
  const partsB = b.split('.').map((n) => parseInt(n, 10) || 0);
  const len = Math.max(partsA.length, partsB.length);
  for (let i = 0; i < len; i++) {
    const diff = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (diff !== 0) return diff > 0 ? 1 : -1;
  }
  return 0;
}

// Wrapped in React's cache() since this is now called from both
// DownloadSection and Footer in the same page render — dedupes the two
// calls into a single Supabase request per request lifecycle.
export const fetchLatestAppVersion = cache(async (): Promise<AppVersionRow | null> => {
  const { data, error } = await supabase.from('app_version').select('*');
  if (error) {
    console.error('[appVersion] failed to fetch app_version', error);
    return null;
  }
  if (!data || data.length === 0) return null;
  return data.reduce((latest, row) => (compareVersions(row.version, latest.version) > 0 ? row : latest));
});
