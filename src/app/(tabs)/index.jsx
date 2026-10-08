import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../../components/Button";
import CallSheet from "../../components/Callsheet";
import Icon from "../../components/Icon";
import { PHONE_DISPLAY } from "../../constants/contact";
import {
    colors,
    fonts,
    radii,
    shadows,
    spacing,
    type,
} from "../../constants/theme";

// ── Content (placeholder values from the design, swap for the real client) ──
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1658632302217-984d432b4d38?w=800&q=70&auto=format&fit=crop";

// "Independence" or "Person-first" (the two headline variants in the design)
const VARIANT = "Independence";

const STATS = [
  ["100%", "Individual care plans"],
  ["5", "Counties served"],
  ["Free", "In-home consult"],
];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [callOpen, setCallOpen] = useState(false);
  const callNow = () => setCallOpen(true);
  return (
    <>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* ───── Top bar ───── */}
      <View style={[styles.topBar, { paddingTop: insets.top + 10 }]}>
        <View style={styles.brand}>
          <LinearGradient
            colors={colors.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoLetter}>N</Text>
          </LinearGradient>
          <Text style={styles.wordmark}>
            Northbrook<Text style={styles.wordmarkAccent}>Care</Text>
          </Text>
        </View>

        <Pressable
          onPress={callNow}
          style={({ pressed }) => [
            styles.callCircle,
            pressed && styles.pressedTint,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Call Northbrook Care"
        >
          <Icon name="phone" size={20} color={colors.primary} />
        </Pressable>
      </View>

      {/* ───── Hero card ───── */}
      <View style={styles.heroShadow}>
        <View style={styles.hero}>
          <View style={styles.heroBody}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>
                Serving Knoxville &amp; East Tennessee
              </Text>
            </View>

            <Text style={styles.headline}>
              {VARIANT === "Independence"
                ? "Independence, kept.\nSupport, wherever it's needed."
                : "Care built around the person, not a package."}
            </Text>

            <Text style={styles.lead}>
              Personalized in-home care for older adults across Knox County.
              Free consultation, no obligation.
            </Text>

            <View style={styles.buttons}>
              <Button
                glow
                title="Request a consultation"
                icon="arr"
                iconPosition="right"
                onPress={() => router.navigate("/contact")}
              />
              <Button
                kind="outline"
                title={PHONE_DISPLAY}
                icon="phone"
                onPress={callNow}
              />
            </View>
          </View>

          <ImageBackground
            source={{ uri: HERO_IMAGE }}
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.imageNote}>
              <Text style={styles.imageNoteBig}>24/7</Text>
              <Text style={styles.imageNoteText}>
                Scheduling that flexes, from a few hours to around the clock.
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>

      {/* ───── Stats ───── */}
      <View style={styles.stats}>
        {STATS.map(([value, label], i) => {
          const dark = i === 2;
          return (
            <View key={value} style={[styles.stat, dark && styles.statDark]}>
              <Text
                style={[
                  styles.statValue,
                  { color: dark ? colors.accent : colors.primary },
                ]}
              >
                {value}
              </Text>
              <Text
                style={[
                  styles.statLabel,
                  {
                    color: dark ? colors.textOnDarkMuted : colors.textSecondary,
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* ───── Services link ───── */}
      <Pressable
        onPress={() => router.navigate("/services")}
        style={({ pressed }) => [
          styles.servicesLink,
          pressed && { opacity: 0.85 },
        ]}
        accessibilityRole="button"
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.servicesTitle}>See all six services</Text>
          <Text style={styles.servicesSub}>Mix and match as needs change</Text>
        </View>
        <View style={styles.servicesArrow}>
          <Icon name="arr" size={18} color={colors.textOnDark} />
        </View>
      </Pressable>
    </ScrollView>

    <CallSheet visible={callOpen} onClose={() => setCallOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: spacing.four },

  // Top bar
  topBar: {
    paddingHorizontal: spacing.inset,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: {
    width: 36,
    height: 36,
    borderRadius: radii.logo,
    alignItems: "center",
    justifyContent: "center",
  },
  logoLetter: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.textOnDark,
  },
  wordmark: {
    fontFamily: fonts.heading,
    fontSize: 20,
    letterSpacing: -0.4,
    color: colors.text,
  },
  wordmarkAccent: { color: colors.primary },
  callCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  pressedTint: { backgroundColor: colors.tint },

  // Hero card (outer view holds the shadow, inner view clips the image)
  heroShadow: {
    marginHorizontal: spacing.gutter,
    borderRadius: radii.hero,
    backgroundColor: colors.surface,
    ...shadows.hero,
  },
  hero: {
    borderRadius: radii.hero,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  heroBody: { paddingTop: 22, paddingHorizontal: 20, paddingBottom: 20 },
  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.tint,
    borderRadius: radii.pill,
    paddingVertical: 6,
    paddingHorizontal: 13,
    marginBottom: 16,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  badgeText: {
    fontFamily: fonts.bodySemi,
    fontSize: 13,
    color: colors.primary,
  },
  headline: { ...type.display, color: colors.text, marginBottom: 12 },
  lead: { ...type.body, color: colors.textSecondary, marginBottom: 20 },
  buttons: { gap: 10 },

  heroImage: { height: 170, justifyContent: "flex-end" },
  imageNote: {
    margin: 12,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  imageNoteBig: {
    fontFamily: fonts.heading,
    fontSize: 22,
    color: colors.primary,
  },
  imageNoteText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  // Stats
  stats: {
    flexDirection: "row",
    gap: 9,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.chip,
    paddingVertical: 13,
    paddingHorizontal: 12,
  },
  statDark: { backgroundColor: colors.ink },
  statValue: {
    fontFamily: fonts.heading,
    fontSize: 23,
    lineHeight: 23,
    marginBottom: 5,
  },
  statLabel: { fontFamily: fonts.body, fontSize: 12.5, lineHeight: 16 },

  // Services link
  servicesLink: {
    marginHorizontal: spacing.gutter,
    marginTop: spacing.gutter,
    backgroundColor: colors.tint,
    borderRadius: radii.card,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  servicesTitle: { ...type.cardTitle, lineHeight: 22, color: colors.text },
  servicesSub: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  servicesArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
