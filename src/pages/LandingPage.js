import React, { useState, useEffect } from "react";
import { Typography, Button, Layout, Modal, Form, Input, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LogoLyricsApp.png";
import music1 from "../assets/Music1.jpg";
import music2 from "../assets/Music2.jpg";
import music3 from "../assets/Music3.jpg";
import "./LandingPage.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const showLoginModal = () => setIsModalVisible(true);
  const handleModalCancel = () => setIsModalVisible(false);

  // Ensure images are loaded before rendering the carousel
  useEffect(() => {
    const imagePaths = [music1, music2, music3];
    const imagePromises = imagePaths.map(
      (path) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = path;
          img.onload = resolve;
          img.onerror = reject;
        })
    );

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => console.error("Error loading images"));
  }, []);

  return (
    <Layout className="landing-layout">
      <Header className="landing-header">
        <div className="logo">
          <img src={logo} alt="App Logo" />
        </div>
        <div className="menu-items">
          <Button type="link" onClick={() => navigate("/about")}>
            ABOUT
          </Button>
          <Button type="link" onClick={() => navigate("/pricing")}>
            PRICING
          </Button>
          <Button type="link" onClick={() => navigate("/faqs")}>
            FAQS
          </Button>
          <Button
            type="primary"
            className="landing-login-button"
            onClick={showLoginModal}
          >
            Login
          </Button>
        </div>
      </Header>
      <Content className="landing-content">
        <div className="landing-body">
          <div className="text-section">
            <Title className="landing-title">
              Easiest Online <span className="highlight">Lyric Video Maker</span>
            </Title>
            <Paragraph className="landing-subtitle">
              Create amazing lyric videos in an intuitive online editor using
              templates designed by some of the world's top video designers.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="landing-button"
              onClick={showLoginModal}
            >
              Create Now
            </Button>
          </div>
          <div className="image-section">
            {imagesLoaded ? (
              <Carousel autoplay dotPosition="right" className="carousel-container">
                <div>
                  <img src={music1} alt="Slide 1" className="carousel-image" />
                </div>
                <div>
                  <img src={music2} alt="Slide 2" className="carousel-image" />
                </div>
                <div>
                  <img src={music3} alt="Slide 3" className="carousel-image" />
                </div>
              </Carousel>
            ) : (
              <p className="loading-text">Loading slideshow...</p>
            )}
          </div>
        </div>
      </Content>
      <Footer className="landing-footer">
        Lyrics to Video App ©2024 | Designed for creators.
      </Footer>

      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleModalCancel}
        centered
        className="login-modal"
      >
        <div className="login-modal-content">
          <div className="login-logo">
            <img src={logo} alt="Logo" />
          </div>
          <Title level={2} className="login-title">
            Welcome Back!
          </Title>
          <Paragraph className="login-subtitle">
            Log in to access the Lyrics to Image Generator.
          </Paragraph>
          <Form
            name="login-form"
            layout="vertical"
            onFinish={() => navigate("/lyrics")}
            className="login-form"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
              >
                Log In
              </Button>
            </Form.Item>
          </Form>
          <Paragraph className="login-footer">
            Don't have an account? <a href="/register">Sign Up</a>
          </Paragraph>
        </div>
      </Modal>
    </Layout>
  );
};

export default LandingPage;
