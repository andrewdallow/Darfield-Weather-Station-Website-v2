import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'live-wind-graph',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>'
})

export class LiveWindGraphComponent implements OnInit, OnChanges {
    @Input() data: any;
    private options: Object;
    private chart: any;
    private windDirections = [
        0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5,
        180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5
    ];

    constructor() {
    }

    ngOnInit(): void {

        this.options = {
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
                verticalAlign: 'bottom',
                backgroundColor: '#FFFFFF',
                floating: true,
                y: 50,
                itemStyle: {
                    fontSize: '8px'
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
                shared: false,
                borderWidth: 0,
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
            series: [{
                data: [],
                name: '< 5 km/h',
                color: '#FFA267'
            },
                {
                    data: [],
                    name: '5 - 15 km/h',
                    color: '#FACA63'
                },
                {
                    data: [],
                    name: '15 - 25 km/h',
                    color: '#67B4FF'
                },
                {
                    data: [],
                    name: '25 - 35 km/h',
                    color: '#38A560'
                },
                {
                    data: [],
                    name: '35 - 45 km/h',
                    color: '#5116F3'
                },
                {
                    data: [],
                    name: '> 45 km/h',
                    color: '#141F81'
                }

            ]
        };
    }

    ngOnChanges(): void {
        this.updateGraph();
    }

    updateGraph(): void {
        if (this.chart) {
            let series: any;
            let set = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ];

            series = this.mapSeries(this.data.datasets.windDirection, this.data.datasets.windSpeed);

            for (let entry of series) {

                if (entry[1] < 5) {
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

            for (let i = 0; i < set.length; i++) {
                for (let j = 0; j < set[i].length; j++) {
                    set[i][j] = Math.round((set[i][j] / this.data.datasets.windDirection.length) * 100);
                }
            }

            for (let i = 0; i < set.length; i++) {
                this.chart.series[i].setData(this.mapSeries(this.windDirections, set[i]));
            }
        }
    }



    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }

    private mapSeries(x: Array<any>, y: Array<any>): Array<any> {
        let series: Array<any> = [];

        if (x.length === y.length) {
            for (let i = 0; i < x.length; i++) {
                series = series.concat([[x[i], y[i]]]);

            }
        }
        return series;
    }
}
