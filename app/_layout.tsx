// app/(tabs)/_layout.tsx
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Calculator Tab */}
      <Tabs.Screen
        name="index" // this points to app/(tabs)/index.jsx
        options={{
          title: "Calculator",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" size={size} color={color} />
          ),
        }}
      />

      {/* Currency Converter Tab */}
      <Tabs.Screen
        name="currency" // this points to app/(tabs)/currency.jsx
        options={{
          title: "Currency Converter",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}