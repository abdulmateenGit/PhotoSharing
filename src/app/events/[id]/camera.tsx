import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { uploadToCloudinary } from "@/lib/cloundinary";
import { useLocalSearchParams } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertAsset } from "@/services/assets";
import { useAuth } from "@/providers/AuthProvider";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const insertAssetMutation = useMutation({
    mutationFn: (assetId: string) =>
      insertAsset({ event_id: id, user_id: user?.id, asset_id: assetId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  });

  const camera = useRef<CameraView>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <ActivityIndicator />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    const photo = await camera.current?.takePictureAsync();
    if (!photo?.uri) return;
    const cloudinaryResponse = await uploadToCloudinary(photo.uri);

    insertAssetMutation.mutate(cloudinaryResponse.public_id);
    //save the photo to the database in assets table
  }
  return (
    <View style={styles.container}>
      <CameraView ref={camera} style={styles.camera} facing={facing}>
        <View className="absolute bottom-0 bg-neutral-900/20 w-full p-4">
          <Ionicons
            name="camera-reverse-outline"
            size={32}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>

      {/* Footer with Camera Control */}
      <SafeAreaView
        edges={["bottom"]}
        className="w-full flex-row justify-center items-centers bg-transparent p-4 pb-10"
      >
        <Pressable
          onPress={takePhoto}
          className="bg-white rounded-full h-20 w-20"
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    backgroundColor: "gray",
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
