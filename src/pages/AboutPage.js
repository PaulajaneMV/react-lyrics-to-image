import React from "react";
import { Layout, Typography, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/AboutPage.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Layout className="about-layout">
      <Header className="about-header">
        <Button
          type="link"
          className="back-arrow"
          onClick={() => navigate("/")}
          icon={<ArrowLeftOutlined />}
        />
        About Us
      </Header>
      <Content className="about-content">
        <div className="about-section">
          <Title level={2}>Who We Are</Title>
          <Paragraph>
            We are a team of creative professionals passionate about helping
            users create stunning lyric videos with ease. Our platform is
            designed for simplicity and efficiency, enabling you to produce
            professional-quality videos in no time.
          </Paragraph>
          <Title level={2}>Our Mission</Title>
          <Paragraph>
            Our mission is to make video creation accessible to everyone,
            regardless of their technical skills. We aim to provide tools that
            empower artists, creators, and businesses to express their ideas
            visually.
          </Paragraph>
        </div>
      </Content>
      <Footer className="about-footer">© 2024 Lyrics to Video App</Footer>
    </Layout>
  );
};

export default AboutPage;
