import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button, Input } from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'
import { addDoc, collection } from "firebase/firestore";


const AddChatScreen = ({ navigation }) => {

    const [input, setInput] = useState("");
    const chatsCollectionRef = collection(db, "chats");


    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add A New Chat",
            headerBackTitle: "Chats"
        })
    })

    const createChat = async () => {
        await addDoc(chatsCollectionRef, {
            chatName: input 
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error))
    }

  return (
    <View style={styles.container}>
      <Input
        placeholder='Enter A Chat Name'
        value={input}
        onChangeText={(text) => setInput(text)}
        leftIcon={
            <Icon name="wechat" type="antdesign" size={24} color="black"/>
        }
        onSubmitEditing={createChat}
      />
      <Button disabled={!input} onPress={createChat} title="Create New Chat"/>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30, 
        height: "100%"
    }
})

