import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import "./ChatBox.css";
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji'

const ChatBox = ({chat, currentUser, setSendMessage, recieveMessage}) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()

    useEffect(() => {
      if(recieveMessage!=null && recieveMessage.chatId==chat._id){
        console.log("recieve message",recieveMessage)
        setMessages([...messages,recieveMessage])
      }
    },[recieveMessage])

    useEffect(()=>{
        console.log(chat)
        const userId = chat?.members?.find((id)=>id!=currentUser)
        const fetchData = async () => {
            try{
              const response = await axios.get(`http://localhost:8000/user/${userId}`, { withCredentials: true });
              console.log("res",response)
              setUserData(response.data)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          if(chat!=null)  fetchData()
    },[chat, currentUser])

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const {data} = await axios.get(`http://localhost:8000/message/${chat._id}`)
                console.log(data)
                setMessages(data)
            } catch (error) {
                console.log(error)
            }
        }
        if(chat!=null) fetchMessages()
    },[chat])

    const handleChange = (newMessage) => {
      setNewMessage(newMessage)
    }
    const handleSend = (e) => {
      e.preventDefault()

      const message = {
        "senderId": currentUser,
        "text": newMessage,
        "chatId": chat._id
      }

      console.log("s",message)

      const fetchData = async () => {
        try {
          const { data } = await axios.post('http://localhost:8000/message/add', message, { withCredentials: true });
          console.log('daaaatttt', data);
          setMessages([...messages, data])
          setNewMessage("")
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchData();

      const receiverId = chat?.members?.find((id)=>id!=currentUser)
      setSendMessage({...message, receiverId})

    }

    useEffect(() => {
      scroll.current?.scrollIntoView({behavior:"smooth"})
    },[messages])


  return (
    <>
    <div className='ChatBox-container'>
      {chat ? (


<>
<div className='chat-header'>
    <div className='follower'>










    <div className="follower conversation">
<div>
<img
  src={userData?.image}
  alt="Profile"
  className="followerImage"
  style={{ width: "50px", height: "50px" }}
/>
<div className="name" style={{fontSize: '0.8rem'}}>
  <span>{userData?.firstname} {userData?.lastname}</span>
</div>
</div>
</div>
<hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </div>

    </div>

    <div className='chat-body'>
        {messages.map((message) => (
            <>
            <div ref={scroll} className={message.senderId == currentUser ? "message own" : "message"}> 
            <span>{message.text}</span>
            <span>{format(message.timestampField)}</span>
            </div>
            </>
        ))}
    </div>


    <div className='chat-sender'>
      <div>+</div>
      <InputEmoji value={newMessage}
      onChange={handleChange}/>
      <div className='send-button button' onClick={handleSend}>Send</div>
    </div>
</>

      ) : (
        <span className='chatbox-empty-message'>
          Tap on a Chat to Start Convo...
        </span>
      )}
       
    </div>
    </>
  )
}

export default ChatBox