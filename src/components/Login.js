import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { auth, provider } from "../firebase";

function Login() {
  const handleSignGoogle = (e) => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://static1.squarespace.com/static/5cd8b72c65a707a8fbfe11d2/5cd9d15143b4170001c613e7/5cf983a6bbe50500011a275c/1587380619540/slack-animation.gif?format=1000w"
          alt=""
        />
        <h1>Sign In</h1>
        <p>Welcome to the community</p>
        <Button type="submit" onClick={handleSignGoogle}>
          Sign in with google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 40px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 200px;
    margin-bottom: 40px;
  }

  > Button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48;
    color: white;
  }
`;
