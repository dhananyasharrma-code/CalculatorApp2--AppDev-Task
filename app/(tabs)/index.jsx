import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [val, setVal] = useState(""); 
  const [sci, setSci] = useState(false);
  useEffect(() => {
    console.log("Calculator value changed:", val);
  }, [val]);

  const press = async (v) => {
    if (v === "=") {
      try {
        const result = await eval(val);
        setVal(result.toString());
      } catch {
        setVal("Err");
      }
    } else if (v === "C") {
      setVal("");
    } else {
      setVal(val + v);
    }
  };

  const pressSci = async (f) => {
  let num = parseFloat(val);
  if (isNaN(num)) return;

  if (f === "√") {
    const result = await Math.sqrt(num);
    setVal(result.toString());
  }
  if (f === "^") {
    const result = await Math.pow(num, 2);
    setVal(result.toString());
  }
  if (f === "log") {
    const result = await Math.log10(num);
    setVal(result.toString());
  }
};


  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center", backgroundColor: "white" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {sci ? "Scientific Calculator" : "Basic Calculator"}
        </Text>
        <TouchableOpacity
          style={{ backgroundColor: "black", padding: 8, borderRadius: 5 }}
          onPress={() => setSci(!sci)}
        >
          <Text style={{ color: "white" }}>{sci ? "Basic" : "Scientific"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 28, marginBottom: 20, textAlign: "right", borderWidth: 1, padding: 10 }}>
        {val}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={btnStyle} onPress={() => press("7")}><Text style={txtStyle}>7</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("8")}><Text style={txtStyle}>8</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("9")}><Text style={txtStyle}>9</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("/")}><Text style={txtStyle}>/</Text></TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={btnStyle} onPress={() => press("4")}><Text style={txtStyle}>4</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("5")}><Text style={txtStyle}>5</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("6")}><Text style={txtStyle}>6</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("*")}><Text style={txtStyle}>*</Text></TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={btnStyle} onPress={() => press("1")}><Text style={txtStyle}>1</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("2")}><Text style={txtStyle}>2</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("3")}><Text style={txtStyle}>3</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("-")}><Text style={txtStyle}>-</Text></TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={btnStyle} onPress={() => press("0")}><Text style={txtStyle}>0</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press(".")}><Text style={txtStyle}>.</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("=")}><Text style={txtStyle}>=</Text></TouchableOpacity>
        <TouchableOpacity style={btnStyle} onPress={() => press("+")}><Text style={txtStyle}>+</Text></TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={btnStyle} onPress={() => press("C")}><Text style={txtStyle}>C</Text></TouchableOpacity>
      </View>

      {sci && (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={[btnStyle, { backgroundColor: "grey" }]} onPress={() => pressSci("√")}><Text style={txtStyle}>√</Text></TouchableOpacity>
          <TouchableOpacity style={[btnStyle, { backgroundColor: "grey" }]} onPress={() => pressSci("^")}><Text style={txtStyle}>^</Text></TouchableOpacity>
          <TouchableOpacity style={[btnStyle, { backgroundColor: "grey" }]} onPress={() => pressSci("log")}><Text style={txtStyle}>log</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const btnStyle = {
  flex: 1,
  margin: 4,
  backgroundColor: "black",
  padding: 15,
  borderRadius: 5,
  alignItems: "center"
};

const txtStyle = {
  color: "white",
  fontSize: 18
};
