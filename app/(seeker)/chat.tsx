import { useLocalSearchParams, useRouter } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { PillButton } from "../../components/PillButton"
import { performers } from "../../src/data/performers"
import { mockStore } from "../../src/data/mockStore"
import { useSession } from "../../src/session/SessionContext"
import { colors, radii, shadow, spacing, type } from "../../theme/tokens"

type ChatMessageItem = {
  id: string
  senderId: string
  text: string
  createdAt: string
}

export default function Chat() {
  const router = useRouter()
  const { currentUser } = useSession()
  const { performerId } = useLocalSearchParams<{ performerId?: string }>()
  const performer = performers.find((item) => item.id === performerId) ?? performers[0]
  const [threadId, setThreadId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessageItem[]>([])
  const [text, setText] = useState("")

  const loadThread = useCallback(async () => {
    if (!currentUser || !performer) return
    const thread = await mockStore.chats.ensureThread(currentUser.id, performer.id)
    setThreadId(thread.id)
    const data = await mockStore.chats.listMessages(thread.id)
    setMessages(data)
  }, [currentUser, performer])

  useEffect(() => {
    loadThread()
  }, [loadThread])

  const handleSend = async () => {
    if (!currentUser || !threadId || !text.trim()) return
    const message = await mockStore.chats.sendMessage(threadId, currentUser.id, text.trim())
    setMessages((prev) => [...prev, message])
    setText("")
  }

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <PillButton tone="ghost" onPress={() => router.back()}>
          Назад
        </PillButton>
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{performer.name}</Text>
          <Text style={styles.headerMeta}>{performer.title}</Text>
        </View>
        <View style={styles.statusPill}>
          <Text style={styles.statusText}>доступен</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
        {messages.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Нет сообщений</Text>
            <Text style={styles.emptyText}>Напишите первым, чтобы начать консультацию.</Text>
          </View>
        ) : (
          messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.bubble,
                message.senderId === currentUser?.id
                  ? styles.bubbleOutgoing
                  : styles.bubbleIncoming,
              ]}
            >
              <Text style={styles.bubbleText}>{message.text}</Text>
              <Text style={styles.bubbleMeta}>
                • {new Date(message.createdAt).toLocaleTimeString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          placeholder="Напишите сообщение"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
          value={text}
          onChangeText={setText}
        />
        <PillButton
          style={styles.sendButton}
          textStyle={styles.sendButtonText}
          onPress={handleSend}
        >
          Отправить
        </PillButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: 48,
    paddingBottom: spacing.md,
  },
  headerInfo: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  headerName: {
    fontFamily: type.heading,
    fontSize: 16,
    color: colors.textPrimary,
  },
  headerMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
  },
  statusText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textPrimary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  messages: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  emptyCard: {
    padding: spacing.lg,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
  },
  emptyTitle: {
    fontFamily: type.heading,
    fontSize: 14,
    color: colors.textPrimary,
  },
  emptyText: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  bubble: {
    maxWidth: "80%",
    padding: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.stroke,
    ...shadow.soft,
  },
  bubbleIncoming: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
  },
  bubbleOutgoing: {
    alignSelf: "flex-end",
    backgroundColor: colors.surfaceStrong,
  },
  bubbleText: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  bubbleMeta: {
    fontFamily: type.bodyMedium,
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  inputBar: {
    borderTopWidth: 1,
    borderTopColor: colors.stroke,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.stroke,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textPrimary,
    backgroundColor: colors.bg,
  },
  sendButton: {
    marginTop: spacing.sm,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  sendButtonText: {
    textAlign: "center",
  },
})
