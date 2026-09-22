# EmployeeHub — React CI / Unit Testing POC

A complete React.js sample application created for **SCRUM-140: Application CI Design | React CI Checks Unit Testing**.

The project demonstrates:

- React.js application structure
- Search and status filtering
- Component-based UI
- Unit tests with Vitest + React Testing Library
- ESLint quality checks
- Production build with Vite
- Jenkins CI pipeline
- CI quality gate: **Lint → Unit Tests → Build**

## 1. Project structure

```text
react-ci-unit-testing-poc/
├── Jenkinsfile
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── EmployeeTable.jsx
    │   ├── Header.jsx
    │   ├── SearchBar.jsx
    │   └── StatCard.jsx
    ├── data/
    │   └── employees.js
    └── test/
        ├── App.test.jsx
        ├── EmployeeTable.test.jsx
        └── setup.js
```

## 2. Requirements

Use a modern Node.js LTS release. The Jenkins agent must have `node` and `npm` available.

Check:

```bash
node --version
npm --version
```

## 3. Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## 4. Run CI checks locally

### Lint

```bash
npm run lint
```

### Unit tests

```bash
npm test
```

### Coverage

```bash
npm run test:coverage
```

### Production build

```bash
npm run build
```

## 5. CI quality gate

The Jenkins pipeline intentionally runs checks in this order:

```text
Git Push / Pull Request
        |
        v
   Jenkins Checkout
        |
        v
   npm install
        |
        v
    npm run lint
        |
        v
      npm test
       /   \
   FAIL     PASS
    |         |
    v         v
 Pipeline   npm run build
  FAILED        |
               v
           Pipeline PASS
```

If a unit test fails, Jenkins stops before the build stage. This is the main CI quality-gate behavior demonstrated by this POC.

## 6. Jenkins setup

1. Push this project to GitHub/GitLab/Bitbucket.
2. In Jenkins create a **Pipeline** job.
3. Select **Pipeline script from SCM**.
4. Select Git and provide the repository URL.
5. Branch: `*/main` (or your default branch).
6. Script Path: `Jenkinsfile`.
7. Ensure the Jenkins agent has Node.js and npm installed.
8. Run **Build Now**.

Expected stages:

```text
Checkout
  ↓
Environment
  ↓
Install Dependencies
  ↓
Lint
  ↓
Unit Tests
  ↓
Build
```

## 7. How to demonstrate a failed CI test

For the SCRUM-140 POC, temporarily change one expected value in `src/test/App.test.jsx`.

For example, change:

```js
expect(screen.getByText('8', { selector: 'strong' })).toBeInTheDocument()
```

to:

```js
expect(screen.getByText('99', { selector: 'strong' })).toBeInTheDocument()
```

Commit and push the change. Jenkins should fail at **Unit Tests** and should not reach **Build**.

Then restore `8`, commit, and push again. Jenkins should pass the tests and continue to the build stage.

## 8. Test cases included

- Application/dashboard renders correctly
- Total employee count is displayed
- Search filters employees
- Status filter works
- Empty search result state is displayed
- Employee table renders details and status
- Empty employee table state is displayed

## 9. Recommended evidence for SCRUM-140

Capture these Jenkins screenshots/logs:

1. Successful pipeline with all stages green.
2. Unit-test output showing all tests passed.
3. Deliberately failed test showing the Unit Tests stage failed.
4. Failed pipeline showing Build was not executed after the test failure.
5. Successful pipeline after the test is fixed.

## 10. Suggested documentation conclusion

This POC demonstrates that React unit tests can be executed automatically in CI and used as a quality gate before application build. The pipeline prevents a production build from proceeding when the unit-test stage fails.

## 11. References

- React: https://react.dev/
- Vite: https://vite.dev/
- Vitest: https://vitest.dev/
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro/
- Jenkins Pipeline: https://www.jenkins.io/doc/book/pipeline/
