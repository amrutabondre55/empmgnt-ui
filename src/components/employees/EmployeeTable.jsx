function EmployeeTable({ employees }) {
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
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.employeeNumber}>
            <td>{emp.employeeNumber}</td>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td>{emp.extension}</td>
            <td>{emp.officeCode}</td>
            <td>{emp.reportsTo}</td>
            <td>{emp.jobTitle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeTable;
