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
      alert("정지된 사용자입니다.");
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

export function logout(tokenRefreshRequest) {
  return axiosInstance.post("/auth/signout", tokenRefreshRequest, {
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
  return axiosInstance.post("/admin/reservation/studyRoom", adminRequest);
}

export function adminSeat(adminRequest) {
  console.log(adminRequest);
  return axiosInstance.post("/admin/reservation/seat", adminRequest);
}
// 커뮤니티 리스트
export function userCommunity(communityReq) {
  return axiosInstance.get("/community", communityReq);
}

// 커뮤니티 작성
export function userCommunityWrite(communityReq) {
  return axiosInstance.post("/community/write", communityReq);
}

// 커뮤니티 수정
export function userCommunityModify(communityReq, id) {
  return axiosInstance.post(`/community/community_modify/${id}`, communityReq);
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

export function chkedBookList(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get(
    "/checkout_books/checkout_book_list",
    userBookRequest
  );
}

export function chkoutBook(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get("/checkout_books/checkout", userBookRequest);
}

export function returnBook(userBookRequest) {
  console.log(userBookRequest);
  return axiosInstance.get("/admin/management/return_book", userBookRequest);
}
