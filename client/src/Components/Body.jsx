import React, { useEffect, useState } from "react";
import styles from "../Styles/Body.module.css";
import { useNavigate } from "react-router-dom";
import { MdLocationOn, MdSearch } from "react-icons/md";
import axios from "axios";
const Body = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [filt, setFilt] = useState("");
  const [d, setD] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231&city=${filt}`
      )
      .then(({ data }) => {
        setLoading(false);
        // console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
        setData(data.data);
      })
      .catch((err) => {
        setLoading(false);
        setErr(true);
      });
  }, [filt]);

  useEffect(() => {
    axios
      .get(`https://devapi.wtfup.me/gym/places`)
      .then(({ data }) => setD(data.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : err ? (
        <>Something Went Wrong...</>
      ) : (
        <div>
          <div className={styles.inputbox}>
            <MdSearch fontSize={25} />
            <input
              placeholder="Search gym name here..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button className={styles.searchbtn1}>
              <MdLocationOn fontSize={25} />
            </button>
            <button className={styles.searchbtn2} onClick={() => setText("")}>
              Clear
            </button>
          </div>

          <div className={styles.gymsbox}>
            <div>
              <p className={styles.head1}>Filters</p>
              <p className={styles.head2}>Cities</p>
              <select onChange={(e) => setFilt(e.target.value)}>
                <option>Select City</option>
                {d.map((e, i) => {
                  return <option key={i}>{e.city}</option>;
                })}
              </select>
            </div>
            <div className={styles.gymcon}>
              {data &&
                data.map((e, i) => {
                  return (
                    <div
                      key={i}
                      className={styles.gym}
                      style={{cursor:"pointer"}}
                      onClick={() => {
                        localStorage.setItem("fac", JSON.stringify(e));
                        navigate(`/${e.user_id}`);
                      }}
                    >
                      <div className={styles.empty}></div>
                      <div className={styles.detail}>
                        <h2>{e.gym_name}</h2>
                        <p>
                          {e.address1} , {e.address2}, {e.city}
                        </p>
                        <button className={styles.bookbtn}>Book Now</button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
