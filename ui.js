// ui.js
// This module is responsible for all functions that directly manipulate the DOM.

import { appData } from './app-data.js';
import { appInfo } from './app-info.js';
import { parseScheduleJsonToHHMM, formatMinutesLeft } from './utils.js';

export function updateDateTimeDisplay(now) {
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateString = `${now.toLocaleDateString([], { weekday: 'long' })}, ${now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    
    document.querySelectorAll('.time-display').forEach(el => el.textContent = timeString);
    document.querySelectorAll('.date-display').forEach(el => el.textContent = dateString);
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
        li.className = 'py-0.5 flex justify-between items-center w-full text-sm';
        const minutesText = formatMinutesLeft(arr.minutesLeft);
        const isFirstItem = index === 0;
        const timeClass = isFirstItem ? 'font-bold text-[var(--app-accent-color)]' : 'font-medium text-gray-500';
        const waitingTimeClass = isFirstItem ? (minutesText === 'Now!' ? 'text-now-emphasis text-right' : 'font-semibold text-[var(--app-accent-color)] text-right') : 'text-gray-600 text-right';
        li.innerHTML = `<span class="${timeClass}">${arr.time}</span><span class="${waitingTimeClass}">${minutesText}</span>`;
        targetEl.appendChild(li);
    });
}

export function renderTrainArrivals(apiData, lineConfig) {
    const trainDir1Times = document.getElementById('train-direction1-times');
    const trainDir2Times = document.getElementById('train-direction2-times');
    
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

export function displayStaticBusSchedule(selectedRouteAndDirection, scheduleType) {
    const tableContainer = document.getElementById('static-bus-schedule-table-container');
    /** FINAL FIX: Target the new wrapper element for showing/hiding. */
    const headerWrapper = document.getElementById('schedule-header-wrapper');
    if (!tableContainer || !headerWrapper) return;

    tableContainer.innerHTML = ''; 

    if (!selectedRouteAndDirection) {
        tableContainer.innerHTML = '<p class="text-gray-500 text-sm p-3">Please select a route.</p>';
        headerWrapper.classList.add('hidden');
        return;
    }

    const [routeName, directionKey] = selectedRouteAndDirection.split('__');
    const transportType = appData.bus[routeName] ? 'bus' : 'ferry';
    const routeData = appData[transportType][routeName];

    if (!routeData || !routeData[scheduleType] || !routeData[scheduleType][directionKey]) {
        tableContainer.innerHTML = `<p class="text-gray-500 text-sm p-3">No schedule found.</p>`;
        headerWrapper.classList.add('hidden');
        return;
    }

    headerWrapper.classList.remove('hidden');

    const rawTimes = routeData[scheduleType][directionKey];
    const timesArray = parseScheduleJsonToHHMM(rawTimes);

    const grouped = timesArray.reduce((acc, time) => {
        const [hour, minute] = time.split(':');
        if (!acc[hour]) acc[hour] = [];
        acc[hour].push(minute);
        return acc;
    }, {});

    const sortedHours = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b));
    const fragment = document.createDocumentFragment();

    sortedHours.forEach(hour => {
        const hourCell = document.createElement('div');
        hourCell.className = 'schedule-hour-cell schedule-sticky-col';
        hourCell.textContent = hour;

        const minutesCell = document.createElement('div');
        minutesCell.className = 'schedule-minutes-cell';
        minutesCell.innerHTML = grouped[hour]
            .map(min => `<span class="minute-item">${min}</span>`)
            .join('');

        fragment.appendChild(hourCell);
        fragment.appendChild(minutesCell);
    });

    tableContainer.appendChild(fragment);
}

export function showSettingsSavedMessage() {
    const messageEl = document.getElementById('settings-saved-message');
    if (!messageEl) return;
    messageEl.classList.remove('hidden');
    messageEl.classList.add('show');
    setTimeout(() => {
        messageEl.classList.remove('show');
        setTimeout(() => messageEl.classList.add('hidden'), 500);
    }, 2500);
}

export function populateAboutInfo() {
    if (document.getElementById('app-version')) document.getElementById('app-version').textContent = appInfo.version;
    if (document.getElementById('app-versionNotes')) document.getElementById('app-versionNotes').textContent = appInfo.versionNotes;
    if (document.getElementById('app-developer')) document.getElementById('app-developer').textContent = appInfo.developer;
    if (document.getElementById('app-last-updated')) document.getElementById('app-last-updated').textContent = appInfo.lastUpdated;
}