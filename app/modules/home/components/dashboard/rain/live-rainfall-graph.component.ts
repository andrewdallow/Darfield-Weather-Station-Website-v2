import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'live-rainfall-graph',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>'
})

export class LiveRainfallGraphComponent implements OnInit, OnChanges {
    @Input() data: any;
    private options: Object;
    private chart: any;

    constructor() {
    }

    ngOnInit(): void {

        this.options = {
            chart: {
                backgroundColor: 'rgba(0,0,0,0)',
                plotBorderWidth: 0,
                plotShadow: false,
                height: 150,
                spacingLeft: 0,
                spacingRight: 0
            },
            xAxis: {
                categories: [1, 2],
                labels: {
                    enabled: false
                },
                lineWidth: 0,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0
            },
            exporting: {
                enabled: false
            },
            yAxis: {
                labels: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                gridLineColor: 'transparent'
            },
            title: {
                text: ''
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                shadow: false,
                borderWidth: 0,
                useHTML: true,
                crosshairs: [true],
                formatter: function() {
                    let date = new Date(this.x);
                    // Hours part from the timestamp
                    let hours = date.getHours();
                    // Minutes part from the timestamp
                    let minutes = '0' + date.getMinutes();
                    // Seconds part from the timestamp
                    let seconds = '0' + date.getSeconds();
                    // Will display time in 10:30:23 format
                    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                    return formattedTime + '</br>' + this.y + ' mm/hr';
                }
            },
            loading: true,
            series: [{
                data: [],
                type: 'areaspline',
                color: '#4188BA',
                lineWidth: 1
            }]
        };
    }

    ngOnChanges(): void {
        this.updateGraph();
    }

    updateGraph(): void {
        if (this.chart) {
            this.chart.series[0].setData(
                this.mapSeries(this.data.xData, this.data.datasets.rainRate)
            );
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
