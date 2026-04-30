import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Calendar, ArrowUpDown, ExternalLink } from 'lucide-react';

const TrialTable = ({ trials, onRowClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'desc' });

  // Sorting Logic
  const sortedTrials = useMemo(() => {
    let sortableTrials = [...trials];
    if (sortConfig !== null) {
      sortableTrials.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTrials;
  }, [trials, sortConfig]);

  const requestSort = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusStyle = (status) => {
    const s = status?.toUpperCase();
    if (s === 'RECRUITING') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (s?.includes('ACTIVE')) return 'bg-amber-50 text-amber-700 border-amber-100';
    if (s === 'COMPLETED') return 'bg-slate-100 text-slate-600 border-slate-200';
    return 'bg-slate-50 text-slate-500 border-slate-100';
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider w-1/3">
                Study Title
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Sponsor
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Primary Completion
              </th>
              <th 
                className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-blue-600 transition-colors"
                onClick={() => requestSort('lastUpdated')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Updated</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedTrials.map((trial) => (
              <tr 
                key={trial.id} 
                onClick={() => onRowClick(trial)}
                className="hover:bg-blue-50/50 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-blue-600 mb-1">{trial.id}</span>
                    <span className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-900">
                      {trial.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                    {trial.sponsor}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wide ${getStatusStyle(trial.status)}`}>
                    {trial.status?.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-slate-600 space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium">{formatDate(trial.completionDate)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-medium text-slate-500">
                    {formatDate(trial.lastUpdated)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedTrials.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-slate-400 text-sm">No trials found matching the criteria.</p>
        </div>
      )}
    </div>
  );
};

export default TrialTable;
