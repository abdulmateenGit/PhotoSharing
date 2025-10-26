import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { createEvent } from "@/services/events";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createEventMutation = useMutation({
    mutationFn: () => createEvent({ name, owner_id: user?.id }),
    onSuccess: (data) => {
      setName("");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      console.log(data);
      router.replace(`events/${data.id}`);
    },
  });
  return (
    <View className="flex-1 p-4 gap-4">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Event Name"
        className="bg-neutral-800 p-5 rounded-lg text-white"
        placeholderTextColor="gray"
      />
      <Button
        title="Create Event"
        onPress={() => createEventMutation.mutate()}
      />
    </View>
  );
}
