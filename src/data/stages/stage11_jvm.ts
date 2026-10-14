import { Stage } from '../../types/curriculum';

export const stage11: Stage = {
  id: 11,
  stageNumber: 11,
  title: 'JVM Architecture & Performance',
  tagline: 'Memory layout, ClassLoader mechanics, Garbage Collection engines, and JIT compiler profiling.',
  description: 'Inspect the inner machinery of the Java Virtual Machine. Master Stack vs Heap memory areas, Metaspace, GC generations (Eden, Survivor, Tenured), modern collectors (G1, ZGC), bytecode disassembly with javap, and performance profiling.',
  iconName: 'Cpu',
  lessons: [
    {
      id: 's11-l1-memory-layout-and-classloading',
      stageId: 11,
      title: 'JVM Memory Layout: Stack, Heap & ClassLoader',
      slug: 'jvm-memory-layout-stack-heap-classloader',
      subtitle: 'Runtime data areas, Young Generation, Old Generation, Metaspace, and class loading phases.',
      readTimeMinutes: 20,
      diagramType: 'memory',
      definition: 'The Java Virtual Machine (JVM) divides process memory into distinct runtime data areas: thread-private areas (JVM Stack, Program Counter register, Native Method Stack) and shared areas (Heap and Metaspace). The ClassLoader subsystem dynamically loads, links, and initializes binary class files into memory.',
      simpleExplanation: 'When your program runs, the JVM acts like a miniature operating system. The Stack is like a stack of papers on a desk: very fast, organized by function calls, but discarded as soon as a function finishes. The Heap is like a large storage warehouse: objects can live there for a long time and be accessed from anywhere. Metaspace stores the actual blueprints (class definitions) in native OS memory.',
      whyItExists: 'Segmenting memory into specialized regions allows the JVM to allocate function variables with lightning speed on the stack, while managing long-lived objects automatically on the heap without risking stack memory exhaustion.',
      howItWorks: `CRITICAL RUNTIME DATA AREAS:

1. JVM STACK (Thread-private):
Stores Stack Frames. Every time a method is called, a frame is pushed holding:
- Local variable array (primitives and object reference pointers).
- Operand stack (where math and comparisons occur).
- Frame data (return values and exception dispatch).
When the method returns, the frame is popped immediately with ZERO garbage collection overhead!

2. HEAP (Shared by all threads):
Managed by Garbage Collection. Divided logically into:
- YOUNG GENERATION:
  - Eden Space: Where brand-new objects are born via "new".
  - Survivor Spaces (S0 / S1): Objects that survive minor GC passes move here.
- OLD (TENURED) GENERATION:
  - Long-lived objects that survive multiple GC cycles (default threshold 15) are promoted here.

3. METASPACE (Native Memory):
Replaced PermGen in Java 8. Stores loaded Class definitions, Method metadata, and runtime constant pools directly in off-heap native OS memory.

4. CLASSLOADER PHASES:
- Loading: Locates .class binary bytes (Bootstrap -> Platform -> Application ClassLoader).
- Linking: Verification (ensures bytecode does not violate safety), Preparation (allocates static fields), Resolution (converts symbolic references to direct pointers).
- Initialization: Executes static { ... } initializer blocks.`,
      syntax: '// Diagnostic JVM Memory Commands:\njava -XX:+PrintFlagsFinal -version\njava -Xms512m -Xmx4g -XX:+UseG1GC App\n\n// Inspecting memory inside code:\nRuntime rt = Runtime.getRuntime();\nlong maxMemory = rt.maxMemory();\nlong freeMemory = rt.freeMemory();',
      codeExample: `public class MemoryIntrospection {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        long maxMemoryMB = runtime.maxMemory() / (1024 * 1024);
        long totalMemoryMB = runtime.totalMemory() / (1024 * 1024);
        long freeMemoryMB = runtime.freeMemory() / (1024 * 1024);
        long usedMemoryMB = totalMemoryMB - freeMemoryMB;

        System.out.println("JVM Max Allocated Heap Limit: " + maxMemoryMB + " MB");
        System.out.println("Current Reserved Heap: " + totalMemoryMB + " MB");
        System.out.println("Active Used Heap: " + usedMemoryMB + " MB");
        System.out.println("Available Processors: " + runtime.availableProcessors());
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'runtime.maxMemory()', explanation: 'Returns the maximum amount of memory the JVM will attempt to use for the heap (-Xmx flag).' },
        { tokenOrLine: 'runtime.totalMemory()', explanation: 'Returns the current heap size committed by the OS to the JVM.' },
        { tokenOrLine: 'totalMemory - freeMemory', explanation: 'Calculates the actual memory currently occupied by live objects on the heap.' },
        { tokenOrLine: 'runtime.availableProcessors()', explanation: 'Returns the number of CPU cores visible to the JVM scheduler.' }
      ],
      expectedOutput: `JVM Max Allocated Heap Limit: 4096 MB
Current Reserved Heap: 256 MB
Active Used Heap: 12 MB
Available Processors: 8`,
      commonMistakes: [
        {
          title: 'Assuming local primitive variables live on the heap',
          wrongCode: `public void test() {
    int count = 5; // WRONG: Thinking this creates a heap object
}`,
          correctCode: `// Local primitives live strictly on the Stack frame.
// Only instances created with "new" and fields inside objects live on the Heap.`,
          whyWrong: 'Local primitives are stored directly in the current method\'s stack frame. When the method finishes, they vanish instantly without GC intervention.',
          compilerOrRuntimeError: 'Conceptual misunderstanding of JVM memory architecture.'
        }
      ],
      comparisons: [
        {
          title: 'Stack Memory vs Heap Memory',
          conceptA: {
            name: 'Stack Memory',
            description: 'Thread-private memory storing active call frames.',
            characteristics: ['Extremely fast LIFO allocation/deallocation', 'Size fixed per thread (typically 1MB, -Xss)', 'Exhaustion causes StackOverflowError', 'Zero Garbage Collection required']
          },
          conceptB: {
            name: 'Heap Memory',
            description: 'Application-wide shared memory storing all objects and arrays.',
            characteristics: ['Dynamically allocated via "new"', 'Configured via -Xms and -Xmx', 'Managed automatically by Garbage Collector', 'Exhaustion causes OutOfMemoryError: Java heap space']
          },
          keyTakeaway: 'The stack manages execution flow and local handles; the heap manages object data and longevity.'
        }
      ],
      summaryPoints: [
        'The JVM Stack is thread-private and stores stack frames for method calls.',
        'The Heap is shared and holds all objects; it is split into Young and Old generations.',
        'Metaspace stores class definitions in native memory outside the heap.',
        'The ClassLoader subsystem follows a delegation model: Bootstrap -> Platform -> App.'
      ],
      knowledgeCheck: [
        {
          id: 'q11-1',
          question: 'Where is an object created with "new BankAccount()" physically allocated in JVM memory?',
          options: [
            'In the current thread\'s Stack frame.',
            'On the shared JVM Heap.',
            'In the CPU instruction cache.',
            'In Metaspace.'
          ],
          correctIndex: 1,
          explanation: 'All objects and arrays in Java are dynamically allocated on the shared JVM Heap. Only the reference variable (the pointer) is stored on the Stack.'
        }
      ],
      reviewQuestions: [
        'Explain the Generational Hypothesis and why separating the heap into Young and Old generations speeds up garbage collection.',
        'How does the ClassLoader Delegation Model prevent malicious replacement of core classes like java.lang.String?'
      ]
    },
    {
      id: 's11-l2-garbage-collection-and-profiling',
      stageId: 11,
      title: 'Garbage Collection Algorithms & Bytecode Profiling',
      slug: 'garbage-collection-bytecode-profiling',
      subtitle: 'Mark-Sweep-Compact, G1GC, ZGC, disassembling with javap, and JIT compilation.',
      readTimeMinutes: 20,
      definition: 'Garbage Collection (GC) is the automated memory management subsystem that reclaims heap memory occupied by unreachable objects. Bytecode profiling involves inspecting compiled instruction sets (via javap) and monitoring JVM runtime execution using diagnostic utilities.',
      simpleExplanation: 'In older languages like C, if you forgot to manually free memory, your program slowly ate up all the computer\'s RAM and crashed. In Java, the Garbage Collector acts like a background recycling crew: it periodically inspects your objects, finds those no longer connected to your running program (unreachable), and recycles their memory automatically.',
      whyItExists: 'Manual memory management is the leading source of memory leaks, double-free bugs, and security buffer overflows. Java\'s GC provides memory safety and eliminates dangling pointers.',
      howItWorks: `CRITICAL GC & JIT MECHANICS:

1. GC ROOTS & REACHABILITY:
An object is "alive" if it is reachable through a reference chain originating from a GC Root:
- Active local variables on any thread's Stack.
- Static class fields.
- JNI native handles.
Unreachable objects are marked for reclamation.

2. MODERN COLLECTORS:
- G1 GC (Garbage-First): Default in modern Java. Divides heap into hundreds of small regional blocks, prioritising regions with the most garbage to meet target pause times (-XX:MaxGCPauseMillis).
- ZGC (Z Garbage Collector): Ultra-low-latency collector with pause times under 1 millisecond, capable of handling multi-terabyte heaps concurrently using colored pointers and load barriers.

3. JIT (JUST-IN-TIME) COMPILER:
The JVM starts by interpreting bytecode. As loops and methods run repeatedly ("hotspots"), the JIT C1 compiler applies basic optimizations. If a method remains hot, the C2 compiler performs aggressive inlining, loop unrolling, and escape analysis, turning bytecode directly into blistering native CPU assembly instructions.

4. BYTECODE INSPECTION (javap):
Using "javap -c ClassName" disassembles .class files, displaying JVM opcodes like iload, istore, invokevirtual, and invokedynamic.`,
      syntax: '// Disassembling Bytecode:\njavap -c -p MyClass.class\n\n// Running with modern ultra-low latency ZGC:\njava -XX:+UseZGC -XX:+ZGenerational App\n\n// Producing Thread Dump for deadlock diagnosis:\njcmd <pid> Thread.dump_to_file /tmp/threads.tdump',
      codeExample: `public class OptimizationWitness {
    // Demonstration of JIT Escape Analysis candidate
    public static void main(String[] args) {
        long start = System.nanoTime();
        long sum = 0;

        for (int i = 0; i < 1_000_000; i++) {
            sum += computeLocalAccumulation(i);
        }

        long elapsedNanos = System.nanoTime() - start;
        System.out.println("Computed checksum: " + sum);
        System.out.println("Execution time: " + (elapsedNanos / 1_000_000.0) + " ms");
    }

    // Hotspot candidate: JIT compiler will inline this method directly into the loop
    public static long computeLocalAccumulation(int val) {
        return (long) val * 2;
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'computeLocalAccumulation(i)', explanation: 'Initially interpreted by the JVM. After running thousands of times, the JIT flags it as a "hotspot".' },
        { tokenOrLine: 'JIT Inlining', explanation: 'The C2 compiler eliminates the method call overhead entirely, replacing computeLocalAccumulation(i) with (long) i * 2 directly inside the CPU loop register.' },
        { tokenOrLine: 'System.nanoTime()', explanation: 'High-resolution nanosecond timer used for micro-benchmarking execution duration.' }
      ],
      expectedOutput: `Computed checksum: 999999000000
Execution time: 4.82 ms`,
      commonMistakes: [
        {
          title: 'Calling System.gc() manually in application code',
          wrongCode: `System.gc(); // BAD PRACTICE: forces stop-the-world GC pass!`,
          correctCode: `// Do not call System.gc(). Let the JVM GC ergonomics schedule collection based on heap thresholds.`,
          whyWrong: 'System.gc() requests a Full GC, which halts all application threads (Stop-The-World pause), destroying throughput and latency.',
          compilerOrRuntimeError: 'Severe performance spikes and application latency degradation.'
        }
      ],
      comparisons: [
        {
          title: 'G1 GC vs ZGC',
          conceptA: {
            name: 'G1 GC (Garbage-First)',
            description: 'Default server collector balancing throughput and latency.',
            characteristics: ['Divides heap into equal-sized regions', 'Predictable pause times (typically 100-200ms)', 'Ideal for standard web applications and general heaps']
          },
          conceptB: {
            name: 'ZGC (Z Garbage Collector)',
            description: 'Scalable ultra-low latency concurrent collector.',
            characteristics: ['Pause times guaranteed under 1ms regardless of heap size', 'Scales to 16TB heaps without pause time growth', 'Uses colored pointers and concurrent marking/relocation']
          },
          keyTakeaway: 'Use default G1 for maximum throughput; switch to ZGC when sub-millisecond API latency is a business mandate.'
        }
      ],
      summaryPoints: [
        'Objects are collected when they are no longer reachable from any GC Root.',
        'G1 GC is the standard default collector; ZGC offers sub-millisecond pause times.',
        'The JIT compiler dynamically transforms hot bytecode into native machine instructions.',
        'Use javap -c to inspect bytecode opcodes and understand JVM execution.',
        'Never call System.gc() in production code.'
      ],
      knowledgeCheck: [
        {
          id: 'q11-2',
          question: 'What is a GC Root in the JVM Garbage Collection algorithm?',
          options: [
            'The first class declared in the root package.',
            'An anchor reference (like an active stack variable or static field) from which object reachability is traced.',
            'The physical disk directory where .class files reside.',
            'The initial operating system process ID.'
          ],
          correctIndex: 1,
          explanation: 'GC Roots are reference anchors that are intrinsically reachable (active thread stack variables, static variables, JNI references). Any object reachable from a root is kept alive.'
        }
      ],
      reviewQuestions: [
        'How does the JIT compiler\'s Escape Analysis determine that an object can be scalar-replaced on the stack instead of allocated on the heap?',
        'What diagnostic steps would you take using jcmd, jstack, and jmap when a production service experiences a memory leak?'
      ]
    }
  ]
};
