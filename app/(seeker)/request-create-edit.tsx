import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { PillButton } from "../../components/PillButton"
import { mockStore } from "../../src/data/mockStore"
import type { JobRequestStatus } from "../../src/domain/types"
import { useSession } from "../../src/session/SessionContext"
import { colors, spacing, type } from "../../theme/tokens"

export default function RequestCreateEdit() {
  const { currentUser } = useSession()
  const router = useRouter()
  const { requestId } = useLocalSearchParams<{ requestId?: string }>()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [locationText, setLocationText] = useState("")

  useEffect(() => {
    const load = async () => {
      if (!requestId) return
      const existing = await mockStore.jobRequests.get(String(requestId))
      if (!existing) return
      setTitle(existing.title)
      setDescription(existing.description)
      setBudget(existing.budget ? String(existing.budget) : "")
      setLocationText(existing.locationText ?? "")
    }

    load()
  }, [requestId])

  const handleSave = async (status: JobRequestStatus) => {
    if (!currentUser) return
    if (!title.trim() || !description.trim()) return

    const payload = {
      title: title.trim(),
      description: description.trim(),
      budget: budget ? Number(budget) : undefined,
      locationText: locationText.trim() || undefined,
      seekerId: currentUser.id,
      status,
    }

    if (requestId) {
      await mockStore.jobRequests.update(String(requestId), payload)
    } else {
      await mockStore.jobRequests.create(payload)
    }

    router.replace("/(seeker)")
  }

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Создание запроса</Text>
      <View style={styles.field}>
        <Text style={styles.label}>Краткий заголовок</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Например: ночной уход"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Описание потребностей</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Диагноз, режим, требования"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, styles.textarea]}
          multiline
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Бюджет</Text>
        <TextInput
          value={budget}
          onChangeText={setBudget}
          placeholder="2000"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Локация</Text>
        <TextInput
          value={locationText}
          onChangeText={setLocationText}
          placeholder="Город / район"
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />
      </View>
      <View style={styles.actions}>
        <PillButton tone="ghost" onPress={() => handleSave("DRAFT")}>
          Сохранить черновик
        </PillButton>
        <PillButton onPress={() => handleSave("PUBLISHED")}>Опубликовать</PillButton>
      </View>
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
  field: {
    gap: spacing.sm,
  },
  actions: {
    gap: spacing.md,
    marginTop: spacing.sm,
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
