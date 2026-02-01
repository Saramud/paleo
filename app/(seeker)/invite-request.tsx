import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PillButton } from "../../components/PillButton";
import type { JobRequest } from "../../src/domain/types";
import { performers } from "../../src/data/performers";
import { mockStore } from "../../src/data/mockStore";
import { useSession } from "../../src/session/SessionContext";
import { colors, radii, shadow, spacing, type } from "../../theme/tokens";

export default function InviteRequest() {
  const router = useRouter();
  const { performerId } = useLocalSearchParams<{ performerId?: string }>();
  const { currentUser } = useSession();
  const performer = performers.find((item) => item.id === performerId) ?? performers[0];
  const [requests, setRequests] = useState<JobRequest[]>([]);
  const [sentRequestId, setSentRequestId] = useState<string | null>(null);

  const loadRequests = useCallback(async () => {
    if (!currentUser) return;
    const all = await mockStore.jobRequests.list();
    setRequests(all.filter((item) => item.seekerId === currentUser.id));
  }, [currentUser]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const handleInvite = async (requestId: string) => {
    if (!currentUser || !performer) return;
    await mockStore.invitations.create({
      seekerId: currentUser.id,
      performerId: performer.id,
      requestId
    });
    setSentRequestId(requestId);
  };

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Пригласить специалиста</Text>
        <PillButton tone="ghost" onPress={() => router.back()}>
          Назад
        </PillButton>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={styles.kicker}>СПЕЦИАЛИСТ</Text>
          <Text style={styles.headerName}>{performer.name}</Text>
          <Text style={styles.headerMeta}>{performer.title}</Text>
        </View>

        {requests.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Нет запросов</Text>
            <Text style={styles.emptyText}>Создайте запрос, чтобы пригласить специалиста.</Text>
            <PillButton onPress={() => router.push("/(seeker)/request-create-edit")}>
              Создать запрос
            </PillButton>
          </View>
        ) : (
          requests.map((request) => (
            <Pressable
              key={request.id}
              style={styles.card}
              onPress={() => handleInvite(request.id)}
            >
              <Text style={styles.cardTitle}>{request.title}</Text>
              <Text style={styles.cardDesc}>{request.description}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardMeta}>{request.status}</Text>
                <View
                  style={[
                    styles.badge,
                    sentRequestId === request.id ? styles.badgeSent : styles.badgeDefault
                  ]}
                >
                  <Text
                    style={[styles.badgeText, sentRequestId === request.id && styles.badgeTextSent]}
                  >
                    {sentRequestId === request.id ? "Приглашение отправлено" : "Пригласить"}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: 48,
    paddingBottom: spacing.md
  },
  title: {
    fontFamily: type.heading,
    fontSize: 20,
    color: colors.textPrimary
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
    gap: spacing.md
  },
  headerCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
    gap: spacing.xs
  },
  kicker: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.accent,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  headerName: {
    fontFamily: type.heading,
    fontSize: 16,
    color: colors.textPrimary
  },
  headerMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary
  },
  emptyCard: {
    padding: spacing.xl,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
    gap: spacing.md
  },
  emptyTitle: {
    fontFamily: type.heading,
    fontSize: 18,
    color: colors.textPrimary
  },
  emptyText: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface,
    gap: spacing.sm,
    ...shadow.soft
  },
  cardTitle: {
    fontFamily: type.heading,
    fontSize: 15,
    color: colors.textPrimary
  },
  cardDesc: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardMeta: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999
  },
  badgeDefault: {
    backgroundColor: colors.accent
  },
  badgeSent: {
    backgroundColor: colors.accentSoft
  },
  badgeText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.surface
  },
  badgeTextSent: {
    color: colors.textPrimary
  }
});
