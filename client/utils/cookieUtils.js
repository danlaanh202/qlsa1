import Cookies from "js-cookie";

export const getCookie = (key) => Cookies.get(key);

export const setCookie = (key, value) => {
  Cookies.set(key, value);
};

export const setAccessTokenCookie = (accessToken) => {
  Cookies.set("accessToken", accessToken, {
    expires: 15,
  });
};

export const clearToken = () => {
  Cookies.remove("accessToken");
};

export const getAccessToken = () => getCookie("accessToken");
