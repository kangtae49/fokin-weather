import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Haze: {
    iconName: "weather-hail", // weather-lightning-rainy
    gradient: ["#4DA0B0", "#D39D38"],
  },
  Clear: {
    iconName: "weather-lightning-rainy", // weather-lightning-rainy
    gradient: ["#4DA0B0", "#D39D38"],
  },
};

export default function Weather({ temp, condition }) {
  console.log(condition);
  return (
    <LinearGradient
      // Button Linear Gradient
      colors={weatherOptions[condition].gradient}
      style={style.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={style.halfContainer}>
        <MaterialCommunityIcons
          size={96}
          name={weatherOptions[condition].iconName}
          color="white"
        />
        <Text style={style.temp}>{temp}</Text>
      </View>
      <View style={style.halfContainer}></View>
    </LinearGradient>
  );
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Dust",
  ]).isRequired,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    fontSize: 42,
    color: "white",
  },
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
