import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Body = () => {
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
          <input
            className="inputSearch"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search gym name here..."
          />
          <button onClick={() => setText("")}>Clear</button>

          <div>
            <h1>Filters</h1>
            <h3>Location</h3>
            <select onChange={(e) => setFilt(e.target.value)}>
              <option>Select City</option>
              {d.map((e, i) => {
                return <option key={i}>{e.city}</option>;
              })}
            </select>
          </div>
          <div>
            {data &&
              data.map((e, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      localStorage.setItem("fac", JSON.stringify(e));
                      navigate(`/${e.user_id}`);
                    }}
                  >
                    <h1>{e.gym_name}</h1>
                    <p>
                      {e.address1} , {e.address2}, {e.city}
                    </p>
                    <button>Book Now</button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};
