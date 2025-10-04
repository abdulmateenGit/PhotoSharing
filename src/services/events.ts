import { supabase } from "../lib/supabase";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();
  return data;
}
