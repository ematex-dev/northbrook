import { useRouter } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Field from "../../components/Field";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import { colors, fonts, layout, radii, spacing } from "../../constants/theme";
import Button from "../../components/Button";

const TOPICS = [
  "Care for a parent",
  "Care for my spouse",
  "Care for myself",
  "Respite for a family caregiver",
  "Something else",
];

export default function Contact() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false); // dropdown
  const [tried, setTried] = useState(false);

  const phoneOk = phone.replace(/\D/g, "").length >= 10;

  const send = () => {
    if (name.trim() && phoneOk) {
      // TODO: send { name, phone, topic, message } to your backend here
      router.navigate("/done");
    } else {
      setTried(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces
        alwaysBounceVertical
        overScrollMode="always"
      >
        <Header
          title="Get in touch"
          subtitle="Send this and the care team will call you back."
        />

        <View style={styles.form}>
          <Field
            label="Full name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={tried && !name.trim() ? "Please add a name." : null}
          />

          <Field
            label="Phone number"
            placeholder="(865) 555-0100"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            error={tried && !phoneOk ? "Enter a 10-digit number." : null}
          />

          {/* ───── Dropdown ───── */}
          <View>
            <Text style={styles.label}>I'm reaching out about</Text>
            <Pressable
              onPress={() => setOpen((o) => !o)}
              style={styles.select}
              accessibilityRole="button"
              accessibilityLabel={`Reason: ${topic}`}
            >
              <Text style={styles.selectText}>{topic}</Text>
              <View
                style={{ transform: [{ rotate: open ? "90deg" : "-90deg" }] }}
              >
                <Icon
                  name="back"
                  size={18}
                  width={2.2}
                  color={colors.textSecondary}
                />
              </View>
            </Pressable>

            {open && (
              <View style={styles.options}>
                {TOPICS.map((t, i) => {
                  const selected = t === topic;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => {
                        setTopic(t);
                        setOpen(false);
                      }}
                      style={({ pressed }) => [
                        styles.option,
                        i > 0 && styles.optionDivider,
                        pressed && { backgroundColor: colors.tint },
                      ]}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selected && styles.optionTextOn,
                        ]}
                      >
                        {t}
                      </Text>
                      {selected && (
                        <Icon
                          name="check"
                          size={18}
                          width={2.4}
                          color={colors.primary}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            )}
          </View>

          <Field
            multiline
            label="Message"
            placeholder="A little about the situation and timing..."
            value={message}
            onChangeText={setMessage}
          />
        </View>

        <View style={styles.footer}>
          <Button glow title="Send a message" onPress={send} />
          <Text style={styles.note}>
            We reply during business hours. Details are never shared.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingBottom: 32 },

  form: { paddingHorizontal: spacing.inset, paddingTop: 16, gap: 14 },

  label: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.textLabel },
  select: {
    marginTop: 6,
    minHeight: layout.inputHeight,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radii.input,
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  selectText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 16.5,
    color: colors.text,
  },

  options: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radii.input,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  option: {
    minHeight: 50,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionDivider: { borderTopWidth: 1, borderTopColor: colors.line },
  optionText: { fontFamily: fonts.body, fontSize: 16, color: colors.text },
  optionTextOn: { fontFamily: fonts.bodySemi, color: colors.primary },

  footer: { paddingHorizontal: spacing.inset, paddingTop: 20 },
  note: {
    fontFamily: fonts.body,
    fontSize: 13.5,
    color: colors.textFaint,
    textAlign: "center",
    marginTop: 12,
  },
});
