import { useState, useEffect, useCallback } from 'react';
import { fetchTrials } from '../services/trialService';

/**
 * Custom hook to manage clinical trial data state.
 * Handles fetching, loading, error states, and indication updates.
 * 
 * @returns {Object} - { trials, loading, error, indication, updateIndication, refresh }
 */
export const useTrials = (initialIndication = '') => {
  const [trials, setTrials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [indication, setIndication] = useState(initialIndication);

  /**
   * Fetches data from the trial service.
   */
  const loadTrials = useCallback(async (searchQuery) => {
    if (!searchQuery) {
      setTrials([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchTrials(searchQuery);
      setTrials(data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while fetching trials.');
      setTrials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Effect to trigger fetch when indication changes.
   */
  useEffect(() => {
    if (indication) {
      loadTrials(indication);
    }
  }, [indication, loadTrials]);

  /**
   * Updates the therapeutic indication to trigger a new fetch.
   * @param {string} newIndication 
   */
  const updateIndication = (newIndication) => {
    setIndication(newIndication);
  };

  /**
   * Manually refreshes the data for the current indication.
   */
  const refresh = () => {
    if (indication) {
      loadTrials(indication);
    }
  };

  return {
    trials,
    loading,
    error,
    indication,
    updateIndication,
    refresh
  };
};
