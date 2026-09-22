import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import EmployeeTable from '../components/EmployeeTable'

describe('EmployeeTable', () => {
  it('renders employee details and status', () => {
    const data = [
      { id: 1, name: 'Test User', role: 'Engineer', department: 'Engineering', location: 'Delhi', status: 'Active', salary: 50000 },
    ]

    render(<EmployeeTable employees={data} />)

    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Engineer')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('₹50,000')).toBeInTheDocument()
  })

  it('renders an empty state for an empty list', () => {
    render(<EmployeeTable employees={[]} />)

    expect(screen.getByRole('status')).toHaveTextContent('No employees found')
  })
})
