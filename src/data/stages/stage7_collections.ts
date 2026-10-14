import { Stage } from '../../types/curriculum';

export const stage7: Stage = {
  id: 7,
  stageNumber: 7,
  title: 'Collections & Generics',
  tagline: 'Dynamic data structures, internal hashing mechanics, generic type parameters, wildcards, and sorting algorithms.',
  description: 'Deep dive into the Java Collections Framework (JCF). Understand how ArrayList, HashSet, HashMap, and ArrayDeque function under the hood, how generic types guarantee compile-time safety, how type erasure operates, and how to master the PECS wildcard rule.',
  iconName: 'Database',
  lessons: [
    {
      id: 's7-l1-collections-framework-lists-sets',
      stageId: 7,
      title: 'The Collections Framework: Lists, Sets & Queues',
      slug: 'collections-framework-lists-sets-queues',
      subtitle: 'Iterable, Collection, ArrayList dynamic array growth, HashSet uniqueness, and FIFO queues.',
      readTimeMinutes: 18,
      diagramType: 'collections_tree',
      definition: 'The Java Collections Framework (JCF) is a unified architecture for representing and manipulating collections of objects, comprising core interfaces (Collection, List, Set, Queue), concrete implementations, and standard algorithms.',
      simpleExplanation: 'Standard arrays in Java have a fixed size: if you create an array of 5 items, you can never add a 6th item. The Collections Framework gives you smart, flexible containers (like ArrayList) that grow automatically as you add items, sets that automatically eliminate duplicates, and queues that organize items in first-come, first-served order.',
      whyItExists: 'Before the Collections Framework (Java 1.2), developers had to invent custom linked lists and hash tables or use legacy synchronized classes (Vector and Hashtable). The JCF standardized data structure manipulation across all Java software.',
      howItWorks: 'An `ArrayList` wraps a native primitive Object array (`Object[] elementData`). When full, adding another element triggers an internal reallocation: the JVM creates a new array 50% larger (newCapacity = oldCapacity + (oldCapacity >> 1)), copies all existing elements over, and discards the old array for garbage collection. A `HashSet` wraps an internal `HashMap` where the set elements are stored as hash map keys, ensuring O(1) average lookup and uniqueness.',
      syntax: '// List: Ordered sequence with positional index access\nList<String> list = new ArrayList<>();\n\n// Set: Collection containing no duplicate elements\nSet<Integer> set = new HashSet<>();\n\n// Queue: First-in, first-out processing\nQueue<String> queue = new ArrayDeque<>();',
      syntaxTokens: [
        { token: 'List<T>', meaning: 'Interface guaranteeing ordered elements accessible by zero-based integer indices.' },
        { token: 'Set<T>', meaning: 'Interface modeling mathematical sets: no duplicate elements allowed based on .equals().' },
        { token: 'Queue<T>', meaning: 'Interface designed for holding elements prior to processing (FIFO ordering).' }
      ],
      codeExample: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CollectionsCoreDemo {
    public static void main(String[] args) {
        // List demonstration: Preserves order, allows duplicates
        List<String> auditLog = new ArrayList<>();
        auditLog.add("USER_LOGIN");
        auditLog.add("PAYMENT_SUCCESS");
        auditLog.add("USER_LOGIN"); // Duplicate permitted

        System.out.println("List element count: " + auditLog.size());
        System.out.println("List element at index 1: " + auditLog.get(1));

        // Set demonstration: Filters duplicates automatically via .equals()
        Set<String> uniqueEvents = new HashSet<>(auditLog);
        System.out.println("Unique event types count: " + uniqueEvents.size());
        System.out.println("Contains USER_LOGIN: " + uniqueEvents.contains("USER_LOGIN"));
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'List<String> auditLog = new ArrayList<>();', explanation: 'Programs to the List interface while instantiating an ArrayList with dynamic resizing capabilities.' },
        { tokenOrLine: 'auditLog.add("USER_LOGIN");', explanation: 'Appends element to the end of the backing array. Amortized time complexity is O(1).' },
        { tokenOrLine: 'auditLog.get(1);', explanation: 'Direct index access in O(1) time by computing memory offset: baseAddress + (index * pointerSize).' },
        { tokenOrLine: 'Set<String> uniqueEvents = new HashSet<>(auditLog);', explanation: 'Constructs a HashSet populated with all items from the list, filtering out the duplicate "USER_LOGIN".' }
      ],
      expectedOutput: `List element count: 3
List element at index 1: PAYMENT_SUCCESS
Unique event types count: 2
Contains USER_LOGIN: true`,
      commonMistakes: [
        {
          title: 'Choosing LinkedList over ArrayList for general list operations',
          wrongCode: `List<User> users = new LinkedList<>(); // INEFFICIENCY FOR MOST USE CASES`,
          correctCode: `List<User> users = new ArrayList<>(); // Fast CPU cache locality and contiguous memory`,
          whyWrong: 'LinkedList allocates a distinct node object on the heap for every single item, creating massive memory overhead and destroying CPU cache locality. ArrayList is faster in nearly all practical enterprise scenarios.',
          compilerOrRuntimeError: 'High memory consumption and poor traversal performance.'
        }
      ],
      comparisons: [
        {
          title: 'ArrayList vs HashSet',
          conceptA: {
            name: 'ArrayList',
            description: 'Ordered sequence backed by dynamic resizable array.',
            characteristics: ['Allows duplicate values', 'O(1) direct index access (get(i))', 'O(n) search time (contains(x))']
          },
          conceptB: {
            name: 'HashSet',
            description: 'Unordered mathematical set backed by internal hash table.',
            characteristics: ['Rejects duplicate values strictly', 'No index-based access', 'O(1) average search time (contains(x))']
          },
          keyTakeaway: 'Use ArrayList when element order and index access matter; use HashSet when rapid membership testing and uniqueness are required.'
        }
      ],
      summaryPoints: [
        'Always declare variables using the interface type (List, Set) rather than the concrete class (ArrayList, HashSet).',
        'ArrayList provides O(1) random access; HashSet provides O(1) lookup.',
        'ArrayDeque is faster and more modern than Stack or LinkedList for queues and stacks.'
      ],
      knowledgeCheck: [
        {
          id: 'q7-1',
          question: 'What is the average time complexity of searching for an element using contains() in a HashSet versus an ArrayList?',
          options: [
            'O(1) in HashSet, O(n) in ArrayList',
            'O(n) in HashSet, O(1) in ArrayList',
            'O(log n) in both',
            'O(n) in both'
          ],
          correctIndex: 0,
          explanation: 'HashSet computes the hashCode() of the object to locate its bucket in O(1) average time, whereas ArrayList must inspect every element sequentially (O(n)).'
        }
      ],
      reviewQuestions: [
        'How does an ArrayList dynamically expand its capacity when its internal array fills up?',
        'Why does a HashSet require the stored objects to correctly implement both equals() and hashCode()?'
      ]
    },
    {
      id: 's7-l2-maps-and-hashing',
      stageId: 7,
      title: 'Maps & Hashing Architecture',
      slug: 'maps-and-hashing-architecture',
      subtitle: 'HashMap internal mechanics, hashCode() & equals() contract, bucket collision, and treeification.',
      readTimeMinutes: 20,
      definition: 'A Map is an object that maps unique keys to values. A HashMap is a hash table-based implementation providing O(1) average-time performance for basic operations (get and put) by hashing keys into an array of buckets.',
      simpleExplanation: 'A Map is like a dictionary: you look up a word (the key) and get its definition (the value). You cannot have duplicate words in a dictionary; looking up a word takes you straight to its page without reading the dictionary from page one.',
      whyItExists: 'Associating keys with values (user IDs to user accounts, session tokens to active sessions) is the most pervasive pattern in software engineering. HashMaps enable instant key lookups even across millions of records.',
      howItWorks: `CRITICAL INTERNAL MECHANICS OF HASHMAP:

1. BUCKET ARRAY:
HashMap maintains an internal array of Node<K,V>[] (default initial capacity = 16).

2. HASHING A KEY:
When you call map.put(key, value):
a. The JVM computes key.hashCode().
b. HashMap applies an internal bit-spreading hash function to minimize collisions.
c. It calculates the bucket index using bitwise AND: index = hash & (capacity - 1).

3. HASH COLLISION RESOLUTION:
If two different keys produce the same bucket index (a collision):
- Prior to Java 8, elements were stored in a linked list in that bucket.
- Java 8+ TREEIFICATION: If a single bucket accumulates more than 8 entries (TREEIFY_THRESHOLD) and table capacity >= 64, HashMap converts that bucket from a linked list into a balanced Red-Black Tree (TreeNode).
- This guarantees worst-case lookup time improves from O(n) down to O(log n), preventing Denial of Service (DoS) attacks caused by deliberate hash collision attacks!`,
      syntax: 'Map<KeyType, ValueType> map = new HashMap<>();\nmap.put(key, value);\nValueType val = map.get(key);\nValueType safeVal = map.getOrDefault(key, fallback);',
      codeExample: `import java.util.HashMap;
import java.util.Map;

public class MapArchitectureDemo {
    public static void main(String[] args) {
        Map<String, Integer> inventory = new HashMap<>();

        // Inserting key-value pairs
        inventory.put("SKU-1001", 45);
        inventory.put("SKU-1002", 120);
        inventory.put("SKU-1003", 0);

        // Overwriting an existing key
        inventory.put("SKU-1001", 50);

        // Retrieving values
        int stock = inventory.getOrDefault("SKU-1001", 0);
        int missing = inventory.getOrDefault("SKU-9999", 0);

        System.out.println("Updated stock for SKU-1001: " + stock);
        System.out.println("Default fallback for missing SKU: " + missing);

        // Iterating across Map entries
        for (Map.Entry<String, Integer> entry : inventory.entrySet()) {
            System.out.println("Key: " + entry.getKey() + " => Stock: " + entry.getValue());
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'Map<String, Integer> inventory = new HashMap<>();', explanation: 'Creates a hash map with initial capacity 16 and default load factor 0.75.' },
        { tokenOrLine: 'inventory.put("SKU-1001", 50);', explanation: 'Because "SKU-1001" already exists, its previous value (45) is replaced with 50. Map keys are unique.' },
        { tokenOrLine: 'inventory.getOrDefault(...)', explanation: 'Safely retrieves the value, returning the fallback (0) without throwing NullPointerException if the key does not exist.' },
        { tokenOrLine: 'for (Map.Entry<String, Integer> entry : inventory.entrySet())', explanation: 'Iterates through entry key-value pairs efficiently without redundant hash lookups.' }
      ],
      expectedOutput: `Updated stock for SKU-1001: 50
Default fallback for missing SKU: 0
Key: SKU-1001 => Stock: 50
Key: SKU-1002 => Stock: 120
Key: SKU-1003 => Stock: 0`,
      commonMistakes: [
        {
          title: 'Overriding equals() without overriding hashCode() on custom keys',
          wrongCode: `class CustomKey {
    String id;
    @Override public boolean equals(Object o) { ... } // Forgot hashCode()!
}`,
          correctCode: `class CustomKey {
    String id;
    @Override public boolean equals(Object o) { ... }
    @Override public int hashCode() { return Objects.hash(id); } // Essential!
}`,
          whyWrong: 'The hashCode/equals contract mandates that if two objects are equal according to equals(), they MUST have the same hashCode(). If omitted, two equal keys land in different buckets, making the map unable to retrieve items!',
          compilerOrRuntimeError: 'Severe logic bug: map.get(sameKey) returns null even after map.put(sameKey, val).'
        }
      ],
      comparisons: [
        {
          title: 'HashMap vs TreeMap vs LinkedHashMap',
          conceptA: {
            name: 'HashMap',
            description: 'Unordered, maximum performance hash table.',
            characteristics: ['O(1) average lookup/insert', 'No ordering guarantees whatsoever', 'Permits one null key']
          },
          conceptB: {
            name: 'TreeMap (NavigableMap)',
            description: 'Red-Black Tree sorted by natural order or Comparator.',
            characteristics: ['O(log n) lookup/insert', 'Keys always sorted', 'Does not permit null keys']
          },
          keyTakeaway: 'Use HashMap for maximum speed; use TreeMap when you require sorted keys; use LinkedHashMap when you need predictable insertion-order iteration.'
        }
      ],
      summaryPoints: [
        'A Map stores key-value pairs; keys must be strictly unique.',
        'HashMap uses hashCode() to locate the bucket array index and equals() to resolve collisions.',
        'Java 8 treeifies buckets into Red-Black Trees when collisions exceed 8 entries.',
        'Never use a mutable object as a HashMap key if its fields change after insertion.'
      ],
      knowledgeCheck: [
        {
          id: 'q7-2',
          question: 'What happens in Java 8+ when a single bucket in a HashMap exceeds 8 elements (and table capacity >= 64)?',
          options: [
            'The JVM throws a HashCollisionException.',
            'The bucket converts from a linked list into a balanced Red-Black Tree, improving lookup from O(n) to O(log n).',
            'All colliding keys are automatically deleted from memory.',
            'The map pauses all threads and performs full garbage collection.'
          ],
          correctIndex: 1,
          explanation: 'Treeification replaces the linked list with a Red-Black Tree (TreeNode), bounding worst-case lookup time to O(log n).'
        }
      ],
      reviewQuestions: [
        'Explain the exact contract between equals() and hashCode() and why violating it breaks HashMaps.',
        'What is the load factor of a HashMap, and why is 0.75 the standard default threshold for resizing?'
      ]
    },
    {
      id: 's7-l3-generics-and-wildcards',
      stageId: 7,
      title: 'Generics, Type Erasure & PECS Wildcards',
      slug: 'generics-type-erasure-pecs-wildcards',
      subtitle: 'Type parameters <T>, compile-time safety, bounded wildcards (? extends / ? super), and Comparable.',
      readTimeMinutes: 20,
      definition: 'Generics are compile-time type parameters that enable classes, interfaces, and methods to operate on specified types with compile-time verification. Type erasure is the compiler process of removing all generic type parameters from the compiled bytecode to ensure backward compatibility.',
      simpleExplanation: 'Before generics, lists held raw generic Objects. If you accidentally added an integer to a list of names, the code compiled fine, but crashed at runtime with a ClassCastException. Generics act like a label on a container: "Strings only". The compiler prevents anyone from inserting anything else.',
      whyItExists: 'Generics eliminate the need for manual, risky type casting and shift type mismatch errors from production runtime to development compile-time.',
      howItWorks: `CRITICAL CONCEPTS:

1. TYPE ERASURE:
Generics only exist at compile time! When javac compiles your code, it replaces <T> with its upper bound (e.g. Object), inserts explicit runtime casts, and emits bytecode with ZERO generic information. That is why at runtime you cannot do: new T() or if (obj instanceof List<String>).

2. INVARIANCE:
In Java, although Integer is a subclass of Number, List<Integer> is NOT a subclass of List<Number>! This is called invariance. If it were allowed, you could pass a List<Integer> to a method expecting List<Number> and add a double into it, corrupting the integer list.

3. THE PECS RULE (PRODUCER EXTENDS, CONSUMER SUPER):
To allow flexibility with subtyping, Java provides wildcards:
- <? extends T> (Upper bounded): Use when your method READS/PRODUCES data from the collection. You can safely read items as type T, but cannot add anything (except null).
- <? super T> (Lower bounded): Use when your method WRITES/CONSUMES data into the collection. You can safely add instances of T.`,
      syntax: '// Generic Class:\npublic class Repository<T> { ... }\n\n// PECS Principle:\nvoid copy(List<? extends T> src, List<? super T> dest)',
      codeExample: `import java.util.ArrayList;
import java.util.List;

public class GenericsPecsDemo {
    public static void main(String[] args) {
        List<Integer> integers = List.of(10, 20, 30);
        List<Number> numbers = new ArrayList<>();

        // Copy integers into numbers list using PECS
        copyElements(integers, numbers);

        System.out.println("Destination list size: " + numbers.size());
        System.out.println("Calculated sum: " + sumNumbers(numbers));
    }

    // Producer Extends: We only READ numbers from this list
    public static double sumNumbers(List<? extends Number> list) {
        double sum = 0.0;
        for (Number n : list) {
            sum += n.doubleValue(); // Safe read
        }
        return sum;
    }

    // PECS: src PRODUCES items (extends), dest CONSUMES items (super)
    public static <T> void copyElements(List<? extends T> src, List<? super T> dest) {
        for (T item : src) {
            dest.add(item); // Safe write into destination
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'List<? extends Number> list', explanation: 'Wildcard indicating any list of Number or its subclasses (Integer, Double). Safe to read elements as Number.' },
        { tokenOrLine: 'List<? super T> dest', explanation: 'Wildcard indicating any list capable of holding T or its superclasses. Safe to write T instances into.' },
        { tokenOrLine: 'dest.add(item);', explanation: 'Because dest is bounded by ? super T, the compiler guarantees that adding an item of type T is type-safe.' }
      ],
      expectedOutput: `Destination list size: 3
Calculated sum: 60.0`,
      commonMistakes: [
        {
          title: 'Trying to add items to a List<? extends Number>',
          wrongCode: `List<? extends Number> list = new ArrayList<Integer>();
list.add(10); // COMPILER ERROR!`,
          correctCode: `List<Number> list = new ArrayList<>();
list.add(10); // Permitted on standard typed list`,
          whyWrong: 'Because the exact subtype represented by ? is unknown (it could be a List<Double>), the compiler forbids adding any object into an extends wildcard collection to prevent corruption.',
          compilerOrRuntimeError: 'error: no suitable method found for add(int)'
        }
      ],
      comparisons: [
        {
          title: 'Comparable<T> vs Comparator<T>',
          conceptA: {
            name: 'Comparable<T> (Natural Ordering)',
            description: 'Implemented by the class itself via compareTo(T o).',
            characteristics: ['Defines default natural sorting order (e.g. String alphabetical, Integer numerical)', 'Modified inside class source code', 'Takes single argument']
          },
          conceptB: {
            name: 'Comparator<T> (Custom Strategy)',
            description: 'External comparison strategy class or lambda via compare(T o1, T o2).',
            characteristics: ['Allows multiple sorting criteria (sort by age, sort by name, reverse order)', 'Does not require modifying target class', 'Can be passed into Collections.sort(list, comparator)']
          },
          keyTakeaway: 'Implement Comparable for the single natural sort order; supply a Comparator whenever an alternative sort strategy is required.'
        }
      ],
      summaryPoints: [
        'Generics provide compile-time type safety; type erasure removes generic types at runtime.',
        'Generic collections are invariant: List<Integer> is not a List<Number>.',
        'Follow PECS: Producer Extends, Consumer Super for wildcard flexibility.',
        'Use Comparable for default natural sorting; use Comparator for custom sorting strategies.'
      ],
      knowledgeCheck: [
        {
          id: 'q7-3',
          question: 'What does the PECS mnemonic stand for in Java generics?',
          options: [
            'Program Efficiently, Compile Safely',
            'Producer Extends, Consumer Super',
            'Primitive Extension, Constant Substitution',
            'Parameter Explicit, Cast Superfluous'
          ],
          correctIndex: 1,
          explanation: 'PECS stands for "Producer Extends, Consumer Super", defining whether to use <? extends T> when reading data or <? super T> when writing data.'
        }
      ],
      reviewQuestions: [
        'What is type erasure, and what design trade-off motivated the Java team to use it in Java 5?',
        'Why can you not instantiate a generic array like "new T[10]" in Java?'
      ]
    }
  ]
};
