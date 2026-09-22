import { useMemo, useState } from 'react'
import Header from './components/Header'
import StatCard from './components/StatCard'
import SearchBar from './components/SearchBar'
import EmployeeTable from './components/EmployeeTable'
import { employees as employeeData } from './data/employees'

function App() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase()

    return employeeData.filter((employee) => {
      const matchesSearch = [employee.name, employee.role, employee.department, employee.location]
        .some((value) => value.toLowerCase().includes(query))
      const matchesStatus = status === 'All' || employee.status === status
      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const activeCount = employeeData.filter((employee) => employee.status === 'Active').length
  const departments = new Set(employeeData.map((employee) => employee.department)).size
  const monthlyPayroll = employeeData.reduce((total, employee) => total + employee.salary, 0)

  return (
    <div className="app-shell">
      <Header />

      <main>
        <section className="stats-grid" aria-label="Employee statistics">
          <StatCard label="Total Employees" value={employeeData.length} hint="Across all departments" />
          <StatCard label="Active Employees" value={activeCount} hint="Currently working" />
          <StatCard label="Departments" value={departments} hint="Teams represented" />
          <StatCard label="Monthly Payroll" value={`₹${monthlyPayroll.toLocaleString('en-IN')}`} hint="Illustrative gross payroll" />
        </section>

        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">PEOPLE DIRECTORY</p>
              <h2>Employees</h2>
            </div>
            <span className="result-count">{filteredEmployees.length} result{filteredEmployees.length === 1 ? '' : 's'}</span>
          </div>

          <SearchBar search={search} setSearch={setSearch} status={status} setStatus={setStatus} />
          <EmployeeTable employees={filteredEmployees} />
        </section>
      </main>

      <footer>
        <span>EmployeeHub • React CI POC</span>
        <span>Unit tests → CI quality gate → build</span>
      </footer>
    </div>
  )
}

export default App
