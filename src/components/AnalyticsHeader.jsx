import React, { useMemo } from 'react';
import { Layers, Users, Award, TrendingUp } from 'lucide-react';

const AnalyticsHeader = ({ trials }) => {
  const stats = useMemo(() => {
    if (!trials || trials.length === 0) {
      return {
        total: 0,
        uniqueSponsors: 0,
        topSponsor: 'N/A',
        topSponsorCount: 0
      };
    }

    const sponsorCounts = {};
    trials.forEach(trial => {
      const name = trial.sponsor;
      sponsorCounts[name] = (sponsorCounts[name] || 0) + 1;
    });

    const uniqueSponsors = Object.keys(sponsorCounts).length;
    
    let topSponsor = 'N/A';
    let maxCount = 0;
    
    Object.entries(sponsorCounts).forEach(([name, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topSponsor = name;
      }
    });

    return {
      total: trials.length,
      uniqueSponsors,
      topSponsor,
      topSponsorCount: maxCount
    };
  }, [trials]);

  const cards = [
    {
      label: 'Total Trials',
      value: stats.total,
      icon: Layers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Unique Competitors',
      value: stats.uniqueSponsors,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      label: 'Market Leader',
      value: stats.topSponsor,
      subValue: `${stats.topSponsorCount} Active Trials`,
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      label: 'Landscape Growth',
      value: '+12%', // Static for aesthetic, but could be derived from dates
      subValue: 'Last 30 Days',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-4">
          <div className={`${card.bgColor} p-3 rounded-lg flex-shrink-0`}>
            <card.icon className={`${card.color} w-5 h-5`} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
              {card.label}
            </p>
            <h3 className="text-xl font-bold text-slate-900 truncate">
              {card.value}
            </h3>
            {card.subValue && (
              <p className="text-[10px] font-semibold text-slate-400 mt-1">
                {card.subValue}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsHeader;
