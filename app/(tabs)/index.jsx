import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CalculatorScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handlePress = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      try {
        
        const evalResult = eval(input);
        setResult(evalResult.toString());
      } catch {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
    ["C"]
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      <View style={styles.display}>
        <Text style={styles.input}>{input}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>

      {buttons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((btn) => (
            <TouchableOpacity
              key={btn}
              style={styles.button}
              onPress={() => handlePress(btn)}
            >
              <Text style={styles.buttonText}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  display: { padding: 10, borderWidth: 1, borderRadius: 6, marginBottom: 20 },
  input: { fontSize: 20, textAlign: "right" },
  result: { fontSize: 24, fontWeight: "bold", textAlign: "right", marginTop: 5 },
  row: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  button: { padding: 20, backgroundColor: "#ddd", borderRadius: 6, minWidth: 60, alignItems: "center" },
  buttonText: { fontSize: 18, fontWeight: "600" },
});