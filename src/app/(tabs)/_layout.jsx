import { Tabs } from "expo-router";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../../components/Icon";
import { colors, fonts, radii, shadows, type } from "../../constants/theme";

// Route name -> label + icon (matches the files in src/app/(tabs)/)
const TABS = {
  index: { label: "Home", icon: "home" },
  services: { label: "Services", icon: "grid" },
  area: { label: "Area", icon: "pin" },
  contact: { label: "Contact", icon: "chat" },
};

function TabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const ios = Platform.OS === "ios";

  // Contact screen hides the bar (set via tabBarStyle below)
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarStyle?.display === "none") return null;

  return (
    <View
      style={
        ios
          ? [styles.iosWrap, { paddingBottom: Math.max(insets.bottom, 16) }]
          : [styles.androidWrap, { paddingBottom: insets.bottom + 10 }]
      }
    >
      <View style={ios ? styles.iosPill : styles.androidRow}>
        {state.routes.map((route, index) => {
          const meta = TABS[route.name];
          if (!meta) return null;

          const focused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          // ───── iOS: floating pill, active tab expands ─────
          if (ios) {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                accessibilityRole="tab"
                accessibilityLabel={meta.label}
                accessibilityState={{ selected: focused }}
                style={[
                  styles.iosItem,
                  { flex: focused ? 1.5 : 1 },
                  focused && styles.iosItemActive,
                ]}
              >
                <Icon
                  name={meta.icon}
                  size={22}
                  width={focused ? 2.2 : 1.8}
                  color={focused ? colors.textOnDark : colors.textSecondary}
                />
                {focused && (
                  <Text style={styles.iosLabel} numberOfLines={1}>
                    {meta.label}
                  </Text>
                )}
              </Pressable>
            );
          }

          // ───── Android: Material 3 bar with indicator pill ─────
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              accessibilityRole="tab"
              accessibilityLabel={meta.label}
              accessibilityState={{ selected: focused }}
              style={styles.androidItem}
            >
              <View
                style={[styles.indicator, focused && styles.indicatorActive]}
              >
                <Icon
                  name={meta.icon}
                  size={24}
                  width={focused ? 2.3 : 1.8}
                  color={focused ? colors.primary : colors.textSecondary}
                />
              </View>
              <Text
                style={[
                  styles.androidLabel,
                  focused && styles.androidLabelActive,
                ]}
              >
                {meta.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="services" options={{ title: "Services" }} />
      <Tabs.Screen name="area" options={{ title: "Area" }} />
      <Tabs.Screen
        name="contact"
        options={{ title: "Contact", tabBarStyle: { display: "none" } }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  // ───── iOS ─────
  iosWrap: {
    backgroundColor: colors.background,
    paddingHorizontal: 14,
    paddingTop: 6,
  },
  iosPill: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    padding: 5,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadows.tabBar,
  },
  iosItem: {
    minHeight: 50,
    borderRadius: radii.pill,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  iosItemActive: { backgroundColor: colors.primary },
  iosLabel: { ...type.tabLabel, color: colors.textOnDark },

  // ───── Android ─────
  androidWrap: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  androidRow: { flexDirection: "row" },
  androidItem: { flex: 1, alignItems: "center", gap: 4 },
  indicator: {
    width: 64,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorActive: { backgroundColor: colors.tint },
  androidLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textSecondary,
  },
  androidLabelActive: { fontFamily: fonts.bodyBold, color: colors.text },
});
