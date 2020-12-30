import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import * as Location from "expo-location";
import CurrentLocationButton from "./CurrentLocationButton";
import { Rating, Button } from "react-native-elements";

export default function BorrowMap({ navigation }) {
  const lenders = [
    {
      id: 0,
      firstName: "Yves",
      rating: 5,
      coordinates: {
        latitude: 35.827862,
        longitude: -86.4087499,
      },
    },
    {
      id: 1,
      firstName: "Sashi",
      rating: 4,
      coordinates: {
        latitude: 35.8553034,
        longitude: -86.427186,
      },
    },
    {
      id: 2,
      firstName: "Keenan",
      rating: 3,
      coordinates: {
        latitude: 35.7929171,
        longitude: -86.784789,
      },
    },
    {
      id: 3,
      firstName: "Sharon",
      rating: 2,
      coordinates: {
        latitude: 35.770599,
        longitude: -86.823697,
      },
    },
  ];

  const [location, setLocation] = useState({
    coords: {
      latitude: 36.15596,
      longitude: -86.781663,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const centerMap = () => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = location;
    mapView.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };
  console.log(location);
  const mapView = React.createRef();
  return (
    <View style={styles.container}>
      <CurrentLocationButton cb={centerMap} />
      {location ? (
        <MapView
          style={styles.map}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={false}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={mapView}
        >
          {lenders.map((lender, index) => (
            <View>
              <Marker
                key={index}
                coordinate={lender.coordinates}
                title={lender.firstName}
              >
                {/* <Callout>
                <View>
                  <Text>{lender.firstName}</Text>
                  <Text>
                    <Rating imageSize={12} startingValue={lender.rating} />{" "}
                  </Text>
                  <Button title="Connect" type="outline" />
                </View>
              </Callout> */}

                <Image
                  source={require("../assets/moneybag.jpg")}
                  style={{ width: 50, height: 45, borderRadius: 20 }}
                />
                <Text>
                  <Rating imageSize={12} startingValue={lender.rating} />{" "}
                </Text>
              </Marker>
            </View>
          ))}
        </MapView>
      ) : (
        <Text style={{ flex: 1, fontSize: 24 }}>Loading..</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  map: {
    flex: 1,
    height: "100%",
  },
});
