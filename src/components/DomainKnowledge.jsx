import React, { useState } from 'react';
import { 
  Beaker, 
  ClipboardCheck, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  BookOpen, 
  Zap, 
  Target, 
  Scale, 
  Info,
  ChevronRight
} from 'lucide-react';

const DomainKnowledge = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const glossary = [
    { term: 'Sponsor', definition: 'The organization (Big Pharma or Biotech) that initiates, manages, and finances the clinical trial.', analogy: 'The Investor/Bankroll.' },
    { term: 'NCT Number', definition: 'A unique identifier assigned to each clinical study registered on ClinicalTrials.gov (e.g., NCT01234567).', analogy: 'The Social Security Number of the trial.' },
    { term: 'Intervention', definition: 'The specific drug, vaccine, gene therapy, or medical device being tested in the study.', analogy: 'The Subject of the experiment.' },
    { term: 'Inclusion/Exclusion', definition: 'The strict criteria (age, gender, health status) that determine who can or cannot participate in a study.', analogy: 'The Entrance Requirements.' },
    { term: 'Recruitment Status', definition: 'Indicates the current stage of participant enrollment (e.g., Recruiting, Completed, Withdrawn).', analogy: 'The "Now Hiring" sign.' },
    { term: 'Primary Endpoint', definition: 'The main result used to determine if a drug worked (e.g., tumor shrinkage, survival rate).', analogy: 'The Goal Line.' },
    { term: 'GCP', definition: 'Good Clinical Practice—the international ethical and scientific quality standard for clinical trials.', analogy: 'The ISO 9001 for medicine.' },
  ];

  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto p-6 space-y-12 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="text-4xl font-black text-blue-900 tracking-tight">The Anatomy of a Clinical Trial</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Understanding the lifecycle from lab to market. For professionals bridging the gap between clinical data and business strategy.
        </p>
      </div>

      {/* Bento Box: The 3 Phases */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2">
          <Beaker className="text-blue-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-blue-900">The Phase System: The Filter of Science</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[400px]">
          {/* Phase 1 */}
          <div className="md:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Safety</span>
              <h3 className="text-xl font-bold text-blue-900 mt-4">Phase 1</h3>
              <p className="text-slate-500 text-sm mt-2">20–100 healthy volunteers. Ensuring the drug isn’t toxic before testing efficacy.</p>
            </div>
            <div className="mt-8 text-slate-300">
              <Zap className="w-12 h-12" />
            </div>
          </div>

          {/* Phase 2 */}
          <div className="md:col-span-4 bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-100 flex flex-col justify-between text-white">
            <div>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest bg-blue-700/50 px-2 py-1 rounded">Efficacy</span>
              <h3 className="text-xl font-bold mt-4">Phase 2</h3>
              <p className="text-blue-100 text-sm mt-2">100–300 patients. Does it actually work for the disease? The graveyard of "miracle drugs."</p>
            </div>
            <div className="mt-8 text-blue-400 opacity-50">
              <Target className="w-12 h-12" />
            </div>
          </div>

          {/* Phase 3 */}
          <div className="md:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Confirmatory</span>
              <h3 className="text-xl font-bold text-blue-900 mt-4">Phase 3</h3>
              <p className="text-slate-500 text-sm mt-2">1,000–3,000+ patients. Prove the drug is better or safer than current treatments. The final hurdle for FDA approval.</p>
            </div>
            <div className="mt-8 text-slate-300">
              <ShieldCheck className="w-12 h-12" />
            </div>
          </div>
        </div>
      </section>

      {/* Business Context & Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Endpoints & Market Timing */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-emerald-400 w-6 h-6" />
            <h2 className="text-2xl font-bold">Business Context: Market Timing</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            The <span className="text-white font-bold italic">Primary Completion Date</span> is the "D-Day" of data. When this date arrives, the blindfold comes off.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            <h4 className="text-emerald-400 font-bold text-sm mb-2 uppercase tracking-wide flex items-center">
              <Zap className="w-4 h-4 mr-2" /> Strategic Insight
            </h4>
            <p className="text-sm text-slate-300">
              Positive data can cause a company’s stock to soar; failure can lead to the immediate shutdown of entire research projects.
            </p>
          </div>
        </section>

        {/* Competitive Landscape */}
        <section className="bg-white border border-slate-200 p-8 rounded-3xl space-y-6 shadow-sm">
          <div className="flex items-center space-x-2">
            <ClipboardCheck className="text-blue-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-blue-900">Competitive Landscape</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600 font-bold text-xs">Pharma</div>
              <div>
                <p className="text-blue-900 font-bold text-sm">The "Aircraft Carriers"</p>
                <p className="text-slate-500 text-xs mt-1">Deep pockets, massive pipelines, and strategic acquisition power.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600 font-bold text-xs">Biotech</div>
              <div>
                <p className="text-indigo-900 font-bold text-sm">The "Speedboats"</p>
                <p className="text-slate-500 text-xs mt-1">Nimble startups. High-risk, high-reward. Phase 3 failure often means insolvency.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Searchable Glossary */}
      <section className="bg-blue-50/50 border border-blue-100 rounded-3xl p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-blue-900 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
              Intelligence Glossary
            </h2>
            <p className="text-slate-500 text-sm">Key terms for life sciences strategy professionals.</p>
          </div>
          <div className="relative group max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-blue-600" />
            <input 
              type="text" 
              placeholder="Search terms or definitions..." 
              className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGlossary.map((item, index) => (
            <div key={index} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
              <h4 className="text-blue-900 font-bold mb-2 flex items-center justify-between">
                {item.term}
                <Info className="w-3.5 h-3.5 text-slate-300" />
              </h4>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{item.definition}</p>
              <div className="pt-3 border-t border-slate-50">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Simple Analogy:</span>
                <p className="text-[11px] font-medium text-slate-600 italic mt-1">{item.analogy}</p>
              </div>
            </div>
          ))}
        </div>
        {filteredGlossary.length === 0 && (
          <div className="text-center py-12 text-slate-400 italic">No matching terms found.</div>
        )}
      </section>

      {/* Regulatory Footer */}
      <section className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-blue-600 p-4 rounded-2xl text-white">
          <Scale className="w-8 h-8" />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-xl font-bold text-blue-900">Regulatory Context: The Gatekeepers</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            The FDA (USA) and EMA (Europe) mandate trial registration via acts like FDAAA 801. Our data exists because of these transparency laws. Standardized by GCP (Good Clinical Practice), ensuring every data point in your tracker is scientifically credible.
          </p>
        </div>
        <button className="whitespace-nowrap px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-xl transition-colors flex items-center group">
          Learn about GCP <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>
    </div>
  );
};

export default DomainKnowledge;
