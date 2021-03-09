import React, { useRef } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ChatInput({ channelName, channelId, chatRef }) {
  const inputRef = useRef(null);
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: "",
    });

    chatRef.current.scrollIntoView({
      behaviour: "smooth",
    });

    inputRef.current.value = "";
  };

  return (
    <ChatInputContainer>
      <form>
        <input ref={inputRef} placeholder={`Message #${channelName}`} />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > Button {
    display: none;
  }
`;
