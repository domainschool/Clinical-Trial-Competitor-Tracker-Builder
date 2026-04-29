# Project Specification: Clinical Trial Competitor Tracker

## Project Overview
A high-fidelity, data-driven web application designed for life sciences professionals to track and analyze the competitive landscape of clinical trials in real-time.

## Tech Stack
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS (Vanilla CSS for custom components)
- **Icons:** Lucide-React
- **Charts/Analytics:** Recharts
- **Data Source:** ClinicalTrials.gov API v2

## Core Features
1. **Real-time Search:** Dynamic fetching of clinical trial data based on therapeutic indications (e.g., "Multiple Sclerosis", "Oncology").
2. **Competitive Intelligence Table:**
    - Columns: Trial ID (NCT Number), Study Title, Sponsor, Phase, Status, Primary Completion Date.
    - Sorting/Filtering: Users can sort by Sponsor, Phase, or Status.
3. **Analytics Dashboard:**
    - **Sponsor Concentration:** Visual representation of market share by sponsor.
    - **Trial Volume:** Total active vs. completed trials in the selected indication.
    - **Phase Distribution:** Breakdown of trials by phase (Phase 1-4).
4. **Detail View:** Deep dive into specific trials, highlighting "Next Expected Readout" logic based on completion dates.

## Data Mapping (ClinicalTrials.gov API v2)
| UI Field | API Path (JSON) |
| :--- | :--- |
| **Trial ID** | `protocolSection.identificationModule.nctId` |
| **Study Title** | `protocolSection.identificationModule.briefTitle` |
| **Sponsor** | `protocolSection.sponsorCollaboratorsModule.leadSponsor.name` |
| **Phase** | `protocolSection.designModule.phases` |
| **Status** | `protocolSection.statusModule.overallStatus` |
| **Primary Completion** | `protocolSection.statusModule.primaryCompletionDateStruct.date` |
| **Indication** | `protocolSection.conditionsModule.conditions` |

## UI/UX Design Standards
- **Theme:** "Clinical Blue" Enterprise Aesthetic
    - **Background:** Slate-50 (`#f8fafc`)
    - **Primary Accent:** Blue-600 (`#2563eb`)
    - **Text:** Blue-900 (`#1e3a8a`)
- **Professional Density:** High information density with clean whitespace, optimized for clinical researchers.
- **Micro-interactions:**
    - Skeleton loaders for data fetching.
    - Hover states for table rows.
    - Animated transitions between search queries.

## Definition of Done
- [ ] Functional search bar for therapeutic areas.
- [ ] Professional data table with sorting capability.
- [ ] Analytics dashboard with Sponsor market share visualization.
- [ ] Robust error handling for empty results or API limits.
- [ ] Mobile-responsive layout following the "Clinical Blue" theme.
