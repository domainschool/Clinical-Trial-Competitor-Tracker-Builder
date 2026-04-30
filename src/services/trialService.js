/**
 * Clinical Trial API Service (API v2)
 * Handles communication with ClinicalTrials.gov and data normalization.
 */

const BASE_URL = 'https://clinicaltrials.gov/api/v2/studies';

/**
 * Transforms the complex API v2 nested JSON response into a flattened, clean object.
 * @param {Object} study - The raw study object from the API response.
 * @returns {Object} - Flattened trial object.
 */
export const transformTrialData = (study) => {
  const protocol = study.protocolSection || {};
  
  return {
    id: protocol.identificationModule?.nctId || 'N/A',
    title: protocol.identificationModule?.briefTitle || 'Untitled Study',
    sponsor: protocol.sponsorCollaboratorsModule?.leadSponsor?.name || 'Unknown Sponsor',
    phase: protocol.designModule?.phases?.join(', ') || 'N/A',
    status: protocol.statusModule?.overallStatus || 'Unknown',
    completionDate: protocol.statusModule?.primaryCompletionDateStruct?.date || 'N/A',
    lastUpdated: protocol.statusModule?.lastUpdatePostDateStruct?.date || 'N/A',
    description: protocol.descriptionModule?.detailedDescription || protocol.descriptionModule?.briefSummary || 'No description available.',
    eligibility: protocol.eligibilityModule?.eligibilityCriteria || 'No criteria specified.',
    arms: protocol.armsInterventionsModule?.armGroups?.map(arm => ({
      label: arm.label,
      description: arm.description,
      interventions: arm.interventionNames
    })) || []
  };
};

/**
 * Fetches clinical trials based on a therapeutic indication.
 * Filters for Phase 3 and Recruiting trials by default.
 * @param {string} indication - The therapeutic area or condition to search for.
 * @returns {Promise<Array>} - A promise that resolves to an array of transformed trial objects.
 */
export const fetchTrials = async (indication) => {
  if (!indication) return [];

  const params = new URLSearchParams({
    'query.term': `${indication} AREA[Phase]PHASE3`,
    'filter.overallStatus': 'RECRUITING',
    'pageSize': '50',
  });

  const url = `${BASE_URL}?${params.toString()}`;
  console.log('Fetching trials from:', url);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.studies) return [];

    // Map the studies through the transformer
    return data.studies.map(transformTrialData);
  } catch (error) {
    console.error('Failed to fetch clinical trials:', error);
    throw error;
  }
};
