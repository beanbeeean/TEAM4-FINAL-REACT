import React, { useEffect, useState } from "react";
import styles from "../../css/common/SearchMain.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { bookActions } from "../../../redux/book/slices/bookSlice";
import { communityActions } from "../../../redux/community/slices/communitySlice";
import { commonActions } from "../../../redux/common/slices/commonSlice";

const SearchMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let keyword = useParams().keyword;
  console.log("keyword search ======> : ", keyword);

  const [books, setBooks] = useState([]);
  const [communities, setCommunities] = useState([]);

  const { userDtos } = useSelector((state) => state.user);

  const goBookPage = () => {
    dispatch(bookActions.fetchSearchBook({ keyword: "" }));
    dispatch(commonActions.setBookMenu("all"));
    navigate(`/checkout_books`);
  };

  const goCommunityPage = (category) => {
    dispatch(communityActions.fetchSearchCommunity({ keyword: "" }));
    dispatch(commonActions.setCommunityMenu(category));
    navigate("/community");
  };

  const dateFormat = (chk_date) => {
    const date = new Date(chk_date);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    axios
      .get(`/checkout_books/home`, {
        params: {
          category: "",
          keyword: keyword,
        },
      })
      .then((response) => {
        const bookDtos = response.data;
        console.log("bookDtos", bookDtos.dtos);
        dispatch(bookActions.fetchSearchBook({ bookDtos, keyword }));
        setBooks(response.data.dtos);
      })
      .catch((error) => console.log(error));

    axios
      .get(`/community`, {
        params: {
          keyword: keyword,
          category: "",
          searchOption: "",
        },
      })
      .then((response) => {
        const communityDtos = response.data;
        console.log("communityDtos", communityDtos);
        dispatch(
          communityActions.fetchSearchCommunity({
            communityDtos,
            keyword,
          })
        );
        setCommunities(communityDtos.communityDtos);
      })
      .catch((error) => console.log(error));
  }, [keyword]);

  return (
    <div>
      <div className={styles.first_wrap}>
        <div className={styles.mini_nav}>
          <span className={styles.title}>도서</span>
        </div>
        <div className={styles.search_books}>
          {books.length == 0 ? (
            <div className={`${styles.no_result} ${styles.book_result}`}>
              "{keyword}"에 대한 검색 결과가 없습니다. <br />
              <span onClick={goBookPage}>도서 페이지로 이동</span>
            </div>
          ) : (
            <>
              {books.map((book, idx) => {
                if (idx < 5) {
                  return (
                    <div className={styles.book_wrap}>
                      <Link to={`/checkout_books/${book.b_no}`}>
                        <img className={styles.book_img} src={book.b_cover} />
                        <div className={styles.book_content_wrap}>
                          <span className={styles.book_title}>
                            {book.b_title}
                          </span>
                          <br />
                          <span className={styles.author}>
                            {book.b_author} 저 |{" "}
                          </span>
                          <span className={styles.publisher}>
                            {book.b_publisher}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}

              <Link to="/checkout_books">
                <span className={`${styles.block} ${styles.more}`}>
                  +더보기
                </span>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className={styles.second_wrap}>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>자유게시판</span>
            <li onClick={() => goCommunityPage(1)} className={styles.more}>
              + 더보기
            </li>
          </div>
          <div className={styles.commu_wrap}>
            <table className={styles.commu_table}>
              <thead>
                <tr>
                  <th className="text-center">구분</th>
                  <th className="text-center">제목</th>
                  <th className="text-center">조회수</th>
                  <th className="text-center">작성자</th>
                  <th className="text-center">작성일</th>
                </tr>
              </thead>
              <tbody>
                {communities.filter((e) => e.c_category === 1).length == 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.no_result}>
                      "{keyword}"에 대한 검색 결과가 없습니다. <br />
                      <span onClick={() => goCommunityPage(1)}>
                        커뮤니티 페이지로 이동
                      </span>
                    </td>
                  </tr>
                ) : (
                  communities
                    .filter((e) => e.c_category === 1)
                    .map((community, idx) => {
                      if (idx < 5) {
                        return (
                          <tr>
                            <td className="text-center">
                              {community.c_category == 1
                                ? "자유"
                                : community.c_category == 2
                                ? "도서추천"
                                : "스터디원 모집"}
                            </td>
                            <Link to={`/community/${community.c_no}`}>
                              <td>{community.c_title}</td>
                            </Link>
                            <td className="text-center">{community.c_hit}</td>
                            <td className="text-center">
                              {
                                userDtos.filter(
                                  (e) => e.u_email == community.u_email
                                )[0].u_name
                              }
                            </td>
                            <td className="text-center">
                              {dateFormat(community.c_reg_date)}
                            </td>
                          </tr>
                        );
                      }
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>도서 추천</span>
            <li className={styles.more} onClick={() => goCommunityPage(2)}>
              + 더보기
            </li>
          </div>
          <div className={styles.commu_wrap}>
            <table className={styles.commu_table}>
              <thead>
                <tr>
                  <th className="text-center">구분</th>
                  <th className="text-center">제목</th>
                  <th className="text-center">조회수</th>
                  <th className="text-center">작성자</th>
                  <th className="text-center">작성일</th>
                </tr>
              </thead>
              <tbody>
                {communities.filter((e) => e.c_category === 2).length == 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.no_result}>
                      "{keyword}"에 대한 검색 결과가 없습니다. <br />
                      <span onClick={() => goCommunityPage(2)}>
                        커뮤니티 페이지로 이동
                      </span>
                    </td>
                  </tr>
                ) : (
                  communities
                    .filter((e) => e.c_category === 2)
                    .map((community, idx) => {
                      if (idx < 5) {
                        return (
                          <tr>
                            <td className="text-center">
                              {community.c_category == 1
                                ? "자유"
                                : community.c_category == 2
                                ? "도서추천"
                                : "스터디원 모집"}
                            </td>
                            <Link to={`/community/${community.c_no}`}>
                              <td>{community.c_title}</td>
                            </Link>
                            <td className="text-center">{community.c_hit}</td>
                            <td className="text-center">
                              {
                                userDtos.filter(
                                  (e) => e.u_email == community.u_email
                                )[0].u_name
                              }
                            </td>
                            <td className="text-center">
                              {dateFormat(community.c_reg_date)}
                            </td>
                          </tr>
                        );
                      }
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${styles.community} ${styles.block}`}>
          <div className={styles.mini_nav}>
            <span className={styles.title}>스터디원 모집</span>
            <Link to="/community">
              <li className={styles.more} onClick={() => goCommunityPage(3)}>
                + 더보기
              </li>
            </Link>
          </div>
          <div className={styles.commu_wrap}>
            <table className={styles.commu_table}>
              <thead>
                <tr>
                  <th className="text-center">구분</th>
                  <th className="text-center">제목</th>
                  <th className="text-center">조회수</th>
                  <th className="text-center">작성자</th>
                  <th className="text-center">작성일</th>
                </tr>
              </thead>
              <tbody>
                {communities.filter((e) => e.c_category === 3).length == 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.no_result}>
                      "{keyword}"에 대한 검색 결과가 없습니다. <br />
                      <span onClick={() => goCommunityPage(3)}>
                        커뮤니티 페이지로 이동
                      </span>
                    </td>
                  </tr>
                ) : (
                  communities
                    .filter((e) => e.c_category === 3)
                    .map((community, idx) => {
                      if (idx < 5) {
                        return (
                          <tr>
                            <td className="text-center">
                              {community.c_category == 1
                                ? "자유"
                                : community.c_category == 2
                                ? "도서추천"
                                : "스터디원 모집"}
                            </td>
                            <Link to={`/community/${community.c_no}`}>
                              <td>{community.c_title}</td>
                            </Link>
                            <td className="text-center">{community.c_hit}</td>
                            <td className="text-center">
                              {
                                userDtos.filter(
                                  (e) => e.u_email == community.u_email
                                )[0].u_name
                              }
                            </td>
                            <td className="text-center">
                              {dateFormat(community.c_reg_date)}
                            </td>
                          </tr>
                        );
                      }
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMain;
