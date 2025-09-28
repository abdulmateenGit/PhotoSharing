import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  useEffect(() => {
    supabase
      .from("events")
      .select("*, assets(*)")
      .then((data) => console.log(JSON.stringify(data, null, 2)));
  }, []);
  return (
    <View className="flex-1 items-center justify-center bg-neutral-600 gap-4">
      <Link href="/camera" className="text-white">
        Open Camera
      </Link>
      <Link href="/event" className="text-white">
        Event Details
      </Link>
    </View>
  );
}
