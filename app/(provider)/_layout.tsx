import { Stack } from "expo-router";

export default function ProviderLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="request-details" />
      <Stack.Screen name="offer-create" />
      <Stack.Screen name="my-offers" />
    </Stack>
  );
}
