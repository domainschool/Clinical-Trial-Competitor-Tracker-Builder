import React, { useState, useEffect } from 'react';
import { Search, Activity, Database, BarChart3, Download, RefreshCw, AlertCircle, Info, BookOpen, Sun, Moon } from 'lucide-react';
import { useTrials } from './hooks/useTrials';
import AnalyticsHeader from './components/AnalyticsHeader';
import TrialTable from './components/TrialTable';
import DomainKnowledge from './components/DomainKnowledge';
import TrialDetailModal from './components/TrialDetailModal';

const App = () => {
  const [activeView, setActiveView] = useState('tracker'); // 'tracker' or 'knowledge'
  const [searchInput, setSearchInput] = useState('');
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const { trials, loading, error, indication, updateIndication, refresh } = useTrials();

  // Sync theme to document class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      updateIndication(searchInput.trim());
    }
  };

  const handleDownloadCSV = () => {
    if (trials.length === 0) return;

    const headers = ['Trial ID', 'Title', 'Sponsor', 'Phase', 'Status', 'Primary Completion', 'Last Updated'];
    const csvRows = [
      headers.join(','),
      ...trials.map(trial => [
        trial.id,
        `"${trial.title.replace(/"/g, '""')}"`,
        `"${trial.sponsor.replace(/"/g, '""')}"`,
        trial.phase,
        trial.status,
        trial.completionDate,
        trial.lastUpdated
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `trial_export_${indication.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 flex flex-col font-sans theme-transition relative overflow-hidden grid-bg">
      {/* Decorative Blur Blobs */}
      <div className="glow-blob bg-indigo-500 w-[500px] h-[500px] top-[-100px] left-[-100px]"></div>
      <div className="glow-blob bg-violet-500 w-[400px] h-[400px] bottom-[-50px] right-[-50px] animation-delay-2000"></div>

      {/* Floating Header */}
      <header className="glass-panel sticky top-0 z-40 shadow-lg border-b backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer select-none group" onClick={() => window.location.reload()}>
            <div className="bg-gradient-to-tr from-clinical-blue-600 to-indigo-500 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Activity className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-slate-900 dark:text-white font-extrabold text-lg leading-tight tracking-tight flex items-center">
                TrialIntel
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full ml-1.5 animate-pulse"></span>
              </h1>
              <p className="text-slate-400 dark:text-slate-500 text-[9px] font-extrabold uppercase tracking-widest leading-none mt-0.5">
                Competitor Tracker
              </p>
            </div>
          </div>

          {/* Search Bar - Header Mode */}
          {indication && (
            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4 group-focus-within:text-clinical-blue-500 dark:group-focus-within:text-violet-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Analyze therapeutic indication..."
                  className="w-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800 rounded-xl py-2 pl-10 pr-16 text-xs focus:ring-2 focus:ring-clinical-blue-500/50 dark:focus:ring-violet-500/30 focus:border-clinical-blue-500 dark:focus:border-violet-500 focus:bg-white dark:focus:bg-[#101726] transition-all outline-none text-slate-900 dark:text-slate-100 shadow-inner"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-[8px] font-bold text-slate-400 dark:text-slate-500 pointer-events-none">
                  ENTER
                </kbd>
              </div>
            </form>
          )}

          {/* Navigation & Controls */}
          <div className="flex items-center space-x-4 lg:space-x-6 z-10">
            <nav className="flex items-center space-x-1 lg:space-x-2">
              <button
                onClick={() => setActiveView('tracker')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-tight transition-all ${
                  activeView === 'tracker'
                    ? 'bg-slate-100 dark:bg-slate-800/80 text-clinical-blue-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-clinical-blue-600 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tracker</span>
              </button>
              <button
                onClick={() => setActiveView('knowledge')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-tight transition-all ${
                  activeView === 'knowledge'
                    ? 'bg-slate-100 dark:bg-slate-800/80 text-clinical-blue-600 dark:text-violet-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-clinical-blue-600 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/30'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Intelligence Hub</span>
              </button>
            </nav>

            <span className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800"></span>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <div className="hidden lg:flex items-center space-x-1.5 text-slate-400 dark:text-slate-500">
              <Database className="w-3.5 h-3.5" />
              <span className="text-[9px] font-extrabold uppercase tracking-widest">API LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6 z-10">
        {activeView === 'knowledge' ? (
          <DomainKnowledge />
        ) : !indication ? (
          /* Empty State / Landing Page */
          <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
            <div className="glass-card p-8 md:p-12 rounded-3xl border max-w-2xl w-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-3xl"></div>
              
              <div className="bg-gradient-to-tr from-clinical-blue-100 to-indigo-100 dark:from-slate-800 dark:to-indigo-950/40 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner transform rotate-6 hover:rotate-0 transition-all duration-300">
                <BarChart3 className="text-clinical-blue-600 dark:text-violet-400 w-10 h-10" />
              </div>
              
              <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold mb-4 tracking-tight">
                Clinical Landscape Intelligence
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base mb-8 leading-relaxed max-w-lg mx-auto">
                Unlock real-time competitor data from ClinicalTrials.gov. Track sponsor density, phase progression, and recruitment velocity across any therapeutic area instantly.
              </p>

              {/* Main Search Input */}
              <form onSubmit={handleSearch} className="max-w-md mx-auto mb-10 relative">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5 group-focus-within:text-clinical-blue-600 dark:group-focus-within:text-violet-400 transition-colors" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Enter therapeutic indication (e.g. Oncology)..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-20 text-sm focus:ring-4 focus:ring-clinical-blue-500/10 dark:focus:ring-indigo-500/15 focus:border-clinical-blue-600 dark:focus:border-violet-500 focus:bg-white dark:focus:bg-[#101726] transition-all outline-none text-slate-900 dark:text-slate-100 shadow-md"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-clinical-blue-600 to-indigo-600 hover:from-clinical-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    Analyze
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Quick Landscape Diagnostics
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {['Multiple Sclerosis', 'CAR-T Therapy', 'Alzheimer', 'GLP-1'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchInput(term);
                        updateIndication(term);
                      }}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-900/60 hover:bg-gradient-to-r hover:from-clinical-blue-600 hover:to-indigo-600 hover:text-white dark:hover:text-white dark:hover:from-indigo-600 dark:hover:to-violet-600 hover:shadow-md hover:shadow-indigo-500/20 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-xl border border-slate-200/60 dark:border-slate-800/80 transition-all active:scale-95 cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : loading ? (
          /* Skeleton Loader */
          <div className="space-y-6 animate-pulse">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-3 md:space-y-0">
              <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-lg w-72"></div>
              <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-40"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl"></div>
              ))}
            </div>
            <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="h-14 bg-slate-100 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 border-b border-slate-100 dark:border-slate-800/40 last:border-0 mx-6"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="glass-card border-red-200 dark:border-red-950/40 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-lg animate-fade-in-up">
            <div className="bg-red-50 dark:bg-red-950/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <AlertCircle className="text-red-600 dark:text-red-400 w-8 h-8" />
            </div>
            <h3 className="text-slate-900 dark:text-white font-extrabold text-xl mb-2">Network Retrieval Failed</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">{error}</p>
            <button 
              onClick={() => updateIndication(indication)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-500/10 hover:shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          /* Landscape Data View */
          <div className="animate-fade-in-up">
            {/* Context Sub-header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-clinical-blue-100 dark:bg-violet-950/40 text-clinical-blue-700 dark:text-violet-400 text-[10px] font-extrabold uppercase rounded tracking-wider">
                    Indications Matrix
                  </span>
                  <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                    Phase 3 / Recruiting
                  </span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight mt-1 flex flex-wrap items-center">
                  Landscape Analysis: 
                  <span className="bg-gradient-to-r from-clinical-blue-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400 bg-clip-text text-transparent ml-2 underline decoration-indigo-200/50 underline-offset-4 font-black">
                    {indication}
                  </span>
                </h2>
              </div>

              {/* Landscape Actions */}
              <div className="flex items-center space-x-3 self-start md:self-auto">
                <div className="text-slate-700 dark:text-slate-300 text-xs font-bold bg-white dark:bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 shadow-sm flex items-center">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2.5 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="font-extrabold mr-1">{trials.length}</span> Trials Identified
                </div>
                
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-clinical-blue-600 to-indigo-600 hover:from-clinical-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-indigo-500/25 transition-all active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Custom Responsive Dashboard Grid */}
            <AnalyticsHeader trials={trials} />
            
            {/* High-density Explorer Table */}
            <TrialTable trials={trials} onRowClick={setSelectedTrial} />
          </div>
        )}
      </main>

      {/* Slide-over Detail Inspector */}
      {selectedTrial && (
        <TrialDetailModal 
          trial={selectedTrial} 
          onClose={() => setSelectedTrial(null)} 
        />
      )}

      {/* Sleek Professional Status Footer */}
      <footer className="bg-white/70 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-900 px-6 py-4 backdrop-blur-md z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest space-y-3 md:space-y-0">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></span>
              <span>API Gateway: Active</span>
            </div>
            <span>Protocol: ClinicalTrials.gov v2</span>
            <span>Transmission: TLS-Secure</span>
          </div>
          <div className="flex items-center space-x-5">
            <span className="hover:text-clinical-blue-600 dark:hover:text-violet-400 cursor-pointer transition-colors">Docs</span>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span className="hover:text-clinical-blue-600 dark:hover:text-violet-400 cursor-pointer transition-colors">Support Portal</span>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <span className="text-slate-500 dark:text-slate-400 normal-case font-bold">© TrialIntel Systems</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
