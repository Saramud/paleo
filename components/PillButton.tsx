import { PropsWithChildren, useMemo, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text
} from "react-native";
import { colors, radii, spacing, type } from "../theme/tokens";

type PillButtonProps = PropsWithChildren<{
  tone?: "primary" | "ghost";
  onPress?: () => void;
}>;

export function PillButton({ children, tone = "primary", onPress }: PillButtonProps) {
  const pressAnim = useRef(new Animated.Value(1)).current;
  const backgroundColor = useMemo(
    () => (tone === "primary" ? colors.accent : "rgba(255,255,255,0.12)"),
    [tone]
  );
  const textColor = tone === "primary" ? "#101216" : colors.textPrimary;

  const onPressIn = () => {
    Animated.spring(pressAnim, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(pressAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.base, { backgroundColor, transform: [{ scale: pressAnim }] }]}>
        <Text style={[styles.text, { color: textColor }]}>{children}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)"
  },
  text: {
    fontFamily: type.bodyMedium,
    fontSize: 15,
    letterSpacing: 0.3
  }
});
