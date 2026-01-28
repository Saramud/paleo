import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { PillButton } from "../../components/PillButton";
import type { JobRequest } from "../../src/domain/types";
import { mockStore } from "../../src/data/mockStore";
import { useSession } from "../../src/session/SessionContext";
import { colors, spacing, type } from "../../theme/tokens";

export default function Home() {
  const { logout, currentUser } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<JobRequest[]>([]);

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

  return (
    <View style={styles.root}>
      <View style={styles.accentBand} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.roleText}>{currentUser?.role ?? "UNKNOWN"}</Text>
          <PillButton tone="ghost" onPress={logout}>
            Logout
          </PillButton>
        </View>

        <View style={styles.hero}>
          <Text style={styles.kicker}>SEEKER</Text>
          <Text style={styles.title}>Мои заявки</Text>
          <Text style={styles.subtitle}>Создавайте заявки и выбирайте лучший оффер.</Text>
          <PillButton
            onPress={() => router.push("/(seeker)/request-create-edit")}
            style={styles.fullWidthButton}
            textStyle={styles.fullWidthButtonText}
          >
            Создать заявку
          </PillButton>
        </View>

        <View style={styles.section}>
          {requests.length === 0 ? (
            <View style={styles.card}>
              <Text style={styles.cardValue}>Пока нет заявок</Text>
              <Text style={styles.cardDesc}>Создайте первую заявку, чтобы увидеть список.</Text>
            </View>
          ) : (
            requests.map((request) => (
              <View key={request.id} style={styles.card}>
                <View style={styles.badgeRow}>
                  <View style={[styles.badge, badgeStyle(request.status)]}>
                    <Text style={styles.badgeText}>{request.status}</Text>
                  </View>
                </View>
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
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  accentBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: colors.bgSoft
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
  hero: {
    padding: spacing.xl,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
    gap: spacing.sm
  },
  kicker: {
    fontFamily: type.bodyMedium,
    color: colors.accent,
    letterSpacing: 2,
    fontSize: 11,
    textTransform: "uppercase"
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 24
  },
  subtitle: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20
  },
  section: {
    gap: spacing.md
  },
  card: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface
  },
  cardLabel: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  cardValue: {
    fontFamily: type.heading,
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: spacing.sm
  },
  cardDesc: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: spacing.sm
  },
  cardAction: {
    marginTop: spacing.md
  },
  fullWidthButton: {
    alignSelf: "stretch",
    justifyContent: "center"
  },
  fullWidthButtonText: {
    textAlign: "center"
  },
  badgeRow: {
    flexDirection: "row"
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.accentSoft
  },
  badgeText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textPrimary,
    letterSpacing: 1
  }
});

const badgeStyle = (status: JobRequest["status"]) => {
  switch (status) {
    case "DRAFT":
      return { backgroundColor: colors.accentSoft };
    case "PUBLISHED":
      return { backgroundColor: colors.accent, borderWidth: 0 };
    case "ASSIGNED":
    case "IN_PROGRESS":
      return { backgroundColor: colors.accentAltSoft };
    case "DONE":
      return { backgroundColor: colors.success };
    case "CANCELED":
    default:
      return { backgroundColor: colors.stroke };
  }
};
