// 'use client'
// import React, { useRef, useEffect, useState } from "react";
// import {io} from "socket.io-client";
// import Peer from "simple-peer";

// function App() {
//   const socket = useRef();
//   const peerInstance = useRef<Peer.Instance>();
//   const fileInput = useRef();
//   const [myUsername, setMyUsername] = useState("");
//   const [usersList, setUsersList] = useState([]);
//   const [peerUsername, setPeerUsername] = useState("");
//   const [peerSignal, setPeerSignal] = useState("");
//   const [file, setFile] = useState(null);
//   const [receivedFilePreview, setReceivedFilePreview] = useState("");

//   const SOCKET_EVENT = {
//     CONNECTED: "connected",
//     USERS_LIST: "users_list",
//     REQUEST_SENT: "request_sent",
//     REQUEST_ACCEPTED: "request_accepted",
//     REQUEST_REJECTED: "request_rejected",
//     SEND_REQUEST: "send_request",
//     ACCEPT_REQUEST: "accept_request",
//     REJECT_REQUEST: "reject_request"
//   };

//   const peerConfig = {
//     iceServers: [
//       { urls: "stun:stun.l.google.com:19302" },
//       { urls: "stun:stun1.l.google.com:19302" },
//       { urls: "stun:stun2.l.google.com:19302" },
//       { urls: "stun:stun3.l.google.com:19302" },
//       { urls: "stun:stun4.l.google.com:19302" }
//     ]
//   };

// useEffect(() => {
//     try {
//         socket.current = io.connect("localhost:7093"); //connect to the server ($peerex/index.js)

//         socket.current.on(SOCKET_EVENT.CONNECTED, (username: string) => {
//             console.log("My Username:", username);
//             setMyUsername(username);
//             console.log("CONNECTED")
//         });

//         socket.current.on(SOCKET_EVENT.USERS_LIST, (users: any) => {
//             setUsersList(users);
//             console.log("USERS_LIST");
//         });
    
//         socket.current.on(SOCKET_EVENT.REQUEST_SENT, ({ signal, username }) => {
//             setPeerUsername(username);
//             setPeerSignal(signal);
//             console.log("REQUEST_SENT");
//         });
    
//         socket.current.on(SOCKET_EVENT.REQUEST_ACCEPTED, ({ signal }) => {
//             console.log("signal being sent:", signal);
//             peerInstance.current.signal(signal);
//             console.log("REQUEST_ACCEPTED")
//         });

//         // Listen for file data
//         console.log("peerinstance = ", peerInstance.current); 
//         if (peerInstance.current) {
//             peerInstance.current.on("data", data => {
//                 // Handle incoming file data
//                 // For example, you can display the received file preview
//                 console.table(data);
//                 setReceivedFilePreview(data);
//                 console.log(receivedFilePreview);
    
//                 console.log("ON SIGNAL DATA");
//           });
//         }
//     } catch (error) {
//         console.error(error)
//     }
//   }, []);
  
//     const sendRequest = username => {
//     try {
//         console.log('sending to user', username)
//         const peer = new Peer({
//           initiator: true,
//           trickle: false,
//           config: peerConfig
//         });
//         peer.on("connect", () => {
//             console.log("CONNECTED");
//         })
//         peer.on("signal", data => {
//             console.log("peer socket socketing")
//             console.log(peer);
//           socket.current!.emit(SOCKET_EVENT.SEND_REQUEST, {
//             to: username,
//             signal: data,
//             username: myUsername
//           });
//         });
    
//         peerInstance.current = peer;
//         console.log("peerinstance.current = ", peer);
//     } catch (error) {
//         console.error(error)
//     }
//   };

//   const handleFileChange = event => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     console.log(file, selectedFile);
//   };

//   const sendFile = () => {
//     try {
//         if (file && peerInstance.current) {
//           const reader = new FileReader();
//           reader.onload = event => {
//             if (!event.target!.result) {
//                 alert("You goofed up")
//                 return
//             }
//             const dataUrl = event.target!.result;
//             console.log(dataUrl)
//             // console.log(peerInstance)
//             // console.log(peerInstance.current)
//             peerInstance.current!.send(dataUrl);
//           };
//           reader.readAsDataURL(file);
//         }
//         else if (!peerInstance.current) {
//             console.log("peeriinstacne undefined!!!");
//         }
//     } catch (error) {
//         console.error(error)
//     }
//   };

//   return (
//     <div>
//       <h2>My Username: {myUsername}</h2>
//       <input type="file" ref={fileInput} onChange={handleFileChange} />
//       <button onClick={sendFile}>Send File</button>
//       <h3>Users Online:</h3>
//       <ul>
//         {usersList.map(({ username }) => (
//           <li key={username}>
//             {username !== myUsername && (
//               <button onClick={() => sendRequest(username)}>
//                 Send Request to {username}
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


'use client'
import React, { useRef, useEffect, useState } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "@/components/EmptyPlaceholder.css";
import {
  Container,
  Columns,
  Image,
  Navbar,
  Modal
} from "react-bulma-components/dist";
import UserInfo from "@/components/UserInfo";
import ShareRequest from "@/components/ShareRequest";
import ImageUploader from "@/components/ImageUploader";
import EmptyPlaceholder from "@/components/EmptyPlaceholder";
import Loader from "@/components/Loader";
import logo from "@/logo.png";
import io from "socket.io-client";
import Peer from "simple-peer";

function App() {
  const socket = useRef();
  const peerInstance = useRef();
  const [requested, setRequested] = useState(false);
  const [sentRequest, setSentRequest] = useState(false);
  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [peerUsername, setPeerUsername] = useState("");
  const [peerSignal, setPeerSignal] = useState("");
  const [file, setFile] = useState(null);
  const [receivedFilePreview, setReceivedFilePreview] = useState("");
  const SOCKET_EVENT = {
    CONNECTED: "connected",
    DISCONNECTED: "disconnect",
    USERS_LIST: "users_list",
    // todo: add on download event
  };
  const peerConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" }
    ]
  };
  const acceptRequest = () => {
    setRequested(false);
    const peer = new Peer({
      initiator: false,
      trickle: false
    });
    peer.on("signal", data => {
      socket.current.emit(SOCKET_EVENT.ACCEPT_REQUEST, {
        signal: data,
        to: peerUsername
      });
    });
    peer.on("connect", () => {
      setReceiving(true);
    });
    const fileChunks = [];
    peer.on("data", data => {
      if (data.toString() === "EOF") {
        // Once, all the chunks are received, combine them to form a Blob
        const file = new Blob(fileChunks);
        setReceivedFilePreview(URL.createObjectURL(file));
        setReceiving(false);
      } else {
        // Keep appending various file chunks
        fileChunks.push(data);
      }
    });

    peer.signal(peerSignal);
    peerInstance.current = peer;
  };
  const rejectRequest = () => {
    socket.current.emit(SOCKET_EVENT.REJECT_REQUEST, { to: peerUsername });
    setRequested(false);
  };
  const sendRequest = username => {
    setLoading(true);
    setPeerUsername(username);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: peerConfig
    });
    peer.on("signal", data => {
      socket.current.emit(SOCKET_EVENT.SEND_REQUEST, {
        to: username,
        signal: data,
        username: myUsername
      });
      setSentRequest(true);
      setLoading(false);
    });
    peer.on("connect", async () => {
      setSending(true);
      setSentRequest(false);
      let buffer = await file.arrayBuffer();
      const chunkSize = 16 * 1024;
      while (buffer.byteLength) {
        const chunk = buffer.slice(0, chunkSize);
        buffer = buffer.slice(chunkSize, buffer.byteLength);

        // Off goes the chunk!
        peer.send(chunk);
      }
      peer.send("EOF");
      setSending(false);
    });
    peerInstance.current = peer;
  };
  const SERVER_URL = "localhost:7093";
  useEffect(() => {
    socket.current = io.connect(SERVER_URL);

    socket.current.on(SOCKET_EVENT.CONNECTED, username => {
      setMyUsername(username);
    });
    socket.current.on(SOCKET_EVENT.USERS_LIST, users => {
      setUsersList(users);
    });

    socket.current.on(SOCKET_EVENT.REQUEST_SENT, ({ signal, username }) => {
      setPeerUsername(username);
      setPeerSignal(signal);
      setRequested(true);
    });
    socket.current.on(SOCKET_EVENT.REQUEST_ACCEPTED, ({ signal }) => {
      peerInstance.current.signal(signal);
    });
    socket.current.on(SOCKET_EVENT.REQUEST_REJECTED, () => {
      setSentRequest(false);
      setRejected(true);
    });
  }, []);
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(receivedFilePreview);
    },
    [receivedFilePreview]
  );

  return (
    <React.Fragment>
      <Navbar fixed="top" active={false} transparent>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <img src={logo} alt="Pic Share" />
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>
      </Navbar>
      <Modal
        show={
          receivedFilePreview !== "" ||
          sending ||
          receiving ||
          sentRequest ||
          rejected ||
          requested
        }
        onClose={() => {
          if (!sending || !receiving || !sentRequest || !requested)
            setReceivedFilePreview("");
          setRejected(false);
        }}
      >
        <Modal.Content>
          {requested && (
            <ShareRequest
              acceptRequest={acceptRequest}
              rejectRequest={rejectRequest}
              peerUsername={peerUsername}
            />
          )}
          {(sending || receiving || sentRequest) && (
            <Loader
              text={
                sending
                  ? "the picture is being sent, please wait..."
                  : sentRequest
                  ? "Wait till user accepts your request"
                  : "receiving picture, please wait... "
              }
            />
          )}
          {rejected && (
            <UserInfo
              myUsername={peerUsername}
              subtext={`${peerUsername} Rejected your request, sorry!`}
              color="#ffcac8"
            />
          )}

          {receivedFilePreview && (
            <React.Fragment>
              <UserInfo
                myUsername={peerUsername}
                subtext={`${peerUsername} has sent you this image`}
                color="#c7ffcc"
              />
              <Image src={receivedFilePreview} />
            </React.Fragment>
          )}
        </Modal.Content>
      </Modal>
      <Container fluid>
        <Columns>
          <Columns.Column size="three-fifths">
            <UserInfo
              myUsername={myUsername}
              subtext="Share your username with others so they can send you a picture"
              color="#EFFFFF"
            />
            <ImageUploader setFile={setFile} />
          </Columns.Column>
          <Columns.Column>
            {usersList.length > 1 ? (
              usersList.map(
                ({ username, timestamp }) =>
                  username !== myUsername && (
                    <UserInfo
                      key={username}
                      myUsername={username}
                      timestamp={timestamp}
                      sendRequest={sendRequest}
                      disabled={!file || loading}
                    />
                  )
              )
            ) : (
              <EmptyPlaceholder
                title="No Users Online Right Now!"
                subtitle="Wait till someone connects to start sharing"
              />
            )}
          </Columns.Column>
        </Columns>
      </Container>
    </React.Fragment>
  );
}

export default App;