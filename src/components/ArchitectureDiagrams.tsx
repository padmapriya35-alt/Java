import React, { useState } from 'react';
import { Cpu, Layers, AlertTriangle, Database, RefreshCw, ArrowRight } from 'lucide-react';

interface DiagramViewerProps {
  initialDiagram?: 'compilation' | 'memory' | 'exception_hierarchy' | 'collections_tree' | 'thread_lifecycle';
}

export const ArchitectureDiagrams: React.FC<DiagramViewerProps> = ({ initialDiagram = 'memory' }) => {
  const [activeTab, setActiveTab] = useState<'compilation' | 'memory' | 'exception_hierarchy' | 'collections_tree' | 'thread_lifecycle'>(initialDiagram);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 overflow-x-auto scrollbar-none px-4 pt-2 gap-2">
        <button
          onClick={() => setActiveTab('compilation')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'compilation'
              ? 'border-amber-400 text-amber-300 bg-slate-900/50 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Compilation & JVM Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('memory')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'memory'
              ? 'border-amber-400 text-amber-300 bg-slate-900/50 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>JVM Memory: Stack vs Heap vs Metaspace</span>
        </button>

        <button
          onClick={() => setActiveTab('exception_hierarchy')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'exception_hierarchy'
              ? 'border-amber-400 text-amber-300 bg-slate-900/50 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Throwable Hierarchy</span>
        </button>

        <button
          onClick={() => setActiveTab('collections_tree')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'collections_tree'
              ? 'border-amber-400 text-amber-300 bg-slate-900/50 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Collections Framework Tree</span>
        </button>

        <button
          onClick={() => setActiveTab('thread_lifecycle')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'thread_lifecycle'
              ? 'border-amber-400 text-amber-300 bg-slate-900/50 rounded-t-lg'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Thread Lifecycle States</span>
        </button>
      </div>

      {/* Diagram Canvas */}
      <div className="p-6 lg:p-8 bg-slate-950/40">
        {activeTab === 'compilation' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
                Source to Native Execution Architecture
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                How Java achieves hardware independence via the intermediate bytecode specification
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Step 1 */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">STAGE 1</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Source Code</span>
                </div>
                <div className="font-mono text-sm font-bold text-white">App.java</div>
                <p className="text-xs text-slate-400">Human-readable instructions. Contains class declarations, types, and logic.</p>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex justify-center text-amber-400">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-mono mb-1 text-slate-400">javac compiler</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-bold">STAGE 2</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Bytecode</span>
                </div>
                <div className="font-mono text-sm font-bold text-white">App.class</div>
                <p className="text-xs text-slate-400">1-byte instruction opcodes (iload, invokevirtual). Platform-independent.</p>
              </div>

              {/* Step 3 */}
              <div className="p-4 bg-slate-900 border border-blue-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-blue-400 font-bold">STAGE 3</span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">JVM Runtime</span>
                </div>
                <div className="font-mono text-sm font-bold text-white">Interpreter + JIT (C1/C2)</div>
                <p className="text-xs text-slate-400">Interpreter starts immediately; JIT compiles hot methods into native CPU machine code.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
                Runtime Data Areas: Stack vs Heap vs Metaspace
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Visualizing thread-private call frames and shared heap object allocations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Stack */}
              <div className="p-5 bg-slate-900 border border-emerald-500/30 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">JVM STACK (Thread-Private)</span>
                  <span className="text-[10px] text-slate-400 font-mono">-Xss: ~1MB</span>
                </div>
                <div className="space-y-2">
                  <div className="p-3 bg-slate-950 border border-emerald-500/20 rounded-lg text-xs space-y-1">
                    <div className="font-mono text-emerald-300 font-semibold">Stack Frame: calculateTotal()</div>
                    <div className="text-slate-400 font-mono text-[11px]">int quantity = 5 (raw binary 4 bytes)</div>
                    <div className="text-slate-400 font-mono text-[11px]">double rate = 19.99 (8 bytes)</div>
                    <div className="text-amber-400 font-mono text-[11px]">Order orderRef ───► [Points to Heap 0x4F1]</div>
                  </div>
                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-400">
                    <div className="font-mono text-slate-300">Stack Frame: main(String[] args)</div>
                    <div className="text-[11px]">Initial invocation frame</div>
                  </div>
                </div>
              </div>

              {/* Heap */}
              <div className="p-5 bg-slate-900 border border-amber-500/30 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-amber-400">JVM HEAP (Shared by all Threads)</span>
                  <span className="text-[10px] text-slate-400 font-mono">-Xms / -Xmx</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 border border-amber-500/20 rounded-lg space-y-1">
                    <div className="text-xs font-mono text-amber-300 font-semibold">Young Generation</div>
                    <div className="text-[11px] text-slate-400">Eden Space: new objects instantiated here</div>
                    <div className="text-[11px] text-slate-500">Survivor S0 / S1: survivors of Minor GC</div>
                  </div>
                  <div className="p-3 bg-slate-950 border border-amber-500/20 rounded-lg space-y-1">
                    <div className="text-xs font-mono text-amber-300 font-semibold">Old (Tenured) Generation</div>
                    <div className="text-[11px] text-slate-400">Long-lived objects promoted after surviving multiple GC cycles</div>
                  </div>
                  <div className="p-2.5 bg-slate-950/80 border border-purple-500/30 rounded-lg text-[11px] text-purple-300 font-mono">
                    String Constant Pool (Interned literals)
                  </div>
                </div>
              </div>

              {/* Metaspace */}
              <div className="p-5 bg-slate-900 border border-blue-500/30 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-xs font-mono font-bold text-blue-400">METASPACE (Native Memory)</span>
                  <span className="text-[10px] text-slate-400 font-mono">Off-Heap OS RAM</span>
                </div>
                <div className="p-3 bg-slate-950 border border-blue-500/20 rounded-lg space-y-2 text-xs">
                  <div className="font-mono text-blue-300 font-semibold">Class Metadata</div>
                  <p className="text-slate-400 text-[11px]">
                    Stores loaded class bytecode structures, method bytecodes, field definitions, and runtime constant pools.
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Replaced legacy PermGen in Java 8. Expands dynamically up to OS memory limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'exception_hierarchy' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
              The Java Throwable Hierarchy
            </h3>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
              <div className="p-3 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold">
                java.lang.Throwable
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-slate-800">
                {/* Errors */}
                <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2">
                  <div className="font-bold text-rose-400">java.lang.Error</div>
                  <div className="text-[11px] text-slate-300 font-sans">Fatal JVM conditions. Applications should NOT attempt to catch.</div>
                  <ul className="text-[11px] text-rose-300/80 list-disc list-inside space-y-0.5">
                    <li>OutOfMemoryError</li>
                    <li>StackOverflowError</li>
                    <li>InternalError</li>
                  </ul>
                </div>

                {/* Exceptions */}
                <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-2">
                  <div className="font-bold text-blue-400">java.lang.Exception</div>
                  <div className="text-[11px] text-slate-300 font-sans">Conditions that a reasonable application might want to catch.</div>
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="text-amber-300 font-semibold">java.lang.RuntimeException (Unchecked)</div>
                    <div className="text-[11px] text-slate-400 font-sans">Programmer logic errors: NullPointerException, IndexOutOfBounds</div>
                    <div className="text-emerald-300 font-semibold pt-1">Checked Exceptions (Direct subclasses)</div>
                    <div className="text-[11px] text-slate-400 font-sans">Enforced by compiler: IOException, SQLException, ClassNotFoundException</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'collections_tree' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
              Java Collections Framework Architecture
            </h3>
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-4 font-mono text-xs">
              <div className="p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-amber-300 font-bold">
                java.lang.Iterable&lt;T&gt; ──► java.util.Collection&lt;T&gt;
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pl-2">
                <div className="p-3 bg-slate-950 border border-blue-500/30 rounded-lg space-y-1">
                  <div className="font-bold text-blue-300">List&lt;T&gt;</div>
                  <div className="text-[10px] text-slate-400 font-sans">Ordered sequence with indexed access</div>
                  <div className="text-[10px] text-slate-300">ArrayList, LinkedList</div>
                </div>
                <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-lg space-y-1">
                  <div className="font-bold text-emerald-300">Set&lt;T&gt;</div>
                  <div className="text-[10px] text-slate-400 font-sans">No duplicate elements</div>
                  <div className="text-[10px] text-slate-300">HashSet, TreeSet</div>
                </div>
                <div className="p-3 bg-slate-950 border border-purple-500/30 rounded-lg space-y-1">
                  <div className="font-bold text-purple-300">Queue&lt;T&gt;</div>
                  <div className="text-[10px] text-slate-400 font-sans">FIFO element processing</div>
                  <div className="text-[10px] text-slate-300">ArrayDeque, PriorityQueue</div>
                </div>
                <div className="p-3 bg-slate-950 border border-amber-500/30 rounded-lg space-y-1">
                  <div className="font-bold text-amber-300">Map&lt;K,V&gt;</div>
                  <div className="text-[10px] text-slate-400 font-sans">Key-Value mapping (Separate branch)</div>
                  <div className="text-[10px] text-slate-300">HashMap, TreeMap</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'thread_lifecycle' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
              Java Thread Lifecycle State Machine (java.lang.Thread.State)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                <span className="text-slate-400 text-[10px]">STATE 1</span>
                <div className="font-bold text-white mt-1">NEW</div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Created with new Thread(), start() not yet invoked.</p>
              </div>
              <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-lg">
                <span className="text-emerald-400 text-[10px]">STATE 2</span>
                <div className="font-bold text-emerald-300 mt-1">RUNNABLE</div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Executing in JVM or waiting for OS CPU time slice.</p>
              </div>
              <div className="p-3 bg-slate-900 border border-rose-500/30 rounded-lg">
                <span className="text-rose-400 text-[10px]">STATE 3</span>
                <div className="font-bold text-rose-300 mt-1">BLOCKED</div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Waiting to acquire monitor lock to enter synchronized block.</p>
              </div>
              <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-lg">
                <span className="text-amber-400 text-[10px]">STATE 4</span>
                <div className="font-bold text-amber-300 mt-1">WAITING</div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">Waiting indefinitely via Object.wait() or Thread.join().</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                <span className="text-slate-500 text-[10px]">STATE 5</span>
                <div className="font-bold text-slate-400 mt-1">TERMINATED</div>
                <p className="text-[11px] text-slate-500 font-sans mt-1">Method execution concluded or uncaught exception thrown.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
