// script.js - FINAL VERSION
// This script initializes all dropdowns and handles all application logic.

import { appData } from './app-data.js';
import { CustomDropdown } from './custom-dropdown.js';

// --- GLOBAL STATE ---
let busDropdown, trainLineDropdown, trainStationDropdown;
let favBusDropdown, favTrainLineDropdown, favTrainStationDropdown, staticRouteDropdown;
let currentStaticScheduleType = 'weekday';
let elements = {};
let trainDataCache = {};

// --- UTILITY FUNCTIONS ---

function parseScheduleJsonToHHMM(jsonData) {
    if (!jsonData) return [];
    const times = [];
    for (const hour in jsonData) {
        if (jsonData.hasOwnProperty(hour)) {
            jsonData[hour].forEach(minute => {
                times.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
            });
        }
    }
    return times.sort((a, b) => a.localeCompare(b));
}

function getCurrentDayType(date) {
    const day = date.getDay();
    if (day === 0) return 'sundayPublicHoliday';
    if (day === 6) return 'saturday';
    return 'weekday';
}

function formatMinutesLeft(totalMinutes) {
    if (totalMinutes <= 1) return 'Now!';
    if (totalMinutes < 60) return `${totalMinutes} min`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes === 0 ? `${hours}h` : `${hours}h ${String(minutes).padStart(2, '0')} min`;
}

function getNextArrivals(scheduleTimes, now) {
    const upcoming = [];
    const MAX_ARRIVALS_TO_SHOW = 3;
    if (!scheduleTimes) return upcoming;
    for (const timeStr of scheduleTimes) {
        if (!timeStr) continue;
        const [hours, minutes] = timeStr.split(':').map(Number);
        const scheduleDateTime = new Date(now);
        scheduleDateTime.setHours(hours, minutes, 0, 0);
        if (scheduleDateTime >= now) {
            const diffMs = scheduleDateTime - now;
            const diffTotalMinutes = Math.ceil(diffMs / 60000);
            upcoming.push({ time: timeStr, minutesLeft: diffTotalMinutes });
            if (upcoming.length >= MAX_ARRIVALS_TO_SHOW) break;
        }
    }
    return upcoming;
}

// --- API FUNCTION ---

async function fetchTrainSchedule(lineName, stationName) {
    const mtrApiConfig = appData.train;
    const lineConfig = mtrApiConfig[lineName];
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
        return null;
    } catch (error) {
        return trainDataCache[cacheKey] || null;
    }
}


// --- UI RENDERING FUNCTIONS ---

function updateDateTimeDisplay(now) {
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateString = `${now.toLocaleDateString([], { weekday: 'long' })}, ${now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    if (elements.currentTime) elements.currentTime.textContent = timeString;
    if (elements.currentDayDate) elements.currentDayDate.textContent = dateString;
    if (elements.currentTimeSchedule) elements.currentTimeSchedule.textContent = timeString;
    if (elements.currentDayDateSchedule) elements.currentDayDateSchedule.textContent = dateString;
}

function renderArrivals(arrivals, targetEl) {
    if (!targetEl) return;
    targetEl.innerHTML = '';
    if (!arrivals || arrivals.length === 0) {
        targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No further services found.</li>';
        return;
    }
    arrivals.forEach((arr, index) => {
        const li = document.createElement('li');
        li.className = 'py-0.5 flex justify-between items-center w-full text-sm';
        const minutesText = formatMinutesLeft(arr.minutesLeft);
        const isFirstItem = index === 0;
        
        const timeClass = isFirstItem ? 'font-semibold text-[var(--app-accent-color)]' : 'font-medium text-gray-500';
        
        // ** THE FIX IS HERE **
        // This logic correctly applies the special styles to the next arrival time.
        const waitingTimeClass = isFirstItem
            ? (minutesText === 'Now!' ? 'text-now-emphasis text-right' : 'font-semibold text-[var(--app-accent-color)] text-right')
            : 'text-gray-600 text-right';

        li.innerHTML = `<span class="${timeClass}">${arr.time}</span><span class="${waitingTimeClass}">${minutesText}</span>`;
        targetEl.appendChild(li);
    });
}

function renderTrainArrivals(apiData, lineConfig) {
    const { trainDir1Times, trainDir2Times } = elements;
    [trainDir1Times, trainDir2Times].forEach(el => { if (el) el.innerHTML = '' });

    if (!apiData) {
        if(trainDir1Times) trainDir1Times.innerHTML = '<li class="italic text-gray-500 text-sm">Could not load schedule.</li>';
        return;
    }
    
    const processDirection = (direction, targetEl) => {
        const arrivalsForDirection = (apiData.UP || []).concat(apiData.DOWN || [])
            .filter(train => train.valid === "Y" && (Array.isArray(direction) ? direction.includes(train.dest) : train.dest === direction))
            .sort((a, b) => parseInt(a.ttnt) - parseInt(b.ttnt))
            .slice(0, 3)
            .map(train => ({
                time: new Date(train.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                minutesLeft: parseInt(train.ttnt)
            }));
        renderArrivals(arrivalsForDirection, targetEl);
    };

    processDirection(lineConfig.endpoint1ActualDestCode, trainDir1Times);
    processDirection(lineConfig.endpoint2ActualDestCode, trainDir2Times);
}

function displayStaticBusSchedule() {
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

    const { staticBusScheduleTableContainer, staticScheduleFixedHeader } = elements;
    if (!staticBusScheduleTableContainer || !staticScheduleFixedHeader) return;

    staticBusScheduleTableContainer.innerHTML = ''; 

    if (!selectedRouteAndDirection) {
        staticBusScheduleTableContainer.innerHTML = '<p class="text-gray-500 text-sm p-3">Please select a route.</p>';
        staticScheduleFixedHeader.style.display = 'none';
        return;
    }

    const [routeName, directionKey] = selectedRouteAndDirection.split('__');
    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const routeData = appData[transportType][routeName];

    if (!routeData || !routeData[currentStaticScheduleType] || !routeData[currentStaticScheduleType][directionKey]) {
        staticBusScheduleTableContainer.innerHTML = `<p class="text-gray-500 text-sm p-3">No schedule found.</p>`;
        staticScheduleFixedHeader.style.display = 'none';
        return;
    }

    const rawTimes = routeData[currentStaticScheduleType][directionKey];
    const timesArray = parseScheduleJsonToHHMM(rawTimes);

    const grouped = timesArray.reduce((acc, time) => {
        const [hour, minute] = time.split(':');
        if (!acc[hour]) acc[hour] = [];
        acc[hour].push(minute);
        return acc;
    }, {});

    staticScheduleFixedHeader.style.display = 'flex';
    const table = document.createElement('table');
    table.className = "w-full border-collapse";
    const tbody = document.createElement('tbody');

    for (const hour of Object.keys(grouped).sort((a,b) => parseInt(a) - parseInt(b))) {
        const tr = document.createElement('tr');
        tr.className = "border-b border-gray-100";
        const tdHour = document.createElement('td');
        tdHour.className = 'hour-cell p-2 font-semibold';
        tdHour.textContent = hour;
        
        const tdMinutes = document.createElement('td');
        tdMinutes.className = 'minutes-cell p-2';
        tdMinutes.innerHTML = grouped[hour].map(min => `<span class="minute-item inline-block mr-2">${min}</span>`).join('');

        tr.appendChild(tdHour);
        tr.appendChild(tdMinutes);
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    staticBusScheduleTableContainer.appendChild(table);
}

function showSettingsSavedMessage() {
    if (!elements.settingsSavedMessage) return;
    elements.settingsSavedMessage.classList.remove('hidden');
    elements.settingsSavedMessage.classList.add('show');
    setTimeout(() => {
        elements.settingsSavedMessage.classList.remove('show');
        setTimeout(() => elements.settingsSavedMessage.classList.add('hidden'), 500);
    }, 2500);
}


// --- MAIN APP LOGIC ---

async function updateLiveSchedules() {
    if (!busDropdown || !trainLineDropdown || !trainStationDropdown) return;
    
    updateDateTimeDisplay(new Date());

    const routeName = busDropdown.getValue();
    const trainLineName = trainLineDropdown.getValue();
    const trainStationName = trainStationDropdown.getValue();
    const now = new Date();
    const currentDayType = getCurrentDayType(now);

    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const schedule = appData[transportType]?.[routeName];
    
    if (schedule && schedule[currentDayType]) {
        const todaysSchedule = schedule[currentDayType];
        elements.busDir1Name.textContent = todaysSchedule.direction1Name;
        elements.busDir2Name.textContent = todaysSchedule.direction2Name;
        const dir1Times = parseScheduleJsonToHHMM(todaysSchedule.direction1Times);
        const dir2Times = parseScheduleJsonToHHMM(todaysSchedule.direction2Times);
        renderArrivals(getNextArrivals(dir1Times, now), elements.busDir1Times);
        renderArrivals(getNextArrivals(dir2Times, now), elements.busDir2Times);
    }

    const trainLineConfig = appData.train[trainLineName];
    if (trainLineConfig && trainStationName) {
        elements.trainDir1Name.textContent = trainLineConfig.endpoint1NameForDisplay;
        elements.trainDir2Name.textContent = trainLineConfig.endpoint2NameForDisplay;
        elements.trainDir1Times.innerHTML = '<li class="loading-text text-sm">Loading...</li>';
        elements.trainDir2Times.innerHTML = '';
        const apiData = await fetchTrainSchedule(trainLineName, trainStationName);
        renderTrainArrivals(apiData, trainLineConfig);
    }
}


// --- INITIALIZATION ---

function initializeApp() {
    elements = {
        currentTime: document.getElementById('current-time'),
        currentDayDate: document.getElementById('current-day-date'),
        currentTimeSchedule: document.getElementById('current-time-schedule'),
        currentDayDateSchedule: document.getElementById('current-day-date-schedule'),
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
        scheduleTypeSelectorContainer: document.getElementById('schedule-type-selector-container'),
        staticBusScheduleTableContainer: document.getElementById('static-bus-schedule-table-container'),
        staticScheduleFixedHeader: document.getElementById('static-schedule-fixed-header'),
        saveFavoriteBusButton: document.getElementById('save-favorite-bus'),
        saveFavoriteTrainButton: document.getElementById('save-favorite-train'),
        settingsSavedMessage: document.getElementById('settings-saved-message'),
    };
    
    initializeDropdowns();
    setupEventListeners();
    loadPreferences();
    
    elements.allTabButtons[0].click();
    
    setInterval(updateLiveSchedules, 30000);
    setInterval(() => updateDateTimeDisplay(new Date()), 1000);
}

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
    staticRouteDropdown = new CustomDropdown('static-bus-route-dropdown-container', staticRoutes.map(r => r.text), displayStaticBusSchedule);

    favBusDropdown = new CustomDropdown('favorite-bus-route-dropdown-container', ["None", ...busAndFerryRoutes]);
    favTrainLineDropdown = new CustomDropdown('favorite-train-line-dropdown-container', ["None", ...trainLines], handleFavTrainLineChange);
    favTrainStationDropdown = new CustomDropdown('favorite-train-station-dropdown-container', ["Select a line first"]);
}

function setupEventListeners() {
    elements.allTabButtons.forEach(button => {
        button.addEventListener('click', () => handleTabSwitch(button.dataset.tab));
    });

    elements.scheduleTypeSelectorContainer?.addEventListener('click', (e) => {
        if (e.target.classList.contains('schedule-type-segment')) {
            elements.scheduleTypeSelectorContainer.querySelector('.active')?.classList.remove('active');
            e.target.classList.add('active');
            currentStaticScheduleType = e.target.dataset.scheduletype;
            displayStaticBusSchedule();
        }
    });

    elements.saveFavoriteBusButton?.addEventListener('click', saveBusPreference);
    elements.saveFavoriteTrainButton?.addEventListener('click', saveTrainPreference);
}

function handleTabSwitch(targetTab) {
    elements.contentPanes.forEach(pane => pane.classList.toggle('active', pane.id === `${targetTab}-pane`));
    elements.allTabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === targetTab));
    if (targetTab === 'home') updateLiveSchedules();
    if (targetTab === 'schedule') displayStaticBusSchedule();
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

function loadPreferences() {
    const favBus = localStorage.getItem('favoriteBusRoute') || "Tsing Yi <-> Park Island";
    busDropdown.updateValue(favBus);
    
    const favTrainLine = localStorage.getItem('favoriteTrainLine') || Object.keys(appData.train)[0];
    trainLineDropdown.updateValue(favTrainLine);
    handleTrainLineChange(favTrainLine); 
    
    const favTrainStation = localStorage.getItem('favoriteTrainStation') || appData.train[favTrainLine]?.defaultStationName;
    trainStationDropdown.updateValue(favTrainStation);

    favBusDropdown.updateValue(localStorage.getItem('favoriteBusRoute') || "None");
    favTrainLineDropdown.updateValue(localStorage.getItem('favoriteTrainLine') || "None");
    handleFavTrainLineChange(favTrainLineDropdown.getValue());
    favTrainStationDropdown.updateValue(localStorage.getItem('favoriteTrainStation') || "None");
}

function saveBusPreference() {
    const value = favBusDropdown.getValue();
    localStorage.setItem('favoriteBusRoute', value === "None" ? "" : value);
    busDropdown.updateValue(value === "None" ? "Tsing Yi <-> Park Island" : value);
    showSettingsSavedMessage();
    updateLiveSchedules();
}

function saveTrainPreference() {
    const line = favTrainLineDropdown.getValue();
    const station = favTrainStationDropdown.getValue();
    localStorage.setItem('favoriteTrainLine', line === "None" ? "" : line);
    localStorage.setItem('favoriteTrainStation', station === "None" || station === "Select a line first" ? "" : station);
    showSettingsSavedMessage();
    loadPreferences(); // Reload preferences to update home screen
    updateLiveSchedules();
}

function getSelectedStaticRouteValue() {
    if (!staticRouteDropdown) return null;
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
    return selectedRoute ? selectedRoute.value : null;
}

// Start the app
document.addEventListener('DOMContentLoaded', initializeApp);
