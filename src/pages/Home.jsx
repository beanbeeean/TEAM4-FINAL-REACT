import React, { useEffect, useState } from "react";

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
    <div>
      Home
      <ul>
        {data.map((v, idx) => (
          <li key={`${idx}-${v}`}>{v}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
