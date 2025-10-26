import { View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";

export default function Share() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // 🔗 Use an HTTP or HTTPS link so the QR code works with normal camera apps
  const qrValue = `exp://192.168.18.7:8081/--/events/${id}/join`;

  console.log("QR Code Value:", qrValue);

  return (
    <View className="flex-1 items-center justify-center bg-black p-6">
      <Text className="text-white text-2xl font-bold mb-6 text-center">
        Share event with your friends
      </Text>

      <QRCode
        value={qrValue}
        size={220}
        color="white"
        backgroundColor="black"
      />
      
    </View>
  );
}
