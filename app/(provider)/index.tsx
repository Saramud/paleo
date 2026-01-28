import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { PillButton } from "../../components/PillButton";
import { useSession } from "../../src/session/SessionContext";
import { mockStore } from "../../src/data/mockStore";
import type { JobRequest, Offer } from "../../src/domain/types";
import { colors, spacing, type } from "../../theme/tokens";

export default function ProviderHome() {
  const { logout, currentUser } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState<JobRequest[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  const loadData = async () => {
      if (!currentUser) return;

      const existingRequests = await mockStore.jobRequests.list();
      if (existingRequests.length === 0) {
        await mockStore.jobRequests.create({
          title: "Fix kitchen sink",
          description: "Leaking faucet, need quick repair.",
          budget: 80,
          locationText: "Downtown",
          seekerId: "seeker_demo",
          status: "PUBLISHED"
        });
        await mockStore.jobRequests.create({
          title: "Assemble IKEA desk",
          description: "Need assembly this weekend.",
          budget: 120,
          locationText: "Midtown",
          seekerId: "seeker_demo",
          status: "PUBLISHED"
        });
        await mockStore.jobRequests.create({
          title: "Paint living room",
          description: "Two walls, light color.",
          budget: 200,
          locationText: "Uptown",
          seekerId: "seeker_demo",
          status: "DRAFT"
        });
      }

      const allRequests = await mockStore.jobRequests.list();
      const allOffers = await mockStore.offers.list();

      setOffers(allOffers.filter((offer) => offer.providerId === currentUser.id));

      const offeredRequestIds = new Set(
        allOffers.filter((offer) => offer.providerId === currentUser.id).map((offer) => offer.requestId)
      );

      setRequests(
        allRequests.filter(
          (request) => request.status === "PUBLISHED" && !offeredRequestIds.has(request.id)
        )
      );
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  useFocusEffect(() => {
    loadData();
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
          <Text style={styles.kicker}>PROVIDER</Text>
          <Text style={styles.title}>Доступные заявки</Text>
          <Text style={styles.subtitle}>Только PUBLISHED и без ваших офферов.</Text>
          <PillButton
            tone="ghost"
            onPress={() => router.push("/(provider)/my-offers")}
            style={styles.fullWidthButton}
            textStyle={styles.fullWidthButtonText}
          >
            Мои офферы
          </PillButton>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requests</Text>
          {requests.length === 0 ? (
            <Text style={styles.empty}>Нет заявок для отклика.</Text>
          ) : (
            requests.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.badgeRow}>
                  <View style={[styles.badge, badgeStyle(item.status)]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardMeta}>{item.description}</Text>
                <Text style={styles.cardMeta}>budget: {item.budget ?? "n/a"}</Text>
                <View style={styles.cardAction}>
                  <PillButton
                    tone="ghost"
                    onPress={() =>
                      router.push({ pathname: "/(provider)/request-details", params: { requestId: item.id } })
                    }
                  >
                    Открыть
                  </PillButton>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My offers (preview)</Text>
          {offers.length === 0 ? (
            <Text style={styles.empty}>Нет отправленных офферов.</Text>
          ) : (
            offers.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardTitle}>{item.message ?? "Offer"}</Text>
                <Text style={styles.cardMeta}>{item.status}</Text>
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
    backgroundColor: colors.bg,
    alignItems: "stretch",
    justifyContent: "center"
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
    gap: spacing.lg,
    padding: spacing.xl
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
    textAlign: "left",
    lineHeight: 20
  },
  section: {
    gap: spacing.sm
  },
  sectionTitle: {
    fontFamily: type.bodyMedium,
    color: colors.textPrimary,
    fontSize: 14,
    letterSpacing: 1
  },
  empty: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 13
  },
  card: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface
  },
  cardAction: {
    marginTop: spacing.sm
  },
  cardTitle: {
    fontFamily: type.bodyMedium,
    color: colors.textPrimary,
    fontSize: 14
  },
  cardMeta: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4
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
      return { backgroundColor: colors.accent };
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
