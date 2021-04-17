import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Button, Icon, Text } from "react-native-elements";
import ConfettiCannon from "react-native-confetti-cannon";

function Merchant({ merchant, imageUrl, value }) {
  const [purchased, setPurchased] = useState(false);

  return (
    <View style={styles.container}>
      <Card title="HELLO WORLD">
        <Image source={imageUrl} style={styles.image} />
        <Text style={{ marginBottom: 10 }}>
          {merchant + " giftcard with a " + "$" + value + " value."}
        </Text>
        <Button
          icon={
            purchased ? (
              <Icon name="check" color="#FFF" />
            ) : (
              <Icon name="attach-money" color="#ffffff" />
            )
          }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: purchased ? "#28a745" : "#1d72d4",
          }}
          title={purchased ? "Enjoy" : "REEDEM"}
          onPress={() => setPurchased(true)}
        />
        {purchased && (
          <ConfettiCannon
            explosionSpeed={500}
            count={200}
            origin={{ x: 0, y: 0 }}
            fadeOut
          />
        )}
      </Card>
    </View>
  );
}

export default Merchant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
  },
});
