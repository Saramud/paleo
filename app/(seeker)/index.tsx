import { useRouter } from "expo-router"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { PillButton } from "../../components/PillButton"
import { performers } from "../../src/data/performers"
import { useSession } from "../../src/session/SessionContext"
import { colors, radii, shadow, spacing, type } from "../../theme/tokens"

export default function Home() {
  const { logout, currentUser } = useSession()
  const router = useRouter()
  const roleLabel = currentUser?.role === "SEEKER" ? "Нужна помощь" : "Специалист"

  return (
    <View style={styles.root}>
      <View style={styles.accentBand} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.roleText}>PallioHelp · {roleLabel}</Text>
          <PillButton tone="ghost" onPress={logout}>
            Выйти
          </PillButton>
        </View>

        <View style={styles.hero}>
          <Text style={styles.kicker}>PallioHelp</Text>
          <Text style={styles.title}>Паллиативная помощь рядом</Text>
          <Text style={styles.subtitle}>
            Подберите специалиста по уходу и поддержке или создайте запрос на помощь.
          </Text>
          <PillButton
            onPress={() => router.push("/(seeker)/request-create-edit")}
            style={styles.fullWidthButton}
            textStyle={styles.fullWidthButtonText}
          >
            Создать запрос
          </PillButton>
        </View>

        <View style={styles.section}>
          <View style={styles.filters}>
            {FILTERS.map((item) => (
              <View key={item} style={styles.filterChip}>
                <Text style={styles.filterText}>{item}</Text>
              </View>
            ))}
          </View>

          {performers.map((performer) => (
            <Pressable
              key={performer.id}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/(seeker)/performer-details",
                  params: { performerId: performer.id },
                })
              }
            >
              <View style={styles.cardHeader}>
                <Image source={performer.image} style={styles.avatarImage} />
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.cardTitle}>{performer.name}</Text>
                  <Text style={styles.cardMeta}>{performer.title}</Text>
                </View>
                <View style={styles.ratingPill}>
                  <Text style={styles.ratingValue}>{performer.rating.toFixed(1)}</Text>
                  <Text style={styles.ratingCount}>• {performer.reviews} рекомендаций</Text>
                </View>
              </View>

              <Text style={styles.cardDesc}>{performer.about}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.metaText}>{performer.location}</Text>
                <View style={styles.dot} />
                <Text style={styles.metaText}>{performer.experience}</Text>
                <View style={styles.dot} />
                <Text style={styles.metaText}>{performer.availability}</Text>
              </View>

              <View style={styles.tagRow}>
                {performer.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.priceText}>{performer.price}</Text>
                <View style={[styles.badge, styles.badgeAccent]}>
                  <Text style={styles.badgeText}>{performer.badge}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  accentBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: colors.bgSoft,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 48,
    paddingBottom: 80,
    gap: spacing.xl,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleText: {
    fontFamily: type.bodyMedium,
    color: colors.textSecondary,
    fontSize: 12,
    letterSpacing: 2,
  },
  hero: {
    padding: spacing.xl,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
    gap: spacing.sm,
  },
  kicker: {
    fontFamily: type.bodyMedium,
    color: colors.accent,
    letterSpacing: 2,
    fontSize: 11,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: type.heading,
    color: colors.textPrimary,
    fontSize: 24,
  },
  subtitle: {
    fontFamily: type.body,
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    gap: spacing.md,
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.stroke,
  },
  filterText: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface,
    gap: spacing.sm,
    ...shadow.soft,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accentSoft,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: type.heading,
    fontSize: 16,
    color: colors.textPrimary,
  },
  cardMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
  },
  ratingValue: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.textPrimary,
  },
  ratingCount: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardDesc: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.stroke,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.surfaceStrong,
  },
  tagText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontFamily: type.heading,
    fontSize: 14,
    color: colors.textPrimary,
  },
  fullWidthButton: {
    alignSelf: "stretch",
    justifyContent: "center",
  },
  fullWidthButtonText: {
    textAlign: "center",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.accentSoft,
  },
  badgeAccent: {
    backgroundColor: colors.accent,
  },
  badgeText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.surface,
    letterSpacing: 1,
  },
})

const FILTERS = ["Рядом", "С выездом", "Опыт с онко", "24/7"]
