// utils.js
// This module contains reusable, pure helper functions.

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

// ** FIX: This function was missing but is now restored and exported **
export function getNextArrivals(scheduleTimes, now) {
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
    // Note: The more complex "next day" logic can be re-added here if desired.
    return upcoming;
}
