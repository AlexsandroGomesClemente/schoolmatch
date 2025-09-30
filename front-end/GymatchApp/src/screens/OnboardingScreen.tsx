import React, { useState } from "react";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiUrl = Constants.expoConfig.extra.API_URL;
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import axios from "axios";
import mochila from "../assets/mochila.png";

export default function OnboardingScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/users/login`, {
        email,
        password,
      });
      if (response.data.ok) {
        Alert.alert("Login realizado!");
        await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao Logar!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={mochila} style={styles.image} />
      <Text style={styles.title}>Entrar no SchoolMatch!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Logar" onPress={handleLogin} />
      <Button title="Voltar" onPress={() => navigation.navigate("Welcome")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain", // mantém proporção da imagem
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
