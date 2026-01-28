import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Manrope_400Regular, Manrope_500Medium } from "@expo-google-fonts/manrope";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold
} from "@expo-google-fonts/space-grotesk";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { SessionProvider, useSession } from "../src/session/SessionContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <StatusBar style="light" />
        <RootNavigator />
      </SessionProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/role-select");
      return;
    }
    router.replace(currentUser.role === "SEEKER" ? "/(seeker)" : "/(provider)");
  }, [currentUser, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {currentUser ? (
        <>
          <Stack.Screen name="(seeker)" />
          <Stack.Screen name="(provider)" />
          <Stack.Screen name="palette" />
        </>
      ) : (
        <Stack.Screen name="role-select" />
      )}
    </Stack>
  );
}
