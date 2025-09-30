import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.API_URL;
import axios from "axios";

interface Match {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`${apiUrl}/matches`);
      setMatches(response.data.matches); // Assumindo que backend retorna { matches: [...] }
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Match }) => (
    <View style={styles.card}>
      {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.email}</Text>
      </View>
    </View>
  );

  if (matches.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Nenhum match ainda 😢</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center" },
  card: { flexDirection: "row", alignItems: "center", padding: 15, marginBottom: 10, borderRadius: 10, backgroundColor: "#fff", elevation: 2, width: "100%" },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
});
