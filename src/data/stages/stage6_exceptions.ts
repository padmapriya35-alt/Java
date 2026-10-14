import { Stage } from '../../types/curriculum';

export const stage6: Stage = {
  id: 6,
  stageNumber: 6,
  title: 'Exceptions & Resilience',
  tagline: 'The Throwable hierarchy, checked vs unchecked exceptions, try-with-resources, and defensive error propagation.',
  description: 'Understand how Java handles exceptional conditions. Master the Throwable taxonomy, the difference between recoverable checked exceptions and unchecked programming bugs, try-with-resources resource management, and custom exception design.',
  iconName: 'AlertTriangle',
  lessons: [
    {
      id: 's6-l1-throwable-hierarchy',
      stageId: 6,
      title: 'The Throwable Hierarchy: Errors vs Exceptions',
      slug: 'throwable-hierarchy-errors-vs-exceptions',
      subtitle: 'The class taxonomy under java.lang.Throwable: Error, Exception, and RuntimeException.',
      readTimeMinutes: 16,
      diagramType: 'exception_hierarchy',
      definition: 'The Throwable class is the root of the Java exception hierarchy. Only instances of Throwable (or its subclasses) can be thrown by the JVM or the throw statement. The hierarchy splits fundamentally into Errors (unrecoverable system disasters) and Exceptions (conditions that applications may handle).',
      simpleExplanation: 'Imagine an airplane. An "Exception" is turbulent weather or a passenger requesting a medical kit: it is unusual and requires immediate protocol handling, but the plane can safely adapt and land. An "Error" is the wing falling off or running out of fuel at 30,000 feet: it is a fatal systemic breakdown from which ordinary application recovery is impossible.',
      whyItExists: 'In older languages, functions returned numeric error codes (like -1 or NULL). Developers routinely forgot to check these codes, leading to silent data corruption and erratic failures hundreds of lines later. Java exceptions interrupt normal control flow and cannot be silently ignored.',
      howItWorks: 'When an abnormal condition occurs, the JVM instantiates an exception object, capturing a snapshot of the execution stack (the stack trace). The JVM halts sequential execution and unwinds the call stack frame-by-frame until it encounters an enclosing `try-catch` block capable of handling that exception type. If no matching handler exists, the thread terminates and prints the stack trace to `System.err`.',
      syntax: '// Throwable Hierarchy:\n// java.lang.Throwable\n//    ├── java.lang.Error (Fatal JVM failure: OutOfMemoryError, StackOverflowError)\n//    └── java.lang.Exception\n//           ├── java.lang.RuntimeException (Unchecked bugs: NullPointerException, IndexOutOfBounds)\n//           └── Checked Exceptions (Mandatory handling: IOException, SQLException)',
      codeExample: `public class HierarchyDistinction {
    public static void main(String[] args) {
        try {
            validatePortNumber(99999);
        } catch (IllegalArgumentException e) {
            System.err.println("Caught Unchecked Exception: " + e.getMessage());
            System.out.println("Handled gracefully; system execution continues.");
        }
    }

    public static void validatePortNumber(int port) {
        if (port < 1 || port > 65535) {
            // Unchecked exception subclassing RuntimeException
            throw new IllegalArgumentException("Port number out of valid TCP/IP range (1-65535): " + port);
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'throw new IllegalArgumentException(...)', explanation: 'Creates a new exception object and throws it, halting sequential execution in this method.' },
        { tokenOrLine: 'try { validatePortNumber(99999); }', explanation: 'Encloses risky code that might throw an exception inside a monitored block.' },
        { tokenOrLine: 'catch (IllegalArgumentException e)', explanation: 'Intercepts any exception of this type, preventing thread termination and allowing recovery.' },
        { tokenOrLine: 'e.getMessage()', explanation: 'Retrieves the diagnostic explanation string provided when the exception was constructed.' }
      ],
      expectedOutput: `Caught Unchecked Exception: Port number out of valid TCP/IP range (1-65535): 99999
Handled gracefully; system execution continues.`,
      commonMistakes: [
        {
          title: 'Catching java.lang.Error or Throwable directly',
          wrongCode: `try {
    performDatabaseOperation();
} catch (Throwable t) { // BAD PRACTICE: Catches OutOfMemoryError, ThreadDeath, etc.
    System.out.println("Error handled!");
}`,
          correctCode: `try {
    performDatabaseOperation();
} catch (Exception e) { // Catches recoverable application exceptions only
    logger.error("Database operation failed", e);
}`,
          whyWrong: 'Errors like OutOfMemoryError or InternalError signify that the JVM is fatally unstable. Swallowing Errors leaves the JVM in a corrupt, unpredictable zombie state.',
          compilerOrRuntimeError: 'Severe anti-pattern: system instability and corrupted state.'
        }
      ],
      comparisons: [
        {
          title: 'Checked Exceptions vs Unchecked Exceptions',
          conceptA: {
            name: 'Checked Exceptions (subclasses of Exception)',
            description: 'Anticipated external environmental failures.',
            characteristics: ['Enforced by compiler: must be caught or declared with throws', 'Examples: IOException, FileNotFoundException, SQLException', 'Used when the caller can realistically recover']
          },
          conceptB: {
            name: 'Unchecked Exceptions (subclasses of RuntimeException)',
            description: 'Programmer logic errors and contract violations.',
            characteristics: ['Not checked by compiler (optional handling)', 'Examples: NullPointerException, ArithmeticException, IndexOutOfBounds', 'Signifies a bug in the code that should be fixed, not caught']
          },
          keyTakeaway: 'Checked exceptions force recovery for external disruptions; unchecked exceptions indicate developer programming mistakes.'
        }
      ],
      summaryPoints: [
        'All exceptions and errors descend from java.lang.Throwable.',
        'Errors represent fatal JVM failures and should never be caught.',
        'Checked exceptions are enforced by the compiler (catch or declare).',
        'Unchecked exceptions extend RuntimeException and represent logic flaws.'
      ],
      knowledgeCheck: [
        {
          id: 'q6-1',
          question: 'Which of the following classes is an unchecked exception in Java?',
          options: ['java.io.IOException', 'java.sql.SQLException', 'java.lang.NullPointerException', 'java.lang.ClassNotFoundException'],
          correctIndex: 2,
          explanation: 'NullPointerException is a subclass of RuntimeException, making it an unchecked exception that the compiler does not mandate catching.'
        }
      ],
      reviewQuestions: [
        'Why have modern Java frameworks largely shifted away from checked exceptions towards unchecked runtime exceptions?',
        'What occurs when an unhandled exception reaches the root of a thread\'s call stack?'
      ]
    },
    {
      id: 's6-l2-handling-and-resources',
      stageId: 6,
      title: 'try, catch, finally, Try-with-Resources & Custom Exceptions',
      slug: 'try-catch-finally-try-with-resources-custom-exceptions',
      subtitle: 'Resource leaks, the AutoCloseable interface, exception chaining, and domain-specific exceptions.',
      readTimeMinutes: 18,
      definition: 'Exception handling is a structured language mechanism for detecting and recovering from runtime errors. Try-with-resources is a Java 7+ construct that automatically closes any resource implementing AutoCloseable at block completion, even in the event of an exception.',
      simpleExplanation: 'Opening a file or database connection is like borrowing a book from a library. If you drop the book or get distracted, you might forget to return it, running out of books for everyone else (a resource leak). Try-with-resources acts like an automatic return slot: as soon as you step away from your desk, the book is guaranteed to be returned cleanly, whether your work succeeded or crashed halfway through.',
      whyItExists: 'Resource leaks (dangling file handles, unclosed database sockets) were historically the #1 cause of server crashes in long-running Java applications. Try-with-resources guarantees deterministic cleanup without verbose, error-prone nested `finally` blocks.',
      howItWorks: 'In a try-with-resources statement, the variables declared within parentheses after `try (...)` are compiled into synthetic try-finally bytecode by javac. At the conclusion of the try block (or when an exception is thrown), the JVM automatically invokes `.close()` on each declared resource in reverse order of declaration. If closing throws an exception alongside an original exception, the close exception is added to the original via `.addSuppressed()`.',
      syntax: '// Try-with-resources (AutoCloseable guaranteed cleanup):\ntry (BufferedReader reader = new BufferedReader(new FileReader(path))) {\n    return reader.readLine();\n} catch (IOException e) {\n    throw new CustomDataException("Failed to read file", e); // Exception chaining\n}',
      codeExample: `import java.io.BufferedReader;
import java.io.StringReader;
import java.io.IOException;

// Custom domain-specific checked exception
class InsufficientInventoryException extends Exception {
    private final int available;
    private final int requested;

    public InsufficientInventoryException(String message, int available, int requested) {
        super(message);
        this.available = available;
        this.requested = requested;
    }

    public int getDeficit() {
        return requested - available;
    }
}

public class ResilienceDemo {
    public static void main(String[] args) {
        // Try-with-resources with mock in-memory AutoCloseable stream:
        try (BufferedReader reader = new BufferedReader(new StringReader("Stock: 5 units"))) {
            String line = reader.readLine();
            System.out.println("Data parsed: " + line);

            processOrder(5, 12); // Will trigger custom domain exception
        } catch (IOException e) {
            System.err.println("I/O failure: " + e.getMessage());
        } catch (InsufficientInventoryException e) {
            System.err.println("Inventory alert: " + e.getMessage());
            System.err.println("Shortage quantity: " + e.getDeficit() + " units needed.");
        } finally {
            System.out.println("Finally block: Housekeeping executed unconditionally.");
        }
    }

    public static void processOrder(int inStock, int orderQuantity) throws InsufficientInventoryException {
        if (orderQuantity > inStock) {
            throw new InsufficientInventoryException("Requested order exceeds warehouse capacity.", inStock, orderQuantity);
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'try (BufferedReader reader = ...)', explanation: 'Try-with-resources declaration. BufferedReader implements AutoCloseable, so reader.close() is guaranteed.' },
        { tokenOrLine: 'class InsufficientInventoryException extends Exception', explanation: 'Defines a custom checked exception preserving domain data (available and requested amounts).' },
        { tokenOrLine: 'throws InsufficientInventoryException', explanation: 'The throws clause in the method signature warns the compiler and callers that this method may propagate this checked exception.' },
        { tokenOrLine: 'finally { ... }', explanation: 'Executes unconditionally whether the try block completes successfully or an exception is caught.' }
      ],
      expectedOutput: `Data parsed: Stock: 5 units
Inventory alert: Requested order exceeds warehouse capacity.
Shortage quantity: 7 units needed.
Finally block: Housekeeping executed unconditionally.`,
      commonMistakes: [
        {
          title: 'Empty catch block (swallowing exceptions)',
          wrongCode: `try {
    account.withdraw(100);
} catch (Exception e) {
    // Empty block: bug is silenced, program continues in corrupted state!
}`,
          correctCode: `try {
    account.withdraw(100);
} catch (InsufficientFundsException e) {
    logger.warn("Withdrawal denied: {}", e.getMessage());
    notifyUser(e.getUserMessage());
}`,
          whyWrong: 'Swallowing exceptions without logging or handling hides serious defects, making debugging nearly impossible in production environments.',
          compilerOrRuntimeError: 'Catastrophic silent bug masking.'
        }
      ],
      comparisons: [
        {
          title: 'throw vs throws',
          conceptA: {
            name: 'throw (The Action Statement)',
            description: 'Executes the actual throwing of an exception instance.',
            characteristics: ['Used inside method bodies: throw new MyException();', 'Halts sequential execution immediately', 'Followed by an exception instance']
          },
          conceptB: {
            name: 'throws (The Contract Declaration)',
            description: 'Declares in the method signature that the method can throw.',
            characteristics: ['Used in method header: void readFile() throws IOException', 'Informs callers of potential checked exceptions', 'Followed by exception class types']
          },
          keyTakeaway: 'throw is an executable command that tosses an exception; throws is a method header declaration warning callers what might be tossed.'
        }
      ],
      summaryPoints: [
        'Use try-with-resources for any object that implements AutoCloseable to eliminate leaks.',
        'The finally block runs unconditionally, even if a return statement is encountered in try or catch.',
        'Exception chaining (passing the root cause exception into the constructor) preserves full diagnostic history.',
        'Never swallow exceptions in empty catch blocks.'
      ],
      knowledgeCheck: [
        {
          id: 'q6-2',
          question: 'What interface must an object implement to be used within a try-with-resources statement parentheses?',
          options: ['java.io.Serializable', 'java.lang.AutoCloseable', 'java.lang.Runnable', 'java.lang.Cloneable'],
          correctIndex: 1,
          explanation: 'Try-with-resources requires the resource to implement java.lang.AutoCloseable (or its subinterface java.io.Closeable), which provides the close() method.'
        }
      ],
      reviewQuestions: [
        'How does Java preserve suppressed exceptions when both the try block and the auto-close operation throw exceptions?',
        'Under what rare conditions will a finally block NOT execute in Java?'
      ]
    }
  ]
};
