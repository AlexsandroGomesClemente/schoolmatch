import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

export default function OnboardingScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3333/users", {
        name,
        email,
      });
      if (response.data.ok) {
        Alert.alert("Cadastro realizado!");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao cadastrar!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Gymatch!</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
