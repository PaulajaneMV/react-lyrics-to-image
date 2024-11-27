import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";
import logo from "../assets/LogoLyricsApp.png";

const { Title, Text } = Typography;

const SignUpPage = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    alert("Account created successfully!");
    console.log("Form values:", values);
    navigate("/"); // Navigate back to the landing page
  };

  return (
    <div className="signup-layout">
      <div className="signup-header">
        <Button
          type="link"
          className="back-arrow"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate("/")}
        />
        <Title className="signup-header-title">Sign Up</Title>
      </div>
      <div className="signup-content">
        <div className="signup-card">
          <div className="signup-logo">
            <img src={logo} alt="App Logo" />
          </div>
          <Title level={2} className="signup-title">Create Your Account</Title>
          <Text className="signup-subtitle">
            Join the Lyrics to Image Generator community today.
          </Text>
          <Form
            name="signup-form"
            layout="vertical"
            className="signup-form"
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter your username!" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm your password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="signup-button"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="signup-footer">
        <Text>
          Already have an account?{" "}
          <Button
            type="link"
            className="login-link"
            onClick={() => navigate("/")}
          >
            Back to Login
          </Button>
        </Text>
      </div>
    </div>
  );
};

export default SignUpPage;
