import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import mochila from "../assets/mochila.png";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Image source={mochila} style={styles.image} />

      <Text style={styles.title}>Bem-vindo ao SchoolMatch!</Text>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={() => navigation.navigate("Onboarding")} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Cadastrar"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain", // mantém proporção da imagem
  },
  title: { fontSize: 24, marginBottom: 40, textAlign: "center" },
  buttonContainer: { width: "100%", marginBottom: 20 },
});
