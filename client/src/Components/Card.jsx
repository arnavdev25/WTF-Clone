import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LOGO from "../assets/logo1.png";
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
    <div
      style={{
        color: "",
        margin: "100px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div>
          <h2>Description</h2>
          <p>{d.description}</p>
        </div>
        <div>
          <h2>Facilities</h2>
          {ben.map((e) => (
            <div>{e.name}</div>
          ))}
        </div>
        <div>
          <h2>Why to choose WTF?</h2>
          <div>
            {terms.map((e, i) => (
              <div>
                <img sec={e.icon} alt="icon" />
                <p>{e.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {plans.map((e, i) => (
          <div key={i}>
            <div>
              <p>Plan {i + 1}</p>
              <img src={LOGO} alt="logo" />
              <p>{e.description}</p>
            </div>
            <div>
              <button>{e.plan_price}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
