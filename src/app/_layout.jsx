import {
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
} from "@expo-google-fonts/ibm-plex-sans";
import {
    Outfit_600SemiBold,
    Outfit_700Bold,
    useFonts,
} from "@expo-google-fonts/outfit";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native"; // NEW
import { colors } from "../constants/theme"; // NEW

export default function RootLayout() {
  const [loaded] = useFonts({
    Outfit_600SemiBold,
    Outfit_700Bold,
    IBMPlexSans_400Regular,
    IBMPlexSans_500Medium,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
  });

  if (!loaded) return null;

  return (
    // NEW: light background wrapper, so nothing black sits behind the status bar
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }, // NEW
        }}
      />
    </View>
  );
}
