// React hooks for state management and lifecycle methods
import { useEffect, useState } from "react";
import EmployeeTable from "../components/employees/EmployeeTable";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import EditEmployeeModal from "../components/employees/EditEmployeeModal";
import DeleteEmployeeModal from "../components/employees/DeleteEmployeeModal";
// API service methods
import {
  getAllEmployees,
  downloadEmployeeReport ,deleteEmployee 
} from "../services/employeeService";

function Employees() {
   // ================= STATE VARIABLES =================

  // Stores list of employees fetched from backend
  const [employees, setEmployees] = useState([]);

  // Controls loading state (API calls)
  const [loading, setLoading] = useState(true);

  // Stores error messages
  const [error, setError] = useState("");

  // Controls Add Employee modal visibility
  const [showAddModal, setShowAddModal] = useState(false);

   // Controls Excel download loading state
  const [downloading, setDownloading] = useState(false);

   // Controls Edit Employee modal visibility
  const [showEditModal, setShowEditModal] = useState(false);

   // Stores selected employee for edit/delete operations
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Controls Delete Employee modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);

   // ================= API CALLS =================

  // Fetch all employees from backend
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

   // Load employees when component mounts (page load)
  useEffect(() => {
    loadEmployees();
  }, []);

   // ================= HANDLERS =================

  // Download employee Excel report
  const handleDownload = () => {
    setDownloading(true);

    downloadEmployeeReport()
      .then((response) => {
         // Create downloadable file from API response
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

   // ================= EDIT EMPLOYEE =================

  // Open edit modal and set selected employee
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

   // ================= DELETE EMPLOYEE =================

  // Open delete confirmation modal
  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setError("");
    setShowDeleteModal(true);
  };

  // Call DELETE API and remove employee from UI
  const handleDelete = async () => {
    try {
      setLoading(true);
      // Call backend DELETE API
      await deleteEmployee(selectedEmployee.employeeNumber);

      // Remove deleted employee from state (UI update without reload)
      setEmployees(prev =>
        prev.filter(
          emp => emp.employeeNumber !== selectedEmployee.employeeNumber
        )
      );
      // Close delete modal
      setShowDeleteModal(false);
    } catch (err) {
      setError("Failed to delete employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= UI STATES =================

  // Show loading message
  if (loading) {
    return <p>Loading employees...</p>;
  }

  // Show error message
  if (error) {
    return <p className="text-danger">{error}</p>;
  }

   // ================= RENDER UI =================
  return (
    <>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employees</h2>

        <div>
          {/* Download Excel Button */}
          <button
            className="btn btn-success me-2"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? "Downloading..." : "Download Report"}
          </button>

          {/* Add Employee Button */}
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table */}
      {/* <EmployeeTable employees={employees} /> */}

      {/* Add Employee Modal */}
      <AddEmployeeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadEmployees}
      />

        {/* Employee Table with Edit & Delete actions */}
      <EmployeeTable employees={employees} 
       onEdit={handleEdit}
       onDelete={openDeleteModal}
      />

      <EditEmployeeModal
        show={showEditModal}
        employee={selectedEmployee}
        onClose={() => setShowEditModal(false)}
        onSuccess={loadEmployees}
      />

       {/* Delete Employee Modal */}
       <EmployeeTable
        employees={employees}
        onEdit={() => {}}
        onDelete={openDeleteModal}
      />

      <DeleteEmployeeModal
        show={showDeleteModal}
        employee={selectedEmployee}
        onConfirm={handleDelete}
        //  Employee deleted successfully
        onCancel={() => setShowDeleteModal(false)}   
        loading={loading}
        error={error}
      />
    </>
  );
}

export default Employees;

