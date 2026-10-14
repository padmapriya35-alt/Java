# Java Programming Knowledge Base ☕
> A comprehensive, definition-first educational reference and digital textbook spanning absolute beginner fundamentals to advanced JVM internals, concurrency, Spring Boot, and enterprise security.

[![Deploy to GitHub Pages](https://github.com/actions/deploy-pages/actions/workflows/deploy.yml/badge.svg)](https://github.com/actions/deploy-pages)
[![Java 21 LTS Ready](https://img.shields.io/badge/Java-21%20LTS-orange.svg)](https://openjdk.org/projects/jdk/21/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)

---

## 📖 Pedagogical Standard & Philosophy

Every lesson in this reference adheres to the **Definition-First Educational Standard**:
> **Every important concept must have a clear definition before code is shown.**

For example, before showing:
```java
int age = 13;
```
The curriculum breaks down:
1. **What a variable is**: A symbolic handle for a contiguous block of RAM memory.
2. **What `int` means**: 32-bit signed two's complement integer reserving 4 bytes on the call stack.
3. **What `age` represents**: The identifier registered in the compiler symbol table.
4. **What assignment (`=`) means**: Evaluates the right-hand expression and copies resulting bits to the left-hand slot.
5. **What the number `13` represents**: Integer literal encoded into 32-bit binary (`00000000 00000000 00000000 00001101`).
6. **How the type system governs the statement**: Compile-time static and strong type checking.

*Explanations are never buried in code comments; all code examples are pristine Java followed by explicit external token-by-token breakdowns.*

---

## 🗺️ The 13 Roadmap Stages

1. **Stage 1 — Environment & Toolchain**: JDK vs JRE vs JVM, Bytecode, JIT Compiler, OS installation, `PATH`, `JAVA_HOME`, and compiler diagnostics.
2. **Stage 2 — Fundamentals**: Program structure, anatomy of `public static void main`, variables, 8 primitives, reference types, String Pool immutability, operators, casting, and I/O.
3. **Stage 3 — Control Flow**: Boolean logic, short-circuit evaluation, `if`/`else`, modern switch expressions (`->` and `yield`), `for`, enhanced `for-each`, `while`, and `do-while`.
4. **Stage 4 — Methods**: Method signatures, parameters vs arguments, **strict pass-by-value semantics**, call stack frames, overloading, and recursion.
5. **Stage 5 — Object-Oriented Programming**: Classes, instances, constructors (`this()`, `super()`), encapsulation, inheritance, polymorphism, dynamic method dispatch, interfaces, and abstract classes.
6. **Stage 6 — Exceptions**: The `Throwable` hierarchy (`Error` vs `Exception`), checked vs unchecked exceptions, `try-catch-finally`, and Try-with-resources (`AutoCloseable`).
7. **Stage 7 — Collections & Generics**: `List`, `Set`, `Queue`, internal hashing mechanics of `HashMap` (bucket arrays, collisions, treeification to Red-Black Trees), Generics `<T>`, Type Erasure, and PECS wildcards (`? extends` / `? super`).
8. **Stage 8 — Modern Java (8 to 21)**: Lambdas, `@FunctionalInterface`, Streams API, `Optional<T>`, Records (Java 16), Sealed Classes (Java 17), and Pattern Matching (Java 21).
9. **Stage 9 — Files & Data**: Java NIO.2 (`Path`, `Files.lines` streaming), modern date-time arithmetic (`java.time`), and regular expressions (`Pattern`, `Matcher`).
10. **Stage 10 — Concurrency**: Processes vs threads, thread lifecycle states, `synchronized` monitor locks, race conditions, deadlocks, and **Virtual Threads (Java 21 Project Loom)**.
11. **Stage 11 — JVM Internals**: Stack vs Heap (Young/Eden/Survivor vs Old/Tenured), Metaspace, GC engines (G1 GC, ZGC sub-millisecond pauses), and `javap -c` bytecode disassembly.
12. **Stage 12 — Java Backend & Spring Boot**: HTTP/REST principles, Three-tier layering, JDBC `Connection` pooling (HikariCP), `PreparedStatement` parameterization, and Spring Boot Dependency Injection.
13. **Stage 13 — Java Security**: Input validation, Path Traversal defense, SQL injection immunity, cryptographic password hashing (BCrypt/Argon2 vs fast SHA-256), JWT security, and supply chain vulnerability scanning.

---

## 🛠️ Interactive Features

- **Interactive Terminology Glossary**: 80+ formal definitions across Core, OOP, Memory, Collections, Concurrency, and Security.
- **JVM Memory Stepper Simulator**: Step line-by-line and inspect active Call Stack frames, local variable registers, and Heap object allocations.
- **Architecture Blueprints**: Visual diagrams of the JVM compilation pipeline, memory areas, Throwable exception tree, and thread lifecycle state machine.
- **Quizzes & Self-Review**: Multiple-choice knowledge checks with instant explanations for every topic.
- **Instant Search (`/` or `Cmd+K`)**: Search across all concepts, definitions, and code.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+ or 20+
- npm (bundled with Node.js)

### Setup & Launch
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🌐 How to Publish on GitHub Pages

This project is already pre-configured for **GitHub Pages** using Vite relative asset paths and an automated **GitHub Actions** workflow (`.github/workflows/deploy.yml`).

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Enter a repository name (e.g. `java-knowledge-base`).
3. Choose **Public** and click **Create repository**.

### Step 2: Push Your Code to GitHub
Run the following commands in your project root terminal:

```bash
# Initialize git if not already initialized
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: complete Java programming knowledge base"

# Rename default branch to main
git branch -M main

# Link to your new GitHub repository (replace with your URL)
git remote add origin https://github.com/<your-username>/java-knowledge-base.git

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages in Repository Settings
1. On your GitHub repository page, click **Settings** (tab at the top).
2. On the left sidebar, click **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically detect `.github/workflows/deploy.yml` and deploy your site within 1-2 minutes!
5. Your live website URL will be:
   ```
   https://<your-username>.github.io/java-knowledge-base/
   ```

---

## 🏗️ Project Architecture

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Pages CI/CD workflow
├── index.html                    # HTML entry point with SEO metadata
├── vite.config.ts                # Vite configuration with relative base ('./')
├── package.json                  # Dependencies & build scripts
├── src/
│   ├── main.tsx                  # React DOM mount point
│   ├── App.tsx                   # Main layout container & state manager
│   ├── index.css                 # Global CSS & Tailwind typography
│   ├── types/
│   │   └── curriculum.ts         # TypeScript interfaces for stages, lessons, glossary
│   ├── data/
│   │   ├── curriculum.ts         # Central aggregator & search engine
│   │   ├── glossary.ts           # 80+ formal Java definitions & origins
│   │   └── stages/               # 13 modular stage curriculum datasets
│   │       ├── stage1_environment.ts
│   │       ├── stage2_fundamentals.ts
│   │       ├── stage3_control_flow.ts
│   │       ├── stage4_methods.ts
│   │       ├── stage5_oop.ts
│   │       ├── stage6_exceptions.ts
│   │       ├── stage7_collections.ts
│   │       ├── stage8_modern_java.ts
│   │       ├── stage9_files_and_data.ts
│   │       ├── stage10_concurrency.ts
│   │       ├── stage11_jvm.ts
│   │       ├── stage12_backend.ts
│   │       └── stage13_security.ts
│   └── components/
│       ├── Navbar.tsx            # Header with search, quick links, progress
│       ├── Sidebar.tsx           # 13-stage accordion navigation
│       ├── LessonView.tsx        # 13-point textbook reader & quiz engine
│       ├── GlossaryModal.tsx     # Concept search & formal definition modal
│       ├── InteractiveCodePlayground.tsx # JVM Memory Stepper simulator
│       ├── ArchitectureDiagrams.tsx      # SVG/Visual blueprints
│       └── SearchModal.tsx       # Fuzzy curriculum search dialog
```

---

## 📜 License
This educational project is distributed under the Apache-2.0 License.
