import { createClient } from "@supabase/supabase-js";

// Proyecto de demo de portafolio: URL y llave publicable son información
// pública por diseño de Supabase (la seguridad la da RLS, no ocultar la llave).
const SUPABASE_URL = "https://rabhpfnmbbrpievaqntw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_NY_iEsd6ZnOcYpmZorYRBg_u4vOnU1A";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
