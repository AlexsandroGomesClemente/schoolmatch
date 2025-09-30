import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import MatchesScreen from "../screens/MatchesScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Matches: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Matches" component={MatchesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
