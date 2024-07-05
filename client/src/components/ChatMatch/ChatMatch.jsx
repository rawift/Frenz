import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {format} from "timeago.js"

export const ChatMatch = ({data, currentUser, online}) => {

    
    const [userData, setUserData] = useState({})
    const [recentMessage, setRecentMessage] = useState({})
    useEffect(() => {
        console.log(data)
        const userId = data.members.find((id)=>id!=currentUser)
        console.log(userId)
     
    const fetchData = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/user/${userId}`, { withCredentials: true });
        console.log("res",response)
        setUserData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
    },[])
    useEffect(() =>{

      const fetchData = async () => {
        try{
          const response = await axios.get(`http://localhost:8000/message/recent/${data._id}`, { withCredentials: true });
          console.log("recent",response)
          setRecentMessage(response.data)
        } catch (error) {
          console.error('Error fetching recent data:', error);
        }
      };
      fetchData()

    },[])
  return (
    <div className="flex hover:bg-gray-900 w-full bg-black shadow-sm p-4 md:p-5">
    <div class="relative inline-block mr-3">
<img class="inline-block size-[46px] rounded-full" src={userData?.image} alt="" />
<span className={`absolute top-0 end-0 block size-3 rounded-full ring-2 ring-white ${online ? 'bg-teal-400' : 'bg-red-400'}`}></span>
</div>
    <div className="flex flex-grow items-center">
      <div className="flex flex-col">
        <p className="text-lg font-semibold">{userData.firstname}</p>
        <p className="text-gray-300">{recentMessage.text}</p>
      </div>
      <div className="flex-grow"></div>
      <div className="flex items-center">
        <p className="text-gray-300 text-xs mr-2">{format(recentMessage.timestampField)}</p>
      </div>
    </div>
  </div>
  )
}
