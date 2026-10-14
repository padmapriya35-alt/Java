import { GlossaryTerm } from '../types/curriculum';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'variable',
    term: 'Variable',
    category: 'Core',
    shortDefinition: 'A named storage location in memory that holds a data value of a specific type.',
    formalDefinition: 'A variable in Java is an abstraction of a specific memory address bound to an identifier, an explicit data type, and a current value, allowing programmatic read and write access during program execution within its declared lexical scope.',
    relatedTerms: ['primitive-type', 'reference-type', 'assignment', 'scope'],
    syntaxExample: 'int counter = 0;',
    etymologyOrOrigin: 'From Latin variabilis ("changeable") + mathematical variable.'
  },
  {
    id: 'primitive-type',
    term: 'Primitive Data Type',
    category: 'Core',
    shortDefinition: 'A basic predefined data type built directly into the Java language that stores its value directly in memory.',
    formalDefinition: 'A primitive type is one of the eight foundational non-object data types in Java (byte, short, int, long, float, double, boolean, char). Primitives store raw binary values directly on the stack or inline within object records rather than storing object references.',
    relatedTerms: ['reference-type', 'variable', 'casting'],
    syntaxExample: 'double price = 19.99;',
    etymologyOrOrigin: 'From Latin primitivus ("first of its kind").'
  },
  {
    id: 'reference-type',
    term: 'Reference Type',
    category: 'Core',
    shortDefinition: 'A data type whose variable stores the memory address (reference) of an object in the heap, not the object itself.',
    formalDefinition: 'A reference type in Java (including classes, interfaces, arrays, records, and enums) defines variables that store pointers/references pointing to heap-allocated objects rather than the raw data payload directly.',
    relatedTerms: ['primitive-type', 'object', 'heap', 'null'],
    syntaxExample: 'String name = new String("Alice");',
    etymologyOrOrigin: 'From Latin referre ("to carry back, to relate to").'
  },
  {
    id: 'assignment',
    term: 'Assignment',
    category: 'Core',
    shortDefinition: 'The operation of storing a calculated or literal value into a designated variable using the = operator.',
    formalDefinition: 'An assignment expression evaluates its right-hand operand according to type rules and stores the resulting value or heap reference into the memory location designated by the left-hand variable operand.',
    relatedTerms: ['variable', 'operator', 'expression'],
    syntaxExample: 'int score = 100;',
  },
  {
    id: 'jdk',
    term: 'JDK (Java Development Kit)',
    category: 'Environment',
    shortDefinition: 'The complete software development environment containing tools to develop, compile, debug, and run Java applications.',
    formalDefinition: 'The Java Development Kit (JDK) is a superset of the JRE that includes language compilers (javac), archiving utilities (jar), documentation generators (javadoc), profiling and monitoring tools (jcmd, jstack, jconsole), and the core standard class library source code.',
    relatedTerms: ['jvm', 'jre', 'bytecode', 'compiler'],
    syntaxExample: 'javac App.java'
  },
  {
    id: 'jvm',
    term: 'JVM (Java Virtual Machine)',
    category: 'Environment',
    shortDefinition: 'The abstract computing machine that loads, verifies, interprets, and just-in-time compiles Java bytecode into machine code.',
    formalDefinition: 'The JVM is an execution engine specification that provides platform independence. It manages memory (Stack, Heap, Metaspace), garbage collection, bytecode interpretation, and dynamic JIT compilation to native processor instructions at runtime.',
    relatedTerms: ['jdk', 'bytecode', 'jit-compiler', 'garbage-collection'],
    syntaxExample: 'java App'
  },
  {
    id: 'jre',
    term: 'JRE (Java Runtime Environment)',
    category: 'Environment',
    shortDefinition: 'The execution bundle containing the JVM and standard libraries required to execute precompiled Java programs.',
    formalDefinition: 'The JRE is the runtime distribution layer containing the Java Virtual Machine implementation and core class libraries necessary to run Java applications without development tools like compilers or debuggers.',
    relatedTerms: ['jdk', 'jvm'],
    syntaxExample: 'java -version'
  },
  {
    id: 'bytecode',
    term: 'Bytecode',
    category: 'Environment',
    shortDefinition: 'The intermediate, platform-neutral instruction set produced by the javac compiler and executed by the JVM.',
    formalDefinition: 'Bytecode consists of compact, one-byte operation codes (opcodes) and parameters stored in .class files. It represents an abstracted assembly language targeted to the JVM virtual architecture rather than any physical CPU.',
    relatedTerms: ['jvm', 'compiler', 'jit-compiler'],
    syntaxExample: 'javap -c App.class'
  },
  {
    id: 'compiler',
    term: 'Compiler (javac)',
    category: 'Environment',
    shortDefinition: 'The tool that translates human-readable Java source code (.java files) into machine-independent bytecode (.class files).',
    formalDefinition: 'The Java compiler parses source code, validates syntactic and semantic correctness, performs type checking and constant folding, and emits standardized Java Virtual Machine bytecode instructions conforming to the JVM specification.',
    relatedTerms: ['bytecode', 'jvm', 'jdk'],
    syntaxExample: 'javac -d out src/Main.java'
  },
  {
    id: 'jit-compiler',
    term: 'JIT (Just-In-Time) Compiler',
    category: 'Environment',
    shortDefinition: 'A component of the JVM execution engine that compiles frequently executed bytecode into native CPU instructions during runtime.',
    formalDefinition: 'The JIT compiler dynamically monitors execution hotspots (frequent methods and loops) in running bytecode and translates them directly into hardware-native machine instructions (via C1/C2 compilers) to eliminate interpretive overhead.',
    relatedTerms: ['jvm', 'bytecode'],
  },
  {
    id: 'class',
    term: 'Class',
    category: 'OOP',
    shortDefinition: 'A blueprint or blueprint template that defines the state (fields) and behavior (methods) of objects.',
    formalDefinition: 'A class is a user-defined reference type and blueprint that encapsulates data fields and member functions. It specifies the structure, initial state, and executable contracts of all object instances instantiated from it.',
    relatedTerms: ['object', 'instance', 'constructor', 'field'],
    syntaxExample: 'public class Account { ... }'
  },
  {
    id: 'object',
    term: 'Object',
    category: 'OOP',
    shortDefinition: 'A concrete runtime instance of a class with its own distinct state and identity allocated in heap memory.',
    formalDefinition: 'An object is a dynamic realization of a class in JVM heap memory. It maintains private field storage according to the class blueprint, an object header (mark word and class pointer), and identity hashcode.',
    relatedTerms: ['class', 'instance', 'heap'],
    syntaxExample: 'Account acc = new Account();'
  },
  {
    id: 'instance',
    term: 'Instance',
    category: 'OOP',
    shortDefinition: 'A specific physical occurrence of any class, created using the new operator.',
    formalDefinition: 'The term "instance" denotes an individual entity created from a class schema. "Object" and "instance" are often used interchangeably, though "instance" emphasizes the relationship to its originating class.',
    relatedTerms: ['class', 'object', 'constructor'],
  },
  {
    id: 'field',
    term: 'Field',
    category: 'OOP',
    shortDefinition: 'A variable declared directly inside a class representing the state or attribute of an object or class.',
    formalDefinition: 'A field (also known as an instance variable or class variable) is a class-level variable definition that defines the internal data representation of an object or a static attribute shared across all instances of a class.',
    relatedTerms: ['class', 'encapsulation', 'access-modifier'],
    syntaxExample: 'private int balance;'
  },
  {
    id: 'method',
    term: 'Method',
    category: 'OOP',
    shortDefinition: 'A block of code declared inside a class that performs a specific action and can accept parameters and return a value.',
    formalDefinition: 'A method is a subprogram or function encapsulated within a class that operates upon object state (instance method) or class state (static method), declaring formal parameters, a return type, and a checked exception specification.',
    relatedTerms: ['class', 'parameters', 'return-value', 'overloading', 'overriding'],
    syntaxExample: 'public int deposit(int amount) { ... }'
  },
  {
    id: 'constructor',
    term: 'Constructor',
    category: 'OOP',
    shortDefinition: 'A special method-like block invoked during object creation to initialize the newly allocated object state.',
    formalDefinition: 'A constructor is an initialization subroutine that has the exact name of its enclosing class, possesses no return type (not even void), and executes immediately after heap memory is allocated by the new operator.',
    relatedTerms: ['class', 'object', 'this', 'super'],
    syntaxExample: 'public Account(String owner) { this.owner = owner; }'
  },
  {
    id: 'encapsulation',
    term: 'Encapsulation',
    category: 'OOP',
    shortDefinition: 'The fundamental OOP principle of bundling data and methods inside a class while restricting direct access to internal state.',
    formalDefinition: 'Encapsulation enforces data hiding and information containment by making fields private and controlling read/write access via validated accessor (getter) and mutator (setter) methods, preserving class invariants.',
    relatedTerms: ['access-modifier', 'class', 'field'],
  },
  {
    id: 'inheritance',
    term: 'Inheritance',
    category: 'OOP',
    shortDefinition: 'The mechanism by which one class acquires the fields and methods of another class using the extends keyword.',
    formalDefinition: 'Inheritance establishes an "is-a" taxonomic relationship enabling a subclass to derive properties, state, and behaviors from a superclass, fostering code reuse and forming the foundation of polymorphic subtyping in Java.',
    relatedTerms: ['polymorphism', 'super', 'overriding'],
    syntaxExample: 'public class SavingsAccount extends Account { ... }'
  },
  {
    id: 'polymorphism',
    term: 'Polymorphism',
    category: 'OOP',
    shortDefinition: 'The capability of different classes to respond to the same method invocation in their own unique ways.',
    formalDefinition: 'Polymorphism ("many forms") in Java is primarily realized through dynamic method dispatch (runtime polymorphism) where the JVM resolves method calls based on the actual runtime type of the object rather than the declared reference type.',
    relatedTerms: ['inheritance', 'overriding', 'interface'],
  },
  {
    id: 'abstraction',
    term: 'Abstraction',
    category: 'OOP',
    shortDefinition: 'The design practice of exposing only essential interface characteristics while hiding concrete implementation details.',
    formalDefinition: 'Abstraction separates conceptual specifications ("what an entity does") from physical execution details ("how it does it") using abstract classes and interfaces, reducing coupling across software boundaries.',
    relatedTerms: ['interface', 'abstract-class', 'encapsulation'],
  },
  {
    id: 'interface',
    term: 'Interface',
    category: 'OOP',
    shortDefinition: 'A pure contract defining method signatures that implementing classes must fulfill.',
    formalDefinition: 'An interface in Java is a reference type that specifies a set of abstract method signatures, default implementations, and static constants. A class can implement multiple interfaces, enabling multiple-inheritance of type.',
    relatedTerms: ['abstraction', 'abstract-class', 'polymorphism'],
    syntaxExample: 'public interface PaymentGateway { void process(double amount); }'
  },
  {
    id: 'abstract-class',
    term: 'Abstract Class',
    category: 'OOP',
    shortDefinition: 'A class declared with the abstract keyword that cannot be instantiated directly and can contain both abstract and concrete methods.',
    formalDefinition: 'An abstract class serves as an incomplete base class intended exclusively for subclass extension. It can define state (instance fields with arbitrary access modifiers), constructors, and both abstract (unimplemented) and concrete methods.',
    relatedTerms: ['interface', 'inheritance', 'abstraction'],
    syntaxExample: 'public abstract class Vehicle { abstract void drive(); }'
  },
  {
    id: 'access-modifier',
    term: 'Access Modifier',
    category: 'OOP',
    shortDefinition: 'Keywords (public, protected, default, private) that dictate the visibility and accessibility of classes, fields, and methods.',
    formalDefinition: 'Access modifiers define package and class inheritance visibility boundaries: public (accessible everywhere), protected (package + subclasses), default/package-private (same package only), and private (enclosing class body only).',
    relatedTerms: ['encapsulation', 'class', 'field'],
    syntaxExample: 'private double balance;'
  },
  {
    id: 'this-keyword',
    term: 'this',
    category: 'OOP',
    shortDefinition: 'A reserved keyword representing a reference to the current object instance within an instance method or constructor.',
    formalDefinition: 'this is an implicit reference parameter automatically passed into all non-static methods and constructors, resolving variable shadowing and enabling constructor chaining via this(...).',
    relatedTerms: ['super', 'constructor', 'object'],
    syntaxExample: 'this.name = name;'
  },
  {
    id: 'super-keyword',
    term: 'super',
    category: 'OOP',
    shortDefinition: 'A keyword used to refer directly to the immediate superclass members or constructor from within a subclass.',
    formalDefinition: 'super provides an explicit reference to the immediate parent class, allowing subclasses to invoke overridden parent methods or delegate initialization via super(...) constructors.',
    relatedTerms: ['inheritance', 'this-keyword', 'overriding'],
    syntaxExample: 'super(initialBalance);'
  },
  {
    id: 'stack',
    term: 'JVM Stack',
    category: 'Memory',
    shortDefinition: 'The thread-private memory area that stores active method execution frames, local variables, and call hierarchies.',
    formalDefinition: 'Each JVM thread has a private runtime stack consisting of stack frames. A stack frame is allocated upon every method invocation to hold local variable arrays, operand stacks, and method return references, and is popped upon method exit.',
    relatedTerms: ['heap', 'garbage-collection', 'jvm'],
  },
  {
    id: 'heap',
    term: 'JVM Heap',
    category: 'Memory',
    shortDefinition: 'The shared runtime memory region where all Java objects, instances, and array payloads are allocated.',
    formalDefinition: 'The heap is the JVM-wide shared memory area managed by the Garbage Collector. All class instances and arrays are allocated here via the new operator, surviving until unreferenced and reclaimed.',
    relatedTerms: ['stack', 'garbage-collection', 'jvm'],
  },
  {
    id: 'garbage-collection',
    term: 'Garbage Collection (GC)',
    category: 'Memory',
    shortDefinition: 'The automatic memory management subsystem that reclaims heap memory occupied by unreachable objects.',
    formalDefinition: 'Garbage Collection is the automatic process wherein the JVM identifies and deallocates memory occupied by objects that are no longer reachable from any GC root reference (live stack variables, static fields, JNI handles).',
    relatedTerms: ['heap', 'jvm'],
  },
  {
    id: 'metaspace',
    term: 'Metaspace',
    category: 'Memory',
    shortDefinition: 'The off-heap native memory area where the JVM stores class definitions, runtime constant pools, and method metadata.',
    formalDefinition: 'Introduced in Java 8 to replace PermGen, Metaspace allocates class metadata directly into native OS memory, growing dynamically up to system limits unless constrained by MaxMetaspaceSize.',
    relatedTerms: ['jvm', 'heap'],
  },
  {
    id: 'checked-exception',
    term: 'Checked Exception',
    category: 'Core',
    shortDefinition: 'An exception subclassing Exception (not RuntimeException) that must be caught or declared in the method signature.',
    formalDefinition: 'A checked exception represents a recoverable exceptional condition that a well-written application should anticipate. The Java compiler enforces that methods either handle it via try-catch or declare it with throws.',
    relatedTerms: ['unchecked-exception', 'throw', 'throws'],
    syntaxExample: 'public void read() throws IOException { ... }'
  },
  {
    id: 'unchecked-exception',
    term: 'Unchecked Exception (RuntimeException)',
    category: 'Core',
    shortDefinition: 'An exception inheriting from RuntimeException that does not require mandatory compiler try-catch or throws clauses.',
    formalDefinition: 'Unchecked exceptions represent programmatic flaws, logic bugs, or invalid API usage (e.g., NullPointerException, IndexOutOfBoundsException) that generally cannot be recovered from at runtime.',
    relatedTerms: ['checked-exception', 'throw'],
    syntaxExample: 'throw new IllegalArgumentException("Invalid ID");'
  },
  {
    id: 'generics',
    term: 'Generics',
    category: 'Collections',
    shortDefinition: 'A language feature enabling classes, interfaces, and methods to operate on parameterized types with compile-time type safety.',
    formalDefinition: 'Generics introduce compile-time type arguments (<T>), allowing developers to specify container element types. The compiler validates operations and automatically inserts casts while stripping parameter information during compilation via type erasure.',
    relatedTerms: ['type-erasure', 'wildcard', 'collection'],
    syntaxExample: 'List<String> items = new ArrayList<>();'
  },
  {
    id: 'type-erasure',
    term: 'Type Erasure',
    category: 'Collections',
    shortDefinition: 'The compile-time process where Java removes all generic type parameters from bytecode to maintain backward compatibility.',
    formalDefinition: 'Type erasure converts all type parameters to their raw upper bounds (or Object if unbounded) in compiled .class bytecode, inserting necessary runtime casts and synthetic bridge methods.',
    relatedTerms: ['generics', 'bytecode'],
  },
  {
    id: 'wildcard',
    term: 'Wildcard (? in Generics)',
    category: 'Collections',
    shortDefinition: 'An unknown generic type indicator (?) used in generic type declarations to support covariance and contravariance.',
    formalDefinition: 'A wildcard represents an unknown type parameter in generic types. Subtyping uses upper bounds (? extends T, covariance for producers) and lower bounds (? super T, contravariance for consumers) following the PECS principle.',
    relatedTerms: ['generics'],
    syntaxExample: 'public void printAll(List<? extends Number> list) { ... }'
  },
  {
    id: 'lambda-expression',
    term: 'Lambda Expression',
    category: 'Modern',
    shortDefinition: 'An anonymous, inline block of executable code treated as an instance of a functional interface.',
    formalDefinition: 'Introduced in Java 8, a lambda expression is a concise syntax for defining an implementation of a single abstract method (SAM) interface, supporting parameter lists, arrow tokens (->), and expression or block bodies.',
    relatedTerms: ['functional-interface', 'stream'],
    syntaxExample: '(a, b) -> a + b'
  },
  {
    id: 'functional-interface',
    term: 'Functional Interface',
    category: 'Modern',
    shortDefinition: 'An interface that specifies exactly one abstract method, suitable as the target type for lambdas and method references.',
    formalDefinition: 'An interface annotated with @FunctionalInterface (or structurally matching) that declares exactly one abstract method (SAM). It may contain any number of default or static methods.',
    relatedTerms: ['lambda-expression', 'interface'],
    syntaxExample: '@FunctionalInterface public interface Validator<T> { boolean test(T t); }'
  },
  {
    id: 'stream',
    term: 'Stream API',
    category: 'Modern',
    shortDefinition: 'A pipeline of functional operations (filter, map, reduce) applied sequentially or in parallel over sequences of elements.',
    formalDefinition: 'The Stream API (java.util.stream) provides a declarative abstraction for processing collections and data sequences without mutating the underlying data source, utilizing lazy evaluation across intermediate and terminal operations.',
    relatedTerms: ['lambda-expression', 'collection'],
    syntaxExample: 'list.stream().filter(s -> s.length() > 3).toList();'
  },
  {
    id: 'virtual-thread',
    term: 'Virtual Thread (Loom)',
    category: 'Concurrency',
    shortDefinition: 'A lightweight thread managed entirely by the JVM rather than mapped 1:1 to an operating system kernel thread.',
    formalDefinition: 'Standardized in Java 21, virtual threads are user-mode threads scheduled by the JVM on a small pool of carrier OS threads. When a virtual thread blocks on I/O, the JVM unmounts it from the carrier thread, allowing millions of concurrent tasks.',
    relatedTerms: ['thread', 'concurrency'],
    syntaxExample: 'Thread.ofVirtual().start(() -> process());'
  },
  {
    id: 'race-condition',
    term: 'Race Condition',
    category: 'Concurrency',
    shortDefinition: 'A concurrency flaw where the correctness of a program depends on the unpredictable timing or ordering of concurrent threads.',
    formalDefinition: 'A race condition occurs when two or more threads access shared mutable state simultaneously and at least one thread executes a write operation without adequate synchronization, leading to corrupted data.',
    relatedTerms: ['synchronization', 'deadlock', 'thread'],
  },
  {
    id: 'deadlock',
    term: 'Deadlock',
    category: 'Concurrency',
    shortDefinition: 'A situation where two or more threads are permanently blocked, each waiting for a lock held by the other.',
    formalDefinition: 'A deadlock is a concurrent failure state meeting all four Coffman conditions: mutual exclusion, hold and wait, no preemption, and circular wait, resulting in threads remaining halted indefinitely.',
    relatedTerms: ['synchronization', 'thread'],
  },
  {
    id: 'dependency-injection',
    term: 'Dependency Injection (DI)',
    category: 'Backend',
    shortDefinition: 'A design pattern where an object receives its dependencies from an external assembler rather than creating them itself.',
    formalDefinition: 'A specialized form of Inversion of Control (IoC) where a framework (such as Spring) provides client objects with concrete instances of the services or interfaces they require, decoupling object creation from business logic.',
    relatedTerms: ['spring-boot'],
    syntaxExample: '@Autowired public OrderService(PaymentGateway gateway) { ... }'
  },
  {
    id: 'prepared-statement',
    term: 'PreparedStatement',
    category: 'Security',
    shortDefinition: 'A precompiled SQL statement object used in JDBC to execute database queries safely with parameter placeholders.',
    formalDefinition: 'A PreparedStatement precompiles SQL templates on the database server. Values bound to placeholder markers (?) are treated strictly as literal data rather than executable SQL fragments, rendering SQL injection impossible.',
    relatedTerms: ['sql-injection', 'jdbc'],
    syntaxExample: 'PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");'
  },
  {
    id: 'sql-injection',
    term: 'SQL Injection',
    category: 'Security',
    shortDefinition: 'A severe security vulnerability where malicious SQL commands are inserted into data input and executed by the database.',
    formalDefinition: 'SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL string without proper neutralization or parameter binding, allowing attackers to manipulate query logic, bypass authentication, or exfiltrate data.',
    relatedTerms: ['prepared-statement'],
  }
];
