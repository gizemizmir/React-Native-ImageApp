import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setAgainPassword] = useState("");
  const { navigate } = useNavigation();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = () => {
    setIsError(false);
    setErrorMessage("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        navigate("SignIn");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setIsError(true);
            setErrorMessage("Email already in use !");
            break;
          case "auth/invalid-email":
            setIsError(true);
            setErrorMessage("Invalid email");
            break;
          case "auth/weak-password":
            setIsError(true);
            setErrorMessage("Password should be at least 6 characters");
            break;
        }
      });
  };

  return (
    <SafeAreaView style={styles.form}>
      <View style={styles.formArea}>
        <Text style={styles.pageLabel}>Sign Up</Text>
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
        <Text style={styles.inputLabel}>Password Again</Text>
        <TextInput
          style={styles.input}
          label="passwordAgain"
          autoCapitalize={false}
          value={againPassword}
          onChangeText={(text) => {
            setAgainPassword(text);
          }}
        />
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        {isError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
          <Text style={styles.errorText}> </Text>
        )}
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
  pageLabel: {
    display: "flex",
    alignSelf: "center",
    marginBottom: 45,
    fontSize: 30,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ff3333",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default SignUp;
