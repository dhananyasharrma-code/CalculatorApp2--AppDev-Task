import { Picker } from "@react-native-picker/picker";
import { router, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const CURRENCIES = ["USD","INR","EUR","GBP","JPY","AUD","CAD","SGD","CHF","CNY","AED","SAR","ZAR","NZD","HKD"];

export default function CurrencyConverterScreen() {
  const navigation = useNavigation();

  // put a header button to go back to Calculator
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Currency Converter",
      headerRight: () => <Button title="Calculator" onPress={() => router.push("/(tabs)/")} />,
    });
  }, [navigation]);

  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  // Free API (no key). Base = USD.
  const API_URL = "https://open.er-api.com/v6/latest/USD";

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();

      if (data.result !== "success" || !data.rates) {
        throw new Error("Bad API response");
      }
      setRates(data.rates);                         // object of currency -> rate vs USD
      setLastUpdated(data.time_last_update_utc || "");
    } catch (e) {
      Alert.alert("Network Error", "Could not fetch exchange rates. Try Refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // Convert whenever inputs change and rates are ready
  useEffect(() => {
    if (!rates) return;
    const a = parseFloat(amount || "0");
    if (Number.isNaN(a)) {
      setResult(null);
      return;
    }
    // convert amount FROM -> TO using USD as base:
    // value_in_TO = (amount / rate_FROM) * rate_TO
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    if (fromRate && toRate) {
      const converted = (a / fromRate) * toRate;
      setResult(converted.toFixed(4));
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Fetching exchange rates…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>From</Text>
      <Picker selectedValue={fromCurrency} onValueChange={setFromCurrency} style={styles.picker}>
        {CURRENCIES.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <Text style={styles.label}>To</Text>
      <Picker selectedValue={toCurrency} onValueChange={setToCurrency} style={styles.picker}>
        {CURRENCIES.map(c => <Picker.Item key={c} label={c} value={c} />)}
      </Picker>

      <Button title="Refresh Rates" onPress={fetchRates} />

      <Text style={styles.result}>
        {amount || 0} ${fromCurrency} = ${result} ${toCurrency}
      </Text>

      {!!lastUpdated && (
        <Text style={styles.updated}>Last updated: {lastUpdated}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  label: { marginTop: 10, marginBottom: 6, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "gray", padding: 10, borderRadius: 6 },
  picker: { marginBottom: 8 },
  result: { marginTop: 18, fontSize: 18, fontWeight: "bold", textAlign: "center" },
  updated: { marginTop: 6, textAlign: "center", fontSize: 12, opacity: 0.7 },
});