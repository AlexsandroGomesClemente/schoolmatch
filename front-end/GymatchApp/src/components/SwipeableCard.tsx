import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, PanResponder, Animated } from "react-native";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Props {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function SwipeableCard({ user, onSwipeLeft, onSwipeRight }: Props) {
  const position = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          Animated.timing(position, { toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy }, useNativeDriver: false, duration: 200 }).start(() => onSwipeRight());
        } else if (gesture.dx < -120) {
          Animated.timing(position, { toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy }, useNativeDriver: false, duration: 200 }).start(() => onSwipeLeft());
        } else {
          Animated.spring(position, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[position.getLayout(), styles.card]}
    >
      {user.avatar && <Image source={{ uri: user.avatar }} style={styles.avatar} />}
      <Text style={styles.name}>{user.name}</Text>
      <Text>{user.email}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 40,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
  },
  avatar: { width: 150, height: 150, borderRadius: 75, marginBottom: 10 },
  name: { fontSize: 22, fontWeight: "bold" },
});
