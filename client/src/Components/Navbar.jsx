import React, { useEffect, useState } from "react";
import styles from "../Styles/Navbar.module.css";
import LOGO from "../assets/logo1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  useEffect(() => {
    changeBackground();
    window.addEventListener("scroll", changeBackground);
  });
  return (
    <div id={styles.position}>
      <div className={navbar ? styles.nav : styles.nav1}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src={LOGO} alt="Logo" />
          </div>
          <div className={styles.columns}>
            <Link className={styles.navbtns} to="/gyms">
              <p>Fitness</p>{" "}
            </Link>
            <Link className={styles.navbtns} to="/gyms">
              <p>Nutrition</p>{" "}
            </Link>
            <Link className={styles.navbtns} to="/gyms">
              <p>Gyms</p>{" "}
            </Link>
            <Link className={styles.navbtns} to="/gyms">
              <p>Become WTF Partner</p>
            </Link>
            <Link className={styles.navbtns} to="/gyms">
              <p>About Us</p>
            </Link>
            <button className={styles.loginbtn}> Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
