import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const migration = readFileSync('drizzle/migrations/0000_restrict_selected_lead_and_conversation_writes.sql', 'utf8');

describe('Selected lead and conversation write restrictions', () => {
  it.each(['incomplete_leads', 'chat_conversations'])('blocks client writes to %s but retains server writes', table => {
    expect(migration).toContain(`REVOKE INSERT, UPDATE ON public.${table} FROM PUBLIC, anon, authenticated;`);
    expect(migration).toContain(`GRANT SELECT, INSERT, UPDATE, DELETE ON public.${table} TO service_role;`);
    expect(migration).toContain(`ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;`);
  });

  it('removes all four permissive policies reported in the two findings', () => {
    expect(migration.match(/DROP POLICY IF EXISTS/g)).toHaveLength(4);
    expect(migration).not.toMatch(/CREATE POLICY|WITH CHECK\s*\(true\)/i);
  });

  it('changes no other application table', () => {
    const tables = [...migration.matchAll(/ON public\.([a-z_]+)/g)].map(match => match[1]);
    expect([...new Set(tables)].sort()).toEqual(['chat_conversations', 'incomplete_leads']);
  });

  it('preserves the chat server writer and its existing session ownership check', () => {
    const chat = readFileSync('supabase/functions/chat/index.ts', 'utf8');
    expect(chat).toContain('createClient(supabaseUrl, supabaseServiceKey)');
    expect(chat).toContain('existingConv.session_id !== sessionId');
  });
});