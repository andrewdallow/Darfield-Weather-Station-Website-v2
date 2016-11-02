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
        return 'app/data/realtime.json';
    }
    public static get RAPID_UPDATE_FILE(): string {
        return 'app/data/now.json';
    }
    public static get EXTREMES_FILE(): string {
        return 'app/data/extremes.json';
    }
    public static get GRAPHS24HR_FILE(): string {
        return 'app/data/graphs24Hr.json';
    }
    public static get REALTIME_SQL_FILE(): string {
        return 'app/shared/realtime-sql-data/realTimeLogSQL.php';
    }
    public static get WEBCAM_FILENAME(): string {
        return 'app/components/webcam/webcamFiles.php';
    }

    /**
     * Main Naviagation
     */
    public static get MAIN_NAVIGATION_LINKS(): any {
        return [
            {
                name: 'Home',
                path: '/',
                subLinks: []
            },
            {
                name: 'Webcam',
                path: '/webcam',
                subLinks: []
            },
            {
                name: 'Map',
                path: '/map',
                subLinks: []
            },
            {
                name: 'Graphs',
                path: '/graphs',
                subLinks: []
            },
            {
                name: 'History',
                path: '',
                subLinks: [
                    {
                        name: 'Historic Graphs',
                        path: '/historic-graphs',
                        subLinks: []
                    },
                    {
                        name: 'Records',
                        path: '/records',
                        subLinks: []
                    },
                    {
                        name: 'NOAA-Style Reports',
                        path: '/noaa-style-reports',
                        subLinks: []
                    },
                ]
            },
            {
                name: 'Forecast',
                path: '/forecast',
                subLinks: []
            },
            {
                name: 'About',
                path: '/about',
                subLinks: []
            },

        ];
    }
    /**
     * Calendar settings
     */
    public static get MONTH_NAMES(): Array<string> {
        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];
    }
    public static get DAYS_OF_WEEK(): Array<string> {
        return ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }

}
