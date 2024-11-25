import React, { useEffect } from "react";
import ContactPageArea from "../components/Contact/ContactPageArea";
import Layout from "../layouts/Layout";
import { gsapTitleAnimation } from "../lib/gsap-lib/gsapTitleAnimation";

const ContactPage = () => {
  useEffect(() => {
    gsapTitleAnimation();
  }, []);

  return (
    <Layout header={1} footer={1}>
      <ContactPageArea />
    </Layout>
  );
};

export default ContactPage;
