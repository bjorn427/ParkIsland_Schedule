// script.js - FINAL AND COMPLETE (Fixed Schedule Tab Defaults)

// --- MODULES & CONFIG ---
import { appData } from './app-data.js';

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

// --- CORE LOGIC & UTILITY FUNCTIONS ---

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

async function fetchTrainSchedule(lineName, stationName) {
    const lineConfig = mtrApiConfig[lineName];
    if (!lineConfig || !lineConfig.stations[stationName]) return null;
    
    const lineCode = lineConfig.apiLineCode;
    const stationCode = lineConfig.stations[stationName];
    const cacheKey = `${lineCode}-${stationCode}`;
    const apiUrl = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}&lang=EN`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error("MTR API request failed:", response.status);
            return trainDataCache[cacheKey] || null;
        }
        const data = await response.json();
        if (data.status === 1 && data.data && data.data[cacheKey]) {
            trainDataCache[cacheKey] = data.data[cacheKey];
            return data.data[cacheKey];
        }
        return null;
    } catch (error) {
        console.error("Error fetching MTR schedule:", error);
        return trainDataCache[cacheKey] || null;
    }
}


// --- UI RENDERING & DISPLAY LOGIC ---

function updateDateTimeDisplay(now) {
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateString = `${now.toLocaleDateString([], { weekday: 'long' })}, ${now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    [elements.currentTime, elements.currentTimeSchedule].forEach(el => { if(el) el.textContent = timeString });
    [elements.currentDayDate, elements.currentDayDateSchedule].forEach(el => { if(el) el.textContent = dateString });
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
        li.className = 'py-0.5 flex justify-between items-center w-full';
        const minutesText = formatMinutesLeft(arr.minutesLeft);
        const isFirstItem = index === 0;
        const timeClass = isFirstItem ? 'font-semibold text-sm text-[var(--app-accent-color)]' : 'font-medium text-sm text-gray-500';
        const waitingTimeClass = minutesText === 'Now!' ? 'text-now-emphasis text-right' : 'text-gray-600 text-right';
        const waitingTimeSizeClass = isFirstItem ? 'text-sm' : 'text-sm';
        const waitingTimeBoldClass = isFirstItem ? 'font-semibold' : '';
        const waitingTimeColorClass = isFirstItem && minutesText !== 'Now!' ? 'text-[var(--app-accent-color)]' : '';
        li.innerHTML = `<span class="${timeClass}">${arr.time}</span><span class="${waitingTimeClass} ${waitingTimeBoldClass} ${waitingTimeSizeClass} ${waitingTimeColorClass}">${minutesText}</span>`;
        targetEl.appendChild(li);
    });
}

function renderTrainArrivals(apiData, lineConfig) {
    const { trainDir1Times, trainDir2Times } = elements;
    [trainDir1Times, trainDir2Times].forEach(el => el.innerHTML = '');

    if (!apiData) {
        trainDir1Times.innerHTML = '<li class="italic text-gray-500 text-sm">Could not load schedule.</li>';
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

function displayStaticBusSchedule(selectedRouteAndDirection, scheduleType) {
    const { staticBusScheduleTableContainer, staticScheduleFixedHeader } = elements;
    if (!staticBusScheduleTableContainer || !staticScheduleFixedHeader) return;

    staticBusScheduleTableContainer.innerHTML = ''; 

    if (!selectedRouteAndDirection) {
        staticBusScheduleTableContainer.innerHTML = '<p class="text-gray-500 text-sm px-2 sm:px-3">Please select a route and direction.</p>';
        staticScheduleFixedHeader.style.display = 'none';
        return;
    }

    const [routeName, directionKey] = selectedRouteAndDirection.split('__');
    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const routeData = appData[transportType][routeName];

    if (!routeData || !routeData[scheduleType] || !routeData[scheduleType][directionKey]) {
        staticBusScheduleTableContainer.innerHTML = `<p class="text-gray-500 text-sm px-2 sm:px-3">No schedule found for this criteria.</p>`;
        staticScheduleFixedHeader.style.display = 'none';
        return;
    }

    const rawTimes = routeData[scheduleType][directionKey];
    const timesArray = parseScheduleJsonToHHMM(rawTimes);

    const grouped = timesArray.reduce((acc, time) => {
        const [hour, minute] = time.split(':');
        if (!acc[hour]) acc[hour] = [];
        acc[hour].push(minute);
        return acc;
    }, {});

    staticScheduleFixedHeader.style.display = 'flex';
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const hour of Object.keys(grouped).sort((a, b) => a - b)) {
        const tr = document.createElement('tr');
        const tdHour = document.createElement('td');
        tdHour.className = 'hour-cell';
        tdHour.textContent = hour;
        
        const tdMinutes = document.createElement('td');
        tdMinutes.className = 'minutes-cell';
        tdMinutes.innerHTML = grouped[hour].map(min => `<span class="minute-item">${min}</span>`).join(' ');

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


// --- INITIALIZATION & PREFERENCES ---

function populateSelectors() {
    const { busRouteSelect, favoriteBusRouteSelect, staticBusRouteSelect, trainLineSelect, favoriteTrainLineSelect } = elements;
    
    const transportTypes = ['bus', 'ferry'];
    [busRouteSelect, favoriteBusRouteSelect].forEach(selectEl => {
        if (!selectEl) return;
        const currentValue = selectEl.value;
        selectEl.innerHTML = '';
        if (selectEl === favoriteBusRouteSelect) selectEl.add(new Option("None", ""));
        transportTypes.forEach(type => {
            Object.keys(appData[type]).forEach(routeName => selectEl.add(new Option(routeName, routeName)));
        });
        if (selectEl.querySelector(`option[value="${currentValue}"]`)) selectEl.value = currentValue;
    });

    if (staticBusRouteSelect) {
        const currentValue = staticBusRouteSelect.value;
        staticBusRouteSelect.innerHTML = '';
        staticBusRouteSelect.add(new Option("Select Route & Direction", ""));
        transportTypes.forEach(type => {
            Object.keys(appData[type]).forEach(routeName => {
                 const routeData = appData[type][routeName];
                 const scheduleForNames = routeData.weekday || routeData.saturday || routeData.sundayPublicHoliday;
                 if (scheduleForNames) {
                    staticBusRouteSelect.add(new Option(`${routeName} | ${scheduleForNames.direction1Name}`, `${routeName}__direction1Times`));
                    staticBusRouteSelect.add(new Option(`${routeName} | ${scheduleForNames.direction2Name}`, `${routeName}__direction2Times`));
                 }
            });
        });
        if(staticBusRouteSelect.querySelector(`option[value="${currentValue}"]`)) staticBusRouteSelect.value = currentValue;
    }

    [trainLineSelect, favoriteTrainLineSelect].forEach(sel => {
        if (!sel) return;
        const currentValue = sel.value;
        sel.innerHTML = '';
        if (sel === favoriteTrainLineSelect) sel.add(new Option("None", ""));
        Object.keys(mtrApiConfig).forEach(lineName => sel.add(new Option(lineName, lineName)));
        if (sel.querySelector(`option[value="${currentValue}"]`)) sel.value = currentValue;
    });
}

function populateTrainStationSelector(lineName, selectElement, selectedStationName) {
    if (!selectElement) return;
    selectElement.innerHTML = '';
    const lineConfig = mtrApiConfig[lineName];
    if (!lineConfig) {
        selectElement.add(new Option("Select Station", ""));
        return;
    }
    Object.keys(lineConfig.stations).forEach(stationName => selectElement.add(new Option(stationName, stationName)));
    
    if (selectedStationName && selectElement.querySelector(`option[value="${selectedStationName}"]`)) {
        selectElement.value = selectedStationName;
    } else {
        selectElement.value = lineConfig.defaultStationName;
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
