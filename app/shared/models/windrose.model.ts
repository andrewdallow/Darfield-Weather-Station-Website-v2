export class Windrose {
    private options = {
        isTrackable: false,
        chart: {
            polar: true,
            type: 'column',
            backgroundColor: 'rgba(0,0,0,0)',
            plotBorderWidth: 0,
            plotShadow: false,
            spacingBottom: 60,
            height: 250
        },

        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },

        pane: {
            size: '85%',
            startAngle: 0
        },

        loading: {
            labelStyle: { top: '25%' }
        },

        legend: {
            align: 'center',
            verticalAlign: 'top',
            backgroundColor: '#FFFFFF',
            y: 50,
            itemStyle: {
                fontSize: '12px'
            }
        },

        xAxis: {
            endOnTick: true,
            tmin: 0,
            max: 360,
            tickInterval: 22.5,
            tickmarkPlacement: 'on',
            labels: {
                formatter: function() {
                    let categories = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                    return categories[this.value / 45];
                }
            }

        },

        yAxis: {
            min: -3,
            minRange: 20,
            endOnTick: false,
            startOnTick: false,
            showLastLabel: true,
            showFirstLabel: true,
            tickInterval: 10,
            title: {
                text: ''
            },
            labels: {
                enabled: false
            },
            plotBands: {
                from: -99,
                to: 0,
                color: '#FCFFC5',
                zIndex: 3
            },
            reversedStacks: false
        },
        tooltip: {
            shadow: false,
            borderWidth: 0,
            shared: false,
            useHTML: true,
            formatter: function() {
                return this.y + '%';
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                shadow: false,
                groupPadding: 0,
                pointPlacement: 'on',
                borderWidth: 0
            }
        },
        series: [
            {
                name: '< 5 km/h',
                color: '#FFA267'
            },
            {
                name: '5 - 15 km/h',
                color: '#FACA63'
            },
            {
                name: '15 - 25 km/h',
                color: '#67B4FF'
            },
            {
                name: '25 - 35 km/h',
                color: '#38A560'
            },
            {
                name: '35 - 45 km/h',
                color: '#5116F3'
            },
            {
                name: '> 45 km/h',
                color: '#141F81'
            }

        ]
    };

    constructor(config: Object, data: number[][]) {
        this.setOptions(config);
        this.setData(data);
    }
    /**
     * Get the highchart plot options.
     * @return {Object} highchart options
     */
    get plotOptions(): Object {
        return this.options;
    }

    private setData(data: number[][]): void {
        let windDirections = [
            0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5,
            180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5
        ];

        let set = this.normaliseData(this.splitData(data), data.length);

        // Add to series data
        for (let i = 0; i < set.length; i++) {
            this.options.series[i]['data'] = this.mapSeries(windDirections, set[i]);
        }

    }
    /**
     * Normalise data set to a given factor and return in percentage form.
     * @param  {Array<Array<number>>} set    data set
     * @param  {number}               factor to divide the set by.
     * @return {Array}                       normalised set.
     */
    private normaliseData(set: number[][], factor: number): number[][] {
        for (let i = 0; i < set.length; i++) {
            for (let j = 0; j < set[i].length; j++) {
                set[i][j] = Math.round((set[i][j] / factor) * 100);
            }
        }
        return set;
    }
    /**
     * Split wind directions into speed categories and then
     * count direction frequency.
     * @param  {Array<Array<number>>} data   wind direction mapped to wind speed
     * @param  {Array<number>}        limits wind speed limits
     * @return {Array}                       Set of counted wind directions for each limit
     */
    private splitData(data: number[][]): number[][] {
        let set = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        for (let entry of data) {

            if (entry[1] > 0 && entry[1] < 5) {
                set[0][Math.floor(entry[0] / 22.5)]++;
            } else if (entry[1] >= 5 && entry[1] < 15) {
                set[1][Math.floor(entry[0] / 22.5)]++;
            } else if (entry[1] >= 15 && entry[1] < 25) {
                set[2][Math.floor(entry[0] / 22.5)]++;
            } else if (entry[1] >= 25 && entry[1] < 35) {
                set[3][Math.floor(entry[0] / 22.5)]++;
            } else if (entry[1] >= 35 && entry[1] < 45) {
                set[4][Math.floor(entry[0] / 22.5)]++;
            } else if (entry[1] >= 45) {
                set[5][Math.floor(entry[0] / 22.5)]++;
            }
        }
        return set;

    }
    /**
     * Map two same length arrays ot one another.
     * @param  {Array<any>} x first array
     * @param  {Array<any>} y second array
     * @return {Array<any>}   maped array
     */
    private mapSeries(x: Array<any>, y: Array<any>): Array<any> {
        let series: Array<any> = [];

        if (x.length === y.length) {
            for (let i = 0; i < x.length; i++) {
                series = series.concat([[x[i], y[i]]]);

            }
        }
        return series;
    }
    /**
     * Set and Add the given Graph options
     * @param  {Object} config object of highcharts options
     */
    private setOptions(config: Object): void {
        for (let option in config) {
            if (config.hasOwnProperty(option)) {
                this.options[option] = config[option];
            }
        }
    }
}
