import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { PillButton } from "../components/PillButton";
import { useSession } from "../src/session/SessionContext";
import { colors, spacing, type } from "../theme/tokens";

export default function More() {
  const router = useRouter();
  const { currentUser, logout } = useSession();

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.kicker}>PallioHelp</Text>
        <Text style={styles.title}>Ещё</Text>
        <Text style={styles.subtitle}>Смена роли, чаты и настройки профиля.</Text>
        <View style={styles.actions}>
          {currentUser?.role === "SEEKER" && (
            <PillButton onPress={() => router.push("/(seeker)/chats")}>Чаты</PillButton>
          )}
          <PillButton onPress={() => router.push("/role-select")}>Сменить роль</PillButton>
          {currentUser ? (
            <PillButton tone="ghost" onPress={logout}>
              Выйти
            </PillButton>
          ) : (
            <PillButton tone="ghost" onPress={() => router.push("/role-select")}>
              Войти
            </PillButton>
          )}
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
