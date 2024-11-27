import React from "react";
import { Layout, Typography, Collapse, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./FAQsPage.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const FAQsPage = () => {
  const navigate = useNavigate();

  const faqs = [
    { question: "What is this app about?", answer: "This app helps you create lyric videos with ease." },
    { question: "Is there a free plan?", answer: "Yes, the Free plan offers basic features and 5 exports per month." },
    { question: "How do I contact support?", answer: "You can reach out to support via our contact form." },
  ];

  return (
    <Layout className="faqs-layout">
      <Header className="faqs-header">
        <Button
          type="link"
          className="back-arrow"
          onClick={() => navigate("/")}
          icon={<ArrowLeftOutlined />}
        />
        FAQs
      </Header>
      <Content className="faqs-content">
        <div className="faqs-section">
          <Title level={2} className="faqs-title">Frequently Asked Questions</Title>
          <Collapse accordion className="faqs-collapse">
            {faqs.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <p>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </Content>
      <Footer className="faqs-footer">© 2024 Lyrics to Video App</Footer>
    </Layout>
  );
};

export default FAQsPage;
