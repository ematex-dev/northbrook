import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts, layout, radii } from "../constants/theme";

// Labeled text input. Pass `multiline` for the message box, `error` to show a message.
// Any other TextInput prop (value, onChangeText, keyboardType, placeholder...) passes through.
export default function Field({ label, error, multiline, ...props }) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        multiline={multiline}
        placeholderTextColor={colors.textFaint}
        textAlignVertical={multiline ? "top" : "center"}
        style={[
          styles.input,
          multiline && styles.multi,
          !!error && styles.inputError,
        ]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: fonts.bodySemi, fontSize: 14, color: colors.textLabel },
  input: {
    marginTop: 6,
    minHeight: layout.inputHeight,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radii.input,
    padding: 14,
    fontFamily: fonts.body,
    fontSize: 16.5,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multi: { minHeight: 110 },
  inputError: { borderColor: colors.error },
  error: {
    marginTop: 5,
    fontFamily: fonts.bodyMedium,
    fontSize: 13.5,
    color: colors.error,
  },
});
