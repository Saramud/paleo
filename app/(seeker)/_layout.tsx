import { Stack, useRouter } from "expo-router"
import { useEffect } from "react"
import { useSession } from "../../src/session/SessionContext"

export default function SeekerLayout() {
  const { currentUser } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) {
      router.replace("/role-select")
      return
    }
    if (currentUser.role !== "SEEKER") {
      router.replace("/(provider)")
    }
  }, [currentUser, router])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="chats" />
      <Stack.Screen name="performer-details" />
      <Stack.Screen name="invite-request" />
      <Stack.Screen name="request-create-edit" />
      <Stack.Screen name="request-details" />
      <Stack.Screen name="offers-list" />
    </Stack>
  )
}
