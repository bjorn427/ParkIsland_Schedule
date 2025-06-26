// utils.js

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