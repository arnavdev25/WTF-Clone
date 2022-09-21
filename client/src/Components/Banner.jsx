import React from "react";
import BannerImage from "../assets/banner.png";
const Banner = () => {
  return (
    <div>
      <img src={BannerImage} alt="Banner" style={{ width: "100%" }} />
    </div>
  );
};
export default Banner;
