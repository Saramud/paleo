import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GradientBackdrop } from "../components/GradientBackdrop";
import { GlassCard } from "../components/GlassCard";
import { PillButton } from "../components/PillButton";
import { SectionHeader } from "../components/SectionHeader";
import { useSession } from "../src/session/SessionContext";
import { colors, spacing, type } from "../theme/tokens";

const colorList = [
  { name: "bg", value: colors.bg },
  { name: "bgSoft", value: colors.bgSoft },
  { name: "accent", value: colors.accent },
  { name: "accentAlt", value: colors.accentAlt },
  { name: "success", value: colors.success },
  { name: "surface", value: colors.surfaceStrong }
];

export default function Palette() {
  const { currentUser, logout } = useSession();

  return (
    <View style={styles.root}>
      <GradientBackdrop />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.roleText}>{currentUser?.role ?? "UNKNOWN"}</Text>
          <PillButton tone="ghost" onPress={logout}>
            Logout
          </PillButton>
        </View>

        <SectionHeader eyebrow="Styleguide" title="Р¦РІРµС‚ Рё С‚РёРїРѕРіСЂР°С„РёРєР°" />

        <GlassCard>
          <View style={styles.block}>
            <Text style={styles.label}>Display</Text>
            <Text style={styles.display}>Space Grotesk 42</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Body</Text>
            <Text style={styles.body}>
              Manrope 15. Р‘С‹СЃС‚СЂР°СЏ РѕС†РµРЅРєР° С‡РёС‚Р°РµРјРѕСЃС‚Рё РЅР° РЅРµСЃРєРѕР»СЊРєРёС… СЃС‚СЂРѕРєР°С… РґР»СЏ РєР°СЂС‚РѕС‡РµРє.
            </Text>
          </View>
        </GlassCard>

        <GlassCard>
          <View style={styles.swatchRow}>
            {colorList.map((color) => (
              <View key={color.name} style={styles.swatch}>
                <View style={[styles.swatchColor, { backgroundColor: color.value }]} />
                <Text style={styles.swatchLabel}>{color.name}</Text>
              </View>
            ))}
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 48,
    paddingBottom: 80,
    gap: spacing.xl
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  roleText: {
    fontFamily: type.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 2
  },
  block: {
    marginBottom: spacing.lg
  },
  label: {
    fontFamily: type.bodyMedium,
    color: colors.accentAltSoft,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: spacing.sm
  },
  display: {
    fontFamily: type.display,
    color: colors.textPrimary,
    fontSize: 42,
    lineHeight: 48
  },
  body: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22
  },
  swatchRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  swatch: {
    width: 100,
    gap: spacing.sm
  },
  swatchColor: {
    width: 100,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.stroke
  },
  swatchLabel: {
    fontFamily: type.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12
  }
});
