function StatusBadge({ status }) {
  return <span className={`status status-${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
}

export default function EmployeeTable({ employees }) {
  if (employees.length === 0) {
    return <div className="empty-state" role="status">No employees found. Try a different search or filter.</div>
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Department</th>
            <th>Location</th>
            <th>Status</th>
            <th className="salary">Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="employee-cell">
                  <div className="avatar" aria-hidden="true">{employee.name.charAt(0)}</div>
                  <div>
                    <strong>{employee.name}</strong>
                    <small>ID: {employee.id}</small>
                  </div>
                </div>
              </td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>{employee.location}</td>
              <td><StatusBadge status={employee.status} /></td>
              <td className="salary">₹{employee.salary.toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
