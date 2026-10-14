import { Stage } from '../../types/curriculum';

export const stage10: Stage = {
  id: 10,
  stageNumber: 10,
  title: 'Concurrency & Multithreading',
  tagline: 'Thread mechanics, synchronization, race conditions, memory visibility, and Virtual Threads.',
  description: 'Master parallel execution in Java. Learn the difference between processes and threads, the Java Memory Model (JMM), intrinsic locks, ExecutorService thread pools, atomic variables, and modern Virtual Threads (Project Loom) in Java 21.',
  iconName: 'Cpu',
  lessons: [
    {
      id: 's10-l1-thread-fundamentals-synchronization',
      stageId: 10,
      title: 'Thread Fundamentals, Synchronization & Race Conditions',
      slug: 'thread-fundamentals-synchronization-race-conditions',
      subtitle: 'Threads vs processes, intrinsic monitor locks, critical sections, and deadlock prevention.',
      readTimeMinutes: 20,
      diagramType: 'thread_lifecycle',
      definition: 'A thread is the smallest unit of execution dispatched by the operating system scheduler within a process. A race condition is an undesirable situation that occurs when two or more concurrent threads access shared mutable state and attempt to modify it simultaneously without adequate synchronization.',
      simpleExplanation: 'Imagine two people sharing a single bank account. Person A checks the balance ($100) and decides to withdraw $80. At the exact same millisecond, Person B checks the balance ($100) and decides to withdraw $80. If they both withdraw at once, they take $160 from a $100 account! Synchronization is like a lock on the bank teller\'s door: Person A enters and locks the door; Person B must wait outside until Person A finishes.',
      whyItExists: 'Modern CPUs contain dozens of physical processing cores. Writing multithreaded programs allows applications to perform heavy computations in the background, serve thousands of web users simultaneously, and remain responsive.',
      howItWorks: `CRITICAL THREAD CONCEPTS:

1. PROCESS VS THREAD:
A process is an isolated execution environment with its own dedicated memory space (allocated by the OS). A thread lives inside a process, sharing the process's Heap memory with other threads, but maintaining its own private Call Stack.

2. ATOMICITY & THE RACE CONDITION:
The statement "count++" looks like one step in Java, but compiles into THREE separate bytecode operations:
a. Read current count from memory into CPU register.
b. Increment register by 1.
c. Write register value back to memory.
If two threads interleave these steps, one increment is lost!

3. INTRINSIC LOCKS (SYNCHRONIZED):
Every Java object has an internal lock called an intrinsic lock or "monitor". When a thread enters a "synchronized" block or method, it acquires the monitor lock. Any other thread attempting to enter a synchronized block on the same object is suspended (BLOCKED) until the owner exits.`,
      syntax: '// Synchronized Method:\npublic synchronized void deposit(int amount) { balance += amount; }\n\n// Synchronized Block (preferred for fine-grained locking):\nsynchronized (lockObject) {\n    // Critical section\n}',
      syntaxTokens: [
        { token: 'Thread', meaning: 'Class representing an execution thread in the JVM.' },
        { token: 'Runnable', meaning: 'Functional interface representing the task logic to be executed by a thread.' },
        { token: 'synchronized', meaning: 'Keyword enforcing mutual exclusion on an object\'s monitor lock.' }
      ],
      codeExample: `public class ThreadRaceProof {
    private static int counter = 0;
    private static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 1000; i++) {
                // Synchronized block guarantees mutual exclusion:
                synchronized (lock) {
                    counter++;
                }
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);

        t1.start();
        t2.start();

        // Wait for both threads to finish execution
        t1.join();
        t2.join();

        System.out.println("Final synchronized counter (expected 2000): " + counter);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'synchronized (lock)', explanation: 'Acquires monitor lock on object "lock". Only one thread can execute this block at a time.' },
        { tokenOrLine: 't1.start(); t2.start();', explanation: 'Transitions threads from NEW to RUNNABLE, requesting the OS kernel to schedule them.' },
        { tokenOrLine: 't1.join(); t2.join();', explanation: 'Causes the main thread to wait until t1 and t2 terminate before continuing.' },
        { tokenOrLine: 'System.out.println(counter);', explanation: 'Prints 2000 reliably. Without synchronized, race conditions cause counts like 1742 or 1891.' }
      ],
      expectedOutput: `Final synchronized counter (expected 2000): 2000`,
      commonMistakes: [
        {
          title: 'Calling run() instead of start() to launch a thread',
          wrongCode: `Thread t = new Thread(() -> doWork());
t.run(); // BUG: Runs synchronously on the CURRENT thread!`,
          correctCode: `Thread t = new Thread(() -> doWork());
t.start(); // Correct: Launches a new concurrent thread in the OS`,
          whyWrong: 'Calling .run() directly does not create a new thread; it simply executes the code synchronously inside the calling thread.',
          compilerOrRuntimeError: 'Logic error: code runs sequentially instead of concurrently.'
        },
        {
          title: 'Creating deadlocks through inconsistent lock acquisition order',
          wrongCode: `// Thread 1:
synchronized (lockA) {
    synchronized (lockB) { ... }
}
// Thread 2 (Reverse order creates deadlock!):
synchronized (lockB) {
    synchronized (lockA) { ... }
}`,
          correctCode: `// Always acquire locks in the identical global order across all threads:
synchronized (lockA) {
    synchronized (lockB) { ... }
}`,
          whyWrong: 'Thread 1 holds lockA waiting for lockB; Thread 2 holds lockB waiting for lockA. Both threads freeze forever.',
          compilerOrRuntimeError: 'Deadlock: complete application freeze.'
        }
      ],
      comparisons: [
        {
          title: 'Synchronized Block vs Synchronized Method',
          conceptA: {
            name: 'Synchronized Method',
            description: 'Locks the entire method on "this" (or Class for static).',
            characteristics: ['Simpler to write', 'Locks the entire method duration', 'Exposes lock object publicly (callers can lock on your instance)']
          },
          conceptB: {
            name: 'Synchronized Block (with private lock)',
            description: 'Locks only the critical lines on a private final object.',
            characteristics: ['Fine-grained: minimises time lock is held', 'Encapsulated: external code cannot interfere with internal lock', 'Superior concurrency and throughput']
          },
          keyTakeaway: 'Prefer synchronized blocks locking on a private final Object lock = new Object() to avoid external lock contention.'
        }
      ],
      summaryPoints: [
        'Threads share the heap but have private call stacks.',
        'Race conditions occur when shared mutable data is accessed concurrently without locks.',
        'The synchronized keyword enforces mutual exclusion using object monitor locks.',
        'Always acquire multiple locks in the identical order to avoid deadlocks.'
      ],
      knowledgeCheck: [
        {
          id: 'q10-1',
          question: 'What is the consequence of calling thread.run() instead of thread.start() in Java?',
          options: [
            'The program throws an IllegalThreadStateException.',
            'The method executes synchronously on the current thread without creating a new concurrent thread.',
            'The thread runs with maximum operating system priority.',
            'The JVM converts the thread into a virtual thread.'
          ],
          correctIndex: 1,
          explanation: 'Only start() asks the JVM and OS to create and schedule a new execution thread. Calling run() executes the method sequentially within the caller thread.'
        }
      ],
      reviewQuestions: [
        'What are the four Coffman conditions required for a deadlock to occur, and how can breaking circular wait prevent it?',
        'What is thread starvation and how does a fair lock (ReentrantLock(true)) resolve it?'
      ]
    },
    {
      id: 's10-l2-executors-atomics-virtual-threads',
      stageId: 10,
      title: 'Executors, Atomics & Virtual Threads (Project Loom)',
      slug: 'executors-atomics-virtual-threads',
      subtitle: 'ExecutorService thread pools, AtomicInteger CAS, volatile memory visibility, and lightweight Virtual Threads in Java 21.',
      readTimeMinutes: 20,
      versionRequirement: 'Java 21 LTS for Virtual Threads',
      definition: 'Virtual Threads (standardized in Java 21) are lightweight, user-mode threads managed entirely by the JVM that dramatically reduce the cost of running high-throughput concurrent applications. Atomic classes use hardware-level Compare-And-Swap (CAS) instructions for lock-free thread safety.',
      simpleExplanation: 'Traditional Java threads are heavy: each thread maps 1:1 to an operating system thread, consuming ~1MB of memory. Creating 10,000 traditional threads would crash your server. Virtual threads are feather-light (consuming only a few hundred bytes). You can easily create 1,000,000 virtual threads on a normal laptop! When a virtual thread waits for a database or network response, the JVM unmounts it from the physical CPU and lets another task run.',
      whyItExists: 'Modern web backends spend most of their time waiting for network requests, database queries, and disk I/O. Virtual threads allow developers to write clean, synchronous, blocking code (like `user = db.query()`) while achieving the massive scale previously only possible with complex reactive asynchronous frameworks.',
      howItWorks: 'The JVM maintains a small pool of OS platform threads called "carrier threads". When a virtual thread executes CPU code, it is mounted onto a carrier thread. When it performs a blocking I/O call (like reading a socket), the JVM parks the virtual thread on the heap and frees the carrier thread to execute other virtual threads. When the I/O completes, the JVM schedules the virtual thread onto an available carrier thread to continue.',
      syntax: '// Java 21 Virtual Thread Launcher:\nThread.startVirtualThread(() -> doWork());\n\n// Java 21 Virtual Thread Executor:\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    executor.submit(() -> fetchApiData());\n}\n\n// Atomic Operations:\nAtomicInteger atomicCount = new AtomicInteger(0);\natomicCount.incrementAndGet();',
      syntaxTokens: [
        { token: 'VirtualThread', meaning: 'JVM-scheduled lightweight thread with tiny memory footprint.' },
        { token: 'volatile', meaning: 'Guarantees direct memory visibility across CPU cores, preventing thread cache staleness.' },
        { token: 'AtomicInteger', meaning: 'Thread-safe integer container utilizing lock-free CPU CAS instructions.' }
      ],
      codeExample: `import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

public class ModernConcurrencyShowcase {
    public static void main(String[] args) throws Exception {
        AtomicInteger completedTasks = new AtomicInteger(0);

        // Java 21 Virtual Thread Executor (try-with-resources waits for all tasks to complete):
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 1000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    // Simulate blocking I/O work (unmounts virtual thread from carrier thread):
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException ignored) {}

                    completedTasks.incrementAndGet(); // Lock-free thread-safe increment
                });
            }
        } // Executor close() waits for all 1000 virtual tasks to finish

        System.out.println("All virtual tasks finished successfully!");
        System.out.println("Total completed tasks: " + completedTasks.get());
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'Executors.newVirtualThreadPerTaskExecutor()', explanation: 'Creates an executor that spawns an ultra-lightweight virtual thread for every submitted task.' },
        { tokenOrLine: 'Thread.sleep(10)', explanation: 'In a virtual thread, sleeping does NOT freeze an OS thread. The JVM unmounts the virtual thread, freeing the carrier thread.' },
        { tokenOrLine: 'completedTasks.incrementAndGet()', explanation: 'Uses hardware-level CAS (Compare-And-Swap) to atomically increment the integer without holding locks.' },
        { tokenOrLine: 'try (var executor = ...) { }', explanation: 'AutoCloseable executor block automatically awaits completion of all submitted tasks before exiting.' }
      ],
      expectedOutput: `All virtual tasks finished successfully!
Total completed tasks: 1000`,
      commonMistakes: [
        {
          title: 'Pooling virtual threads like traditional platform threads',
          wrongCode: `// ANTI-PATTERN: Never pool virtual threads!
ExecutorService pool = Executors.newFixedThreadPool(10);`,
          correctCode: `// CORRECT: Create a new virtual thread per task:
ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();`,
          whyWrong: 'Virtual threads are cheap and meant to be short-lived. Pooling them limits concurrency and wastes JVM scheduling optimizations.',
          compilerOrRuntimeError: 'Anti-pattern: negates the scalability benefits of Project Loom.'
        }
      ],
      comparisons: [
        {
          title: 'Platform Threads vs Virtual Threads (Java 21)',
          conceptA: {
            name: 'Platform Threads (Traditional)',
            description: '1:1 mapping with operating system kernel threads.',
            characteristics: ['Heavy: ~1MB stack memory per thread', 'Limited to a few thousand per machine', 'Blocking I/O ties up the physical OS thread']
          },
          conceptB: {
            name: 'Virtual Threads (Java 21+ Project Loom)',
            description: 'M:N mapping managed by the JVM over carrier threads.',
            characteristics: ['Feather-light: few hundred bytes initial footprint', 'Can run millions of concurrent threads simultaneously', 'Blocking I/O unmounts thread, keeping CPU utilized']
          },
          keyTakeaway: 'Use virtual threads for I/O-bound tasks (web servers, database queries); keep platform threads for heavy continuous CPU-bound computations (video rendering).'
        }
      ],
      summaryPoints: [
        'volatile ensures that changes made by one thread are immediately visible to all other threads.',
        'Atomic classes (AtomicInteger, AtomicReference) provide lock-free thread safety using CPU CAS operations.',
        'Java 21 Virtual Threads allow millions of concurrent tasks with blocking synchronous code style.',
        'Never pool virtual threads; spawn one per task.'
      ],
      knowledgeCheck: [
        {
          id: 'q10-2',
          question: 'What happens when a Java 21 Virtual Thread blocks on a network socket read?',
          options: [
            'The underlying operating system thread is permanently frozen.',
            'The JVM unmounts the virtual thread from its carrier thread, allowing other virtual threads to use the carrier thread.',
            'The JVM throws a VirtualThreadBlockedException.',
            'The virtual thread is permanently killed.'
          ],
          correctIndex: 1,
          explanation: 'When a virtual thread blocks on I/O, the JVM unmounts it from the carrier OS thread, parking its state on the heap and freeing the OS thread to do other work.'
        }
      ],
      reviewQuestions: [
        'What is thread pinning in virtual threads, and why does executing synchronized blocks or native methods inside a virtual thread cause it?',
        'How does the Java Memory Model (JMM) define the happens-before relationship for volatile variables?'
      ]
    }
  ]
};
