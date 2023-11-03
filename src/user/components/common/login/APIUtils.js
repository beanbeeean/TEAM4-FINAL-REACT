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
    console.error("Error response:", error);
    return Promise.reject(error); // 반드시 에러를 reject 해야 합니다.
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

export function login(loginRequest) {
  return axiosInstance.post("/auth/signin", loginRequest, {
    withCredentials: true,
  });
}

export function logout(loginRequest) {
  return axiosInstance.post("/auth/signout", loginRequest);
}

export function signup(signupRequest) {
  return axiosInstance.post("/auth/signup", signupRequest);
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
