import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { PillButton } from "../../components/PillButton";
import { performers } from "../../src/data/performers";
import { colors, radii, shadow, spacing, type } from "../../theme/tokens";

export default function PerformerDetails() {
  const router = useRouter();
  const { performerId } = useLocalSearchParams<{ performerId?: string }>();
  const performer = performers.find((item) => item.id === performerId);

  if (!performer) {
    return (
      <View style={styles.root}>
        <View style={styles.accentBand} />
        <View style={styles.missingCard}>
          <Text style={styles.kicker}>ПРОФИЛЬ НЕ НАЙДЕН</Text>
          <Text style={styles.title}>Такого специалиста нет</Text>
          <Text style={styles.subtitle}>Проверьте ссылку или вернитесь к витрине.</Text>
          <PillButton onPress={() => router.push("/(seeker)")}>К специалистам</PillButton>
          <PillButton tone="ghost" onPress={() => router.back()}>
            Назад
          </PillButton>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.accentBand} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.kicker}>PallioHelp</Text>
          <PillButton tone="ghost" onPress={() => router.back()}>
            Назад
          </PillButton>
        </View>

        <View style={styles.hero}>
          <Image source={performer.image} style={styles.heroImage} />
          <View style={styles.heroInfo}>
            <Text style={styles.title}>{performer.name}</Text>
            <Text style={styles.subtitle}>{performer.title}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.ratingValue}>{performer.rating.toFixed(1)}</Text>
              <Text style={styles.ratingMeta}>• {performer.reviews} рекомендаций</Text>
            </View>
            <Text style={styles.price}>{performer.price}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>О специалисте</Text>
          <Text style={styles.sectionText}>{performer.about}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Подход и опыт</Text>
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
        </View>

        <View style={styles.actions}>
          <PillButton
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            onPress={() =>
              router.push({
                pathname: "/(seeker)/chat",
                params: { performerId: performer.id }
              })
            }
          >
            Написать специалисту
          </PillButton>
          <PillButton
            tone="ghost"
            onPress={() =>
              router.push({
                pathname: "/(seeker)/invite-request",
                params: { performerId: performer.id }
              })
            }
          >
            Пригласить к уходу
          </PillButton>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  accentBand: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: colors.bgSoft
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: 48,
    paddingBottom: 80,
    gap: spacing.lg
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  kicker: {
    fontFamily: type.bodyMedium,
    color: colors.accent,
    letterSpacing: 2,
    fontSize: 11,
    textTransform: "uppercase"
  },
  hero: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface,
    ...shadow.soft
  },
  heroImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.accentSoft
  },
  heroInfo: {
    flex: 1,
    gap: spacing.xs
  },
  title: {
    fontFamily: type.heading,
    fontSize: 20,
    color: colors.textPrimary
  },
  subtitle: {
    fontFamily: type.body,
    fontSize: 13,
    color: colors.textSecondary
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  ratingValue: {
    fontFamily: type.bodyMedium,
    fontSize: 13,
    color: colors.textPrimary
  },
  ratingMeta: {
    fontFamily: type.body,
    fontSize: 12,
    color: colors.textSecondary
  },
  price: {
    fontFamily: type.heading,
    fontSize: 14,
    color: colors.textPrimary
  },
  sectionCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surface
  },
  sectionTitle: {
    fontFamily: type.bodyMedium,
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  sectionText: {
    fontFamily: type.body,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    lineHeight: 20
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: spacing.sm
  },
  metaText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.stroke
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.sm
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.surfaceStrong
  },
  tagText: {
    fontFamily: type.bodyMedium,
    fontSize: 11,
    color: colors.textSecondary
  },
  actions: {
    gap: spacing.sm
  },
  primaryButton: {
    alignSelf: "stretch",
    justifyContent: "center"
  },
  primaryButtonText: {
    textAlign: "center"
  },
  missingCard: {
    margin: spacing.xl,
    padding: spacing.xl,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.stroke,
    backgroundColor: colors.surfaceStrong,
    gap: spacing.md
  }
});
