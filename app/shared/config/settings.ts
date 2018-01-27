export class AppSettings {
    public static get SITE_NAME(): string { return 'Darfield Weather Station'; }
    /**
     * Realtime Update Configuration
     */
    // Time between realtime.json updates (in seconds)
    public static get REALTIME_INTERVAL(): number { return 10; }
    // Time between Rapid Updates (in seconds)
    public static get RAPID_INTERVAL(): number { return 2.5; }
    // Maximum time updates can occur until paused (in seconds)
    public static get MAXIMUM_TIME(): number { return 600; }
    // Amount of time before the station is considered offline (in seconds)
    public static get MAXIMUM_OFFLINE_TIME(): number { return 18000; }
    public static get MAXIMUM_COUNT(): number {
        return Math.floor(this.MAXIMUM_TIME / this.REALTIME_INTERVAL
        );
    }

    public static get UNIT_TYPES(): Array<string> { return ['Metric', 'Imperial']; }

    public static get HIGHLIGHTER_INTERVAL(): number { return 2; }


    /**
     * Data file names
     */

    public static get REALTIME_FILE(): string {
        return 'data/realtime.json';
    }
    public static get RAPID_UPDATE_FILE(): string {
        return 'data/now.json';
    }
    public static get EXTREMES_FILE(): string {
        return 'data/extremes.json';
    }
    public static get GRAPHS24HR_FILE(): string {
        return 'data/graphs24Hr.json';
    }
    public static get REALTIME_SQL_FILE(): string {
        return 'app/shared/realtime-sql-data/realTimeLogSQL.php';
    }
    public static get WEBCAM_FILENAME(): string {
        return 'app/modules/webcam/services/webcamFiles.php';
    }
    public static get HISTORIC_MONTHLY_FILE(): string {
        return 'app/modules/history/services/historic-data.service.php';
    }
    public static get HISTORIC_CLIMATE_FILE(): string {
        return 'app/modules/history/services/historic-climate.service.php';
    }
    public static get HISTORIC_RECORDS(): string {
        return 'data/records.json';
    }

    // NIWA averages
    public static get HISTORIC_ALLTIME_AVG(): Object {
        return {
            avgTemp: 11.9,
            avgMaxTemp: 17.7,
            avgMinTemp: 6.2,
            totRainFall: 755.6
        };
    }
    public static get HISTORIC_AVG_RAIN_MONTH(): Object {
        return {
            january: 53.5,
            february: 57.2,
            march: 63.6,
            april: 53.2,
            may: 68.1,
            june: 66.9,
            july: 74.3,
            august: 75.0,
            september: 54.8,
            october: 62.1,
            november: 61.9,
            december: 65.0
        };
    }
    public static get HISTORIC_AVG_TEMP_MONTH(): Object {
        return {
            january: 17.5,
            february: 17.1,
            march: 15.3,
            april: 12.4,
            may: 9.4,
            june: 6.7,
            july: 6.0,
            august: 7.6,
            september: 9.8,
            october: 11.6,
            november: 13.6,
            december: 15.7
        };
    }
    public static get HISTORIC_AVG_HIGH_TEMP_MONTH(): Object {
        return {
            january: 24.2,
            february: 23.6,
            march: 21.6,
            april: 18.3,
            may: 14.5,
            june: 11.2,
            july: 10.7,
            august: 12.8,
            september: 15.6,
            october: 17.6,
            november: 19.9,
            december: 22.0
        };
    }
    public static get HISTORIC_AVG_LOW_TEMP_MONTH(): Object {
        return {
            january: 10.8,
            february: 10.6,
            march: 9.0,
            april: 6.5,
            may: 4.3,
            june: 2.2,
            july: 1.4,
            august: 2.4,
            september: 4.1,
            october: 5.7,
            november: 7.3,
            december: 9.5
        };
    }

    /**
     * Table Types
     */
    public static get CLIMATE_SECTIONS(): any[] {
        return [
            {
                name: 'Temperature',
                isCollapsed: false,
                children: [
                    {
                        name: 'Average temperature',
                        description: 'Average monthly temperature, calculated from the average daily temperatures.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Average daily high',
                        description: 'Average daily high temperature for each month',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Average daily low',
                        description: 'Average daily low temperature for each month',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Highest temperature',
                        description: 'Highest daily temperature for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Lowest temperature',
                        description: 'Lowest daily temperature for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Warmest day',
                        description: 'Highest average daily temperature for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Coldest day',
                        description: 'Lowest average daily temperature for each month',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Lowest daily high',
                        description: 'Lowest daily high temperature for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Highest daily low',
                        description: 'Highest daily low temperature for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    }
                ]
            },
            {
                name: 'Rainfall',
                isCollapsed: true,
                children: [
                    {
                        name: 'Total rainfall',
                        description: 'Total montly rainfall for each month.',
                        type: 'column',
                        unit: ' mm'
                    },
                    {
                        name: 'Rain days',
                        description: 'Number of rain days each month with greater than 1 mm of rain.',
                        type: 'column',
                        unit: ' mm'
                    },
                    {
                        name: 'Wettest day',
                        description: 'Highest daily low rainfall for each month.',
                        type: 'column',
                        unit: ' mm'
                    },
                    {
                        name: 'Highest rain rate',
                        description: 'Highest rainfall rate for each month.',
                        type: 'column',
                        unit: ' mm/hr'
                    }
                ]
            },
            {
                name: 'Wind',
                isCollapsed: true,
                children: [
                    {
                        name: 'Highest wind gust',
                        type: 'line',
                        description: 'Highest wind gust for each month.',
                        unit: ' km/h'
                    },
                    {
                        name: 'Highest wind run',
                        description: 'Highest wind run for each month.',
                        type: 'column',
                        unit: ' km'
                    },
                    {
                        name: 'Lowest wind run',
                        description: 'Lowest wind run for each month.',
                        type: 'column',
                        unit: ' km'
                    },
                    {
                        name: 'Average daily wind run',
                        description: 'Average daily wind run for each month.',
                        type: 'column',
                        unit: ' km'
                    }
                ]
            },
            {
                name: 'Barometric Pressure',
                isCollapsed: true,
                children: [
                    {
                        name: 'Highest pressure',
                        description: 'Highest barometric pressure for each month.',
                        type: 'line',
                        unit: ' hpa'
                    },
                    {
                        name: 'Lowest pressure',
                        description: 'Lowest barometric pressure for each month.',
                        type: 'line',
                        unit: ' hpa'
                    }
                ]
            },
            {
                name: 'Moisture',
                isCollapsed: true,
                children: [
                    {
                        name: 'Highest dewpoint',
                        description: 'Highest dewpoint for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Lowest dewpoint',
                        description: 'Lowest dewpoint for each month.',
                        type: 'line',
                        unit: '&deg;C'
                    },
                    {
                        name: 'Lowest humidity',
                        description: 'Lowest humidity for each month.',
                        type: 'line',
                        unit: '%'
                    }
                ]
            }

        ];
    }


    /**
     * Forecast page settings
     */
    public static get FORECAST_WU_REQUEST_URL(): string {
        let wuUrl = 'https://api.wunderground.com/api/',
            wuStation = 'zmw:00000.2.93781',
            forecastName = 'forecast10day',
            wuApiKey = 'YOUR_API_KEY',
            format = '.json';

        return wuUrl + wuApiKey + '/' + forecastName + '/q/' + wuStation + format;
    }

    public static get FORECAST_ICON_EXT(): string {
        return '.gif';
    }

    public static get FORECAST_ICON_DIR(): string {
        return 'assets/img/forecast/';
    }

    public static get FORECAST_ICONS(): any {
        return {
            // WU Icon name => NWS icon name // WU meaning
            'chanceflurries': ['sn', 'Chance flurries'],
            'chancerain': ['hi_shwrs', 'Chance rain'],
            'chancesleet': ['ip', 'Chance sleet'],
            'chancesnow': ['sn', 'Chance snow'],
            'chancetstorms': ['hi_tsra', 'Chance thunderstorms'],
            'clear': ['skc', 'Clear'],
            'cloudy': ['ovc', 'Cloudy'],
            'flurries': ['sn', 'Flurries'],
            'fog': ['fg', 'Fog'],
            'hazy': ['fg', 'Hazy'],
            'mostlycloudy': ['bkn', 'Mostly cloudy'],
            'mostlysunny': ['sct', 'Partly cloudy'],
            'partlycloudy': ['sct', 'Partly cloudy'],
            'partlysunny': ['bkn', 'Mostly sunny'],
            'rain': ['ra', 'Rain'],
            'sleet': ['ip', 'Sleet'],
            'sleat': ['ip', 'Sleet'],
            'snow': ['sn', 'Snow'],
            'sunny': ['skc', 'Sunny'],
            'tstorms': ['tsra', 'Thunderstorms'],
            'unknown': ['na', ''],
            'nt_chanceflurries': ['nsn', 'Chance flurries'],
            'nt_chancerain': ['hi_nshwrs', 'Chance rain'],
            'nt_chancesleet': ['ip', 'Chance sleet'],
            'nt_chancesnow': ['nsn', 'Chance snow'],
            'nt_chancetstorms': ['hi_ntsra', 'Chance thunderstorms'],
            'nt_clear': ['nskc', 'Clear'],
            'nt_cloudy': ['novc', 'Cloudy'],
            'nt_flurries': ['nsn', 'Flurries'],
            'nt_fog': ['nfg', 'Fog'],
            'nt_hazy': ['nfg', 'Hazy'],
            'nt_mostlycloudy': ['nbkn', 'Mostly cloudy'],
            'nt_mostlysunny': ['nsct', 'Partly cloudy'],
            'nt_partlycloudy': ['nsct', 'Partly cloudy'],
            'nt_partlysunny': ['nbkn', 'Mostly cloudy'],
            'nt_rain': ['nra', 'Rain'],
            'nt_sleet': ['ip', 'Sleet'],
            'nt_sleat': ['ip', 'Sleet'],
            'nt_snow': ['nsn', 'Snow'],
            'nt_sunny': ['nskc', 'Sunny'],
            'nt_tstorms': ['ntsra', 'Thunderstorms'],
            'nt_unknown': ['na', ''],
            '': ['na', '']
        };
    }

    /**
     * Graphs page settings
     */
    public static get GRAPHS_TIMESCALE_BUTTONS(): Array<number> {
        return [12, 24, 48];
    }

}
