// api.js
// This module is responsible for all communication with external services.

// FIX: Import the appData object to get access to the train configuration.
import { appData } from './app-data.js';

// Get a reference to the train config
const mtrApiConfig = appData.train;
let trainDataCache = {}; // The cache for API responses with timestamps
const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function fetchTrainSchedule(lineName, stationName) {
    console.log(`Attempting to fetch schedule for line: ${lineName}, station: ${stationName}`); // Debugging
    if (!lineName || !stationName) {
        console.error("fetchTrainSchedule requires both lineName and stationName.");
        return null;
    }
    // This function can now correctly reference mtrApiConfig
    const lineConfig = mtrApiConfig[lineName];
    if (!lineConfig || !lineConfig.stations[stationName]) {
        console.error("Invalid line or station for MTR API:", lineName, stationName);
        return null;
    }
    
    const lineCode = lineConfig.apiLineCode;
    const stationCode = lineConfig.stations[stationName];
    const cacheKey = `${lineCode}-${stationCode}`;
    const apiUrl = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}&lang=EN`;
    console.log("MTR API URL:", apiUrl); // Debugging: Log the API URL

    // Check if cached data exists and is not expired
    const cachedEntry = trainDataCache[cacheKey];
    if (cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_EXPIRY_TIME)) {
        console.log(`Returning cached data for ${cacheKey}`); // Debugging
        return cachedEntry.data;
    }
    console.log("No valid cache entry found, fetching from API."); // Debugging

    try {
        const response = await fetch(apiUrl);
        console.log("MTR API Response Status:", response.status); // Debugging: Log response status

        if (!response.ok) {
            console.error(`MTR API request failed with status: ${response.status}`);
            // On error, return cached data if available and log
            if (cachedEntry) {
                console.log(`Returning expired cached data on API error for ${cacheKey}`); // Debugging
                return cachedEntry.data;
            }
            return null;
        }
        const data = await response.json();
        console.log("MTR API Response Data:", data); // Debugging: Log full API response data

        if (data.status === 1 && data.data && data.data[cacheKey]) {
            console.log("Successfully fetched and received valid data."); // Debugging
            // Update cache with new data and timestamp
            trainDataCache[cacheKey] = {
                data: data.data[cacheKey],
                timestamp: Date.now()
            };
            return data.data[cacheKey];
        } else if (data.status === 0) {
            console.log("MTR API returned a special message.", data.message); // Debugging
            // Handle special messages from the API (e.g., service suspension)
             return { specialMessage: data.message, alertUrl: data.url }; 
        }
        console.log("MTR API data format unexpected."); // Debugging
        return null; // Return null if format is unexpected
    } catch (error) {
        console.error("Error fetching MTR schedule:", error);
        // On network error, return cached data if available
        if (cachedEntry) {
             console.log(`Returning cached data on network error for ${cacheKey}`); // Debugging
            return cachedEntry.data;
        }
        return null;
    }
}