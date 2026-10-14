import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { searchCurriculum } from '../data/curriculum';
import { Lesson } from '../types/curriculum';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (lessonId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const results = searchCurriculum(query);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-950">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            placeholder="Search all lessons, definitions, bytecode opcodes, topics..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent py-4 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-slate-400 hover:text-white bg-slate-800/80 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-800/60 p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              Type keywords like <span className="text-amber-400 font-mono">"pass by value"</span>, <span className="text-amber-400 font-mono">"virtual threads"</span>, or <span className="text-amber-400 font-mono">"preparedstatement"</span> to search the full textbook.
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching lessons found for "{query}".
            </div>
          ) : (
            results.map(({ lesson, matchedField }) => (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  onClose();
                }}
                className="w-full text-left p-3.5 hover:bg-slate-800/60 rounded-xl transition-colors flex items-start justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Stage {lesson.stageId}
                    </span>
                    <span className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                      {lesson.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {lesson.definition}
                  </p>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Matched in: {matchedField}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors shrink-0 mt-2" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
