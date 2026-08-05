'use client';

/**
 * lib/useSettings.js
 * Client-side hook that fetches /api/settings on mount and exposes:
 *  - fomoSettings   → { socialProof, exitIntent, scarcity, timerDuration, popupInterval }
 *  - noticeStrip    → { enabled, text }
 *  - isLaunched     → boolean (false = maintenance mode)
 *  - isLoading      → true while first fetch is in-flight
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getSettings, getSiteVersion } from './api';
import { FALLBACK_SETTINGS } from './fallbackData';

// Module-level cache so multiple component instances share one fetch
let cachedSettings = null;
let fetchPromise = null;

async function fetchSettings() {
  if (cachedSettings) return cachedSettings;
  if (fetchPromise) return fetchPromise;

  fetchPromise = getSettings()
    .then((data) => {
      cachedSettings = data || FALLBACK_SETTINGS;
      return cachedSettings;
    })
    .catch(() => FALLBACK_SETTINGS)
    .finally(() => {
      fetchPromise = null;
    });

  return fetchPromise;
}

export default function useSettings() {
  const [settings, setSettings] = useState(cachedSettings || FALLBACK_SETTINGS);
  const [isLoading, setIsLoading] = useState(!cachedSettings);
  const currentVersionRef = useRef(null);

  const load = useCallback(async () => {
    const data = await fetchSettings();
    setSettings(data);
    setIsLoading(false);

    // Expose fomoSettings globally so FOMO components can read it
    if (data?.fomo && typeof window !== 'undefined') {
      window.lrFomoSettings = data.fomo;
    }

    // Initialize site version for global refresh tracking
    if (data?.siteVersion !== undefined && currentVersionRef.current === null) {
      currentVersionRef.current = data.siteVersion;
    }
  }, []);

  useEffect(() => {
    load();

    // Site Version Polling (Global Force Refresh support)
    const checkVersion = async () => {
      try {
        const serverVersion = await getSiteVersion();
        if (serverVersion !== null) {
          if (currentVersionRef.current === null) {
            currentVersionRef.current = serverVersion;
          } else if (serverVersion !== currentVersionRef.current) {
            console.log(`Global Refresh Triggered! (Old: ${currentVersionRef.current}, New: ${serverVersion})`);
            window.location.reload();
          }
        }
      } catch (err) {
        // Silently fail version checks
      }
    };

    // Poll every 30 seconds
    const intervalId = setInterval(checkVersion, 30000);
    return () => clearInterval(intervalId);
  }, [load]);

  return {
    isLoading,

    /** Full settings object */
    settings: settings || FALLBACK_SETTINGS,

    /** FOMO feature toggles from admin dashboard */
    fomoSettings: settings?.fomo ?? FALLBACK_SETTINGS.fomo ?? {},

    /** { enabled: boolean, text: string } */
    noticeStrip: settings?.noticeStrip ?? { enabled: false, text: '' },

    /** false = site is in maintenance mode */
    isLaunched: settings?.isLaunched !== false, // default true so live site never breaks

    /** Force-refresh settings (e.g. after admin changes) */
    refresh: () => {
      cachedSettings = null;
      load();
    },
  };
}
