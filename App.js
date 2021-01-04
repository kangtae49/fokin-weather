import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import axios from "axios";
import API_KEY from "./api_key";

//https://openweathermap.org/
export default function App() {
  const [isLoading, setLoading] = useState(true);

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    console.log(data);
  };

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      await getWeather(latitude, longitude);
      console.log(latitude, longitude);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Can't find you.", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return !isLoading ? <Loading /> : null;
}
