import React, { useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import HeaderNavMenu from "./HeaderNavMenu";


const HeaderOne = () => {
  // menu sticky
  useEffect(() => {
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $("#sticky-header").removeClass("sticky-menu");
        $(".scroll-to-target").removeClass("open");
        $("#header-fixed-height").removeClass("active-height");
      } else {
        $("#sticky-header").addClass("sticky-menu");
        $(".scroll-to-target").addClass("open");
        $("#header-fixed-height").addClass("active-height");
      }
    });
  }, []);

  return (
   
      <header>
        <div id="header-fixed-height" />
  
        <div id="sticky-header" className="menu-area ">
          <div className="">
            <div className="row">
              <div className="">
                <div className="mobile-nav-toggler">
                </div>
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="logo" style={{marginRight:"20%"}}>
                      <Link to="/">
                        <img src="/img/images/eflogo.png" alt="EnergyFlow"/>
                      </Link>
                    </div>
  
                    <HeaderNavMenu />
                    
                   
                  </nav>
                </div>
  
               
              </div>
            </div>
          </div>
        </div>
      </header>
  );
};

export default HeaderOne;
