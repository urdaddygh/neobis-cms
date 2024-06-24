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
    fetchAPI.get(`users/profile/me/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),

  getApplicationByStatus: (data, page=1) =>
    fetchAPI.get(`application/?status=${data}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
    getApplicationForPagination: (data) =>
      fetchAPI.get(`${data}`, {
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
  getTeacherById: (data) =>
    fetchAPI.get(`teachers/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
    getDirectionById: (data) =>
    fetchAPI.get(`directions/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
    deleteDirectionById: (data) =>
    fetchAPI.delete(`directions/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getMenegerById: (data) =>
    fetchAPI.get(`office_managers/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getStudentById: (data) =>
    fetchAPI.get(`students/${data}/`, {
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
  deleteStudentById: (data) =>
    fetchAPI.delete(`students/${data}/`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  addToStudentById: (data) =>
    fetchAPI.post(`application/student/add/${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  archiveApplicationById: (data) =>
    fetchAPI.post(`application/user/archive/${data}`, {
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
    putDirectionById: (data) =>
    fetchAPI.put(`directions/${data.id}/`, data.values, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  putStudentById: (data) =>
    fetchAPI.put(`students/${data.id}/`, data.formData, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  putTeacherById: (data) =>
    fetchAPI.put(`teachers/${data.id}/`, data.formData, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  putMenegerById: (data) =>
    fetchAPI.put(`office_managers/${data.id}/`, data.formData, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getApplicationBySearch: (data) =>
    fetchAPI.get(
      `application/global-search/?q=${data.q}&model_type=application`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access")}`,
        },
      }
    ),

  getEmployee: () =>
    fetchAPI.get(`users/all_staff/?limit=5&is_archive=False`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getStudents: () =>
    fetchAPI.get(`students/?limit=5&is_archive=False`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
    getStudentsForPagination: (data) =>
      fetchAPI.get(`${data}`, {
        headers: {
          Authorization: `Bearer ${getCookie("access")}`,
        },
      }),
    getArchiveStudents: () =>
    fetchAPI.get(`students/?limit=5&is_archive=True`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
    getArchiveEmployee: () =>
    fetchAPI.get(`users/all_staff/?limit=5&is_archive=True`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
    unarchiveApplicationById: (data) =>
    fetchAPI.post(`application/user/unarchive/${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getEmployeeById: (data) =>
    fetchAPI.get(`users/all_staff/${data}/?limit=5`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getEmployeeBySearch: (data) =>
    fetchAPI.get(`application/global-search/?q=${data.q}&model_type=teacher`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getStudentsBySearch: (data) =>
    fetchAPI.get(`application/global-search/?q=${data.q}&model_type=student`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getTeachers: () =>
    fetchAPI.get(`teachers/?limit=5&is_archive=False`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  getMeneger: () =>
    fetchAPI.get(`office_managers/?limit=5&is_archive=False`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  deleteTeachers: (data) =>
    fetchAPI.delete(`teachers/${data}`, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  deleteMeneger: (data) =>
    fetchAPI.delete(`office_managers/${data}`, {
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
    getArchiveGroups: () =>
    fetchAPI.get(`groups/?is_archive=True&limit=10`, {
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
  createStudent: (data) =>
    fetchAPI.post(`students/`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  createGroup: (data) =>
    fetchAPI.post(`groups`, data, {
      headers: {
        Authorization: `Bearer ${getCookie("access")}`,
      },
    }),
  createDirection: (data) =>
    fetchAPI.post(`directions/`, data, {
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
