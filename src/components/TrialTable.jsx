import React, { useState, useMemo } from 'react';
import { Calendar, ArrowUpDown, ExternalLink, Search, RefreshCw, Eye, Tag } from 'lucide-react';

const TrialTable = ({ trials, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'desc' });
  const [filterQuery, setFilterQuery] = useState('');

  // Sorting and Filtering Logic
  const processedTrials = useMemo(() => {
    // 1. Filter
    let result = [...trials];
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      result = result.filter(
        trial => 
          trial.id.toLowerCase().includes(q) || 
          trial.title.toLowerCase().includes(q) || 
          trial.sponsor.toLowerCase().includes(q) || 
          (trial.status && trial.status.toLowerCase().includes(q))
      );
    }

    // 2. Sort
    if (sortConfig !== null) {
      result.sort((a, b) => {
        let valA = a[sortConfig.key] || '';
        let valB = b[sortConfig.key] || '';

        // Handle case-insensitive string compare
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return result;
  }, [trials, sortConfig, filterQuery]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase() || '';
    if (s === 'RECRUITING') {
      return 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30';
    }
    if (s.includes('ACTIVE') || s.includes('ENROLLING')) {
      return 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30';
    }
    if (s === 'COMPLETED') {
      return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
    return 'bg-slate-50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800';
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'TBD';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-200/60 dark:border-slate-800 overflow-hidden shadow-lg animate-fade-in-up">
      {/* Table Header Controls */}
      <div className="p-4 bg-slate-50/50 dark:bg-slate-900/30 border-b border-slate-200/60 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-widest flex items-center">
            <Tag className="w-3.5 h-3.5 mr-2 text-clinical-blue-600 dark:text-violet-400" />
            Competitive Registry Explorer
          </h3>
        </div>
        
        {/* Table Filter Input */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search filtered subset..."
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-1.5 pl-9 pr-4 text-xs focus:ring-2 focus:ring-clinical-blue-500/20 dark:focus:ring-violet-500/20 focus:border-clinical-blue-500 dark:focus:border-violet-500 outline-none text-slate-950 dark:text-slate-100 shadow-sm"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/20 dark:bg-slate-900/10 border-b border-slate-200/60 dark:border-slate-800/80">
              <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-5/12">
                <button 
                  onClick={() => requestSort('title')}
                  className="flex items-center space-x-1 hover:text-clinical-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>Study Title & Trial ID</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-3/12">
                <button 
                  onClick={() => requestSort('sponsor')}
                  className="flex items-center space-x-1 hover:text-clinical-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>Sponsor Entity</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-1.5/12">
                <button 
                  onClick={() => requestSort('status')}
                  className="flex items-center space-x-1 hover:text-clinical-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>Status</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-1.5/12">
                <button 
                  onClick={() => requestSort('completionDate')}
                  className="flex items-center space-x-1 hover:text-clinical-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>Completion Date</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-4 text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-1/12">
                <button 
                  onClick={() => requestSort('lastUpdated')}
                  className="flex items-center space-x-1 hover:text-clinical-blue-600 dark:hover:text-violet-400 transition-colors"
                >
                  <span>Last Updated</span>
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
            {processedTrials.map((trial) => (
              <tr 
                key={trial.id} 
                onClick={() => onRowClick(trial)}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-900/30 transition-colors group cursor-pointer"
              >
                {/* Title & NCT ID */}
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extrabold text-clinical-blue-600 dark:text-violet-400 mb-1 tracking-wider uppercase">
                      {trial.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed group-hover:text-clinical-blue-600 dark:group-hover:text-violet-300">
                      {trial.title}
                    </span>
                  </div>
                </td>

                {/* Sponsor */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/20 max-w-full truncate shadow-sm">
                    {trial.sponsor}
                  </span>
                </td>

                {/* Status Badges */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold border uppercase tracking-wider ${getStatusStyle(trial.status)}`}>
                    {trial.status === 'RECRUITING' && (
                      <span className="w-1 h-1 bg-emerald-500 rounded-full mr-1.5 animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.5)]"></span>
                    )}
                    {(trial.status?.includes('ACTIVE') || trial.status?.includes('ENROLLING')) && (
                      <span className="w-1 h-1 bg-amber-500 rounded-full mr-1.5 animate-pulse"></span>
                    )}
                    {trial.status?.replace(/_/g, ' ')}
                  </span>
                </td>

                {/* Completion */}
                <td className="px-6 py-4">
                  <div className="flex items-center text-slate-500 dark:text-slate-400 space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                    <span className="text-xs font-medium">{formatDate(trial.completionDate)}</span>
                  </div>
                </td>

                {/* Last Updated */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                      {formatDate(trial.lastUpdated)}
                    </span>
                    <Eye className="w-3.5 h-3.5 text-slate-200 dark:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State */}
      {processedTrials.length === 0 && (
        <div className="py-16 text-center">
          <RefreshCw className="w-8 h-8 text-slate-300 dark:text-slate-700 animate-spin mx-auto mb-4" />
          <p className="text-slate-400 dark:text-slate-500 font-semibold text-sm">No registry items matched filters.</p>
          <button 
            onClick={() => setFilterQuery('')} 
            className="text-xs font-bold text-clinical-blue-600 dark:text-violet-400 mt-2 hover:underline focus:outline-none"
          >
            Reset filter query
          </button>
        </div>
      )}
    </div>
  );
};

export default TrialTable;
