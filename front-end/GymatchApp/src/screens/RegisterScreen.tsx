import React, { useState } from "react";
import Constants from "expo-constants";

const apiUrl = Constants.expoConfig.extra.API_URL;
// ou
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import mochila from "../assets/mochila.png";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Selecionar foto da galeria
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Enviar cadastro
  const handleRegister = async () => {
    if (!name || !email || !course || !image) {
      return Alert.alert("Preencha todos os campos e selecione uma foto!");
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("course", course);
      formData.append("password", password);

      // Preparar foto
      const filename = image.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;
      formData.append("photo", { uri: image, name: filename, type } as any);

      const response = await axios.post(`${apiUrl}/users`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.ok) {
        Alert.alert("Cadastro realizado com sucesso!");
        navigation.navigate("Onboarding");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao cadastrar!");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={mochila} style={styles.image} />
      <Text style={styles.title}>Cadastre-se no SchoolMatch!</Text>

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
      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={course}
        onChangeText={setCourse}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Picker de foto */}
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.userImage} />
        ) : (
          <Text>➕</Text>
        )}
      </TouchableOpacity>

      <Button title="Cadastrar" onPress={handleRegister} />
      <Button title="Voltar" onPress={() => navigation.navigate("Welcome")} />
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
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain", // mantém proporção da imagem
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
});
