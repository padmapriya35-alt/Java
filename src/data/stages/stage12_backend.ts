import { Stage } from '../../types/curriculum';

export const stage12: Stage = {
  id: 12,
  stageNumber: 12,
  title: 'Enterprise Java Backend & Spring Boot',
  tagline: 'HTTP/REST architecture, JDBC persistence, three-tier layering, and Spring Boot Dependency Injection.',
  description: 'Understand how real-world enterprise backends are engineered in Java. Master RESTful API constraints, JDBC database connections, connection pooling, three-tier architecture, and Spring Boot framework fundamentals.',
  iconName: 'Database',
  lessons: [
    {
      id: 's12-l1-rest-jdbc-architecture',
      stageId: 12,
      title: 'REST Architecture, JDBC & Database Integration',
      slug: 'rest-architecture-jdbc-database',
      subtitle: 'HTTP verbs, status codes, JDBC Connection pooling (HikariCP), and PreparedStatement safety.',
      readTimeMinutes: 20,
      definition: 'Representational State Transfer (REST) is an architectural style for distributed hypermedia systems utilizing standard HTTP methods. Java Database Connectivity (JDBC) is a standard API specification enabling Java applications to interact with relational database management systems.',
      simpleExplanation: 'When your mobile phone talks to a server, it sends an HTTP request: "GET /users/42". The server routes this request to Java code. Java uses JDBC like a translator to connect to PostgreSQL or MySQL, execute safe SQL queries, and convert database rows into Java objects before sending JSON back to your phone.',
      whyItExists: 'Enterprise systems must exchange data reliably across heterogeneous clients (web browsers, mobile apps, other microservices) while querying relational SQL databases safely without vendor lock-in.',
      howItWorks: `CRITICAL BACKEND CONCEPTS:

1. THREE-TIER ARCHITECTURE:
- Controller (Presentation Layer): Handles HTTP requests, extracts parameters, validates inputs, and formats responses (JSON / DTOs).
- Service (Business Layer): Contains pure business rules, transaction boundaries, and computational workflows.
- Repository / DAO (Data Access Layer): Communicates with the database via SQL queries or ORM entities.

2. JDBC CORE INTERFACES:
- Connection: Represents a live physical socket connection to the database.
- PreparedStatement: A precompiled SQL statement template that sends parameters separately from the query syntax, completely immunizing against SQL Injection!
- ResultSet: A cursor pointing to rows returned from a database query.

3. CONNECTION POOLING (HikariCP):
Creating a new TCP/IP database connection takes 50-100ms. A connection pool (like HikariCP) pre-allocates a pool of connections and reuses them across requests, dropping acquisition latency to microseconds.`,
      syntax: '// JDBC Safe Query Pattern:\nString sql = "SELECT id, email, balance FROM users WHERE id = ?";\ntry (Connection conn = dataSource.getConnection();\n     PreparedStatement ps = conn.prepareStatement(sql)) {\n    ps.setLong(1, userId);\n    try (ResultSet rs = ps.executeQuery()) {\n        if (rs.next()) { ... }\n    }\n}',
      syntaxTokens: [
        { token: 'PreparedStatement', meaning: 'Precompiled SQL statement preventing SQL injection by treating input as literal data.' },
        { token: 'ResultSet', meaning: 'Iterable table cursor pointing to database record rows.' },
        { token: 'DataSource', meaning: 'Factory and connection pool interface providing managed database connections.' }
      ],
      codeExample: `// Model record representing domain data
record UserAccount(long id, String username, double balance) {}

public class JdbcBackendSimulation {
    public static void main(String[] args) {
        // Simulating three-tier flow execution:
        UserAccount user = fetchUserAccountById(101L);

        System.out.println("HTTP 200 OK Response Payload:");
        System.out.println("{\\n  \\"id\\": " + user.id() + ",\\n  \\"username\\": \\"" + user.username() + "\\",\\n  \\"balance\\": " + user.balance() + "\\n}");
    }

    // Data Access Layer method demonstrating safe JDBC PreparedStatement mechanics:
    public static UserAccount fetchUserAccountById(long id) {
        String query = "SELECT id, username, balance FROM accounts WHERE id = ?";

        // PreparedStatement treats the parameter strictly as literal data:
        System.out.println("Executing SQL: " + query + " with bound parameter [id=" + id + "]");

        // Simulated database record retrieval:
        return new UserAccount(id, "dev_engineer", 1425.50);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'SELECT id, username, balance FROM accounts WHERE id = ?', explanation: 'SQL query containing parameter placeholder (?). The database server parses and compiles the query structure first.' },
        { tokenOrLine: 'ps.setLong(1, userId)', explanation: 'Binds the long integer value to the first placeholder marker. Data cannot alter SQL command structure.' },
        { tokenOrLine: 'UserAccount record', explanation: 'Maps the relational row into an immutable Java record DTO suitable for JSON serialization.' }
      ],
      expectedOutput: `Executing SQL: SELECT id, username, balance FROM accounts WHERE id = ? with bound parameter [id=101]
HTTP 200 OK Response Payload:
{
  "id": 101,
  "username": "dev_engineer",
  "balance": 1425.5
}`,
      commonMistakes: [
        {
          title: 'Concatenating strings into SQL queries (Fatal SQL Injection)',
          wrongCode: `// DISASTROUS VULNERABILITY:
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
Statement stmt = conn.createStatement();
stmt.executeQuery(sql);`,
          correctCode: `// SECURE: Use PreparedStatement with parameter placeholders:
String sql = "SELECT * FROM users WHERE name = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, userInput);
ps.executeQuery();`,
          whyWrong: 'String concatenation allows an attacker to input: admin\' OR \'1\'=\'1, modifying query syntax and granting unauthorized access.',
          compilerOrRuntimeError: 'High-severity OWASP Top 10 SQL Injection vulnerability.'
        }
      ],
      comparisons: [
        {
          title: 'Statement vs PreparedStatement',
          conceptA: {
            name: 'Statement',
            description: 'Executes static, unparameterized SQL strings.',
            characteristics: ['Vulnerable to SQL Injection if concatenating inputs', 'Re-parsed and re-compiled by DB on every call', 'Never use with user-supplied data']
          },
          conceptB: {
            name: 'PreparedStatement',
            description: 'Precompiled SQL with parameterized placeholders (?).',
            characteristics: ['100% immune to SQL injection', 'Precompiled once by DB server for high performance', 'Handles type conversions (dates, blobs, numbers) automatically']
          },
          keyTakeaway: 'Always use PreparedStatement for any database interaction involving dynamic arguments.'
        }
      ],
      summaryPoints: [
        'REST APIs use HTTP GET, POST, PUT, DELETE verbs to manipulate resources identified by URIs.',
        'Enterprise Java follows a clean three-tier structure: Controller -> Service -> Repository.',
        'JDBC provides low-level SQL connectivity; HikariCP provides production connection pooling.',
        'Always use PreparedStatement with placeholders (?) to prevent SQL Injection.'
      ],
      knowledgeCheck: [
        {
          id: 'q12-1',
          question: 'Why does PreparedStatement prevent SQL injection attacks?',
          options: [
            'Because it encrypts all database communications.',
            'Because the database compiles the SQL query structure before parameter values are bound, treating inputs strictly as literal data rather than executable SQL code.',
            'Because it disallows string data.',
            'Because it only works with read-only SELECT queries.'
          ],
          correctIndex: 1,
          explanation: 'PreparedStatement compiles the SQL query template first. Bound values are sent separately across the wire, meaning malicious SQL commands inside strings are never executed as code.'
        }
      ],
      reviewQuestions: [
        'How does connection pooling in HikariCP prevent socket exhaustion under high concurrency loads?',
        'Describe the exact responsibilities of the Service layer versus the Controller layer in an enterprise backend.'
      ]
    },
    {
      id: 's12-l2-spring-boot-and-di',
      stageId: 12,
      title: 'Spring Boot Architecture & Dependency Injection',
      slug: 'spring-boot-architecture-dependency-injection',
      subtitle: 'Inversion of Control (IoC), @RestController, @Service, constructor injection, and validation.',
      readTimeMinutes: 20,
      definition: 'Spring Boot is an opinionated framework that simplifies the creation of production-grade, stand-alone Spring applications. Inversion of Control (IoC) is a design principle where the control of object creation and lifecycle management is transferred from application code to a framework container.',
      simpleExplanation: 'Without Spring, if a Controller needs a Service, and the Service needs a Database, you have to write dozens of lines creating and passing objects around manually. With Spring Boot\'s Dependency Injection, you simply declare: "I am a Controller and I need a Service." When your app boots up, Spring\'s IoC container automatically builds all the pieces in the right order and hands them to each other.',
      whyItExists: 'Building enterprise backends involves complex boilerplate: setting up web servers (Tomcat/Jetty), managing database connections, configuring security filters, and handling JSON serialization. Spring Boot configures these automatically through auto-configuration.',
      howItWorks: `@SpringBootApplication boots the Spring ApplicationContext. Spring scans classes annotated with stereotypes:
- @RestController: Registers an HTTP endpoint controller with Jackson JSON serialization.
- @Service: Registers a business service bean in the container.
- @Repository: Registers a data access bean and translates database exceptions.
When the container creates a bean, it inspects its constructor. If the constructor requires other beans, Spring locates them and injects them automatically (Constructor Injection).`,
      syntax: '// Modern Spring Boot Controller with Constructor Injection:\n@RestController\n@RequestMapping("/api/v1/orders")\npublic class OrderController {\n    private final OrderService orderService;\n\n    // Preferred Constructor Injection:\n    public OrderController(OrderService orderService) {\n        this.orderService = orderService;\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<OrderDto> getOrder(@PathVariable Long id) {\n        return ResponseEntity.ok(orderService.findOrder(id));\n    }\n}',
      syntaxTokens: [
        { token: '@RestController', meaning: 'Combines @Controller and @ResponseBody, returning serialized JSON payloads directly.' },
        { token: '@Service', meaning: 'Stereotype annotation marking the class as a business logic Spring Bean.' },
        { token: '@Autowired', meaning: 'Annotation instructing Spring to resolve and inject collaborator dependencies.' }
      ],
      codeExample: `// Domain DTO Record
record PaymentRequest(String accountId, double amount) {}

// Service Interface and Implementation:
interface PaymentService {
    String processPayment(PaymentRequest request);
}

class StandardPaymentService implements PaymentService {
    @Override
    public String processPayment(PaymentRequest request) {
        return "SUCCESS: Processed $" + request.amount() + " for Account " + request.accountId();
    }
}

// Controller utilizing Constructor Dependency Injection:
class PaymentController {
    private final PaymentService paymentService;

    // Constructor Injection (Best Practice: enables unit testing without Spring context)
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public String handlePostPayment(PaymentRequest request) {
        if (request.amount() <= 0) {
            return "HTTP 400 Bad Request: Amount must be positive.";
        }
        return "HTTP 200 OK: " + paymentService.processPayment(request);
    }
}

public class SpringArchitectureDemo {
    public static void main(String[] args) {
        // Demonstration of Inversion of Control wiring:
        PaymentService service = new StandardPaymentService();
        PaymentController controller = new PaymentController(service);

        PaymentRequest request = new PaymentRequest("ACC-4821", 99.50);
        String response = controller.handlePostPayment(request);

        System.out.println("API Output:\\n" + response);
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'PaymentController(PaymentService paymentService)', explanation: 'Constructor injection explicitly declares the controller\'s dependencies. Makes mocking trivial in JUnit tests.' },
        { tokenOrLine: 'private final PaymentService paymentService;', explanation: 'The field is marked final, ensuring the dependency is immutable and cannot be altered after initialization.' },
        { tokenOrLine: 'handlePostPayment(PaymentRequest request)', explanation: 'Simulates a @PostMapping endpoint verifying validation before delegating to the business service.' }
      ],
      expectedOutput: `API Output:
HTTP 200 OK: SUCCESS: Processed $99.5 for Account ACC-4821`,
      commonMistakes: [
        {
          title: 'Using field injection (@Autowired on private fields) instead of constructor injection',
          wrongCode: `@RestController
public class BadController {
    @Autowired
    private OrderService orderService; // Flawed: cannot test without launching full Spring context!
}`,
          correctCode: `@RestController
public class GoodController {
    private final OrderService orderService;

    public GoodController(OrderService orderService) {
        this.orderService = orderService; // Clean, immutable, easy to unit test
    }
}`,
          whyWrong: 'Field injection hides dependencies, prevents fields from being marked immutable (final), and makes unit testing impossible without reflection or heavy Spring container overhead.',
          compilerOrRuntimeError: 'Anti-pattern discouraged by Spring engineering team.'
        }
      ],
      comparisons: [
        {
          title: 'Constructor Injection vs Field Injection',
          conceptA: {
            name: 'Constructor Injection',
            description: 'Dependencies passed through the class constructor.',
            characteristics: ['Allows final immutable fields', 'Guarantees object is fully initialized upon construction', 'Easy to unit test with mock objects without Spring']
          },
          conceptB: {
            name: 'Field Injection (@Autowired on field)',
            description: 'Spring injects dependencies via reflection directly into fields.',
            characteristics: ['Cannot use final modifiers', 'Easy to create circular dependencies accidentally', 'Requires Spring container or Mockito reflection to test']
          },
          keyTakeaway: 'Always use Constructor Injection for clean, testable, immutable component architecture.'
        }
      ],
      summaryPoints: [
        'Spring Boot auto-configures Tomcat, Jackson, and DataSource beans based on classpath dependencies.',
        'Inversion of Control (IoC) decouples object creation from application logic.',
        'Stereotype annotations (@RestController, @Service, @Repository) define component roles.',
        'Constructor injection is the industry standard for wiring Spring Beans.'
      ],
      knowledgeCheck: [
        {
          id: 'q12-2',
          question: 'Why is constructor injection strongly preferred over @Autowired field injection in modern Spring Boot?',
          options: [
            'Because constructor injection allows fields to be declared final (immutable) and simplifies unit testing with mocks.',
            'Because field injection is deprecated and causes compilation errors in Java 21.',
            'Because constructor injection requires 50% less CPU memory.',
            'Because constructor injection disables garbage collection.'
          ],
          correctIndex: 0,
          explanation: 'Constructor injection allows dependencies to be final and immutable, and enables developers to instantiate the class in plain JUnit tests without needing the Spring context.'
        }
      ],
      reviewQuestions: [
        'How does Spring Boot Auto-Configuration (@EnableAutoConfiguration) use @ConditionalOnClass to conditionally instantiate beans?',
        'What is the difference between a Bean with Singleton scope versus Prototype scope in the Spring ApplicationContext?'
      ]
    }
  ]
};
