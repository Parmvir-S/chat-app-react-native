import { StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from "react-native-elements";
import { db } from '../firebase';
import {  collection, orderBy, query, onSnapshot } from 'firebase/firestore'

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp", "asc"));
    const unsubsribe = onSnapshot(q, (snapshot) => {
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
    })

    return unsubsribe;
  }, [])

  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
        <Avatar
          rounded
          source={{
            uri: chatMessages?.[chatMessages.length-1]?.photoURL || "https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png"
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages?.[chatMessages.length - 1]?.displayName}: {chatMessages?.[chatMessages.length - 1]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})