import React from "react";
import { Layout, Typography, Card, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../styles/PricingPage.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const PricingPage = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    { title: "Free", price: "$0", features: ["Basic Features", "5 Exports/Month"] },
    {
      title: "Pro",
      price: "$9.99",
      features: ["Unlimited Exports", "HD Quality", "Custom Templates"],
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      features: ["Advanced Features", "Priority Support", "Custom Branding"],
    },
  ];

  return (
    <Layout className="pricing-layout">
      <Header className="pricing-header">
        <Button
          type="link"
          className="back-arrow"
          onClick={() => navigate("/")}
          icon={<ArrowLeftOutlined />}
        />
        Pricing Plans
      </Header>
      <Content className="pricing-content">
        <div className="pricing-cards">
          {pricingPlans.map((plan, index) => (
            <Card key={index} className="pricing-card" title={plan.title}>
              <Title level={4} className="pricing-price">{plan.price}</Title>
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Content>
      <Footer className="pricing-footer">© 2024 Lyrics to Video App</Footer>
    </Layout>
  );
};

export default PricingPage;
