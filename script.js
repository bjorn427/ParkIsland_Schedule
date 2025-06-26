// Function to parse schedule JSON (hour keys, minute arrays) to HH:MM strings
function parseScheduleJsonToHHMM(jsonData) {
    const times = [];
    if (!jsonData) return times; // Return empty if no data
    for (const hour in jsonData) {
        if (jsonData.hasOwnProperty(hour)) {
            const minutesArray = jsonData[hour];
            minutesArray.forEach(minute => {
                const formattedHour = String(hour).padStart(2, '0'); // Ensure 2 digits for hour
                const formattedMinute = String(minute).padStart(2, '0'); // Ensure 2 digits for minute
                times.push(`${formattedHour}:${formattedMinute}`);
            });
        }
    }
    return times.sort(); // Sort times chronologically
}

// Schedule Data for Tsing Yi <-> Park Island (uses parsing)
const tsingYiToMaWanWeekdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30,45],"01":[15],"02":[0,45],"03":[30],"04":[15],"05":[0,45],"06":[15,30,40,50],"07":[0,10,20,30,40,50],"08":[0,10,20,30,40,50],"09":[0,10,20,30,40,50],"10":[0,10,20,30,40,50],"11":[0,10,20,30,40,50],"12":[0,10,20,30,40,50],"13":[0,10,20,30,40,50],"14":[0,10,20,30,40,50],"15":[0,10,20,30,40,50],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,5,10,15,20,25,30,35,40,45,50,55],"20":[0,6,12,18,24,30,36,42,48,54],"21":[0,6,12,18,24,30,36,42,48,54],"22":[0,6,12,18,24,30,36,42,48,54],"23":[0,6,12,18,24,30,40,50]});
const tsingYiToMaWanSaturdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30,45],"01":[15],"02":[0,45],"03":[30],"04":[15],"05":[0,45],"06":[15,30,40,50],"07":[0,10,20,30,40,50],"08":[0,10,20,30,40,50],"09":[0,10,20,30,40,50],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,6,12,18,24,30,36,42,48,54],"21":[0,6,12,18,24,30,36,42,48,54],"22":[0,6,12,18,24,30,36,42,48,54],"23":[0,6,12,18,24,30,40,50]});
const tsingYiToMaWanHolidayTimes = parseScheduleJsonToHHMM ({"00":[0,15,30,45],"01":[15],"02":[0,45],"03":[30],"04":[15],"05":[0,45],"06":[15,30,40,50],"07":[0,10,20,30,40,50],"08":[0,10,20,30,40,50],"09":[0,10,20,30,40,50],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,6,12,18,24,30,36,42,48,54],"21":[0,6,12,18,24,30,36,42,48,54],"22":[0,6,12,18,24,30,36,42,48,54],"23":[0,6,12,18,24,30,40,50]});

const maWanToTsingYiWeekdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30],"01":[0,45],"02":[30],"03":[15],"04":[0,45],"05":[30],"06":[0,15,30,35,40,45,50,55],"07":[0,5,10,15,20,25,30,34,38,42,46,50,54,58],"08":[2,6,10,14,18,22,26,30,35,40,45,50,55],"09":[0,5,10,15,20,25,30,35,40,45,50,55],"10":[0,10,20,30,40,50],"11":[0,10,20,30,40,50],"12":[0,10,20,30,40,50],"13":[0,10,20,30,40,50],"14":[0,10,20,30,40,50],"15":[0,10,20,30,40,50],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,6,12,18,24,30,36,42,48,54],"18":[0,6,12,18,24,30,36,42,48,54],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,12,24,36,48],"21":[0,12,24,36,48],"22":[0,12,24,36,48],"23":[0,15,30,45]});
const maWanToTsingYiSaturdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30],"01":[0,45],"02":[30],"03":[15],"04":[0,45],"05":[30],"06":[0,15,30,40,50],"07":[0,10,20,30,35,40,45,50,55],"08":[0,5,10,15,20,25,30,35,40,45,50,55],"09":[0,6,12,18,24,30,36,42,48,54],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,12,24,36,48],"21":[0,12,24,36,48],"22":[0,12,24,36,48],"23":[0,15,30,45]});
const maWanToTsingYiHolidayTimes = parseScheduleJsonToHHMM({"00":[0,15,30],"01":[0,45],"02":[30],"03":[15],"04":[0,45],"05":[30],"06":[0,15,30,40,50],"07":[0,10,20,30,35,40,45,50,55],"08":[0,5,10,15,20,25,30,35,40,45,50,55],"09":[0,6,12,18,24,30,36,42,48,54],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,12,24,36,48],"21":[0,12,24,36,48],"22":[0,12,24,36,48],"23":[0,15,30,45]});

// MTR API Configuration
const mtrApiConfig = {
    "Tung Chung Line": { 
        apiLineCode: "TCL", 
        endpoint1NameForDisplay: "To Hong Kong", 
        endpoint1ActualDestCode: "HOK", 
        endpoint2NameForDisplay: "To Tung Chung", 
        endpoint2ActualDestCode: "TUC", 
        defaultStationName: "Tsing Yi",
        stations: { 
            "Tung Chung": "TUC", "Sunny Bay": "SUN", "Tsing Yi": "TSY", "Lai King": "LAK", 
            "Nam Cheong": "NAC", "Olympic": "OLY", "Kowloon": "KOW", "Hong Kong": "HOK"
        } 
    },
    "Tsuen Wan Line": { apiLineCode: "TWL", endpoint1NameForDisplay: "To Central", endpoint1ActualDestCode: "CEN", endpoint2NameForDisplay: "To Tsuen Wan", endpoint2ActualDestCode: "TSW", defaultStationName: "Kwai Fong", stations: { "Central": "CEN", "Admiralty": "ADM", "Tsim Sha Tsui": "TST", "Jordan": "JOR", "Yau Ma Tei": "YMT", "Mong Kok": "MOK", "Prince Edward": "PRE", "Sham Shui Po": "SSP", "Cheung Sha Wan": "CSW", "Lai Chi Kok": "LCK", "Mei Foo": "MEF", "Lai King": "LAK", "Kwai Fong": "KWF", "Kwai Hing": "KWH", "Tai Wo Hau": "TWH", "Tsuen Wan": "TSW"} },
    "Island Line": { apiLineCode: "ISL", endpoint1NameForDisplay: "To Kennedy Town", endpoint1ActualDestCode: "KET", endpoint2NameForDisplay: "To Chai Wan", endpoint2ActualDestCode: "CHW", defaultStationName: "Central", stations: { "Kennedy Town": "KET", "HKU": "HKU", "Sai Ying Pun": "SYP", "Sheung Wan": "SHW", "Central": "CEN", "Admiralty": "ADM", "Wan Chai": "WAC", "Causeway Bay": "CAB", "Tin Hau": "TIH", "Fortress Hill": "FOH", "North Point": "NOP", "Quarry Bay": "QUB", "Tai Koo": "TAK", "Sai Wan Ho": "SWH", "Shau Kei Wan": "SKW", "Heng Fa Chuen": "HFC", "Chai Wan": "CHW"} },
    "Tuen Ma Line": { apiLineCode: "TML", endpoint1NameForDisplay: "To Tuen Mun", endpoint1ActualDestCode: "TUM", endpoint2NameForDisplay: "To Wu Kai Sha", endpoint2ActualDestCode: "WKS", defaultStationName: "Nam Cheong", stations: {"Wu Kai Sha": "WKS", "Ma On Shan": "MOS", "Heng On": "HEO", "Tai Shui Hang": "TSH", "Shek Mun": "SHM", "City One": "CIO", "Sha Tin Wai": "STW", "Che Kung Temple": "CKT", "Tai Wai": "TAW", "Hin Keng": "HIK", "Diamond Hill": "DIH", "Kai Tak": "KAT", "Sung Wong Toi": "SUW", "To Kwa Wan": "TKW", "Ho Man Tin": "HOM", "Hung Hom": "HUH", "East Tsim Sha Tsui": "ETS", "Austin": "AUS", "Nam Cheong": "NAC", "Mei Foo": "MEF", "Tsuen Wan West": "TWW", "Kam Sheung Road": "KSR", "Yuen Long": "YUL", "Long Ping": "LOP", "Tin Shui Wai": "TIS", "Siu Hong": "SIH", "Tuen Mun": "TUM"}},
    "Airport Express": { apiLineCode: "AEL", endpoint1NameForDisplay: "To AsiaWorld Expo", endpoint1ActualDestCode: "AWE", endpoint2NameForDisplay: "To Hong Kong", endpoint2ActualDestCode: "HOK", defaultStationName: "Tsing Yi", stations: { "Hong Kong": "HOK", "Kowloon": "KOW", "Tsing Yi": "TSY", "Airport": "AIR", "AsiaWorld Expo": "AWE"}},
    "Tseung Kwan O Line": { apiLineCode: "TKL", endpoint1NameForDisplay: "To North Point", endpoint1ActualDestCode: "NOP", endpoint2NameForDisplay: "To Po Lam / LOHAS Park", endpoint2ActualDestCode: ["POA", "LHP"], defaultStationName: "Tseung Kwan O", stations: {"North Point": "NOP", "Quarry Bay": "QUB", "Yau Tong": "YAT", "Tiu Keng Leng": "TIK", "Tseung Kwan O": "TKO", "LOHAS Park": "LHP", "Hang Hau": "HAH", "Po Lam": "POA"}},
    "East Rail Line": { apiLineCode: "EAL", endpoint1NameForDisplay: "To Admiralty", endpoint1ActualDestCode: "ADM", endpoint2NameForDisplay: "To Lo Wu / Lok Ma Chau", endpoint2ActualDestCode: ["LOW", "LMC"], defaultStationName: "Sha Tin", stations: {"Admiralty": "ADM", "Exhibition Centre": "EXC", "Hung Hom": "HUH", "Mong Kok East": "MKK", "Kowloon Tong": "KOT", "Tai Wai": "TAW", "Sha Tin": "SHT", "Fo Tan": "FOT", "Racecourse": "RAC", "University": "UNI", "Tai Po Market": "TAP", "Tai Wo": "TWO", "Fanling": "FAN", "Sheung Shui": "SHS", "Lo Wu": "LOW", "Lok Ma Chau": "LMC"}},
    "South Island Line": { apiLineCode: "SIL", endpoint1NameForDisplay: "To Admiralty", endpoint1ActualDestCode: "ADM", endpoint2NameForDisplay: "To South Horizons", endpoint2ActualDestCode: "SOH", defaultStationName: "Wong Chuk Hang", stations: {"Admiralty": "ADM", "Ocean Park": "OCP", "Wong Chuk Hang": "WCH", "Lei Tung": "LET", "South Horizons": "SOH"}},
    "Kwun Tong Line": { apiLineCode: "KTL", endpoint1NameForDisplay: "To Whampoa", endpoint1ActualDestCode: "WHA", endpoint2NameForDisplay: "To Tiu Keng Leng", endpoint2ActualDestCode: "TIK", defaultStationName: "Prince Edward", stations: {"Whampoa": "WHA", "Ho Man Tin": "HOM", "Yau Ma Tei": "YMT", "Mong Kok": "MOK", "Prince Edward": "PRE", "Shek Kip Mei": "SKM", "Kowloon Tong": "KOT", "Lok Fu": "LOF", "Wong Tai Sin": "WTS", "Diamond Hill": "DIH", "Choi Hung": "CHH", "Kowloon Bay": "KOB", "Ngau Tau Kok": "NTK", "Kwun Tong": "KWT", "Lam Tin": "LAT", "Yau Tong": "YAT", "Tiu Keng Leng": "TIK"}}
};

// Create a map from station code to station name for easier lookup if needed
const stationCodeToNameMap = {};
Object.values(mtrApiConfig).forEach(line => {
    Object.entries(line.stations).forEach(([name, code]) => {
        stationCodeToNameMap[code] = name;
    });
    const addEndpointToMap = (endpointCode) => {
        if (endpointCode && typeof endpointCode === 'string' && !stationCodeToNameMap[endpointCode]) {
            let displayName = Object.keys(line.stations).find(key => line.stations[key] === endpointCode);
            if (!displayName) { 
                for (const otherLineKey in mtrApiConfig) {
                    const otherLine = mtrApiConfig[otherLineKey];
                    displayName = Object.keys(otherLine.stations).find(key => otherLine.stations[key] === endpointCode);
                    if (displayName) break; 
                }
            }
            stationCodeToNameMap[endpointCode] = displayName || endpointCode; 
        } else if (Array.isArray(endpointCode)) { 
            endpointCode.forEach(addEndpointToMap); 
        }
    };
    addEndpointToMap(line.endpoint1ActualDestCode);
    addEndpointToMap(line.endpoint2ActualDestCode);
});

// Main Schedules Object
const mockSchedules = { 
    bus: { 
        "Tsing Yi <-> Park Island": { 
            weekday: { 
                direction1Name: "To Park Island (Bus)", 
                direction1Times: tsingYiToMaWanWeekdayTimes,
                direction2Name: "To Tsing Yi (Bus)", 
                direction2Times: maWanToTsingYiWeekdayTimes 
            },
            saturday: { 
                direction1Name: "To Park Island (Bus)", 
                direction1Times: tsingYiToMaWanSaturdayTimes, 
                direction2Name: "To Tsing Yi (Bus)", 
                direction2Times: maWanToTsingYiSaturdayTimes 
            },
            sundayPublicHoliday: { 
                direction1Name: "To Park Island (Bus)", 
                direction1Times: tsingYiToMaWanHolidayTimes, 
                direction2Name: "To Tsing Yi (Bus)", 
                direction2Times: maWanToTsingYiHolidayTimes 
            }
        },
        "Kwai Fong <-> Park Island": { // Data provided by user
            "weekday": {
                "direction1Name": "To Park Island (Bus)",
                "direction1Times": [
                    "00:00", "00:30", "01:00", "01:25", "02:10", "02:55", "03:40", "04:25", "04:55", "05:10", "05:55",
                    "06:20", "06:35", "06:45", "06:55",
                    "07:05", "07:15", "07:25", "07:35", "07:45", "07:55",
                    "08:05", "08:15", "08:25", "08:35", "08:45", "08:55",
                    "09:05", "09:15", "09:25", "09:35", "09:45",
                    "10:00", "10:12", "10:24", "10:36", "10:48",
                    "11:00", "11:12", "11:24", "11:36", "11:48",
                    "12:00", "12:12", "12:24", "12:36", "12:48",
                    "13:00", "13:12", "13:24", "13:36", "13:48",
                    "14:00", "14:12", "14:24", "14:36", "14:48",
                    "15:00", "15:12", "15:24", "15:36", "15:48",
                    "16:00", "16:12", "16:24", "16:36", "16:48",
                    "17:00", "17:10", "17:20", "17:30", "17:40", "17:50", "17:58",
                    "18:06", "18:14", "18:22", "18:30", "18:38", "18:46", "18:54",
                    "19:02", "19:10", "19:18", "19:26", "19:34", "19:42", "19:50", "19:58",
                    "20:06", "20:14", "20:22", "20:30", "20:38", "20:46", "20:54",
                    "21:02", "21:10", "21:18", "21:26", "21:34", "21:42", "21:50", "21:58",
                    "22:06", "22:14", "22:22", "22:30", "22:38", "22:46", "22:54",
                    "23:02", "23:15", "23:30", "23:45"
                ],
                "direction2Name": "To Kwai Fong (Bus)",
                "direction2Times": [
                    "00:00", "00:15", "00:45", "01:00", "01:45", "02:30", "03:15", "04:00",
                    "04:45", "05:30", "06:00", "06:15", "06:30", "06:40", "06:50", "07:00",
                    "07:10", "07:20", "07:30", "07:40", "07:50", "08:00", "08:10", "08:20",
                    "08:30", "08:40", "08:50", "09:00", "09:10", "09:20", "09:30", "09:45",
                    "10:00", "10:12", "10:24", "10:36", "10:48", "11:00", "11:12", "11:24",
                    "11:36", "11:48", "12:00", "12:12", "12:24", "12:36", "12:48", "13:00",
                    "13:12", "13:24", "13:36", "13:48", "14:00", "14:12", "14:24", "14:36",
                    "14:48", "15:00", "15:12", "15:24", "15:36", "15:48", "16:00", "16:12",
                    "16:24", "16:36", "16:48", "17:00", "17:10", "17:20", "17:30", "17:40",
                    "17:50", "18:00", "18:10", "18:20", "18:30", "18:40", "18:50", "19:00",
                    "19:12", "19:24", "19:36", "19:48", "20:00", "20:12", "20:24", "20:36",
                    "20:48", "21:00", "21:12", "21:24", "21:36", "21:48", "22:00", "22:12",
                    "22:24", "22:36", "22:48", "23:00", "23:15", "23:30", "23:45"
                ]
            },
            "saturday": {
                "direction1Name": "To Park Island (Bus)",
                "direction1Times": [
                    "00:00", "00:30", "01:00", "01:25", "02:10", "02:55", "03:40", "04:25", "04:55", "05:10", "05:55",
                    "06:20", "06:35", "06:45", "06:55",
                    "07:05", "07:15", "07:25", "07:35", "07:45", "07:55",
                    "08:05", "08:15", "08:25", "08:35", "08:45", "08:55",
                    "09:05", "09:15", "09:25", "09:35", "09:45",
                    "10:00", "10:12", "10:24", "10:36", "10:48",
                    "11:00", "11:12", "11:24", "11:36", "11:48",
                    "12:00", "12:12", "12:24", "12:36", "12:48",
                    "13:00", "13:12", "13:24", "13:36", "13:48",
                    "14:00", "14:12", "14:24", "14:36", "14:48",
                    "15:00", "15:12", "15:24", "15:36", "15:48",
                    "16:00", "16:12", "16:24", "16:36", "16:48",
                    "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
                    "18:00", "18:10", "18:20", "18:30", "18:38", "18:46", "18:54",
                    "19:02", "19:10", "19:18", "19:26", "19:34", "19:42", "19:50", "19:58",
                    "20:06", "20:14", "20:22", "20:30", "20:38", "20:46", "20:54",
                    "21:02", "21:10", "21:18", "21:26", "21:34", "21:42", "21:50", "21:58",
                    "22:06", "22:14", "22:22", "22:30", "22:38", "22:46", "22:54",
                    "23:02", "23:15", "23:30", "23:45"
                ],
                "direction2Name": "To Kwai Fong (Bus)",
                "direction2Times": [
                    "00:00", "00:15", "00:45", "01:00", "01:45", "02:30", "03:15", "04:00",
                    "04:45", "05:30", "06:00", "06:15", "06:30", "06:40", "06:50", "07:00",
                    "07:10", "07:20", "07:30", "07:38", "07:46", "07:54", "08:02", "08:10",
                    "08:18", "08:26", "08:34", "08:42", "08:50", "09:00", "09:10", "09:20",
                    "09:30", "09:40", "09:50", "10:00", "10:12", "10:24", "10:36", "10:48",
                    "11:00", "11:12", "11:24", "11:36", "11:48", "12:00", "12:12", "12:24",
                    "12:36", "12:48", "13:00", "13:12", "13:24", "13:36", "13:48", "14:00",
                    "14:12", "14:24", "14:36", "14:48", "15:00", "15:12", "15:24", "15:36",
                    "15:48", "16:00", "16:12", "16:24", "16:36", "16:48", "17:00", "17:10",
                    "17:20", "17:30", "17:40", "17:50", "18:00", "18:10", "18:20", "18:30",
                    "18:40", "18:50", "19:00", "19:12", "19:24", "19:36", "19:48", "20:00",
                    "20:12", "20:24", "20:36", "20:48", "21:00", "21:12", "21:24", "21:36",
                    "21:48", "22:00", "22:12", "22:24", "22:36", "22:48", "23:00", "23:15",
                    "23:30", "23:45"
                ]
            },
            "sundayPublicHoliday": {
                "direction1Name": "To Park Island (Bus)",
                "direction1Times": [
                    "00:00", "00:30", "01:00", "01:25", "02:10", "02:55", "03:40", "04:25", "04:55", "05:10", "05:55",
                    "06:20", "06:35", "06:45", "06:55",
                    "07:05", "07:15", "07:25", "07:35", "07:45", "07:55",
                    "08:05", "08:15", "08:25", "08:35", "08:45", "08:55",
                    "09:05", "09:15", "09:25", "09:35", "09:45",
                    "10:00", "10:12", "10:24", "10:36", "10:48",
                    "11:00", "11:12", "11:24", "11:36", "11:48",
                    "12:00", "12:12", "12:24", "12:36", "12:48",
                    "13:00", "13:12", "13:24", "13:36", "13:48",
                    "14:00", "14:12", "14:24", "14:36", "14:48",
                    "15:00", "15:12", "15:24", "15:36", "15:48",
                    "16:00", "16:12", "16:24", "16:36", "16:48",
                    "17:00", "17:10", "17:20", "17:30", "17:40", "17:50",
                    "18:00", "18:10", "18:20", "18:30", "18:38", "18:46", "18:54",
                    "19:02", "19:10", "19:18", "19:26", "19:34", "19:42", "19:50", "19:58",
                    "20:06", "20:14", "20:22", "20:30", "20:38", "20:46", "20:54",
                    "21:02", "21:10", "21:18", "21:26", "21:34", "21:42", "21:50", "21:58",
                    "22:06", "22:14", "22:22", "22:30", "22:38", "22:46", "22:54",
                    "23:02", "23:15", "23:30", "23:45"
                ],
                "direction2Name": "To Kwai Fong (Bus)",
                "direction2Times": [
                    "00:00", "00:15", "00:45", "01:00", "01:45", "02:30", "03:15", "04:00",
                    "04:45", "05:30", "06:00", "06:15", "06:30", "06:40", "06:50", "07:00",
                    "07:10", "07:20", "07:30", "07:38", "07:46", "07:54", "08:02", "08:10",
                    "08:18", "08:26", "08:34", "08:42", "08:50", "09:00", "09:10", "09:20",
                    "09:30", "09:40", "09:50", "10:00", "10:12", "10:24", "10:36", "10:48",
                    "11:00", "11:12", "11:24", "11:36", "11:48", "12:00", "12:12", "12:24",
                    "12:36", "12:48", "13:00", "13:12", "13:24", "13:36", "13:48", "14:00",
                    "14:12", "14:24", "14:36", "14:48", "15:00", "15:12", "15:24", "15:36",
                    "15:48", "16:00", "16:12", "16:24", "16:36", "16:48", "17:00", "17:10",
                    "17:20", "17:30", "17:40", "17:50", "18:00", "18:10", "18:20", "18:30",
                    "18:40", "18:50", "19:00", "19:12", "19:24", "19:36", "19:48", "20:00",
                    "20:12", "20:24", "20:36", "20:48", "21:00", "21:12", "21:24", "21:36",
                    "21:48", "22:00", "22:12", "22:24", "22:36", "22:48", "23:00", "23:15",
                    "23:30", "23:45"
                ]
            }
        },
        "Tsuen Wan <-> Park Island": { 
            weekday: { direction1Name: "To Park Island (Bus)", direction1Times: ["07:00", "07:30", "08:00", "08:30", "16:30", "17:00", "17:30", "18:00", "19:00", "20:00"], direction2Name: "To Tsuen Wan (Bus)", direction2Times: ["07:20", "07:50", "08:20", "08:50", "16:50", "17:20", "17:50", "18:20", "19:20", "20:20"] },
            saturday: { direction1Name: "To Park Island (Bus)", direction1Times: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"], direction2Name: "To Tsuen Wan (Bus)", direction2Times: ["09:30", "10:30", "11:30", "12:30", "14:30", "15:30", "16:30", "17:30", "18:30"] },
            sundayPublicHoliday: { direction1Name: "To Park Island (Bus)", direction1Times: ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"], direction2Name: "To Tsuen Wan (Bus)", direction2Times: ["10:45", "12:15", "13:45", "15:15", "16:45", "18:15"] }
        },
            "Central Pier <-> Park Island": { 
            weekday: { 
                direction1Name: "To Park Island (Ferry)", 
                direction1Times: [
                    "07:00", "07:30", "08:10", "08:30", "08:50",
                    "09:10", "09:30","09:50","10:10","10:30","11:30","12:30","13:30",
                    "14:30","15:30","16:30","17:30","18:00","18:30","19:00","19:30",
                    "20:00","20:30","21:00","21:30","22:30","23:30"], 
                direction2Name: "To Central Pier (Ferry)", 
                direction2Times: [
                    "06:30","07:00","07:20","07:40","08:00","08:20",
                    "08:40","09:00","09:20","09:40","10:00","11:00","12:00","13:00",
                    "14:00","15:00","16:00","17:00","17:30","18:00","18:30","19:00",
                    "19:30","20:00","20:30","21:00","22:00","23:00"
                ]
            } ,
            saturday: { 
                direction1Name: "To Park Island (Ferry)", 
                direction1Times: ["07:30","08:30", "09:30", "10:30", "11:30", 
                "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", 
                "19:30", "20:30", "21:30", "22:30", "23:30"], 
                direction2Name: "To Central Pier (Ferry)", 
                direction2Times: ["07:00","08:00","09:00","10:00","11:00","12:00",
                "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00",
                "21:00","22:00","23:00"] 
            },
            sundayPublicHoliday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["07:30","08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30"], direction2Name: "To Central Pier (Ferry)", direction2Times: ["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"] }
        },
        "Tsuen Wan Pier <-> Park Island": { 
            weekday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["07:10", "07:40", "08:10", "08:40", "17:10", "17:40", "18:10", "18:40"], direction2Name: "To Tsuen Wan Pier (Ferry)", direction2Times: ["07:25", "07:55", "08:25", "08:55", "17:25", "17:55", "18:25", "18:55"] },
            saturday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["08:15", "09:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15"], direction2Name: "To Tsuen Wan Pier (Ferry)", direction2Times: ["08:45", "09:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45"] },
            sundayPublicHoliday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["09:20", "10:20", "11:20", "12:20", "13:20", "14:20"], direction2Name: "To Tsuen Wan Pier (Ferry)", direction2Times: ["09:50", "10:50", "11:50", "12:50", "13:50", "14:50"] }
        }
    },
    train: mtrApiConfig 
};

// DOM Elements
const currentTimeEl = document.getElementById('current-time');
const currentDayDateEl = document.getElementById('current-day-date'); 
const currentTimeScheduleEl = document.getElementById('current-time-schedule');
const currentDayDateScheduleEl = document.getElementById('current-day-date-schedule');
const busRouteSelect = document.getElementById('bus-route-select');
const trainLineSelect = document.getElementById('train-line-select'); 
const trainStationSelect = document.getElementById('train-station-select');
const staticBusRouteSelect = document.getElementById('static-bus-route-select');
const scheduleTypeSelectorContainer = document.getElementById('schedule-type-selector-container');
const staticBusScheduleTableContainer = document.getElementById('static-bus-schedule-table-container');
const favoriteBusRouteSelect = document.getElementById('favorite-bus-route-select');
const favoriteTrainLineSelect = document.getElementById('favorite-train-line-select'); 
const favoriteTrainStationSelect = document.getElementById('favorite-train-station-select');
const saveFavoriteBusButton = document.getElementById('save-favorite-bus');
const saveFavoriteTrainButton = document.getElementById('save-favorite-train');
const settingsSavedMessageEl = document.getElementById('settings-saved-message');
const allTabButtons = document.querySelectorAll('.bottom-nav-button'); 
const contentPanes = document.querySelectorAll('.content-pane');
let currentStaticScheduleType = 'weekday'; // Default static schedule type
let trainDataCache = {}; // Cache for MTR API responses

// Tab Navigation Logic
allTabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab; 
        
        // Reset all buttons to inactive state
        allTabButtons.forEach(btn => {
            btn.classList.remove('active');
            const iconWrapper = btn.querySelector('.bottom-nav-icon-wrapper');
            if (iconWrapper) iconWrapper.style.backgroundColor = 'transparent';
            const svgIcon = btn.querySelector('svg');
            if (svgIcon) svgIcon.style.stroke = 'var(--app-icon-inactive-color)';
            const navText = btn.querySelector('.nav-text');
            if (navText) {
                navText.style.color = 'var(--app-text-inactive-color)';
                navText.style.fontWeight = 'normal';
            }
        });

        // Set clicked button to active state
        button.classList.add('active');
        const activeIconWrapper = button.querySelector('.bottom-nav-icon-wrapper');
        if (activeIconWrapper) activeIconWrapper.style.backgroundColor = 'var(--app-nav-icon-active-bg)';
        const activeSvgIcon = button.querySelector('svg');
        if (activeSvgIcon) activeSvgIcon.style.stroke = 'var(--app-accent-color)';
        const activeNavText = button.querySelector('.nav-text');
        if (activeNavText) {
            activeNavText.style.color = 'var(--app-text-active-color)';
            activeNavText.style.fontWeight = '600';
        }
        
        // Switch content panes
        contentPanes.forEach(pane => {
            pane.classList.remove('active'); // Remove active from all
            if (pane.id === `${targetTab}-pane`) {
                pane.classList.add('active'); // Add active to the target
            }
        });


        // Actions specific to tabs
        if (targetTab === 'home') updateLiveSchedules();
        if (targetTab === 'schedule') { 
            updateDateTimeDisplay(new Date(), true); // Update time for schedule tab
            // If no route is selected in static schedule, select the first valid one
            if (staticBusRouteSelect.value === "" && staticBusRouteSelect.options.length > 1) {
                    if (staticBusRouteSelect.options[0].value === "") staticBusRouteSelect.selectedIndex = 1; // Skip "Select a Route"
            }
            displayStaticBusSchedule(staticBusRouteSelect.value, currentStaticScheduleType); 
        }
    });
});

// Get current day type (weekday, saturday, sundayPublicHoliday)
function getCurrentDayType(date) {
    const day = date.getDay(); // 0 for Sunday, 6 for Saturday
    // TODO: Add public holiday check here if an API or list is available
    if (day === 0) return 'sundayPublicHoliday';
    if (day === 6) return 'saturday';
    return 'weekday';
}

// Update date and time display
function updateDateTimeDisplay(now, isScheduleTab = false) {
    const timeEl = isScheduleTab ? currentTimeScheduleEl : currentTimeEl;
    const dateEl = isScheduleTab ? currentDayDateScheduleEl : currentDayDateEl;

    if (timeEl) timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    if (dateEl) {
            dateEl.textContent = `${now.toLocaleDateString([], { weekday: 'long' })}, ${now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
    }
}

// Populate train station select based on chosen line
function populateTrainStations(lineSelectElement, stationSelectElement, selectedLineName, selectedStationNameToSet) {
    stationSelectElement.innerHTML = ''; // Clear existing options
    const lineConfig = mtrApiConfig[selectedLineName]; 
    if (selectedLineName && lineConfig) {
        // Ensure consistent station order for TCL, otherwise use order from config
        const stationNames = (lineConfig.apiLineCode === "TCL") 
            ? ["Tung Chung", "Sunny Bay", "Tsing Yi", "Lai King", "Nam Cheong", "Olympic", "Kowloon", "Hong Kong"]
            : Object.keys(lineConfig.stations);

        stationNames.forEach(stationName => {
            if (lineConfig.stations[stationName]) { // Check if station exists in config for the line
                const option = document.createElement('option');
                option.value = stationName; 
                option.textContent = stationName;
                stationSelectElement.appendChild(option);
            }
        });
        // Set the selected station if provided and valid, otherwise select the first
        if (selectedStationNameToSet && stationSelectElement.querySelector(`option[value="${selectedStationNameToSet}"]`)) {
            stationSelectElement.value = selectedStationNameToSet;
        } else if (stationSelectElement.options.length > 0) {
            stationSelectElement.selectedIndex = 0; 
        }
    } else { 
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select Station";
        stationSelectElement.appendChild(defaultOption);
    }
}

// Populate all select dropdowns
function populateAllSelectors() {
    // Populate Bus Route Selectors (Home and Settings)
    [busRouteSelect, favoriteBusRouteSelect].forEach(sel => {
        if(sel) {
            const currentValue = sel.value; // Preserve current selection if any
            sel.innerHTML = ''; // Clear existing
                if (sel === favoriteBusRouteSelect) { // Add "None" option for favorite bus
                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.textContent = "None"; 
                sel.appendChild(defaultOption);
            }
            Object.keys(mockSchedules.bus).forEach(routeName => {
                const option = document.createElement('option');
                option.value = routeName;
                option.textContent = routeName;
                sel.appendChild(option);
            });
            if (sel.querySelector(`option[value="${currentValue}"]`)) sel.value = currentValue;
        }
    });

    // Populate Static Bus Route Selector (Schedule Tab)
    if (staticBusRouteSelect) {
        const currentValue = staticBusRouteSelect.value;
        staticBusRouteSelect.innerHTML = '';
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select a Route and Direction";
        staticBusRouteSelect.appendChild(defaultOption);

        Object.keys(mockSchedules.bus).forEach(routeName => {
            const routeData = mockSchedules.bus[routeName];
            // Get direction names from any available day type (weekday, sat, sun/ph)
            const scheduleForNames = routeData.weekday || routeData.saturday || routeData.sundayPublicHoliday; 
            if (scheduleForNames) {
                const dir1Name = (scheduleForNames.direction1Name || 'Direction 1').replace(/\s\(.*\)$/, ''); // Remove (Bus/Ferry)
                const dir2Name = (scheduleForNames.direction2Name || 'Direction 2').replace(/\s\(.*\)$/, ''); // Remove (Bus/Ferry)

                const option1 = document.createElement('option');
                option1.value = `${routeName}__direction1Times`; // Value includes route and direction key
                option1.textContent = `${routeName} | ${dir1Name}`;
                staticBusRouteSelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = `${routeName}__direction2Times`; 
                option2.textContent = `${routeName} | ${dir2Name}`;
                staticBusRouteSelect.appendChild(option2);
            }
        });
        if (staticBusRouteSelect.querySelector(`option[value="${currentValue}"]`)) staticBusRouteSelect.value = currentValue;
    }

    // Populate Train Line Selectors (Home and Settings)
    [trainLineSelect, favoriteTrainLineSelect].forEach(sel => {
        if (sel) {
            const currentValue = sel.value;
            sel.innerHTML = '';
            if (sel === favoriteTrainLineSelect) { // Add "None" for favorite train line
                const noneOption = document.createElement('option');
                noneOption.value = "";
                noneOption.textContent = "None";
                sel.appendChild(noneOption);
            }
            Object.keys(mtrApiConfig).forEach(lineName => { 
                const option = document.createElement('option');
                option.value = lineName; 
                option.textContent = lineName;
                sel.appendChild(option);
            });
            if (sel.querySelector(`option[value="${currentValue}"]`)) {
                sel.value = currentValue;
            } else if (sel === trainLineSelect && sel.options.length > 0) {
                // Default to first actual line for home screen if previous selection is invalid
                const firstValidOption = Object.keys(mtrApiConfig)[0];
                if (firstValidOption) sel.value = firstValidOption;
            }
        }
    });
    
    // Populate initial train stations based on default/selected line for Home
    const defaultHomeLine = trainLineSelect.value;
    const defaultHomeStation = mtrApiConfig[defaultHomeLine] ? mtrApiConfig[defaultHomeLine].defaultStationName : "Tsing Yi"; // Fallback if needed
    populateTrainStations(trainLineSelect, trainStationSelect, defaultHomeLine, defaultHomeStation);

    // Populate initial train stations based on default/selected line for Settings
    const defaultFavLine = favoriteTrainLineSelect.value;
    const defaultFavStation = mtrApiConfig[defaultFavLine] ? mtrApiConfig[defaultFavLine].defaultStationName : ""; // No station if "None" line
    populateTrainStations(favoriteTrainLineSelect, favoriteTrainStationSelect, defaultFavLine, defaultFavStation);
}

// Fetch train schedule from MTR API
async function fetchTrainSchedule(lineName, stationName) {
    const lineConfig = mtrApiConfig[lineName];
    if (!lineConfig || !lineConfig.stations[stationName]) {
        console.error("Invalid line or station for MTR API:", lineName, stationName);
        return null;
    }
    const lineCode = lineConfig.apiLineCode;
    const stationCode = lineConfig.stations[stationName];
    const cacheKey = `${lineCode}-${stationCode}`;
    const apiUrl = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}&lang=EN`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.error("MTR API request failed:", response.status);
            return trainDataCache[cacheKey] || null; // Return cached data on error if available
        }
        const data = await response.json();
        if (data.status === 1 && data.data && data.data[cacheKey]) {
            trainDataCache[cacheKey] = data.data[cacheKey]; // Update cache
            return data.data[cacheKey];
        } else if (data.status === 0) { // Special message (e.g., service suspension)
            console.warn("MTR API special message:", data.message);
            return { specialMessage: data.message, alertUrl: data.url }; 
        } else {
            console.warn("MTR API returned no schedule data or unexpected format:", data);
            return trainDataCache[cacheKey] || null; // Return cached data if available
        }
    } catch (error) {
        console.error("Error fetching MTR schedule:", error);
        return trainDataCache[cacheKey] || null; // Return cached data on network error if available
    }
}

// Format minutes left for display
function formatMinutesLeft(totalMinutes) {
    if (totalMinutes <= 1) return 'Now!';
    if (totalMinutes < 60) return `${totalMinutes}min`;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let hourText = `${hours}h`;
    if (minutes === 0) return hourText;
    let minuteText = String(minutes).padStart(2, '0') + 'min'; 
    return `${hourText} ${minuteText}`;
}

// Get next N arrivals for a given schedule
function getNextArrivals(currentScheduleTimes, now, routeName, directionKey, currentDayTypeForBusRoute) {
    const upcoming = [];
    const MAX_ARRIVALS_TO_SHOW = 3;

    // Check current day's schedule
    if (currentScheduleTimes && currentScheduleTimes.length > 0) {
        for (const timeStr of currentScheduleTimes) {
            if (timeStr === "N/A" || !timeStr) continue;
            const [hours, minutes] = timeStr.split(':').map(Number);
            const scheduleDateTime = new Date(now);
            scheduleDateTime.setHours(hours, minutes, 0, 0);

            if (scheduleDateTime >= now) {
                const diffMs = scheduleDateTime - now;
                const diffTotalMinutes = Math.ceil(diffMs / 60000);
                upcoming.push({ time: timeStr, minutesLeft: diffTotalMinutes, isNextDay: false });
                if (upcoming.length === MAX_ARRIVALS_TO_SHOW) break;
            }
        }
    }

    // If not enough arrivals, check next day's schedule (only for bus mock data)
    if (routeName && upcoming.length < MAX_ARRIVALS_TO_SHOW) {
        const tomorrowDate = new Date(now);
        tomorrowDate.setDate(now.getDate() + 1); // Get tomorrow's date
        const nextDayType = getCurrentDayType(tomorrowDate); // Determine day type for tomorrow

        const routeScheduleAllTypes = mockSchedules.bus[routeName];
        let nextDayScheduleData = null;
        if (routeScheduleAllTypes) {
            nextDayScheduleData = routeScheduleAllTypes[nextDayType];
        }

        if (nextDayScheduleData && nextDayScheduleData[directionKey]) {
            const nextDayTimes = nextDayScheduleData[directionKey];
            for (const timeStr of nextDayTimes) {
                if (upcoming.length >= MAX_ARRIVALS_TO_SHOW) break;

                const [hours, minutes] = timeStr.split(':').map(Number);
                const nextDayScheduleDateTime = new Date(tomorrowDate); // Use tomorrow's date object
                nextDayScheduleDateTime.setHours(hours, minutes, 0, 0);
                
                const diffMs = nextDayScheduleDateTime - now; // Difference from *now* to next day's time
                const diffTotalMinutes = Math.ceil(diffMs / 60000);
                upcoming.push({ time: timeStr, minutesLeft: diffTotalMinutes, isNextDay: true });
            }
        }
    }
    return upcoming;
}


// Display live schedule (bus or train) on Home pane
async function displayLiveSchedule(type, selectedValue, now, selectedLineValue) { 
    let scheduleData; 
    let dir1DisplayHeader = "Direction 1";
    let dir2DisplayHeader = "Direction 2";
    let apiTrainData = null;
    let lineConfig = null;
    let currentDayTypeForBusRoute = getCurrentDayType(now); // For bus schedules

    const dir1TimesEl = document.getElementById(`${type}-direction1-times`);
    const dir2TimesEl = document.getElementById(`${type}-direction2-times`);

    if (type === 'bus') {
        const routeScheduleAllTypes = mockSchedules.bus[selectedValue];
        if (routeScheduleAllTypes) {
            scheduleData = routeScheduleAllTypes[currentDayTypeForBusRoute];
            if (scheduleData) { 
                dir1DisplayHeader = (scheduleData.direction1Name || "Direction 1").replace(/\s\([\w\s\/]+\)$/, ''); // Remove (Bus/Ferry)
                dir2DisplayHeader = (scheduleData.direction2Name || "Direction 2").replace(/\s\([\w\s\/]+\)$/, '');
            }
        }
    } else if (type === 'train') {
        lineConfig = mtrApiConfig[selectedLineValue];
        if (lineConfig && lineConfig.stations[selectedValue]) {
            // Show loading only if list is currently empty
            if (dir1TimesEl && dir2TimesEl && !dir1TimesEl.hasChildNodes() && !dir2TimesEl.hasChildNodes()) { 
                if(dir1TimesEl) dir1TimesEl.innerHTML = '<li class="loading-text text-sm">Loading train times...</li>';
                if(dir2TimesEl) dir2TimesEl.innerHTML = '';
            }
            apiTrainData = await fetchTrainSchedule(selectedLineValue, selectedValue);
            dir1DisplayHeader = lineConfig.endpoint1NameForDisplay; 
            dir2DisplayHeader = lineConfig.endpoint2NameForDisplay;
        }
    }

    const dir1NameEl = document.getElementById(`${type}-direction1-name`);
    const dir2NameEl = document.getElementById(`${type}-direction2-name`);

    if (dir1NameEl) dir1NameEl.textContent = dir1DisplayHeader;
    if (dir2NameEl) dir2NameEl.textContent = dir2DisplayHeader;
    
    // Helper to render train arrivals from API data
    const renderArrivalsFromAPI = (apiData, targetEl, targetDestCodeOrCodes) => {
        if (!targetEl) return; // Guard against null element
        targetEl.innerHTML = ''; // Clear previous times
        let arrivalsForThisDisplayDirection = [];

        // Consolidate UP and DOWN arrays if they exist and filter by destination
        const processDirection = (directionArray) => { 
            if (apiData && directionArray && directionArray.length > 0) {
                for (const train of directionArray) {
                    if (train.valid === "Y") { // Only consider valid trains
                        // Check if train.dest matches one of the targetDestCodeOrCodes
                        const matchesTarget = Array.isArray(targetDestCodeOrCodes) ? 
                                                targetDestCodeOrCodes.includes(train.dest) : 
                                                train.dest === targetDestCodeOrCodes;
                        if (matchesTarget) {
                            arrivalsForThisDisplayDirection.push(train);
                        }
                    }
                }
            }
        };

        processDirection(apiData?.UP);
        processDirection(apiData?.DOWN);
        
        // Sort all matching trains by time to next train (ttnt)
        arrivalsForThisDisplayDirection.sort((a, b) => parseInt(a.ttnt) - parseInt(b.ttnt));

        if (arrivalsForThisDisplayDirection.length > 0) {
            let count = 0;
            arrivalsForThisDisplayDirection.forEach((train, index) => {
                if (count < 3) { // Show up to 3 arrivals
                    const li = document.createElement('li');
                    li.className = 'py-0.5 flex justify-between items-center w-full';
                    const arrivalTime = new Date(train.time); // API time is a full timestamp
                    const displayTime = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
                    const minutesText = formatMinutesLeft(parseInt(train.ttnt));
                    
                    const isFirstItem = index === 0;
                    const timeClass = isFirstItem ? 'font-semibold text-sm text-[var(--app-accent-color)]' : 'font-medium text-sm text-gray-500'; 
                    const waitingTimeClass = minutesText === 'Now!' ? 'text-now-emphasis text-right' : 'text-gray-500 text-right';
                    const waitingTimeSizeClass = isFirstItem ? 'text-sm' : 'text-sm';
                    const waitingTimeBoldClass = isFirstItem ? 'font-semibold' : '';
                    const waitingTimeColorClass = isFirstItem && minutesText !== 'Now!' ? 'text-[var(--app-accent-color)]' : '';

                    li.innerHTML = `<span class="${timeClass}">${displayTime}</span> <span class="${waitingTimeClass} ${waitingTimeBoldClass} ${waitingTimeSizeClass} ${waitingTimeColorClass}">${minutesText}</span>`;
                    targetEl.appendChild(li);
                    count++;
                }
            });
                if (count === 0) { // If after filtering, no valid trains for this specific direction
                    targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No valid upcoming trains for this direction.</li>';
            }
        } else if (apiData && apiData.specialMessage) {
                targetEl.innerHTML = `<li class="italic text-orange-600 text-sm">${apiData.specialMessage}</li>`;
        }
            else {
            targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No services for this direction.</li>';
        }
    };

    // Helper to render bus arrivals from mock data
    const renderArrivalsFromMock = (arrivals, targetEl) => {
        if (!targetEl) return; // Guard against null element
        targetEl.innerHTML = '';
        if (!arrivals || arrivals.length === 0) {
            targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No further services found.</li>';
        } else {
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

                const timeDisplayString = arr.time;
                li.innerHTML = `<span class="${timeClass}">${timeDisplayString}</span><span class="${waitingTimeClass} ${waitingTimeBoldClass} ${waitingTimeSizeClass} ${waitingTimeColorClass}">${minutesText}</span>`;
                targetEl.appendChild(li);
            });
        }
    };

    if (type === 'train') {
        if (apiTrainData && lineConfig) {
            renderArrivalsFromAPI(apiTrainData, dir1TimesEl, lineConfig.endpoint1ActualDestCode);
            renderArrivalsFromAPI(apiTrainData, dir2TimesEl, lineConfig.endpoint2ActualDestCode);
        } else if (!apiTrainData && dir1TimesEl && dir2TimesEl && (!dir1TimesEl.hasChildNodes() && !dir2TimesEl.hasChildNodes())) { // Only show error if not already loading
            if(dir1TimesEl) dir1TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">Could not load schedule.</li>';
            if(dir2TimesEl) dir2TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">Could not load schedule.</li>';
        }
    } else { // Bus
        if (!scheduleData || !scheduleData.direction1Times || !scheduleData.direction2Times) { 
            if(dir1TimesEl) dir1TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">No data available.</li>';
            if(dir2TimesEl) dir2TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">No data available.</li>';
            return;
        }
        if (dir1TimesEl) renderArrivalsFromMock(getNextArrivals(scheduleData.direction1Times, now, selectedValue, 'direction1Times', currentDayTypeForBusRoute), dir1TimesEl);
        if (dir2TimesEl) renderArrivalsFromMock(getNextArrivals(scheduleData.direction2Times, now, selectedValue, 'direction2Times', currentDayTypeForBusRoute), dir2TimesEl);
    }
}

// Display static bus schedule on Schedule pane
function displayStaticBusSchedule(selectedRouteAndDirection, scheduleType) {
    const tableContainer = document.getElementById('static-bus-schedule-table-container');
    const fixedHeaderEl = document.getElementById('static-schedule-fixed-header');
    if (!tableContainer || !fixedHeaderEl) return; // Guard if elements don't exist
    tableContainer.innerHTML = ''; // Clear previous table

    if (!selectedRouteAndDirection) {
        tableContainer.innerHTML = '<p class="text-gray-500 text-sm px-2 sm:px-3">Please select a route, direction, and schedule type.</p>';
        fixedHeaderEl.style.display = 'none'; // Hide header
        return;
    }
    if (!scheduleType) {
            tableContainer.innerHTML = '<p class="text-gray-500 text-sm px-2 sm:px-3">Please select a schedule type.</p>';
            fixedHeaderEl.style.display = 'none';
        return;
    }

    const [actualRouteName, directionKeyFromValue] = selectedRouteAndDirection.split('__');
    
    if (!actualRouteName || !directionKeyFromValue) {
            tableContainer.innerHTML = '<p class="text-red-500 text-sm px-2 sm:px-3">Invalid route selection.</p>';
            fixedHeaderEl.style.display = 'none';
        return;
    }

    const routeSchedules = mockSchedules.bus[actualRouteName];
    if (!routeSchedules) {
        tableContainer.innerHTML = '<p class="text-red-600 text-sm px-2 sm:px-3">Route data not found.</p>';
        fixedHeaderEl.style.display = 'none';
        return;
    }
    const scheduleDataForType = routeSchedules[scheduleType];
    if (!scheduleDataForType || !scheduleDataForType[directionKeyFromValue]) {
        tableContainer.innerHTML = `<p class="text-red-600 text-sm px-2 sm:px-3">No ${scheduleType.replace(/([A-Z])/g, ' $1').toLowerCase()} schedule found for this route and direction.</p>`;
        fixedHeaderEl.style.display = 'none';
        return;
    }
    
    const timesArray = scheduleDataForType[directionKeyFromValue];
    
    // Group times by hour for table display
    const groupTimesByHour = (arr) => {
        const grouped = {};
        (arr || []).forEach(timeStr => { // Handle potentially undefined/empty array
            const [hour, minute] = timeStr.split(':');
            if (!grouped[hour]) grouped[hour] = [];
            grouped[hour].push(minute);
        });
        return grouped;
    };

    const hourlyTimes = groupTimesByHour(timesArray);
    const sortedHours = Object.keys(hourlyTimes).sort((a, b) => parseInt(a) - parseInt(b));

    if (sortedHours.length === 0) { // Check if there are any times to display
            tableContainer.innerHTML = `<p class="text-gray-500 text-sm px-2 sm:px-3">No departures found for the selected criteria.</p>`;
            fixedHeaderEl.style.display = 'none';
        return;
    }
    
    fixedHeaderEl.style.display = 'flex'; // Show header since there's data

    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    sortedHours.forEach(hourStr => {
        const tr = document.createElement('tr');
        
        const tdHour = document.createElement('td');
        tdHour.className = 'hour-cell'; // Class handles width and specific styling
        tdHour.textContent = hourStr;
        tr.appendChild(tdHour);

        const tdDirMinutes = document.createElement('td');
        tdDirMinutes.className = 'minutes-cell'; // Class handles width and specific styling
        if (hourlyTimes[hourStr]) {
            hourlyTimes[hourStr].forEach(minute => {
                const span = document.createElement('span');
                span.className = 'minute-item';
                span.textContent = minute;
                tdDirMinutes.appendChild(span);
            });
        } else {
            tdDirMinutes.textContent = '--'; 
        }
        tr.appendChild(tdDirMinutes);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

// Load user preferences from localStorage
function loadPreferences() {
    const favBus = localStorage.getItem('favoriteBusRoute');
    const favTrainLine = localStorage.getItem('favoriteTrainLine');
    const favTrainStation = localStorage.getItem('favoriteTrainStation');

    // Set favorite bus route on Home and Settings
    if (favBus && busRouteSelect && busRouteSelect.querySelector(`option[value="${favBus}"]`)) busRouteSelect.value = favBus;
    if (favBus && favoriteBusRouteSelect && favoriteBusRouteSelect.querySelector(`option[value="${favBus}"]`)) favoriteBusRouteSelect.value = favBus;
    
    // Set favorite train line and station for Home screen
    let homeLineVal = favTrainLine || Object.keys(mtrApiConfig)[0]; // Default to first line if no fav
    if (trainLineSelect) {
        if (trainLineSelect.querySelector(`option[value="${homeLineVal}"]`)) {
            trainLineSelect.value = homeLineVal;
        } else if (trainLineSelect.options.length > 0) { // Fallback if fav line is somehow invalid
            trainLineSelect.value = trainLineSelect.options[0].value;
        }
    }

    let homeStationVal = favTrainStation;
    // If there's a selected line but no fav station, use the line's default station
    if (trainLineSelect && trainLineSelect.value && mtrApiConfig[trainLineSelect.value] && !favTrainStation) {
        homeStationVal = mtrApiConfig[trainLineSelect.value].defaultStationName;
    }
    populateTrainStations(trainLineSelect, trainStationSelect, trainLineSelect.value, homeStationVal);

    // Set favorite train line and station for Settings screen
    if (favoriteTrainLineSelect) {
        let favSettingsLineVal = favTrainLine || ""; // Default to "None" if no fav
            if (favoriteTrainLineSelect.querySelector(`option[value="${favSettingsLineVal}"]`)) {
            favoriteTrainLineSelect.value = favSettingsLineVal;
        } else {
                favoriteTrainLineSelect.value = ""; // Fallback to "None"
        }

        let favSettingsStationVal = favTrainStation;
            // If a line is selected in settings but no station, try to set its default
            if (!favSettingsStationVal && favoriteTrainLineSelect.value && mtrApiConfig[favoriteTrainLineSelect.value]) {
            favSettingsStationVal = mtrApiConfig[favoriteTrainLineSelect.value].defaultStationName;
        }
        populateTrainStations(favoriteTrainLineSelect, favoriteTrainStationSelect, favoriteTrainLineSelect.value, favSettingsStationVal);
    }
}

// Show "Settings Saved" message
function showSettingsSavedMessage() {
    settingsSavedMessageEl.classList.remove('hidden');
    settingsSavedMessageEl.classList.add('show');
    setTimeout(() => {
        settingsSavedMessageEl.classList.remove('show');
        setTimeout(() => settingsSavedMessageEl.classList.add('hidden'), 500); // Wait for fade out
    }, 2500);
}


// Event Listeners for Saving Preferences
if(saveFavoriteBusButton) saveFavoriteBusButton.addEventListener('click', () => {
    const selectedFavBus = favoriteBusRouteSelect.value;
    localStorage.setItem('favoriteBusRoute', selectedFavBus);
    // Update home screen bus route if a favorite is set
    if (busRouteSelect && selectedFavBus && busRouteSelect.querySelector(`option[value="${selectedFavBus}"]`)) busRouteSelect.value = selectedFavBus;
    showSettingsSavedMessage();
    updateLiveSchedules(); // Refresh home screen with new preference
});

if(saveFavoriteTrainButton) saveFavoriteTrainButton.addEventListener('click', () => {
    const selectedFavTrainLine = favoriteTrainLineSelect.value;
    const selectedFavTrainStation = favoriteTrainStationSelect.value;
    localStorage.setItem('favoriteTrainLine', selectedFavTrainLine);
    localStorage.setItem('favoriteTrainStation', selectedFavTrainStation);

    // Update home screen train selectors if a favorite is set
    if (trainLineSelect && selectedFavTrainLine && trainLineSelect.querySelector(`option[value="${selectedFavTrainLine}"]`)) {
        trainLineSelect.value = selectedFavTrainLine;
        populateTrainStations(trainLineSelect, trainStationSelect, selectedFavTrainLine, selectedFavTrainStation);
    } else if (trainLineSelect && trainLineSelect.options.length > 0) { // If "None" is chosen, reset home to default
            trainLineSelect.value = trainLineSelect.options[0].value; // First actual line
            populateTrainStations(trainLineSelect, trainStationSelect, trainLineSelect.value, mtrApiConfig[trainLineSelect.value]?.defaultStationName || "");
    }
    showSettingsSavedMessage();
    updateLiveSchedules(); // Refresh home screen
});

// Update live schedules (called on load, tab change, and interval)
async function updateLiveSchedules() { 
    const now = new Date();
    const homePaneActive = document.getElementById('home-pane').classList.contains('active');
    const schedulePaneActive = document.getElementById('schedule-pane').classList.contains('active');


    // Update date/time display for the active pane
    if (homePaneActive) updateDateTimeDisplay(now, false);
    if (schedulePaneActive) updateDateTimeDisplay(now, true);


    // Only update schedule content if Home pane is active
    if (homePaneActive) {
        // Update Bus Schedule
        const currentBusRoute = busRouteSelect.value;
        if (currentBusRoute) {
            await displayLiveSchedule('bus', currentBusRoute, now); 
        } else if (busRouteSelect.options.length > 1 && busRouteSelect.options[0].value === "") { 
            busRouteSelect.selectedIndex = 1; // Select first actual route if "Select a Route" is an option and nothing chosen
            await displayLiveSchedule('bus', busRouteSelect.value, now);
        } else if (busRouteSelect.options.length > 0) {
                busRouteSelect.selectedIndex = 0; // Select first route if available
            await displayLiveSchedule('bus', busRouteSelect.value, now);
        }

        // Update Train Schedule
        let currentTrainLine = trainLineSelect.value;
        let currentTrainStation = trainStationSelect.value;

        // Ensure a line is selected if possible
        if (!currentTrainLine && trainLineSelect.options.length > 0) {
            for(let i=0; i < trainLineSelect.options.length; i++) {
                if(trainLineSelect.options[i].value) { // Find first non-empty option (skip "None" if it were there)
                    currentTrainLine = trainLineSelect.options[i].value;
                    trainLineSelect.value = currentTrainLine;
                    break;
                }
            }
        }
        
        // If a line is selected, ensure station is valid or set to default
        if (currentTrainLine && trainStationSelect) { 
            const lineData = mtrApiConfig[currentTrainLine]; 
            if (!lineData || !lineData.stations[currentTrainStation]) {
                const defaultStationForLine = lineData ? lineData.defaultStationName : "";
                populateTrainStations(trainLineSelect, trainStationSelect, currentTrainLine, defaultStationForLine); 
                currentTrainStation = trainStationSelect.value; 
            }
        }

        if (currentTrainLine && currentTrainStation) {
            await displayLiveSchedule('train', currentTrainStation, now, currentTrainLine);
        } else { 
            const dir1NameEl = document.getElementById(`train-direction1-name`);
            const dir1TimesEl = document.getElementById(`train-direction1-times`);
            const dir2NameEl = document.getElementById(`train-direction2-name`);
            const dir2TimesEl = document.getElementById(`train-direction2-times`);
            if(dir1NameEl) dir1NameEl.textContent = 'Direction 1';
            if(dir2NameEl) dir2NameEl.textContent = 'Direction 2';
            if(dir1TimesEl) dir1TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">Select line & station.</li>';
            if(dir2TimesEl) dir2TimesEl.innerHTML = '';
        }
    }
}

// Event Listeners for Home screen selectors
if (busRouteSelect) busRouteSelect.addEventListener('change', () => updateLiveSchedules());
if (trainLineSelect) {
    trainLineSelect.addEventListener('change', () => {
        const lineConfig = mtrApiConfig[trainLineSelect.value];
        const defaultStation = lineConfig ? lineConfig.defaultStationName : "";
        populateTrainStations(trainLineSelect, trainStationSelect, trainLineSelect.value, defaultStation); 
        updateLiveSchedules(); 
    });
}
if (trainStationSelect) trainStationSelect.addEventListener('change', () => updateLiveSchedules());

// Event Listener for Favorite Train Line (in Settings) to update its station list
if (favoriteTrainLineSelect) {
    favoriteTrainLineSelect.addEventListener('change', () => {
        const lineConfig = mtrApiConfig[favoriteTrainLineSelect.value];
        const defaultStation = lineConfig ? lineConfig.defaultStationName : ""; // Default station or empty if "None"
        populateTrainStations(favoriteTrainLineSelect, favoriteTrainStationSelect, favoriteTrainLineSelect.value, defaultStation);
    });
}

// Event Listeners for Static Schedule selectors
if (staticBusRouteSelect) {
    staticBusRouteSelect.addEventListener('change', () => {
        displayStaticBusSchedule(staticBusRouteSelect.value, currentStaticScheduleType);
    });
}

if (scheduleTypeSelectorContainer) {
    const typeButtons = scheduleTypeSelectorContainer.querySelectorAll('.schedule-type-segment');
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentStaticScheduleType = button.dataset.scheduletype;
            displayStaticBusSchedule(staticBusRouteSelect.value, currentStaticScheduleType);
        });
    });
}

// Initial Setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    populateAllSelectors(); 
    loadPreferences();    
    
    // Set Home tab and pane as active initially
    const firstTabButton = document.querySelector('.bottom-nav-button[data-tab="home"]');
    const homePane = document.getElementById('home-pane');

    // Reset all buttons and panes to ensure a clean start
    allTabButtons.forEach(btn => {
        btn.classList.remove('active');
        // Also reset inline styles that might have been set by JS if not using classes alone
        const iconWrapper = btn.querySelector('.bottom-nav-icon-wrapper');
        if (iconWrapper) iconWrapper.style.backgroundColor = ''; // Reset to CSS default
        const svgIcon = btn.querySelector('svg');
        if (svgIcon) svgIcon.style.stroke = ''; // Reset to CSS default
        const navText = btn.querySelector('.nav-text');
        if (navText) {
            navText.style.color = ''; // Reset to CSS default
            navText.style.fontWeight = ''; // Reset to CSS default
        }
    });
    contentPanes.forEach(pane => pane.classList.remove('active'));


    if (firstTabButton) {
            firstTabButton.classList.add('active'); // CSS will style this based on .active
            // Manually apply styles for the initially active button to match click behavior
            const iconWrapper = firstTabButton.querySelector('.bottom-nav-icon-wrapper');
            if(iconWrapper) iconWrapper.style.backgroundColor = 'var(--app-nav-icon-active-bg)';
            const svgIcon = firstTabButton.querySelector('svg');
            if(svgIcon) svgIcon.style.stroke = 'var(--app-accent-color)';
            const navText = firstTabButton.querySelector('.nav-text');
            if(navText) {
            navText.style.color = 'var(--app-text-active-color)';
            navText.style.fontWeight = '600';
            }
    }
    if (homePane) {
        homePane.classList.add('active'); 
    }
    
    const fixedHeader = document.getElementById('static-schedule-fixed-header');
    if(fixedHeader) fixedHeader.style.display = 'none'; // Initially hide static schedule header


    updateLiveSchedules(); // Initial schedule load
    setInterval(updateLiveSchedules, 30000); // Refresh live schedules every 30 seconds
    // Update time display every second
    setInterval(() => {
        const now = new Date();
        if (document.getElementById('home-pane')?.classList.contains('active')) {
            updateDateTimeDisplay(now, false);
        }
        if (document.getElementById('schedule-pane')?.classList.contains('active')) {
            updateDateTimeDisplay(now, true);
        }
    }, 1000);
});