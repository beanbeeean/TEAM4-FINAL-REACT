import React from "react";
import styles from "./css/Community.module.css";

const Community = () => {
    return (
        <div className={styles.table_wrap}>
            <table className={styles.board_table}>
                <thead>
                    <tr>
                        <th className="text-center">구분</th>
                        <th className="text-center">제목</th>
                        <th className="text-center">작성자</th>
                        <th className="text-center">작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">도서추천</td>
                        <td>이 책을 추천합니다.</td>
                        <td className="text-center">나요</td>
                        <td className="text-center">2023.10.19</td>
                    </tr>
                    <tr>
                        <td className="text-center">도서추천</td>
                        <td>이 책을 추천합니다.</td>
                        <td className="text-center">나요</td>
                        <td className="text-center">2023.10.19</td>
                    </tr>
                    <tr>
                        <td className="text-center">도서추천</td>
                        <td>이 책을 추천합니다.</td>
                        <td className="text-center">나요</td>
                        <td className="text-center">2023.10.19</td>
                    </tr>
                    <tr>
                        <td className="text-center">도서추천</td>
                        <td>이 책을 추천합니다.</td>
                        <td className="text-center">나요</td>
                        <td className="text-center">2023.10.19</td>
                    </tr>
                    <tr>
                        <td className="text-center">도서추천</td>
                        <td>이 책을 추천합니다.</td>
                        <td className="text-center">나요</td>
                        <td className="text-center">2023.10.19</td>
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default Community;