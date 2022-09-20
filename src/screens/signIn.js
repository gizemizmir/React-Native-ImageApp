import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { signIn } from "../store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { navigate } = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    setIsError(false);
    setErrorMessage("");
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        storeData({
          email: response.user.email,
          password: password,
        });
        // Get user AsyncStorage to save in Global State
        getData();
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setIsError(true);
            setErrorMessage("User not found!");
            break;
          case "auth/invalid-email":
            setIsError(true);
            setErrorMessage("Invalid email");
            break;
          case "auth/wrong-password":
            setIsError(true);
            setErrorMessage("Wrong Password");
            break;
        }
      });
  };

  const storeData = async (data) => {
    // Save user AsyncStorage
    await AsyncStorage.setItem("user", JSON.stringify(data));
  };

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    if (jsonValue != null) {
      // Incoming data is saved to Global State
      dispatch(signIn(JSON.parse(jsonValue)));
    }
  };

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.formArea}>
        <Text style={styles.pageLabel}>Sign In</Text>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          label="email"
          autoCapitalize={false}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          label="password"
          autoCapitalize={false}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        {isError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
        <Text style={styles.signupLabel}>Don't have an account?</Text>
        <Pressable
          style={styles.buttonSignUp}
          onPress={() => {
            navigate("SignUp");
          }}
        >
          <Text style={styles.buttonSignUpText}>Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  formArea: {
    width: "90%",
    height: "90%",
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#686868",
    marginBottom: 20,
    padding: 10,
    borderRadius: 4,
  },
  inputLabel: {
    display: "flex",
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  pageLabel: {
    display: "flex",
    alignSelf: "center",
    marginBottom: 45,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  buttonSignUp: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonSignUpText: {
    color: "#2196F3",
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
  signupLabel: {
    display: "flex",
    alignSelf: "center",
    marginBottom: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff3333",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 25,
  },
});

export default SignIn;
