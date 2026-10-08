import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    colors,
    fonts,
    layout,
    radii,
    spacing,
    type,
} from "../constants/theme";
import Icon from "./Icon";

// Back button + title (+ optional subtitle), used at the top of inner screens.
export default function Header({ title, subtitle }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 10 }]}>
      <View style={styles.row}>
        <Pressable
          onPress={() => router.navigate("/")}
          style={({ pressed }) => [styles.back, pressed && styles.backPressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back to home"
        >
          <Icon name="back" size={20} width={2.4} color={colors.text} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.inset,
    paddingBottom: spacing.one,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  back: {
    width: layout.minTouch,
    height: layout.minTouch,
    borderRadius: radii.backButton,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
  },
  backPressed: {
    backgroundColor: colors.tint,
  },
  title: {
    ...type.title, // Outfit Bold, 26px, -0.65 letter-spacing
    color: colors.text,
    flexShrink: 1,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    marginTop: 12,
    marginHorizontal: 2,
  },
});
