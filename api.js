export async function fetchTrainSchedule(lineName, stationName) {
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