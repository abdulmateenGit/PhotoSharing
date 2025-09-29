import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  console.log("User:", user, "Authenticated:", isAuthenticated);
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
