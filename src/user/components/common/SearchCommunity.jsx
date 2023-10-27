import React from "react";
import styles from "../../css/common/SearchCommunity.module.css";

const SearchCommunity = () => {
  return (
    <div className={styles.commu_wrap}>
      <table className={styles.commu_table}>
        <thead>
          <tr>
            <th className="text-center">제목</th>
            <th className="text-center">작성자</th>
            <th className="text-center">작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>이 책을 추천합니다.dfdfdfdfdsdfsdf</td>
            <td className="text-center">나요</td>
            <td className="text-center">2023.10.19</td>
          </tr>
          <tr>
            <td>이 책을 추천합니다.</td>
            <td className="text-center">나요</td>
            <td className="text-center">2023.10.19</td>
          </tr>
          <tr>
            <td>이 책을 추천합니다.</td>
            <td className="text-center">나요</td>
            <td className="text-center">2023.10.19</td>
          </tr>
          <tr>
            <td>이 책을 추천합니다.</td>
            <td className="text-center">나요</td>
            <td className="text-center">2023.10.19</td>
          </tr>
          <tr>
            <td>이 책을 추천합니다.</td>
            <td className="text-center">나요</td>
            <td className="text-center">2023.10.19</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SearchCommunity;
