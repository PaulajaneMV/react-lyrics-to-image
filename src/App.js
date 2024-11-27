import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import LyricsPage from "./pages/LyricsPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import FAQsPage from "./pages/FAQsPage";

const App = () => {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/lyrics" element={<LyricsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faqs" element={<FAQsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
