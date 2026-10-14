import { Stage } from '../../types/curriculum';

export const stage3: Stage = {
  id: 3,
  stageNumber: 3,
  title: 'Control Flow & Logic',
  tagline: 'Conditional branching, decision trees, iteration, pattern matching switches, and loop control.',
  description: 'Understand how programs make deterministic decisions. Master if-else ladders, modern switch expressions with arrow syntax, while loops, for loops, break, continue, and loop labels.',
  iconName: 'Layers',
  lessons: [
    {
      id: 's3-l1-branching-if-else',
      stageId: 3,
      title: 'Conditional Branching: if, else if, & else',
      slug: 'conditional-branching-if-else',
      subtitle: 'Boolean predicates, short-circuit evaluation, nested conditions, and execution branching.',
      readTimeMinutes: 14,
      definition: 'Conditional branching is a control flow mechanism that alters the sequential execution of instructions by evaluating a boolean expression (a predicate) and directing execution along one of multiple distinct code paths.',
      simpleExplanation: 'Sequential code runs from top to bottom like a single straight road. A conditional branch is a fork in the road: if a test is true, your program turns left; if false, it turns right. This allows programs to react intelligently to varying circumstances.',
      whyItExists: 'Without decision-making capabilities, computer programs would be static linear scripts unable to respond to user input, handle error conditions, or enforce business rules.',
      howItWorks: 'The CPU evaluates the condition inside the parentheses `if (condition)`. In Java, this condition must evaluate strictly to a primitive `boolean` (`true` or `false`) — unlike languages like C or Python, numbers (0 or 1) and null cannot act as booleans. If the first `if` condition evaluates to `true`, its block executes and all subsequent `else if` and `else` branches in that ladder are skipped.',
      syntax: 'if (booleanCondition1) {\n    // Executes if condition1 is true\n} else if (booleanCondition2) {\n    // Executes if condition1 was false and condition2 is true\n} else {\n    // Executes if all preceding conditions were false\n}',
      syntaxTokens: [
        { token: 'if', meaning: 'Keyword that introduces a conditional branch testing a boolean expression.' },
        { token: 'else if', meaning: 'Secondary test evaluated only if previous conditions evaluated to false.' },
        { token: 'else', meaning: 'Fallback block executed when none of the preceding conditions matched.' }
      ],
      codeExample: `public class AccessGatekeeper {
    public static void main(String[] args) {
        int userAge = 19;
        boolean hasSignedWaiver = true;
        boolean isBanned = false;

        if (isBanned) {
            System.out.println("Access revoked: Account is flagged.");
        } else if (userAge >= 18 && hasSignedWaiver) {
            System.out.println("Access granted: Full privileges.");
        } else if (userAge >= 18 && !hasSignedWaiver) {
            System.out.println("Access pending: Signature required.");
        } else {
            System.out.println("Access denied: Under legal age.");
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'if (isBanned)', explanation: 'Evaluates boolean flag isBanned. Because it is false, execution skips to the first else if.' },
        { tokenOrLine: 'else if (userAge >= 18 && hasSignedWaiver)', explanation: 'Evaluates whether userAge (19) is greater than or equal to 18 (true) AND hasSignedWaiver is true. Both are true, so this block runs.' },
        { tokenOrLine: 'System.out.println("Access granted: Full privileges.");', explanation: 'Prints confirmation to the console.' },
        { tokenOrLine: 'All remaining branches', explanation: 'Java exits the entire if-else ladder immediately without evaluating the subsequent conditions.' }
      ],
      expectedOutput: `Access granted: Full privileges.`,
      commonMistakes: [
        {
          title: 'Using single = (assignment) instead of == (equality test)',
          wrongCode: `boolean isAdmin = false;
if (isAdmin = true) { // ACCIDENTAL ASSIGNMENT!
    System.out.println("Welcome Admin!");
}`,
          correctCode: `boolean isAdmin = false;
if (isAdmin == true) { // Or simply: if (isAdmin)
    System.out.println("Welcome Admin!");
}`,
          whyWrong: 'isAdmin = true assigns true to the variable and evaluates to true, so the if block ALWAYS runs! For non-boolean variables this causes a compiler error, but with booleans it compiles and introduces a severe security bug.',
          compilerOrRuntimeError: 'No compiler error for booleans; severe logic and security bypass bug.'
        }
      ],
      comparisons: [
        {
          title: 'Nested if Statements vs Compound Boolean Expressions',
          conceptA: {
            name: 'Nested if Statements',
            description: 'Placing if statements inside other if statements.',
            characteristics: ['Can lead to the "arrow anti-pattern" (deep indentation)', 'Harder to read when multiple conditions must all be true', 'Useful when intermediate fallback logic is required']
          },
          conceptB: {
            name: 'Compound Boolean (&&, ||)',
            description: 'Combining conditions into a single statement with logical operators.',
            characteristics: ['Flattens code hierarchy', 'Short-circuit evaluation stops checking as soon as result is determined', 'Improves clarity for concurrent prerequisites']
          },
          keyTakeaway: 'Prefer compound conditions with logical operators (&&, ||) to avoid deeply nested pyramids of code.'
        }
      ],
      summaryPoints: [
        'Java conditions must strictly evaluate to a boolean type.',
        'Short-circuit evaluation with && and || prevents unnecessary execution of right-hand conditions.',
        'Only one branch in an if-else if-else chain ever executes.'
      ],
      knowledgeCheck: [
        {
          id: 'q3-1',
          question: 'What is the compiler result of: if (x = 5) { ... } when x is an int?',
          options: [
            'It evaluates to true because 5 is a non-zero number.',
            'It evaluates to false.',
            'The compiler rejects it because int cannot be converted to boolean.',
            'It executes in debug mode only.'
          ],
          correctIndex: 2,
          explanation: 'In Java, conditions must be of type boolean. The assignment expression x = 5 produces the integer 5, which javac refuses to coerce to a boolean.'
        }
      ],
      reviewQuestions: [
        'Why does Java not support "truthy" or "falsy" values like JavaScript or Python?',
        'How does short-circuit evaluation in "if (obj != null && obj.isValid())" protect against NullPointerException?'
      ]
    },
    {
      id: 's3-l2-switch-statements',
      stageId: 3,
      title: 'Switch Statements & Modern Switch Expressions',
      slug: 'switch-statements-and-expressions',
      subtitle: 'Classic switch, fall-through mechanics, break statements, arrow syntax (->), and yield.',
      readTimeMinutes: 16,
      versionRequirement: 'Java 14+ for modern switch expressions',
      definition: 'A switch statement evaluates an expression against multiple matching constant case labels, transferring execution control to the matched branch.',
      simpleExplanation: 'When testing a single variable against many fixed options (like days of the week, HTTP status codes, or menu commands), an if-else ladder becomes messy. A switch acts like a multi-way router that jumps directly to the matching case.',
      whyItExists: 'Traditional if-else chains check conditions one-by-one from top to bottom (O(n) time). The JVM compiler can optimize switch statements using bytecode jump tables (tableswitch or lookupswitch), jumping directly to the target code in O(1) constant time.',
      howItWorks: 'Classic switch statements require manual `break` statements; omitting a break causes execution to "fall through" into subsequent cases. Modern Java (Java 14+) introduced switch expressions using arrow syntax (`case X ->`). Switch expressions do not fall through, eliminate the need for `break`, and can produce a direct return value using the `yield` keyword.',
      syntax: '// Modern Switch Expression (Java 14+):\nReturnType result = switch (target) {\n    case VALUE_A -> expressionA;\n    case VALUE_B, VALUE_C -> expressionBC;\n    default -> {\n        // Multi-line block\n        yield fallbackExpression;\n    }\n};',
      syntaxTokens: [
        { token: 'case X ->', meaning: 'Arrow syntax executing only the right-hand expression without falling through.' },
        { token: 'yield', meaning: 'Yields a calculated value out of a multi-statement block inside a switch expression.' },
        { token: 'default', meaning: 'The fallback branch executed if none of the explicit case values match.' }
      ],
      codeExample: `public class ModernSwitchDemo {
    public static void main(String[] args) {
        String httpMethod = "POST";

        // Modern Switch Expression returning a value:
        String actionDescription = switch (httpMethod) {
            case "GET" -> "Retrieve resource from server";
            case "POST" -> "Create new record on server";
            case "PUT", "PATCH" -> "Update existing resource";
            case "DELETE" -> "Remove resource permanently";
            default -> {
                System.out.println("Unrecognized HTTP Verb: " + httpMethod);
                yield "Unknown Action";
            }
        };

        System.out.println("Method: " + httpMethod);
        System.out.println("Action: " + actionDescription);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'switch (httpMethod)', explanation: 'Evaluates the String variable httpMethod against defined cases.' },
        { tokenOrLine: 'case "POST" -> "Create new record..."', explanation: 'Matches "POST", evaluates the right-hand string, and returns it directly to assign to actionDescription. No fall-through occurs.' },
        { tokenOrLine: 'case "PUT", "PATCH" ->', explanation: 'Combines multiple matching cases on a single line separated by commas.' },
        { tokenOrLine: 'yield "Unknown Action"', explanation: 'Supplies the return value out of the multi-statement default block.' }
      ],
      expectedOutput: `Method: POST
Action: Create new record on server`,
      commonMistakes: [
        {
          title: 'Accidental fall-through in classic colon switch',
          wrongCode: `switch (level) {
    case 1:
        System.out.println("Basic"); // Missing break!
    case 2:
        System.out.println("Advanced");
}`,
          correctCode: `switch (level) {
    case 1 -> System.out.println("Basic");
    case 2 -> System.out.println("Advanced");
}`,
          whyWrong: 'In classic colon syntax (case 1:), omitting break causes execution to fall straight down into case 2, printing both lines.',
          compilerOrRuntimeError: 'Silent logical bug: prints both "Basic" and "Advanced" when level is 1.'
        }
      ],
      comparisons: [
        {
          title: 'Classic Switch Statement vs Modern Switch Expression',
          conceptA: {
            name: 'Classic Switch Statement',
            description: 'Imperative statement using colons and breaks.',
            characteristics: ['Prone to fall-through bugs if break is forgotten', 'Does not return a value directly', 'Cannot enforce exhaustive pattern coverage']
          },
          conceptB: {
            name: 'Modern Switch Expression (Java 14+)',
            description: 'Functional expression using arrows (->) and yield.',
            characteristics: ['No fall-through by default', 'Returns values directly into variables', 'Compiler enforces exhaustiveness when used as an expression']
          },
          keyTakeaway: 'Always prefer modern arrow switch expressions for safety, conciseness, and compiler-verified exhaustiveness.'
        }
      ],
      summaryPoints: [
        'Switch works with primitives (byte, short, int, char), Enums, Strings, and wrapper types.',
        'Arrow syntax (->) eliminates accidental fall-through.',
        'Switch expressions can return values directly using yield for multi-line cases.',
        'Compiler checks that switch expressions are exhaustive.'
      ],
      knowledgeCheck: [
        {
          id: 'q3-2',
          question: 'What is the purpose of the yield keyword in modern Java switch expressions?',
          options: [
            'It pauses the current thread for a specified number of milliseconds.',
            'It returns a calculated value from a block within a switch expression.',
            'It causes the switch to fall through to the next case.',
            'It throws an exception if the input is null.'
          ],
          correctIndex: 1,
          explanation: 'Inside a multi-statement block within a switch expression, yield specifies the final value that the overall switch expression evaluates to.'
        }
      ],
      reviewQuestions: [
        'Why does the compiler enforce that a switch expression must either handle every enum value or provide a default case?',
        'How does the JVM bytecode instruction lookupswitch differ from tableswitch?'
      ]
    },
    {
      id: 's3-l3-loops-and-iteration',
      stageId: 3,
      title: 'Iteration: for, while, do-while, break & continue',
      slug: 'loops-iteration-break-continue',
      subtitle: 'Definite vs indefinite loops, loop invariants, enhanced for-each, and controlling loop jumps.',
      readTimeMinutes: 16,
      definition: 'A loop is a control flow structure that repeatedly executes a block of statements as long as an associated continuation condition evaluates to true.',
      simpleExplanation: 'Instead of copying and pasting the same line of code a thousand times, a loop tells the computer: "Repeat this action until I say stop." A "for" loop is used when you know exactly how many times to repeat; a "while" loop repeats until a certain condition changes; a "do-while" loop always runs at least once before checking.',
      whyItExists: 'Processing sequences of data, reading network streams, iterating through collections, and driving game loops all require repetitive execution without manual duplication of instructions.',
      howItWorks: 'The standard `for` loop initializes a loop counter, evaluates the condition before each iteration, executes the block if true, and executes an update expression at the end of each pass. The enhanced `for-each` loop operates over any object implementing `Iterable` or any native array. `break` immediately terminates the enclosing loop; `continue` skips the remainder of the current iteration and jumps to the next evaluation.',
      syntax: '// Standard For Loop:\nfor (int i = 0; i < limit; i++) { ... }\n\n// Enhanced For-Each Loop:\nfor (ElementType item : collection) { ... }\n\n// While Loop:\nwhile (condition) { ... }\n\n// Do-While Loop (runs at least once):\ndo { ... } while (condition);',
      syntaxTokens: [
        { token: 'break', meaning: 'Terminates the innermost loop immediately and transfers control to the statement outside.' },
        { token: 'continue', meaning: 'Skips the rest of the current iteration and proceeds directly to the loop\'s next iteration test.' },
        { token: 'do-while', meaning: 'Post-test loop ensuring the body executes at least once before testing the condition.' }
      ],
      codeExample: `public class IterationMastery {
    public static void main(String[] args) {
        int[] sensorReadings = { 12, 18, -1, 25, 30 };
        int totalValid = 0;

        // Enhanced for-each with continue and break logic
        for (int reading : sensorReadings) {
            if (reading < 0) {
                System.out.println("Corrupt reading encountered (" + reading + "), skipping...");
                continue; // Skip this iteration
            }

            if (reading > 28) {
                System.out.println("Critical threshold exceeded (" + reading + "), terminating monitor!");
                break; // Exit loop completely
            }

            totalValid += reading;
        }

        System.out.println("Processed valid sum: " + totalValid);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'for (int reading : sensorReadings)', explanation: 'Enhanced for-each loop iterating through every element of the array in forward sequence.' },
        { tokenOrLine: 'if (reading < 0) continue;', explanation: 'When reading is -1, continue instructs the JVM to skip totalValid += reading and proceed to 25.' },
        { tokenOrLine: 'if (reading > 28) break;', explanation: 'When reading is 30, break immediately exits the loop, leaving totalValid unchanged for subsequent values.' },
        { tokenOrLine: 'totalValid += reading;', explanation: 'Compound addition operator equivalent to totalValid = totalValid + reading.' }
      ],
      expectedOutput: `Corrupt reading encountered (-1), skipping...
Critical threshold exceeded (30), terminating monitor!
Processed valid sum: 55`,
      commonMistakes: [
        {
          title: 'Accidental infinite loops with while',
          wrongCode: `int count = 0;
while (count < 5) {
    System.out.println(count);
    // Forgot to increment count! Loop runs forever and freezes CPU.
}`,
          correctCode: `int count = 0;
while (count < 5) {
    System.out.println(count);
    count++; // Explicit progress towards loop termination
}`,
          whyWrong: 'If the loop variable never changes state, the condition remains true indefinitely, consuming 100% of a CPU core.',
          compilerOrRuntimeError: 'Application freezes / hangs with high CPU utilization.'
        }
      ],
      comparisons: [
        {
          title: 'while Loop vs do-while Loop',
          conceptA: {
            name: 'while Loop (Pre-test)',
            description: 'Condition is evaluated BEFORE the loop body runs.',
            characteristics: ['May execute 0 times if condition is initially false', 'Standard for reading from files or streams']
          },
          conceptB: {
            name: 'do-while Loop (Post-test)',
            description: 'Condition is evaluated AFTER the loop body runs.',
            characteristics: ['Guaranteed to execute at least 1 time', 'Standard for interactive user prompt menus where input is required before checking validity']
          },
          keyTakeaway: 'Use while when the action should only run if valid; use do-while when you must run the action first to obtain data to check.'
        }
      ],
      summaryPoints: [
        'for loops are best for counting; while loops are best for condition-dependent loops.',
        'enhanced for-each loops prevent array index out-of-bounds mistakes.',
        'break exits the loop entirely; continue skips only the current iteration.'
      ],
      knowledgeCheck: [
        {
          id: 'q3-3',
          question: 'What is guaranteed about a do-while loop in Java?',
          options: [
            'It will execute at least once, even if the condition is false initially.',
            'It will execute in a separate background thread.',
            'It cannot contain a break statement.',
            'It runs faster than a standard for loop.'
          ],
          correctIndex: 0,
          explanation: 'Because the condition in a do-while loop is placed at the bottom, the body executes once before the condition is ever checked.'
        }
      ],
      reviewQuestions: [
        'How does Java handle labeled breaks when escaping deeply nested loops?',
        'What are the performance implications of using an enhanced for-each loop over a traditional index-based for loop on an ArrayList?'
      ]
    }
  ]
};
