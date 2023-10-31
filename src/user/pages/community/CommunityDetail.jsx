import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../css/community/CommunityDetail.module.css";

const CommunityDetail = () => {
  let id = useParams().id;
  console.log("id : ", id);

  const [content, setContent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/community/${id}`)
      .then((response) => {
        setContent(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const deleteCommunity = () => {
    axios
      .post(`/community/delete${id}`)
      .then((response) => {
        setContent(response.data);
        alert("삭제가 완료되었습니다.");
        navigate(-1);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.section_wrap}>
      {content != null && (
        <div>
          <div className={styles.view_content}>
            <h1 className={styles.content_title}>{content.c_title}</h1>
            <span className={styles.user_name}>{content.u_no}</span> |{" "}
            <span className={styles.content_reg_date}>
              {content.c_reg_date}
            </span>
            <span className={styles.modify_delete}>
              <span>
                <a className={styles.delete_btn} onClick={deleteCommunity}>
                  삭제하기
                </a>
              </span>
              <span>&nbsp;|&nbsp;</span>
              <span>
                <Link to={`/community_modify/${id}`}>수정하기</Link>
              </span>
            </span>
            <span className={styles.modify_delete}></span>
            <div
              className={styles.content_area}
              dangerouslySetInnerHTML={{ __html: content.c_content }}
            ></div>
            <div className={styles.hit_wrap}>
              <span>조회 수 </span>
              <span className={styles.hit_num}>{content.c_hit}</span>
            </div>
          </div>
          <div className={styles.comment_wrap}>
            <hr />
            <p>댓글</p>
            <div className={styles.user_input}>
              <input
                className={styles.input_comment}
                type="text"
                placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. :)"
              />
              <input
                type="button"
                className={styles.submitBtn}
                value="입력"
                // onclick={registReply}
              />
            </div>
            <div className={styles.user_input}>
              <input
                type="text"
                placeholder="로그인 후 이용가능한 서비스입니다. :)"
                readonly
              />
              <input type="button" value="입력" disabled />
            </div>

            <table className={styles.comments}>
              <tbody></tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityDetail;
