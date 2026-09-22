export default function Header() {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">REACT CI / UNIT TESTING POC</p>
        <h1>EmployeeHub</h1>
        <p className="subtitle">A small production-style React application for demonstrating CI quality gates.</p>
      </div>
      <div className="ci-badge" aria-label="CI ready">● CI Ready</div>
    </header>
  )
}
