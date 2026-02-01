import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { PillButton } from "../components/PillButton";
import { useSession } from "../src/session/SessionContext";
import { colors, spacing, type } from "../theme/tokens";

export default function Announcement() {
  const router = useRouter();
  const { currentUser } = useSession();

  const handlePrimary = () => {
    if (!currentUser) {
      router.push("/role-select");
      return;
    }
    if (currentUser.role === "SEEKER") {
      router.push("/(seeker)/request-create-edit");
      return;
    }
    router.push("/(provider)");
  };

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.kicker}>PallioHelp</Text>
        <Text style={styles.title}>Создайте запрос на уход</Text>
        <Text style={styles.subtitle}>
          Опишите потребности пациента, и специалисты предложат подход и график.
        </Text>
        <PillButton onPress={handlePrimary}>Создать запрос</PillButton>
      </View>
      <View style={styles.note}>
        <Text style={styles.noteTitle}>Быстрые советы</Text>
        <Text style={styles.noteText}>Укажите диагноз, режим ухода и предпочтения семьи.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
    gap: spacing.lg
  },
  card: {
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
  note: {
    padding: spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface
  },
  noteTitle: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  noteText: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.xs
  }
});
