import { Pressable, StyleSheet, Text } from "react-native";
import { colors, layout, radii, shadows, type } from "../constants/theme";
import Icon from "./Icon";

// Reusable pill button.
// Props: title, onPress, icon (optional), iconPosition ('left' | 'right'),
//        kind ('filled' | 'outline'), glow (adds the indigo shadow on main CTAs)
export default function Button({
  title,
  onPress,
  icon,
  iconPosition = "left",
  kind = "filled",
  glow = false,
}) {
  const color = kind === "filled" ? colors.textOnDark : colors.text;
  const iconEl = icon ? <Icon name={icon} size={18} color={color} /> : null;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.button,
        styles[kind],
        glow && kind === "filled" && shadows.button,
        pressed &&
          (kind === "filled" ? styles.filledPressed : styles.outlinePressed),
      ]}
    >
      {iconPosition === "left" && iconEl}
      <Text style={[styles.text, { color }]}>{title}</Text>
      {iconPosition === "right" && iconEl}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    minHeight: layout.buttonHeight,
    borderRadius: radii.button,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  filled: { backgroundColor: colors.primary },
  filledPressed: { backgroundColor: colors.primaryDark },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineButton,
  },
  outlinePressed: { backgroundColor: colors.tint },
  text: { ...type.button },
});
