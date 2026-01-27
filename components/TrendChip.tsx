import { StyleSheet, Text, View } from "react-native";
import { colors, radii, spacing, type } from "../theme/tokens";

type TrendChipProps = {
  label: string;
};

export function TrendChip({ label }: TrendChipProps) {
  return (
    <View style={styles.chip}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.xl,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: colors.stroke,
    gap: 8
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.accentAlt
  },
  text: {
    fontFamily: type.bodyMedium,
    color: colors.textPrimary,
    fontSize: 13
  }
});
