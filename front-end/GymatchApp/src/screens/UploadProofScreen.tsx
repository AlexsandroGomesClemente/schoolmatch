import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function UploadProofScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Selecione uma imagem primeiro!");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      name: "proof.jpg",
      type: "image/jpeg",
    } as any);

    try {
      const response = await axios.post("http://localhost:3333/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(response.data.status); // backend deve retornar { status: "aprovado" | "reprovado" }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro ao enviar comprovante!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Envie seu comprovante de matrícula</Text>
      <Button title="Escolher imagem" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Enviar" onPress={uploadImage} />
      {status ? <Text style={styles.status}>Status: {status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  image: { width: 250, height: 250, marginVertical: 20, borderRadius: 10 },
  status: { fontSize: 18, marginTop: 20, fontWeight: "bold" },
});
