import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category: string;
          is_bestseller: boolean | null;
          stock_quantity: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          price: number;
          image_url: string;
          category?: string;
          is_bestseller?: boolean | null;
          stock_quantity?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string;
          category?: string;
          is_bestseller?: boolean | null;
          stock_quantity?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      authorized_users: {
        Row: {
          id: string;
          email: string;
          password: string;
          type: string;
          created_at: string | null;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          password: string;
          type?: string;
          created_at?: string | null;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          password?: string;
          type?: string;
          created_at?: string | null;
          last_login?: string | null;
        };
      };
    };
  };
};
