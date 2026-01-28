import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { PillButton } from "../../components/PillButton";
import { mockStore } from "../../src/data/mockStore";
import type { JobRequest, Offer } from "../../src/domain/types";
import { colors, spacing, type } from "../../theme/tokens";

type Params = {
  requestId?: string;
};

export default function OffersList() {
  const { requestId } = useLocalSearchParams<Params>();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [request, setRequest] = useState<JobRequest | null>(null);

  const loadData = async () => {
    if (!requestId) return;
    const allOffers = await mockStore.offers.list();
    setOffers(allOffers.filter((offer) => offer.requestId === String(requestId)));
    const req = await mockStore.jobRequests.get(String(requestId));
    setRequest(req);
  };

  useEffect(() => {
    loadData();
  }, [requestId]);

  useFocusEffect(() => {
    loadData();
    return undefined;
  });

  const handleAccept = async (offerId: string) => {
    if (!requestId) return;
    const currentOffers = await mockStore.offers.list();
    const target = currentOffers.find((item) => item.id === offerId);
    if (!target) return;

    await Promise.all(
      currentOffers
        .filter((item) => item.requestId === String(requestId))
        .map((item) =>
          mockStore.offers.update(item.id, {
            status: item.id === offerId ? "ACCEPTED" : "REJECTED"
          })
        )
    );

    await mockStore.jobRequests.update(String(requestId), {
      status: "ASSIGNED",
      assignedProviderId: target.providerId
    });

    await loadData();
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Offers List</Text>
      <Text style={styles.meta}>requestId: {requestId ?? "all"}</Text>
      {request ? (
        <Text style={styles.meta}>request status: {request.status}</Text>
      ) : null}
      {offers.length === 0 ? (
        <Text style={styles.meta}>Офферов пока нет.</Text>
      ) : (
        offers.map((offer) => (
          <View key={offer.id} style={styles.card}>
            <Text style={styles.cardTitle}>providerId: {offer.providerId}</Text>
            <Text style={styles.meta}>price: {offer.price ?? "n/a"}</Text>
            <Text style={styles.meta}>message: {offer.message ?? "-"}</Text>
            <Text style={styles.meta}>status: {offer.status}</Text>
            {request?.status === "PUBLISHED" && offer.status === "SENT" ? (
              <View style={styles.cardAction}>
                <PillButton onPress={() => handleAccept(offer.id)}>Принять</PillButton>
              </View>
            ) : null}
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
    gap: spacing.md
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 22
  },
  meta: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14
  },
  card: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    gap: spacing.xs
  },
  cardTitle: {
    fontFamily: type.bodyMedium,
    color: colors.textPrimary,
    fontSize: 13
  },
  cardAction: {
    marginTop: spacing.sm
  }
});
