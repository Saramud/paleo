import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { GradientBackdrop } from "../../components/GradientBackdrop";
import { GlassCard } from "../../components/GlassCard";
import { PillButton } from "../../components/PillButton";
import { SectionHeader } from "../../components/SectionHeader";
import type { JobRequest } from "../../src/domain/types";
import { mockStore } from "../../src/data/mockStore";
import { useSession } from "../../src/session/SessionContext";
import { colors, radii, spacing, type } from "../../theme/tokens";

export default function Home() {
  const { logout, currentUser } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<JobRequest[]>([]);
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

  const loadRequests = async () => {
    if (!currentUser) return;
    const all = await mockStore.jobRequests.list();
    setRequests(all.filter((item) => item.seekerId === currentUser.id));
  };

  useEffect(() => {
    loadRequests();
  }, [currentUser]);

  useFocusEffect(() => {
    loadRequests();
    return undefined;
  });

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
        <View style={styles.topBar}>
          <Text style={styles.roleText}>{currentUser?.role ?? "UNKNOWN"}</Text>
          <PillButton tone="ghost" onPress={logout}>
            Logout
          </PillButton>
        </View>

        <Animated.View style={[styles.hero, enter(0)]}>
          <Text style={styles.kicker}>EXPO + REACT NATIVE</Text>
          <Text style={styles.title}>Seeker Home</Text>
          <Text style={styles.subtitle}>
            Мои заявки и быстрые действия для SEEKER.
          </Text>
          <View style={styles.heroActions}>
            <PillButton onPress={() => router.push("/(seeker)/request-create-edit")}>
              Создать заявку
            </PillButton>
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, enter(1)]}>
          <SectionHeader eyebrow="Requests" title="Мои заявки" />
          <View style={styles.cardGrid}>
            {requests.length === 0 ? (
              <GlassCard style={styles.card}>
                <Text style={styles.cardValue}>Пока нет заявок</Text>
                <Text style={styles.cardDesc}>Создайте первую заявку, чтобы увидеть список.</Text>
              </GlassCard>
            ) : (
              requests.map((request) => (
                <GlassCard key={request.id} style={styles.card}>
                  <Text style={styles.cardLabel}>{request.status}</Text>
                  <Text style={styles.cardValue}>{request.title}</Text>
                  <Text style={styles.cardDesc}>{request.description}</Text>
                  <View style={styles.cardAction}>
                    <PillButton
                      tone="ghost"
                      onPress={() =>
                        router.push({
                          pathname: "/(seeker)/request-details",
                          params: { requestId: request.id }
                        })
                      }
                    >
                      Открыть
                    </PillButton>
                  </View>
                </GlassCard>
              ))
            )}
          </View>
        </Animated.View>

        <Animated.View style={[styles.section, enter(2)]}>
          <SectionHeader eyebrow="Flow" title="Быстрые переходы" />
          <View style={styles.cardGrid}>
            <GlassCard style={styles.card}>
              <Text style={styles.cardLabel}>Offers</Text>
              <Text style={styles.cardValue}>Список откликов</Text>
              <Text style={styles.cardDesc}>Откройте все предложения по заявкам.</Text>
              <View style={styles.cardAction}>
                <PillButton tone="ghost" onPress={() => router.push("/(seeker)/offers-list")}>
                  Open
                </PillButton>
              </View>
            </GlassCard>
            <GlassCard style={styles.card}>
              <Text style={styles.cardLabel}>Details</Text>
              <Text style={styles.cardValue}>Карточка заявки</Text>
              <Text style={styles.cardDesc}>Передаём requestId через params.</Text>
              <View style={styles.cardAction}>
                <PillButton
                  tone="ghost"
                  onPress={() =>
                    router.push({ pathname: "/(seeker)/request-details", params: { requestId: "req_demo" } })
                  }
                >
                  Open
                </PillButton>
              </View>
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
            Открыть стайлгайд
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
  cardAction: {
    marginTop: spacing.md
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
