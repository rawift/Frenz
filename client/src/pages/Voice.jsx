import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../context/UserContext'
import "./Voice.css"
import {io} from "socket.io-client"
import Peer from 'simple-peer';
import Notifications from '../components/Notification/Notification';

import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import Sidebar from '../components/Options/Options';




const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));






const Voice = () => {
    const socket = useRef()
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    const { user, setUser } = useContext(UserContext)
    const [stream,setStream] = useState(null)
    const [me,setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const classes = useStyles();





    useEffect(() => {
        socket.current = io("http://localhost:8080")
        console.log("socket", user._id )
    },[])

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video:false, audio: true })
        .then((currentStream) => {
          setStream(currentStream);
  
          myVideo.current.srcObject = currentStream;
        });

        socket.current.on('me',(id)=>{
            setMe(id)
            console.log(id)
        })

        socket.current.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
          });
    },[])


    const answerCall = () => {
        setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
        console.log("oy yeah",call.from)
      socket.current.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    }

    const callUser = (id) => {
        console.log("callusrid",id)
            const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.current.emit('callUser', { userToCall: id, signalData: data, from: me, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.current.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);
    
        connectionRef.current.destroy();
    
        window.location.reload();
      };
  return (
    <div className={classes.wrapper}>
    <Grid container className={classes.gridContainer}>
    {stream && (
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
          <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
        </Grid>
      </Paper>
    )}
    {callAccepted && !callEnded && (
      <Paper className={classes.paper}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
          <video playsInline ref={userVideo} autoPlay className={classes.video} />
        </Grid>
      </Paper>
    )}
  </Grid>
  <Sidebar me={me} callAccepted={callAccepted} name={name} setName={setName} callEnded={callEnded} leaveCall={leaveCall} callUser={callUser}>
    <Notifications answerCall={answerCall} call={call} callAccepted={callAccepted} />
  </Sidebar>
  </div>
  )
}

export default Voice