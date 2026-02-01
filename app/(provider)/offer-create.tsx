import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { PillButton } from "../../components/PillButton"
import { mockStore } from "../../src/data/mockStore"
import { useSession } from "../../src/session/SessionContext"
import { colors, spacing, type } from "../../theme/tokens"

type Params = {
  requestId?: string
}

export default function OfferCreate() {
  const { currentUser } = useSession()
  const router = useRouter()
  const { requestId } = useLocalSearchParams<Params>()
  const [price, setPrice] = useState("")
  const [message, setMessage] = useState("")

  const handleSend = async () => {
    if (!currentUser || !requestId) return
    const parsedPrice = price ? Number(price) : undefined

    await mockStore.offers.create({
      requestId: String(requestId),
      providerId: currentUser.id,
      price: Number.isNaN(parsedPrice) ? undefined : parsedPrice,
      message: message.trim() || undefined,
      status: "SENT",
    })

    router.back()
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Предложение по уходу</Text>
      <Text style={styles.meta}>ID �������: {requestId ?? "���"}</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Стоимость</Text>
        <TextInput
          value={price}
          onChangeText={setPrice}
          placeholder="2500"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Комментарий</Text>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Опыт, график, условия"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, styles.textarea]}
          multiline
        />
      </View>
      <PillButton onPress={handleSend}>Отправить предложение</PillButton>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 22,
  },
  meta: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontFamily: type.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.stroke,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.textPrimary,
    fontFamily: type.body,
    backgroundColor: colors.surface,
  },
  textarea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
})
