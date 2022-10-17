import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";


function MovementScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.images} source={require("../assets/movement.png")} />
      <Text style={{ color: "#FA76A3", fontWeight: 700, fontSize: 30 }}>
        Movement!!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CFFFFE",
    alignItems: "center",
    justifyContent: "center",
  },
  images: {
    width: 170,
    height: 140,
  },
});

export default MovementScreen;
