import { useAuth } from "@/providers/AuthProvider";
import { createEvent } from "@/services/event";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { View, TextInput, Button } from "react-native";

export default function CreateEventPage() {
  const [name, setName] = useState("");
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: () => createEvent({ name, owner_id: user?.id }, user!.id ),
    onSuccess: (data) => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.replace(`/events/${data.id}`);
    },
  });

  return (
    <View className="flex-1 p-4 gap-4">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Event Name"
        className=" text-white p-5 rounded-lg bg-neutral-800"
        placeholderTextColor="gray"
      />
      <Button
        title="Create Event"
        onPress={() => createEventMutation.mutate()}
      />
    </View>
  );
}
