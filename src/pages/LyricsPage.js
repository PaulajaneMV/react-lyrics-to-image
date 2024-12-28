import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Input,
  Button,
  Dropdown,
  Menu,
  Spin,
  message,
  notification,
} from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import axios from "axios";
import "../styles/LyricsPage.css";
import Logo from "../assets/LogoLyricsApp.png";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const LyricsPage = () => {
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleGenerateVideo = async () => {
    if (!lyrics.trim()) {
      notification.warning({
        message: "Missing Lyrics",
        description: "Please enter some lyrics to generate a video.",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/webhook", { lyrics });
      message.info("Lyrics sent! Waiting for the video to be generated...");
    } catch (error) {
      console.error("Error sending lyrics:", error);
      notification.error({
        message: "Failed to Send Lyrics",
        description: "An error occurred while sending the lyrics. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = "generated-video.mp4";
      link.click();
    } else {
      notification.warning({
        message: "No Video Available",
        description: "Please generate a video before downloading.",
      });
    }
  };

  const handleReset = () => {
    setLyrics("");
    setVideoUrl("");
    message.success("Fields reset successfully.");
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:5000/latest-video");
        if (response.data.videoUrl) {
          setVideoUrl(response.data.videoUrl);
          message.success("Video generation complete!");
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching the latest video:", error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      window.location.href = "/";
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="user">User</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Layout className="lyrics-page">
      <Header className="lyrics-header">
        <div className="header-left">
          <img src={Logo} alt="App Logo" className="lyrics-logo" />
          <Title level={2} className="lyrics-title">
            Lyrics to Video Generator
          </Title>
        </div>
        <div className="header-right">
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="text" icon={<MenuOutlined />} className="burger-menu">
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className="lyrics-content">
        <div className="input-section">
          <Title level={4} className="input-title">
            Enter Lyrics
          </Title>
          <Input.TextArea
            rows={8}
            placeholder="Type your lyrics here..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="lyrics-input"
          />
          <Button
            type="primary"
            onClick={handleGenerateVideo}
            disabled={loading}
            className="generate-button"
          >
            {loading ? "Generating..." : "Generate Video"}
          </Button>
        </div>
        <div className="result-section">
          <Title level={4} className="output-title">
            Generated Video
          </Title>
          <div className="video-container">
            {loading && <Spin size="large" />}
            {videoUrl ? (
              <video controls className="generated-video">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="placeholder">
                <p className="placeholder-title">Generated video will appear here</p>
              </div>
            )}
          </div>
          <div className="action-buttons">
            <Button onClick={handleDownload} className="download-button">
              Download
            </Button>
            <Button onClick={handleReset} className="reset-button">
              Reset
            </Button>
          </div>
        </div>
      </Content>
      <Footer className="lyrics-footer">
        Lyrics to Video App ©2024
      </Footer>
    </Layout>
  );
};

export default LyricsPage;
