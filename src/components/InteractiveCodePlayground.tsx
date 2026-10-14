import React, { useState } from 'react';
import { Play, RotateCcw, StepForward, Terminal, Layers, CheckCircle2, X } from 'lucide-react';

interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  code: string;
  steps: {
    line: number;
    explanation: string;
    stack: { frame: string; variables: { name: string; type: string; value: string }[] }[];
    heap: { address: string; type: string; fields: Record<string, string> }[];
    output: string[];
  }[];
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'pass-by-value',
    title: 'Java Pass-by-Value (Stack vs Heap)',
    description: 'Observe why modifying a primitive parameter does not affect the caller, while mutating an object modifies heap memory.',
    code: `public class PassByValueSimulator {
    public static void main(String[] args) {
        int count = 10;
        int[] data = { 1, 2 };

        modify(count, data);
        System.out.println("count: " + count);
        System.out.println("data[0]: " + data[0]);
    }

    public static void modify(int num, int[] arr) {
        num = 999;
        arr[0] = 50;
    }
}`,
    steps: [
      {
        line: 3,
        explanation: 'The JVM pushes main() stack frame. Allocates 4-byte primitive "count" with literal 10.',
        stack: [
          {
            frame: 'main()',
            variables: [{ name: 'count', type: 'int', value: '10' }]
          }
        ],
        heap: [],
        output: []
      },
      {
        line: 4,
        explanation: 'Allocates int array on Heap at address @0x10A. Variable "data" on stack holds pointer @0x10A.',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 'count', type: 'int', value: '10' },
              { name: 'data', type: 'int[]', value: 'ref: @0x10A' }
            ]
          }
        ],
        heap: [
          { address: '@0x10A', type: 'int[]', fields: { '[0]': '1', '[1]': '2' } }
        ],
        output: []
      },
      {
        line: 6,
        explanation: 'Method modify() called. Copies value 10 to "num". Copies reference @0x10A to "arr".',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 'count', type: 'int', value: '10' },
              { name: 'data', type: 'int[]', value: 'ref: @0x10A' }
            ]
          },
          {
            frame: 'modify()',
            variables: [
              { name: 'num', type: 'int', value: '10' },
              { name: 'arr', type: 'int[]', value: 'ref: @0x10A' }
            ]
          }
        ],
        heap: [
          { address: '@0x10A', type: 'int[]', fields: { '[0]': '1', '[1]': '2' } }
        ],
        output: []
      },
      {
        line: 12,
        explanation: 'num = 999 modifies only the local frame. arr[0] = 50 mutates the shared heap object at @0x10A!',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 'count', type: 'int', value: '10' },
              { name: 'data', type: 'int[]', value: 'ref: @0x10A' }
            ]
          },
          {
            frame: 'modify()',
            variables: [
              { name: 'num', type: 'int', value: '999' },
              { name: 'arr', type: 'int[]', value: 'ref: @0x10A' }
            ]
          }
        ],
        heap: [
          { address: '@0x10A', type: 'int[]', fields: { '[0]': '50', '[1]': '2' } }
        ],
        output: []
      },
      {
        line: 7,
        explanation: 'modify() returns. Its stack frame is popped. main() prints count (still 10) and data[0] (mutated to 50).',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 'count', type: 'int', value: '10' },
              { name: 'data', type: 'int[]', value: 'ref: @0x10A' }
            ]
          }
        ],
        heap: [
          { address: '@0x10A', type: 'int[]', fields: { '[0]': '50', '[1]': '2' } }
        ],
        output: ['count: 10', 'data[0]: 50']
      }
    ]
  },
  {
    id: 'string-pool',
    title: 'String Pool vs Heap Allocation',
    description: 'Visualize how literal Strings reuse the String Constant Pool while new String() forces distinct heap allocations.',
    code: `public class StringPoolSimulator {
    public static void main(String[] args) {
        String s1 = "Java";
        String s2 = "Java";
        String s3 = new String("Java");

        System.out.println("s1 == s2: " + (s1 == s2));
        System.out.println("s1 == s3: " + (s1 == s3));
    }
}`,
    steps: [
      {
        line: 3,
        explanation: 'String literal "Java" is interned into the String Constant Pool at @POOL_1.',
        stack: [
          {
            frame: 'main()',
            variables: [{ name: 's1', type: 'String', value: 'ref: @POOL_1' }]
          }
        ],
        heap: [
          { address: '@POOL_1', type: 'String (Pool)', fields: { value: '"Java"' } }
        ],
        output: []
      },
      {
        line: 4,
        explanation: 's2 also points to "Java". The JVM reuses @POOL_1 from the pool without allocating new memory!',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 's1', type: 'String', value: 'ref: @POOL_1' },
              { name: 's2', type: 'String', value: 'ref: @POOL_1' }
            ]
          }
        ],
        heap: [
          { address: '@POOL_1', type: 'String (Pool)', fields: { value: '"Java"' } }
        ],
        output: []
      },
      {
        line: 5,
        explanation: 'new String("Java") forces allocation of a distinct object on the regular heap at @HEAP_2!',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 's1', type: 'String', value: 'ref: @POOL_1' },
              { name: 's2', type: 'String', value: 'ref: @POOL_1' },
              { name: 's3', type: 'String', value: 'ref: @HEAP_2' }
            ]
          }
        ],
        heap: [
          { address: '@POOL_1', type: 'String (Pool)', fields: { value: '"Java"' } },
          { address: '@HEAP_2', type: 'String (Heap)', fields: { value: '"Java"' } }
        ],
        output: []
      },
      {
        line: 8,
        explanation: 's1 == s2 evaluates to true (@POOL_1 == @POOL_1). s1 == s3 evaluates to false (@POOL_1 != @HEAP_2).',
        stack: [
          {
            frame: 'main()',
            variables: [
              { name: 's1', type: 'String', value: 'ref: @POOL_1' },
              { name: 's2', type: 'String', value: 'ref: @POOL_1' },
              { name: 's3', type: 'String', value: 'ref: @HEAP_2' }
            ]
          }
        ],
        heap: [
          { address: '@POOL_1', type: 'String (Pool)', fields: { value: '"Java"' } },
          { address: '@HEAP_2', type: 'String (Heap)', fields: { value: '"Java"' } }
        ],
        output: ['s1 == s2: true', 's1 == s3: false']
      }
    ]
  }
];

interface PlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveCodePlayground: React.FC<PlaygroundProps> = ({ isOpen, onClose }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('pass-by-value');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const scenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];
  const currentStep = scenario.steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  const handleRunAll = () => {
    setCurrentStepIndex(scenario.steps.length - 1);
  };

  if (!isOpen) return null;

  const codeLines = scenario.code.split('\n');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="playground-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 id="playground-title" className="text-lg font-semibold tracking-tight text-white flex items-center gap-2">
                <span>JVM Execution & Memory Stepper</span>
                <span className="text-[11px] font-mono font-normal bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                  Interactive Simulator
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Step line-by-line and inspect JVM Stack frames, local variable registers, and Heap object allocations
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close playground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Selector & Controls */}
        <div className="px-6 py-3 border-b border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Scenario:</span>
            <select
              value={selectedScenarioId}
              onChange={e => {
                setSelectedScenarioId(e.target.value);
                setCurrentStepIndex(0);
              }}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {SCENARIOS.map(s => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex >= scenario.steps.length - 1}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                currentStepIndex >= scenario.steps.length - 1
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm'
              }`}
            >
              <StepForward className="w-3.5 h-3.5" />
              <span>Step Next ({currentStepIndex + 1}/{scenario.steps.length})</span>
            </button>
            <button
              onClick={handleRunAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>Run to End</span>
            </button>
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Code Viewer with Highlighted Line */}
          <div className="w-full lg:w-1/2 border-r border-slate-800 bg-slate-950 flex flex-col overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-800/80 bg-slate-900/50 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Source: {scenario.title}.java</span>
              <span>Executing Line: {currentStep.line}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isCurrent = lineNum === currentStep.line;
                return (
                  <div
                    key={lineNum}
                    className={`flex items-center px-2 py-0.5 rounded transition-colors ${
                      isCurrent
                        ? 'bg-emerald-500/20 border-l-4 border-emerald-400 text-emerald-200 font-bold'
                        : 'text-slate-300 hover:bg-slate-900/40'
                    }`}
                  >
                    <span className="w-8 select-none text-slate-600 text-right pr-3 font-mono text-[11px]">
                      {lineNum}
                    </span>
                    <pre className="font-mono">{lineText || ' '}</pre>
                  </div>
                );
              })}
            </div>

            {/* Step Explanation Banner */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80 text-xs text-slate-200 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-300 font-mono">STEP ACTION: </span>
                <span>{currentStep.explanation}</span>
              </div>
            </div>
          </div>

          {/* Right: Real-time Memory Inspector & Console */}
          <div className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-slate-900">
            {/* Top Right: Call Stack & Heap Memory */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* JVM Call Stack */}
              <div className="p-3.5 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>JVM Call Stack (Thread-Private)</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Frames active: {currentStep.stack.length}</span>
                </div>

                <div className="space-y-2">
                  {currentStep.stack.map((frame, fIdx) => (
                    <div key={fIdx} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1.5">
                      <div className="font-mono text-emerald-300 font-semibold flex items-center justify-between">
                        <span>Frame: {frame.frame}</span>
                        {fIdx === currentStep.stack.length - 1 && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px]">
                        {frame.variables.map(v => (
                          <div key={v.name} className="p-1.5 bg-slate-950/80 rounded border border-slate-800/80 flex items-center justify-between">
                            <span className="text-slate-400">{v.type} <strong className="text-slate-200">{v.name}</strong></span>
                            <span className="text-amber-400">{v.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* JVM Shared Heap */}
              <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <Layers className="w-3.5 h-3.5" />
                    <span>JVM Shared Heap</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Objects: {currentStep.heap.length}</span>
                </div>

                {currentStep.heap.length === 0 ? (
                  <div className="text-xs text-slate-500 italic p-2">Zero heap objects allocated at this line.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentStep.heap.map(obj => (
                      <div key={obj.address} className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                        <div className="font-mono text-amber-300 font-semibold flex items-center justify-between">
                          <span>{obj.address}</span>
                          <span className="text-[10px] text-slate-400">{obj.type}</span>
                        </div>
                        <div className="text-[11px] font-mono space-y-0.5 text-slate-300">
                          {Object.entries(obj.fields).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-slate-400">
                              <span>{k}:</span>
                              <span className="text-emerald-300 font-semibold">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Right: Stdout Terminal */}
            <div className="h-36 border-t border-slate-800 bg-slate-950 flex flex-col">
              <div className="px-4 py-1.5 border-b border-slate-800/80 bg-slate-900/60 flex items-center gap-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>Standard Output (stdout)</span>
              </div>
              <div className="flex-1 p-3 font-mono text-xs overflow-y-auto text-emerald-400 space-y-0.5">
                {currentStep.output.length === 0 ? (
                  <span className="text-slate-600 italic">// No output emitted yet</span>
                ) : (
                  currentStep.output.map((outLine, oIdx) => (
                    <div key={oIdx} className="flex items-center gap-1.5">
                      <span className="text-slate-600">&gt;</span>
                      <span>{outLine}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
