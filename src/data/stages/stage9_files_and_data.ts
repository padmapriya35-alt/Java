import { Stage } from '../../types/curriculum';

export const stage9: Stage = {
  id: 9,
  stageNumber: 9,
  title: 'Files & Data Processing',
  tagline: 'Modern NIO.2 file paths, serialization concepts, java.time calendar architecture, and regular expressions.',
  description: 'Master data persistence, file input/output, serialization security, timezone-safe date-time arithmetic with java.time, and high-performance pattern parsing using Java regex.',
  iconName: 'FileText',
  lessons: [
    {
      id: 's9-l1-nio-files-and-paths',
      stageId: 9,
      title: 'File I/O with Java NIO.2 (Files & Path)',
      slug: 'file-io-java-nio-files-path',
      subtitle: 'Path abstraction, reading and writing UTF-8 text, buffered streams, and file attributes.',
      readTimeMinutes: 16,
      definition: 'Java NIO.2 (introduced in Java 7 under java.nio.file) is a modern, non-blocking I/O file system API centering on the Path interface and the Files utility class for performant, platform-independent file manipulation.',
      simpleExplanation: 'The old `java.io.File` class from 1996 was clumsy: deleting files returned false instead of telling you why it failed, and reading a file required chaining three separate stream classes together. NIO.2 gives you simple, powerful tools: `Path` handles file paths cleanly on Windows, Mac, and Linux, and `Files.readString(path)` reads an entire text file in one line.',
      whyItExists: 'Modern operating systems have complex file system attributes (symbolic links, POSIX permissions, atomic operations). NIO.2 provides true platform fidelity, robust exception reporting, and stream-based reading for giant files.',
      howItWorks: '`Path.of("data", "config.json")` builds a system-specific path using the host OS separator (\\ on Windows, / on Unix). `Files.writeString` uses an underlying channel to write raw bytes using standard UTF-8 charset. For large files, `Files.lines(path)` produces a lazy Java Stream, reading line-by-line without loading the whole file into heap RAM.',
      syntax: '// Path creation:\nPath path = Path.of("logs", "app.log");\n\n// Write string to file:\nFiles.writeString(path, content, StandardOpenOption.CREATE, StandardOpenOption.APPEND);\n\n// Read entire file:\nString content = Files.readString(path);\n\n// Stream lines lazily:\ntry (Stream<String> lines = Files.lines(path)) { ... }',
      codeExample: `import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.io.IOException;

public class ModernFileOperations {
    public static void main(String[] args) {
        Path tempPath = Paths.get("system_audit.log");

        try {
            // Write formatted text to file
            String logEntry = "TIMESTAMP: 2026-10-14T10:00:00Z | STATUS: OK | SERVICE: AUTH\\n";
            Files.writeString(tempPath, logEntry, StandardOpenOption.CREATE, StandardOpenOption.WRITE);

            // Read text back
            String readBack = Files.readString(tempPath);
            System.out.println("File exists: " + Files.exists(tempPath));
            System.out.println("File size in bytes: " + Files.size(tempPath));
            System.out.println("Read Content:\\n" + readBack.trim());

            // Clean up temporary demonstration file
            Files.deleteIfExists(tempPath);
            System.out.println("Cleanup completed: File deleted.");
        } catch (IOException e) {
            System.err.println("File I/O failed: " + e.getMessage());
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'Paths.get("system_audit.log")', explanation: 'Creates a Path instance representing the file location in the current working directory.' },
        { tokenOrLine: 'Files.writeString(...)', explanation: 'Writes the String encoded as UTF-8 bytes to the specified path.' },
        { tokenOrLine: 'StandardOpenOption.CREATE', explanation: 'Specifies that the file should be created if it does not yet exist.' },
        { tokenOrLine: 'Files.deleteIfExists(tempPath)', explanation: 'Safely deletes the file, returning true if deleted or false if the file was not found.' }
      ],
      expectedOutput: `File exists: true
File size in bytes: 57
Read Content:
TIMESTAMP: 2026-10-14T10:00:00Z | STATUS: OK | SERVICE: AUTH
Cleanup completed: File deleted.`,
      commonMistakes: [
        {
          title: 'Hardcoding path separators like \\ or / in strings',
          wrongCode: `Path p = Path.of("C:\\\\data\\\\files\\\\info.txt"); // Breaks on Linux/Docker!`,
          correctCode: `Path p = Path.of("data", "files", "info.txt"); // Cross-platform compatible`,
          whyWrong: 'Hardcoded backslashes break immediately when running in Docker Linux containers or macOS.',
          compilerOrRuntimeError: 'FileNotFoundException or NoSuchFileException on cross-platform deployment.'
        }
      ],
      comparisons: [
        {
          title: 'Files.readString() vs Files.lines()',
          conceptA: {
            name: 'Files.readString()',
            description: 'Loads the entire file into memory as a single String.',
            characteristics: ['Extremely convenient for small files (< 10MB)', 'Eagerly allocates memory for the entire content', 'Throws OutOfMemoryError on multi-gigabyte files']
          },
          conceptB: {
            name: 'Files.lines()',
            description: 'Returns a lazy Stream<String> reading line-by-line.',
            characteristics: ['Safe for 100GB files (constant memory footprint)', 'Must be closed in a try-with-resources statement', 'Can be filtered and processed functionally']
          },
          keyTakeaway: 'Use readString() for small configs and templates; use lines() for massive datasets and log files.'
        }
      ],
      summaryPoints: [
        'Always use java.nio.file.Path and java.nio.file.Files rather than legacy java.io.File.',
        'Path.of(...) builds cross-platform paths without hardcoded slashes.',
        'Files.lines() allows processing multi-gigabyte files without running out of RAM.',
        'File operations throw checked IOException and must be handled.'
      ],
      knowledgeCheck: [
        {
          id: 'q9-1',
          question: 'Why should you use Files.lines(path) instead of Files.readString(path) when analyzing a 50GB log file?',
          options: [
            'Because Files.readString() only works on Windows.',
            'Because Files.lines() processes lines lazily as a stream, keeping memory usage minimal instead of exhausting RAM.',
            'Because Files.readString() automatically encrypts text.',
            'Because Files.lines() is single-threaded.'
          ],
          correctIndex: 1,
          explanation: 'Files.lines() streams lines lazily from disk. Files.readString() attempts to load all 50GB into a single heap String, causing an instant OutOfMemoryError.'
        }
      ],
      reviewQuestions: [
        'Why must the Stream returned by Files.lines() be enclosed in a try-with-resources block?',
        'How does Java serialization differ from JSON serialization, and why is Java native serialization considered risky today?'
      ]
    },
    {
      id: 's9-l2-dates-times-and-regex',
      stageId: 9,
      title: 'Modern Dates (java.time) & Regular Expressions',
      slug: 'dates-times-java-time-and-regex',
      subtitle: 'Immutable date-time arithmetic (ISO-8601), Instant, Duration, Pattern, and Matcher.',
      readTimeMinutes: 18,
      versionRequirement: 'Java 8+',
      definition: 'The java.time package (JSR-310) provides an immutable, thread-safe date and time model based on the ISO-8601 calendar system. Regular expressions in Java are implemented via the Pattern and Matcher classes to perform pattern recognition and token extraction.',
      simpleExplanation: 'Old Java dates (`java.util.Date` and `Calendar`) were notorious: months were zero-indexed (January was 0), years started at 1900, and they were mutable and thread-unsafe. Modern `java.time` fixed everything: `LocalDate` represents a date (2026-10-14), `Instant` represents a precise timestamp in UTC, and all objects are completely immutable and safe. Regular expressions act like a search filter for text patterns (like emails or phone numbers).',
      whyItExists: 'Financial calculations, flight scheduling, internationalization, and distributed database transactions require timezone-accurate, thread-safe time arithmetic.',
      howItWorks: 'All `java.time` types are value-based and immutable. Calling `.plusDays(1)` returns a new instance, leaving the original intact. For regex, `Pattern.compile(regex)` precompiles regular expression syntax into an internal deterministic finite automaton (DFA). `pattern.matcher(input)` then iterates over tokens.',
      syntax: '// java.time Examples:\nLocalDate today = LocalDate.now();\nInstant timestamp = Instant.now();\nDuration elapsed = Duration.between(start, end);\n\n// Regex Examples:\nPattern pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);\nMatcher matcher = pattern.matcher(emailString);\nboolean isValid = matcher.matches();',
      codeExample: `import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class TimeAndPatternShowcase {
    public static void main(String[] args) {
        // Modern Date Arithmetic (java.time)
        LocalDate releaseDate = LocalDate.of(1995, 5, 23); // Java first public announcement
        LocalDate currentDate = LocalDate.of(2026, 10, 14);

        Period ageOfJava = Period.between(releaseDate, currentDate);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");

        System.out.println("Java Inception: " + releaseDate.format(formatter));
        System.out.println("Age of Java: " + ageOfJava.getYears() + " years and " + ageOfJava.getMonths() + " months.");

        // Regular Expressions (Regex)
        String logData = "Error code: [ERR_404] occurred on server [srv-node-09]";
        Pattern codePattern = Pattern.compile("\\\\[([A-Z0-9_-]+)\\\\]");
        Matcher matcher = codePattern.matcher(logData);

        System.out.println("Matched Tokens:");
        while (matcher.find()) {
            System.out.println(" - Found bracketed token: " + matcher.group(1));
        }
    }
}`,
      codeExplanationOutsideCode: [
        { tokenOrLine: 'LocalDate.of(1995, 5, 23);', explanation: 'Creates an immutable date. Notice that May is month 5 (1-based, intuitive), not month 4 as in legacy Date.' },
        { tokenOrLine: 'Period.between(releaseDate, currentDate);', explanation: 'Computes date-based time delta in years, months, and days.' },
        { tokenOrLine: 'Pattern.compile("\\\\[([A-Z0-9_-]+)\\\\]");', explanation: 'Compiles regex matching text enclosed in brackets: \\[ and \\], capturing the inner identifier in Group 1.' },
        { tokenOrLine: 'while (matcher.find())', explanation: 'Scans the text sequentially, returning true for every subsequent regex pattern match.' }
      ],
      expectedOutput: `Java Inception: May 23, 1995
Age of Java: 31 years and 4 months.
Matched Tokens:
 - Found bracketed token: ERR_404
 - Found bracketed token: srv-node-09`,
      commonMistakes: [
        {
          title: 'Recompiling Pattern inside a tight loop',
          wrongCode: `for (String line : lines) {
    if (Pattern.matches("^[0-9]+$", line)) { ... } // Recompiles regex EVERY iteration!
}`,
          correctCode: `// Compile ONCE as static final constant:
private static final Pattern NUMERIC_PATTERN = Pattern.compile("^[0-9]+$");

for (String line : lines) {
    if (NUMERIC_PATTERN.matcher(line).matches()) { ... }
}`,
          whyWrong: 'Pattern compilation involves building syntax trees and state machines. Compiling regex repeatedly inside loops ruins CPU performance.',
          compilerOrRuntimeError: 'Severe performance degradation in high-throughput loops.'
        }
      ],
      comparisons: [
        {
          title: 'Legacy Date / Calendar vs java.time (JSR-310)',
          conceptA: {
            name: 'Legacy Date / Calendar',
            description: 'Older pre-Java 8 date classes.',
            characteristics: ['Mutable (unsafe across threads)', 'Zero-indexed months (January is 0)', 'Conflated date, time, and timezone into one confusing object']
          },
          conceptB: {
            name: 'java.time (LocalDate, Instant)',
            description: 'Modern ISO-8601 standard date/time engine.',
            characteristics: ['Immutable and 100% thread-safe', 'One-indexed months (January is 1)', 'Separates human calendar time (LocalDate) from machine time (Instant)']
          },
          keyTakeaway: 'Never use java.util.Date or Calendar in new Java code; always use java.time.'
        }
      ],
      summaryPoints: [
        'The java.time package provides immutable, thread-safe date and time abstractions.',
        'Use LocalDate for calendar dates, Instant for UTC epoch machine timestamps, and Duration/Period for intervals.',
        'Always compile Pattern once as a static constant to avoid CPU re-compilation waste.',
        'Matcher provides methods like .find(), .matches(), and .group() for extracting pattern tokens.'
      ],
      knowledgeCheck: [
        {
          id: 'q9-2',
          question: 'Why are all classes in the java.time package immutable?',
          options: [
            'To prevent developers from changing dates.',
            'To make them completely thread-safe without requiring manual synchronization or locks.',
            'Because dates are stored in the String Constant Pool.',
            'To save disk space.'
          ],
          correctIndex: 1,
          explanation: 'Immutability guarantees thread safety. Instances of LocalDate or Instant can be shared across multiple concurrent threads without fear of corruption.'
        }
      ],
      reviewQuestions: [
        'What is the difference between Duration (machine-based time) and Period (human calendar-based time) in java.time?',
        'How does catastrophic backtracking occur in poorly designed regular expressions, and how can possessive quantifiers prevent it?'
      ]
    }
  ]
};
