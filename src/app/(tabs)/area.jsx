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
import Header from "../../components/Header";
import { colors, fonts, spacing } from "../../constants/theme";

// Map image (local file in assets/images/)
const MAP_IMAGE = require("../../../assets/images/service-area.png");

const COUNTIES = [
  "Knoxville",
  "Knox County",
  "Blount County",
  "Loudon County",
  "Anderson County",
  "Sevier County",
];

const GAP = 9;

export default function Area() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const chipWidth = (width - spacing.gutter * 2 - GAP) / 2;

  // Exact map size: card width minus margins and padding, height from the image ratio
  const mapWidth = width - spacing.gutter * 2 - 20;
  const mapHeight = mapWidth * (295 / 390);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      bounces
      alwaysBounceVertical
      overScrollMode="always"
    >
      <Header
        title="Service area"
        subtitle="Caregivers live in the communities they serve, so travel stays short."
      />

      {/* ───── Map (normal image) ───── */}
      <View style={styles.mapCard}>
        <Image
          source={MAP_IMAGE}
          style={{ width: mapWidth, height: mapHeight, borderRadius: 12 }}
          resizeMode="contain"
        />
      </View>

      {/* ───── County list ───── */}
      <View style={styles.chips}>
        {COUNTIES.map((name) => (
          <View key={name} style={[styles.chip, { width: chipWidth }]}>
            <Text style={styles.chipText}>{name}</Text>
          </View>
        ))}
      </View>

      {/* ───── Outside these lines (card, transparent) ───── */}
      <View style={styles.cta}>
        <Pressable
          onPress={() => router.navigate("/contact")}
          style={({ pressed }) => [styles.ctaCard, pressed && { opacity: 0.7 }]}
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>Outside these lines? Ask anyway</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingBottom: 48 },

  mapCard: {
    marginHorizontal: spacing.gutter,
    marginTop: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 22,
    padding: 10,
    overflow: "hidden",
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
    paddingHorizontal: spacing.gutter,
    paddingTop: 14,
  },
  chip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 13,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  chipText: { fontFamily: fonts.headingSemi, fontSize: 15, color: colors.text },

  cta: { paddingHorizontal: spacing.gutter, paddingTop: 16 },
  ctaCard: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 13,
    paddingVertical: 16,
    paddingHorizontal: 14,
    alignItems: "center",
  },
  ctaText: {
    fontFamily: fonts.headingSemi,
    fontSize: 15,
    color: colors.primary,
  },
});
