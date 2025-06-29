// utils.js
// This module contains reusable, pure helper functions that do not interact with the DOM.

export function parseScheduleJsonToHHMM(jsonData) {
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

export function getCurrentDayType(date) {
    const day = date.getDay();
    if (day === 0) return 'sundayPublicHoliday';
    if (day === 6) return 'saturday';
    return 'weekday';
}

export function formatMinutesLeft(totalMinutes) {
    if (totalMinutes <= 1) return 'Now!';
    if (totalMinutes < 60) return `${totalMinutes} min`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes === 0 ? `${hours}h` : `${hours}h ${String(minutes).padStart(2, '0')} min`;
}

/**
 * FIX: This is the new, more robust function to find upcoming arrivals.
 * It now accepts schedule times for both today and tomorrow to handle the midnight crossover.
 * @param {string[]} todayTimes - Array of HH:MM schedule times for the current day.
 * @param {string[]} tomorrowTimes - Array of HH:MM schedule times for the next day.
 * @param {Date} now - The current date and time.
 * @returns {Array<{time: string, minutesLeft: number}>} - An array of the next upcoming arrivals.
 */
export function getNextArrivals(todayTimes, tomorrowTimes, now) {
    const upcoming = [];
    const MAX_ARRIVALS_TO_SHOW = 3;

    // --- Step 1: Search for remaining arrivals on the CURRENT day ---
    if (todayTimes) {
        for (const timeStr of todayTimes) {
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
    }

    // --- Step 2: If we still need more, search for arrivals on the NEXT day ---
    if (upcoming.length < MAX_ARRIVALS_TO_SHOW && tomorrowTimes) {
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1); // Set the date to tomorrow

        for (const timeStr of tomorrowTimes) {
            if (upcoming.length >= MAX_ARRIVALS_TO_SHOW) break;
            if (!timeStr) continue;
            
            const [hours, minutes] = timeStr.split(':').map(Number);
            // CRUCIAL: Set the time on the 'tomorrow' date object
            const scheduleDateTime = new Date(tomorrow); 
            scheduleDateTime.setHours(hours, minutes, 0, 0);

            // This will always be true, but it's a good sanity check
            if (scheduleDateTime >= now) {
                const diffMs = scheduleDateTime - now;
                const diffTotalMinutes = Math.ceil(diffMs / 60000);
                upcoming.push({ time: timeStr, minutesLeft: diffTotalMinutes });
            }
        }
    }

    return upcoming;
}