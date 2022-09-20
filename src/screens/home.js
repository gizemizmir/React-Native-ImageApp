import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';

const Home = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.uri);
    }
  }

  return (
    <View
      style={[styles.homeContainer, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.pageTitle, { color: theme.color }]}>
        Share Photo
      </Text>
      <Pressable style={styles.homeButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Select from library</Text>
      </Pressable>
      <Pressable style={styles.homeButton} onPress={openCamera}>
        <Text style={styles.buttonText}>Open camera</Text>
      </Pressable>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#FFF",
    height: "100%",
    paddingHorizontal: 30,
  },
  pageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 120,
    marginTop: 50,
  },
  homeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default Home;
