const express = require('express');
const axios = require('axios');

const API_KEY = process.env.ZOOM_CLIENT_ID;
const API_SECRET = process.env.ZOOM_CLIENT_SECRET;


// Concatenate and encode client ID and client secret
const credentials = `${API_KEY}:${API_SECRET}`;
const encodedCredentials = "aG5oblYwcHNTUUdhRW5tNzhVa0pwZzpJMVV1MGxmaWZEOElSZGxUdm93Qjl4Q2l2V3BBMkhGRw";

// API endpoint
const apiUrl = 'https://zoom.us/oauth/token';



const meetingOptions = {
    topic: "My Zoom Meeting",
    type: 2, // Scheduled meeting
    // start_time: "2023-03-23T12:00:00Z",
    // start_time: `${new Date(scheduledTime).toISOString()}`,
    // timezone: "Asia/kolkata",
  };

  const body ={
    "grant_type": "account_credentials",
    "account_id": 3034327034
  }


const meet= async (req, res) => {
    console.log(credentials)
    /*axios.post(apiUrl,body, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedCredentials}`
        }
      })
      .then(response => {
        console.log('API Response:', response);
      })
      .catch(error => {
        console.log(error)
      });*/

  };


const router = express.Router();

router.route("/link").get(meet)



module.exports = router;
