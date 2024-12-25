import React, { useState } from "react";
import { Button, Input, Card } from "antd";
import "antd/dist/reset.css";
import "./signIn.css";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
export default function SignIn({ setIsSignin }) {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (key, value) => {
    setSignInData({
      ...signInData,
      [key]: value,
    });
  };
  const navigate = useNavigate()
  const signIn = async () => {
    try {
      const response = await fetch(`https://napi.prepseed.com/users/signinV2`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: { email: signInData.email, password: signInData.password }
        }),
        credentials: 'include',
      });

      const responseJson = await response.json();

      if (!response.ok) {
        // If response status is not 200, show an error notification
        notification.error({
          message: 'Sign In Failed',
          description: 'You are not allowed to sign in here'
        });
        return;
      }
      const token = responseJson.token;
      localStorage.setItem('token', token);
      setIsSignin(true);
      navigate('/CareerApplication')
      return responseJson;

    } catch (error) {
      throw new Error(error.message);
    }

  }
  return (
    <div className="login-container">
      <img src="./hitech_logo.png" alt="LOGO" style={{ marginBottom: "10px" }} />
      <Card title="Login" bordered={false} style={{ width: 300 }}>
        <Input
          placeholder="Email"
          style={{ marginBottom: 10 }}
          onChange={(e) => {
            handleInputChange("email", e.target.value);
          }}
        />
        <Input.Password
          placeholder="Password"
          style={{ marginBottom: 20 }}
          onChange={(e) => {
            handleInputChange("password", e.target.value);
          }}
        />
        <Button
          type="primary"
          block
          onClick={signIn}
        >
          Login
        </Button>
      </Card>
    </div>
  );
}
