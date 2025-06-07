import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  RiHome2Line,
  RiHome2Fill,
  RiSearch2Line,
  RiSearch2Fill,
  RiSettings2Line,
  RiSettings2Fill,
} from "react-icons/ri";
import {
  PiPlus,
  PiPlusBold,
  PiBookmarkSimpleLight,
  PiBookmarkSimpleFill,
} from "react-icons/pi";

import "./Footer.css";

const Footer = () => {
  const location = useLocation();

  const pathToActive = {
    "/": "home",
    "/search": "search",
    "/post": "post",
    "/bookmarks": "bookmark",
    "/settings": "settings",
  };

  const [active, setActive] = useState(
    pathToActive[location.pathname] || "home"
  );

  React.useEffect(() => {
    setActive(pathToActive[location.pathname] || "home");
  }, [location.pathname]);

  return (
    <div className="footer-container">
      <Link to="/">
        <button
          className={active === "home" ? "active" : ""}
          aria-label="Home"
          onClick={() => setActive("home")}
        >
          {active === "home" ? <RiHome2Fill /> : <RiHome2Line />}
        </button>
      </Link>

      <button
        className={active === "search" ? "active" : ""}
        aria-label="Search"
        onClick={() => setActive("search")}
      >
        {active === "search" ? <RiSearch2Fill /> : <RiSearch2Line />}
      </button>

      <Link to="/post">
        <button
          className={active === "post" ? "active" : ""}
          aria-label="New Post"
          onClick={() => setActive("post")}
        >
          {active === "post" ? <PiPlusBold /> : <PiPlus />}
        </button>
      </Link>

      <button
        className={active === "bookmark" ? "active" : ""}
        aria-label="Bookmarks"
        onClick={() => setActive("bookmark")}
      >
        {active === "bookmark" ? (
          <PiBookmarkSimpleFill />
        ) : (
          <PiBookmarkSimpleLight />
        )}
      </button>

      <button
        className={active === "settings" ? "active" : ""}
        aria-label="Settings"
        onClick={() => setActive("settings")}
      >
        {active === "settings" ? <RiSettings2Fill /> : <RiSettings2Line />}
      </button>
    </div>
  );
};

export default Footer;
