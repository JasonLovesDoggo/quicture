"use client";
import React, { useEffect, useState } from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import "@/components/EmptyPlaceholder.css";
// @ts-ignore
import { Container, Columns, Image, Modal } from "react-bulma-components/dist";
import ImageUploader from "@/components/ImageUploader";
import Loader from "@/components/Loader";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { on } from "events";
const SERVER_URL = "https://7093.vsc.jasoncameron.dev/";

function PeerToPeer() {
  const socket = io.connect(SERVER_URL);
  const namespace = "T>UNoV[UKrXoi:(05qa<7fR4UT:wGv$=";

  const [sending, setSending] = useState(false);
  const [receiving, setReceiving] = useState(false);
  const [file, setFile] = useState(null);
  const [receivedFilePreview, setReceivedFilePreview] = useState("");

  useEffect(() => {
    sendRequest();
  }, [file]);
  const SOCKET_EVENT = {
    CONNECTED: "connected",
    DISCONNECTED: "disconnect",
    HAS_SENT_FILES: "sent_files",
    // todo: add on download event
  };
  const peerConfig = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
    ],
  };
   socket.current.on(SOCKET_EVENT.REQUEST_SENT, ({ signal, username }) => {
     setPeerUsername(username);
     setPeerSignal(signal);
     setRequested(true);
   });
  socket.on(SOCKET_EVENT.HAS_SENT_FILES, ({ signal }) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
    });
    const fileChunks: any = [];
    peer.on("data", (data) => {
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
  });

  const sendRequest = () => {
    if (!file) return;
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: peerConfig,
    });
    peer.on("signal", (data) => {
      socket.on(namespace).emit(SOCKET_EVENT.HAS_SENT_FILES, {
        signal: data,
      });
    });
    peer.on("connect", async () => {
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
  };

  // socket.current.on(SOCKET_EVENT.HAS_SENT_FILES, ({ signal }) => {
  //   setPeerSignal(signal);
  //   peerInstance.current.signal(signal);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(receivedFilePreview);
    },
    [receivedFilePreview]
  );

  return (
    <React.Fragment>
      <Modal
        show={receivedFilePreview !== "" || sending || receiving}
        onClose={() => {
          if (!sending || !receiving) setReceivedFilePreview("");
        }}
      >
        <Modal.Content>
          {(sending || receiving) && (
            <Loader
              text={
                sending
                  ? "the picture is being sent, please wait..."
                  : "receiving picture, please wait... "
              }
            />
          )}

          {receivedFilePreview && (
            <React.Fragment>
              <h3>Someone sent you an image!</h3>
              <Image src={receivedFilePreview} />
            </React.Fragment>
          )}
        </Modal.Content>
      </Modal>
      <Container fluid>
        <Columns>
          <Columns.Column size="three-fifths">
            <ImageUploader setFile={setFile} />
          </Columns.Column>
        </Columns>
      </Container>
    </React.Fragment>
  );
}
export default PeerToPeer;
