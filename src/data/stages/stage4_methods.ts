import { Stage } from '../../types/curriculum';

export const stage4: Stage = {
  id: 4,
  stageNumber: 4,
  title: 'Methods & Execution Frames',
  tagline: 'Decomposing logic, parameters, pass-by-value semantics, stack frames, overloading, and recursion.',
  description: 'Understand how methods encapsulate reusable logic. Master method signatures, the strict pass-by-value nature of Java, the role of JVM stack frames, recursion termination, and method overloading rules.',
  iconName: 'Code',
  lessons: [
    {
      id: 's4-l1-method-anatomy-pass-by-value',
      stageId: 4,
      title: 'Method Anatomy, Parameters & Pass-by-Value',
      slug: 'method-anatomy-parameters-pass-by-value',
      subtitle: 'Formal parameters, actual arguments, return types, and why Java is strictly pass-by-value.',
      readTimeMinutes: 18,
      diagramType: 'memory',
      definition: 'A method is a named sequence of instructions encapsulated within a class that can receive input data via parameters, execute logic within a distinct stack frame, and optionally return a calculated value of a declared type.',
      simpleExplanation: 'Instead of writing the same 20 lines of code in five different places, you bundle those lines into a named method. When you need that work done, you "call" the method, hand it whatever ingredients it needs (arguments), and wait for it to give you back the result (return value).',
      whyItExists: 'Methods prevent code duplication (the DRY principle: Don\'t Repeat Yourself), enable modular problem decomposition, and create clean abstraction boundaries between different components of an application.',
      howItWorks: `CRITICAL CONCEPT: JAVA IS STRICTLY PASS-BY-VALUE:

Every single method call in Java uses PASS-BY-VALUE.
This is one of the most misunderstood concepts in programming:

1. When you pass a PRIMITIVE (int, double, boolean):
The JVM makes a complete duplicate copy of the raw bit value and passes that copy into the method's local variable.
Modifying the parameter inside the method has ZERO effect on the original variable outside the method.

2. When you pass an OBJECT / REFERENCE (e.g. an array, a custom class):
Java STILL passes by value! What value is copied?
The MEMORY ADDRESS (the reference) is copied!
Both the caller variable and the method parameter now hold copies of the exact same memory pointer, pointing to the same heap object.
- If you mutate the object's internal fields (e.g., list.add("item")), the change IS visible outside, because both references point to the same object on the heap.
- If you reassign the parameter reference itself (e.g., param = new MyObject()), you only change your local copy of the pointer. The caller's reference remains pointed to the original object!`,
      syntax: 'modifier returnType methodName(ParameterType param1, ParameterType param2) {\n    // Method body\n    return resultValue; // Omitted if returnType is void\n}',
      syntaxTokens: [
        { token: 'returnType', meaning: 'The data type of the value this method transmits back to the caller (e.g., int, String, or void if nothing).' },
        { token: 'Parameter', meaning: 'The variable declared in the method definition signature (the placeholder).' },
        { token: 'Argument', meaning: 'The actual concrete value or expression passed into the method during the call.' },
        { token: 'void', meaning: 'Keyword indicating that the method completes its action without returning any value.' }
      ],
      codeExample: `public class PassByValueProof {
    public static void main(String[] args) {
        int originalNumber = 10;
        int[] originalArray = { 1, 2, 3 };

        modifyPrimitive(originalNumber);
        System.out.println("originalNumber after call: " + originalNumber); // Remains 10

        modifyReferencePayload(originalArray);
        System.out.println("originalArray[0] after payload modification: " + originalArray[0]); // Mutated to 99

        reassignReference(originalArray);
        System.out.println("originalArray[0] after reassign attempt: " + originalArray[0]); // Still 99!
    }

    public static void modifyPrimitive(int value) {
        value = 999; // Only modifies local copy in this stack frame
    }

    public static void modifyReferencePayload(int[] arr) {
        arr[0] = 99; // Mutates the underlying object on the heap
    }

    public static void reassignReference(int[] arr) {
        arr = new int[] { 500, 600 }; // Reassigns local pointer only!
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'modifyPrimitive(originalNumber);', explanation: 'The bits representing 10 are copied to the parameter "value". When value is set to 999, originalNumber in the caller stack frame is untouched.' },
        { tokenOrLine: 'modifyReferencePayload(originalArray);', explanation: 'The memory address of the array is copied into "arr". "arr" points to the same heap memory, so arr[0] = 99 changes the shared object.' },
        { tokenOrLine: 'arr = new int[] { 500, 600 };', explanation: 'Creates a new array on the heap and points local variable "arr" to it. The caller\'s originalArray still points to the first array.' },
        { tokenOrLine: 'System.out.println(originalArray[0]);', explanation: 'Outputs 99, proving that reassigning a parameter reference does not alter the caller\'s reference.' }
      ],
      expectedOutput: `originalNumber after call: 10
originalArray[0] after payload modification: 99
originalArray[0] after reassign attempt: 99`,
      commonMistakes: [
        {
          title: 'Thinking Java has pass-by-reference for objects',
          wrongCode: `public static void swap(Person p1, Person p2) {
    Person temp = p1;
    p1 = p2;
    p2 = temp; // WILL NOT SWAP OUTSIDE CALLER VARIABLES!
}`,
          correctCode: `// Java cannot swap caller references. Return an object, or mutate internal state:
public static void updatePerson(Person p, String newName) {
    p.setName(newName); // Mutating state works
}`,
          whyWrong: 'Java NEVER passes variables by reference. Swapping parameters only swaps the local copies of the pointers within the method stack frame.',
          compilerOrRuntimeError: 'Logic error: variables in caller function remain completely unchanged after swap() call.'
        }
      ],
      comparisons: [
        {
          title: 'Parameters vs Arguments',
          conceptA: {
            name: 'Parameter (Formal Parameter)',
            description: 'The variable declared in the method signature declaration.',
            characteristics: ['Defined in the method header: void process(int count)', 'Acts as a local variable inside the method body', 'Specifies the expected data type']
          },
          conceptB: {
            name: 'Argument (Actual Argument)',
            description: 'The concrete value or expression passed at call time.',
            characteristics: ['Supplied at invocation: process(totalItems + 1)', 'Evaluated before the method stack frame is initialized', 'Must be type-compatible with the formal parameter']
          },
          keyTakeaway: 'Parameters are the placeholders defined in the method signature; arguments are the actual values supplied when invoking the method.'
        }
      ],
      summaryPoints: [
        'A method encapsulates statements under a named signature with parameter and return contracts.',
        'Java is 100% pass-by-value: primitives pass copied bit values; objects pass copied memory references.',
        'Each method call pushes a new stack frame onto the thread\'s call stack, storing local variables.',
        'void methods perform side effects without returning data.'
      ],
      knowledgeCheck: [
        {
          id: 'q4-1',
          question: 'If you pass an object reference into a Java method and execute "param = null;", what happens to the caller\'s original variable?',
          options: [
            'The caller\'s variable also becomes null.',
            'The object is immediately deleted from heap memory.',
            'The caller\'s variable remains completely unchanged, pointing to the original object.',
            'A NullPointerException is thrown by the compiler.'
          ],
          correctIndex: 2,
          explanation: 'Java passes references by value (the pointer is copied). Setting the parameter to null only clears the method\'s local copy of the pointer; the caller\'s reference is unchanged.'
        }
      ],
      reviewQuestions: [
        'How does the JVM use stack frames to track method execution and local variable lifetimes?',
        'Why is it impossible in Java to write a generic swap(a, b) method that swaps two primitive variables passed into it?'
      ]
    },
    {
      id: 's4-l2-overloading-and-recursion',
      stageId: 4,
      title: 'Method Overloading & Recursion Mechanics',
      slug: 'method-overloading-recursion',
      subtitle: 'Compile-time method signatures, call stack depth, base cases, and StackOverflowError.',
      readTimeMinutes: 16,
      definition: 'Method overloading allows a class to declare multiple methods with the exact same name, provided their parameter lists differ in type, number, or order. Recursion is a programming technique where a method calls itself to solve smaller subproblems until reaching a base condition.',
      simpleExplanation: 'Overloading is like having multiple versions of a tool: a drill that takes standard bits, hex bits, or masonry bits. You still call it "drill", and it picks the right action depending on what you hand it. Recursion is like Russian nesting dolls: you open a doll to find a smaller doll inside, repeating until you reach the smallest solid doll (the base case).',
      whyItExists: 'Overloading allows consistent, intuitive naming (e.g., `Math.abs()` works for `int`, `long`, `float`, and `double` rather than having `absInt`, `absLong`, etc.). Recursion provides an elegant mathematical structure for traversing hierarchical trees, graphs, and divide-and-conquer algorithms.',
      howItWorks: 'During compilation, javac resolves overloaded method calls statically by matching the method name and argument types against available method signatures. The return type is NOT part of the signature! For recursion, each recursive invocation pushes a new stack frame onto the JVM stack. If the base case is missing or unreachable, the stack runs out of memory, throwing `java.lang.StackOverflowError`.',
      syntax: '// Overloading: Same name, differing parameters\nint calculate(int x) { ... }\nint calculate(int x, int y) { ... }\ndouble calculate(double x) { ... }\n\n// Recursion: Base case + Recursive step\nint factorial(int n) {\n    if (n <= 1) return 1; // Base case: stops recursion\n    return n * factorial(n - 1); // Recursive step\n}',
      codeExample: `public class MethodsInDepth {
    public static void main(String[] args) {
        // Overloading in action:
        System.out.println("Integer sum: " + add(5, 10));
        System.out.println("Triple sum: " + add(5, 10, 20));
        System.out.println("Double sum: " + add(2.5, 4.5));

        // Recursion in action:
        int result = factorial(5);
        System.out.println("Factorial of 5: " + result);
    }

    public static int add(int a, int b) {
        return a + b;
    }

    public static int add(int a, int b, int c) {
        return a + b + c;
    }

    public static double add(double a, double b) {
        return a + b;
    }

    public static int factorial(int n) {
        if (n <= 1) {
            return 1; // Base case: termination condition
        }
        return n * factorial(n - 1); // Recursive step
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'add(5, 10)', explanation: 'Compiler identifies two int arguments and links the call to add(int, int).' },
        { tokenOrLine: 'add(5, 10, 20)', explanation: 'Compiler identifies three int arguments and links the call to add(int, int, int).' },
        { tokenOrLine: 'add(2.5, 4.5)', explanation: 'Compiler identifies two double arguments and links to add(double, double).' },
        { tokenOrLine: 'if (n <= 1) return 1;', explanation: 'Base case preventing infinite recursion. When n reaches 1, returns 1 without pushing any further stack frames.' },
        { tokenOrLine: 'n * factorial(n - 1)', explanation: 'Pushes a new factorial call onto the stack with an argument reduced by 1.' }
      ],
      expectedOutput: `Integer sum: 15
Triple sum: 35
Double sum: 7.0
Factorial of 5: 120`,
      commonMistakes: [
        {
          title: 'Attempting to overload methods solely by return type',
          wrongCode: `public class BadOverload {
    public int compute(int a) { return a * 2; }
    public double compute(int a) { return a * 2.0; } // COMPILER ERROR
}`,
          correctCode: `public class GoodOverload {
    public int computeInt(int a) { return a * 2; }
    public double computeDouble(int a) { return a * 2.0; }
}`,
          whyWrong: 'The compiler determines which method to call based strictly on the method name and argument types. If the arguments are identical (int a), the compiler cannot tell which method you intended to call from an invocation like compute(5).',
          compilerOrRuntimeError: 'error: method compute(int) is already defined in class BadOverload'
        },
        {
          title: 'Missing base case in recursion causing StackOverflowError',
          wrongCode: `public static int infiniteRecursion(int x) {
    return infiniteRecursion(x + 1); // No base case!
}`,
          correctCode: `public static int safeRecursion(int x) {
    if (x >= 100) return x; // Base case
    return safeRecursion(x + 1);
}`,
          whyWrong: 'Every recursive invocation consumes stack memory. Without a base case, the JVM exceeds its thread stack limit (typically 1MB) and terminates the program.',
          compilerOrRuntimeError: 'Exception in thread "main" java.lang.StackOverflowError'
        }
      ],
      comparisons: [
        {
          title: 'Method Overloading vs Method Overriding',
          conceptA: {
            name: 'Method Overloading (Compile-Time / Static)',
            description: 'Same method name, different parameter lists within the same class.',
            characteristics: ['Resolved at compile time', 'Return type can be different', 'No inheritance required']
          },
          conceptB: {
            name: 'Method Overriding (Runtime / Dynamic)',
            description: 'Subclass redefines a method from its superclass with exact same signature.',
            characteristics: ['Resolved at runtime via dynamic dispatch', 'Return type must be covariant', 'Requires inheritance (@Override)']
          },
          keyTakeaway: 'Overloading provides multiple parameter variations of the same operation; overriding customizes inherited behavior in a child class.'
        }
      ],
      summaryPoints: [
        'Overloading requires different parameter counts, types, or orders.',
        'The return type does not distinguish overloaded methods in Java.',
        'Recursive methods require at least one terminating base case.',
        'Unbounded recursion exhausts stack memory, triggering StackOverflowError.'
      ],
      knowledgeCheck: [
        {
          id: 'q4-2',
          question: 'Can two methods in the same class have the same name and parameters, but different return types?',
          options: [
            'Yes, Java will determine which method to call based on how the result is assigned.',
            'No, Java method signatures consist only of the name and parameter list; return type does not differentiate them.',
            'Yes, but only if both methods are declared static.',
            'Yes, if one returns a primitive and the other an object.'
          ],
          correctIndex: 1,
          explanation: 'In Java, a method signature consists strictly of the method identifier and the ordered parameter types. Differing only by return type produces a compile-time collision error.'
        }
      ],
      reviewQuestions: [
        'Trace the JVM stack frames created during the evaluation of factorial(4).',
        'What advantages and disadvantages does an iterative loop have compared to a recursive method for traversing binary trees?'
      ]
    }
  ]
};
