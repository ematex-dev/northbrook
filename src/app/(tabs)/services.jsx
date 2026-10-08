import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { colors, fonts, spacing } from "../../constants/theme";

// Photos from the design (swap for licensed/local assets before launch)
const img = (id) =>
  `https://images.unsplash.com/${id}?w=600&q=75&auto=format&fit=crop`;

const SERVICES = [
  [
    "Personal care",
    "Bathing, dressing, mobility",
    img("photo-1773227055624-07b515ba87c5"),
  ],
  [
    "Companionship",
    "Conversation, hobbies, walks",
    img("photo-1762955911769-d652ceaa94bb"),
  ],
  [
    "Home & meals",
    "Housekeeping, cooking",
    img("photo-1702648156180-25d8be9c9527"),
  ],
  [
    "Medication reminders",
    "Prompts and routines",
    img("photo-1666887360726-f55472d96c34"),
  ],
  [
    "Transport & errands",
    "Appointments, groceries",
    img("photo-1658314755707-1fbdf7c40145"),
  ],
  [
    "Respite care",
    "Rest for family caregivers",
    img("photo-1646663133945-db03f563076a"),
  ],
];

const GAP = 12;

export default function Services() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Two equal columns: screen width minus side margins and the gap between
  const cardWidth = (width - spacing.gutter * 2 - GAP) / 2;

  const goContact = () => router.navigate("/contact");

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      bounces
      alwaysBounceVertical
      overScrollMode="always"
      keyboardShouldPersistTaps="handled"
    >
      <Header
        title="Services"
        subtitle="Six core services. Most families start with two or three."
      />

      {/* ───── 2-column grid ───── */}
      <View style={styles.grid}>
        {SERVICES.map(([title, desc, uri]) => (
          <Pressable
            key={title}
            onPress={goContact}
            style={({ pressed }) => [
              styles.card,
              { width: cardWidth },
              pressed && { opacity: 0.85 },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${title}. ${desc}`}
          >
            <Image
              source={{ uri }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardDesc}>{desc}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      {/* ───── Dark CTA card ───── */}
      <View style={styles.cta}>
        <Text style={styles.ctaTitle}>
          Let's figure out what help looks like
        </Text>
        <Text style={styles.ctaSub}>The first conversation costs nothing.</Text>
        <Button title="Request a consultation" onPress={goContact} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingBottom: 48 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    paddingHorizontal: spacing.gutter,
    paddingTop: 20,
    paddingBottom: 24,
  },
  card: {
    minHeight: 230,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 22,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 140, backgroundColor: colors.tint },
  cardBody: { paddingTop: 14, paddingHorizontal: 14, paddingBottom: 16 },
  cardTitle: {
    fontFamily: fonts.headingSemi,
    fontSize: 18,
    lineHeight: 22,
    color: colors.text,
  },
  cardDesc: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textSecondary,
    marginTop: 6,
  },

  cta: {
    marginHorizontal: spacing.gutter,
    backgroundColor: colors.ink,
    borderRadius: 24,
    padding: 22,
  },
  ctaTitle: {
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 27,
    color: colors.textOnDark,
    marginBottom: 6,
  },
  ctaSub: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: colors.textOnDarkMuted,
    marginBottom: 18,
  },
});
