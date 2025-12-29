import axiosClient from "../api/axiosClient";

export const getAllEmployees = () => {
  return axiosClient.get("/employees");
};

//put
export const createEmployee = (employee) => {
  return axiosClient.post("/employees", employee);
};

//post
export const updateEmployee = (employeeNumber, employee) =>
  axiosClient.put(`/employees/${employeeNumber}`, employee);

//delete
export const deleteEmployee = (employeeNumber) =>
  axiosClient.delete(`/employees/${employeeNumber}`);

export const downloadEmployeeReport = () => {
  return axiosClient.get("/employees/report", {
    responseType: "blob",   // 🔴 VERY IMPORTANT
  });
};
