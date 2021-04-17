import React, { useState, useEffect, useRef, useContext } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import CurrentLocationButton from "./CurrentLocationButton";
import { Rating, Button, Overlay } from "react-native-elements";
import MakeItRain from "react-native-make-it-rain";
import UserContext from "./context/userContext";
import { SpotRequestContext } from "../App";

export default function BorrowMap({ navigation }) {
  const requestContext = useContext(SpotRequestContext);

  console.log(requestContext.requestState);

  const lenders = [
    {
      // id: 0,
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
  const value = useContext(UserContext);

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
  // console.log(location);

  const mapView = React.createRef();

  const demoRequest = (event) => {
    event.preventDefault();
    Alert.alert(
      "Request",
      "Ask this lender to spot you?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            toggleOverlay();
            setTimeout(
              () => {
                setVisible(false), setApproved(true);
              },

              5000
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [approved, setApproved] = useState(false);
  const toggleApproved = () => {
    setApproved(!approved);
  };

  const finished = () => {
    toggleApproved();
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <Overlay
        style={{ height: "auto", width: "100%", flex: 1 }}
        isVisible={visible}
      >
        <Text style={{ width: "100%" }}>Lender is making a decision...</Text>
        <Button loading type="clear" />
      </Overlay>
      <Overlay
        style={{ backgroundColor: "#fff", flex: 0.8 }}
        isVisible={approved}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MakeItRain
            numItems={80}
            itemDimensions={{ width: 40, height: 20 }}
            itemComponent={<Text>🤍</Text>}
            itemTintStrength={0.8}
            continuous={false}
          />
          <Text style={{ fontSize: 30, marginBottom: 20 }}>
            Congratulations! You have been{" "}
            <Text style={{ color: "#28a745" }}>approved</Text> by the lender!
          </Text>

          <Button
            title="Dashboard"
            containerStyle={{ marginBottom: 20 }}
            buttonStyle={{ borderRadius: 5 }}
            onPress={finished}
          />
          <Text>Funds will be deposited in 1-2 business days.</Text>

          {/* <ConfettiCannon
            fadeOut
            autoStart
            count={200}
            origin={{ x: -10, y: 0 }}
          /> */}
        </View>
      </Overlay>
      <View style={{ backgroundColor: "#ffff", padding: 10 }}>
        <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold" }}>
          We are looking for lenders to spot you $
          {requestContext.requestState.amount} for{" "}
          {requestContext.requestState.category}...
        </Text>
      </View>
      <CurrentLocationButton cb={centerMap} />
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsCompass
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
            <View key={index} style={{ alignItems: "center" }}>
              <Marker
                coordinate={lender.coordinates}
                title={lender.firstName}
                style={{ alignItems: "center" }}
                onPress={demoRequest}
              >
                <Image
                  source={require("../assets/moneybag.jpg")}
                  style={{ width: 50, height: 45, borderRadius: 20 }}
                />
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
