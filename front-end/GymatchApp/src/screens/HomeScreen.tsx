import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from "react-native";
import axios from "axios";
import SwipeableCard from "../components/SwipeableCard";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3333/users");
      setUsers(response.data.users); // Assumindo que o backend retorna { users: [...] }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwipe = async (liked: boolean) => {
    const user = users[currentIndex];
    try {
      await axios.post("http://localhost:3333/likes", {
        userId: user.id,
        liked,
      });
    } catch (error) {
      console.error(error);
    }

    setCurrentIndex(currentIndex + 1);
  };

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  if (currentIndex >= users.length) {
    return (
      <View style={styles.container}>
        <Text>Não há mais usuários disponíveis</Text>
      </View>
    );
  }

  const user = users[currentIndex];

  return (
    <View style={styles.container}>
      <SwipeableCard
        user={user}
        onSwipeLeft={() => handleSwipe(false)}
        onSwipeRight={() => handleSwipe(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
