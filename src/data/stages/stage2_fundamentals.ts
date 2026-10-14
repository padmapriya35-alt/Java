import { Stage } from '../../types/curriculum';

export const stage2: Stage = {
  id: 2,
  stageNumber: 2,
  title: 'Language Fundamentals',
  tagline: 'Program anatomy, variables, memory allocation, primitives, references, operators, strings, and arrays.',
  description: 'Master the fundamental building blocks of Java programs. Learn how the type system functions, how variables hold data in memory, how primitives differ from reference types, and how the main entry method operates.',
  iconName: 'BookOpen',
  lessons: [
    {
      id: 's2-l1-program-structure',
      stageId: 2,
      title: 'Program Structure & The main Entry Point',
      slug: 'program-structure-main-method',
      subtitle: 'Understanding packages, class declarations, statements, and the anatomy of public static void main.',
      readTimeMinutes: 14,
      definition: 'A Java program is a collection of one or more classes where execution begins at a specifically designated method named main, which has the public, static, and void qualifiers.',
      simpleExplanation: 'Everything in Java lives inside a class. When you ask the computer to run your program, the JVM looks for an exact door: a method named "main". Without this exact method, the JVM refuses to execute because it does not know where your instructions start.',
      whyItExists: 'In older procedural languages, code could be scattered loosely at file scope, causing symbol collisions and chaotic initialization order. Java enforces that all executable instructions must reside cleanly within named class boundaries and method blocks.',
      howItWorks: 'When `java App` is invoked, the JVM loads the App class into memory, verifies its bytecode, and searches for the exact signature `public static void main(String[] args)`. Because this method is marked `static`, the JVM does not need to instantiate an object of the class first; it can invoke the method directly from the class namespace. Arguments passed from the command line are packaged into an array of Strings and supplied to `args`.',
      syntax: 'public class ClassName {\n    public static void main(String[] args) {\n        // Statements ending in semicolons\n    }\n}',
      syntaxTokens: [
        { token: 'public', meaning: 'Access modifier indicating this member can be called from outside the class by the JVM.' },
        { token: 'class', meaning: 'The Java keyword declaring a new user-defined type or blueprint.' },
        { token: 'static', meaning: 'Denotes that this method belongs to the class itself, not to a specific instance of the class. Callable without creating an object with "new".' },
        { token: 'void', meaning: 'The return type declaring that this method performs an action but does not return any computed value back to the caller.' },
        { token: 'main', meaning: 'The designated identifier the JVM specifically searches for as the application entry point.' },
        { token: 'String[] args', meaning: 'An array of String objects that captures command-line parameters supplied by the user when running the program.' }
      ],
      codeExample: `public class ApplicationEntry {
    public static void main(String[] args) {
        System.out.println("Execution initiated.");
        System.out.println("Command line argument count: " + args.length);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'public class ApplicationEntry', explanation: 'Declares the container class. The file must be named ApplicationEntry.java.' },
        { tokenOrLine: 'public static void main(String[] args)', explanation: 'The entry point method required by the JVM execution engine.' },
        { tokenOrLine: 'System.out.println(...)', explanation: 'Invokes the println method on the PrintStream object named out residing in the System utility class.' },
        { tokenOrLine: 'args.length', explanation: 'Reads the length property of the command-line argument array to determine how many words the user typed after the class name.' }
      ],
      expectedOutput: `Execution initiated.
Command line argument count: 0`,
      commonMistakes: [
        {
          title: 'Omitting the static keyword from main',
          wrongCode: `public class BadMain {
    public void main(String[] args) {
        System.out.println("Hello");
    }
}`,
          correctCode: `public class GoodMain {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
          whyWrong: 'If main is not static, the JVM cannot call it without first creating an instance of the class, which it does not know how to construct.',
          compilerOrRuntimeError: 'Error: Main method is not static in class BadMain, please define the main method as: public static void main(String[] args)'
        }
      ],
      comparisons: [
        {
          title: 'Static Methods vs Instance Methods',
          conceptA: {
            name: 'Static Method (e.g. main)',
            description: 'Belongs to the class blueprint directly.',
            characteristics: ['Called via ClassName.methodName()', 'No object instantiation needed', 'Cannot directly access non-static instance fields']
          },
          conceptB: {
            name: 'Instance Method',
            description: 'Belongs to a specific object instance created with new.',
            characteristics: ['Called on an object reference: myObj.methodName()', 'Requires memory allocation', 'Can freely access instance fields and "this"']
          },
          keyTakeaway: 'The main method is static so the JVM can execute code without needing prior knowledge of how to construct your class.'
        }
      ],
      summaryPoints: [
        'All Java code lives inside classes; statements end with a semicolon.',
        'The entry point is strictly: public static void main(String[] args).',
        'Command line arguments are captured in the args String array.'
      ],
      knowledgeCheck: [
        {
          id: 'q2-1',
          question: 'What happens if you compile and attempt to run a Java class that lacks a public static void main method?',
          options: [
            'The compiler (javac) fails with a fatal syntax error.',
            'The program runs silently and exits with code 0.',
            'The JVM throws a runtime error indicating no main method was found.',
            'The JVM creates a synthetic empty main method automatically.'
          ],
          correctIndex: 2,
          explanation: 'Compilation succeeds (classes can exist as reusable libraries without an entry point), but the JVM launcher fails at runtime with "Main method not found".'
        }
      ],
      reviewQuestions: [
        'Why does Java require every executable statement to reside within a method inside a class?',
        'What is the semantic purpose of the String[] args parameter in the main method signature?'
      ]
    },
    {
      id: 's2-l2-variables-and-primitives',
      stageId: 2,
      title: 'Variables, Primitives & The Type System',
      slug: 'variables-primitive-types',
      subtitle: 'Deep conceptual breakdown of variables, data types, binary storage, and statement semantics.',
      readTimeMinutes: 18,
      definition: 'A variable in Java is a named memory location governed by an explicit static type, binding an identifier to a specific memory footprint and bit pattern.',
      simpleExplanation: 'Think of memory as a massive grid of numbered storage lockers. A variable is a label attached to one of those lockers. Before you can store anything, you must declare what kind of item the locker is built to hold (an integer, a letter, a decimal) and give it a name. Once declared, you can put data inside and change it whenever needed.',
      whyItExists: 'Computers only understand raw streams of electrical high and low voltages (1s and 0s). Without data types and variable names, humans would have to memorize raw hexadecimal memory addresses and manually calculate how many bytes to read. Types inform the computer how many bits of memory to allocate and how to interpret those bits.',
      howItWorks: `CRITICAL CONCEPTUAL BREAKDOWN BEFORE CODE:

Before we examine the statement:
int age = 13;

We must formally dissect every foundational concept at play:

1. WHAT A VARIABLE IS:
A variable is a symbolic handle for a contiguous block of RAM memory. Declaring a variable reserves that physical space during execution and links it to human-readable text.

2. WHAT "int" MEANS:
"int" is a primitive type keyword in Java. It stands for a 32-bit signed two's complement integer.
It reserves exactly 4 bytes (32 bits) of memory.
It can represent whole numbers from -2,147,483,648 to 2,147,483,647.
It cannot store fractions, text, or decimal points.

3. WHAT "age" REPRESENTS:
"age" is the identifier (the name) chosen by the programmer. The compiler records "age" in its symbol table and associates it with the memory offset allocated on the thread's call stack. Whenever you refer to "age" in your program, the JVM retrieves the value residing in that specific memory location.

4. WHAT ASSIGNMENT MEANS:
The single equals sign "=" is the assignment operator. It does NOT mean mathematical equality (which is == in Java). It means: "Evaluate whatever is on the right-hand side, and copy that resulting value directly into the memory location named on the left-hand side."

5. WHAT THE NUMBER REPRESENTS:
"13" is an integer literal. The compiler reads this decimal sequence and encodes it into 32 binary bits:
00000000 00000000 00000000 00001101
This binary pattern is written into the 4 bytes allocated for "age".

6. HOW JAVA'S TYPE SYSTEM RELATES TO THIS STATEMENT:
Java is statically and strongly typed.
"Statically typed" means the type of every variable is checked and validated at compile time, before the program ever runs.
"Strongly typed" means Java strictly prevents assigning incompatible types without explicit conversion. For instance, you cannot assign "thirteen" (a text String) or 13.99 (a floating-point double) directly into an int variable without the compiler rejecting it.`,
      syntax: 'DataType variableName = initialValue;\n\n// 8 Primitive Data Types in Java:\n// byte    (8 bits,  range: -128 to 127)\n// short   (16 bits, range: -32,768 to 32,767)\n// int     (32 bits, range: -2^31 to 2^31 - 1)\n// long    (64 bits, range: -2^63 to 2^63 - 1, suffix with L)\n// float   (32 bits, IEEE 754 floating point, suffix with f)\n// double  (64 bits, standard IEEE 754 decimal floating point)\n// boolean (true or false, JVM dependent size, logically 1 bit)\n// char    (16 bits, unsigned UTF-16 code unit, e.g. \'A\')',
      syntaxTokens: [
        { token: 'int', meaning: 'The primitive type specifying 32-bit signed integer storage.' },
        { token: 'age', meaning: 'The variable identifier/name bound to this storage slot.' },
        { token: '=', meaning: 'The assignment operator copying the right-hand value into the left-hand slot.' },
        { token: '13', meaning: 'The integer literal value being stored.' },
        { token: ';', meaning: 'The statement terminator required at the conclusion of every Java statement.' }
      ],
      codeExample: `public class PrimitiveDemystification {
    public static void main(String[] args) {
        int age = 13;
        double itemPrice = 24.50;
        boolean isEnrolled = true;
        char gradeLetter = 'A';

        System.out.println("Assigned age: " + age);
        System.out.println("Item price: " + itemPrice);
        System.out.println("Enrollment status: " + isEnrolled);
        System.out.println("Grade letter: " + gradeLetter);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'int age = 13;', explanation: 'Allocates 4 bytes on the call stack, names that memory location "age", converts literal 13 into 32-bit binary, and writes it to that stack slot.' },
        { tokenOrLine: 'double itemPrice = 24.50;', explanation: 'Allocates 8 bytes of floating-point storage adhering to IEEE 754 standard for high-precision decimals.' },
        { tokenOrLine: 'boolean isEnrolled = true;', explanation: 'Allocates a boolean variable capable of storing exactly true or false.' },
        { tokenOrLine: 'char gradeLetter = \'A\';', explanation: 'Allocates 16 bits storing the UTF-16 code unit for uppercase character A (decimal 65 in Unicode).' }
      ],
      expectedOutput: `Assigned age: 13
Item price: 24.5
Enrollment status: true
Grade letter: A`,
      commonMistakes: [
        {
          title: 'Assigning a decimal number to an integer variable',
          wrongCode: `int count = 9.99; // COMPILER ERROR`,
          correctCode: `double count = 9.99; // Or int count = (int) 9.99; if intentional truncation`,
          whyWrong: 'Java does not allow implicit narrowing conversions. Converting 9.99 to an integer discards the fractional part (.99), so Java forbids it unless you explicitly cast.',
          compilerOrRuntimeError: 'error: incompatible types: possible lossy conversion from double to int'
        },
        {
          title: 'Using uninitialized local variables',
          wrongCode: `int total;
System.out.println(total); // COMPILER ERROR`,
          correctCode: `int total = 0;
System.out.println(total);`,
          whyWrong: 'In Java, local variables inside methods do not receive default values. You must assign a value before reading from it.',
          compilerOrRuntimeError: 'error: variable total might not have been initialized'
        }
      ],
      comparisons: [
        {
          title: 'Primitive Types vs Reference Types',
          conceptA: {
            name: 'Primitive Types (int, boolean, etc.)',
            description: 'Direct binary storage values.',
            characteristics: ['Stored directly in stack frame or object field payload', 'Fixed byte size (e.g. 4 bytes for int)', 'Cannot be null', 'Do not have methods or properties']
          },
          conceptB: {
            name: 'Reference Types (String, Object, Array)',
            description: 'Memory pointers to heap-allocated objects.',
            characteristics: ['Variable holds 64-bit/32-bit memory address', 'The actual object data lives on the JVM heap', 'Can hold the null value', 'Have methods (e.g. .length(), .toString())']
          },
          keyTakeaway: 'Primitives hold actual raw values directly; reference variables hold directions to an object residing on the heap.'
        }
      ],
      summaryPoints: [
        'Java has 8 primitive types: byte, short, int, long, float, double, boolean, and char.',
        'Statically typed means types are checked at compile time; strongly typed means illegal conversions are forbidden.',
        'In "int age = 13;", "int" sets the type and memory size, "age" is the name, "=" assigns data, "13" is the literal, and ";" ends the statement.',
        'Local variables must be explicitly initialized before use.'
      ],
      knowledgeCheck: [
        {
          id: 'q2-2',
          question: 'In the declaration "int age = 13;", what does the "=" token do?',
          options: [
            'It checks if the variable age currently equals the number 13.',
            'It evaluates the right-hand value and copies that resulting value into the memory slot labeled "age".',
            'It creates a permanent mathematical equation where age will always be 13.',
            'It casts the number 13 into a floating-point number.'
          ],
          correctIndex: 1,
          explanation: 'In Java, = is the assignment operator, not an equality test. It writes the right-side evaluation into the left-side variable memory location.'
        },
        {
          id: 'q2-3',
          question: 'Which of the following primitive types occupies exactly 64 bits of memory for whole numbers?',
          options: ['int', 'short', 'long', 'double'],
          correctIndex: 2,
          explanation: 'long is a 64-bit signed two\'s complement integer. double is also 64 bits, but stores floating-point numbers, not whole integers.'
        }
      ],
      reviewQuestions: [
        'Why does Java refuse to allow the assignment of a double into an int variable without an explicit cast?',
        'Draw the mental model of how the call stack memory looks after "int age = 13;" executes.'
      ]
    },
    {
      id: 's2-l3-reference-types-and-strings',
      stageId: 2,
      title: 'Reference Types, Strings & The String Pool',
      slug: 'reference-types-strings-pool',
      subtitle: 'Understanding heap allocation, pointers, String immutability, and the difference between == and .equals().',
      readTimeMinutes: 16,
      diagramType: 'memory',
      definition: 'A reference type is a data type whose variable does not store data directly, but stores a memory address referencing an object instantiated on the JVM Heap. The String class is an immutable reference type representing sequences of characters.',
      simpleExplanation: 'Imagine buying a house. A primitive variable is like keeping cash directly in your wallet. A reference variable is like holding a piece of paper with the house address written on it. You do not hold the house in your wallet; you hold a reference that tells you where to find the house.',
      whyItExists: 'Complex objects (like text documents, lists, and images) have variable and large sizes. They cannot be crammed directly into small fixed-size stack frames. By placing objects in the heap and only passing around small fixed-size memory addresses, Java programs run efficiently and safely.',
      howItWorks: 'When you declare `String message = "Hello";`, Java allocates memory in a special area of the heap called the String Constant Pool. If another variable also requests `"Hello"`, the JVM reuses the exact same heap address to conserve memory. Strings in Java are immutable: once created, their internal byte array cannot be changed. Any operation that appears to modify a String (like `.toUpperCase()`) actually instantiates an entirely new String object.',
      syntax: 'String identifier = "text literal";\nString objectInstance = new String("text");\n\n// Checking value equality (CORRECT):\nboolean matches = str1.equals(str2);\n\n// Checking memory address equality (USUALLY WRONG FOR STRINGS):\nboolean sameAddress = (str1 == str2);',
      syntaxTokens: [
        { token: 'String', meaning: 'The standard library reference type (java.lang.String) representing immutable text.' },
        { token: 'new', meaning: 'The keyword that allocates a new object instance on the heap.' },
        { token: '.equals()', meaning: 'The method that compares whether the contents/characters inside two objects are identical.' },
        { token: '==', meaning: 'The operator that checks whether two reference variables point to the exact same physical memory address.' }
      ],
      codeExample: `public class StringPoolDemonstration {
    public static void main(String[] args) {
        String literalOne = "Java";
        String literalTwo = "Java";
        String heapObject = new String("Java");

        System.out.println("literalOne == literalTwo (same pool address): " + (literalOne == literalTwo));
        System.out.println("literalOne == heapObject (different address): " + (literalOne == heapObject));
        System.out.println("literalOne.equals(heapObject) (same characters): " + literalOne.equals(heapObject));
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'String literalOne = "Java";', explanation: 'Checks the String Pool for "Java", finds none, creates it, and assigns the pool reference.' },
        { tokenOrLine: 'String literalTwo = "Java";', explanation: 'Checks the String Pool, finds the existing "Java", and assigns the identical pool address.' },
        { tokenOrLine: 'new String("Java");', explanation: 'Forces allocation of a brand-new object on the general heap outside the pool, despite having the same characters.' },
        { tokenOrLine: 'literalOne == heapObject', explanation: 'Compares two memory addresses. Because one is in the pool and the other is a distinct heap object, this evaluates to false.' },
        { tokenOrLine: 'literalOne.equals(heapObject)', explanation: 'Inspects the actual character sequences inside both objects. Both contain "J", "a", "v", "a", so this evaluates to true.' }
      ],
      expectedOutput: `literalOne == literalTwo (same pool address): true
literalOne == heapObject (different address): false
literalOne.equals(heapObject) (same characters): true`,
      commonMistakes: [
        {
          title: 'Using == to compare String values',
          wrongCode: `String input = scanner.nextLine();
if (input == "yes") { // DANGEROUS BUG
    System.out.println("Proceeding");
}`,
          correctCode: `String input = scanner.nextLine();
if (input.equals("yes")) { // CORRECT
    System.out.println("Proceeding");
}`,
          whyWrong: 'The == operator checks if both references point to the exact same memory location. User input read dynamically is allocated as a new object, so input == "yes" evaluates to false even if the user typed "yes".',
          compilerOrRuntimeError: 'No compiler error, but silent runtime logic bug where the condition unexpectedly fails.'
        }
      ],
      comparisons: [
        {
          title: 'The == Operator vs The .equals() Method',
          conceptA: {
            name: '== (Reference Equality)',
            description: 'Compares the raw bits inside the variable.',
            characteristics: ['For primitives: compares actual numerical values', 'For references: compares memory addresses', 'Fastest, but does not check object content']
          },
          conceptB: {
            name: '.equals() (Logical Content Equality)',
            description: 'Invokes a method written to inspect internal state.',
            characteristics: ['Overridden by String, Integer, etc., to compare characters/fields', 'Safe for objects', 'Checks if two distinct objects represent equivalent values']
          },
          keyTakeaway: 'Always use .equals() to compare object values, and reserve == strictly for primitive types or checking null.'
        }
      ],
      summaryPoints: [
        'Reference variables hold memory addresses pointing to objects on the heap.',
        'Strings are immutable; once created, their character sequences cannot be altered.',
        'The String Constant Pool reuses identical string literals to save memory.',
        'Always compare object values with .equals(), never with ==.'
      ],
      knowledgeCheck: [
        {
          id: 'q2-4',
          question: 'Why does "hello" == new String("hello") evaluate to false in Java?',
          options: [
            'Because the characters in the two strings are ordered differently.',
            'Because the new keyword forces allocation of a new object at a distinct heap address, and == compares addresses.',
            'Because String comparison is not permitted in Java.',
            'Because the second string is converted into a character array.'
          ],
          correctIndex: 1,
          explanation: 'The == operator compares memory references. The string literal lives in the String Pool, whereas new String() allocates a distinct object on the regular heap.'
        }
      ],
      reviewQuestions: [
        'What would happen to application performance and thread safety if Java Strings were mutable instead of immutable?',
        'What is the role of the String Constant Pool in JVM memory optimization?'
      ]
    },
    {
      id: 's2-l4-operators-casting-io',
      stageId: 2,
      title: 'Operators, Expressions, Casting & Console I/O',
      slug: 'operators-casting-console-io',
      subtitle: 'Arithmetic, logical, relational, widening vs narrowing conversion, and reading user input via Scanner.',
      readTimeMinutes: 16,
      definition: 'An operator is a special symbol that performs operations on one, two, or three operands to produce a value. Type casting is the process of converting a value of one data type into another.',
      simpleExplanation: 'Operators let you do math (+, -, *, /), compare values (>, <, ==), and make logical decisions (&&, ||). Casting is like pouring liquid from one container to another: pouring from a small cup into a large bucket (widening) happens automatically, but pouring from a large bucket into a small cup (narrowing) requires caution because data can spill over.',
      whyItExists: 'Programs must interact with dynamic external input, compute business formulas, and adapt types across hardware interfaces (e.g., converting a high-precision decimal price into an integer number of cents).',
      howItWorks: 'During arithmetic, Java automatically promotes smaller types to larger types (e.g., byte + int promotes byte to int). Integer division (`7 / 2`) discards the fractional remainder, yielding `3`. To preserve decimals, at least one operand must be a floating-point type (`7.0 / 2 = 3.5`). Widening casting (int to double) is safe and implicit. Narrowing casting (double to int) discards bits and requires explicit syntax `(int) value`. Input is read via `java.util.Scanner`, which parses standard input stream `System.in`.',
      syntax: '// Explicit Cast Syntax:\nTargetType variable = (TargetType) originalValue;\n\n// Scanner Input Syntax:\nScanner scanner = new Scanner(System.in);\nint number = scanner.nextInt();\nString text = scanner.nextLine();',
      syntaxTokens: [
        { token: '(int)', meaning: 'Explicit cast operator forcing truncation of floating-point or wider type into a 32-bit integer.' },
        { token: '&&', meaning: 'Logical AND with short-circuit evaluation (skips right side if left side is false).' },
        { token: '||', meaning: 'Logical OR with short-circuit evaluation (skips right side if left side is true).' },
        { token: 'Scanner', meaning: 'Utility class in java.util used to parse primitive types and strings from an input stream.' }
      ],
      codeExample: `import java.util.Scanner;

public class ConversionAndInteraction {
    public static void main(String[] args) {
        int initialScore = 95;
        double percentage = initialScore / 100.0; // Floating point division
        int truncatedPercentage = (int) (percentage * 100); // Explicit cast

        System.out.println("Percentage calculated: " + percentage);
        System.out.println("Truncated int score: " + truncatedPercentage);

        // Formatted Output using printf
        System.out.printf("Formatted output: Score is %d, Ratio is %.2f%n", initialScore, percentage);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'initialScore / 100.0', explanation: 'Because 100.0 is a double literal, initialScore is promoted to double, yielding floating-point result 0.95 rather than integer 0.' },
        { tokenOrLine: '(int) (percentage * 100)', explanation: 'Explicit cast operator (int) instructing the compiler to discard any fractional decimals and retain only the integer portion.' },
        { tokenOrLine: 'System.out.printf(...)', explanation: 'Prints formatted text using format specifiers: %d for decimal integer, %.2f for float with 2 decimal places, %n for platform-neutral newline.' }
      ],
      expectedOutput: `Percentage calculated: 0.95
Truncated int score: 95
Formatted output: Score is 95, Ratio is 0.95`,
      commonMistakes: [
        {
          title: 'Accidental integer division truncation',
          wrongCode: `int sum = 5;
int count = 2;
double average = sum / count; // Produces 2.0, NOT 2.5!`,
          correctCode: `int sum = 5;
int count = 2;
double average = (double) sum / count; // Produces 2.5`,
          whyWrong: 'Because both sum and count are integers, sum / count executes integer division first, discarding the .5 to produce 2. Then 2 is converted to 2.0.',
          compilerOrRuntimeError: 'Logic error: silent loss of fractional precision.'
        }
      ],
      comparisons: [
        {
          title: 'Implicit Widening vs Explicit Narrowing Casting',
          conceptA: {
            name: 'Implicit Widening (e.g. int -> double)',
            description: 'Moving from a smaller to larger storage type.',
            characteristics: ['No data loss', 'Performed automatically by the compiler', 'Example: double d = 10;']
          },
          conceptB: {
            name: 'Explicit Narrowing (e.g. double -> int)',
            description: 'Moving from a larger to smaller storage type.',
            characteristics: ['Potential loss of precision or magnitude', 'Requires manual cast syntax (targetType)', 'Decimals are truncated toward zero, not rounded']
          },
          keyTakeaway: 'Java allows safe widenings automatically, but forces you to acknowledge risky narrowings with explicit cast parentheses.'
        }
      ],
      summaryPoints: [
        'Arithmetic between two integers always results in integer division, discarding remainders.',
        'Widening conversions are automatic; narrowing conversions require explicit (Type) casting.',
        'Use System.out.printf() with %d, %s, and %f for clean tabular formatting.',
        'Scanner parses tokens from standard input (System.in).'
      ],
      knowledgeCheck: [
        {
          id: 'q2-5',
          question: 'What is the exact evaluation of the expression: 7 / 2 ?',
          options: ['3.5', '3', '4', 'Compilation error due to odd division'],
          correctIndex: 1,
          explanation: 'Both 7 and 2 are integer literals, so Java performs integer division, which truncates any fractional portion and results in 3.'
        }
      ],
      reviewQuestions: [
        'Why does Java not automatically round numbers when casting from double to int?',
        'How does short-circuit evaluation in "&&" and "||" improve program safety and performance?'
      ]
    }
  ]
};
