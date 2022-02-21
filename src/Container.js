import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./Container.css";

function Container() {
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setAppHeight(window.innerHeight);
    });
    window.addEventListener("orientationchange", () => {
      setAppHeight(window.innerHeight);
    });
  }, []);
  return (
    <div className="Container">
      <Outlet />
    </div>
  );
}

export default Container;
