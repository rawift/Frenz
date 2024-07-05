import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import {io} from "socket.io-client"
import { ChatMatch } from "../components/ChatMatch/ChatMatch"
import { Convo } from '../components/Convo/Convo';


const ChatList = () => {

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
        console.log("user",user)
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
  <>
  {!currentChat? (
      <div className="bg-black text-white h-screen">


      <nav class="bg-black pt-2 border-gray-200">
        <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FrenZ</span>
        </a>
        <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="/profile">
            <img class="w-10 h-10 rounded-full" src={user.image} alt="profile-pic" />
            </a>
        </div>
        </div>
      </nav>
      
      
        <h1 className="text-3xl font-bold m-4">Messages</h1>
      
        <ul>
        {chats.map((chat) => (
                      <div onClick={()=>setCurrentChat(chat)}>
                          <ChatMatch data={chat} currentUser = {user._id} online={checkOnlineStatus(chat)}/>
                      </div>
                  ))}
          
        </ul>
      </div>
  ):(
<>
<Convo chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} currentUserImage={user.image} online={checkOnlineStatus(currentChat)}/>
</>
  )}
  </>


  );
};

export default ChatList;