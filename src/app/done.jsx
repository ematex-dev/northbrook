import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button";
import CallSheet from "../components/Callsheet";
import Icon from "../components/Icon";
import { PHONE_DISPLAY } from "../constants/contact";
import {
    colors,
    fonts,
    radii,
    shadows,
    type
} from "../constants/theme";

export default function Done() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [callOpen, setCallOpen] = useState(false);
  const callNow = () => setCallOpen(true);

  return (
    <>
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 24 },
      ]}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* ───── Message ───── */}
      <View style={styles.top}>
        <View style={styles.checkCircle}>
          <Icon name="check" size={44} width={2.6} color={colors.textOnDark} />
        </View>

        <Text style={styles.title}>Thank you, it's through.</Text>
        <Text style={styles.body}>
          A member of the care team will call you back. Need to talk sooner?
          Call us now.
        </Text>

        <View style={styles.next}>
          <Text style={styles.nextText}>
            <Text style={styles.nextBold}>Next:</Text> a free in-home
            consultation at a time that suits you.
          </Text>
        </View>
      </View>

      {/* ───── Actions ───── */}
      <View style={styles.actions}>
        <Button
          glow
          icon="phone"
          title={`Call ${PHONE_DISPLAY}`}
          onPress={callNow}
        />
        <Button
          kind="outline"
          title="Back to home"
          onPress={() => router.navigate("/")}
        />
      </View>
    </ScrollView>

    <CallSheet visible={callOpen} onClose={() => setCallOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 24 },

  top: { flex: 1, alignItems: "center" },

  checkCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
    ...shadows.button,
  },

  title: {
    ...type.display,
    color: colors.text,
    textAlign: "center",
    marginBottom: 12,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 17.5,
    lineHeight: 26,
    color: colors.textSecondary,
    textAlign: "center",
    maxWidth: 300,
  },

  next: {
    marginTop: 26,
    width: "100%",
    backgroundColor: colors.tint,
    borderRadius: radii.chip,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  nextText: {
    fontFamily: fonts.body,
    fontSize: 15.5,
    lineHeight: 23,
    color: colors.primaryDeep,
  },
  nextBold: { fontFamily: fonts.bodyBold },

  actions: { gap: 10, paddingTop: 28 },
});
