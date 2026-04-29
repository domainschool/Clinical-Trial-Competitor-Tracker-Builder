import React, { useState } from 'react';
import { Search, Activity, Database, BarChart3, Download, RefreshCw, AlertCircle, Info, BookOpen } from 'lucide-react';
import { useTrials } from './hooks/useTrials';
import AnalyticsHeader from './components/AnalyticsHeader';
import TrialTable from './components/TrialTable';
import DomainKnowledge from './components/DomainKnowledge';

const App = () => {
  const [activeView, setActiveView] = useState('tracker'); // 'tracker' or 'knowledge'
  const [searchInput, setSearchInput] = useState('');
  const { trials, loading, error, indication, updateIndication, refresh } = useTrials();

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* High-Density Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-200 shadow-lg">
              <Activity className="text-white w-5 h-5" />
            </div>
            <div>
              <h1 className="text-blue-900 font-bold text-lg leading-tight">TrialIntel</h1>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Competitive Intelligence</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Analyze therapeutic indication (e.g., Multiple Sclerosis)..."
                className="w-full bg-slate-100 border-none rounded-md py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all outline-none text-slate-900 shadow-inner"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-400 pointer-events-none hidden sm:inline-block">
                ENTER
              </kbd>
            </div>
          </form>

          <div className="flex items-center space-x-6">
            <div 
              onClick={() => setActiveView('tracker')}
              className={`flex items-center space-x-1 cursor-pointer transition-colors ${activeView === 'tracker' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tight">Tracker</span>
            </div>
            <div 
              onClick={() => setActiveView('knowledge')}
              className={`flex items-center space-x-1 cursor-pointer transition-colors ${activeView === 'knowledge' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tight">Intelligence Hub</span>
            </div>
            <div className="hidden lg:flex items-center space-x-1 text-slate-400 border-l border-slate-200 pl-6 ml-2">
              <Database className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-tight">API Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-6">
        {activeView === 'knowledge' ? (
          <DomainKnowledge />
        ) : !indication ? (
          /* Empty State */
          <div className="h-[70vh] flex flex-col items-center justify-center text-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 max-w-lg transition-all hover:border-blue-200">
              <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3 transition-transform hover:rotate-0">
                <BarChart3 className="text-blue-600 w-10 h-10" />
              </div>
              <h2 className="text-blue-900 text-2xl font-bold mb-3 tracking-tight">Clinical Landscape Intelligence</h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Unlock real-time competitive data from ClinicalTrials.gov. Track sponsor activity, phase transitions, and recruitment velocity across any therapeutic area.
              </p>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Try a landscape analysis</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Multiple Sclerosis', 'CAR-T Therapy', 'Alzheimer', 'GLP-1'].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchInput(term);
                        updateIndication(term);
                      }}
                      className="px-4 py-2 bg-slate-50 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 transition-all active:scale-95"
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
            <div className="flex items-center justify-between mb-8">
              <div className="h-8 bg-slate-200 rounded w-64"></div>
              <div className="h-10 bg-slate-200 rounded w-32"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-white border border-slate-200 rounded-xl"></div>
              ))}
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="h-14 bg-slate-100 border-b border-slate-200"></div>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-20 border-b border-slate-100 last:border-0 mx-6"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="bg-white border border-red-100 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-600 w-8 h-8" />
            </div>
            <h3 className="text-slate-900 font-bold text-xl mb-2">Network Retrieval Failed</h3>
            <p className="text-slate-500 text-sm mb-8">{error}</p>
            <button 
              onClick={() => updateIndication(indication)}
              className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          /* Data View */
          <div className="fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
              <div>
                <h2 className="text-blue-900 text-2xl font-bold tracking-tight flex items-center">
                  Landscape Analysis: <span className="text-blue-600 ml-2 italic underline decoration-blue-200 underline-offset-4">{indication}</span>
                </h2>
                <p className="text-slate-500 text-xs font-medium mt-1">
                  Filtering for Phase 3 & Recruiting trials only.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-slate-600 text-xs font-bold bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                  {trials.length} Trials Identified
                </div>
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-100 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <AnalyticsHeader trials={trials} />
            <TrialTable trials={trials} />
          </div>
        )}
      </main>

      {/* Footer / Status Bar */}
      <footer className="bg-white border-t border-slate-200 px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>API Connection: Active</span>
            </div>
            <span>Source: ClinicalTrials.gov v2</span>
            <span>Security: encrypted-ssl</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Support</span>
            <span className="text-slate-300">|</span>
            <span>© 2024 TrialIntel Systems</span>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default App;
