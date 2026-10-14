import React from 'react';
import { Coffee, Search, BookOpen, Terminal, Layers, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  onOpenGlossary: () => void;
  onOpenPlayground: () => void;
  onOpenDiagrams: () => void;
  onOpenSearch: () => void;
  onOpenGitHubPublish: () => void;
  completedCount: number;
  totalLessons: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGlossary,
  onOpenPlayground,
  onOpenDiagrams,
  onOpenSearch,
  onOpenGitHubPublish,
  completedCount,
  totalLessons
}) => {
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/85 backdrop-blur-md text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              <span>Java Engineering Reference</span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                13 Stages · Zero-to-Advanced
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-sans hidden md:block">
              Definition-First Architectural Textbook
            </div>
          </div>
        </div>

        {/* Global Search Bar Trigger */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg text-xs text-slate-400 transition-colors shadow-inner"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search topics, definitions, opcodes...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 text-slate-400 border border-slate-800 rounded">
              /
            </kbd>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Glossary button */}
          <button
            onClick={onOpenGlossary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors"
            title="Open Terminology Glossary"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          {/* Memory Visualizer button */}
          <button
            onClick={onOpenDiagrams}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-lg transition-colors"
            title="View Architecture Diagrams"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Diagrams</span>
          </button>

          {/* Stepper Playground button */}
          <button
            onClick={onOpenPlayground}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 rounded-lg transition-colors"
            title="Open Interactive Memory Stepper"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">JVM Stepper</span>
          </button>

          {/* GitHub Publish Guide button */}
          <button
            onClick={onOpenGitHubPublish}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-white bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 rounded-lg transition-colors"
            title="Publish to GitHub Pages"
          >
            <span className="font-mono text-xs">🐙</span>
            <span className="hidden sm:inline">Publish</span>
          </button>

          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 leading-tight">Progress: {percent}%</span>
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
