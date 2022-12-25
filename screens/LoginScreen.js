import { StyleSheet, View } from "react-native";
import React from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log(authUser)
      if (authUser) {
        navigation.replace("Home");
      }
    })
    return unsubscribe;
  }, [])
  // for persistence. if user still logged in take them to home page
  // no need to go to login page again
  

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => {
      alert(error)
    })
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />

      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Signal-Logo.svg",
        }}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} type="outline" title="Register" />
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      backgroundColor: "white",
  },
  inputContainer: {
      width: 300,
  },
  button: {
      width: 200,
      marginTop: 10,
  }
});

//stopped at 51:11