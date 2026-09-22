export default function SearchBar({ search, setSearch, status, setStatus }) {
  return (
    <div className="toolbar">
      <label className="search-box">
        <span className="sr-only">Search employees</span>
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Search by name, role, department..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </label>

      <label className="filter-box">
        <span>Status</span>
        <select aria-label="Filter by status" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>
    </div>
  )
}
