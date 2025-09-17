import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://database.altan.ai';
const supabaseKey = 'tenant_02312d0b_a061_4efd_b1ef_837f53ec96be'; // TODO: move to env

export const supabase = createClient(supabaseUrl, supabaseKey);

export type User = {
  id: string;
  email: string;
  name?: string;
  surname?: string;
  avatar?: string; // URL to avatar image
  verified?: boolean;
};