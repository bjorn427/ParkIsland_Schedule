// script.js - REFACTORED
// This script initializes the app, manages state, and orchestrates calls to UI and utility modules.

import { appData } from './app-data.js';
import { appInfo } from './app-info.js';
import { CustomDropdown } from './custom-dropdown.js';
import * as utils from './utils.js';
import * as ui from './ui.js';

// --- GLOBAL STATE ---
let busDropdown, trainLineDropdown, trainStationDropdown;
let favBusDropdown, favTrainLineDropdown, favTrainStationDropdown, staticRouteDropdown;
let currentStaticScheduleType = 'weekday';
let trainDataCache = {};

// --- API FUNCTION ---
async function fetchTrainSchedule(lineName, stationName) {
    const lineConfig = appData.train[lineName];
    if (!lineConfig || !lineConfig.stations[stationName]) return null;
    const lineCode = lineConfig.apiLineCode;
    const stationCode = lineConfig.stations[stationName];
    const cacheKey = `${lineCode}-${stationCode}`;
    const apiUrl = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}&lang=EN`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) return trainDataCache[cacheKey] || null;
        const data = await response.json();
        if (data.status === 1 && data.data && data.data[cacheKey]) {
            trainDataCache[cacheKey] = data.data[cacheKey];
            return data.data[cacheKey];
        }
        return trainDataCache[cacheKey] || null;
    } catch (error) {
        console.error("Fetch train schedule error:", error);
        return trainDataCache[cacheKey] || null;
    }
}

// --- MAIN APP LOGIC ---
async function updateLiveSchedules() {
    if (!busDropdown || !trainLineDropdown || !trainStationDropdown) return;
    
    const now = new Date();
    ui.updateDateTimeDisplay(now);

    const routeName = busDropdown.getValue();
    const trainLineName = trainLineDropdown.getValue();
    const trainStationName = trainStationDropdown.getValue();
    
    // --- FIX: Logic to handle today's and tomorrow's schedules ---
    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const schedule = appData[transportType]?.[routeName];
    
    if (schedule) {
        // Determine day types for today and tomorrow
        const currentDayType = utils.getCurrentDayType(now);
        const tomorrowDate = new Date(now);
        tomorrowDate.setDate(now.getDate() + 1);
        const tomorrowDayType = utils.getCurrentDayType(tomorrowDate);

        // Get the schedule data for both days
        const todaysSchedule = schedule[currentDayType];
        const tomorrowsSchedule = schedule[tomorrowDayType];

        if (todaysSchedule) {
            document.getElementById('bus-direction1-name').textContent = todaysSchedule.direction1Name;
            document.getElementById('bus-direction2-name').textContent = todaysSchedule.direction2Name;
            
            // Parse HH:MM times for both days
            const dir1TimesToday = utils.parseScheduleJsonToHHMM(todaysSchedule.direction1Times);
            const dir2TimesToday = utils.parseScheduleJsonToHHMM(todaysSchedule.direction2Times);
            const dir1TimesTomorrow = utils.parseScheduleJsonToHHMM(tomorrowsSchedule?.direction1Times);
            const dir2TimesTomorrow = utils.parseScheduleJsonToHHMM(tomorrowsSchedule?.direction2Times);

            // Call the new, more powerful getNextArrivals function
            const dir1Arrivals = utils.getNextArrivals(dir1TimesToday, dir1TimesTomorrow, now);
            const dir2Arrivals = utils.getNextArrivals(dir2TimesToday, dir2TimesTomorrow, now);

            ui.renderArrivals(dir1Arrivals, document.getElementById('bus-direction1-times'));
            ui.renderArrivals(dir2Arrivals, document.getElementById('bus-direction2-times'));
        }
    }

    // Train logic remains the same as it's a live API call
    const trainLineConfig = appData.train[trainLineName];
    if (trainLineConfig && trainStationName) {
        document.getElementById('train-direction1-name').textContent = trainLineConfig.endpoint1NameForDisplay;
        document.getElementById('train-direction2-name').textContent = trainLineConfig.endpoint2NameForDisplay;
        document.getElementById('train-direction1-times').innerHTML = '<li class="loading-text text-sm">Loading...</li>';
        document.getElementById('train-direction2-times').innerHTML = '';
        const apiData = await fetchTrainSchedule(trainLineName, trainStationName);
        ui.renderTrainArrivals(apiData, trainLineConfig);
    }
}

// --- EVENT HANDLERS & CONTROLLERS ---

function handleTabSwitch(targetTab) {
    document.querySelectorAll('.content-pane').forEach(pane => pane.classList.toggle('active', pane.id === `${targetTab}-pane`));
    document.querySelectorAll('.bottom-nav-button').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === targetTab));
    if (targetTab === 'home') {
        updateLiveSchedules();
    } else if (targetTab === 'schedule') {
        handleStaticScheduleUpdate();
    }
}

function handleTrainLineChange(selectedLine) {
    const stations = Object.keys(appData.train[selectedLine]?.stations || {});
    trainStationDropdown.populate(stations);
    const defaultStation = appData.train[selectedLine]?.defaultStationName;
    if(defaultStation) trainStationDropdown.updateValue(defaultStation);
    updateLiveSchedules();
}

function handleFavTrainLineChange(selectedLine) {
    const stations = selectedLine !== "None" ? Object.keys(appData.train[selectedLine]?.stations || {}) : ["Select a line first"];
    favTrainStationDropdown.populate(stations);
}

function handleStaticScheduleUpdate() {
    if (!staticRouteDropdown) return;
    const selectedValueText = staticRouteDropdown.getValue();

    const staticRoutes = [];
     ['bus', 'ferry'].forEach(type => {
        Object.keys(appData[type]).forEach(routeName => {
            const route = appData[type][routeName].weekday;
            if (route) {
                staticRoutes.push({ text: `${routeName} | ${route.direction1Name}`, value: `${routeName}__direction1Times` });
                staticRoutes.push({ text: `${routeName} | ${route.direction2Name}`, value: `${routeName}__direction2Times` });
            }
        });
    });
    
    const selectedRoute = staticRoutes.find(r => r.text === selectedValueText);
    const selectedRouteAndDirection = selectedRoute ? selectedRoute.value : null;

    ui.displayStaticBusSchedule(selectedRouteAndDirection, currentStaticScheduleType);
}

function saveBusPreference() {
    const value = favBusDropdown.getValue();
    const saveValue = (value === "None" || !value) ? "" : value;
    const homeValue = (value === "None" || !value) ? "Tsing Yi <-> Park Island" : value;
    
    localStorage.setItem('favoriteBusRoute', saveValue);
    busDropdown.updateValue(homeValue);
    ui.showSettingsSavedMessage();
    updateLiveSchedules();
}

function saveTrainPreference() {
    const line = favTrainLineDropdown.getValue();
    const station = favTrainStationDropdown.getValue();

    localStorage.setItem('favoriteTrainLine', (line === "None" || !line) ? "" : line);
    localStorage.setItem('favoriteTrainStation', (station === "None" || station === "Select a line first" || !station) ? "" : station);

    ui.showSettingsSavedMessage();
    loadPreferences();
}

function loadPreferences() {
    const favBus = localStorage.getItem('favoriteBusRoute') || "Tsing Yi <-> Park Island";
    busDropdown.updateValue(favBus);
    
    const favTrainLine = localStorage.getItem('favoriteTrainLine') || Object.keys(appData.train)[0];
    trainLineDropdown.updateValue(favTrainLine);
    handleTrainLineChange(favTrainLine); 
    
    const favTrainStation = localStorage.getItem('favoriteTrainStation') || appData.train[favTrainLine]?.defaultStationName;
    if (favTrainStation) trainStationDropdown.updateValue(favTrainStation);

    favBusDropdown.updateValue(localStorage.getItem('favoriteBusRoute') || "None");
    const favTrainLineSetting = localStorage.getItem('favoriteTrainLine') || "None";
    favTrainLineDropdown.updateValue(favTrainLineSetting);
    handleFavTrainLineChange(favTrainLineSetting);
    favTrainStationDropdown.updateValue(localStorage.getItem('favoriteTrainStation') || "None");
    
    updateLiveSchedules();
}

// --- INITIALIZATION ---
function initializeDropdowns() {
    const busAndFerryRoutes = [...Object.keys(appData.bus), ...Object.keys(appData.ferry)];
    const trainLines = Object.keys(appData.train);
    
    busDropdown = new CustomDropdown('bus-route-dropdown-container', busAndFerryRoutes, updateLiveSchedules);
    trainLineDropdown = new CustomDropdown('train-line-dropdown-container', trainLines, handleTrainLineChange);
    trainStationDropdown = new CustomDropdown('train-station-dropdown-container', [], updateLiveSchedules);

    const staticRoutes = [];
    ['bus', 'ferry'].forEach(type => {
        Object.keys(appData[type]).forEach(routeName => {
            const route = appData[type][routeName].weekday;
            if (route) {
                staticRoutes.push({ text: `${routeName} | ${route.direction1Name}`, value: `${routeName}__direction1Times` });
                staticRoutes.push({ text: `${routeName} | ${route.direction2Name}`, value: `${routeName}__direction2Times` });
            }
        });
    });
    staticRouteDropdown = new CustomDropdown('static-bus-route-dropdown-container', staticRoutes.map(r => r.text), handleStaticScheduleUpdate);

    favBusDropdown = new CustomDropdown('favorite-bus-route-dropdown-container', ["None", ...busAndFerryRoutes]);
    favTrainLineDropdown = new CustomDropdown('favorite-train-line-dropdown-container', ["None", ...trainLines], handleFavTrainLineChange);
    favTrainStationDropdown = new CustomDropdown('favorite-train-station-dropdown-container', ["Select a line first"]);
}

function setupEventListeners() {
    document.querySelectorAll('.bottom-nav-button').forEach(button => {
        button.addEventListener('click', () => handleTabSwitch(button.dataset.tab));
    });

    document.getElementById('schedule-type-selector-container')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('schedule-type-segment')) {
            document.querySelector('#schedule-type-selector-container .active')?.classList.remove('active');
            e.target.classList.add('active');
            currentStaticScheduleType = e.target.dataset.scheduletype;
            handleStaticScheduleUpdate();
        }
    });

    document.getElementById('save-favorite-bus')?.addEventListener('click', saveBusPreference);
    document.getElementById('save-favorite-train')?.addEventListener('click', saveTrainPreference);
}

function initializeApp() {
    initializeDropdowns();
    setupEventListeners();
    ui.populateAboutInfo();
    loadPreferences();
    
    document.querySelector('.bottom-nav-button[data-tab="home"]')?.click();
    
    setInterval(updateLiveSchedules, 30000);
    setInterval(() => ui.updateDateTimeDisplay(new Date()), 1000);
}

document.addEventListener('DOMContentLoaded', initializeApp);

