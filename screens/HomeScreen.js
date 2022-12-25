import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import CustomListItem from '../components/CustomListItem'
import { Avatar } from 'react-native-elements'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { db } from '../firebase'
import { onSnapshot, collection } from 'firebase/firestore'


const HomeScreen = ({ navigation }) => {

  const [chats, setChats] = useState([]);
  const chatsCollectionRef = collection(db, "chats");

    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        })
    }

    useEffect(() => {
      const unsubsribe = onSnapshot(collection(db, "chats"), (snapshot) => {
        setChats(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        })))
      })
      return unsubsribe;
    }, [])

    useLayoutEffect(() => {
      navigation.setOptions({
        title: "Signal",
        headerStyle: { backgroundColor: "white"},
        headerTitleStyle: { color: "black"},
        headerTintcolor: "black",
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>
                <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </TouchableOpacity>
            </View>
        ),
        headerRight: () => (
            <View style={{ 
                flexDirection: "row",
                justifyContent: "space-between",
                width: 80,
                marginRight: 20,
             }}>
                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign name="camerao" size={24} color="black"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                    <SimpleLineIcons name="pencil" size={24} color="black"/>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}>
                    <AntDesign onPress={() => {
                      navigation.replace("Settings", {name: auth.currentUser.displayName, img: auth.currentUser.photoURL});
                    }} name="setting" size={24} color="black"/>
                </TouchableOpacity>
            </View>
        )
      })
    }, [navigation])

    const enterChat = (id, chatName) => {
      navigation.navigate("Chat", {
        id: id,
        chatName: chatName
      })
    }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => {
          return (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/> 
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
})