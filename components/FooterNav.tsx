import { usePathname, useRouter } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSession } from "../src/session/SessionContext"
import { colors, radii, shadow, spacing, type } from "../theme/tokens"

export function FooterNav() {
  const router = useRouter()
  const { currentUser } = useSession()
  const insets = useSafeAreaInsets()
  const pathname = usePathname()

  if (HIDE_FOOTER_PATHS.has(pathname)) {
    return null
  }

  const handleHome = () => {
    if (!currentUser) {
      router.push("/")
      return
    }
    router.push(currentUser.role === "SEEKER" ? "/(seeker)" : "/(provider)")
  }

  const handleAnnouncement = () => {
    if (currentUser?.role === "SEEKER") {
      router.push("/(seeker)/request-create-edit")
      return
    }
    router.push("/announcement")
  }

  const handleAuth = () => {
    router.push(currentUser ? "/more" : "/role-select")
  }

  const isHomeActive =
    pathname === "/" || pathname.startsWith("/(seeker)") || pathname.startsWith("/(provider)")
  const isAnnouncementActive = pathname === "/announcement"
  const isAuthActive = pathname === "/more" || pathname === "/role-select"

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
      <View style={styles.inner}>
        <Pressable style={styles.item} onPress={handleHome}>
          <Text style={[styles.label, isHomeActive && styles.labelActive]}>Главная</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={handleAnnouncement}>
          <Text style={[styles.label, isAnnouncementActive && styles.labelActive]}>Запрос</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={handleAuth}>
          <Text style={[styles.label, isAuthActive && styles.labelActive]}>
            {currentUser ? "Ещё" : "Войти"}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: colors.bg,
  },
  inner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.stroke,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    ...shadow.soft,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  label: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  labelActive: {
    color: colors.accent,
  },
})

const HIDE_FOOTER_PATHS = new Set([
  "/(seeker)/performer-details",
  "/(seeker)/chat",
  "/(seeker)/invite-request",
  "/(seeker)/request-create-edit",
  "/(seeker)/request-details",
  "/(seeker)/offers-list",
  "/(provider)/request-details",
  "/(provider)/offer-create",
])
