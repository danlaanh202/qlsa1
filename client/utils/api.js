import axios from "axios";

import {
  clearToken,
  getAccessToken,
  setAccessTokenCookie,
} from "./cookieUtils";

export const client = axios.create({
  baseURL: "http://localhost:1716/api",
  timeout: 30000,
});

export const api = async ({ url, method = "GET", body }) => {
  const { data } = await client.request({ url, method, data: body });
  return data;
};

export const handleLogin = async (username, password) => {
  const accessToken = await api({
    url: "/auth/login",
    method: "POST",
    body: { username, password },
  });
  setAccessTokenCookie(accessToken);
};

export const fetchAuthenticatedApi = async ({
  url,
  data = {},
  method = "GET",
  params = {},
}) => {
  try {
    const accessToken = getAccessToken();
    const resp = await client.request({
      headers: {
        accept: "application/json",
        "X-Auth-Token": accessToken,
      },
      url,
      method,
      data,
      params,
    });
    return resp.data;
  } catch (e) {
    if ([401, 403].includes(e.response.status)) {
      clearToken();
      window.location.replace("/login");
    }
    throw new Error("");
  }
};
