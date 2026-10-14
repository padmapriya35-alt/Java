export interface GlossaryTerm {
  id: string;
  term: string;
  shortDefinition: string;
  formalDefinition: string;
  category: 'Environment' | 'Core' | 'OOP' | 'Memory' | 'Collections' | 'Concurrency' | 'Modern' | 'Backend' | 'Security';
  relatedTerms?: string[];
  syntaxExample?: string;
  etymologyOrOrigin?: string;
}

export interface CodeExplanationItem {
  tokenOrLine: string;
  explanation: string;
}

export interface CommonMistake {
  title: string;
  wrongCode: string;
  correctCode: string;
  whyWrong: string;
  compilerOrRuntimeError?: string;
}

export interface ConceptComparison {
  title: string;
  conceptA: {
    name: string;
    description: string;
    characteristics: string[];
  };
  conceptB: {
    name: string;
    description: string;
    characteristics: string[];
  };
  keyTakeaway: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  stageId: number;
  title: string;
  slug: string;
  subtitle: string;
  readTimeMinutes: number;
  
  // Lesson Standard Requirements
  definition: string;
  simpleExplanation: string;
  whyItExists: string;
  howItWorks: string;
  syntax: string;
  syntaxTokens?: { token: string; meaning: string }[];
  
  codeExample: string;
  codeExplanationOutsideCode: CodeExplanationItem[];
  expectedOutput: string;
  
  commonMistakes: CommonMistake[];
  comparisons: ConceptComparison[];
  summaryPoints: string[];
  
  knowledgeCheck: QuizQuestion[];
  reviewQuestions: string[];
  
  versionRequirement?: string; // e.g. "Java 17+", "Java 21+"
  diagramType?: 'compilation' | 'memory' | 'oop_hierarchy' | 'exception_hierarchy' | 'collections_tree' | 'thread_lifecycle';
}

export interface Stage {
  id: number;
  stageNumber: number;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  lessons: Lesson[];
}

export interface UserProgress {
  completedLessons: string[]; // lesson ids
  bookmarkedLessons: string[];
  quizScores: Record<string, number>; // lessonId -> percentage
}
