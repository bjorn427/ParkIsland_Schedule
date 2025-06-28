// api.js
// This module is responsible for all communication with external services.

// FIX: Import the appData object to get access to the train configuration.
import { appData } from './app-data.js';

// Debugging flag
const DEBUG_API = true;

// Get a reference to the train config
const mtrApiConfig = appData.train;
let trainDataCache = {}; // The cache for API responses

export async function fetchTrainSchedule(lineName, stationName) {
 if (DEBUG_API) console.log(`[API Debug] Attempting to fetch schedule for line: ${lineName}, station: ${stationName}`);

 // Validate input
    const lineConfig = mtrApiConfig?.[lineName];
    if (!lineConfig || !lineConfig.stations[stationName]) {
 if (DEBUG_API) console.error(`[API Debug] Invalid line or station name provided: line=${lineName}, station=${stationName}`);
        return null;
    }

    const lineCode = lineConfig.apiLineCode;
    const stationCode = lineConfig.stations[stationName];
    const cacheKey = `${lineCode}-${stationCode}`;
    const apiUrl = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}&lang=EN`;

 if (DEBUG_API) console.log(`[API Debug] API URL: ${apiUrl}`);


    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error("MTR API request failed:", response.status);
            // On error, return cached data if available
            return trainDataCache[cacheKey] || null; 
        }
        const data = await response.json();
        if (data.status === 1 && data.data && data.data[cacheKey]) {
            // Update cache and return data
            trainDataCache[cacheKey] = data.data[cacheKey]; 
            return data.data[cacheKey];
        } else if (data.status === 0) {
            // Handle special messages from the API (e.g., service suspension)
             return { specialMessage: data.message, alertUrl: data.url }; 
        }
        return null; // Return null if format is unexpected
    } catch (error) {
        console.error("Error fetching MTR schedule:", error);
        // On network error, return cached data if available
        return trainDataCache[cacheKey] || null; 
    }
}
