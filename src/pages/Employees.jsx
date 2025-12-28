
import { useEffect, useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import {
  getAllEmployees,
  downloadEmployeeReport,
} from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Load all employees
  const loadEmployees = () => {
    setLoading(true);
    getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load employees");
        setLoading(false);
      });
  };

  // Initial load
  useEffect(() => {
    loadEmployees();
  }, []);

  // Download Excel report
  const handleDownload = () => {
    setDownloading(true);

    downloadEmployeeReport()
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data])
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "employee-report.xlsx");

        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch(() => {
        alert("Failed to download report");
      })
      .finally(() => {
        setDownloading(false);
      });
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>

        <div>
          <button
            className="btn btn-success me-2"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? "Downloading..." : "Download Report"}
          </button>

          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <EmployeeTable employees={employees} />

      {/* Add Employee Modal */}
      <AddEmployeeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadEmployees}
      />
    </>
  );
}

export default Employees;

