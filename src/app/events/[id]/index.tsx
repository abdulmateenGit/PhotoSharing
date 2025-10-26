import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getEventById } from "@/services/events";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AssetItem from "@/components/AssetItem";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEventById(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!event) {
    return <Text className="text-white">Event not found</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: event.name }} />

      <FlatList
        data={event.assets}
        numColumns={2}
        contentContainerClassName="gap-1 p-4"
        columnWrapperClassName="gap-1"
        renderItem={({ item }) => <AssetItem asset={item} />}
        contentInsetAdjustmentBehavior="automatic"
        refreshing={isRefetching}
        onRefresh={refetch}
      />

      <Link href={`/events/${id}/camera`} asChild>
        <Pressable className="absolute bottom-16 right-4 flex-row items-center justify-center bg-white p-6 rounded-full">
          <Ionicons name="camera-outline" size={40} color="black" />
        </Pressable>
      </Link>
    </>
  );
}
