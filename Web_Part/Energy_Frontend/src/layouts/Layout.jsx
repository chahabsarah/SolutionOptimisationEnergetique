import React from "react";
import FooterOne from "../components/Footers/FooterOne";
import FooterTwo from "../components/Footers/FooterTwo";
import HeaderOne from "../components/Headers/HeaderOne";
import HeaderThree from "../components/Headers/HeaderThree";
import HeaderTwo from "../components/Headers/HeaderTwo";
import PageLoader from "../components/PageLoader/PageLoader";
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton";
import Sidebar from "../components/Sidebar";

const Layout = ({
  children,
  header = 1,
  footer = 1,
  topHeaderClassName,
  headerClassName,
}) => {
  return (
    <>
      <PageLoader />
      <ScrollToTopButton />

      {/* header */}
      {header === 1 && (
        <HeaderOne
          headerClassName={headerClassName}
          topHeaderClassName={topHeaderClassName}
        />
      )}

      {header === 2 && <HeaderTwo />}
     {header === 3 && <HeaderThree />}

     <div className="d-flex">
        <Sidebar /> {/* Ajouter le composant Sidebar ici */}
        <div className="content-wrapper" style={{ flex: 1, padding: '20px' }}>
          <main>{children}</main>
        </div>
      </div>

      {/* footer */}
      {footer === 1 && <FooterOne />}
      {footer === 2 && <FooterTwo />}
    </>
  );
};

export default Layout;