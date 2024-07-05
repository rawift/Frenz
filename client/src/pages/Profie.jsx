import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
//import "./Profile.css"

const Profie = () => {
    const { user, setUser } = useContext(UserContext)
    const [interests, SetInterests] = useState([])

    useEffect(()=>{
        console.log(user)
        console.log(user.image)
        SetInterests(user.interests)
    },[user])

  return (
    <section>
    <div className="form-box">
      <div className="profile-picture-segment">
        <div className="profile-picture">
          <img src={user?.image} alt="Profile Picture" className="profile-img" />
        </div>
      </div>
      <div className="user-info">
        <h1 className="Username">{user.firstname} {user.lastname}</h1>
      </div>
      <div className="content-segment">
<div className="container">
  <div className="header">
    <div>
      <h3>Bio</h3>
      <p className="bio-paragraph">{user.bio}</p>
    </div>
  </div>
  <div id="interest-section" className="achievements">
    <h3>Interest</h3>
    <ul className="interest-list">
        {
           interests?.map((interest) => (
                <li>{interest}</li>
            ))
        }
    </ul>
  </div>
</div>
</div>

    </div>
  </section>
  )
}

export default Profie