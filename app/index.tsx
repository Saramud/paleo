import { useRouter } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { PillButton } from "../components/PillButton"
import { useSession } from "../src/session/SessionContext"
import { colors, spacing, type } from "../theme/tokens"

export default function Home() {
  const router = useRouter()
  const { currentUser } = useSession()

  const handleExplore = () => {
    if (!currentUser) {
      router.push("/role-select")
      return
    }
    router.push(currentUser.role === "SEEKER" ? "/(seeker)" : "/(provider)")
  }

  return (
    <View style={styles.root}>
      <View style={styles.accentBlob} />
      <View style={styles.card}>
        <Text style={styles.kicker}>PallioHelp</Text>
        <Text style={styles.title}>Главная</Text>
        <Text style={styles.subtitle}>
          Находите специалистов по паллиативной помощи, создавайте запросы и управляйте уходом.
        </Text>
        <PillButton onPress={handleExplore}>Перейти к специалистам</PillButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  accentBlob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.bgSoft,
    top: -120,
    left: -120,
  },
  card: {
    width: "100%",
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
  },
  kicker: {
    fontFamily: type.bodyMedium,
    color: colors.accent,
    letterSpacing: 2,
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
})
