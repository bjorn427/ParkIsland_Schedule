<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transit Schedules - Ive Inspired</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            overscroll-behavior-y: contain; 
            padding-bottom: 70px; 
            background-color: #f7f7f7; 
            color: #333333; 
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            height: 100vh; 
            display: flex; 
            flex-direction: column; 
        }
        main {
            flex-grow: 1; 
            overflow-y: auto; 
        }
        .content-pane#schedule-pane.active { 
            display: flex; 
            flex-direction: column;
            height: calc(100% - 0px); 
            overflow: hidden; 
        }
        .content-pane#schedule-pane.active > .card-ive { 
            display: flex;
            flex-direction: column;
            flex-grow: 1; 
            overflow: hidden; 
        }
        #static-bus-schedule-table-container {
            flex-grow: 1; 
            overflow-y: auto;
        }
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: transparent; 
        }
        ::-webkit-scrollbar-thumb {
            background: #cccccc; 
            border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #bbbbbb; 
        }
        select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%22%2016%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M4.5%206L8%209.5L11.5%206H4.5z%22%2F%3E%3C%2Fsvg%3E');
            background-repeat: no-repeat;
            background-position: right 0.5rem center;
            background-size: 10px auto;
            padding-right: 2rem; 
            border: 1px solid #e0e0e0; 
            background-color: #ffffff;
            border-radius: 6px; 
            color: #333333;
            font-weight: 400;
        }
        select:focus {
            outline: none;
            border-color: #aaaaaa; 
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05); 
        }
        .bottom-nav-button.active svg {
            stroke: #007AFF; 
        }
        .bottom-nav-button.active .nav-text {
            color: #007AFF; 
            font-weight: 500; 
        }
         .settings-button.active svg { 
             stroke: #007AFF; 
        }
        .content-pane {
            display: none;
            opacity: 0;
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .content-pane.active {
            display: block; 
            opacity: 1;
        }
        .static-schedule-table table {
            width: 100%;
            border-collapse: collapse;
        }
        .static-schedule-table th, .static-schedule-table td {
            border-bottom: 1px solid #eeeeee;
            padding: 10px 8px; 
            text-align: left;
            font-weight: 400;
            vertical-align: top; 
        }
        .static-schedule-table th {
            background-color: #f9f9f9;
            font-weight: 500;
            font-size: 0.9rem; /* Slightly larger header */
            text-align: center;
        }
        .static-schedule-table td.hour-cell {
            font-weight: 500;
            text-align: center;
            width: 25%; /* Adjusted width */
            font-size: 0.9rem; /* Larger hour */
        }
        .static-schedule-table td.minutes-cell {
            width: 75%; /* Adjusted width */
            font-size: 0.875rem; /* Larger minutes (text-sm equivalent) */
            line-height: 1.7; 
        }
        .static-schedule-table .minute-item {
            display: inline-block;
            margin-right: 8px; 
            margin-bottom: 3px;
        }
        .static-schedule-table tr:last-child td {
            border-bottom: none;
        }
        .text-now-emphasis {
            color: #007AFF; 
            font-weight: 600; 
        }
        .card-ive {
            background-color: #ffffff; 
            border-radius: 10px; 
            border: 1px solid #e8e8e8; 
        }
         .button-ive {
            background-color: #007AFF; 
            color: #ffffff; 
            transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);
            font-weight: 500;
            border-radius: 8px; 
            padding: 0.55rem 1rem; 
            text-transform: none; 
            letter-spacing: normal;
        }
        .button-ive:hover {
            background-color: #005ecb; 
        }
        .bottom-nav-ive {
            background-color: rgba(255, 255, 255, 0.95); 
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-top: 1px solid rgba(0, 0, 0, 0.08); 
        }
        .bottom-nav-button svg {
             transition: stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1);
             stroke-width: 1.5; 
        }
        .segmented-control-container {
            display: flex;
            background-color: #e9ecef; 
            border-radius: 8px;
            padding: 3px;
            width: 100%; 
        }
        .schedule-type-segment {
            padding: 0.4rem 0.75rem; /* Slightly increased padding */
            border-radius: 6px; 
            background-color: transparent;
            color: #495057; 
            font-size: 0.875rem; /* text-sm equivalent */
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.25s cubic-bezier(0.4,0,0.2,1), color 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1);
            text-align: center;
            flex-grow: 1; 
        }
        .schedule-type-segment.active { 
            background-color: #ffffff; 
            color: #007AFF; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06); 
        }
        .schedule-type-segment:hover:not(.active) { 
            background-color: rgba(0,0,0,0.04); 
        }
        .loading-text {
            color: #6b7280; 
            font-style: italic;
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800"> 
    <div class="min-h-screen flex flex-col"> 
        <main class="flex-grow p-3 sm:p-4"> 
            <div id="home-pane" class="content-pane">
                <div id="time-card" class="card-ive min-h-[60px] sm:min-h-[70px] rounded-xl p-2 sm:p-3 flex flex-col justify-center items-center mb-3 sm:mb-4">
                    <div id="current-time" class="text-xl sm:text-3xl font-medium text-gray-900">--:-- --</div>
                    <div id="current-day-date" class="text-sm text-gray-500 mt-0.5">----------, ---------- --, ----</div>
                </div>
                <div class="grid grid-cols-1 gap-3 sm:gap-4">
                    <div id="bus-schedule-card" class="card-ive rounded-xl p-3 sm:p-4 flex flex-col">
                        <h2 class="text-base sm:text-lg font-medium text-gray-700 mb-2 sm:mb-2.5">Park Island Departures</h2>
                        <select id="bus-route-select" class="w-full p-2 sm:p-2.5 border rounded-lg mb-2 sm:mb-2.5 text-sm"></select>
                        <div id="bus-schedule-display" class="flex flex-row gap-3 sm:gap-4 flex-grow">
                            <div class="w-1/2 flex flex-col">
                                <h3 id="bus-direction1-name" class="text-sm font-medium text-gray-600 sticky top-0 bg-white/90 backdrop-blur-sm pb-1 z-10">Direction 1</h3>
                                <div class="border-b border-gray-200 mb-1.5"></div> 
                                <ul id="bus-direction1-times" class="space-y-1 text-gray-700 flex-grow overflow-y-auto pr-1 max-h-[110px] sm:max-h-[120px] md:max-h-[130px]"></ul>
                            </div>
                            <div class="w-1/2 flex flex-col"> 
                                <h3 id="bus-direction2-name" class="text-sm font-medium text-gray-600 sticky top-0 bg-white/90 backdrop-blur-sm pb-1 z-10">Direction 2</h3>
                                <div class="border-b border-gray-200 mb-1.5"></div> 
                                <ul id="bus-direction2-times" class="space-y-1 text-gray-700 flex-grow overflow-y-auto pr-1 max-h-[110px] sm:max-h-[120px] md:max-h-[130px]"></ul>
                            </div>
                        </div>
                    </div>
                    <div id="train-schedule-card" class="card-ive rounded-xl p-3 sm:p-4 flex flex-col">
                        <h2 class="text-base sm:text-lg font-medium text-gray-700 mb-2 sm:mb-2.5">Train Departures</h2>
                        <select id="train-line-select" class="w-full p-2 sm:p-2.5 border rounded-lg mb-2 text-sm"></select>
                        <select id="train-station-select" class="w-full p-2 sm:p-2.5 border rounded-lg mb-2 sm:mb-2.5 text-sm"></select>
                        <div id="train-schedule-display" class="flex flex-row gap-3 sm:gap-4 flex-grow">
                            <div class="w-1/2 flex flex-col">
                                <h3 id="train-direction1-name" class="text-sm font-medium text-gray-600 sticky top-0 bg-white/90 backdrop-blur-sm pb-1 z-10">Direction 1</h3>
                                <div class="border-b border-gray-200 mb-1.5"></div> 
                                <ul id="train-direction1-times" class="space-y-1 text-gray-700 flex-grow overflow-y-auto pr-1 max-h-[110px] sm:max-h-[120px] md:max-h-[130px]"><li class="loading-text text-sm">Loading...</li></ul>
                            </div>
                            <div class="w-1/2 flex flex-col"> 
                                <h3 id="train-direction2-name" class="text-sm font-medium text-gray-600 sticky top-0 bg-white/90 backdrop-blur-sm pb-1 z-10">Direction 2</h3>
                                <div class="border-b border-gray-200 mb-1.5"></div> 
                                <ul id="train-direction2-times" class="space-y-1 text-gray-700 flex-grow overflow-y-auto pr-1 max-h-[110px] sm:max-h-[120px] md:max-h-[130px]"><li class="loading-text text-sm">Loading...</li></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="schedule-pane" class="content-pane">
                <div class="card-ive rounded-xl p-3 sm:p-4 md:p-6 flex flex-col h-full"> 
                    <h2 class="text-base sm:text-xl font-medium text-gray-700 mb-3 sm:mb-4 flex-shrink-0">Full Park Island Schedules</h2>
                    <select id="static-bus-route-select" class="w-full p-2 sm:p-3 border rounded-lg mb-4 text-sm flex-shrink-0">
                        <option value="">Select a Route and Direction</option> 
                    </select>
                    <div id="schedule-type-selector-container" class="segmented-control-container mb-4 flex-shrink-0"> 
                        <button data-scheduletype="weekday" class="schedule-type-segment active">Weekday</button>
                        <button data-scheduletype="saturday" class="schedule-type-segment">Saturday</button>
                        <button data-scheduletype="sundayPublicHoliday" class="schedule-type-segment">Sun/PH</button>
                    </div>
                    <div id="static-bus-schedule-table-container" class="static-schedule-table overflow-auto flex-grow">
                        <p class="text-gray-500 text-base px-2 sm:px-3">Please select a route, direction, and schedule type.</p>
                    </div>
                </div>
            </div>

            <div id="settings-pane" class="content-pane">
                <div class="card-ive rounded-xl p-3 sm:p-4 md:p-6">
                    <h2 class="text-base sm:text-xl font-medium text-gray-700 mb-4 sm:mb-6">Settings</h2>
                    <div class="space-y-5">
                        <div>
                            <label for="favorite-bus-route-select" class="block text-sm font-medium text-gray-700 mb-1.5">Favorite Park Island Route</label>
                            <select id="favorite-bus-route-select" class="w-full p-2 sm:p-3 border rounded-lg text-sm">
                                <option value="">None</option>
                            </select>
                            <button id="save-favorite-bus" class="button-ive mt-2.5 px-4 text-sm">Save Route Preference</button>
                        </div>
                        <div>
                            <label for="favorite-train-line-select" class="block text-sm font-medium text-gray-700 mb-1.5">Favorite Train Line</label>
                            <select id="favorite-train-line-select" class="w-full p-2 sm:p-3 border rounded-lg text-sm">
                                <option value="">None</option>
                            </select>
                             <label for="favorite-train-station-select" class="block text-sm font-medium text-gray-700 mb-1.5 mt-3">Favorite Station on this Line</label>
                            <select id="favorite-train-station-select" class="w-full p-2 sm:p-3 border rounded-lg text-sm">
                                <option value="">None</option>
                            </select>
                            <button id="save-favorite-train" class="button-ive mt-2.5 px-4 text-sm">Save Train Preference</button>
                        </div>
                    </div>
                    <p id="settings-saved-message" class="mt-4 text-green-600 text-sm"></p>

                    <div class="mt-8 pt-6 border-t border-gray-200">
                        <h3 class="text-base sm:text-lg font-medium text-gray-700 mb-2">About This App</h3>
                        <p class="text-gray-600 text-base leading-relaxed">TransitApp provides real-time departure information to streamline your commute, focusing on clarity and ease of use.</p>
                        <p class="text-gray-600 mt-2 text-sm">Version: 5.5.2 "Ive - Larger Body Text"</p>
                    </div>
                </div>
            </div>
        </main>

        <nav class="bottom-nav-ive fixed bottom-0 left-0 w-full z-30">
            <div class="max-w-md mx-auto flex justify-around items-center h-[70px]">
                <button data-tab="home" class="bottom-nav-button flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 p-2 flex-1 transition-colors">
                    <svg class="h-6 w-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    <span class="nav-text text-xs">Home</span>
                </button>
                <button data-tab="schedule" class="bottom-nav-button flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 p-2 flex-1 transition-colors">
                    <svg class="h-6 w-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span class="nav-text text-xs">Schedule</span> </button>
                <button data-tab="settings" class="bottom-nav-button flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 p-2 flex-1 transition-colors">
                     <svg class="h-6 w-6 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                    <span class="nav-text text-xs">Settings</span>
                </button>
            </div>
        </nav>
    </div>

    <script>
        function parseScheduleJsonToHHMM(jsonData) {
            const times = [];
            if (!jsonData) return times; 
            for (const hour in jsonData) {
                if (jsonData.hasOwnProperty(hour)) {
                    const minutesArray = jsonData[hour];
                    minutesArray.forEach(minute => {
                        const formattedHour = String(hour).padStart(2, '0'); 
                        const formattedMinute = String(minute).padStart(2, '0'); 
                        times.push(`${formattedHour}:${formattedMinute}`);
                    });
                }
            }
            return times.sort(); 
        }

        const tsingYiToMaWanWeekdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30,45],"01":[15],"02":[0,45],"03":[30],"04":[15],"05":[0,45],"06":[15,30,40,50],"07":[0,10,20,30,40,50],"08":[0,10,20,30,40,50],"09":[0,10,20,30,40,50],"10":[0,10,20,30,40,50],"11":[0,10,20,30,40,50],"12":[0,10,20,30,40,50],"13":[0,10,20,30,40,50],"14":[0,10,20,30,40,50],"15":[0,10,20,30,40,50],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,5,10,15,20,25,30,35,40,45,50,55],"20":[0,6,12,18,24,30,36,42,48,54],"21":[0,6,12,18,24,30,36,42,48,54],"22":[0,6,12,18,24,30,36,42,48,54],"23":[0,6,12,18,24,30,40,50]});
        const tsingYiToMaWanSaturdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30,45],"01":[15],"02":[0,45],"03":[30],"04":[15],"05":[0,45],"06":[15,30,40,50],"07":[0,10,20,30,40,50],"08":[0,10,20,30,40,50],"09":[0,10,20,30,40,50],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,6,12,18,24,30,36,42,48,54],"21":[0,6,12,18,24,30,36,42,48,54],"22":[0,6,12,18,24,30,36,42,48,54],"23":[0,6,12,18,24,30,40,50]});
        const tsingYiToMaWanHolidayTimes = parseScheduleJsonToHHMM ({"00":[0,15,30,45],"01":[15],"02":[0,45],"03":[30],"04":[15],"05":[0,45],"06":[15,30,40,50],"07":[0,10,20,30,40,50],"08":[0,10,20,30,40,50],"09":[0,10,20,30,40,50],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,6,12,18,24,30,36,42,48,54],"21":[0,6,12,18,24,30,36,42,48,54],"22":[0,6,12,18,24,30,36,42,48,54],"23":[0,6,12,18,24,30,40,50]});
        
        const maWanToTsingYiWeekdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30],"01":[0,45],"02":[30],"03":[15],"04":[0,45],"05":[30],"06":[0,15,30,35,40,45,50,55],"07":[0,5,10,15,20,25,30,34,38,42,46,50,54,58],"08":[2,6,10,14,18,22,26,30,35,40,45,50,55],"09":[0,5,10,15,20,25,30,35,40,45,50,55],"10":[0,10,20,30,40,50],"11":[0,10,20,30,40,50],"12":[0,10,20,30,40,50],"13":[0,10,20,30,40,50],"14":[0,10,20,30,40,50],"15":[0,10,20,30,40,50],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,6,12,18,24,30,36,42,48,54],"18":[0,6,12,18,24,30,36,42,48,54],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,12,24,36,48],"21":[0,12,24,36,48],"22":[0,12,24,36,48],"23":[0,15,30,45]});
        const maWanToTsingYiSaturdayTimes = parseScheduleJsonToHHMM({"00":[0,15,30],"01":[0,45],"02":[30],"03":[15],"04":[0,45],"05":[30],"06":[0,15,30,40,50],"07":[0,10,20,30,35,40,45,50,55],"08":[0,5,10,15,20,25,30,35,40,45,50,55],"09":[0,6,12,18,24,30,36,42,48,54],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,12,24,36,48],"21":[0,12,24,36,48],"22":[0,12,24,36,48],"23":[0,15,30,45]});
        const maWanToTsingYiHolidayTimes = parseScheduleJsonToHHMM({"00":[0,15,30],"01":[0,45],"02":[30],"03":[15],"04":[0,45],"05":[30],"06":[0,15,30,40,50],"07":[0,10,20,30,35,40,45,50,55],"08":[0,5,10,15,20,25,30,35,40,45,50,55],"09":[0,6,12,18,24,30,36,42,48,54],"10":[0,6,12,18,24,30,36,42,48,54],"11":[0,5,10,15,20,25,30,35,40,45,50,55],"12":[0,5,10,15,20,25,30,35,40,45,50,55],"13":[0,6,12,18,24,30,36,42,48,54],"14":[0,6,12,18,24,30,36,42,48,54],"15":[0,6,12,18,24,30,36,42,48,54],"16":[0,6,12,18,24,30,36,42,48,54],"17":[0,5,10,15,20,25,30,35,40,45,50,55],"18":[0,5,10,15,20,25,30,35,40,45,50,55],"19":[0,6,12,18,24,30,36,42,48,54],"20":[0,12,24,36,48],"21":[0,12,24,36,48],"22":[0,12,24,36,48],"23":[0,15,30,45]});

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
                "Kwai Fong <-> Park Island": { 
                    weekday: { direction1Name: "To Park Island (Bus)", direction1Times: ["05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"], direction2Name: "To Kwai Fong (Bus)", direction2Times: ["05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30"] },
                    saturday: { direction1Name: "To Park Island (Bus)", direction1Times: ["07:00", "08:30", "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:30"], direction2Name: "To Kwai Fong (Bus)", direction2Times: ["07:45", "09:15", "10:45", "12:15", "13:45", "15:15", "16:45", "18:15", "19:45", "21:15"] },
                    sundayPublicHoliday: { direction1Name: "To Park Island (Bus)", direction1Times: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"], direction2Name: "To Kwai Fong (Bus)", direction2Times: ["09:45", "11:45", "13:45", "15:45", "17:45", "19:45"] }
                },
                "Tsuen Wan <-> Park Island": { 
                    weekday: { direction1Name: "To Park Island (Bus)", direction1Times: ["07:00", "07:30", "08:00", "08:30", "16:30", "17:00", "17:30", "18:00", "19:00", "20:00"], direction2Name: "To Tsuen Wan (Bus)", direction2Times: ["07:20", "07:50", "08:20", "08:50", "16:50", "17:20", "17:50", "18:20", "19:20", "20:20"] },
                    saturday: { direction1Name: "To Park Island (Bus)", direction1Times: ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"], direction2Name: "To Tsuen Wan (Bus)", direction2Times: ["09:30", "10:30", "11:30", "12:30", "14:30", "15:30", "16:30", "17:30", "18:30"] },
                    sundayPublicHoliday: { direction1Name: "To Park Island (Bus)", direction1Times: ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"], direction2Name: "To Tsuen Wan (Bus)", direction2Times: ["10:45", "12:15", "13:45", "15:15", "16:45", "18:15"] }
                },
                 "Central Pier <-> Park Island": { 
                    weekday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["07:00", "07:30", "08:00", "08:30", "09:00", "17:00", "17:30", "18:00", "18:30", "19:00"], direction2Name: "To Central Pier (Ferry)", direction2Times: ["07:15", "07:45", "08:15", "08:45", "09:15", "17:15", "17:45", "18:15", "18:45", "19:15"] },
                    saturday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"], direction2Name: "To Central Pier (Ferry)", direction2Times: ["08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30"] },
                    sundayPublicHoliday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"], direction2Name: "To Central Pier (Ferry)", direction2Times: ["09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30"] }
                },
                "Tsuen Wan Pier <-> Park Island": { 
                    weekday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["07:10", "07:40", "08:10", "08:40", "17:10", "17:40", "18:10", "18:40"], direction2Name: "To Tsuen Wan Pier (Ferry)", direction2Times: ["07:25", "07:55", "08:25", "08:55", "17:25", "17:55", "18:25", "18:55"] },
                    saturday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["08:15", "09:15", "10:15", "11:15", "12:15", "13:15", "14:15", "15:15"], direction2Name: "To Tsuen Wan Pier (Ferry)", direction2Times: ["08:45", "09:45", "10:45", "11:45", "12:45", "13:45", "14:45", "15:45"] },
                    sundayPublicHoliday: { direction1Name: "To Park Island (Ferry)", direction1Times: ["09:20", "10:20", "11:20", "12:20", "13:20", "14:20"], direction2Name: "To Tsuen Wan Pier (Ferry)", direction2Times: ["09:50", "10:50", "11:50", "12:50", "13:50", "14:50"] }
                }
            },
            train: mtrApiConfig 
        };

        const currentTimeEl = document.getElementById('current-time');
        const currentDayDateEl = document.getElementById('current-day-date'); 
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
        let currentStaticScheduleType = 'weekday'; 

        allTabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.dataset.tab; 
                allTabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                contentPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === `${targetTab}-pane`) pane.classList.add('active');
                });
                if (targetTab === 'home') updateLiveSchedules();
                if (targetTab === 'schedule') { 
                    if (staticBusRouteSelect.value === "" && staticBusRouteSelect.options.length > 1) {
                         if (staticBusRouteSelect.options[0].value === "") staticBusRouteSelect.selectedIndex = 1;
                    }
                    displayStaticBusSchedule(staticBusRouteSelect.value, currentStaticScheduleType); 
                }
            });
        });
        
        function getCurrentDayType(date) {
            const day = date.getDay(); 
            if (day === 0) return 'sundayPublicHoliday';
            if (day === 6) return 'saturday';
            return 'weekday';
        }

        function updateDateTimeDisplay(now) {
            if (currentTimeEl) currentTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            if (currentDayDateEl) {
                 currentDayDateEl.textContent = `${now.toLocaleDateString([], { weekday: 'long' })}, ${now.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}`;
            }
        }
        
        function populateTrainStations(lineSelectElement, stationSelectElement, selectedLineName, selectedStationNameToSet) {
            stationSelectElement.innerHTML = ''; 
            const lineConfig = mtrApiConfig[selectedLineName]; 
            if (selectedLineName && lineConfig) {
                const stationNames = (lineConfig.apiLineCode === "TCL") 
                    ? ["Tung Chung", "Sunny Bay", "Tsing Yi", "Lai King", "Nam Cheong", "Olympic", "Kowloon", "Hong Kong"]
                    : Object.keys(lineConfig.stations);

                stationNames.forEach(stationName => {
                    if (lineConfig.stations[stationName]) { 
                        const option = document.createElement('option');
                        option.value = stationName; 
                        option.textContent = stationName;
                        stationSelectElement.appendChild(option);
                    }
                });
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
        
        function populateAllSelectors() {
            [busRouteSelect, favoriteBusRouteSelect].forEach(sel => {
                if(sel) {
                    const currentValue = sel.value; 
                    sel.innerHTML = ''; 
                     if (sel === favoriteBusRouteSelect) { 
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

            if (staticBusRouteSelect) {
                const currentValue = staticBusRouteSelect.value;
                staticBusRouteSelect.innerHTML = '';
                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.textContent = "Select a Route and Direction";
                staticBusRouteSelect.appendChild(defaultOption);

                Object.keys(mockSchedules.bus).forEach(routeName => {
                    const routeData = mockSchedules.bus[routeName];
                    const scheduleForNames = routeData.weekday || routeData.saturday || routeData.sundayPublicHoliday; 
                    if (scheduleForNames) {
                        const dir1Name = (scheduleForNames.direction1Name || 'Direction 1').replace(/\s\(.*\)$/, '');
                        const dir2Name = (scheduleForNames.direction2Name || 'Direction 2').replace(/\s\(.*\)$/, '');

                        const option1 = document.createElement('option');
                        option1.value = `${routeName}__direction1Times`; 
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

            [trainLineSelect, favoriteTrainLineSelect].forEach(sel => {
                if (sel) {
                    const currentValue = sel.value;
                    sel.innerHTML = '';
                    if (sel === favoriteTrainLineSelect) {
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
                        const firstValidOption = Object.keys(mtrApiConfig)[0];
                        if (firstValidOption) sel.value = firstValidOption;
                    }
                }
            });
            
            const defaultHomeLine = trainLineSelect.value;
            const defaultHomeStation = mtrApiConfig[defaultHomeLine] ? mtrApiConfig[defaultHomeLine].defaultStationName : "Tsing Yi";
            populateTrainStations(trainLineSelect, trainStationSelect, defaultHomeLine, defaultHomeStation);

            const defaultFavLine = favoriteTrainLineSelect.value;
            const defaultFavStation = mtrApiConfig[defaultFavLine] ? mtrApiConfig[defaultFavLine].defaultStationName : "";
            populateTrainStations(favoriteTrainLineSelect, favoriteTrainStationSelect, defaultFavLine, defaultFavStation);
        }
        
        async function fetchTrainSchedule(lineName, stationName) {
            const lineConfig = mtrApiConfig[lineName];
            if (!lineConfig || !lineConfig.stations[stationName]) {
                console.error("Invalid line or station for API call:", lineName, stationName);
                return null;
            }
            const lineCode = lineConfig.apiLineCode;
            const stationCode = lineConfig.stations[stationName];
            const apiUrl = `https://rt.data.gov.hk/v1/transport/mtr/getSchedule.php?line=${lineCode}&sta=${stationCode}&lang=EN`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    console.error("API request failed with status:", response.status);
                    return null; 
                }
                const data = await response.json();
                if (data.status === 1 && data.data && data.data[`${lineCode}-${stationCode}`]) {
                    return data.data[`${lineCode}-${stationCode}`];
                } else if (data.status === 0) { 
                    return { specialMessage: data.message, alertUrl: data.url }; 
                } else {
                    console.warn("API returned no valid schedule data:", data);
                    return null;
                }
            } catch (error) {
                console.error("Error fetching train schedule:", error);
                return null;
            }
        }

        function formatMinutesLeft(totalMinutes) {
            if (totalMinutes <= 1) return 'Now!';
            if (totalMinutes < 60) return `${totalMinutes}min`;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            let hourText = `${hours}h`;
            if (minutes === 0) return hourText;
            let minuteText = `${minutes}min`;
            return `${hourText} ${minuteText}`;
        }
        
        function getNextArrivals(currentScheduleTimes, now, routeName, directionKey, currentDayTypeForRoute) {
            const upcoming = [];
            const MAX_ARRIVALS_TO_SHOW = 3;

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

            if (routeName && upcoming.length < MAX_ARRIVALS_TO_SHOW) {
                const tomorrowDate = new Date(now);
                tomorrowDate.setDate(now.getDate() + 1); 
                const nextDayType = getCurrentDayType(tomorrowDate); 

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
                        const nextDayScheduleDateTime = new Date(tomorrowDate); 
                        nextDayScheduleDateTime.setHours(hours, minutes, 0, 0);
                        
                        const diffMs = nextDayScheduleDateTime - now; 
                        const diffTotalMinutes = Math.ceil(diffMs / 60000);
                        upcoming.push({ time: timeStr, minutesLeft: diffTotalMinutes, isNextDay: true });
                    }
                }
            }
            return upcoming;
        }


        async function displayLiveSchedule(type, selectedValue, now, selectedLineValue) { 
            let scheduleData; 
            let dir1DisplayHeader = "Direction 1";
            let dir2DisplayHeader = "Direction 2";
            let apiTrainData = null;
            let lineConfig = null;
            let currentDayTypeForBusRoute = getCurrentDayType(now); 

            if (type === 'bus') {
                const routeScheduleAllTypes = mockSchedules.bus[selectedValue];
                if (routeScheduleAllTypes) {
                    scheduleData = routeScheduleAllTypes[currentDayTypeForBusRoute];
                    if (scheduleData) { 
                        dir1DisplayHeader = (scheduleData.direction1Name || "Direction 1").replace(/\s\([\w\s\/]+\)$/, ''); 
                        dir2DisplayHeader = (scheduleData.direction2Name || "Direction 2").replace(/\s\([\w\s\/]+\)$/, '');
                    }
                }
            } else if (type === 'train') {
                lineConfig = mtrApiConfig[selectedLineValue];
                if (lineConfig && lineConfig.stations[selectedValue]) {
                    apiTrainData = await fetchTrainSchedule(selectedLineValue, selectedValue);
                    dir1DisplayHeader = lineConfig.endpoint1NameForDisplay; 
                    dir2DisplayHeader = lineConfig.endpoint2NameForDisplay;
                }
            }

            const dir1NameEl = document.getElementById(`${type}-direction1-name`);
            const dir1TimesEl = document.getElementById(`${type}-direction1-times`);
            const dir2NameEl = document.getElementById(`${type}-direction2-name`);
            const dir2TimesEl = document.getElementById(`${type}-direction2-times`);

            if (dir1NameEl) dir1NameEl.textContent = dir1DisplayHeader;
            if (dir2NameEl) dir2NameEl.textContent = dir2DisplayHeader;
            
            const renderArrivalsFromAPI = (apiData, targetEl, targetDestCodeOrCodes) => {
                targetEl.innerHTML = '';
                let arrivalsForThisDisplayDirection = [];

                const processDirection = (directionArray) => { 
                    if (apiData && directionArray && directionArray.length > 0) {
                        for (const train of directionArray) {
                            if (train.valid === "Y") {
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
                
                arrivalsForThisDisplayDirection.sort((a, b) => parseInt(a.ttnt) - parseInt(b.ttnt));

                if (arrivalsForThisDisplayDirection.length > 0) {
                    let count = 0;
                    for (const train of arrivalsForThisDisplayDirection) {
                         if (count < 3) {
                            const li = document.createElement('li');
                            li.className = 'py-1.5 text-sm flex justify-between items-center w-full';
                            const arrivalTime = new Date(train.time);
                            const displayTime = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const minutesText = formatMinutesLeft(parseInt(train.ttnt));
                            const waitingTimeClass = minutesText === 'Now!' ? 'text-now-emphasis text-right' : 'text-blue-600 text-right';
                            const destName = stationCodeToNameMap[train.dest] || train.dest; 
                            li.innerHTML = `<span class="font-medium text-gray-700">${displayTime}</span> <span class="text-xs text-gray-500 mr-1">(to ${destName})</span> <span class="${waitingTimeClass}">${minutesText}</span>`;
                            targetEl.appendChild(li);
                            count++;
                        } else {
                            break; 
                        }
                    }
                     if (count === 0) { 
                         targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No valid upcoming trains for this direction.</li>';
                    }
                } else if (apiData && apiData.specialMessage) {
                     targetEl.innerHTML = `<li class="italic text-orange-600 text-sm">${apiData.specialMessage}</li>`;
                }
                 else {
                    targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No services for this direction.</li>';
                }
            };

            const renderArrivalsFromMock = (arrivals, targetEl) => {
                targetEl.innerHTML = '';
                if (!arrivals || arrivals.length === 0) {
                    targetEl.innerHTML = '<li class="italic text-gray-500 text-sm">No further services found.</li>';
                } else {
                    arrivals.forEach(arr => {
                        const li = document.createElement('li');
                        li.className = 'py-1.5 text-sm flex justify-between items-center w-full'; 
                        const minutesText = formatMinutesLeft(arr.minutesLeft);
                        const waitingTimeClass = minutesText === 'Now!' ? 'text-now-emphasis text-right' : 'text-blue-600 text-right'; 
                        const timeDisplayString = arr.time;
                        li.innerHTML = `<span class="font-medium text-gray-700">${timeDisplayString}</span><span class="${waitingTimeClass}">${minutesText}</span>`;
                        targetEl.appendChild(li);
                    });
                }
            };

            if (type === 'train') {
                if (apiTrainData && lineConfig) {
                    renderArrivalsFromAPI(apiTrainData, dir1TimesEl, lineConfig.endpoint1ActualDestCode);
                    renderArrivalsFromAPI(apiTrainData, dir2TimesEl, lineConfig.endpoint2ActualDestCode);
                } else {
                    if(dir1TimesEl) dir1TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">Could not load schedule.</li>';
                    if(dir2TimesEl) dir2TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">Could not load schedule.</li>';
                }
            } else { 
                if (!scheduleData || !scheduleData.direction1Times || !scheduleData.direction2Times) { 
                    if(dir1TimesEl) dir1TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">No data available.</li>';
                    if(dir2TimesEl) dir2TimesEl.innerHTML = '<li class="italic text-gray-500 text-sm">No data available.</li>';
                    return;
                }
                if (dir1TimesEl) renderArrivalsFromMock(getNextArrivals(scheduleData.direction1Times, now, selectedValue, 'direction1Times', currentDayTypeForBusRoute), dir1TimesEl);
                if (dir2TimesEl) renderArrivalsFromMock(getNextArrivals(scheduleData.direction2Times, now, selectedValue, 'direction2Times', currentDayTypeForBusRoute), dir2TimesEl);
            }
        }
        
        function displayStaticBusSchedule(selectedRouteAndDirection, scheduleType) {
            staticBusScheduleTableContainer.innerHTML = ''; 

            if (!selectedRouteAndDirection) {
                staticBusScheduleTableContainer.innerHTML = '<p class="text-gray-500 text-base px-2 sm:px-3">Please select a route, direction, and schedule type.</p>';
                return;
            }
            if (!scheduleType) {
                 staticBusScheduleTableContainer.innerHTML = '<p class="text-gray-500 text-base px-2 sm:px-3">Please select a schedule type.</p>';
                return;
            }

            const [actualRouteName, directionKeyFromValue] = selectedRouteAndDirection.split('__');
            
            if (!actualRouteName || !directionKeyFromValue) {
                 staticBusScheduleTableContainer.innerHTML = '<p class="text-red-500 text-base px-2 sm:px-3">Invalid route selection.</p>';
                return;
            }

            const routeSchedules = mockSchedules.bus[actualRouteName];
            if (!routeSchedules) {
                staticBusScheduleTableContainer.innerHTML = '<p class="text-red-600 text-base px-2 sm:px-3">Route data not found.</p>';
                return;
            }
            const scheduleDataForType = routeSchedules[scheduleType];
            if (!scheduleDataForType || !scheduleDataForType[directionKeyFromValue]) {
                staticBusScheduleTableContainer.innerHTML = `<p class="text-red-600 text-base px-2 sm:px-3">No ${scheduleType.replace(/([A-Z])/g, ' $1').toLowerCase()} schedule found for this route and direction.</p>`;
                return;
            }
            
            const timesArray = scheduleDataForType[directionKeyFromValue];
            
            const groupTimesByHour = (arr) => {
                const grouped = {};
                (arr || []).forEach(timeStr => { 
                    const [hour, minute] = timeStr.split(':');
                    if (!grouped[hour]) grouped[hour] = [];
                    grouped[hour].push(minute);
                });
                return grouped;
            };

            const hourlyTimes = groupTimesByHour(timesArray);
            const sortedHours = Object.keys(hourlyTimes).sort((a, b) => parseInt(a) - parseInt(b));

            if (sortedHours.length === 0) { 
                 staticBusScheduleTableContainer.innerHTML = `<p class="text-gray-500 text-base px-2 sm:px-3">No departures found for the selected criteria.</p>`;
                return;
            }

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');

            const headerRow = document.createElement('tr');
            const thHour = document.createElement('th');
            thHour.textContent = 'Hour';
            headerRow.appendChild(thHour);
            
            const thMinutes = document.createElement('th');
            thMinutes.textContent = 'Minutes'; 
            headerRow.appendChild(thMinutes);
            
            thead.appendChild(headerRow);
            table.appendChild(thead);

            sortedHours.forEach(hourStr => {
                const tr = document.createElement('tr');
                
                const tdHour = document.createElement('td');
                tdHour.className = 'hour-cell';
                tdHour.textContent = hourStr;
                tr.appendChild(tdHour);

                const tdDirMinutes = document.createElement('td');
                tdDirMinutes.className = 'minutes-cell';
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
            staticBusScheduleTableContainer.appendChild(table);
        }
        
        function loadPreferences() {
            const favBus = localStorage.getItem('favoriteBusRoute');
            const favTrainLine = localStorage.getItem('favoriteTrainLine');
            const favTrainStation = localStorage.getItem('favoriteTrainStation');

            if (favBus && busRouteSelect && busRouteSelect.querySelector(`option[value="${favBus}"]`)) busRouteSelect.value = favBus;
            if (favBus && favoriteBusRouteSelect && favoriteBusRouteSelect.querySelector(`option[value="${favBus}"]`)) favoriteBusRouteSelect.value = favBus;
            
            let homeLineVal = favTrainLine || Object.keys(mtrApiConfig)[0]; 
            if (trainLineSelect) {
                if (trainLineSelect.querySelector(`option[value="${homeLineVal}"]`)) {
                    trainLineSelect.value = homeLineVal;
                } else if (trainLineSelect.options.length > 0) { 
                    trainLineSelect.value = trainLineSelect.options[0].value;
                }
            }

            let homeStationVal = favTrainStation;
            if (trainLineSelect.value && mtrApiConfig[trainLineSelect.value] && !favTrainStation) {
                homeStationVal = mtrApiConfig[trainLineSelect.value].defaultStationName;
            }
            populateTrainStations(trainLineSelect, trainStationSelect, trainLineSelect.value, homeStationVal);

            if (favoriteTrainLineSelect) {
                let favSettingsLineVal = favTrainLine || "";
                 if (favoriteTrainLineSelect.querySelector(`option[value="${favSettingsLineVal}"]`)) {
                    favoriteTrainLineSelect.value = favSettingsLineVal;
                } else {
                     favoriteTrainLineSelect.value = ""; 
                }

                let favSettingsStationVal = favTrainStation;
                 if (!favSettingsStationVal && favoriteTrainLineSelect.value && mtrApiConfig[favoriteTrainLineSelect.value]) {
                    favSettingsStationVal = mtrApiConfig[favoriteTrainLineSelect.value].defaultStationName;
                }
                populateTrainStations(favoriteTrainLineSelect, favoriteTrainStationSelect, favoriteTrainLineSelect.value, favSettingsStationVal);
            }
        }

        if(saveFavoriteBusButton) saveFavoriteBusButton.addEventListener('click', () => {
            const selectedFavBus = favoriteBusRouteSelect.value;
            localStorage.setItem('favoriteBusRoute', selectedFavBus);
            if (busRouteSelect && selectedFavBus && busRouteSelect.querySelector(`option[value="${selectedFavBus}"]`)) busRouteSelect.value = selectedFavBus;
            settingsSavedMessageEl.textContent = 'Favorite bus route saved!';
            setTimeout(() => settingsSavedMessageEl.textContent = '', 3000);
            updateLiveSchedules(); 
        });

        if(saveFavoriteTrainButton) saveFavoriteTrainButton.addEventListener('click', () => {
            const selectedFavTrainLine = favoriteTrainLineSelect.value;
            const selectedFavTrainStation = favoriteTrainStationSelect.value;
            localStorage.setItem('favoriteTrainLine', selectedFavTrainLine);
            localStorage.setItem('favoriteTrainStation', selectedFavTrainStation);

            if (trainLineSelect && selectedFavTrainLine && trainLineSelect.querySelector(`option[value="${selectedFavTrainLine}"]`)) {
                trainLineSelect.value = selectedFavTrainLine;
                populateTrainStations(trainLineSelect, trainStationSelect, selectedFavTrainLine, selectedFavTrainStation);
            } else if (trainLineSelect && trainLineSelect.options.length > 0) { 
                 trainLineSelect.value = trainLineSelect.options[0].value;
                 populateTrainStations(trainLineSelect, trainStationSelect, trainLineSelect.value, mtrApiConfig[trainLineSelect.value]?.defaultStationName || "");
            }

            settingsSavedMessageEl.textContent = 'Favorite train preference saved!';
            setTimeout(() => settingsSavedMessageEl.textContent = '', 3000);
            updateLiveSchedules(); 
        });
        
        async function updateLiveSchedules() { 
            const now = new Date();
            const homePaneActive = document.getElementById('home-pane').classList.contains('active');

            if (homePaneActive) updateDateTimeDisplay(now);

            if (homePaneActive) {
                const currentBusRoute = busRouteSelect.value;
                if (currentBusRoute) {
                   await displayLiveSchedule('bus', currentBusRoute, now); 
                } else if (busRouteSelect.options.length > 1 && busRouteSelect.options[0].value === "") { 
                    busRouteSelect.selectedIndex = 1; 
                    await displayLiveSchedule('bus', busRouteSelect.value, now);
                } else if (busRouteSelect.options.length > 0) {
                     busRouteSelect.selectedIndex = 0; 
                    await displayLiveSchedule('bus', busRouteSelect.value, now);
                }

                let currentTrainLine = trainLineSelect.value;
                let currentTrainStation = trainStationSelect.value;

                if (!currentTrainLine && trainLineSelect.options.length > 0) {
                    for(let i=0; i < trainLineSelect.options.length; i++) {
                        if(trainLineSelect.options[i].value) { 
                            currentTrainLine = trainLineSelect.options[i].value;
                            trainLineSelect.value = currentTrainLine;
                            break;
                        }
                    }
                }
                
                if (currentTrainLine) {
                    const lineData = mtrApiConfig[currentTrainLine]; 
                    if (!lineData || !lineData.stations[currentTrainStation]) {
                        const defaultStationForLine = lineData ? lineData.defaultStationName : "";
                        populateTrainStations(trainLineSelect, trainStationSelect, currentTrainLine, defaultStationForLine); 
                        currentTrainStation = trainStationSelect.value; 
                    }
                }

                if (currentTrainLine && currentTrainStation) {
                    const trainDir1TimesEl = document.getElementById('train-direction1-times');
                    const trainDir2TimesEl = document.getElementById('train-direction2-times');
                    if(trainDir1TimesEl) trainDir1TimesEl.innerHTML = '<li class="loading-text text-sm">Loading train times...</li>';
                    if(trainDir2TimesEl) trainDir2TimesEl.innerHTML = '';

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

        if (favoriteTrainLineSelect) {
            favoriteTrainLineSelect.addEventListener('change', () => {
                const lineConfig = mtrApiConfig[favoriteTrainLineSelect.value];
                const defaultStation = lineConfig ? lineConfig.defaultStationName : "";
                populateTrainStations(favoriteTrainLineSelect, favoriteTrainStationSelect, favoriteTrainLineSelect.value, defaultStation);
            });
        }

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

        document.addEventListener('DOMContentLoaded', () => {
            populateAllSelectors(); 
            loadPreferences();      
            const homeButton = document.querySelector('button[data-tab="home"]');
            if (homeButton) homeButton.classList.add('active');
            const homePane = document.getElementById('home-pane');
            if (homePane) homePane.classList.add('active'); 
            
            document.querySelectorAll('.content-pane').forEach(pane => {
                if (pane.id !== 'home-pane') {
                    pane.classList.remove('active');
                }
            });

            updateLiveSchedules(); 
            setInterval(updateLiveSchedules, 30000); 
            setInterval(() => {
                if (document.getElementById('home-pane').classList.contains('active')) {
                    const now = new Date();
                    updateDateTimeDisplay(now);
                }
            }, 1000);
        });
    </script>
</body>
</html>
