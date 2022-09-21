import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LOGO from "../assets/logo.PNG";
import styles from "../Styles/Card.module.css";
import { MdLocationOn } from "react-icons/md";
const Card = () => {
  const { user_id } = useParams();
  const [plans, setPlans] = useState([]);
  const [ben, setBen] = useState([]);
  const [terms, setTerms] = useState([]);
  const data = JSON.parse(localStorage.getItem("data"));
  const d = JSON.parse(localStorage.getItem("fac"));
  const post = () => {
    axios
      .post(`https://devapi.wtfup.me/gym/plan`, { gym_id: user_id })
      .then(({ data }) => setPlans(data.data));
  };
  useEffect(() => {
    setBen(d.benefits);
    setTerms(data.terms);
    post();
  }, []);
  return (
    <div className={styles.box}>
      <div className={styles.head}>
        <div>
          <p className={styles.h1}>{d.gym_name}</p>
          <div className={styles.icon}>
            <MdLocationOn fontSize={25} />
            <p className={styles.h2}>
              {d.address1},{d.address2},{d.city}{" "}
            </p>
          </div>
        </div>
        <div className={styles.rate}>
          <p>★ ★ ★ ★ ★</p>
          <p>{d.rating} Ratings</p>
        </div>
      </div>
      <div className={styles.box1}>
        <div>
          <div>
            <p className={styles.h2A}>Description</p>
            <p className={styles.h3}>{d.description}</p>
          </div>
          <div>
            <p className={styles.h2A}>Facilities</p>
            <div className={styles.fac}>
              {" "}
              {ben.map((el) => (
                <p>{el.name}</p>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.h2A}>Why to choose WTF?</p>
            <div className={styles.cardicons}>
              {terms.map((el, ind) => (
                <div className={styles.card}>
                  <p className={styles.h4}>{el.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          {plans.map((el, ind) => (
            <div className={styles.plan} key={ind}>
              <p className={styles.h5}>Plan {ind + 1}</p>
              <div className={styles.icon}>
                <img src={LOGO} alt="logo" />
                <button>{el.plan_price}</button>
              </div>
              <p>{el.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Card;
