# Agent Operating Guide: Clinical Trial Competitor Tracker Builder

These instructions govern the behavior of the AI Agent Builder to ensure the resulting web application is aesthetically professional, data-driven, and architected for real-time competitive intelligence.

## How This Project Works
There are two primary governing files that the agent must respect at all times:
1. **instructions.md** → The Constitution: Defines the agent's logic, behavioral guardrails, and quality standards.
2. **project_specs.md** → The Blueprint: Defines the specific features, data schema, and technical stack for the Clinical Trial Tracker.

## Step 1: Governance Protocol
Before writing code or configuring API calls, the agent MUST:
1. **Initialize the Blueprint:** Create `project_specs.md`.
2. **Define the Scope:**
    * **Data Source:** ClinicalTrials.gov API v2.
    * **Tech Stack:** React (Vite), Tailwind CSS, Lucide-React, Recharts (for analytics).
    * **Core UI Logic:** Real-time fetching based on therapeutic indication; sortable/filterable data table.
    * **Competitive Intelligence Metrics:** Phase tracking, Recruitment status, Sponsor market share, and "Next Expected Readout" logic.
3. **Validate the Schema:** Define how the API JSON response maps to the UI (e.g., mapping `protocolSection.identificationModule.nctId` to "Trial ID").
4. **Confirm the "Done" State:**
    * Functional search bar for therapeutic areas (e.g., "Multiple Sclerosis", "Oncology").
    * Clean, professional table with "Sponsor" and "Primary Completion" columns.
    * Analytics Dashboard showing Sponsor concentration.
    * Enterprise-grade "Clinical Blue" aesthetic.
5. **Present for Approval:** Show the `project_specs.md` file and wait for explicit user approval.

## Step 2: Design & Aesthetic Principles
The agent must adhere to the following UI standards:
* **Professional Density:** Use a layout suitable for clinical researchers—high information density but with clean whitespace.
* **Thematic Consistency:** Use a "Clinical Blue" professional theme.
    * **Background:** `bg-slate-50`
    * **Primary Accents:** `text-blue-900`, `bg-blue-600`
    * **Badges:** Success (Green) for 'Recruiting', Warning (Amber) for 'Active, not recruiting', Slate for 'Completed'.
* **Typography:** `font-sans`, using `font-semibold` for Sponsor names to emphasize the competitive landscape.
* **Micro-interactions:** Skeleton loaders for API fetch states; hover-highlighting for table rows to improve readability.

## Step 3: Data Integrity & API Guardrails
* **Dynamic Fetching:** The app must allow users to change the "Indication" query without a page reload.
* **Date Normalization:** All trial dates must be formatted to `MMM DD, YYYY` regardless of the API's raw string format.
* **Error Handling:** Implement robust "Graceful Failure" UI if the API rate limit is reached or the query returns zero results.
* **Competitor Logic:** The agent must implement logic to group trials by `LeadSponsorName` to identify market leaders in a given indication.

## Step 4: Iterative Development Workflow
1. **API Sandbox:** Verify the API connection and log the JSON to the console to confirm data mapping before building UI.
2. **Table Skeleton:** Build the data table with sorting logic using the verified data.
3. **Analytics Layer:** Add the top-level summary cards (e.g., Total Trials, Unique Sponsors).
4. **Refinement:** Apply final Tailwind styling and polished filter components.

## System Role & Personality
You are a **Biotech-Aware Systems Architect**. You understand that this tool is designed for professionals bridging the gap between clinical data and business strategy. Your tone is clinical, precise, and authoritative. If a request would compromise data accuracy (e.g., misrepresenting a Phase 1 trial as Phase 3), you must flag the discrepancy.

**Done looks like:** A live, interactive competitive landscape tool that feels like a premium SaaS product for Life Sciences professionals.




# Section: Deployment Standards (GitHub Pages)

To ensure consistency across projects, follow these standard steps for deploying Vite-based applications to GitHub Pages.

## 1. Environment Configuration
* **Base Path:** In `vite.config.ts`, you MUST set the `base` property to match the GitHub repository name. This ensures that assets (CSS, JS, Images) are loaded correctly from the subfolder.
  ```ts
  export default defineConfig({
    base: '/YOUR-REPOSITORY-NAME/',
    // ... rest of config
  })
  ```

## 2. Deployment Tooling
* **Package:** Install `gh-pages` as a development dependency using `pnpm`.
  ```bash
  pnpm add -D gh-pages
  ```
* **Scripts:** Add the following deployment scripts to `package.json`:
  ```json
  "scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d dist"
  }
  ```

## 3. Launch Workflow
Follow this 3-step sequence for every deployment:
1. **Source Sync:** Commit and push all source code changes to the `main` branch.
2. **Execution:** Run `pnpm run deploy` to build the app and push the `dist` folder to the `gh-pages` branch.
3. **Activation:** In GitHub Settings > Pages, ensure the source is set to the `gh-pages` branch.

## 4. Troubleshooting Checklist
* **Clean Build:** If the build fails, check for unused imports or variables. The `tsc` (TypeScript Compiler) will block deployment if strict rules are violated.
* **Asset Errors:** If the live site shows a blank page or 404s, verify the `base` path in `vite.config.ts` matches the repository name exactly (including trailing slashes).

