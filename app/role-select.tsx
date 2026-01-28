import { StyleSheet, Text, View } from "react-native";
import { PillButton } from "../components/PillButton";
import { useSession } from "../src/session/SessionContext";
import { colors, spacing, type } from "../theme/tokens";

export default function RoleSelect() {
  const { setRole } = useSession();

  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.title}>Choose your role</Text>
        <View style={styles.actions}>
          <PillButton onPress={() => setRole("SEEKER")}>SEEKER</PillButton>
          <PillButton onPress={() => setRole("PROVIDER")} tone="ghost">
            PROVIDER
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
  card: {
    width: "100%",
    gap: spacing.lg
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 20,
    textAlign: "center"
  },
  actions: {
    gap: spacing.md,
    alignItems: "center"
  }
});
