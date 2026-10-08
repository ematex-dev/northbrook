import {
    Linking,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PHONE_DISPLAY, PHONE_TEL } from "../constants/contact";
import { colors, fonts, radii } from "../constants/theme";
import Icon from "./Icon";

// iOS: bottom action sheet. Android: centered dialog.
// Props: visible (bool), onClose (fn)
export default function CallSheet({ visible, onClose }) {
  const insets = useSafeAreaInsets();
  const ios = Platform.OS === "ios";

  const call = () => {
    onClose();
    Linking.openURL(PHONE_TEL);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose} // Android back button
    >
      {ios ? (
        // ───── iOS action sheet ─────
        <Pressable
          style={[
            styles.iosOverlay,
            { paddingBottom: Math.max(insets.bottom, 12) + 8 },
          ]}
          onPress={onClose}
        >
          <Pressable style={styles.iosGroup} onPress={() => {}}>
            <Text style={styles.iosTitle}>Northbrook Care</Text>
            <Pressable
              onPress={call}
              style={({ pressed }) => [
                styles.iosRow,
                pressed && styles.iosPressed,
              ]}
              accessibilityRole="button"
            >
              <Text style={styles.iosAction}>Call {PHONE_DISPLAY}</Text>
            </Pressable>
          </Pressable>

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.iosCancel,
              pressed && styles.iosPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.iosCancelText}>Cancel</Text>
          </Pressable>
        </Pressable>
      ) : (
        // ───── Android dialog ─────
        <Pressable style={styles.androidOverlay} onPress={onClose}>
          <Pressable style={styles.dialog} onPress={() => {}}>
            <View style={styles.dialogIcon}>
              <Icon name="phone" size={26} color={colors.primary} />
            </View>
            <Text style={styles.dialogTitle}>Call Northbrook?</Text>
            <Text style={styles.dialogBody}>
              {PHONE_DISPLAY}. You'll reach the care team directly.
            </Text>

            <View style={styles.dialogActions}>
              <Pressable
                onPress={onClose}
                style={styles.dialogCancel}
                accessibilityRole="button"
              >
                <Text style={styles.dialogCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={call}
                style={styles.dialogCall}
                accessibilityRole="button"
              >
                <Text style={styles.dialogCallText}>Call</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  // ───── iOS ─────
  iosOverlay: {
    flex: 1,
    backgroundColor: colors.scrim,
    justifyContent: "flex-end",
    paddingHorizontal: 8,
    gap: 8,
  },
  iosGroup: {
    backgroundColor: "rgba(248,248,250,0.97)",
    borderRadius: 14,
    overflow: "hidden",
    alignItems: "center",
  },
  iosTitle: {
    width: "100%",
    textAlign: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: fonts.body,
    fontSize: 13.5,
    color: colors.textSecondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  iosRow: {
    width: "100%",
    paddingVertical: 17,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  iosAction: { fontFamily: fonts.system, fontSize: 20, color: colors.iosBlue },
  iosCancel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  iosCancelText: {
    fontFamily: fonts.system,
    fontSize: 20,
    fontWeight: "600",
    color: colors.iosBlue,
  },
  iosPressed: { backgroundColor: "rgba(0,0,0,0.06)" },

  // ───── Android ─────
  androidOverlay: {
    flex: 1,
    backgroundColor: colors.scrimAndroid,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  dialog: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.sheet,
    padding: 24,
  },
  dialogIcon: { marginBottom: 12 },
  dialogTitle: {
    fontFamily: fonts.headingSemi,
    fontSize: 24,
    color: colors.text,
    marginBottom: 10,
  },
  dialogBody: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 23,
    color: colors.textSecondary,
    marginBottom: 22,
  },
  dialogActions: { flexDirection: "row", justifyContent: "flex-end", gap: 8 },
  dialogCancel: { paddingVertical: 10, paddingHorizontal: 16 },
  dialogCancelText: {
    fontFamily: fonts.headingSemi,
    fontSize: 15.5,
    color: colors.primary,
  },
  dialogCall: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: radii.pill,
    backgroundColor: colors.primary,
  },
  dialogCallText: {
    fontFamily: fonts.headingSemi,
    fontSize: 15.5,
    color: colors.textOnDark,
  },
});
