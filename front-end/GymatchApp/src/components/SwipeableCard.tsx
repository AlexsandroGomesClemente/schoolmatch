import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface SwipeableCardProps {
  user: User;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
}

export default function SwipeableCard({
  user,
  onSwipeRight,
  onSwipeLeft,
}: SwipeableCardProps) {
  const position = useRef(new Animated.ValueXY()).current;

  const forceSwipe = (direction: "right" | "left") => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: "right" | "left") => {
    direction === "right" ? onSwipeRight() : onSwipeLeft();
    position.setValue({ x: 0, y: 0 });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const cardStyle = {
    ...position.getLayout(),
    transform: [{ rotate }],
  };

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.card, cardStyle]}
    >
      {user.avatar && (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 40,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },


    alignSelf: "center",
    top: 0, 
  },
  avatar: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { fontSize: 16, color: "#666" },
});
