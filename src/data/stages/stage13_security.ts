import { Stage } from '../../types/curriculum';

export const stage13: Stage = {
  id: 13,
  stageNumber: 13,
  title: 'Enterprise Java Security & Defense',
  tagline: 'Defensive engineering, SQL injection immunity, cryptographic password hashing, JWT security, and supply chain protection.',
  description: 'Master offensive threats and defensive engineering in Java. Learn how to prevent OWASP Top 10 vulnerabilities, use slow cryptographic hashing (BCrypt/Argon2) for credential protection, secure REST API authentication, and scan third-party dependencies for CVEs.',
  iconName: 'Shield',
  lessons: [
    {
      id: 's13-l1-defensive-coding-and-injection',
      stageId: 13,
      title: 'Defensive Coding, Injection Immunity & Input Validation',
      slug: 'defensive-coding-injection-immunity-validation',
      subtitle: 'Validating boundaries, eliminating SQL/Command injection, path traversal defenses, and safe error handling.',
      readTimeMinutes: 20,
      definition: 'Secure coding is the engineering practice of developing software that guards against the accidental introduction of security vulnerabilities. Input validation is the programmatic verification that all incoming external data strictly complies with expected structural, numeric, and character constraints before being processed.',
      simpleExplanation: 'Never trust external input. Whether data comes from a web form, a mobile app, or a partner API, assume an attacker wrote it. If an application accepts a user-provided file name like "../../etc/passwd" without validation, an attacker can steal system secrets (Path Traversal). If an app sticks user text straight into SQL, an attacker can delete the database. Defensive coding builds impenetrable validation gates at every entry point.',
      whyItExists: 'Data breaches cost millions of dollars and compromise user privacy. Vulnerabilities like SQL Injection and Path Traversal have dominated the OWASP Top 10 for over two decades because developers mistakenly trusted raw input strings.',
      howItWorks: `CRITICAL DEFENSIVE RULES:

1. THE WHITELISTING PRINCIPLE:
Always prefer allow-lists (validating against known good characters) over deny-lists (trying to filter known bad characters). Attackers constantly discover encoding tricks (%00 null bytes, Unicode bypasses) that slip past deny-lists.

2. PATH TRAVERSAL DEFENSE:
When handling user-supplied file names:
- Normalize the path using Path.normalize().
- Verify that the resulting absolute path starts strictly within the designated target directory using path.startsWith(baseDirectory).

3. INFORMATION DISCLOSURE & ERROR HANDLING:
Never return raw Java stack traces to HTTP clients in production! Stack traces leak database schemas, class names, framework versions, and internal file paths to attackers. Catch exceptions internally, log the full stack trace to a secure log collector, and return a sanitized error DTO with an opaque correlation ID to the user.`,
      syntax: '// Path Traversal Defense Pattern:\nPath basePath = Path.of("/var/app/uploads").toAbsolutePath().normalize();\nPath resolvedPath = basePath.resolve(userFilename).normalize();\nif (!resolvedPath.startsWith(basePath)) {\n    throw new SecurityException("Illegal directory traversal attempt!");\n}',
      syntaxTokens: [
        { token: 'toAbsolutePath()', meaning: 'Resolves relative path elements against the root filesystem.' },
        { token: 'normalize()', meaning: 'Eliminates redundant navigation elements like "." and ".." from the path string.' },
        { token: 'startsWith(basePath)', meaning: 'Verifies the canonical target path remains securely within the allowed root boundary.' }
      ],
      codeExample: `import java.nio.file.Path;
import java.nio.file.Paths;

public class SecurityDefensesDemo {
    public static void main(String[] args) {
        Path uploadDirectory = Paths.get("uploads").toAbsolutePath().normalize();

        // Safe user input:
        handleUserFileRequest(uploadDirectory, "user_avatar.png");

        // Malicious attack attempt:
        handleUserFileRequest(uploadDirectory, "../../etc/shadow");
    }

    public static void handleUserFileRequest(Path baseDir, String untrustedFilename) {
        try {
            // Step 1: Resolve and normalize target path
            Path targetPath = baseDir.resolve(untrustedFilename).normalize();

            // Step 2: Boundary check against traversal attack
            if (!targetPath.startsWith(baseDir)) {
                System.err.println("SECURITY ALERT: Path traversal attack detected! Blocked access to: " + untrustedFilename);
                return;
            }

            System.out.println("Path verified as secure: " + targetPath.getFileName());
        } catch (Exception e) {
            System.err.println("Validation exception: Access denied.");
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'baseDir.resolve(untrustedFilename).normalize();', explanation: 'Combines the upload directory with the untrusted filename and resolves ".." parent directory references.' },
        { tokenOrLine: 'if (!targetPath.startsWith(baseDir))', explanation: 'Checks whether the normalized path has escaped outside the uploads folder. For "../../etc/shadow", this evaluates to true, catching the exploit.' },
        { tokenOrLine: 'Security Alert Block', explanation: 'Rejects the malicious request immediately before any filesystem read or write operation can take place.' }
      ],
      expectedOutput: `Path verified as secure: user_avatar.png
SECURITY ALERT: Path traversal attack detected! Blocked access to: ../../etc/shadow`,
      commonMistakes: [
        {
          title: 'Using fast cryptographic hashes like MD5 or SHA-256 for passwords',
          wrongCode: `// FATAL MISTAKE: SHA-256 is designed for fast file checksums, NOT passwords!
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest(password.getBytes());`,
          correctCode: `// SECURE: Use an intentionally slow, salted, memory-hard algorithm like BCrypt or Argon2:
String passwordHash = BCrypt.hashpw(rawPassword, BCrypt.gensalt(12));`,
          whyWrong: 'Modern GPUs can calculate billions of SHA-256 hashes per second. An attacker with a leaked password database can crack SHA-256 hashes via rainbow tables and brute-force in minutes.',
          compilerOrRuntimeError: 'Severe cryptographic vulnerability leading to complete credential compromise.'
        }
      ],
      comparisons: [
        {
          title: 'Fast Hashing (SHA-256) vs Slow Password Hashing (BCrypt / Argon2)',
          conceptA: {
            name: 'Fast Hashes (SHA-256, SHA-512)',
            description: 'Designed for fast data integrity and file hashing.',
            characteristics: ['Billions of hashes per second on consumer GPUs', 'Zero resistance to brute-force attacks', 'Never use for user passwords']
          },
          conceptB: {
            name: 'Key Derivation Functions (BCrypt, Argon2id, PBKDF2)',
            description: 'Intentionally computationally slow and memory-intensive.',
            characteristics: ['Configurable work factor (cost parameter)', 'Automatically generates unique cryptographic salt', 'Takes ~200-500ms per verification, paralyzing brute-force attempts']
          },
          keyTakeaway: 'Always use BCrypt or Argon2 with adaptive work factors to store passwords securely.'
        }
      ],
      summaryPoints: [
        'Always validate input using allow-lists rather than deny-lists.',
        'Use Path.normalize() and startsWith() checks to eliminate Path Traversal attacks.',
        'Never return raw stack traces or internal exception details to client browsers.',
        'Always store passwords using adaptive, salted hashing functions like BCrypt or Argon2.'
      ],
      knowledgeCheck: [
        {
          id: 'q13-1',
          question: 'Why is standard SHA-256 completely unsuitable for hashing user passwords?',
          options: [
            'Because SHA-256 produces negative integers.',
            'Because SHA-256 is too fast: modern GPUs can test billions of combinations per second, making brute-force cracking trivial.',
            'Because SHA-256 requires internet access.',
            'Because SHA-256 was deprecated in Java 8.'
          ],
          correctIndex: 1,
          explanation: 'Password hashing requires computationally slow, memory-hard key derivation functions like BCrypt or Argon2 that throttle brute-force attacks.'
        }
      ],
      reviewQuestions: [
        'How does a timing attack compromise String equality checks for cryptographic secrets, and how does MessageDigest.isEqual() prevent it?',
        'What is an SBOM (Software Bill of Materials) and how does it help teams remediate zero-day vulnerabilities in third-party Java libraries like Log4j?'
      ]
    },
    {
      id: 's13-l2-authentication-tokens-and-dependencies',
      stageId: 13,
      title: 'API Authentication, JWT Security & Supply Chain Defense',
      slug: 'api-authentication-jwt-supply-chain-defense',
      subtitle: 'JSON Web Token (JWT) verification, constant-time comparison, and scanning for CVEs.',
      readTimeMinutes: 20,
      definition: 'A JSON Web Token (JWT) is an open industry standard (RFC 7519) for securely transmitting claims between parties as a digitally signed JSON object. Software supply chain security is the practice of auditing and securing all third-party dependencies and build pipelines against malicious tampering and known vulnerabilities.',
      simpleExplanation: 'When you log in to an app, the server gives your browser a signed digital passport (a JWT). Every time you request data, your browser shows this passport. The server verifies the signature using a secret cryptographic key without querying the database every time. Supply chain defense is like testing all the raw ingredients arriving at a restaurant kitchen to ensure no poisoned or spoiled supplies are mixed into the food.',
      whyItExists: 'Stateless REST APIs need to verify user identities across microservices without central session bottlenecks. In addition, modern enterprise Java applications rely on hundreds of open-source libraries from Maven Central, making dependency scanning essential.',
      howItWorks: `CRITICAL JWT & SUPPLY CHAIN ARCHITECTURE:

1. JWT STRUCTURE:
A JWT contains three Base64URL-encoded parts separated by dots:
- Header: Algorithm and token type (e.g., {"alg": "HS256", "typ": "JWT"}).
- Payload: Claims data (sub, username, roles, exp expiration timestamp).
- Signature: Cryptographic hash of (Header + "." + Payload) created with a secret key.

2. CRITICAL JWT VULNERABILITIES TO PREVENT:
- The "none" Algorithm Attack: Reject any token claiming "alg": "none".
- Missing Expiration (exp): Always enforce short-lived token lifetimes (15-60 minutes) combined with refresh tokens.
- Weak Secret Keys: HMAC-SHA256 secrets must have at least 256 bits of cryptographic entropy.

3. SUPPLY CHAIN VULNERABILITIES (CVEs):
The infamous Log4Shell (CVE-2021-44228) proved that a flaw in a single logging dependency can expose millions of servers to remote code execution. Modern CI/CD pipelines automate vulnerability scanning using tools like OWASP Dependency-Check and Snyk.`,
      syntax: '// Validating Token Signature & Expiration:\nClaims claims = Jwts.parserBuilder()\n    .setSigningKey(secretKey)\n    .build()\n    .parseClaimsJws(jwtString)\n    .getBody();\n\nDate expiration = claims.getExpiration();\nif (expiration.before(new Date())) throw new ExpiredTokenException();',
      codeExample: `import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;

public class CryptographicDefenseDemo {
    public static void main(String[] args) {
        String storedSecretHash = "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b";
        String candidateSecretHash = "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b";
        String tamperedHash = "99991e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b";

        // Constant-time cryptographic comparison (immune to side-channel timing attacks)
        boolean isMatch = MessageDigest.isEqual(
            storedSecretHash.getBytes(StandardCharsets.UTF_8),
            candidateSecretHash.getBytes(StandardCharsets.UTF_8)
        );

        boolean isTampered = MessageDigest.isEqual(
            storedSecretHash.getBytes(StandardCharsets.UTF_8),
            tamperedHash.getBytes(StandardCharsets.UTF_8)
        );

        System.out.println("Signature validation: " + (isMatch ? "AUTHENTIC" : "FORGERY"));
        System.out.println("Tampered signature validation: " + (isTampered ? "AUTHENTIC" : "FORGERY"));
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'MessageDigest.isEqual(...)', explanation: 'Performs a constant-time byte-by-byte comparison that executes in identical time regardless of where bytes differ.' },
        { tokenOrLine: 'Immunity to Timing Attacks', explanation: 'Standard String.equals() returns false immediately on the first differing character, allowing attackers to measure CPU response time in nanoseconds to guess keys letter-by-letter.' },
        { tokenOrLine: 'Validation Output', explanation: 'Safely rejects forged or tampered signatures while verifying authentic tokens.' }
      ],
      expectedOutput: `Signature validation: AUTHENTIC
Tampered signature validation: FORGERY`,
      commonMistakes: [
        {
          title: 'Using String.equals() to verify cryptographic signatures or API keys',
          wrongCode: `if (incomingToken.equals(expectedToken)) { // VULNERABLE TO TIMING ATTACK!
    grantAccess();
}`,
          correctCode: `if (MessageDigest.isEqual(incomingToken.getBytes(StandardCharsets.UTF_8), expectedToken.getBytes(StandardCharsets.UTF_8))) {
    grantAccess(); // Constant-time comparison
}`,
          whyWrong: 'Standard String.equals() fails fast on the first mismatched character. By measuring microsecond differences in server response latency, attackers can progressively deduce cryptographic secrets.',
          compilerOrRuntimeError: 'Cryptographic side-channel vulnerability.'
        }
      ],
      comparisons: [
        {
          title: 'Stateful Sessions vs Stateless JWTs',
          conceptA: {
            name: 'Stateful Sessions (JSESSIONID)',
            description: 'Server stores session state in memory (Redis/DB).',
            characteristics: ['Immediate revocation possible by deleting session from server', 'Requires shared session storage in distributed server clusters', 'Higher server memory consumption']
          },
          conceptB: {
            name: 'Stateless JWTs',
            description: 'Client stores signed claims; server validates signature.',
            characteristics: ['Zero server session storage required (scales horizontally effortlessly)', 'Harder to revoke before expiration timestamp', 'Requires short lifespans + refresh tokens']
          },
          keyTakeaway: 'Use stateless JWTs for distributed microservice architectures; combine with short expiry and revocation blacklists for high-security environments.'
        }
      ],
      summaryPoints: [
        'JWTs consist of Header, Payload, and Signature; always verify signature and expiration.',
        'Use constant-time comparison (MessageDigest.isEqual) when verifying secrets and hashes.',
        'Enforce short expiration lifetimes on access tokens.',
        'Integrate automated dependency scanning (OWASP Dependency-Check) into build pipelines to catch vulnerable libraries.'
      ],
      knowledgeCheck: [
        {
          id: 'q13-2',
          question: 'Why must cryptographic tokens be compared using MessageDigest.isEqual() instead of String.equals()?',
          options: [
            'Because String.equals() is limited to 16 characters.',
            'Because String.equals() aborts on the first mismatched byte, exposing execution time differences that allow attackers to deduce the secret (Timing Attack).',
            'Because MessageDigest.isEqual() automatically decrypts the token.',
            'Because String.equals() creates extra heap allocations.'
          ],
          correctIndex: 1,
          explanation: 'Standard String.equals() terminates early upon encountering the first non-matching character. Attackers can measure response timing to crack secrets. MessageDigest.isEqual() takes constant time.'
        }
      ],
      reviewQuestions: [
        'How does an attacker exploit the "alg": "none" vulnerability in flawed JWT libraries to forge arbitrary administrative privileges?',
        'Describe how OWASP Dependency-Check parses Maven pom.xml and Gradle build scripts to map dependencies to the National Vulnerability Database (NVD).'
      ]
    }
  ]
};
