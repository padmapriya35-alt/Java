import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GlossaryTerm } from '../types/curriculum';
import { Search, X, BookOpen, Tag, ArrowRight, Copy, Check } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTermId?: string | null;
  onSelectTerm?: (termId: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  initialTermId,
  onSelectTerm
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTermId, setActiveTermId] = useState<string>(initialTermId || GLOSSARY_TERMS[0].id);
  const [copied, setCopied] = useState(false);

  // Sync if initialTermId changes
  React.useEffect(() => {
    if (initialTermId) {
      setActiveTermId(initialTermId);
    }
  }, [initialTermId]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(GLOSSARY_TERMS.map(t => t.category)));
    return ['All', ...cats];
  }, []);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(term => {
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        term.term.toLowerCase().includes(q) ||
        term.shortDefinition.toLowerCase().includes(q) ||
        term.formalDefinition.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const activeTerm = useMemo(() => {
    return GLOSSARY_TERMS.find(t => t.id === activeTermId) || filteredTerms[0] || GLOSSARY_TERMS[0];
  }, [activeTermId, filteredTerms]);

  const copyDefinition = () => {
    if (!activeTerm) return;
    navigator.clipboard.writeText(`${activeTerm.term}: ${activeTerm.formalDefinition}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[85vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="glossary-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 id="glossary-title" className="text-lg font-semibold tracking-tight text-white">
                Java Terminology & Concept Glossary
              </h2>
              <p className="text-xs text-slate-400">
                Authoritative definitions, computer science taxonomy, and semantic rules
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close glossary modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="px-6 py-3 border-b border-slate-800/80 bg-slate-900 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Bytecode, Generics)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Term List Sidebar */}
          <div className="w-1/3 min-w-[240px] max-w-[320px] border-r border-slate-800 overflow-y-auto divide-y divide-slate-800/50">
            {filteredTerms.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm">
                No terms found matching "{searchQuery}"
              </div>
            ) : (
              filteredTerms.map(term => {
                const isActive = term.id === activeTerm?.id;
                return (
                  <button
                    key={term.id}
                    onClick={() => {
                      setActiveTermId(term.id);
                      if (onSelectTerm) onSelectTerm(term.id);
                    }}
                    className={`w-full text-left p-4 transition-colors ${
                      isActive
                        ? 'bg-amber-500/10 border-l-4 border-amber-500 pl-3'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-semibold ${isActive ? 'text-amber-400' : 'text-slate-200'}`}>
                        {term.term}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {term.shortDefinition}
                    </div>
                    <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {term.category}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Detailed Term Inspector */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6 bg-slate-950/40">
            {activeTerm && (
              <>
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                      <span>Category: {activeTerm.category}</span>
                      {activeTerm.etymologyOrOrigin && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-400 font-sans italic">{activeTerm.etymologyOrOrigin}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                      {activeTerm.term}
                    </h3>
                  </div>
                  <button
                    onClick={copyDefinition}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
                    title="Copy definition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Plain-English Overview */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Plain-English Concept
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeTerm.shortDefinition}
                  </p>
                </div>

                {/* Rigorous Formal Definition */}
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-400/90 mb-2 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5" />
                    Formal Computer Science & Java Specification Definition
                  </div>
                  <blockquote className="p-4 rounded-xl bg-slate-900/80 border-l-4 border-amber-500 text-sm text-slate-200 leading-relaxed italic">
                    "{activeTerm.formalDefinition}"
                  </blockquote>
                </div>

                {/* Syntax Example */}
                {activeTerm.syntaxExample && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Canonical Syntax Representation
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
                      <code>{activeTerm.syntaxExample}</code>
                    </div>
                  </div>
                )}

                {/* Related Terms */}
                {activeTerm.relatedTerms && activeTerm.relatedTerms.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Connected Terminology
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeTerm.relatedTerms.map(relId => {
                        const targetTerm = GLOSSARY_TERMS.find(t => t.id === relId);
                        if (!targetTerm) return null;
                        return (
                          <button
                            key={relId}
                            onClick={() => setActiveTermId(relId)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
                          >
                            <span>{targetTerm.term}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
