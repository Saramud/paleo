import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PillButton } from "../../components/PillButton";
import { mockStore } from "../../src/data/mockStore";
import type { JobRequest } from "../../src/domain/types";
import { useSession } from "../../src/session/SessionContext";
import { colors, spacing, type } from "../../theme/tokens";

type Params = {
  requestId?: string;
};

export default function RequestDetails() {
  const router = useRouter();
  const { requestId } = useLocalSearchParams<Params>();
  const { currentUser } = useSession();
  const [request, setRequest] = useState<JobRequest | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!requestId) return;
      const data = await mockStore.jobRequests.get(String(requestId));
      setRequest(data);
    };

    load();
  }, [requestId]);

  const handleTransition = async (nextStatus: "IN_PROGRESS" | "DONE") => {
    if (!requestId || !currentUser) return;
    const updated = await mockStore.jobRequests.transitionStatus(
      String(requestId),
      currentUser.role,
      nextStatus
    );
    if (updated) {
      setRequest(updated);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Детали запроса</Text>
      <Text style={styles.meta}>ID �������: {requestId ?? "���"}</Text>
      {request ? (
        <View style={styles.block}>
          <Text style={styles.value}>{request.title}</Text>
          <Text style={styles.meta}>{request.description}</Text>
          <Text style={styles.meta}>статус: {request.status}</Text>
          {request.budget ? <Text style={styles.meta}>бюджет: {request.budget} ₽</Text> : null}
          {request.locationText ? (
            <Text style={styles.meta}>локация: {request.locationText}</Text>
          ) : null}
        </View>
      ) : (
        <Text style={styles.meta}>Запрос не найден.</Text>
      )}
      <PillButton
        tone="ghost"
        onPress={() => router.push({ pathname: "/(provider)/offer-create", params: { requestId } })}
      >
        Отправить предложение
      </PillButton>
      {currentUser?.role === "PROVIDER" && request?.status === "ASSIGNED" ? (
        <PillButton onPress={() => handleTransition("IN_PROGRESS")}>В работу</PillButton>
      ) : null}
      {currentUser?.role === "PROVIDER" && request?.status === "IN_PROGRESS" ? (
        <PillButton onPress={() => handleTransition("DONE")}>Завершить</PillButton>
      ) : null}
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
  block: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface
  },
  value: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 18
  }
});
