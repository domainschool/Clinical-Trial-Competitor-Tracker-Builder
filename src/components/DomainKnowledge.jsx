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
  ChevronRight,
  GitCommit
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

  const phases = [
    {
      phase: 'Phase 1',
      tag: 'Safety Profile',
      volunteers: '20–100 Healthy Patients',
      description: 'First in-human safety evaluation. Ensures the compound is non-toxic and establishes pharmacokinetic bounds before therapeutic testing.',
      icon: Zap,
      color: 'from-blue-600 to-indigo-600',
      badgeColor: 'bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300'
    },
    {
      phase: 'Phase 2',
      tag: 'Efficacy Proof',
      volunteers: '100–300 Volunteers',
      description: 'Dose-ranging exploration. Evaluates therapeutic efficacy and confirms the safety window. Often considered the "graveyard of biotech."',
      icon: Target,
      color: 'from-indigo-600 to-violet-600',
      badgeColor: 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300',
      highlight: true
    },
    {
      phase: 'Phase 3',
      tag: 'Confirmatory Efficacy',
      volunteers: '1,000–3,000+ Multi-Center',
      description: 'Pivotal comparative studies. Prove superiority or equivalence vs. standard-of-care. Successful readouts form the bedrock for FDA/EMA licensing.',
      icon: ShieldCheck,
      color: 'from-violet-600 to-fuchsia-600',
      badgeColor: 'bg-violet-100 dark:bg-violet-950/40 text-violet-800 dark:text-violet-300'
    },
    {
      phase: 'Phase 4',
      tag: 'Post-Market Safety',
      volunteers: 'Real-world Cohorts',
      description: 'Long-term pharmacovigilance. Tracks rare adverse effects and monitors patient outcomes across expanded real-world populations.',
      icon: Beaker,
      color: 'from-fuchsia-600 to-emerald-600',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
    }
  ];

  const filteredGlossary = glossary.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-6 space-y-12 animate-fade-in-up">
      {/* Immersive Landing Title */}
      <div className="text-center space-y-4 pt-8 max-w-3xl mx-auto">
        <span className="px-3 py-1 bg-clinical-blue-100 dark:bg-violet-950/50 text-clinical-blue-700 dark:text-violet-400 text-[10px] font-extrabold uppercase rounded tracking-wider border border-clinical-blue-200/20 dark:border-violet-800/20">
          Clinical Operations Core
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mt-2">
          Anatomy of Clinical Intelligence
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Demystifying the clinical lifecycle from pre-clinical discovery to post-approval compliance. A strategic roadmap tailored for life science researchers and investors.
        </p>
      </div>

      {/* Interactive Step Timeline (The 4 Phases) */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-200/60 dark:border-slate-800">
          <Beaker className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
            Clinical Phase Timeline & Milestones
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((item, index) => (
            <div 
              key={index} 
              className={`glass-card p-6 rounded-3xl border relative transition-all duration-300 flex flex-col justify-between hover-glow ${
                item.highlight 
                  ? 'border-indigo-500/50 dark:border-violet-500/40 shadow-indigo-500/5 dark:shadow-violet-950/20 bg-indigo-50/20 dark:bg-slate-900/30'
                  : 'border-slate-200/60 dark:border-slate-800/80 bg-white'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-lg border border-slate-200/10 ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                  
                  {/* Floating visual badge indicators */}
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 select-none">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-4 flex items-center">
                  <item.icon className="w-5 h-5 mr-2 text-indigo-500" />
                  {item.phase}
                </h3>
                <p className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                  {item.volunteers}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-4">
                  {item.description}
                </p>
              </div>
              
              {/* Connecting Node Line Decorator */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[9px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-600">
                <span>Gate {index + 1} Approved</span>
                <GitCommit className="w-3.5 h-3.5 text-indigo-500/40" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Bento Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Dynamics (Market Timing) */}
        <section className="bg-slate-950 text-white p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-3xl"></div>
          
          <div className="flex items-center space-x-2">
            <TrendingUp className="text-emerald-400 w-5 h-5" />
            <h2 className="text-base font-extrabold uppercase tracking-wider text-slate-200">
              Business Intelligence & Readout Milestones
            </h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            The <span className="text-white font-extrabold italic">Primary Completion Date</span> represents the pivotal "D-Day" of biotech assets. Upon date reach, double-blind codes are unsealed, driving binary regulatory reviews and immediate corporate valuations.
          </p>
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800/80">
            <h4 className="text-emerald-400 font-extrabold text-xs mb-2 uppercase tracking-wider flex items-center">
              <Zap className="w-4 h-4 mr-2" /> Strategic Competitor Alpha
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Positive readout cycles act as strategic multipliers, sending corporate stocks soaring up to 300%. Phase 3 failure cycles, however, trigger direct restructurings and instant clinical write-offs.
            </p>
          </div>
        </section>

        {/* Competitor Profiling */}
        <section className="glass-card bg-white p-8 rounded-3xl space-y-6 border border-slate-200/60 dark:border-slate-800 shadow-lg">
          <div className="flex items-center space-x-2">
            <ClipboardCheck className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
            <h2 className="text-base font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
              Corporate Competitor Matrix
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            Clinical trials are governed by two distinct classes of industry competitors:
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
              <div className="bg-clinical-blue-100 dark:bg-violet-950/40 px-2.5 py-1.5 rounded-xl text-clinical-blue-700 dark:text-violet-400 font-extrabold text-[10px] uppercase shadow-sm">
                Pharma
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-xs">Mega-cap Corporations ("Aircraft Carriers")</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5">Focus on commercial scaling, regulatory dominance, and high portfolio acquisitions.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
              <div className="bg-indigo-100 dark:bg-indigo-950/40 px-2.5 py-1.5 rounded-xl text-indigo-700 dark:text-indigo-400 font-extrabold text-[10px] uppercase shadow-sm">
                Biotech
              </div>
              <div>
                <p className="text-slate-900 dark:text-white font-bold text-xs">Agile Clinical Entrants ("Speedboats")</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mt-0.5">High innovation focus. Capital-dependent entities. Success-driven or binary insolvency.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Advanced Interactive Glossary Widget */}
      <section className="bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-slate-200/60 dark:border-slate-800">
          <div className="space-y-1">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center uppercase tracking-wider">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
              Landscape Operations Glossary
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
              Crucial definitions translating complex clinical datasets into strategic decision-making.
            </p>
          </div>
          
          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search glossary terms..." 
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-2 focus:ring-indigo-500/20 outline-none text-slate-950 dark:text-slate-100 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGlossary.map((item, index) => (
            <div key={index} className="glass-card bg-white p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col justify-between hover:border-indigo-500/30 transition-colors shadow-sm">
              <div>
                <h4 className="text-slate-900 dark:text-white font-extrabold text-xs flex items-center justify-between">
                  {item.term}
                  <Info className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700" />
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed mt-2">{item.definition}</p>
              </div>
              
              <div className="pt-3 border-t border-slate-50 dark:border-slate-800/40 mt-4">
                <span className="text-[8px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                  Simple Analogy:
                </span>
                <p className="text-[10px] font-bold text-slate-600 dark:text-slate-300 italic mt-0.5">
                  {item.analogy}
                </p>
              </div>
            </div>
          ))}
        </div>
        {filteredGlossary.length === 0 && (
          <div className="text-center py-12 text-slate-400 dark:text-slate-500 italic text-xs">
            No terms matched search criteria.
          </div>
        )}
      </section>

      {/* Regulatory Standard Banner */}
      <section className="glass-card bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 shadow-md">
        <div className="bg-gradient-to-tr from-clinical-blue-600 to-indigo-500 p-4 rounded-2xl text-white shadow-md">
          <Scale className="w-6 h-6" />
        </div>
        <div className="flex-1 space-y-1.5 text-center md:text-left">
          <h3 className="text-slate-900 dark:text-white font-extrabold text-base uppercase tracking-wider">
            Regulatory Compliance: FDA & EMA Mandates
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
            The data populated in this clinical tracker exists under FDAAA 801 transparency laws. Standardized under GCP (Good Clinical Practice) guidelines, ensuring scientific rigor and ethical validation across every competitive endpoint monitored in your platform.
          </p>
        </div>
        <a 
          href="https://www.fda.gov/science-research/clinical-trials-and-human-subject-protection"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap px-5 py-2.5 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200/40 dark:border-slate-800/40 flex items-center group shadow-sm cursor-pointer"
        >
          Regulatory Portal <ChevronRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </section>
    </div>
  );
};

export default DomainKnowledge;
