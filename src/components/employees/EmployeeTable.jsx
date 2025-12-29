function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Employee No</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Extension</th> 
          <th>Email</th>
          <th>Office Code</th> 
          <th>Report To</th> 
          <th>Job Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.employeeNumber}>
            <td>{emp.employeeNumber}</td>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td>{emp.extension}</td>
             <td>{emp.email}</td>
            <td>{emp.officeCode}</td>
            <td>{emp.reportsTo}</td>
            <td>{emp.jobTitle}</td>
            <td>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => onEdit(emp)}
              >
                Update
              </button>
            </td>
            <td>
             <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(emp)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
