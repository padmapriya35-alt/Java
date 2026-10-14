import { Stage } from '../../types/curriculum';

export const stage8: Stage = {
  id: 8,
  stageNumber: 8,
  title: 'Modern Java (Java 8 to 21)',
  tagline: 'Functional programming, Streams API, Records, Sealed classes, and Pattern Matching.',
  description: 'Master the evolutionary leap of Java. Learn lambdas, method references, declarative Stream pipelines, Optional anti-null discipline, and modern features like Records (Java 16), Sealed Classes (Java 17), and Pattern Matching (Java 21).',
  iconName: 'Sparkles',
  lessons: [
    {
      id: 's8-l1-lambdas-and-functional-interfaces',
      stageId: 8,
      title: 'Lambda Expressions & Functional Interfaces',
      slug: 'lambdas-and-functional-interfaces',
      subtitle: 'Single Abstract Method (SAM) types, arrow syntax (->), target typing, and method references (::).',
      readTimeMinutes: 18,
      versionRequirement: 'Java 8+',
      definition: 'A lambda expression is an anonymous function that can be passed around as if it were an object and executed on demand. A functional interface is an interface that declares exactly one abstract method (Single Abstract Method or SAM).',
      simpleExplanation: 'In older Java, to pass a piece of logic (like "how to sort a list"), you had to write a full anonymous class with 6 lines of boilerplate code. A lambda lets you pass the behavior directly as a compact mathematical expression: (input) -> { action }.',
      whyItExists: 'Modern multi-core processors demand concurrent, functional programming paradigms. Lambdas eliminate verbose anonymous inner classes and enable expressive, declarative data processing.',
      howItWorks: 'The Java compiler maps a lambda expression to a functional interface through a mechanism called target typing. Under the hood (unlike anonymous classes which generate .class files), the JVM uses the `invokedynamic` bytecode instruction (JSR 292) and `LambdaMetafactory` to create and link call sites dynamically at runtime with near-zero memory and startup penalty.',
      syntax: '// Lambda Syntax:\n(parameters) -> expression\n(parameters) -> { statements; return value; }\n\n// Method Reference Syntax:\nClassName::methodName',
      syntaxTokens: [
        { token: '->', meaning: 'Arrow token separating parameter declarations from the executable body.' },
        { token: '::', meaning: 'Method reference operator referring to an existing method without executing it.' },
        { token: '@FunctionalInterface', meaning: 'Informative annotation verifying the interface has exactly one abstract method.' }
      ],
      codeExample: `import java.util.List;
import java.util.function.Predicate;
import java.util.function.Function;

public class FunctionalElegance {
    public static void main(String[] args) {
        List<String> names = List.of("Grace Hopper", "Alan Turing", "Ada Lovelace");

        // Standard functional interface: Predicate<T> (returns boolean)
        Predicate<String> startsWithA = name -> name.startsWith("A");

        // Standard functional interface: Function<T, R> (transforms T to R)
        Function<String, Integer> lengthCalculator = String::length; // Method reference

        for (String name : names) {
            if (startsWithA.test(name)) {
                System.out.println("Matches predicate 'A': " + name);
            }
            System.out.println(name + " char length: " + lengthCalculator.apply(name));
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'Predicate<String> startsWithA = name -> name.startsWith("A");', explanation: 'Defines a lambda implementing Predicate\'s single boolean test(T t) method concisely.' },
        { tokenOrLine: 'String::length', explanation: 'Method reference equivalent to name -> name.length(), delegating directly to the existing instance method.' },
        { tokenOrLine: 'startsWithA.test(name)', explanation: 'Executes the lambda function against the candidate string.' }
      ],
      expectedOutput: `Grace Hopper char length: 12
Matches predicate 'A': Alan Turing
Alan Turing char length: 11
Matches predicate 'A': Ada Lovelace
Ada Lovelace char length: 12`,
      commonMistakes: [
        {
          title: 'Mutating non-final local variables inside a lambda',
          wrongCode: `int total = 0;
list.forEach(n -> total += n); // COMPILER ERROR!`,
          correctCode: `// Use functional reductions or atomic containers:
int total = list.stream().mapToInt(Integer::intValue).sum();`,
          whyWrong: 'Variables accessed from outside a lambda body must be "effectively final" (their value never changes). This prevents concurrent race conditions across thread boundaries.',
          compilerOrRuntimeError: 'error: local variables referenced from a lambda expression must be final or effectively final'
        }
      ],
      comparisons: [
        {
          title: 'Anonymous Inner Class vs Lambda Expression',
          conceptA: {
            name: 'Anonymous Inner Class',
            description: 'Traditional Java mechanism for creating inline object implementations.',
            characteristics: ['Generates a separate .class file on disk', 'Creates a full object allocation every time', 'Its "this" refers to the anonymous inner class itself']
          },
          conceptB: {
            name: 'Lambda Expression (Java 8+)',
            description: 'Compact functional implementation linked via invokedynamic.',
            characteristics: ['No extra .class files created', 'Optimized by JVM via LambdaMetafactory', 'Its "this" refers to the enclosing class (lexical scoping)']
          },
          keyTakeaway: 'Use lambdas wherever a functional interface is needed for clean syntax, less memory, and better performance.'
        }
      ],
      summaryPoints: [
        'A lambda is an anonymous function implementing a Single Abstract Method (SAM) interface.',
        'Core functional interfaces live in java.util.function: Predicate, Function, Consumer, Supplier.',
        'Method references (ClassName::method) provide even cleaner syntax when delegating to existing methods.',
        'Outer local variables used inside lambdas must be effectively final.'
      ],
      knowledgeCheck: [
        {
          id: 'q8-1',
          question: 'What is a Functional Interface in Java?',
          options: [
            'An interface that only contains static methods.',
            'An interface that declares exactly one abstract method.',
            'An interface that cannot be implemented by any class.',
            'An interface reserved strictly for mathematical calculations.'
          ],
          correctIndex: 1,
          explanation: 'A functional interface is defined as any interface containing exactly one abstract method, making it eligible as the target type for lambdas.'
        }
      ],
      reviewQuestions: [
        'Why does Java require local variables captured in a lambda to be effectively final?',
        'How does invokedynamic differ from traditional invokevirtual in JVM bytecode?'
      ]
    },
    {
      id: 's8-l2-streams-and-optional',
      stageId: 8,
      title: 'The Streams API & Optional Anti-Null Discipline',
      slug: 'streams-api-and-optional',
      subtitle: 'Pipelines, intermediate vs terminal operations, lazy evaluation, and eliminating NullPointerException.',
      readTimeMinutes: 20,
      versionRequirement: 'Java 8+',
      definition: 'A Stream is a sequence of elements supporting sequential and parallel aggregate operations. Optional is a container object which may or may not contain a non-null value, providing a type-safe alternative to returning null.',
      simpleExplanation: 'A Stream is an assembly line in a factory. Items travel down a conveyor belt: some are inspected and removed (filter), some are painted a new color (map), and at the end of the belt they are packed into a shipping container (collect). The conveyor belt does not store items; it processes them in motion.',
      whyItExists: 'Imperative loops with nested if statements for filtering and transforming data are long, prone to off-by-one errors, and difficult to parallelize. Streams express what data transformation you want rather than how to manually step through loops.',
      howItWorks: `CRITICAL STREAM ARCHITECTURE:

1. LAZY EVALUATION:
Intermediate operations (like .filter(), .map(), .sorted()) do NOT execute when called! They simply configure the pipeline. Execution only happens when a TERMINAL operation (like .collect(), .reduce(), .findFirst()) is invoked.

2. SHORT-CIRCUIT EVALUATION:
Operations like .findFirst() or .anyMatch() stop processing as soon as a match is found without reading the rest of the stream.

3. OPTIONAL DISCIPLINE:
Instead of returning null when an item is not found (which causes NullPointerException later), methods return Optional<T>. This forces the calling developer to handle both the present and absent cases explicitly.`,
      syntax: '// Stream Pipeline:\nsource.stream()\n      .filter(predicate)      // Intermediate\n      .map(transformation)   // Intermediate\n      .collect(Collectors.toList()); // Terminal\n\n// Optional Usage:\nOptional<User> user = findById(id);\nString name = user.map(User::getName).orElse("Guest");',
      codeExample: `import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class StreamsAndOptionalMastery {
    public static void main(String[] args) {
        List<String> transactions = List.of(
            "CREDIT:150", "DEBIT:20", "CREDIT:80", "DEBIT:500", "CREDIT:320"
        );

        // Declarative Stream Pipeline:
        List<Integer> highValueCredits = transactions.stream()
            .filter(tx -> tx.startsWith("CREDIT:"))
            .map(tx -> Integer.parseInt(tx.substring(7)))
            .filter(amount -> amount >= 100)
            .sorted()
            .collect(Collectors.toList());

        System.out.println("Filtered & Sorted Credits >= 100: " + highValueCredits);

        // Optional Anti-Null Demonstration:
        Optional<Integer> largestCredit = transactions.stream()
            .filter(tx -> tx.startsWith("CREDIT:"))
            .map(tx -> Integer.parseInt(tx.substring(7)))
            .max(Integer::compareTo);

        // Safely extract without risk of NullPointerException:
        String summary = largestCredit
            .map(val -> "Top credit found: $" + val)
            .orElse("No credit transactions recorded.");

        System.out.println(summary);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'transactions.stream()', explanation: 'Creates a stream source from the list.' },
        { tokenOrLine: '.filter(tx -> tx.startsWith("CREDIT:"))', explanation: 'Intermediate filter keeping only transaction tokens starting with "CREDIT:".' },
        { tokenOrLine: '.map(tx -> Integer.parseInt(...))', explanation: 'Transforms String elements into Integer numerical values.' },
        { tokenOrLine: '.collect(Collectors.toList())', explanation: 'Terminal operation triggering pipeline execution and gathering results into a new List.' },
        { tokenOrLine: 'largestCredit.map(...).orElse(...)', explanation: 'Safely transforms present value or provides a clean default without branching or null checks.' }
      ],
      expectedOutput: `Filtered & Sorted Credits >= 100: [150, 320]
Top credit found: $320`,
      commonMistakes: [
        {
          title: 'Reusing a Stream after a terminal operation has already executed',
          wrongCode: `Stream<String> stream = list.stream();
stream.forEach(System.out::println);
stream.filter(s -> s.length() > 2); // RUNTIME EXCEPTION!`,
          correctCode: `list.stream().forEach(System.out::println);
list.stream().filter(s -> s.length() > 2); // Create fresh stream`,
          whyWrong: 'A Stream is a single-use pipeline. Once a terminal operation completes, the stream is closed and cannot be operated on again.',
          compilerOrRuntimeError: 'java.lang.IllegalStateException: stream has already been operated upon or closed'
        },
        {
          title: 'Calling Optional.get() without checking isPresent()',
          wrongCode: `Optional<User> user = findUser(id);
User u = user.get(); // DANGEROUS: Throws NoSuchElementException if empty!`,
          correctCode: `User u = user.orElseThrow(() -> new NotFoundException("User not found: " + id));`,
          whyWrong: 'Calling .get() directly defeats the safety purpose of Optional, trading NullPointerException for NoSuchElementException.',
          compilerOrRuntimeError: 'java.util.NoSuchElementException: No value present'
        }
      ],
      comparisons: [
        {
          title: 'Collections vs Streams',
          conceptA: {
            name: 'Collection (Data in Memory)',
            description: 'In-memory data structure storing elements.',
            characteristics: ['Eagerly evaluated (all elements exist now)', 'Can be traversed multiple times', 'Focuses on storage and access']
          },
          conceptB: {
            name: 'Stream (Computation in Motion)',
            description: 'Fixed-pipeline computation over a sequence.',
            characteristics: ['Lazily evaluated on demand', 'Traversed only once', 'Focuses on transformation and filtering']
          },
          keyTakeaway: 'Collections are about storing data; Streams are about processing data.'
        }
      ],
      summaryPoints: [
        'Streams do not store data; they transform data from a source through a pipeline.',
        'Intermediate operations are lazy and do not execute until a terminal operation is called.',
        'Optional<T> replaces null returns, forcing callers to handle missing data safely.',
        'Never call Optional.get() blindly; use .orElse(), .orElseGet(), or .orElseThrow().'
      ],
      knowledgeCheck: [
        {
          id: 'q8-2',
          question: 'What happens when you call .filter() and .map() on a Stream without calling a terminal operation like .collect() or .forEach()?',
          options: [
            'The entire stream is processed immediately in memory.',
            'Nothing happens at all because intermediate operations are evaluated lazily.',
            'A NullPointerException is thrown.',
            'The original collection is cleared.'
          ],
          correctIndex: 1,
          explanation: 'Stream intermediate operations are lazy. No elements are pulled through the pipeline until a terminal operation initiates execution.'
        }
      ],
      reviewQuestions: [
        'How does parallelStream() leverage the ForkJoinPool, and when can it harm performance instead of helping?',
        'Why should Optional never be used as a field in a class or as a method parameter?'
      ]
    },
    {
      id: 's8-l3-modern-features-records-sealed-pattern',
      stageId: 8,
      title: 'Modern Java Features: Records, Sealed Classes & Pattern Matching',
      slug: 'records-sealed-classes-pattern-matching',
      subtitle: 'Immutable data carriers (Java 16), restricted class hierarchies (Java 17), and pattern matching (Java 21).',
      readTimeMinutes: 20,
      versionRequirement: 'Java 17 & Java 21 LTS',
      definition: 'Records (Java 16) are transparent, immutable data carrier classes that automatically generate private final fields, constructors, getters, equals(), hashCode(), and toString(). Sealed classes (Java 17) restrict which other classes may extend or implement them. Pattern matching (Java 17-21) combines type testing and variable extraction into a single atomic operation.',
      simpleExplanation: 'Writing a simple data-holding class historically required 50 lines of boilerplate (private fields, constructor, getters, equals, hashCode, toString). A Record gives you all 50 lines in a single one-liner. Sealed classes let you say: "Only these three specific classes can ever be subclasses of this base class." Pattern matching lets you test if an object is a String and extract it into a typed variable all in one go.',
      whyItExists: 'Modern Java eliminates verbosity, boilerplate code, and unsafe type casting, allowing Java code to be as concise and safe as modern functional languages like Scala, Rust, and Kotlin.',
      howItWorks: 'A `record Point(int x, int y) {}` is compiled into a final class extending `java.lang.Record`. All component fields are strictly `private final`. Sealed classes enforce compile-time exhaustiveness: when switching over a sealed class, the compiler knows every possible subclass, so it can guarantee that all cases are handled without needing a `default` clause.',
      syntax: '// Record (Java 16):\npublic record User(String id, String email) {}\n\n// Sealed Hierarchy (Java 17):\npublic sealed interface Shape permits Circle, Rectangle {}\n\n// Pattern Matching Switch (Java 21):\nString desc = switch (shape) {\n    case Circle c -> "Radius: " + c.radius();\n    case Rectangle r -> "Area: " + (r.w() * r.h());\n};',
      syntaxTokens: [
        { token: 'record', meaning: 'Keyword declaring an immutable data class with automated constructors and accessors.' },
        { token: 'sealed', meaning: 'Keyword restricting inheritance to an explicitly permitted list of subclasses.' },
        { token: 'permits', meaning: 'Clause enumerating the exact subclasses allowed to extend the sealed class.' },
        { token: 'case Circle c', meaning: 'Pattern matching case testing type and creating typed variable "c" simultaneously.' }
      ],
      codeExample: `// Sealed interface restricting implementations:
sealed interface PaymentResult permits Success, Failed {}

// Immutable Records implementing the sealed interface:
record Success(String transactionId, double amount) implements PaymentResult {}
record Failed(String reason, int errorCode) implements PaymentResult {}

public class ModernLanguageFeatures {
    public static void main(String[] args) {
        PaymentResult res1 = new Success("TXN-9841", 149.99);
        PaymentResult res2 = new Failed("Insufficient credit limit", 402);

        System.out.println(evaluateResult(res1));
        System.out.println(evaluateResult(res2));
    }

    // Pattern Matching for Switch with Sealed Classes (Exhaustive!):
    public static String evaluateResult(PaymentResult result) {
        return switch (result) {
            case Success s -> "APPROVED: $" + s.amount() + " [Ref: " + s.transactionId() + "]";
            case Failed f -> "DECLINED: " + f.reason() + " (Code: " + f.errorCode() + ")";
            // No default required because PaymentResult is sealed and exhaustive!
        };
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'sealed interface PaymentResult permits Success, Failed', explanation: 'Restricts the domain model to exactly two possible outcomes. No third party can subclass it.' },
        { tokenOrLine: 'record Success(String transactionId, double amount)', explanation: 'Generates immutable class with transactionId() and amount() accessors, equals, and hashCode.' },
        { tokenOrLine: 'case Success s -> ...', explanation: 'Pattern matching tests if result is an instance of Success and safely unwraps it into local variable "s".' },
        { tokenOrLine: 'No default clause needed', explanation: 'The compiler inspects the sealed interface, verifies all permitted types are covered, and guarantees exhaustiveness.' }
      ],
      expectedOutput: `APPROVED: $149.99 [Ref: TXN-9841]
DECLINED: Insufficient credit limit (Code: 402)`,
      commonMistakes: [
        {
          title: 'Trying to mutate a field in a Java Record',
          wrongCode: `record Point(int x, int y) {}
Point p = new Point(10, 20);
p.x = 30; // COMPILER ERROR!`,
          correctCode: `// Records are immutable. To change state, create a new record:
Point updated = new Point(30, p.y());`,
          whyWrong: 'Record fields are implicitly private and final. Records cannot have mutator setter methods.',
          compilerOrRuntimeError: 'error: cannot assign a value to final variable x'
        }
      ],
      comparisons: [
        {
          title: 'Standard Class vs Java Record',
          conceptA: {
            name: 'Standard Class',
            description: 'Traditional mutable or immutable object blueprint.',
            characteristics: ['Requires manual or generated getters, setters, equals, hashCode', 'Can extend any other class', 'Fields can be mutable']
          },
          conceptB: {
            name: 'Java Record (Java 16+)',
            description: 'Pure immutable transparent data carrier.',
            characteristics: ['One-line declaration creates all getters, constructors, equals, hash', 'Implicitly final and extends java.lang.Record', 'All fields are strictly private final']
          },
          keyTakeaway: 'Use Records for DTOs, API payloads, and immutable value objects; use standard classes when mutable state or complex inheritance is necessary.'
        }
      ],
      summaryPoints: [
        'Records (Java 16) provide concise syntax for immutable data carriers.',
        'Sealed classes (Java 17) restrict inheritance to a closed set of permitted subtypes.',
        'Pattern matching for switch (Java 21) enables type checks, extraction, and compiler-verified exhaustiveness.',
        'Text blocks (Java 15) allow clean multi-line JSON, SQL, or HTML strings using triple quotes (""").'
      ],
      knowledgeCheck: [
        {
          id: 'q8-3',
          question: 'Why does a switch expression over a sealed interface not require a "default" clause?',
          options: [
            'Because modern Java ignores missing cases automatically.',
            'Because the compiler inspects the permits list and knows that every possible subtype has been handled.',
            'Because default is forbidden in switch expressions.',
            'Because sealed interfaces cannot have more than two implementations.'
          ],
          correctIndex: 1,
          explanation: 'Sealed types provide exhaustive type hierarchies. If all permitted subtypes are handled, the compiler proves that no unhandled case can exist at runtime.'
        }
      ],
      reviewQuestions: [
        'How do compact constructors in Java records enable clean validation of fields without repeating parameter assignments?',
        'What advantages do sealed interfaces provide when designing domain-driven architectures?'
      ]
    }
  ]
};
