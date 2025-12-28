import axiosClient from "../api/axiosClient";

export const getAllEmployees = () => {
  return axiosClient.get("/employees");
};

export const downloadEmployeeReport = () => {
  return axiosClient.get("/employees/report", {
    responseType: "blob",   // 🔴 VERY IMPORTANT
  });
};
