import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import Loading from "./Loading";
import axios from "axios";
import API_KEY from "./api_key";
import Weather from "./Weather";

//https://openweathermap.org/

// api.openweathermap.org/data/2.5/find?q=London&units=metric

export default function App() {
  const [{ isLoading, temp }, setState] = useState({
    isLoading: true,
    temp: null,
  });

  const getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    );
    console.log(data);

    setState({
      isLoading: false,
      temp: data.main.temp,
    });
  };

  const getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      await getWeather(latitude, longitude);
      console.log(latitude, longitude);
      // setState({ isLoading: false, temp });
      // setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Can't find you.", "So sad");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
}
