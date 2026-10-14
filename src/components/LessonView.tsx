import React, { useState } from 'react';
import { Lesson, Stage } from '../types/curriculum';
import {
  BookOpen,
  Info,
  HelpCircle,
  Cpu,
  Terminal,
  AlertTriangle,
  Layers,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Play,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Share2,
  Sparkles
} from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  stage: Stage;
  onOpenGlossary: (termId?: string) => void;
  onOpenPlayground: () => void;
  onOpenDiagrams: (diagramType?: string) => void;
  isCompleted: boolean;
  onToggleComplete: () => void;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
  onNavigateLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  stage,
  onOpenGlossary,
  onOpenPlayground,
  onOpenDiagrams,
  isCompleted,
  onToggleComplete,
  prevLesson,
  nextLesson,
  onNavigateLesson
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  // Reset quiz state when lesson changes
  React.useEffect(() => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  }, [lesson.id]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lesson.codeExample);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optIndex
    }));
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-slate-100">
      {/* Stage & Breadcrumb Banner */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-amber-400 font-bold uppercase tracking-wider">
            Stage {stage.stageNumber}: {stage.title}
          </span>
          <span className="text-slate-600">/</span>
          <span>{lesson.title}</span>
          {lesson.versionRequirement && (
            <>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">
                {lesson.versionRequirement}
              </span>
            </>
          )}
          <span className="text-slate-600">·</span>
          <span>{lesson.readTimeMinutes} min read</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
          {lesson.title}
        </h1>

        <p className="text-base text-slate-300 font-sans leading-relaxed">
          {lesson.subtitle}
        </p>

        {/* Quick Tools Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={onToggleComplete}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          <button
            onClick={() => onOpenGlossary()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-lg transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Lookup Terms in Glossary</span>
          </button>

          <button
            onClick={onOpenPlayground}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-950/40 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-500/50 rounded-lg transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Run Code in JVM Stepper</span>
          </button>

          {lesson.diagramType && (
            <button
              onClick={() => onOpenDiagrams(lesson.diagramType)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-950/40 text-blue-300 hover:text-white border border-blue-500/30 rounded-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Inspect Architecture Diagram</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Formal Definition */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
          1. Formal Specification Definition
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border-l-4 border-amber-400 text-slate-200 shadow-md">
          <blockquote className="font-serif text-lg leading-relaxed italic text-white/95">
            "{lesson.definition}"
          </blockquote>
        </div>
      </section>

      {/* 2. Simple Intuitive Explanation */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span>
          2. Intuitive Mental Model
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed">
          {lesson.simpleExplanation}
        </div>
      </section>

      {/* 3. Why It Exists */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span>
          3. Rationale & Historical Problem Solved
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-slate-300 text-sm sm:text-base leading-relaxed">
          {lesson.whyItExists}
        </div>
      </section>

      {/* 4. Under The Hood Mechanics */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
          <Cpu className="w-4 h-4 text-blue-400" />
          4. How It Works (Compiler & JVM Execution Mechanics)
        </div>
        <div className="p-6 rounded-2xl bg-slate-950 border border-blue-500/20 text-slate-300 text-sm leading-relaxed whitespace-pre-line font-mono text-[13px] shadow-inner">
          {lesson.howItWorks}
        </div>
      </section>

      {/* 5. Syntax & Grammar */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-slate-500 inline-block"></span>
          5. Syntax & Grammar Specification
        </div>
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-amber-300/90 whitespace-pre overflow-x-auto shadow-inner">
          {lesson.syntax}
        </div>

        {lesson.syntaxTokens && lesson.syntaxTokens.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            {lesson.syntaxTokens.map((st, sIdx) => (
              <div key={sIdx} className="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-1">
                <div className="font-mono text-xs text-emerald-400 font-bold">{st.token}</div>
                <div className="text-xs text-slate-400 leading-snug">{st.meaning}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Clean Code Example */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
            <Terminal className="w-4 h-4 text-emerald-400" />
            6. Java Source Code Implementation
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800 rounded border border-slate-750 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="px-4 py-2 border-b border-slate-800 bg-slate-900/70 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Executable Example</span>
            <span className="text-[11px] text-amber-400 font-mono">Pristine Java (No inline comment clutter)</span>
          </div>
          <pre className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-200 overflow-x-auto">
            <code>{lesson.codeExample}</code>
          </pre>
        </div>
      </section>

      {/* 7. Code Explanation OUTSIDE Code */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
          <Info className="w-4 h-4 text-amber-400" />
          7. Code Breakdown & Semantic Token Analysis (Outside Code)
        </div>
        <p className="text-xs text-slate-400">
          In strict compliance with educational standards, explanations are dissected outside the code block:
        </p>
        <div className="space-y-2">
          {lesson.codeExplanationOutsideCode.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="font-mono text-xs text-amber-300 font-bold bg-slate-950 px-2 py-1 rounded border border-slate-800 shrink-0">
                {item.tokenOrLine}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.explanation}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Expected Output */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
          <Terminal className="w-4 h-4 text-slate-400" />
          8. Expected Terminal Output (stdout / stderr)
        </div>
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-400 whitespace-pre overflow-x-auto shadow-inner">
          {lesson.expectedOutput}
        </div>
      </section>

      {/* 9. Common Mistakes */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            9. Common Pitfalls, Anti-Patterns & Compiler Diagnostics
          </div>
          <div className="space-y-4">
            {lesson.commonMistakes.map((mistake, mIdx) => (
              <div key={mIdx} className="p-5 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-3">
                <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{mistake.title}</span>
                </h4>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950 border border-rose-500/30 rounded-xl space-y-1">
                    <span className="text-[10px] text-rose-400 font-bold uppercase">Incorrect Pattern</span>
                    <pre className="text-rose-200/90 whitespace-pre overflow-x-auto">{mistake.wrongCode}</pre>
                  </div>
                  <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-1">
                    <span className="text-[10px] text-emerald-400 font-bold uppercase">Correct Architecture</span>
                    <pre className="text-emerald-200/90 whitespace-pre overflow-x-auto">{mistake.correctCode}</pre>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {mistake.whyWrong}
                </p>

                {mistake.compilerOrRuntimeError && (
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-amber-300/90">
                    <span className="text-slate-500 font-bold uppercase text-[10px] mr-2">Diagnostic Output:</span>
                    {mistake.compilerOrRuntimeError}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Concept Comparison Matrix */}
      {lesson.comparisons && lesson.comparisons.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
            <Layers className="w-4 h-4 text-slate-400" />
            10. Comparison Matrix with Related Concepts
          </div>
          <div className="space-y-4">
            {lesson.comparisons.map((comp, cIdx) => (
              <div key={cIdx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white font-serif">{comp.title}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-amber-300 font-mono">{comp.conceptA.name}</div>
                    <p className="text-xs text-slate-400">{comp.conceptA.description}</p>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside pt-1">
                      {comp.conceptA.characteristics.map((char, chIdx) => (
                        <li key={chIdx}>{char}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-blue-300 font-mono">{comp.conceptB.name}</div>
                    <p className="text-xs text-slate-400">{comp.conceptB.description}</p>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside pt-1">
                      {comp.conceptB.characteristics.map((char, chIdx) => (
                        <li key={chIdx}>{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                  <strong className="text-amber-400">Architectural Takeaway: </strong>
                  {comp.keyTakeaway}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11. Lesson Summary Points */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
          <CheckCircle2 className="w-4 h-4 text-amber-400" />
          11. Key Technical Takeaways
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          {lesson.summaryPoints.map((point, pIdx) => (
            <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
              <span className="text-amber-400 font-bold mt-0.5">•</span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Interactive Knowledge Check (Quiz) */}
      {lesson.knowledgeCheck && lesson.knowledgeCheck.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              12. Interactive Knowledge Check
            </div>
            {submittedQuiz && (
              <span className="text-xs font-mono text-slate-400">
                Evaluation Complete
              </span>
            )}
          </div>

          <div className="space-y-6">
            {lesson.knowledgeCheck.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[q.id];
              const isCorrect = selectedOpt === q.correctIndex;

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-semibold text-white">
                    Question {qIdx + 1}: {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = selectedOpt === oIdx;
                      let optionClasses = 'p-3 rounded-xl border text-xs text-left w-full transition-colors flex items-start gap-3 ';

                      if (submittedQuiz) {
                        if (oIdx === q.correctIndex) {
                          optionClasses += 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                        } else if (isChosen) {
                          optionClasses += 'bg-rose-950/40 border-rose-500 text-rose-200';
                        } else {
                          optionClasses += 'bg-slate-950 border-slate-800 text-slate-500 opacity-60';
                        }
                      } else {
                        if (isChosen) {
                          optionClasses += 'bg-amber-500/20 border-amber-400 text-amber-200';
                        } else {
                          optionClasses += 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-850';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectAnswer(q.id, oIdx)}
                          disabled={submittedQuiz}
                          className={optionClasses}
                        >
                          <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {submittedQuiz && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                    }`}>
                      <strong className="block mb-1 font-mono">
                        {isCorrect ? 'CORRECT' : 'INCORRECT'}
                      </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!submittedQuiz ? (
              <button
                onClick={() => setSubmittedQuiz(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-md"
              >
                Submit Answers for Immediate Evaluation
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setSubmittedQuiz(false);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Reset Quiz & Re-test
              </button>
            )}
          </div>
        </section>
      )}

      {/* 13. End-of-Topic Review Questions */}
      {lesson.reviewQuestions && lesson.reviewQuestions.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
            <BookOpen className="w-4 h-4 text-blue-400" />
            13. Architectural Self-Review & Defense Exercises
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <p className="text-xs text-slate-400">
              Test your deep understanding. Explain these architectural concepts without checking reference notes:
            </p>
            <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal list-inside leading-relaxed">
              {lesson.reviewQuestions.map((q, idx) => (
                <li key={idx} className="pl-1">
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Bottom Navigation */}
      <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => onNavigateLesson(prevLesson.id)}
            className="w-full sm:w-auto flex items-center gap-2 p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
            <div>
              <div className="text-[10px] text-slate-500 font-mono">PREVIOUS LESSON</div>
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                {prevLesson.title}
              </div>
            </div>
          </button>
        ) : <div />}

        {nextLesson ? (
          <button
            onClick={() => onNavigateLesson(nextLesson.id)}
            className="w-full sm:w-auto flex items-center justify-end gap-2 p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-right transition-colors group"
          >
            <div>
              <div className="text-[10px] text-slate-500 font-mono">NEXT LESSON</div>
              <div className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                {nextLesson.title}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
          </button>
        ) : <div />}
      </div>
    </article>
  );
};
