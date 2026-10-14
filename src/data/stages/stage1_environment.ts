import { Stage } from '../../types/curriculum';

export const stage1: Stage = {
  id: 1,
  stageNumber: 1,
  title: 'Environment & Toolchain',
  tagline: 'The architecture of the Java platform, JDK toolchain, compiler mechanics, and execution runtime.',
  description: 'Understand what Java is, how source code transforms into bytecode, the roles of the JVM and JDK, how to configure your operating system environment, and how to analyze compiler diagnostics.',
  iconName: 'Cpu',
  lessons: [
    {
      id: 's1-l1-architecture',
      stageId: 1,
      title: 'What Java Is & Platform Architecture',
      slug: 'what-is-java-architecture',
      subtitle: 'The journey from source code to machine execution: JDK, JVM, JRE, Bytecode, and JIT.',
      readTimeMinutes: 12,
      versionRequirement: 'Java 21 LTS Recommended',
      diagramType: 'compilation',
      definition: 'Java is a statically typed, class-based, object-oriented, platform-independent programming language designed to run on any computer that implements the Java Virtual Machine (JVM).',
      simpleExplanation: 'Unlike languages that compile directly into machine code for a specific computer chip (like C or C++), Java compiles into an intermediate language called bytecode. Any computer with a JVM installed can read and run this bytecode without changing the program.',
      whyItExists: 'In early computing, software had to be rewritten or recompiled for every distinct computer architecture and operating system (Windows on x86, Sun Solaris on SPARC, Mac on PowerPC). Java solved this with the principle "Write Once, Run Anywhere" (WORA), providing a standardized virtual computing layer.',
      howItWorks: 'The Java software pipeline operates in discrete stages: The developer writes human-readable code in .java files. The compiler (javac) reads this code, verifies syntax and type rules, and produces platform-independent bytecode stored in .class files. The Java Virtual Machine (JVM) loads this bytecode, verifies its integrity, and either interprets it instruction-by-instruction or uses a Just-In-Time (JIT) compiler to turn active loops and methods into hyper-fast native machine code for the physical CPU.',
      syntax: 'JDK = Development Tools (javac, jar, jstack) + JRE\nJRE = Java Virtual Machine (JVM) + Core Standard Class Libraries\nJVM = ClassLoader + Execution Engine (Interpreter + JIT) + Memory Manager (GC)',
      syntaxTokens: [
        { token: 'JDK', meaning: 'Java Development Kit — the complete software package needed to build, compile, and debug Java programs.' },
        { token: 'JVM', meaning: 'Java Virtual Machine — the virtual processor that loads and executes bytecode on physical hardware.' },
        { token: 'JRE', meaning: 'Java Runtime Environment — the bundle containing the JVM and standard libraries needed to run precompiled code.' },
        { token: 'Bytecode', meaning: 'Standardized 1-byte instruction set contained in .class files, independent of any physical CPU.' },
        { token: 'JIT', meaning: 'Just-In-Time compiler inside the JVM that translates hot bytecode loops into native CPU machine instructions.' }
      ],
      codeExample: `public class ArchitectureVerification {
    public static void main(String[] args) {
        String javaVersion = System.getProperty("java.version");
        String jvmName = System.getProperty("java.vm.name");
        String osArch = System.getProperty("os.arch");

        System.out.println("Runtime Version: " + javaVersion);
        System.out.println("Virtual Machine: " + jvmName);
        System.out.println("Underlying Architecture: " + osArch);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'public class ArchitectureVerification', explanation: 'Declares a blueprint named ArchitectureVerification that is accessible to the entire program.' },
        { tokenOrLine: 'public static void main(String[] args)', explanation: 'The formal entry point of any Java application. The JVM looks specifically for this signature to start execution.' },
        { tokenOrLine: 'System.getProperty(...)', explanation: 'Queries the JVM runtime environment for operating system and virtual machine properties.' },
        { tokenOrLine: 'System.out.println(...)', explanation: 'Transmits a string of text followed by a newline character to standard output (the terminal console).' }
      ],
      expectedOutput: `Runtime Version: 21.0.2
Virtual Machine: OpenJDK 64-Bit Server VM
Underlying Architecture: x86_64`,
      commonMistakes: [
        {
          title: 'Confusing the JDK with the JRE',
          wrongCode: `// Attempting to compile on a machine with only JRE installed:
$ javac ArchitectureVerification.java
bash: javac: command not found`,
          correctCode: `// Install a full JDK (e.g. Temurin or Amazon Corretto), which includes javac:
$ javac ArchitectureVerification.java
$ java ArchitectureVerification`,
          whyWrong: 'The JRE only includes the runtime engine (java command). Developers require the JDK, which bundles the javac compiler and diagnostic utilities.',
          compilerOrRuntimeError: 'javac: command not found'
        }
      ],
      comparisons: [
        {
          title: 'Compiled Languages (C++) vs Virtual Machine Languages (Java)',
          conceptA: {
            name: 'Native Compilation (C++)',
            description: 'Compiles directly to machine code for a specific CPU architecture.',
            characteristics: ['Fastest initial start', 'Binary is locked to single OS/CPU', 'Manual memory management']
          },
          conceptB: {
            name: 'Bytecode + JVM (Java)',
            description: 'Compiles to platform-neutral bytecode executed by the JVM.',
            characteristics: ['Platform independent', 'Automatic garbage collection', 'JIT optimizes based on runtime profiling']
          },
          keyTakeaway: 'Java trades direct binary portability for runtime flexibility and memory safety.'
        }
      ],
      summaryPoints: [
        'Java code is written in .java files and compiled by javac into .class bytecode files.',
        'Bytecode is hardware-neutral and executes on any operating system with a compatible JVM.',
        'The JVM uses an Interpreter for fast startup and a JIT compiler to accelerate hot execution paths.',
        'Developers require the JDK; end users running packaged apps only require the JRE.'
      ],
      knowledgeCheck: [
        {
          id: 'q1-1',
          question: 'What is the role of the javac tool in the Java ecosystem?',
          options: [
            'It directly executes Java source code on physical CPU hardware.',
            'It translates human-readable .java source code into platform-independent .class bytecode.',
            'It packages Java programs into executable native installer files.',
            'It acts as the garbage collector for unused heap objects.'
          ],
          correctIndex: 1,
          explanation: 'javac is the Java Compiler. It verifies syntax and type safety, then converts .java source text into JVM bytecode instructions saved in .class files.'
        },
        {
          id: 'q1-2',
          question: 'Why does Java use an intermediate bytecode step instead of direct native machine compilation?',
          options: [
            'Because modern computer CPUs cannot execute object-oriented programming code.',
            'To enable "Write Once, Run Anywhere" so the same bytecode runs on any OS implementing a JVM.',
            'Because bytecode is smaller in size than any human-written text file.',
            'To prevent developers from using multi-threading.'
          ],
          correctIndex: 1,
          explanation: 'Bytecode provides an architectural abstraction layer. The same compiled .class file runs on Windows, macOS, and Linux without modification.'
        }
      ],
      reviewQuestions: [
        'Explain the difference between how the JVM Interpreter handles bytecode versus how the JIT compiler handles bytecode.',
        'Why would an enterprise server choose OpenJDK with HotSpot over an interpreted language for high-throughput services?'
      ]
    },
    {
      id: 's1-l2-installation-paths',
      stageId: 1,
      title: 'Installing the JDK, PATH & JAVA_HOME',
      slug: 'installing-jdk-path-java-home',
      subtitle: 'Configuring operating system environment variables across Windows, macOS, and Linux.',
      readTimeMinutes: 10,
      definition: 'JAVA_HOME is an operating system environment variable pointing to the root installation directory of the JDK, while PATH is a system variable allowing the command line to locate executable tools (like javac and java) from any working directory.',
      simpleExplanation: 'When you open your terminal and type "javac", the computer checks every folder listed in your PATH variable until it finds "javac". Setting JAVA_HOME tells build systems (like Maven and Gradle) exactly which JDK version to use.',
      whyItExists: 'Without PATH and JAVA_HOME, you would have to type the full directory path (e.g., C:\\Program Files\\Java\\jdk-21\\bin\\javac.exe) every time you want to compile a file, and development tools would not know where the Java libraries reside.',
      howItWorks: 'The operating system maintains a list of global key-value pairs called environment variables. When a process launches a command, the shell scans the directories in the PATH variable sequentially. JAVA_HOME serves as a standardized reference point that tools like Maven, Gradle, IntelliJ, and VS Code query.',
      syntax: '# Linux & macOS (.bashrc or .zshrc):\nexport JAVA_HOME=/path/to/jdk-21\nexport PATH=$JAVA_HOME/bin:$PATH\n\n# Windows (System Properties or PowerShell):\n$env:JAVA_HOME = "C:\\Program Files\\Eclipse Adoptium\\jdk-21"\n$env:PATH = "$env:JAVA_HOME\\bin;" + $env:PATH',
      codeExample: `public class EnvironmentChecker {
    public static void main(String[] args) {
        String javaHome = System.getenv("JAVA_HOME");
        String path = System.getenv("PATH");

        System.out.println("JAVA_HOME configuration:");
        System.out.println(javaHome != null ? javaHome : "WARNING: JAVA_HOME is not set!");

        System.out.println("PATH contains Java bin directory: " + (path != null && path.contains("jdk")));
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'System.getenv("JAVA_HOME")', explanation: 'Retrieves the value of the operating system environment variable named JAVA_HOME.' },
        { tokenOrLine: 'System.getenv("PATH")', explanation: 'Retrieves the current operating system search path string.' },
        { tokenOrLine: 'javaHome != null ? ... : ...', explanation: 'Ternary operator checking whether the variable exists in the host system.' }
      ],
      expectedOutput: `JAVA_HOME configuration:
/opt/jdk-21.0.2
PATH contains Java bin directory: true`,
      commonMistakes: [
        {
          title: 'Pointing JAVA_HOME to the bin subfolder',
          wrongCode: `export JAVA_HOME=/usr/lib/jvm/jdk-21/bin   # INCORRECT: includes /bin`,
          correctCode: `export JAVA_HOME=/usr/lib/jvm/jdk-21       # CORRECT: root JDK folder
export PATH=$JAVA_HOME/bin:$PATH`,
          whyWrong: 'JAVA_HOME must point to the root directory containing the lib, include, and bin folders. Tools look for $JAVA_HOME/bin, not $JAVA_HOME/bin/bin.',
          compilerOrRuntimeError: 'Error: JAVA_HOME does not point to a valid JDK directory.'
        }
      ],
      comparisons: [
        {
          title: 'PATH vs JAVA_HOME',
          conceptA: {
            name: 'PATH',
            description: 'List of folders searched by the OS command shell.',
            characteristics: ['Used by command prompt/terminal', 'Must include the /bin subdirectory', 'Enables running "java" and "javac" directly']
          },
          conceptB: {
            name: 'JAVA_HOME',
            description: 'Points strictly to the JDK installation root folder.',
            characteristics: ['Used by build tools (Maven, Gradle, IDEs)', 'Points to root (not /bin)', 'Standardized variable name across platforms']
          },
          keyTakeaway: 'PATH lets humans run commands; JAVA_HOME lets external developer software locate JDK internals.'
        }
      ],
      summaryPoints: [
        'Modern LTS JDK distributions include Eclipse Temurin, Amazon Corretto, and Azul Zulu.',
        'JAVA_HOME points to the JDK root directory; PATH includes the $JAVA_HOME/bin folder.',
        'Terminal commands like java -version and javac -version verify correct installation.'
      ],
      knowledgeCheck: [
        {
          id: 'q1-3',
          question: 'What directory should JAVA_HOME point to?',
          options: [
            'The bin directory where the javac executable is stored.',
            'The root directory of the installed JDK distribution.',
            'The folder where your project source code files reside.',
            'The Windows System32 directory.'
          ],
          correctIndex: 1,
          explanation: 'JAVA_HOME must point to the base folder of the JDK (e.g. /opt/jdk-21). Build tools append /bin or /lib as needed.'
        }
      ],
      reviewQuestions: [
        'How do you verify on your operating system terminal which JDK binary is currently executing?',
        'What error occurs when build tools like Maven cannot find JAVA_HOME?'
      ]
    },
    {
      id: 's1-l3-compilation-and-errors',
      stageId: 1,
      title: 'Compilation, Execution & Compiler Errors',
      slug: 'compilation-execution-compiler-errors',
      subtitle: 'Mastering javac, the java launcher, class names, and decoding compiler error reports.',
      readTimeMinutes: 14,
      definition: 'A compiler error is a static diagnostic produced by javac when source code violates Java grammar, lexical structure, or type constraints, aborting bytecode generation before any program execution can begin.',
      simpleExplanation: 'The Java compiler acts like an uncompromising grammar and safety inspector. Before running any code, it checks every rule. If you forget a semicolon, misspell a name, or assign text to a number variable, javac stops you immediately with an exact file and line number.',
      whyItExists: 'Catching mistakes at compile-time prevents catastrophic runtime crashes in production. By forcing type and syntax validation upfront, Java guarantees that generated bytecode adheres to fundamental structural guarantees.',
      howItWorks: 'When you execute `javac Source.java`, the compiler parses tokens, builds an Abstract Syntax Tree (AST), checks symbol tables, verifies type contracts, and if zero errors are detected, outputs `Source.class`. To run it, you call `java Source` (without the .class extension), which initializes the JVM and runs the `main` method.',
      syntax: '# Step 1: Compile source code into bytecode\njavac -d out src/Main.java\n\n# Step 2: Execute compiled class from classpath\njava -cp out Main',
      codeExample: `public class SafeGreeting {
    public static void main(String[] args) {
        String greeting = "Welcome to Java Engineering";
        int releaseYear = 1995;

        System.out.println(greeting);
        System.out.println("First released in: " + releaseYear);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'public class SafeGreeting', explanation: 'Class name must match the source file name SafeGreeting.java exactly, including casing.' },
        { tokenOrLine: 'String greeting = "Welcome...";', explanation: 'Declares variable of type String and initializes it with text.' },
        { tokenOrLine: 'int releaseYear = 1995;', explanation: 'Declares variable of type int and initializes it with an integer literal.' },
        { tokenOrLine: 'System.out.println(...)', explanation: 'Prints text and variables concatenated together to standard output.' }
      ],
      expectedOutput: `Welcome to Java Engineering
First released in: 1995`,
      commonMistakes: [
        {
          title: 'Mismatch between Public Class Name and File Name',
          wrongCode: `// Saved in a file named "Greeting.java":
public class Hello {
    public static void main(String[] args) {}
}`,
          correctCode: `// In file "Hello.java":
public class Hello {
    public static void main(String[] args) {}
}`,
          whyWrong: 'Java mandates that a top-level public class must reside in a file whose name matches the class identifier exactly, with .java appended.',
          compilerOrRuntimeError: 'Hello.java:1: error: class Hello is public, should be declared in a file named Hello.java'
        },
        {
          title: 'Running Java with the .class Extension',
          wrongCode: `$ java SafeGreeting.class`,
          correctCode: `$ java SafeGreeting`,
          whyWrong: 'The java command expects a fully qualified class name, not a physical file path. Supplying .class causes the JVM to search for a nested class named "class".',
          compilerOrRuntimeError: 'Error: Could not find or load main class SafeGreeting.class'
        }
      ],
      comparisons: [
        {
          title: 'Compile-Time Errors vs Runtime Exceptions',
          conceptA: {
            name: 'Compile-Time Error',
            description: 'Detected by javac during code translation before the app runs.',
            characteristics: ['Syntax errors, missing semicolons', 'Type mismatches (assigning String to int)', 'Non-existent method calls', 'Zero bytecode emitted']
          },
          conceptB: {
            name: 'Runtime Exception',
            description: 'Occurs while the JVM is actively executing the program.',
            characteristics: ['Dividing by zero', 'Accessing null reference', 'Array index out of bounds', 'Bytecode compiled successfully']
          },
          keyTakeaway: 'Compile-time errors protect you before release; runtime exceptions occur when program logic encounters unanticipated data.'
        }
      ],
      summaryPoints: [
        'javac translates .java into .class; java executes the bytecode on the JVM.',
        'File names must match public class names with case sensitivity.',
        'Compile-time errors prevent broken bytecode from ever being created.'
      ],
      knowledgeCheck: [
        {
          id: 'q1-4',
          question: 'If you have compiled a file named "Runner.java" into "Runner.class", what command launches it?',
          options: [
            'javac Runner',
            'java Runner.class',
            'java Runner',
            'run Runner.java'
          ],
          correctIndex: 2,
          explanation: 'The JVM launcher "java" takes the class name (Runner), not the file path or file extension.'
        }
      ],
      reviewQuestions: [
        'Why does Java require case-exact matching between file names and public class names?',
        'Describe the exact difference between a "cannot find symbol" compiler error and a "NoClassDefFoundError" runtime error.'
      ]
    }
  ]
};
