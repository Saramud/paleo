import { BlurView } from "expo-blur";
import { PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { colors, radii, shadow } from "../theme/tokens";

type GlassCardProps = PropsWithChildren<{
  style?: object;
}>;

export function GlassCard({ children, style }: GlassCardProps) {
  if (Platform.OS === "android") {
    return (
      <View style={[styles.android, style]}>
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={32} tint="dark" style={[styles.ios, style]}>
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  ios: {
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: colors.stroke,
    padding: 16,
    ...shadow.soft
  },
  android: {
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceStrong,
    borderWidth: 1,
    borderColor: colors.stroke,
    padding: 16,
    ...shadow.soft
  }
});
