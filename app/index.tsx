import { Link } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { GradientBackdrop } from "../components/GradientBackdrop";
import { GlassCard } from "../components/GlassCard";
import { PillButton } from "../components/PillButton";
import { SectionHeader } from "../components/SectionHeader";
import { TrendChip } from "../components/TrendChip";
import { colors, radii, spacing, type } from "../theme/tokens";

export default function Home() {
  const anims = useRef(Array.from({ length: 5 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      120,
      anims.map((anim) =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 520,
          useNativeDriver: true
        })
      )
    ).start();
  }, [anims]);

  const enter = (index: number) => ({
    opacity: anims[index],
    transform: [
      {
        translateY: anims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [18, 0]
        })
      }
    ]
  });

  return (
    <View style={styles.root}>
      <GradientBackdrop />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.hero, enter(0)]}>
          <Text style={styles.kicker}>EXPO + REACT NATIVE</Text>
          <Text style={styles.title}>Paleo Mobile</Text>
          <Text style={styles.subtitle}>
            Каркас с современными визуальными приёмами: объёмные карточки, мягкие
            градиенты, крупная типографика и живые микро-анимации.
          </Text>
          <View style={styles.heroActions}>
            <PillButton onPress={() => {}}>Начать</PillButton>
            <PillButton tone="ghost" onPress={() => {}}>
              Посмотреть демо
            </PillButton>
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, enter(1)]}>
          <SectionHeader eyebrow="Highlights" title="Трендовые слои интерфейса" />
          <View style={styles.chips}>
            {[
              "Стеклянные слои",
              "Свечение и орбы",
              "Тактильные кнопки",
              "Рельефные карточки",
              "Лёгкая динамика"
            ].map((label) => (
              <TrendChip key={label} label={label} />
            ))}
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, enter(2)]}>
          <SectionHeader eyebrow="Cards" title="Модульные карточки" />
          <View style={styles.cardGrid}>
            <GlassCard style={styles.card}>
              <Text style={styles.cardLabel}>Onboarding</Text>
              <Text style={styles.cardValue}>Гибкая воронка</Text>
              <Text style={styles.cardDesc}>Подготовьте сюжеты без жёсткой структуры.</Text>
            </GlassCard>
            <GlassCard style={styles.card}>
              <Text style={styles.cardLabel}>Analytics</Text>
              <Text style={styles.cardValue}>Снимки метрик</Text>
              <Text style={styles.cardDesc}>Скомпонованные дашборды на мобильном.</Text>
            </GlassCard>
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, enter(3)]}>
          <SectionHeader eyebrow="System" title="Стиль в деталях" />
          <GlassCard>
            <View style={styles.statRow}>
              <View>
                <Text style={styles.statValue}>12px</Text>
                <Text style={styles.statLabel}>микро-ритм</Text>
              </View>
              <View>
                <Text style={styles.statValue}>28px</Text>
                <Text style={styles.statLabel}>радиус</Text>
              </View>
              <View>
                <Text style={styles.statValue}>320ms</Text>
                <Text style={styles.statLabel}>пружина</Text>
              </View>
            </View>
          </GlassCard>
        </Animated.View>

        <Animated.View style={[styles.section, enter(4)]}>
          <Link href="/palette" style={styles.link}>
            Открыть стильгайд
          </Link>
        </Animated.View>
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
    gap: spacing.xxl
  },
  hero: {
    gap: spacing.md
  },
  kicker: {
    fontFamily: type.bodyMedium,
    color: colors.accentAltSoft,
    letterSpacing: 3,
    fontSize: 12
  },
  title: {
    fontFamily: type.display,
    color: colors.textPrimary,
    fontSize: 42,
    lineHeight: 46
  },
  subtitle: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 22
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
    marginTop: spacing.md
  },
  section: {
    gap: spacing.lg
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  cardGrid: {
    gap: spacing.md
  },
  card: {
    borderRadius: radii.lg
  },
  cardLabel: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.accentAltSoft,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  cardValue: {
    fontFamily: type.heading,
    fontSize: 20,
    color: colors.textPrimary,
    marginTop: spacing.sm
  },
  cardDesc: {
    fontFamily: type.body,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.sm
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  statValue: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 18
  },
  statLabel: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4
  },
  link: {
    fontFamily: type.bodyMedium,
    color: colors.accent,
    fontSize: 15
  }
});
