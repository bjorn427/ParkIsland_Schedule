// script.js - FINAL AND COMPLETE (Fixed Schedule Tab Defaults)

// --- MODULES & CONFIG ---
import { appData } from './app-data.js';
import { parseScheduleJsonToHHMM, getCurrentDayType, formatMinutesLeft } from './utils.js';
import { fetchTrainSchedule } from './api.js';
import {
    updateDateTimeDisplay,
    renderArrivals,
    renderTrainArrivals,
    displayStaticBusSchedule,
    showSettingsSavedMessage,
    populateSelectors,
    populateTrainStationSelector
} from './ui.js';
const mtrApiConfig = appData.train; // Convenience shortcut

// --- DOM ELEMENTS ---
const elements = {
    currentTime: document.getElementById('current-time'),
    currentDayDate: document.getElementById('current-day-date'),
    currentTimeSchedule: document.getElementById('current-time-schedule'),
    currentDayDateSchedule: document.getElementById('current-day-date-schedule'),
    busRouteSelect: document.getElementById('bus-route-select'),
    trainLineSelect: document.getElementById('train-line-select'),
    trainStationSelect: document.getElementById('train-station-select'),
    staticBusRouteSelect: document.getElementById('static-bus-route-select'),
    scheduleTypeSelectorContainer: document.getElementById('schedule-type-selector-container'),
    staticBusScheduleTableContainer: document.getElementById('static-bus-schedule-table-container'),
    staticScheduleFixedHeader: document.getElementById('static-schedule-fixed-header'),
    favoriteBusRouteSelect: document.getElementById('favorite-bus-route-select'),
    favoriteTrainLineSelect: document.getElementById('favorite-train-line-select'),
    favoriteTrainStationSelect: document.getElementById('favorite-train-station-select'),
    saveFavoriteBusButton: document.getElementById('save-favorite-bus'),
    saveFavoriteTrainButton: document.getElementById('save-favorite-train'),
    settingsSavedMessage: document.getElementById('settings-saved-message'),
    allTabButtons: document.querySelectorAll('.bottom-nav-button'),
    contentPanes: document.querySelectorAll('.content-pane'),
    busDir1Name: document.getElementById('bus-direction1-name'),
    busDir1Times: document.getElementById('bus-direction1-times'),
    busDir2Name: document.getElementById('bus-direction2-name'),
    busDir2Times: document.getElementById('bus-direction2-times'),
    trainDir1Name: document.getElementById('train-direction1-name'),
    trainDir1Times: document.getElementById('train-direction1-times'),
    trainDir2Name: document.getElementById('train-direction2-name'),
    trainDir2Times: document.getElementById('train-direction2-times'),
};

let currentStaticScheduleType = 'weekday';
let trainDataCache = {};

function getNextArrivals(scheduleTimes, now, routeName, directionKey, currentDayType) {
    const upcoming = [];
    const MAX_ARRIVALS_TO_SHOW = 3;

    function findArrivals(times, date, isNextDay) {
        if (!times || times.length === 0) return;
        for (const timeStr of times) {
            if (!timeStr) continue;
            const [hours, minutes] = timeStr.split(':').map(Number);
            const scheduleDateTime = new Date(date);
            scheduleDateTime.setHours(hours, minutes, 0, 0);

            if (scheduleDateTime >= now) {
                const diffMs = scheduleDateTime - now;
                const diffTotalMinutes = Math.ceil(diffMs / 60000);
                upcoming.push({ time: timeStr, minutesLeft: diffTotalMinutes, isNextDay });
                if (upcoming.length >= MAX_ARRIVALS_TO_SHOW) return;
            }
        }
    }
    
    findArrivals(scheduleTimes, now, false);

    if (routeName && upcoming.length < MAX_ARRIVALS_TO_SHOW) {
        const tomorrowDate = new Date(now);
        tomorrowDate.setDate(now.getDate() + 1);
        const nextDayType = getCurrentDayType(tomorrowDate);
        
        const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
        const routeScheduleAllTypes = appData[transportType][routeName];

        if (routeScheduleAllTypes && routeScheduleAllTypes[nextDayType]) {
            const nextDayScheduleData = routeScheduleAllTypes[nextDayType];
            if (nextDayScheduleData && nextDayScheduleData[directionKey]) {
                const nextDayRawTimes = nextDayScheduleData[directionKey];
                const nextDayParsedTimes = parseScheduleJsonToHHMM(nextDayRawTimes);
                findArrivals(nextDayParsedTimes, tomorrowDate, true);
            }
        }
    }
    return upcoming;
}

// --- MAIN APP LOGIC ---

async function updateLiveSchedules() {
    const now = new Date();
    updateDateTimeDisplay(now);

    const activePane = document.querySelector('.content-pane.active');
    if (!activePane || activePane.id !== 'home-pane') return;

    // Bus & Ferry Logic
    const routeName = elements.busRouteSelect.value;
    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const schedule = appData[transportType]?.[routeName];
    const currentDayType = getCurrentDayType(now);
    
    if (schedule && schedule[currentDayType]) {
        const todaysSchedule = schedule[currentDayType];
        elements.busDir1Name.textContent = todaysSchedule.direction1Name;
        elements.busDir2Name.textContent = todaysSchedule.direction2Name;
        
        const dir1Times = parseScheduleJsonToHHMM(todaysSchedule.direction1Times);
        const dir2Times = parseScheduleJsonToHHMM(todaysSchedule.direction2Times);

        renderArrivals(getNextArrivals(dir1Times, now, routeName, 'direction1Times', currentDayType), elements.busDir1Times);
        renderArrivals(getNextArrivals(dir2Times, now, routeName, 'direction2Times', currentDayType), elements.busDir2Times);
    }

    // Train Logic
    const trainLineName = elements.trainLineSelect.value;
    const trainStationName = elements.trainStationSelect.value;
    const trainLineConfig = mtrApiConfig[trainLineName];

    if (trainLineConfig && trainStationName) {
        elements.trainDir1Name.textContent = trainLineConfig.endpoint1NameForDisplay;
        elements.trainDir2Name.textContent = trainLineConfig.endpoint2NameForDisplay;
        
        elements.trainDir1Times.innerHTML = '<li class="loading-text text-sm">Loading...</li>';
        elements.trainDir2Times.innerHTML = '';

        const apiData = await fetchTrainSchedule(trainLineName, trainStationName);
        renderTrainArrivals(apiData, trainLineConfig);
    }
}

function loadPreferences() {
    const favBusRoute = localStorage.getItem('favoriteBusRoute');
    const favTrainLine = localStorage.getItem('favoriteTrainLine');
    const favTrainStation = localStorage.getItem('favoriteTrainStation');

    if (favBusRoute && elements.busRouteSelect.querySelector(`option[value="${favBusRoute}"]`)) {
        elements.busRouteSelect.value = favBusRoute;
    } else {
        elements.busRouteSelect.value = "Tsing Yi <-> Park Island";
    }

    if (elements.favoriteBusRouteSelect) {
        elements.favoriteBusRouteSelect.value = favBusRoute || "";
    }
    if (elements.favoriteTrainLineSelect) {
        elements.favoriteTrainLineSelect.value = favTrainLine || "";
        populateTrainStationSelector(favTrainLine, elements.favoriteTrainStationSelect, favTrainStation);
    }
}

function setupEventListeners() {
    elements.allTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            elements.contentPanes.forEach(pane => pane.classList.toggle('active', pane.id === `${targetTab}-pane`));
            elements.allTabButtons.forEach(btn => btn.classList.toggle('active', btn === button));
            
            if (targetTab === 'home') {
                updateLiveSchedules();
            }
            if (targetTab === 'schedule') {
                // ** FIX for Schedule Tab Default **
                if (!elements.staticBusRouteSelect.value) {
                    const favRoute = localStorage.getItem('favoriteBusRoute');
                    // Default to favorite route (direction 2 is always To Park Island), or Tsing Yi route as a fallback
                    const defaultRouteValue = favRoute 
                        ? `${favRoute}__direction2Times` 
                        : "Tsing Yi <-> Park Island__direction1Times"; // Default to "To Tsing Yi"
                    
                    if (elements.staticBusRouteSelect.querySelector(`option[value="${defaultRouteValue}"]`)) {
                        elements.staticBusRouteSelect.value = defaultRouteValue;
                    }
                }
                displayStaticBusSchedule(elements.staticBusRouteSelect.value, currentStaticScheduleType);
            }
        });
    });

    elements.busRouteSelect?.addEventListener('change', updateLiveSchedules);
    elements.trainLineSelect?.addEventListener('change', () => {
        populateTrainStationSelector(elements.trainLineSelect.value, elements.trainStationSelect);
        updateLiveSchedules();
    });
    elements.trainStationSelect?.addEventListener('change', updateLiveSchedules);
    
    elements.favoriteTrainLineSelect?.addEventListener('change', (e) => {
        populateTrainStationSelector(e.target.value, elements.favoriteTrainStationSelect);
    });

    elements.staticBusRouteSelect?.addEventListener('change', () => {
        displayStaticBusSchedule(elements.staticBusRouteSelect.value, currentStaticScheduleType);
    });
    elements.scheduleTypeSelectorContainer?.addEventListener('click', (e) => {
        if (e.target.classList.contains('schedule-type-segment')) {
            elements.scheduleTypeSelectorContainer.querySelector('.active')?.classList.remove('active');
            e.target.classList.add('active');
            currentStaticScheduleType = e.target.dataset.scheduletype;
            displayStaticBusSchedule(elements.staticBusRouteSelect.value, currentStaticScheduleType);
        }
    });

    elements.saveFavoriteBusButton?.addEventListener('click', () => {
        const selectedFavBus = elements.favoriteBusRouteSelect.value;
        localStorage.setItem('favoriteBusRoute', selectedFavBus);
        if (elements.busRouteSelect) elements.busRouteSelect.value = selectedFavBus;
        showSettingsSavedMessage();
    });

    elements.saveFavoriteTrainButton?.addEventListener('click', () => {
        const selectedFavTrainLine = elements.favoriteTrainLineSelect.value;
        const selectedFavTrainStation = elements.favoriteTrainStationSelect.value;
        localStorage.setItem('favoriteTrainLine', selectedFavTrainLine);
        localStorage.setItem('favoriteTrainStation', selectedFavTrainStation);
        if (elements.trainLineSelect) {
             elements.trainLineSelect.value = selectedFavTrainLine;
             populateTrainStationSelector(selectedFavTrainLine, elements.trainStationSelect, selectedFavTrainStation);
        }
        showSettingsSavedMessage();
    });
}

function initializeApp() {
    populateSelectors();
    loadPreferences();
    populateTrainStationSelector(elements.trainLineSelect.value, elements.trainStationSelect, localStorage.getItem('favoriteTrainStation'));
    setupEventListeners();
    
    document.querySelector('.bottom-nav-button[data-tab="home"]')?.click();
    
    setInterval(updateLiveSchedules, 30000);
    setInterval(() => updateDateTimeDisplay(new Date()), 1000);
}

document.addEventListener('DOMContentLoaded', initializeApp);
