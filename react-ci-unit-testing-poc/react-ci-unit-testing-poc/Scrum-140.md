# Application CI Design | React CI Checks | Unit Testing (SCRUM-140)

---

# Author
| **Author**    | **Created On** | **Version** | **Last Edited On** | **L0 Reviewer** | **L1 Reviewer** | **L2 Reviewer** |
| ------------- | -------------- | ----------- | ------------------ | --------------- | --------------- | --------------- |
| Vashishtha Prakash | 21-09-2026     | v1.o      | 21-09-2026         | Sunny/Shubham   | Shreya / Nikita  | Piyush Upadhyay   |

---

This repository contains the Proof of Concept (POC) for designing and implementing a robust Continuous Integration (CI) pipeline for a modern React application using Jenkins, ESLint, and Vitest.

---

## 1. Introduction
Modern web development requires rapid feature delivery without compromising code quality. This project demonstrates an automated CI pipeline that ensures every code change pushed to the repository undergoes strict quality gates—including environment validation, dependency checking, syntax linting, automated unit testing, and production build verification—before it can be considered for deployment.

---

## 2. What & Why (Problem & Solution)

### The "What"
An automated pipeline triggered upon code changes that orchestrates:
* **Code Quality Verification:** Validating coding standards and syntax rules using ESLint.
* **Behavioral Verification:** Running isolated test suites using Vitest to catch logic regressions.
* **Build Verification:** Ensuring the application successfully bundles into a production-ready package via Vite.

### The "Why"
* **Eliminate "Works on My Machine":** Standardizes the runtime environment on a clean, centralized server (AWS EC2).
* **Immediate Feedback Loop:** Reduces the debugging cycle by catching human errors (like unused imports or breaking unit tests) within seconds of a code push.
* **Guaranteed Build Stability:** Ensures that broken code never reaches downstream deployment stages.

---

## 3. Workflow Diagram
The following flowchart illustrates the architectural design of the React CI execution pipeline managed inside the AWS EC2 hosted Jenkins node:

```text
[ Developer Local System ]
           │
           ▼ (Git Push via SSH)
   [ GitHub Repository ]
           │
           ▼ (Webhook / Manual Trigger)
    [ Jenkins CI Server ]
           │
           ├──> [ Stage 1: Declarative: Checkout SCM ] ──> Clones latest code
           ├──> [ Stage 2: Environment Validation ]    ──> Checks Node/NPM versions
           ├──> [ Stage 3: Install Dependencies ]      ──> Runs clean npm install
           ├──> [ Stage 4: Lint Checks ]               ──> Validates code style (ESLint)
           ├──> [ Stage 5: Unit Testing ]              ──> Executes Vitest suites
           └──> [ Stage 6: Production Build ]          ──> Compiles production-ready bundle
```

---

## 4. Different Tools & Comparison Matrix

To achieve optimal pipeline efficiency, various tooling choices were evaluated for this POC:

| Tool Category | Selected Option | Alternatives Considered | Selection Rationale |
| :--- | :--- | :--- | :--- |
| **CI Automation** | **Jenkins** | GitHub Actions / GitLab CI | Offers deep integration with enterprise infrastructure, private host control, and highly customizable scripted/declarative pipeline structures. |
| **Build Engine** | **Vite** | Create React App (CRA) | Vite leverages native ESM and esbuild, rendering dramatically faster compilation and lower memory usage on CI nodes compared to Webpack-based CRA. |
| **Testing Framework** | **Vitest** | Jest | Vitest shares a unified configuration file with Vite, avoiding duplicate babel/transformer setups and reducing unit test run times significantly. |
| **Static Code Analyzer**| **ESLint** | Biome / JSHint | Highly extensible, standard industry framework with comprehensive support for the latest ECMAScript and React specifications. |

---

## 5. Advantages of this CI Design
* **Early Defect Catching:** Code anomalies (e.g., `no-unused-vars`) and broken assertions are trapped instantly during the active sprint cycle.
* **Enforced Code Uniformity:** Eliminates code style debates by ensuring all team members auto-comply with established lint rules.
* **Automated Asset Readiness:** Production-grade `dist` directories are ready automatically at the end of successful runs.

---

## 6. POC Evidence (Execution Results)

The pipeline has been fully configured and successfully executed on an **AWS EC2 (Ubuntu Server)** node hosting Jenkins. All build stages executed with **SUCCESS (Green)** status.

### Pipeline Stage View Evidence
*Here is the successful compilation run illustrating successful steps from environment configuration up to the final application compilation:*

<!-- PLACEHOLDER FOR JENKINS STAGE VIEW SCREENSHOT -->
```text
[ INSERT JENKINS STAGE VIEW SCREENSHOT HERE - e.g., showing green blocks for Checkout, Install, Lint, Unit Tests, Build ]
```

### Automated Lint & Unit Test Run Log Evidence
*Linter warnings and errors were gracefully structured, and Vitest executed all test assertions in headless single-run mode seamlessly:*

<!-- PLACEHOLDER FOR JENKINS CONSOLE OUTPUT SCREENSHOT -->
```text
[ INSERT JENKINS CONSOLE LOG SNIPPET/SCREENSHOT HERE - showing successful Vitest completion and passing test cases ]
```

---

## 7. Best Practices Followed
* **Infrastructure Security:** Strict Inbound Rules implemented on the AWS Security Group, restricting Port 22 (SSH) and Port 8080 (Jenkins UI) strictly to Authorized Administrative IPs (`My IP/32`).
* **Non-Blocking Headless Tests:** Used single-run mode for Vitest (`vitest run` script execution via package manager) instead of standard developer interactive watch-modes, avoiding pipeline hanging states.
* **Environment Sandboxing:** Node installations and tools are modularly controlled via Jenkins global tools, avoiding dependency pollution on the root OS layers.

---

## 8. Recommendation & Conclusion
The implemented architecture proves that introducing specialized linting and Vitest testing layers within Jenkins provides an incredibly fast and foolproof verification framework for React software architectures. 

It is highly recommended to merge these pipeline stages into the core project lifecycle configuration and enforce a rule preventing any feature branch merge if the associated automated CI execution pipeline fails.

---

## 9. Contact Information & References

| **Name**           | **Email**                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------- |
| Vashishtha Prakash | [vashishtha.prakash.snaatak@mygurukulam.co](mailto:vashishtha.prakash.snaatak@mygurukulam.co) |

---


## 10. References
 
  * [Jenkins Pipeline Syntax Documentation](https://jenkins.io)
  * [Vitest Guide for CI Environments](https://vitest.dev)
  * [Vite Production Bundling Guidelines](https://vitejs.dev)
