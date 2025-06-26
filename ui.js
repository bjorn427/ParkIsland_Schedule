// ui.js
// This module is responsible for all functions that directly manipulate the DOM.

// Note: This module will need to import some helper functions itself.
import { parseScheduleJsonToHHMM, formatMinutesLeft } from './utils.js';
import { appData } from './app-data.js';

export function updateDateTimeDisplay(now) {
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateString = `${now.toLocaleDateString([], { weekday: 'long' })}, ${now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    
    document.getElementById('current-time').textContent = timeString;
    document.getElementById('current-day-date').textContent = dateString;
    document.getElementById('current-time-schedule').textContent = timeString;
    document.getElementById('current-day-date-schedule').textContent = dateString;
}

export function renderArrivals(arrivals, targetEl) {
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

export function renderTrainArrivals(apiData, lineConfig) {
    const trainDir1Times = document.getElementById('train-direction1-times');
    const trainDir2Times = document.getElementById('train-direction2-times');
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

export function displayStaticBusSchedule(selectedRouteAndDirection, scheduleType) {
    const tableContainer = document.getElementById('static-bus-schedule-table-container');
    const fixedHeaderEl = document.getElementById('static-schedule-fixed-header');
    if (!tableContainer || !fixedHeaderEl) return;

    tableContainer.innerHTML = ''; 

    if (!selectedRouteAndDirection) {
        tableContainer.innerHTML = '<p class="text-gray-500 text-sm px-2 sm:px-3">Please select a route and direction.</p>';
        fixedHeaderEl.style.display = 'none';
        return;
    }

    const [routeName, directionKey] = selectedRouteAndDirection.split('__');
    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const routeData = appData[transportType]?.[routeName];

    if (!routeData || !routeData[scheduleType] || !routeData[scheduleType][directionKey]) {
        tableContainer.innerHTML = `<p class="text-gray-500 text-sm px-2 sm:px-3">No schedule found for this criteria.</p>`;
        fixedHeaderEl.style.display = 'none';
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

    fixedHeaderEl.style.display = 'flex';
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
    tableContainer.appendChild(table);
}

export function showSettingsSavedMessage() {
    const settingsSavedMessageEl = document.getElementById('settings-saved-message');
    if (!settingsSavedMessageEl) return;
    settingsSavedMessageEl.classList.remove('hidden');
    settingsSavedMessageEl.classList.add('show');
    setTimeout(() => {
        settingsSavedMessageEl.classList.remove('show');
        setTimeout(() => settingsSavedMessageEl.classList.add('hidden'), 500);
    }, 2500);
}

export function populateSelectors() {
    const busRouteSelect = document.getElementById('bus-route-select');
    const favoriteBusRouteSelect = document.getElementById('favorite-bus-route-select');
    const staticBusRouteSelect = document.getElementById('static-bus-route-select');
    const trainLineSelect = document.getElementById('train-line-select');
    const favoriteTrainLineSelect = document.getElementById('favorite-train-line-select');
    
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
        Object.keys(appData.train).forEach(lineName => sel.add(new Option(lineName, lineName)));
        if (sel.querySelector(`option[value="${currentValue}"]`)) sel.value = currentValue;
    });
}

export function populateTrainStationSelector(lineName, selectElement, selectedStationName) {
    if (!selectElement) return;
    selectElement.innerHTML = '';
    const lineConfig = appData.train[lineName];
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
