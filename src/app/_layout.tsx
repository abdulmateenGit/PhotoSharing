import "../../global.css";
import { Link, Stack } from "expo-router";
import { ThemeProvider, DarkTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AuthProvider from "../providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ title: "Events" }} />

            <Stack.Screen
              name="events/[id]/index"
              options={{ title: "Event" }}
            />

            <Stack.Screen
              name="events/[id]/camera"
              options={{
                title: "Camera",
                headerBackButtonDisplayMode: "minimal",
                headerTransparent: true,
              }}
            />

            <Stack.Screen
              name="events/[id]/share"
              options={{ title: "Share", presentation: "modal" }}
            />

            <Stack.Screen
              name="events/[id]/join"
              options={{ title: "Join Event", presentation: "modal" }}
            />

            <Stack.Screen
              name="events/create"
              options={{ title: "Create Event", presentation: "modal" }}
            />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
