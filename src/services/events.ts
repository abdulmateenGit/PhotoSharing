import { supabase } from "../lib/supabase";
import { TablesInsert } from "@/types/database.types";

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })
    .throwOnError();
  return data;
}

export async function getEventById(id: string) {
  const { data } = await supabase
    .from("events")
    .select("*, assets(*)")
    .eq("id", id)
    .single()
    .throwOnError();
  return data;
}

export async function createEvent(newEvent: TablesInsert<"events">) {
  const data = await supabase
    .from("events")
    .insert(newEvent)
    .select()
    .single()
    .throwOnError();
  return data;
}
