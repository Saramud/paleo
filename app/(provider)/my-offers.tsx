import { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { mockStore } from "../../src/data/mockStore"
import type { Offer } from "../../src/domain/types"
import { useSession } from "../../src/session/SessionContext"
import { colors, spacing, type } from "../../theme/tokens"

export default function MyOffers() {
  const { currentUser } = useSession()
  const [offers, setOffers] = useState<Offer[]>([])

  const loadOffers = useCallback(async () => {
    if (!currentUser) return
    const all = await mockStore.offers.list()
    setOffers(all.filter((offer) => offer.providerId === currentUser.id))
  }, [currentUser])

  useEffect(() => {
    loadOffers()
  }, [loadOffers])

  useFocusEffect(
    useCallback(() => {
      loadOffers()
      return undefined
    }, [loadOffers]),
  )

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Мои предложения</Text>
      {offers.length === 0 ? (
        <Text style={styles.meta}>Пока нет отправленных предложений.</Text>
      ) : (
        offers.map((offer) => (
          <View key={offer.id} style={styles.card}>
            <Text style={styles.cardTitle}>{offer.message ?? "Предложение"}</Text>
            <Text style={styles.meta}>статус: {offer.status}</Text>
            {offer.price ? <Text style={styles.meta}>стоимость: {offer.price} ₽</Text> : null}
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.xl,
    gap: spacing.md,
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
  card: {
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface,
  },
  cardTitle: {
    fontFamily: type.bodyMedium,
    color: colors.textPrimary,
    fontSize: 14,
  },
})
