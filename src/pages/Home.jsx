import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Home = () => {
  // 연결된거 확인
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/showMe")
      .then((res) => {
        return res.json();
      })
      .then(function (result) {
        setData(result);
      });
  }, []);

  return (
    <>
      Home
      <ul>
        {data.map((v, idx) => (
          <li key={`${idx}-${v}`}>{v}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;
