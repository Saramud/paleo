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
  style?: object;
  textStyle?: object;
}>;

export function PillButton({
  children,
  tone = "primary",
  onPress,
  style,
  textStyle
}: PillButtonProps) {
  const pressAnim = useRef(new Animated.Value(1)).current;
  const backgroundColor = useMemo(
    () => (tone === "primary" ? colors.accent : colors.surfaceStrong),
    [tone]
  );
  const textColor = tone === "primary" ? "#FFFFFF" : colors.textPrimary;

  const onPressIn = () => {
    Animated.spring(pressAnim, { toValue: 0.98, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(pressAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[styles.base, { backgroundColor, transform: [{ scale: pressAnim }] }, style]}
      >
        <Text style={[styles.text, { color: textColor }, textStyle]}>{children}</Text>
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
    borderColor: colors.stroke
  },
  text: {
    fontFamily: type.bodyMedium,
    fontSize: 15,
    letterSpacing: 0.3
  }
});
