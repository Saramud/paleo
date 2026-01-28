import { Stack } from "expo-router";

export default function SeekerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="request-create-edit" />
      <Stack.Screen name="request-details" />
      <Stack.Screen name="offers-list" />
    </Stack>
  );
}
