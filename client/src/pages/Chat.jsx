import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import './Chat.css'
import { UserContext } from '../context/UserContext';
import Conversation from '../components/Conversation/Conversation';
import NavIcons from '../components/NavIcons/NavIcons';
import ChatBox from '../components/ChatBox/ChatBox';
import {format} from "timeago.js"
import {io} from "socket.io-client"





const Chat = () => {
    const [chats, setChats] = useState([])
    const { user, setUser } = useContext(UserContext)
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [recieveMessage, setRecieveMessage] = useState(null)
    const socket = useRef()

    useEffect(() => {
      if(sendMessage!=null){
        socket.current.emit("send-message", sendMessage)
      }
    },[sendMessage])


    useEffect(() => {
      socket.current = io("http://localhost:8800")
      console.log("socket", user._id )
      socket.current.emit("new-user-add", user._id)
      socket.current.on("get-users", (users) => {
        console.log("users",user._id,users)
        setOnlineUsers(users)
        console.log("online user",onlineUsers)
      })
    },[user])

    useEffect(() => {
      console.log("data from socket")
      socket.current.on("recieve-message", (data) => {
        console.log("data from socket",data)
        setRecieveMessage(data)
        console.log("data from socket", data)
      })
    })

    useEffect(()=>{
      const fetchData = async () => {
        try{
          const response = await axios.get(`http://localhost:8000/chat/${user._id}`, { withCredentials: true });
          setChats(response.data)
          console.log("chats",chats)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData(chats)
      console.log("user",user)
    },[user])

    const checkOnlineStatus = (chat) => {
      const chatMember = chat.members.find((member) => member!=user._id)
      const online = onlineUsers.find((user) => user.userId==chatMember)
      return online? true:false
    }

  return (
    <div className='Chat'>


      <div className="Left-side-chat">
        <div className='Chat-container'>
        <h2>Chats</h2>
        <div className='Chat-list'>
            {chats.map((chat) => (
                <div onClick={()=>setCurrentChat(chat)}>
                    <Conversation data={chat} currentUser = {user._id} online={checkOnlineStatus(chat)}/>
                </div>
            ))}
        </div>
        </div>
      </div>


      <div className="Right-side-chat">
      <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        
        </div>
        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
      </div>

    </div>
  )
}

export default Chat
