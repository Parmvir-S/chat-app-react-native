import { Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Avatar } from 'react-native-elements';
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

function ProfileScreen({ navigation, route }) {
  let { email, photo, name } = route.params;

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
                        uri: photo
                    }}
                />
                <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
                    {name}
                </Text>
            </View>
        ),
        headerLeft: () => (
            <TouchableOpacity 
                style={{ marginLeft: 10}}
                onPress={navigation.goBack}
            >
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <View 
                style= {{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20
                }}
            >
                <TouchableOpacity>
                    <FontAwesome name="video-camera" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="call" size={24} color="white" />
                </TouchableOpacity>
            </View>
        )
    })
}, [navigation])


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
      <img src={photo}
        style={{ width: 300, height: 300 }}
      />
      <div>{name}</div> <br/>
      <div>{email}</div>
    </div>
  );
}

export default ProfileScreen;
