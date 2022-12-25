import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import {Platform} from 'react-native';
import { addDoc, serverTimestamp, collection, orderBy, query, onSnapshot } from 'firebase/firestore'
import { db, auth } from '../firebase'
import { Input, Button } from 'react-native-elements'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'


function SettingsScreen({navigation, route}) {
    let {name, img} = route.params;
    const [imageUrl, setImageUrl] = useState("");

    const updatePhoto = () => {
        updateProfile(auth.currentUser, {
            "photoURL": imageUrl || "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png"
          }).catch(error => alert(error.message));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Chat",
            headerBackTitleVisible: false,
            headerTitleAlign: "Left",
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar
                        rounded 
                        source={{
                            uri: img
                        }}
                    />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                        {name.toUpperCase()}
                    </Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity 
                    style={{ marginLeft: 10}}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
        })
    })
  return (
     <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign: "center",
        fontSize: "1.2em"
      }}
    >
      <img src={img}
        style={{ width: 300, height: 300 }}
      />
      <div>{name}</div>
      <Input
          placeholder='New Profile Picture URL'
          autoFocus
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
        />
        <Button
            onPress={() => {
                updatePhoto();
            }}
            style = {{
                marginLeft: "auto",
                marginRight: "auto"
              }}
              title="Change Profile Photo"
        />
    </div>
  )
}

export default SettingsScreen