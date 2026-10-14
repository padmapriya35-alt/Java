import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Globe, Terminal, CheckCircle2, GitBranch } from 'lucide-react';

interface GitHubPublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPublishModal: React.FC<GitHubPublishModalProps> = ({ isOpen, onClose }) => {
  const [repoName, setRepoName] = useState('java-knowledge-base');
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const gitCommands = `# 1. Initialize git repository
git init

# 2. Stage all project files
git add .

# 3. Create initial commit
git commit -m "feat: complete Java programming knowledge base"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/${repoName}.git

# 6. Push code to GitHub
git push -u origin main`;

  const handleCopy = (text: string, stepNum: number) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepNum);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="github-publish-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 text-white rounded-lg border border-slate-700">
              <Globe className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 id="github-publish-title" className="text-base font-semibold text-white tracking-tight">
                Publishing to GitHub Pages
              </h2>
              <p className="text-xs text-slate-400">
                Your application is already 100% pre-configured for automated GitHub Pages hosting
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs sm:text-sm">
          {/* Fix Notice */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-semibold font-mono text-xs">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Fix Applied: Why Workflow Failed & How to Fix</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The 13-second failure occurred because GitHub Actions looked for <code className="text-amber-300 font-mono">package-lock.json</code> and encountered a peer dependency check. We have generated <code className="text-amber-300 font-mono">package-lock.json</code> and configured <code className="text-amber-300 font-mono">.npmrc</code> with resilient flags.
            </p>
            <p className="text-xs text-amber-200 font-semibold">
              Simply run the git push commands below to push the fix to GitHub!
            </p>
          </div>

          {/* Pre-configuration Confirmation */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold font-mono text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero-Config Setup Already Applied</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li><strong>Package Lock:</strong> <code className="text-emerald-300 font-mono">package-lock.json</code> is now generated and ready to push.</li>
              <li><strong>Vite Relative Base:</strong> <code className="text-emerald-300 font-mono">base: './'</code> is configured so all stylesheets and scripts load on subpaths.</li>
              <li><strong>GitHub Actions Workflow:</strong> <code className="text-emerald-300 font-mono">.github/workflows/deploy.yml</code> is configured with fallback flags.</li>
            </ul>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono text-xs">1</span>
                Create a New Repository on GitHub
              </span>
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-amber-400 hover:underline"
              >
                <span>github.com/new</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-xs text-slate-400 pl-7">
              Name your repository (e.g. <span className="text-slate-200 font-mono">java-knowledge-base</span>) and leave it set to Public.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono text-xs">2</span>
                Push Your Code via Terminal
              </span>
              <button
                onClick={() => handleCopy(gitCommands, 2)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
              >
                {copiedStep === 2 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedStep === 2 ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300/90 whitespace-pre overflow-x-auto">
              <code>{gitCommands}</code>
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <span className="font-semibold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-mono text-xs">3</span>
              Enable GitHub Actions in GitHub Pages Settings
            </span>
            <div className="pl-7 space-y-1 text-xs text-slate-300 leading-relaxed">
              <p>1. Open your repository on GitHub and click <strong>Settings</strong> at the top.</p>
              <p>2. In the left menu, click <strong>Pages</strong>.</p>
              <p>3. Under <strong>Build and deployment &gt; Source</strong>, select <strong>GitHub Actions</strong>.</p>
              <p>4. Your website will be live in 1-2 minutes at:</p>
              <div className="p-2 bg-slate-950 border border-slate-800 rounded font-mono text-amber-300 text-xs">
                https://&lt;your-username&gt;.github.io/{repoName}/
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs rounded-xl transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
