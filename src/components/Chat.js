import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import StarBorderOutlineIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlineIcon from "@material-ui/icons/InfoOutlined";
import { selectRoomId } from "../features/appSlice";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { db, auth } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function Chat() {
  const roomId = useSelector(selectRoomId);
  const [loginUser] = useAuthState(auth);
  const chatRef = useRef(null);
  const [roomDetails] = useCollection(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behaviour: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong> #{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlineIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlineIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                  loginImage={loginUser?.photoURL}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
  padding: 20px;
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
