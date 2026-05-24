import React, { useMemo, useState } from 'react';
import { Layers, Users, Award, TrendingUp, Info, BarChart3, PieChart, Activity } from 'lucide-react';

const AnalyticsHeader = ({ trials }) => {
  const [hoveredSponsor, setHoveredSponsor] = useState(null);

  const stats = useMemo(() => {
    if (!trials || trials.length === 0) {
      return {
        total: 0,
        uniqueSponsors: 0,
        topSponsor: 'N/A',
        topSponsorCount: 0,
        topSponsorsList: [],
        phaseDistribution: { 'Phase 1': 0, 'Phase 2': 0, 'Phase 3': 0, 'Phase 4': 0, 'N/A': 0 },
        estimated12MonthCompletions: 0,
        estimated12MonthCompletionsPercent: 0,
      };
    }

    const sponsorCounts = {};
    const phases = { 'Phase 1': 0, 'Phase 2': 0, 'Phase 3': 0, 'Phase 4': 0, 'N/A': 0 };
    let completionsNext12Months = 0;

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const today = new Date();

    trials.forEach(trial => {
      // Sponsor Count
      const name = trial.sponsor;
      sponsorCounts[name] = (sponsorCounts[name] || 0) + 1;

      // Phase calculation
      let matchedPhase = 'N/A';
      if (trial.phase) {
        if (trial.phase.toUpperCase().includes('PHASE 3')) matchedPhase = 'Phase 3';
        else if (trial.phase.toUpperCase().includes('PHASE 2')) matchedPhase = 'Phase 2';
        else if (trial.phase.toUpperCase().includes('PHASE 4')) matchedPhase = 'Phase 4';
        else if (trial.phase.toUpperCase().includes('PHASE 1')) matchedPhase = 'Phase 1';
      }
      phases[matchedPhase]++;

      // Estimated completions in 12 months
      if (trial.completionDate && trial.completionDate !== 'N/A') {
        const compDate = new Date(trial.completionDate);
        if (compDate >= today && compDate <= oneYearFromNow) {
          completionsNext12Months++;
        }
      }
    });

    const uniqueSponsors = Object.keys(sponsorCounts).length;
    
    // Sort sponsors for top list
    const sortedSponsors = Object.entries(sponsorCounts)
      .map(([name, count]) => ({
        name,
        count,
        percent: Math.round((count / trials.length) * 100)
      }))
      .sort((a, b) => b.count - a.count);

    const topSponsor = sortedSponsors[0]?.name || 'N/A';
    const maxCount = sortedSponsors[0]?.count || 0;

    return {
      total: trials.length,
      uniqueSponsors,
      topSponsor,
      topSponsorCount: maxCount,
      topSponsorsList: sortedSponsors.slice(0, 5),
      phaseDistribution: phases,
      estimated12MonthCompletions: completionsNext12Months,
      estimated12MonthCompletionsPercent: Math.round((completionsNext12Months / trials.length) * 100) || 0
    };
  }, [trials]);

  const cards = [
    {
      label: 'Indication Trial Density',
      value: stats.total,
      subValue: 'Active Registered Protocols',
      icon: Layers,
      color: 'text-clinical-blue-600 dark:text-violet-400',
      bgColor: 'bg-clinical-blue-50 dark:bg-violet-950/20 border-clinical-blue-100 dark:border-violet-900/30',
      // Inline visual sparkline representation
      sparkline: (
        <svg className="w-16 h-6 overflow-visible text-clinical-blue-500/30 dark:text-violet-400/20" viewBox="0 0 10 10" preserveAspectRatio="none">
          <path d="M0,8 Q2,2 4,6 T8,1 L10,5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="5" r="1.5" fill="rgb(99, 102, 241)" />
        </svg>
      )
    },
    {
      label: 'Unique Competitors',
      value: stats.uniqueSponsors,
      subValue: 'Pharma & Biotech Entities',
      icon: Users,
      color: 'text-indigo-600 dark:text-indigo-400',
      bgColor: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/30',
      // Radial percentage gauge of top competitor share
      gauge: (
        <div className="relative w-7 h-7 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path className="text-slate-100 dark:text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-indigo-500" strokeDasharray={`${stats.topSponsorsList[0]?.percent || 0}, 100`} strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>
      )
    },
    {
      label: 'Market Leader',
      value: stats.topSponsor,
      subValue: `${stats.topSponsorCount} Active Studies (${stats.topSponsorsList[0]?.percent || 0}% share)`,
      icon: Award,
      color: 'text-brand-amber dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30',
      badge: 'Gold Level'
    },
    {
      label: '12-Month Readout Outlook',
      value: `${stats.estimated12MonthCompletionsPercent}%`,
      subValue: `${stats.estimated12MonthCompletions} Trials Est. Primary Completion`,
      icon: TrendingUp,
      color: 'text-brand-emerald dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30',
    }
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* 4 Dashboard Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div key={index} className={`glass-card p-5 rounded-2xl border ${card.bgColor} flex items-start justify-between relative overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-md`}>
            <div className="flex items-start space-x-4 min-w-0">
              <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex-shrink-0`}>
                <card.icon className={`${card.color} w-5 h-5`} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5">
                  {card.label}
                </p>
                <h3 className="text-xl font-black text-slate-800 dark:text-white truncate tracking-tight leading-tight">
                  {card.value}
                </h3>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1 truncate">
                  {card.subValue}
                </p>
              </div>
            </div>

            {/* Micro visual components for high-end look */}
            {card.sparkline && <div className="absolute right-4 bottom-4">{card.sparkline}</div>}
            {card.gauge && <div className="absolute right-4 top-4">{card.gauge}</div>}
            {card.badge && (
              <span className="absolute right-3 top-3 text-[8px] px-2 py-0.5 rounded-full font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 tracking-wider">
                {card.badge}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Advanced Diagnostics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top 5 Sponsor Concentration Chart */}
        <div className="glass-card lg:col-span-7 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-clinical-blue-600 dark:text-violet-400" />
                  Sponsor Concentration Ratio
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  Competitive landscape market share density
                </p>
              </div>
              <Info className="w-4 h-4 text-slate-300 dark:text-slate-700 cursor-help" title="Calculated from active trials count per sponsor" />
            </div>

            {/* Custom SVG Horizontal Bar Chart */}
            <div className="space-y-4">
              {stats.topSponsorsList.map((sponsor, idx) => (
                <div 
                  key={sponsor.name}
                  className="space-y-1.5 cursor-pointer relative"
                  onMouseEnter={() => setHoveredSponsor(sponsor.name)}
                  onMouseLeave={() => setHoveredSponsor(null)}
                >
                  <div className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-300 z-10 relative">
                    <span className="truncate max-w-[70%] text-slate-700 dark:text-slate-200 font-semibold group-hover:text-clinical-blue-500">
                      {idx + 1}. {sponsor.name}
                    </span>
                    <div className="space-x-2 text-[10px] font-bold text-slate-400 dark:text-slate-500">
                      <span className="text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200/30 dark:border-slate-700/30">
                        {sponsor.count} {sponsor.count === 1 ? 'Trial' : 'Trials'}
                      </span>
                      <span>{sponsor.percent}%</span>
                    </div>
                  </div>

                  {/* High fidelity interactive bar container */}
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner border border-slate-200/20 dark:border-slate-800">
                    <div 
                      className={`h-full rounded-full chart-bar transition-all duration-500 bg-gradient-to-r ${
                        hoveredSponsor === sponsor.name 
                          ? 'from-violet-500 to-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]'
                          : idx === 0 
                            ? 'from-clinical-blue-600 to-indigo-500' 
                            : idx === 1 
                              ? 'from-indigo-500 to-indigo-400' 
                              : idx === 2 
                                ? 'from-indigo-400 to-violet-400' 
                                : 'from-violet-400 to-violet-300'
                      }`}
                      style={{ width: `${sponsor.percent}%` }}
                    />
                  </div>
                </div>
              ))}
              
              {stats.topSponsorsList.length === 0 && (
                <div className="py-12 text-center text-slate-400 dark:text-slate-500 italic text-xs">
                  No competitors identified in landscape
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800/50 mt-6 flex justify-between items-center text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest">
            <span>Aggregated from {stats.uniqueSponsors} unique entities</span>
            <span className="text-clinical-blue-600 dark:text-violet-400">Interactive Model</span>
          </div>
        </div>

        {/* Phase & Status Density Widget */}
        <div className="glass-card lg:col-span-5 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center">
                  <PieChart className="w-4 h-4 mr-2 text-indigo-500" />
                  Phase Breakdown Structure
                </h3>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
                  Distribution of clinical trial progression
                </p>
              </div>
              <Activity className="w-4 h-4 text-slate-300 dark:text-slate-700" />
            </div>

            {/* Custom visual progress bars for clinical phases */}
            <div className="space-y-4 pt-1">
              {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4'].map((phaseKey) => {
                const count = stats.phaseDistribution[phaseKey] || 0;
                const percent = Math.round((count / stats.total) * 100) || 0;
                
                return (
                  <div key={phaseKey} className="flex items-center justify-between space-x-4">
                    <div className="w-16 text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                      {phaseKey}
                    </div>
                    
                    {/* Visual glowing bar */}
                    <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden shadow-inner border border-slate-200/10 dark:border-slate-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          phaseKey === 'Phase 3' 
                            ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' 
                            : phaseKey === 'Phase 2'
                              ? 'bg-gradient-to-r from-violet-500 to-indigo-500'
                              : phaseKey === 'Phase 4'
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                                : 'bg-slate-400 dark:bg-slate-600'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    
                    <div className="w-14 text-right text-[10px] font-extrabold text-slate-500 dark:text-slate-400 space-x-1.5">
                      <span className="text-slate-700 dark:text-slate-200">{count}</span>
                      <span>({percent}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-5 border-t border-slate-100 dark:border-slate-800/50 mt-6 text-[9px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest flex justify-between items-center">
            <span>ClinicalTrials.gov Standard Registry</span>
            <span className="flex items-center text-indigo-500 dark:text-indigo-400">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-1.5"></span>
              Confirmatory Focus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
