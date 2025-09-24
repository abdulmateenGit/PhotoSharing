import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-neutral-600">
      <Link href="/camera" className="text-white">
        Open Camera
      </Link>
    </View>
  );
}
