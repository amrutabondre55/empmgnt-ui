import { useEffect, useState } from "react";
import { getAllEmployees, downloadEmployeeReport  } from "../services/employeeService";
import EmployeeTable from "../components/employees/EmployeeTable";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllEmployees()
      .then(res => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load employees");
        setLoading(false);
      });
  }, []);

   const handleDownload = () => {
    downloadEmployeeReport()
      .then(response => {

        // Create blob URL
        const url = window.URL.createObjectURL(
          new Blob([response.data])
        );

        // Create hidden link
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "employee-report.xlsx");

        document.body.appendChild(link);
        link.click();

        link.remove();
      })
      .catch(() => {
        alert("Failed to download report");
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
      <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>
        <button className="btn btn-success" onClick={handleDownload}>
          Download Report
        </button>
      </div>

      <EmployeeTable employees={employees} />
    </>
  );
}

export default Employees;
