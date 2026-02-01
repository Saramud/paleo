import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useSession } from "../../src/session/SessionContext";

export default function ProviderLayout() {
  const { currentUser } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.replace("/role-select");
      return;
    }
    if (currentUser.role !== "PROVIDER") {
      router.replace("/(seeker)");
    }
  }, [currentUser, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="request-details" />
      <Stack.Screen name="offer-create" />
      <Stack.Screen name="my-offers" />
    </Stack>
  );
}
