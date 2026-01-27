import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, type } from "../theme/tokens";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
};

export function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <View style={styles.root}>
      <Text style={styles.eyebrow}>{eyebrow.toUpperCase()}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: spacing.xs
  },
  eyebrow: {
    fontFamily: type.bodyMedium,
    color: colors.accentAltSoft,
    letterSpacing: 2,
    fontSize: 11
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 20
  }
});
