import { StyleSheet, Text, View } from "react-native";
import { PillButton } from "../components/PillButton";
import { useSession } from "../src/session/SessionContext";
import { colors, spacing, type } from "../theme/tokens";

export default function RoleSelect() {
  const { setRole } = useSession();

  return (
    <View style={styles.root}>
      <View style={styles.accentBlob} />
      <View style={styles.card}>
        <Text style={styles.kicker}>PallioHelp</Text>
        <Text style={styles.title}>Выберите роль</Text>
        <Text style={styles.subtitle}>
          Минимальная сессия без регистрации. Можно переключаться в любой момент.
        </Text>
        <View style={styles.actions}>
          <PillButton onPress={() => setRole("SEEKER")}>Нужна помощь</PillButton>
          <PillButton onPress={() => setRole("PROVIDER")} tone="ghost">
            Я специалист
          </PillButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl
  },
  accentBlob: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.accentSoft,
    top: -140,
    right: -120
  },
  card: {
    width: "100%",
    gap: spacing.md,
    padding: spacing.xl,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong
  },
  kicker: {
    fontFamily: type.bodyMedium,
    color: colors.accent,
    letterSpacing: 2,
    fontSize: 11,
    textTransform: "uppercase"
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 24
  },
  subtitle: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  actions: {
    gap: spacing.md,
    alignItems: "flex-start",
    marginTop: spacing.sm
  }
});
