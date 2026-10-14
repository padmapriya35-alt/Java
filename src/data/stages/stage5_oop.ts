import { Stage } from '../../types/curriculum';

export const stage5: Stage = {
  id: 5,
  stageNumber: 5,
  title: 'Object-Oriented Programming (OOP)',
  tagline: 'Classes, encapsulation, constructors, inheritance hierarchies, polymorphism, interfaces, and abstract contracts.',
  description: 'Deep architectural exploration of Java\'s object-oriented foundation. Master encapsulation, constructor chaining with this() and super(), dynamic method dispatch, polymorphic substitution, interfaces, and the composition-over-inheritance principle.',
  iconName: 'Sparkles',
  lessons: [
    {
      id: 's5-l1-classes-objects-encapsulation',
      stageId: 5,
      title: 'Classes, Objects, Constructors & Encapsulation',
      slug: 'classes-objects-constructors-encapsulation',
      subtitle: 'The blueprint vs the instance, constructor initialization, private state, and invariant preservation.',
      readTimeMinutes: 20,
      diagramType: 'oop_hierarchy',
      definition: 'A class is an encapsulated reference type defining fields (state) and methods (behavior). An object is a concrete, heap-allocated instance of that class. Encapsulation is the design principle of hiding internal object representation and requiring all interaction through controlled methods.',
      simpleExplanation: 'A class is an architectural blueprint for a house. The blueprint specifies bedrooms, electrical wiring, and doors. The object is the actual physical house built on a lot. You can build twenty houses (objects) from one single blueprint (class), and each house has its own furniture and occupants (internal state). Encapsulation means locking the electrical breaker box so only qualified electricians (safe methods) can touch it, rather than allowing any stranger to cut the wires directly.',
      whyItExists: 'In procedural code, global data can be modified by any line of code anywhere in the project, leading to unpredictable bugs and corrupted state. Encapsulation ensures that an object maintains complete authority over its own data invariants.',
      howItWorks: 'When you execute `new BankAccount("Alice", 100);`, the JVM allocates memory on the heap for the object\'s fields. It then executes the constructor subroutine, passing the implicit `this` reference to bind field values. Private fields cannot be accessed by external classes; callers must invoke validated public methods (getters and setters), ensuring invalid states (like negative balances) are rejected before corrupting memory.',
      syntax: 'public class BankAccount {\n    private String accountHolder;\n    private double balance;\n\n    // Constructor\n    public BankAccount(String accountHolder, double initialBalance) {\n        if (initialBalance < 0) throw new IllegalArgumentException("Balance cannot be negative");\n        this.accountHolder = accountHolder;\n        this.balance = initialBalance;\n    }\n\n    public double getBalance() { return this.balance; }\n}',
      syntaxTokens: [
        { token: 'class', meaning: 'Keyword introducing a user-defined blueprint type.' },
        { token: 'private', meaning: 'Access modifier restricting direct field visibility to the enclosing class body only.' },
        { token: 'this', meaning: 'Implicit reference pointing to the current object instance being acted upon.' },
        { token: 'constructor', meaning: 'Subroutine with the exact name of the class and no return type, called upon "new".' }
      ],
      codeExample: `public class BankAccount {
    private final String accountHolder;
    private double balance;

    public BankAccount(String accountHolder, double initialBalance) {
        if (initialBalance < 0) {
            throw new IllegalArgumentException("Initial balance cannot be negative.");
        }
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be strictly positive.");
        }
        this.balance += amount;
    }

    public double getBalance() {
        return this.balance;
    }

    public String getAccountHolder() {
        return this.accountHolder;
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount("Sarah Conner", 500.0);
        account.deposit(250.0);

        System.out.println("Holder: " + account.getAccountHolder());
        System.out.println("Verified Balance: $" + account.getBalance());
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'private double balance;', explanation: 'Encapsulated field. External code cannot write account.balance = -999999;.' },
        { tokenOrLine: 'this.accountHolder = accountHolder;', explanation: 'The "this" keyword disambiguates the instance field from the incoming constructor parameter of the same name.' },
        { tokenOrLine: 'public void deposit(double amount)', explanation: 'A mutator method enforcing business logic (amount > 0) before modifying the balance field.' },
        { tokenOrLine: 'public double getBalance()', explanation: 'An accessor (getter) method providing read-only inspection of the private balance state.' }
      ],
      expectedOutput: `Holder: Sarah Conner
Verified Balance: $750.0`,
      commonMistakes: [
        {
          title: 'Making instance fields public (violating encapsulation)',
          wrongCode: `public class LeakyAccount {
    public double balance; // DANGEROUS: Any external code can set this to -5000000!
}`,
          correctCode: `public class SecureAccount {
    private double balance; // Safe: only validated methods can alter state

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amount;
    }
}`,
          whyWrong: 'Public fields allow external components to bypass validation logic, corrupting system state and creating un-debuggable side effects.',
          compilerOrRuntimeError: 'Architectural vulnerability and unpredictable runtime bugs.'
        }
      ],
      comparisons: [
        {
          title: 'Private vs Protected vs Package-Private vs Public',
          conceptA: {
            name: 'private',
            description: 'Visible only within the exact enclosing class body.',
            characteristics: ['Maximum encapsulation', 'Subclasses cannot access directly', 'Best default for all fields']
          },
          conceptB: {
            name: 'public',
            description: 'Visible to all classes across all packages in the application.',
            characteristics: ['Part of the public API contract', 'Must remain backward-compatible', 'Use for exposed service methods']
          },
          keyTakeaway: 'Always keep fields private and expose minimal, carefully validated public methods.'
        }
      ],
      summaryPoints: [
        'A class defines state and behavior; an object is a live instance in heap memory.',
        'Constructors initialize object state and enforce structural invariants.',
        'Encapsulation prevents external tampering by keeping fields private.',
        'The this keyword refers to the current executing object instance.'
      ],
      knowledgeCheck: [
        {
          id: 'q5-1',
          question: 'What is the primary benefit of making class fields private in Java?',
          options: [
            'It makes the program compile twice as fast.',
            'It forces all state modifications through validated methods, preventing invalid object states.',
            'It saves 50% of the heap memory allocated for the object.',
            'It prevents the JVM Garbage Collector from deleting the object.'
          ],
          correctIndex: 1,
          explanation: 'Making fields private protects class invariants by requiring external code to interact via public methods that validate business rules.'
        }
      ],
      reviewQuestions: [
        'What is constructor chaining and how does this(...) allow one constructor to invoke another?',
        'Why should defensive copying be used when a getter returns a mutable reference like a Date or an array?'
      ]
    },
    {
      id: 's5-l2-inheritance-and-polymorphism',
      stageId: 5,
      title: 'Inheritance, Polymorphism & Dynamic Dispatch',
      slug: 'inheritance-polymorphism-dynamic-dispatch',
      subtitle: 'The extends keyword, method overriding (@Override), super(), and runtime method lookup.',
      readTimeMinutes: 20,
      diagramType: 'oop_hierarchy',
      definition: 'Inheritance is a subtyping mechanism where a derived class (subclass) acquires fields and methods from a base class (superclass). Polymorphism is the capability of a reference of a superclass type to invoke overridden subclass methods determined at runtime through dynamic method dispatch.',
      simpleExplanation: 'Inheritance creates a family tree: a Dog "is an" Animal. Because a Dog is an Animal, any code that knows how to interact with an Animal can interact with a Dog without knowing the specific breed. When you tell an Animal to "makeSound()", polymorphism ensures that a Dog barks, a Cat meows, and a Duck quacks — each according to its own true nature.',
      whyItExists: 'Polymorphism allows software to be open for extension but closed for modification (the Open/Closed Principle). You can add new animal types or payment processors to a system without editing existing processing algorithms.',
      howItWorks: 'In Java, all non-private, non-static, non-final methods are virtual by default. Every object in the JVM heap carries a hidden pointer in its header to a Virtual Method Table (vtable). When `animal.makeSound()` is called, the JVM does not look at the declared reference type; it inspects the vtable of the concrete runtime object, resolving the call to the subclass\'s overridden method.',
      syntax: 'public class Animal {\n    public void makeSound() {\n        System.out.println("Generic sound");\n    }\n}\n\npublic class Dog extends Animal {\n    @Override\n    public void makeSound() {\n        System.out.println("Bark!");\n    }\n}',
      syntaxTokens: [
        { token: 'extends', meaning: 'Declares inheritance from a single superclass (Java does not support multiple class inheritance).' },
        { token: '@Override', meaning: 'Compiler annotation verifying that the method accurately overrides a signature in the superclass.' },
        { token: 'super', meaning: 'Reference used to invoke the superclass version of a constructor or method.' }
      ],
      codeExample: `class Notification {
    private final String recipient;

    public Notification(String recipient) {
        this.recipient = recipient;
    }

    public String getRecipient() {
        return recipient;
    }

    public void send(String message) {
        System.out.println("Sending base notification to " + recipient + ": " + message);
    }
}

class EmailNotification extends Notification {
    public EmailNotification(String emailAddress) {
        super(emailAddress); // Delegates to Notification constructor
    }

    @Override
    public void send(String message) {
        System.out.println("Transmitting SMTP email to [" + getRecipient() + "]: " + message);
    }
}

class SmsNotification extends Notification {
    public SmsNotification(String phoneNumber) {
        super(phoneNumber);
    }

    @Override
    public void send(String message) {
        System.out.println("Dispatching SMS cellular packet to [" + getRecipient() + "]: " + message);
    }
}

public class PolymorphismInAction {
    public static void main(String[] args) {
        // Polymorphic reference assignment:
        Notification[] queue = new Notification[] {
            new EmailNotification("dev@example.com"),
            new SmsNotification("+1-555-0199")
        };

        for (Notification notifier : queue) {
            // Dynamic dispatch resolves the exact subclass method at runtime:
            notifier.send("Deployment successful.");
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'super(emailAddress);', explanation: 'Subclass constructor must invoke the superclass constructor to initialize inherited private state before executing its own body.' },
        { tokenOrLine: '@Override public void send(...)', explanation: 'Overrides the base send method. The compiler verifies that the signature matches the superclass exactly.' },
        { tokenOrLine: 'Notification[] queue', explanation: 'An array typed to the parent Notification class. It can store any subclass instance (polymorphic substitution).' },
        { tokenOrLine: 'notifier.send(...)', explanation: 'At runtime, the JVM inspects each object\'s actual class and dynamically dispatches to EmailNotification.send or SmsNotification.send.' }
      ],
      expectedOutput: `Transmitting SMTP email to [dev@example.com]: Deployment successful.
Dispatching SMS cellular packet to [+1-555-0199]: Deployment successful.`,
      commonMistakes: [
        {
          title: 'Forgetting the @Override annotation and accidentally overloading instead',
          wrongCode: `class Cat extends Animal {
    // Intended to override void makeSound(), but typo in parameter creates a separate overload:
    public void makeSound(int volume) {
        System.out.println("Meow");
    }
}`,
          correctCode: `class Cat extends Animal {
    @Override // Compiler will catch the typo immediately!
    public void makeSound() {
        System.out.println("Meow");
    }
}`,
          whyWrong: 'Without @Override, introducing an accidental parameter or typo does not produce a compiler error — it simply creates a brand-new method, causing dynamic dispatch to call the parent method instead.',
          compilerOrRuntimeError: 'With @Override: error: method does not override or implement a method from a supertype.'
        }
      ],
      comparisons: [
        {
          title: 'Inheritance ("is-a") vs Composition ("has-a")',
          conceptA: {
            name: 'Inheritance ("is-a")',
            description: 'Tight architectural coupling through subclassing (extends).',
            characteristics: ['Subclass inherits all public/protected methods', 'Harder to change superclass without breaking subclasses', 'Use only when true taxonomic subtyping applies']
          },
          conceptB: {
            name: 'Composition ("has-a")',
            description: 'Loose coupling by holding references to other objects.',
            characteristics: ['Classes delegate tasks to collaborator objects', 'Easy to swap implementations at runtime', 'Preferred in modern design: "Favor composition over inheritance"']
          },
          keyTakeaway: 'Inherit only when the child is genuinely a specialized version of the parent; otherwise, compose objects by having fields reference them.'
        }
      ],
      summaryPoints: [
        'Java supports single inheritance of classes (a class can only extend one superclass).',
        'Polymorphism allows parent references to hold child instances and invoke overridden child methods.',
        'Dynamic method dispatch resolves method calls at runtime using the object\'s vtable.',
        'Always annotate overridden methods with @Override.'
      ],
      knowledgeCheck: [
        {
          id: 'q5-2',
          question: 'If "Animal a = new Dog();" is executed, and both classes define "makeSound()", which method executes when calling "a.makeSound()"?',
          options: [
            'Animal\'s makeSound(), because the variable reference type is Animal.',
            'Dog\'s makeSound(), because dynamic method dispatch invokes the method on the actual heap object type.',
            'Both methods execute simultaneously in parallel threads.',
            'A compile error occurs because types do not match.'
          ],
          correctIndex: 1,
          explanation: 'In Java, method calls on objects are polymorphic (virtual). Dynamic method dispatch ensures the method of the actual runtime object (Dog) is invoked.'
        }
      ],
      reviewQuestions: [
        'Why does Java prohibit multiple class inheritance, yet permit multiple interface implementation?',
        'How does the final keyword on a class or method affect inheritance and dynamic dispatch?'
      ]
    },
    {
      id: 's5-l3-interfaces-and-abstract-classes',
      stageId: 5,
      title: 'Abstraction: Interfaces vs Abstract Classes',
      slug: 'interfaces-vs-abstract-classes',
      subtitle: 'Pure contracts, default methods, partial implementations, and multiple interface implementation.',
      readTimeMinutes: 18,
      definition: 'An interface is a formal contract specifying method signatures that implementing classes must fulfill. An abstract class is an incomplete blueprint class that cannot be instantiated on its own and may combine abstract declarations with concrete method implementations and state.',
      simpleExplanation: 'An interface is like a job description: "Must be able to speak French and drive a forklift." The company doesn\'t care what school you went to or what your ancestry is, as long as you fulfill the contract. An abstract class is like an unfinished vehicle chassis: it provides the engine and wheels, but forces each specific model (sedan, truck) to finish the bodywork.',
      whyItExists: 'Large software projects require decoupling interface from implementation. A payment service should not care whether it is processing payments through Stripe, PayPal, or a bank wire; it only requires an object implementing `PaymentGateway`.',
      howItWorks: 'A class can `implement` multiple interfaces, enabling multiple-inheritance of type without the memory layout complexities of multiple class inheritance. Since Java 8, interfaces can provide `default` methods with baseline implementations. Abstract classes can declare instance state (`private` fields) and constructors, whereas interfaces can only hold `public static final` constants.',
      syntax: '// Interface:\npublic interface Storage {\n    void save(String key, byte[] data);\n    byte[] load(String key);\n}\n\n// Abstract Class:\npublic abstract class BaseService {\n    protected final Logger logger;\n    public BaseService(Logger logger) { this.logger = logger; }\n    public abstract void execute();\n}',
      codeExample: `interface Encryptor {
    String encrypt(String plainText);
    String decrypt(String cipherText);

    // Default method (Java 8+): provides baseline behavior
    default void printAlgorithm() {
        System.out.println("Standard cryptographic provider.");
    }
}

class CaesarCipher implements Encryptor {
    private final int shift;

    public CaesarCipher(int shift) {
        this.shift = shift;
    }

    @Override
    public String encrypt(String plainText) {
        StringBuilder result = new StringBuilder();
        for (char c : plainText.toCharArray()) {
            result.append((char) (c + shift));
        }
        return result.toString();
    }

    @Override
    public String decrypt(String cipherText) {
        StringBuilder result = new StringBuilder();
        for (char c : cipherText.toCharArray()) {
            result.append((char) (c - shift));
        }
        return result.toString();
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        // Program to the interface, not the concrete implementation:
        Encryptor cipher = new CaesarCipher(3);
        String secret = cipher.encrypt("JAVA");

        System.out.println("Encrypted ciphertext: " + secret);
        System.out.println("Decrypted plaintext: " + cipher.decrypt(secret));
        cipher.printAlgorithm();
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'interface Encryptor', explanation: 'Defines the pure behavioral contract without specifying how characters are transformed.' },
        { tokenOrLine: 'default void printAlgorithm()', explanation: 'Default method allowing interfaces to evolve by supplying a fallback implementation without breaking existing implementers.' },
        { tokenOrLine: 'class CaesarCipher implements Encryptor', explanation: 'Fulfills the contract by providing concrete method bodies for encrypt and decrypt.' },
        { tokenOrLine: 'Encryptor cipher = new CaesarCipher(3);', explanation: 'Coding to the interface. The variable type is Encryptor, allowing the concrete class to be swapped effortlessly.' }
      ],
      expectedOutput: `Encrypted ciphertext: MDYD
Decrypted plaintext: JAVA
Standard cryptographic provider.`,
      commonMistakes: [
        {
          title: 'Trying to instantiate an interface or abstract class directly',
          wrongCode: `Encryptor enc = new Encryptor(); // COMPILER ERROR`,
          correctCode: `Encryptor enc = new CaesarCipher(3); // Instantiate concrete class`,
          whyWrong: 'Interfaces and abstract classes contain incomplete method specifications without executable bodies, so the JVM cannot allocate them as functional objects.',
          compilerOrRuntimeError: 'error: Encryptor is abstract; cannot be instantiated'
        }
      ],
      comparisons: [
        {
          title: 'Interface vs Abstract Class',
          conceptA: {
            name: 'Interface',
            description: 'Defines capability / role contract across unrelated classes.',
            characteristics: ['A class can implement multiple interfaces', 'No instance fields (only static constants)', 'No constructors', 'Methods public by default']
          },
          conceptB: {
            name: 'Abstract Class',
            description: 'Defines root identity and shared partial implementation.',
            characteristics: ['A class can extend only ONE abstract class', 'Can hold instance fields with any access modifier', 'Can have constructors called by super()', 'Can have private/protected methods']
          },
          keyTakeaway: 'Use an abstract class for closely related classes sharing state and code; use an interface to define a contract that any class anywhere can fulfill.'
        }
      ],
      summaryPoints: [
        'Interfaces define behavioral contracts; classes implement them using the implements keyword.',
        'A single class can implement multiple interfaces simultaneously.',
        'Abstract classes cannot be instantiated and can hold state, constructors, and concrete methods.',
        'Always design software to "code to interfaces, not implementations".'
      ],
      knowledgeCheck: [
        {
          id: 'q5-3',
          question: 'Can an interface in Java declare an instance variable (non-static field)?',
          options: [
            'Yes, any variable can be declared in an interface.',
            'No, all fields in an interface are implicitly public, static, and final (constants).',
            'Yes, if marked protected.',
            'Only in Java 21+.'
          ],
          correctIndex: 1,
          explanation: 'Interfaces cannot contain instance state. Any variable declared in an interface is automatically public static final.'
        }
      ],
      reviewQuestions: [
        'Why was the default method feature added to Java interfaces in Java 8, and how did it protect backward compatibility for the Collections API?',
        'When should you choose an abstract class over an interface in enterprise architecture?'
      ]
    }
  ]
};
