import { createClient } from "@supabase/supabase-js";

const dbHost = process.env.DBHOST  as string;
const dbToken = process.env.DBTOKEN as string;

const dbClient = createClient(
  dbHost,
  dbToken 
);

export { dbClient };
