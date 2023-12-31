import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN } from "./";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../../redux/user/slices/userSlice";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosImgInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const allCookies = document.cookie;
    console.log("allCookies" + allCookies);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("response.error : ", error.response.status);
    if (error.response && error.response.status === 403) {
      console.error("response403: ", error.response.status);
    } else if (error.response && error.response.status === 401) {
      console.log("Response !!:", error.response);
      return refresh()
        .then((response) => {
          console.error("response401: ", response);
          const newAccessToken = response.data.accessToken;
          localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          console.error("response401: ");
          return axios(error.config);
        })
        .catch((error2) => {
          console.error("Error fetching data: ", error2);
        });
    } else {
      console.error("Error fetching data2: ", error);
      return Promise.reject(error); // 반드시 에러를 reject 해야 합니다.
    }
  }
);

axiosImgInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    console.log(config);
    return config;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const dispatch = useDispatch();
      dispatch(userLogout());
    }
    return Promise.reject(error);
  }
);

axiosImgInstance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("Error response:", error);
    return Promise.reject(error); // 반드시 에러를 reject 해야 합니다.
  }
);

export function getCurrentUser() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return axiosInstance.get("/auth/");
}

export function refresh(tokenRefreshRequest) {
  return axiosInstance.post("/auth/refresh", tokenRefreshRequest, {
    withCredentials: true,
  });
}

export function login(loginRequest) {
  return axiosInstance.post("/auth/signin", loginRequest, {
    withCredentials: true,
  });
}

export function logout() {
  return axiosInstance.get("/auth/signout", {
    withCredentials: true,
  });
}

export function signup(signupRequest) {
  return axiosInstance.post("/auth/signup", signupRequest);
}

export function myDelete() {
  return axiosInstance.get("/auth/delete");
}

export function myPage() {
  return axiosInstance.get("/user/myPage");
}

export function userUpdate(user) {
  return axiosInstance.post("/user/userUpdate", user);
}

export function userUpload(img) {
  return axiosImgInstance.post("/user/upload", img);
}

export function chkRoom(space) {
  return axiosInstance.post("/study/room", space);
}

export function reservationRoom(reservationRequest) {
  return axiosInstance.post("/study/reservation", reservationRequest);
}

export function reservationRead(reservationRequest) {
  return axiosInstance.post("/read/reservation", reservationRequest);
}

export function myPageRead(reservationRequest) {
  return axiosInstance.post("/user/myReadReservation", reservationRequest);
}

export function myPageStudy(reservationRequest) {
  return axiosInstance.post("/user/myStudyReservation", reservationRequest);
}

export function adminReadRoomLog(adminRequest) {
  return axiosInstance.post("/admin/reservation/readRoom", adminRequest);
}

export function adminStudyRoomLog(adminRequest) {
  return axiosInstance.post("/admin/reservation/studyRoom", adminRequest);
}

export function adminReadRoom(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.post("/admin/reservation/readRoom", adminRequest);
}

export function adminStudyRoom(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.post("/admin/reservation/room", adminRequest);
}

export function adminSeat(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.post("/admin/reservation/seat", adminRequest);
}

// 커뮤니티 리스트
export function userCommunity(communityReq) {
  return axiosInstance.get("/community", communityReq);
}

// 커뮤니티 디테일
export function userCommunityDetail(communityId) {
  return axiosInstance.get(`/community/${communityId}`);
}

// 커뮤니티 작성
export function userCommunityWrite(communityReq) {
  return axiosInstance.post("/community/write", communityReq);
}

// 커뮤니티 수정
export function userCommunityModify(communityReq, id) {
  return axiosInstance.post(`/community/community_modify/${id}`, communityReq);
}

// 댓글 작성
export function userCommentWrite(commentReq, id) {
  return axiosInstance.post("/community/write_comment", commentReq);
}

// 댓글 수정
export function userCommentModify(commentReq) {
  return axiosInstance.post("/community/modify_comment", commentReq);
}

// 댓글 삭제
export function userCommentDelete(commentReq) {
  return axiosInstance.post("/community/delete_comment", commentReq);
}

// 채팅 리스트
export function userChatList(userReq) {
  return axiosInstance.get("/chat/list", userReq);
}

// 채팅방 개설
export function createChatRoom(roomReq) {
  return axiosInstance.post("/chat/createroom", roomReq);
}

// 채팅방 이름 중복체크
export function isDuplicateChatRoom(roomReq) {
  return axiosInstance.post("/chat/duplicate", roomReq);
}

// 채팅방 유저 리스트
export function userChatUserList(roomReq) {
  return axiosInstance.get("/chat/userlist", roomReq);
}

// 반납 책 리스트
export function chkedBookList(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get(
    "/checkout_books/checkout_book_list",
    userBookRequest
  );
}

// 책 대여
export function chkoutBook(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get("/checkout_books/checkout", userBookRequest);
}

// 책 디테일
export function getChkBookDetail(bNo) {
  return axiosInstance.get(`/checkout_books/${bNo}`);
}

// 책 반납
export function returnBook(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get("/admin/management/return_book", userBookRequest);
}

// mypage 책 리스트
export function myPageChkBookHome(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get("/checkout_books/home", userBookRequest);
}

// admin user관리
export function userManagement(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get("/admin/management/memberManagement", adminRequest);
}

// admin admin리스트
export function adminList(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get("/admin/management/change_user_state", adminRequest);
}

// admin 대여한 유저 리스트
export function adminChkBookUserListModal(bNo) {
  console.log(bNo);
  return axiosInstance.get(`/admin/management/checkout_book_user_list${bNo}`);
}

// admin 대여한 유저 리스트
export function adminChkBookUserList(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get(`/admin/management/return_book`, adminRequest);
}

// admin Book State 변경
export function adminBookState(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get("/admin/management/change_book_state", adminRequest);
}

// admin Book 관리
export function adminBookManagement(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get("/admin/management/bookManagement", adminRequest);
}

// admin Community Management
export function adminCommunityManagement(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get(
    "/admin/management/communityManagement",
    adminRequest
  );
}

// admin Community State 변경
export function adminCommunityState(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.get(
    "/admin/management/change_community_state",
    adminRequest
  );
}

export function readSeat() {
  return axiosInstance.get("/read/seat");
}

export function getCommunity() {
  return axiosInstance.get("/community");
}

export function checkoutBooksHome(bookParam) {
  return axiosInstance.get("/checkout_books/home", bookParam);
}

export function getComment(commentReq) {
  return axiosInstance.get("/community/get_comments", commentReq);
}

// 게시글 삭제
export function userCommunityDelete(communityId) {
  return axiosInstance.post(`/community/delete${communityId}`);
}

export function getCommunityChatRoom(communityReq) {
  return axiosInstance.get(
    "http://libooks-web-was-alb-922008251.ap-northeast-2.elb.amazonaws.com:8080/chat/room_cno",
    communityReq
  );
}
