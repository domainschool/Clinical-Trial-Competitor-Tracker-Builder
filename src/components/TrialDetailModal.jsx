import React from 'react';
import { X, ExternalLink, Calendar, Users, FlaskConical, ClipboardList, ShieldAlert, RefreshCw } from 'lucide-react';

const TrialDetailModal = ({ trial, onClose }) => {
  if (!trial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded">
              {trial.id}
            </span>
            <h2 className="text-blue-900 font-bold text-sm truncate max-w-md">
              {trial.sponsor}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title Section */}
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              {trial.title}
            </h1>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-full">
                {trial.phase}
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                {trial.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats & Meta */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex items-center space-x-3 text-slate-600">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Completion</p>
                    <p className="text-sm font-bold text-slate-900">{trial.completionDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Updated</p>
                    <p className="text-sm font-bold text-slate-900">{trial.lastUpdated}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center">
                  <FlaskConical className="w-3.5 h-3.5 mr-2" /> Study Arms
                </h3>
                {trial.arms && trial.arms.length > 0 ? (
                  <div className="space-y-3">
                    {trial.arms.map((arm, i) => (
                      <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl text-xs">
                        <p className="font-bold text-blue-900 mb-1">{arm.label}</p>
                        <p className="text-slate-500 leading-relaxed">{arm.description || 'No detailed arm description.'}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No arm groups defined.</p>
                )}
              </div>
            </div>

            {/* Right Column: Narrative & Logic */}
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-blue-900 flex items-center">
                  <ClipboardList className="w-5 h-5 mr-2 text-blue-600" />
                  Study Description
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {trial.description}
                </p>
              </section>

              <section className="space-y-3 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2 text-blue-600" />
                  Eligibility Criteria
                </h3>
                <div className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                  {trial.eligibility}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Source: ClinicalTrials.gov Archive
          </p>
          <a 
            href={`https://clinicaltrials.gov/study/${trial.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-xs font-bold transition-colors"
          >
            <span>View on ClinicalTrials.gov</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrialDetailModal;
