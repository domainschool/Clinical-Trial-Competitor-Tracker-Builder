import React, { useState } from 'react';
import { 
  HelpCircle, 
  Activity, 
  Database, 
  BookOpen, 
  TrendingUp, 
  Code, 
  Copy, 
  Check, 
  Settings, 
  DollarSign, 
  GraduationCap, 
  Users, 
  Layers, 
  ArrowRight, 
  ChevronRight, 
  Info, 
  Server, 
  Cpu,
  Flame,
  Award,
  Calendar,
  AlertTriangle
} from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [pipelineMode, setPipelineMode] = useState('trialintel'); // 'traditional' or 'trialintel'
  const [apiInspectMode, setApiInspectMode] = useState('normalized'); // 'raw' or 'normalized'
  const [copiedState, setCopiedState] = useState({
    tier1: false,
    tier2: false,
    tier3: false
  });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedState(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedState(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const menuItems = [
    { id: 'concept', label: 'Problem & Core Concept', icon: HelpCircle },
    { id: 'knowledge', label: 'Required Domain Knowledge', icon: BookOpen },
    { id: 'pipeline', label: 'Data Pipeline & Transforms', icon: Server },
    { id: 'stakeholders', label: 'Stakeholders & Personas', icon: Users },
    { id: 'valuation', label: 'Commercial Valuations', icon: DollarSign },
    { id: 'strategy', label: 'College & Resume Strategy', icon: GraduationCap },
    { id: 'prompts', label: 'AI Vibe-Coding Prompts', icon: Code },
    { id: 'enhancements', label: 'Further Enhancements', icon: Settings },
  ];

  // Prompt definitions
  const promptsText = {
    tier1: `Create a React application using Vite and Tailwind CSS. Design a clean, data-dense clinical trials dashboard layout called "TrialIntel" following a professional "Clinical Blue" color scheme (deep blue headers, slate backgrounds, and colored badges for recruitment status). Start by using local mock trial data representing at least 10 Phase 3 trials with attributes: Trial ID (NCT number), Title, Sponsor, Phase, Status, and Primary Completion Date. Build a search input for therapeutic indication, and implement a data table with sortable columns. Include a toggle for dark/light mode and support professional-looking responsive design.`,
    tier2: `Now replace the mock data layer with a real-time connection to the public ClinicalTrials.gov API v2. Implement a dedicated service file "trialService.js" containing a "fetchTrials" function that builds queries using URLSearchParams, filtering for Phase 3 and Recruiting trials using the AREA[OverallStatus] and AREA[Phase] fields. Write a robust data normalizer inside this service to flatten the nested API response JSON structure (e.g. mapping protocolSection.identificationModule.nctId to 'id', protocolSection.sponsorCollaboratorsModule.leadSponsor.name to 'sponsor', etc.) into a simple, flat object format. Create a custom React hook "useTrials.js" to encapsulate loading, error, and dynamic fetching states. If the search query returns zero trials, show a helpful empty state, and if there is a network error, display a clean error alert with a retry button.`,
    tier3: `Enhance the TrialIntel dashboard by building an advanced Analytics layer. Create a component "AnalyticsHeader.jsx" that calculates key competitive metrics on-the-fly using useMemo: total trial count, number of unique sponsors (competitors), the "Market Leader" sponsor (the sponsor with the most active trials in the indication), and the percentage of trials completing in the next 12 months. Visualize these metrics using high-fidelity elements: a horizontal bar chart displaying the Top 5 sponsors by trial concentration, and a Phase breakdown distribution bar graph. Add a detailed deep-dive "TrialDetailModal" overlay when a table row is clicked, calculating a "Next Expected Readout" classification. Finally, implement a functional "Export CSV" feature to download the filtered and normalized dataset.`
  };

  return (
    <div className="max-w-[1500px] mx-auto p-4 md:p-6 space-y-6 animate-fade-in-up">
      {/* Immersive Branding Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/60 dark:border-slate-800/80 gap-4">
        <div>
          <span className="px-2.5 py-0.5 bg-clinical-blue-100 dark:bg-violet-950/40 text-clinical-blue-700 dark:text-violet-400 text-[10px] font-extrabold uppercase rounded tracking-wider border border-clinical-blue-200/20 dark:border-violet-800/20">
            System Guide & Architecture
          </span>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mt-1.5">
            Learning Deck & Architecture Blueprint
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
            Detailed educational breakdown of TrialIntel development, commercial valuations, and domain metrics.
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm self-start md:self-auto">
          <Cpu className="w-4 h-4 text-clinical-blue-600 dark:text-violet-400" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Platform Blueprint v1.0
          </span>
        </div>
      </div>

      {/* Two-Column Deck Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2 lg:sticky lg:top-24">
          <div className="glass-card p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 space-y-1">
            <p className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 py-1.5">
              Deck Navigation
            </p>
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-clinical-blue-600/10 to-indigo-500/10 text-clinical-blue-700 dark:text-violet-400 border-l-4 border-clinical-blue-600 dark:border-violet-500 font-extrabold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-800/30'
                }`}
              >
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-clinical-blue-600 dark:text-violet-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Deck */}
        <main className="lg:col-span-9">
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-lg min-h-[600px] flex flex-col justify-between">
            <div>
              {/* Render Tab Contents */}

              {/* 1. Problem & Core Concept */}
              {activeTab === 'concept' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <HelpCircle className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      The Business Problem: "Data Fog" in Clinical Research
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    In the highly competitive pharmaceutical and biotech sectors, tracking competitor drug development programs is a multi-million dollar necessity. While clinical registries like <strong>ClinicalTrials.gov</strong> are publicly accessible, they suffer from three major issues:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider mb-2 text-indigo-600 dark:text-indigo-400">
                        1. Overwhelming Density
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Data is embedded deep within deeply nested, unflattened JSON structures spanning thousands of registries.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider mb-2 text-indigo-600 dark:text-indigo-400">
                        2. Slow to Parse
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Research teams manually query, download, and paste clinical study details into slow-moving spreadsheets.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider mb-2 text-indigo-600 dark:text-indigo-400">
                        3. Lacking Context
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        A trial identifier (NCT number) is useless without calculating competitor market share and date catalyst write-ups on the fly.
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    <strong>TrialIntel</strong> bridges this gap. It aggregates registry listings in real-time, focusing specifically on late-stage active pipelines (Phase 3, Recruiting) to filter out clinical noise and provide actionable competitive dashboards.
                  </p>

                  {/* Interactive Pipeline Simulator */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 mt-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5 border-b border-slate-200/30 dark:border-slate-800/40 pb-4">
                      <div>
                        <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center">
                          <Activity className="w-4 h-4 mr-1.5 text-indigo-500 animate-pulse" />
                          Simulate Competitor Intelligence Pipeline
                        </h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          Toggle methods to compare time-to-insight and decision speed.
                        </p>
                      </div>
                      
                      <div className="flex bg-slate-200/60 dark:bg-slate-800/80 p-0.5 rounded-lg border border-slate-200/10">
                        <button
                          onClick={() => setPipelineMode('traditional')}
                          className={`px-3 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-tight transition-all cursor-pointer ${
                            pipelineMode === 'traditional'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          Traditional Data Fog
                        </button>
                        <button
                          onClick={() => setPipelineMode('trialintel')}
                          className={`px-3 py-1 text-[10px] font-extrabold rounded-md uppercase tracking-tight transition-all cursor-pointer ${
                            pipelineMode === 'trialintel'
                              ? 'bg-gradient-to-r from-clinical-blue-600 to-indigo-600 text-white shadow-sm'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          TrialIntel Pipeline
                        </button>
                      </div>
                    </div>

                    {pipelineMode === 'traditional' ? (
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                          <div className="flex-1 p-3.5 bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 rounded-xl">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-500 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded">
                              Step 1
                            </span>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white mt-1.5">Manual Querying</h5>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Search registries, download CSV files, clean header formats (1-2 Hours).</p>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 rotate-90 md:rotate-0" />
                          
                          <div className="flex-1 p-3.5 bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 rounded-xl">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-500 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded">
                              Step 2
                            </span>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white mt-1.5">Raw Spreadsheet Fog</h5>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Filter for Phase 3 and Recruiting trials by hand. Calculate share ratios (1 Hour).</p>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-700 rotate-90 md:rotate-0" />
                          
                          <div className="flex-1 p-3.5 bg-red-500/5 dark:bg-red-950/20 border border-red-500/20 rounded-xl">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-500 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded">
                              Outcomes
                            </span>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white mt-1.5">Outdated Strategy</h5>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Reports are historical. Miss competitor status shifts and primary endpoint readouts.</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-red-500/80 font-bold italic mt-2 text-center md:text-left">
                          * Traditional competitive analysis suffers from a 30-40% delay in updating competitor profiles because registries lack automated aggregation and visualization.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                          <div className="flex-1 p-3.5 bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-500 bg-indigo-100 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                              Step 1
                            </span>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white mt-1.5">Single Search Input</h5>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">User types indication (e.g., "Alzheimer"). App handles queries instantly.</p>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-emerald-500 rotate-90 md:rotate-0" />
                          
                          <div className="flex-1 p-3.5 bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-500 bg-indigo-100 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                              Step 2
                            </span>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white mt-1.5">Automated Transform</h5>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Deep nested JSON is normalized, filtering for Phase 3/Recruiting (Milliseconds).</p>
                          </div>
                          
                          <ArrowRight className="w-4 h-4 text-emerald-500 rotate-90 md:rotate-0" />
                          
                          <div className="flex-1 p-3.5 bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-500 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded">
                              Active State
                            </span>
                            <h5 className="text-xs font-black text-slate-900 dark:text-white mt-1.5">Real-time Insights</h5>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">Sponsor concentration metrics and expected readouts mapped out instantly.</p>
                          </div>
                        </div>
                        <p className="text-[10px] text-emerald-500 font-bold italic mt-2 text-center md:text-left">
                          ✓ TrialIntel users experience zero lag. Real-time API connection flattens complex structures, providing a decisive strategic advantage.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 2. Required Domain Knowledge */}
              {activeTab === 'knowledge' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <BookOpen className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Required Domain Knowledge & Key Terms
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    To successfully build or understand this application, a developer or researcher needs a solid foundation in clinical trial vocabulary and registry rules. Here are the core concepts:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800/80">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center">
                        <Award className="w-4 h-4 mr-2 text-indigo-500" />
                        Sponsor & Sponsor Type
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        The <strong>Sponsor</strong> is the entity (pharmaceutical company, biotech startup, academic institution, or government agency) responsible for funding, initiating, and managing the clinical study. 
                        In competitive tracking, identifying the top sponsors reveals which companies dominate a therapeutic landscape.
                      </p>
                      <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mt-2">
                        Analogy: The project investor and venture capital backer.
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800/80">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
                        Primary Completion Date & Catalysts
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        The <strong>Primary Completion Date</strong> is the date when the final participant in a clinical trial was examined or received intervention to collect data for the primary outcome measure. 
                        When this date arrives, double-blind study results are unsealed. In the industry, this represents a major <strong>binary catalyst</strong>: positive data can double a company's valuation, while negative results can destroy it.
                      </p>
                      <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mt-2">
                        Analogy: D-Day or Final Exam Score Release.
                      </div>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800/80">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-indigo-500" />
                        Why Phase 3 & Recruiting Focus?
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Clinical trials are run in sequential phases (Phases 1 to 4). Phase 3 trials are large-scale, comparative studies (1,000 to 3,000+ patients) designed to confirm efficacy and monitor adverse reactions. 
                        Successful Phase 3 trials lead directly to FDA approval applications. By filtering specifically for <strong>Phase 3</strong> trials that are <strong>Recruiting</strong>, TrialIntel highlights the most immediate, imminent go-to-market competitive threats.
                      </p>
                      <div className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mt-2">
                        Clinical Rule: Phase 3 constitutes the absolute baseline for commercial regulatory approval.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Data Pipeline & Transforms */}
              {activeTab === 'pipeline' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Server className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      High-Level Data Flow & Normalization
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    TrialIntel operates on a clean <strong>Fetch → Transform → Visualize</strong> pipeline. Below is a breakdown of how messy API payloads are mapped into clean React component states.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-100/50 dark:bg-slate-900/20 rounded-2xl border border-slate-200/60 dark:border-slate-800">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                        Transformation Mapping Schema
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-[11px] text-left border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-400">
                              <th className="pb-2">UI Display Field</th>
                              <th className="pb-2">API Path (JSON Payload)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40">
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Trial ID</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.identificationModule.nctId</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Study Title</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.identificationModule.briefTitle</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Sponsor</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.sponsorCollaboratorsModule.leadSponsor.name</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Phase</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.designModule.phases</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Status</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.statusModule.overallStatus</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Primary Completion</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.statusModule.primaryCompletionDateStruct.date</td>
                            </tr>
                            <tr>
                              <td className="py-2 text-indigo-600 dark:text-indigo-400 font-bold">Last Updated</td>
                              <td className="py-2 font-mono text-slate-600 dark:text-slate-400">protocolSection.statusModule.lastUpdateSubmitDate</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Interactive Transform Inspector */}
                    <div className="bg-slate-900 text-slate-300 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center space-x-2">
                          <Code className="w-4 h-4 text-violet-400" />
                          <span className="text-xs font-bold text-white uppercase tracking-wider">API Payload Transformer</span>
                        </div>
                        <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                          <button
                            onClick={() => setApiInspectMode('raw')}
                            className={`px-2 py-0.5 text-[9px] font-extrabold rounded uppercase cursor-pointer ${
                              apiInspectMode === 'raw'
                                ? 'bg-slate-700 text-white'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Raw API Payload (JSON)
                          </button>
                          <button
                            onClick={() => setApiInspectMode('normalized')}
                            className={`px-2 py-0.5 text-[9px] font-extrabold rounded uppercase cursor-pointer ${
                              apiInspectMode === 'normalized'
                                ? 'bg-slate-700 text-white'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Normalized State
                          </button>
                        </div>
                      </div>

                      {apiInspectMode === 'raw' ? (
                        <pre className="text-[10px] font-mono leading-relaxed max-h-48 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-emerald-400">
{`{
  "protocolSection": {
    "identificationModule": {
      "nctId": "NCT04567890",
      "briefTitle": "Efficacy of Drug X in Relapsing MS"
    },
    "sponsorCollaboratorsModule": {
      "leadSponsor": {
        "name": "Novartis Pharmaceuticals"
      }
    },
    "designModule": {
      "phases": ["PHASE3"]
    },
    "statusModule": {
      "overallStatus": "RECRUITING",
      "primaryCompletionDateStruct": {
        "date": "2027-08-30"
      },
      "lastUpdateSubmitDate": "2026-07-12"
    }
  }
}`}
                        </pre>
                      ) : (
                        <pre className="text-[10px] font-mono leading-relaxed max-h-48 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800 text-indigo-400">
{`{
  "id": "NCT04567890",
  "title": "Efficacy of Drug X in Relapsing MS",
  "sponsor": "Novartis Pharmaceuticals",
  "phase": "Phase 3",
  "status": "Recruiting",
  "completionDate": "Aug 30, 2027",
  "lastUpdated": "Jul 12, 2026"
}`}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Stakeholders & Personas */}
              {activeTab === 'stakeholders' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Users className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Stakeholders & User Personas
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    This platform serves several target users in the life sciences space. Here is how they interact with TrialIntel to drive commercial success:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-clinical-blue-100 dark:bg-violet-950/40 text-clinical-blue-700 dark:text-violet-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-slate-200/10">
                          Persona 1
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
                          Biotech Business Development (BD) Executive
                        </h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        <strong>Workflow:</strong> Scans indications for top sponsors. If a specific mid-cap biotech represents the only competitor in a lucrative therapy block, they initiate partnership discussions, licensing proposals, or M&A (Mergers and Acquisitions) planning.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-slate-200/10">
                          Persona 2
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
                          Clinical Operations Director
                        </h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        <strong>Workflow:</strong> Evaluates competitor recruitment speeds. By examining the date metrics, they assess whether regions or sites are oversaturated, and adjust their own site selection and patient enrolment timelines accordingly to prevent delays.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border border-slate-200/10">
                          Persona 3
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
                          Equity Research Analyst & Biotech Investor
                        </h4>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        <strong>Workflow:</strong> Monitors Primary Completion dates for binary catalysts. Because stock valuations can swing wildly on Phase 3 data unsealing, analysts track competitor completion dates closely to hedge options and format buy/sell recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Commercial Valuations */}
              {activeTab === 'valuation' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <DollarSign className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Commercial Software Valuation Analysis
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    What would an external clinical software consulting company charge to design, build, and deploy an application like TrialIntel? Because biotech engineering requires niche domain competence, standard commercial agency rates range from <strong>$150 to $250 / hour</strong>.
                  </p>

                  <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/60 dark:border-slate-800/80">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      Valuation Breakdown Matrix
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 font-extrabold text-slate-400 text-[10px] uppercase tracking-wider">
                            <th className="pb-2">Development Phase</th>
                            <th className="pb-2 text-right">Est. Cost Range</th>
                            <th className="pb-2 text-right">Duration</th>
                            <th className="pb-2 pl-4">Core Deliverables</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200/40 dark:divide-slate-800/40 text-slate-600 dark:text-slate-350">
                          <tr>
                            <td className="py-2.5 font-bold text-slate-900 dark:text-white">UX Design & Blueprinting</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-500">$15,000 - $25,000</td>
                            <td className="py-2.5 text-right">2-3 Weeks</td>
                            <td className="py-2.5 pl-4 text-[11px]">Figma wireframes, custom "Clinical Blue" design system tokens.</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-900 dark:text-white">Core Frontend Engineering</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-500">$25,000 - $40,000</td>
                            <td className="py-2.5 text-right">4-6 Weeks</td>
                            <td className="py-2.5 pl-4 text-[11px]">React layout, custom hooks, dynamic table controls, theme logic.</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-900 dark:text-white">API Integration & Transform</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-500">$10,000 - $15,000</td>
                            <td className="py-2.5 text-right">2 Weeks</td>
                            <td className="py-2.5 pl-4 text-[11px]">trialService.js pipeline, URL query formatting, error retry structures.</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-900 dark:text-white">Compliance, Security & QA</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-500">$8,000 - $12,000</td>
                            <td className="py-2.5 text-right">2 Weeks</td>
                            <td className="py-2.5 pl-4 text-[11px]">Good Clinical Practice audit, cross-device QA, CSV download integrity.</td>
                          </tr>
                          <tr>
                            <td className="py-2.5 font-bold text-slate-900 dark:text-white">DevOps & Hosting Deploy</td>
                            <td className="py-2.5 text-right font-semibold text-emerald-500">$5,000 - $8,000</td>
                            <td className="py-2.5 text-right">1 Week</td>
                            <td className="py-2.5 pl-4 text-[11px]">GitHub pages deployment pipeline, build optimizations.</td>
                          </tr>
                          <tr className="bg-slate-100/50 dark:bg-slate-900 font-extrabold text-slate-900 dark:text-white border-t border-slate-300 dark:border-slate-700">
                            <td className="py-3.5">Total Valuation Estimate</td>
                            <td className="py-3.5 text-right text-emerald-500">$63,000 - $100,000</td>
                            <td className="py-3.5 text-right">11-14 Weeks</td>
                            <td className="py-3.5 pl-4 text-[11px]">Production-Ready Competitive Intelligence Suite.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. College & Resume Strategy */}
              {activeTab === 'strategy' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <GraduationCap className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      College & Resume Differentiator Strategy
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Most students list generic projects on their resumes—such as simple weather applications or to-do lists. TrialIntel sets you apart because it solves a <strong>niche, high-stakes business problem</strong> using advanced data methods. Here is how to position it:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <div className="bg-clinical-blue-100 dark:bg-violet-950/40 p-2.5 rounded-xl text-clinical-blue-700 dark:text-violet-400 flex-shrink-0">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
                          1. Highlight Niche Domain Competency
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                          Emphasize that this is a <strong>Biotech-specific tool</strong>. Demonstrating that you understand concepts like lead sponsors, Phase 3 pivots, and primary completion dates shows recruiters that you can contribute directly to complex commercial projects.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <div className="bg-indigo-100 dark:bg-indigo-950/40 p-2.5 rounded-xl text-indigo-700 dark:text-indigo-400 flex-shrink-0">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
                          2. Frame as a Data Engineering Challenge
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                          Explain how you built a custom service layer that parses and flattens a deeply nested, irregular Government JSON API. Standardizing dates and handling complex data formats is a key capability sought in modern software roles.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800">
                      <div className="bg-emerald-100 dark:bg-emerald-950/40 p-2.5 rounded-xl text-emerald-700 dark:text-emerald-400 flex-shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-950 dark:text-white uppercase tracking-wider">
                          3. Perfect for Interdisciplinary College Tracks
                        </h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mt-1">
                          If you are applying to competitive university programs, this project is perfect for showing <strong>dual competency</strong> (e.g. Computer Science + Bioinformatics or CS + Finance/Business Admin), making your application highly unique.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 7. AI Vibe-Coding Prompts */}
              {activeTab === 'prompts' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Code className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Sequential Prompts to Build the App
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Copy and run these sequential prompt structures inside a vibe-coding assistant (such as Antigravity) to design, integrate, and scale TrialIntel:
                  </p>

                  <div className="space-y-6">
                    {/* Tier 1 */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800/80 relative">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-200/30 dark:border-slate-800/40 pb-2">
                        <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center">
                          <span className="w-2.5 h-2.5 bg-clinical-blue-500 rounded-full mr-2"></span>
                          Tier 1: MVP Layout & Local Mock Data
                        </h4>
                        <button
                          onClick={() => handleCopy(promptsText.tier1, 'tier1')}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer active:scale-95 transition-all"
                        >
                          {copiedState.tier1 ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-relaxed italic bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200/10 shadow-inner">
                        "{promptsText.tier1}"
                      </p>
                    </div>

                    {/* Tier 2 */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800/80 relative">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-200/30 dark:border-slate-800/40 pb-2">
                        <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center">
                          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full mr-2"></span>
                          Tier 2: Real-time API Transforms
                        </h4>
                        <button
                          onClick={() => handleCopy(promptsText.tier2, 'tier2')}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer active:scale-95 transition-all"
                        >
                          {copiedState.tier2 ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-relaxed italic bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200/10 shadow-inner">
                        "{promptsText.tier2}"
                      </p>
                    </div>

                    {/* Tier 3 */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800/80 relative">
                      <div className="flex items-center justify-between mb-3 border-b border-slate-200/30 dark:border-slate-800/40 pb-2">
                        <h4 className="text-xs font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center">
                          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2"></span>
                          Tier 3: Advanced Analytics & Export
                        </h4>
                        <button
                          onClick={() => handleCopy(promptsText.tier3, 'tier3')}
                          className="flex items-center space-x-1 px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 text-[10px] font-bold rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer active:scale-95 transition-all"
                        >
                          {copiedState.tier3 ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                              <span>Copy Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-relaxed italic bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200/10 shadow-inner">
                        "{promptsText.tier3}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 8. Further Enhancements */}
              {activeTab === 'enhancements' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <Settings className="text-clinical-blue-600 dark:text-violet-400 w-5 h-5" />
                    <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Commercial Enhancements & Roadmap
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    To transition TrialIntel from a developer prototype into a commercial SaaS platform, the following features would be implemented in a live production environment:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800 hover:border-clinical-blue-500/25 transition-colors">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 text-clinical-blue-600 dark:text-violet-400">
                        🚀 1. AI-Powered Completion Forecasting
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Rather than displaying estimated primary completion dates literally, train a machine learning model on historical trial delays. Incorporate parameters like sponsor historical accuracy, clinical study sites, and indication to forecast actual readout timelines.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800 hover:border-clinical-blue-500/25 transition-colors">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 text-clinical-blue-600 dark:text-violet-400">
                        🔔 2. Automated Alerts & Trigger Feeds
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Add webhooks and alerting platforms (Slack/Email integration). Notify clinical directors immediately when a competitor shifts their recruiting status or submits major clinical protocol modifications.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800 hover:border-clinical-blue-500/25 transition-colors">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 text-clinical-blue-600 dark:text-violet-400">
                        🗺 3. Geographic Site Mapping
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Query geographical coordinator fields from the registry. Render an interactive map detailing competitor study center concentrations globally to find regional recruitment hotspots and optimize site selection.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/20 dark:border-slate-800 hover:border-clinical-blue-500/25 transition-colors">
                      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 text-clinical-blue-600 dark:text-violet-400">
                        📊 4. Portfolio Pipeline Overlay
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                        Allow research organizations to upload their own pipeline products. Project their internal drug development timeline directly alongside competitors to analyze market entry risks and benchmark trial metrics.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status Tag */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 font-extrabold uppercase tracking-widest gap-2">
              <span className="flex items-center">
                <Info className="w-3.5 h-3.5 mr-1 text-clinical-blue-600 dark:text-violet-400" />
                Select sidebar options to explore blueprint layers
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">
                Domain School Blueprint Series
              </span>
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default AboutPage;
