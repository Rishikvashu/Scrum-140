import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('EmployeeHub', () => {
  it('renders the dashboard and employee directory', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'EmployeeHub' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Employees' })).toBeInTheDocument()
    expect(screen.getByText('Aarav Sharma')).toBeInTheDocument()
  })

  it('shows the correct total employee count', () => {
    render(<App />)

    expect(screen.getByText('Total Employees')).toBeInTheDocument()
    expect(screen.getByText('8', { selector: 'strong' })).toBeInTheDocument()
  })

  it('filters employees by search text', () => {
    render(<App />)
    const search = screen.getByRole('searchbox', { name: 'Search employees' })

    fireEvent.change(search, { target: { value: 'DevOps' } })

    expect(screen.getByText('Kabir Khan')).toBeInTheDocument()
    expect(screen.queryByText('Aarav Sharma')).not.toBeInTheDocument()
  })

  it('filters employees by status', () => {
    render(<App />)
    const statusFilter = screen.getByRole('combobox', { name: 'Filter by status' })

    fireEvent.change(statusFilter, { target: { value: 'On Leave' } })

    expect(screen.getByText('Rohan Verma')).toBeInTheDocument()
    expect(screen.queryByText('Aarav Sharma')).not.toBeInTheDocument()
  })

  it('shows an empty state when no employee matches', () => {
    render(<App />)
    const search = screen.getByRole('searchbox', { name: 'Search employees' })

    fireEvent.change(search, { target: { value: 'does-not-exist' } })

    expect(screen.getByRole('status')).toHaveTextContent('No employees found')
  })
})
