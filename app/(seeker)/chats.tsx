import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { PillButton } from "../../components/PillButton";
import { performers } from "../../src/data/performers";
import { mockStore } from "../../src/data/mockStore";
import { useSession } from "../../src/session/SessionContext";
import { colors, radii, shadow, spacing, type } from "../../theme/tokens";

type ChatPreview = {
  id: string;
  performerId: string;
  performerName: string;
  performerTitle: string;
  lastMessage?: string;
  lastMessageAt?: string;
};

export default function Chats() {
  const router = useRouter();
  const { currentUser } = useSession();
  const [threads, setThreads] = useState<ChatPreview[]>([]);

  const loadThreads = useCallback(async () => {
    if (!currentUser) return;
    const threadItems = await mockStore.chats.listThreadsBySeeker(currentUser.id);
    const previews = await Promise.all(
      threadItems.map(async (thread) => {
        const messages = await mockStore.chats.listMessages(thread.id);
        const last = [...messages].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))[0];
        const performer = performers.find((item) => item.id === thread.performerId);
        return {
          id: thread.id,
          performerId: thread.performerId,
          performerName: performer?.name ?? "Исполнитель",
          performerTitle: performer?.title ?? "",
          lastMessage: last?.text,
          lastMessageAt: last?.createdAt
        };
      })
    );
    setThreads(
      previews.sort((a, b) => ((a.lastMessageAt ?? "") > (b.lastMessageAt ?? "") ? -1 : 1))
    );
  }, [currentUser]);

  useEffect(() => {
    loadThreads();
  }, [loadThreads]);

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Диалоги</Text>
        <PillButton tone="ghost" onPress={() => router.back()}>
          Назад
        </PillButton>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {threads.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Пока нет переписок</Text>
            <Text style={styles.emptyText}>Откройте профиль специалиста и нажмите “Написать”.</Text>
            <PillButton onPress={() => router.push("/(seeker)")}>Специалисты</PillButton>
          </View>
        ) : (
          threads.map((thread) => (
            <Pressable
              key={thread.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(seeker)/chat",
                  params: { performerId: thread.performerId }
                })
              }
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardTitle}>{thread.performerName}</Text>
                  <Text style={styles.cardMeta}>{thread.performerTitle}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Диалог</Text>
                </View>
              </View>
              <Text style={styles.cardMessage}>{thread.lastMessage ?? "Нет сообщений"}</Text>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardTitle: {
    fontFamily: type.heading,
    fontSize: 15,
    color: colors.textPrimary
  },
  cardMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2
  },
  cardMessage: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary
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
    textTransform: "uppercase",
    letterSpacing: 1
  }
});
