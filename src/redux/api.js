import axios from "axios";
import {
  getCookie,
  removeCookie,
  setCookie,
} from "../utils/cookieFunction/cookieFunction";

const access = getCookie("access");

const baseConfig = {
  baseURL: "https://neobook.online/crm_neolabs",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${getCookie("access")}`,
  },
};

const fetchAPI = axios.create(baseConfig);

const fetchAPIImage = axios.create({
  ...baseConfig,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization: `Bearer ${access}`,
  },
});

const fetchNoTokenAPI = axios.create({
  baseURL: "https://neobook.online/crm_neolabs/",
  headers: {
    "Content-type": "application/json",
  },
});

const handleUnauthorizedError = async (error) => {
  if (error.response.status === 401) {
    try {
      const res = await requests.getRefreshToken({
        refresh: getCookie("refresh"),
      });
      setCookie("access", res.data.access);
      console.log(res);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access}`;
      return axios(error.config);
    } catch (refreshError) {
      removeCookie("access");
      removeCookie("refresh");
      window.location.href = "/";
    }
  }
  return Promise.reject(error);
};

[fetchAPI, fetchAPIImage].forEach((instance) => {
  instance.interceptors.response.use(undefined, handleUnauthorizedError);
});

export const requests = {
  authApi: (data) => fetchNoTokenAPI.post("users/login/", data),
  getRefreshToken: (data) => fetchNoTokenAPI.post("users/login/refresh/", data),
  forgotPassword: (data) =>
    fetchNoTokenAPI.post("users/forgot-password/", data),
  changePassword: (data) =>
    fetchAPI.post("users/change-password/", data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  sendCodeApi: (data) =>
    fetchAPI.put("users/add-phone/", data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  verifyPhoneApi: (data) =>
    fetchAPI.post("users/verify-phone/", data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  registerApi: (data) => fetchNoTokenAPI.post("users/register/", data),
  checkUser: (data) => fetchNoTokenAPI.post("users/check-user/", data),
  resetPassApi: (data) =>
    fetchNoTokenAPI.post(`users/reset-password/${data.id}/`, data.values),
  updateUserInfo: (data) =>
    fetchAPIImage.put("users/profile/update/", data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getInfoOfUser: () =>
    fetchAPI.get(`users/me/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),

  getApplicationByStatus: (data) =>
    fetchAPI.get(`application/?status=${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getApplicationById: (data) =>
    fetchAPI.get(`application/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  deleteApplicationById: (data) =>
    fetchAPI.delete(`application/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  putApplicationById: (data) =>
    fetchAPI.put(`application/${data.id}/`, data.formData, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getApplicationBySearch: (data) =>
    fetchAPI.get(`application/global-search/?q=${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getEmployee: () =>
    fetchAPI.get(`users/all_staff/?limit=10`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getEmployeeById: (data) =>
    fetchAPI.get(`users/all_staff/${data}/?limit=10`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getEmployeeBySearch: (data) =>
    fetchAPI.get(`users/all_staff/?search=${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getTeachers: () =>
    fetchAPI.get(`teachers/?limit=10`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getDirections: () =>
    fetchAPI.get(`directions/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getSource: () =>
    fetchAPI.get(`source/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getGroups: () =>
    fetchAPI.get(`groups/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  createApplicationCard: (data) =>
    fetchAPI.post(`application/create/`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  addTeacher: (data) =>
    fetchAPI.post(`users/register/teacher/`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getProductsForPagination: (data) =>
    fetchAPI.get(`${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getLikedProductsForPagination: (data) =>
    fetchAPI.get(`${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  changeProduct: (data) =>
    fetchAPIImage.put(`products/${data.id}/`, data.formData, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  deleteProduct: (data) =>
    fetchAPI.delete(`products/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  addProduct: (data) =>
    fetchAPIImage.post("products/", data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  unLikeProduct: (data) =>
    fetchAPI.delete(`products/unlike/${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
};
