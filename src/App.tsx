import React, { useState, useEffect } from 'react';
import { ALL_STAGES, getLessonById, getStageByLessonId, getAdjacentLessons, getAllLessons } from './data/curriculum';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { GlossaryModal } from './components/GlossaryModal';
import { InteractiveCodePlayground } from './components/InteractiveCodePlayground';
import { ArchitectureDiagrams } from './components/ArchitectureDiagrams';
import { SearchModal } from './components/SearchModal';
import { GitHubPublishModal } from './components/GitHubPublishModal';
import { BookOpen, Layers, Terminal, Sparkles, Coffee } from 'lucide-react';

export default function App() {
  const allLessons = getAllLessons();
  const [currentLessonId, setCurrentLessonId] = useState<string>(() => {
    return localStorage.getItem('java_kb_last_lesson') || allLessons[0].id;
  });

  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('java_kb_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal visibility states
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [isDiagramsOpen, setIsDiagramsOpen] = useState(false);
  const [diagramInitialType, setDiagramInitialType] = useState<any>('memory');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  // Active view: 'lesson' | 'diagrams'
  const [activeMainView, setActiveMainView] = useState<'lesson' | 'diagrams'>('lesson');

  // Sync last lesson to localStorage
  useEffect(() => {
    localStorage.setItem('java_kb_last_lesson', currentLessonId);
  }, [currentLessonId]);

  // Sync completed lessons to localStorage
  useEffect(() => {
    localStorage.setItem('java_kb_completed', JSON.stringify(completedLessons));
  }, [completedLessons]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentLesson = getLessonById(currentLessonId) || allLessons[0];
  const currentStage = getStageByLessonId(currentLesson.id) || ALL_STAGES[0];
  const { prev, next } = getAdjacentLessons(currentLesson.id);

  const toggleCompleteLesson = () => {
    setCompletedLessons(prev => {
      if (prev.includes(currentLesson.id)) {
        return prev.filter(id => id !== currentLesson.id);
      } else {
        return [...prev, currentLesson.id];
      }
    });
  };

  const openGlossaryWithTerm = (termId?: string) => {
    if (termId) setGlossaryTermId(termId);
    setIsGlossaryOpen(true);
  };

  const openDiagramsView = (diagramType?: string) => {
    if (diagramType) setDiagramInitialType(diagramType);
    setActiveMainView('diagrams');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Global Navigation Header */}
      <Navbar
        onOpenGlossary={() => openGlossaryWithTerm()}
        onOpenPlayground={() => setIsPlaygroundOpen(true)}
        onOpenDiagrams={() => openDiagramsView()}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGitHubPublish={() => setIsGitHubModalOpen(true)}
        completedCount={completedLessons.length}
        totalLessons={allLessons.length}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        {/* Left Stage & Lesson Navigation Sidebar */}
        <Sidebar
          currentLessonId={currentLessonId}
          onSelectLesson={(lessonId) => {
            setCurrentLessonId(lessonId);
            setActiveMainView('lesson');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          completedLessons={completedLessons}
        />

        {/* Center Main Reading Canvas */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem)] bg-slate-950 pb-16">
          {activeMainView === 'diagrams' ? (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
                    Java Architectural Blueprint Explorer
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Visual schematics of JVM compilation, runtime memory, exception inheritance, collections hierarchy, and thread states
                  </p>
                </div>
                <button
                  onClick={() => setActiveMainView('lesson')}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors"
                >
                  Return to Lesson
                </button>
              </div>

              <ArchitectureDiagrams initialDiagram={diagramInitialType} />
            </div>
          ) : (
            <LessonView
              lesson={currentLesson}
              stage={currentStage}
              onOpenGlossary={openGlossaryWithTerm}
              onOpenPlayground={() => setIsPlaygroundOpen(true)}
              onOpenDiagrams={openDiagramsView}
              isCompleted={completedLessons.includes(currentLesson.id)}
              onToggleComplete={toggleCompleteLesson}
              prevLesson={prev}
              nextLesson={next}
              onNavigateLesson={(id) => {
                setCurrentLessonId(id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialTermId={glossaryTermId}
      />

      <InteractiveCodePlayground
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLesson={(lessonId) => {
          setCurrentLessonId(lessonId);
          setActiveMainView('lesson');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <GitHubPublishModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}
