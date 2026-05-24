import React, { useState } from 'react';
import { X, ExternalLink, Calendar, Users, FlaskConical, ClipboardList, ShieldAlert, RefreshCw, Copy, Check, Info } from 'lucide-react';

const TrialDetailModal = ({ trial, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'arms', 'eligibility'
  const [copied, setCopied] = useState(false);

  if (!trial) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(trial.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'TBD';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase() || '';
    if (s === 'RECRUITING') {
      return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-400 border border-emerald-200/50';
    }
    if (s.includes('ACTIVE') || s.includes('ENROLLING')) {
      return 'bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-400 border border-amber-200/50';
    }
    return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200/50';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in-up">
      <div className="bg-white dark:bg-[#0f172a] w-full max-w-4xl max-h-[85vh] rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden flex flex-col theme-transition">
        
        {/* Modal Header */}
        <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            {/* Click to Copy Trial ID */}
            <button 
              onClick={handleCopyId}
              className="flex items-center space-x-1.5 px-3 py-1 bg-clinical-blue-100 dark:bg-violet-950/50 hover:bg-clinical-blue-200 dark:hover:bg-violet-900/50 text-clinical-blue-700 dark:text-violet-400 text-xs font-extrabold rounded-lg tracking-wider uppercase border border-clinical-blue-200/20 dark:border-violet-800/20 transition-all cursor-pointer relative"
              title="Click to copy NCT ID"
            >
              <span>{trial.id}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3 h-3 text-clinical-blue-600 dark:text-violet-400" />}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>
            
            <h2 className="text-slate-500 dark:text-slate-400 font-extrabold text-[10px] uppercase tracking-widest max-w-[200px] sm:max-w-xs truncate">
              {trial.sponsor}
            </h2>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-full transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="bg-slate-50/50 dark:bg-slate-900/20 px-6 border-b border-slate-200/60 dark:border-slate-800/80 flex items-center space-x-4">
          {[
            { id: 'overview', label: 'Overview & Target', icon: ClipboardList },
            { id: 'arms', label: 'Study Arms', icon: FlaskConical },
            { id: 'eligibility', label: 'Eligibility Check', icon: ShieldAlert },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-clinical-blue-600 dark:border-violet-500 text-clinical-blue-600 dark:text-violet-400'
                  : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab-driven Content Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {/* Main Title Section */}
          <div className="space-y-3 mb-8">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug tracking-tight">
              {trial.title}
            </h1>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-300 text-[10px] font-extrabold uppercase rounded-full border border-indigo-200/20">
                {trial.phase || 'Phase N/A'}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${getStatusStyle(trial.status)}`}>
                {trial.status?.replace(/_/g, ' ')}
              </span>
            </div>
          </div>

          {/* ACTIVE TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">
              {/* Target Data / Brief Narrative */}
              <div className="lg:col-span-8 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
                    Detailed Summary
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {trial.description}
                  </p>
                </div>
              </div>

              {/* Landscape Logistics Info Card */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-5 shadow-sm">
                  <h4 className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
                    <Info className="w-3.5 h-3.5 mr-1.5 text-clinical-blue-600" />
                    Trial Logistics
                  </h4>
                  
                  <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                    <Calendar className="w-4 h-4 text-clinical-blue-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">
                        Est. Primary Completion
                      </p>
                      <p className="text-xs font-black text-slate-900 dark:text-slate-200">
                        {formatDate(trial.completionDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-400">
                    <RefreshCw className="w-4 h-4 text-clinical-blue-600 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider leading-none mb-1">
                        System Last Updated
                      </p>
                      <p className="text-xs font-black text-slate-900 dark:text-slate-200">
                        {formatDate(trial.lastUpdated)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTIVE TAB: STUDY ARMS */}
          {activeTab === 'arms' && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center">
                  Trial Arm Groups
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Detailed distribution of study arms, interventions, and dosing regimens.
                </p>
              </div>

              {trial.arms && trial.arms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trial.arms.map((arm, i) => (
                    <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:border-indigo-500/30 dark:hover:border-violet-500/30 transition-colors">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[9px] font-extrabold uppercase rounded border border-indigo-200/20 mb-3">
                          Arm {i + 1}: {arm.label || 'Standard Group'}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
                          {arm.description || 'No detailed arm description specified.'}
                        </p>
                      </div>

                      {arm.interventions && arm.interventions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200/40 dark:border-slate-800">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
                            Active Interventions:
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1.5">
                            {arm.interventions.map((item, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-[9px] font-bold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 italic text-xs bg-slate-50 dark:bg-slate-900/40 border border-slate-200/40 rounded-2xl">
                  No defined clinical arm groups available for this study.
                </div>
              )}
            </div>
          )}

          {/* ACTIVE TAB: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                  Scientific Inclusion & Exclusion Criteria
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Official diagnostic criteria checklist required for trial participant enrollment.
                </p>
              </div>

              <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/50 dark:border-slate-900 rounded-2xl">
                <div className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed whitespace-pre-wrap font-mono max-h-[300px] overflow-y-auto">
                  {trial.eligibility}
                </div>
              </div>
            </div>
          )}
          
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-900/50 px-8 py-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
          <p className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">
            Data Source: ClinicalTrials.gov API v2
          </p>
          
          <a 
            href={`https://clinicaltrials.gov/study/${trial.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 text-clinical-blue-600 dark:text-violet-400 hover:text-clinical-blue-700 dark:hover:text-violet-300 text-xs font-bold transition-colors cursor-pointer"
          >
            <span>Open ClinicalTrials.gov Entry</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrialDetailModal;
