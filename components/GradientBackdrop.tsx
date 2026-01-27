import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";
import { colors } from "../theme/tokens";

export function GradientBackdrop() {
  return (
    <View style={styles.root} pointerEvents="none">
      <LinearGradient
        colors={[colors.bg, colors.bgSoft]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.orb, styles.orbA]} />
      <View style={[styles.orb, styles.orbB]} />
      <View style={[styles.orb, styles.orbC]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject
  },
  orb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.55,
    transform: [{ translateZ: 0 }]
  },
  orbA: {
    width: 260,
    height: 260,
    top: -40,
    right: -40,
    backgroundColor: "rgba(255,180,84,0.35)"
  },
  orbB: {
    width: 220,
    height: 220,
    bottom: 20,
    left: -30,
    backgroundColor: "rgba(77,228,255,0.25)"
  },
  orbC: {
    width: 160,
    height: 160,
    bottom: 160,
    right: 30,
    backgroundColor: "rgba(123,255,155,0.18)"
  }
});
