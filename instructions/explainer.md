# System Explainer: Clinical Trial Competitor Tracker

## 1. The Problem: "Data Fog" in Clinical Research
In the pharmaceutical and biotech industries, tracking competitors is critical but difficult. Raw data from government sources like **ClinicalTrials.gov** is:
- **Overwhelmingly Dense:** Thousands of trials with complex, deeply nested JSON structures.
- **Slow to Parse:** Professionals need instant answers on sponsor concentration and phase progression.
- **Lacking Context:** "NCT01234567" means nothing without an explanation of why that Phase 3 trial's completion date matters for market timing.

**TrialIntel** solves this by transforming raw API data into a high-fidelity competitive intelligence dashboard.

---

## 2. How the Application Works
The application follows a **"Fetch → Transform → Visualize"** pipeline:
1.  **Dynamic Input:** The user enters a therapeutic area (e.g., "Multiple Sclerosis").
2.  **Smart API Querying:** The app constructs a request to the ClinicalTrials.gov API v2, automatically applying professional filters (Phase 3 & Recruiting) using advanced `AREA[Phase]` search tags.
3.  **Data Normalization:** The system flattens the complex API response into a clean, developer-friendly object format.
4.  **State Management:** A custom React hook (`useTrials`) manages the lifecycle—handling loading states, errors, and real-time updates.
5.  **Intelligence Layer:** Components calculate market share and competitive metrics on-the-fly, presenting them via high-impact stat cards and sortable tables.

---

## 3. Project Structure
The codebase is architected for modularity and scalability:
```text
/src
├── components/          # UI Building Blocks
│   ├── AnalyticsHeader  # Summary stat cards (Total Trials, Market Leaders)
│   ├── TrialTable       # The competitive landscape data grid
│   └── DomainKnowledge  # Educational "Intelligence Hub" resource
├── hooks/               # Application Logic
│   └── useTrials.js     # The "Single Source of Truth" for trial data
├── services/            # Data Integration
│   └── trialService.js  # ClinicalTrials.gov API v2 communication
├── App.jsx              # Main Shell & Navigation
├── index.css            # "Clinical Blue" Design System
└── main.jsx             # Entry Point
```

---

## 4. Module Breakdown

### `trialService.js` (The Engine)
- **Role:** Communication with the external API.
- **Key Logic:** Implements the `fetchTrials` function. It uses `URLSearchParams` to build valid queries and includes a **Data Transformer** that converts the API's complex nested JSON into a flat object structure: `{ id, title, sponsor, completionDate, lastUpdated }`.

### `useTrials.js` (The Brain)
- **Role:** Global state management for clinical data.
- **Key Logic:** This custom hook encapsulates `useState` and `useEffect` to trigger API calls whenever the "Indication" changes. It exposes `loading` and `error` states so the UI can respond gracefully to network issues.

### `AnalyticsHeader.jsx` (The Analyst)
- **Role:** Real-time data processing.
- **Key Logic:** Uses `useMemo` to scan the list of trials and identify the **Top Sponsor** (Market Leader) and the number of **Unique Competitors**. This provides instant competitive context without the user needing to scroll through the table.

### `TrialTable.jsx` (The View)
- **Role:** High-density data presentation.
- **Key Logic:** Implements sorting for the "Last Updated" column and applies the **"Clinical Blue" Design System** via branded badges for Sponsors and recruitment status.

### `DomainKnowledge.jsx` (The Educator)
- **Role:** Professional context & onboarding.
- **Key Logic:** A modular educational page using a **Bento Box layout**. It bridges the gap for non-clinical tech professionals by explaining the business implications of trial phases and primary completion dates.

---

## 5. Technology Choices
- **React (Vite):** Chosen for lightning-fast HMR and component-based architecture.
- **Tailwind CSS v4:** Used for the "Clinical Blue" theme, providing a premium, enterprise-grade aesthetic without the bloat of traditional CSS frameworks.
- **Lucide-React:** Provides clinical and scientific iconography for a professional feel.
