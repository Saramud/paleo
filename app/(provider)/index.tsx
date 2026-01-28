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
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.roleText}>{currentUser?.role ?? "UNKNOWN"}</Text>
          <PillButton tone="ghost" onPress={logout}>
            Logout
          </PillButton>
        </View>

        <Text style={styles.title}>Provider Home</Text>
        <Text style={styles.subtitle}>Опубликованные заявки без вашего оффера.</Text>

        <View style={styles.actionRow}>
          <PillButton
            onPress={() =>
              router.push({ pathname: "/(provider)/request-details", params: { requestId: "req_demo" } })
            }
          >
            Open request
          </PillButton>
          <PillButton tone="ghost" onPress={() => router.push("/(provider)/my-offers")}>
            My offers
          </PillButton>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requests</Text>
          {requests.length === 0 ? (
            <Text style={styles.empty}>Нет заявок для отклика.</Text>
          ) : (
            requests.map((item) => (
              <View key={item.id} style={styles.card}>
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
          <Text style={styles.sectionTitle}>Offers</Text>
          {offers.length === 0 ? (
            <Text style={styles.empty}>No offers yet.</Text>
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
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 22
  },
  subtitle: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: "left"
  },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
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
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)"
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
  }
});
