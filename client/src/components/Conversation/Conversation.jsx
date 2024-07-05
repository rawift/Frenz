import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Conversation = ({data, currentUser, online}) => {
    const [userData, setUserData] = useState(null)
    useEffect(() => {
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
  return (
    <>
    <div className="follower conversation">
      <div>
        {online  &&<div className="online-dot">online</div>}
        <img
          src={userData?.image}
          alt="Profile"
          className="followerImage"
          style={{ width: "50px", height: "50px" }}
        />
        <div className="name" style={{fontSize: '0.8rem'}}>
          <span>{userData?.firstname} {userData?.lastname}</span>
          <span>{online? "online":"offline"}</span>
        </div>
      </div>
    </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
  </>
  )
}

export default Conversation