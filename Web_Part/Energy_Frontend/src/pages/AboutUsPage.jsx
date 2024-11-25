import React, { useEffect } from "react";
import AboutUs from "../components/AboutUs/AboutUs";

import ServicesAreaSix from "../components/ServicesArea/ServicesAreaSix";

import Layout from "../layouts/Layout";
import { gsapTitleAnimation } from "../lib/gsap-lib/gsapTitleAnimation";

const AboutUsPage = () => {
  useEffect(() => {
    gsapTitleAnimation();
  }, []);

  return (
    <>
      <Layout header={1} footer={1}>
        <AboutUs />
      </Layout>
    </>
  );
};

export default AboutUsPage;
