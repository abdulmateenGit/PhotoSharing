import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
} from "react-native";

import { Link, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/services/event";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AssetItem from "@/components/AssetItem";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: event,
    error,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text className="text-white">Error: {error.message}</Text>;
  }

  if (!event) {
    return <Text className="text-white">Event not found</Text>;
  }

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: event.name,
          headerRight: () => (
            <Link href={`events/${id}/share`} asChild>
              <Ionicons
                name="share-outline"
                size={24}
                color="white"
                className="mr-2 ml-2"
              />
            </Link>
          ),
        }}
      />
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
      <Link href={`events/${id}/camera`} asChild>
        <Pressable className="absolute bottom-32 right-12 flex-row justify-center items-center p-4 bg-white rounded-full">
          <Ionicons name="camera-outline" size={30} color="black" />
        </Pressable>
      </Link>
    </View>
  );
}
