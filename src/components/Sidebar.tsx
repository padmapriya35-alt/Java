import React, { useState } from 'react';
import { ALL_STAGES } from '../data/curriculum';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';

interface SidebarProps {
  currentLessonId: string;
  onSelectLesson: (lessonId: string) => void;
  completedLessons: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonId,
  onSelectLesson,
  completedLessons
}) => {
  // Determine which stage should be expanded by default based on currentLessonId
  const activeStage = ALL_STAGES.find(s => s.lessons.some(l => l.id === currentLessonId));
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    ALL_STAGES.forEach(s => {
      initial[s.id] = activeStage ? s.id === activeStage.id : s.id === 1;
    });
    return initial;
  });

  const toggleStage = (stageId: number) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 border-r border-slate-800 bg-slate-950/90 overflow-y-auto max-h-[calc(100vh-4rem)] p-4 space-y-3 text-slate-200">
      <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800/80">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
          Java Roadmap Stages
        </span>
        <span className="text-[11px] font-mono text-amber-400">
          13 Stages Total
        </span>
      </div>

      <div className="space-y-1.5">
        {ALL_STAGES.map(stage => {
          const isExpanded = !!expandedStages[stage.id];
          const stageCompletedCount = stage.lessons.filter(l => completedLessons.includes(l.id)).length;
          const isAllCompleted = stageCompletedCount === stage.lessons.length;
          const hasActiveLesson = stage.lessons.some(l => l.id === currentLessonId);

          return (
            <div
              key={stage.id}
              className={`rounded-xl border transition-all ${
                hasActiveLesson
                  ? 'border-amber-500/30 bg-slate-900/60'
                  : 'border-slate-800/60 bg-slate-900/20'
              }`}
            >
              {/* Stage Header Button */}
              <button
                onClick={() => toggleStage(stage.id)}
                className="w-full p-3 flex items-start justify-between text-left group hover:bg-slate-800/30 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 text-slate-500 group-hover:text-amber-400 transition-colors">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-amber-400">
                        STAGE {stage.stageNumber}
                      </span>
                      {isAllCompleted && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                      {stage.title}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {stage.tagline}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-500 shrink-0 mt-0.5">
                  {stageCompletedCount}/{stage.lessons.length}
                </span>
              </button>

              {/* Sub-lessons */}
              {isExpanded && (
                <div className="pl-6 pr-2 pb-2 space-y-1 border-t border-slate-800/40 pt-1.5">
                  {stage.lessons.map(lesson => {
                    const isSelected = lesson.id === currentLessonId;
                    const isCompleted = completedLessons.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                          isSelected
                            ? 'bg-amber-500/20 text-amber-300 font-semibold border-l-2 border-amber-400 pl-2'
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Circle className="w-3 h-3 text-slate-600 shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono shrink-0">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.readTimeMinutes}m</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
