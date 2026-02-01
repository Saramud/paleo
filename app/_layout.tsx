import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Manrope_400Regular, Manrope_500Medium } from "@expo-google-fonts/manrope";
import {
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold
} from "@expo-google-fonts/space-grotesk";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { SessionProvider } from "../src/session/SessionContext";
import { FooterNav } from "../components/FooterNav";
import { colors } from "../theme/tokens";

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
        <StatusBar style="dark" />
        <RootNavigator />
      </SessionProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  return (
    <View style={styles.root}>
      <View style={styles.stack}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="announcement" />
          <Stack.Screen name="more" />
          <Stack.Screen name="role-select" />
          <Stack.Screen name="(seeker)" />
          <Stack.Screen name="(provider)" />
        </Stack>
      </View>
      <FooterNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  stack: {
    flex: 1
  }
});
