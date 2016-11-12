import { Component, OnInit} from '@angular/core';
import { WeatherDataService } from '../weather-data/weather-data.service';

@Component({
    selector: 'rain-baro-24hr',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>',
    providers: []
})

export class RainBoar24HrComponent implements OnInit {
    private options: Object;
    private chart: any;
    private timeOffset = 24 * 3600 * 1000;
    private timeZone = 12 * 3600 * 1000;

    constructor(private weatherDataService: WeatherDataService) { }

    ngOnInit(): void {
        this.weatherDataService.getGraphs24HrData().subscribe(
            data => {
                this.options = {
                    chart: {
                        // backgroundColor: '#EFEFFB',
                        plotBorderWidth: 0,
                        plotShadow: false,
                        height: 200
                    },
                    title: {
                        useHTML: true,
                        text: '<span class="small grey">Rainfall (mm) and Pressure (hPa)</span>',
                        align: 'left',
                        floating: false
                    },
                    exporting: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        backgroundColor: '#EFEFFB',
                        borderWidth: false,
                        shadow: false,
                        useHTML: true,
                        padding: 0,
                        formatter: function() {
                            let s = [], units = [' mm', ' hPa'], points = this.points,
                                pointsLength = points.length, index: number;

                            for (index = 0; index < pointsLength; index += 1) {
                                s.push('<span class="grey"><span style="color:' +
                                    points[index].series.color + '">\u25CF</span> ' +
                                    points[index].series.name + ': ' +
                                    points[index].y + units[index] + '<span>');
                            }

                            return s.join(', ');
                        },
                        shared: true,
                        positioner: function() {
                            return {
                                x: this.chart.chartWidth - this.label.width, // right aligned
                                y: -1 // align to title
                            };
                        },
                        hideDelay: 600000
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        type: 'datetime',

                        crosshair: true,
                        labels: {
                            enabled: true
                        },

                        tickInterval: 2 * 3600 * 1000,
                        gridLineWidth: 0.7,
                        gridLineDashStyle: 'longdash'
                    },
                    yAxis: [
                        {
                            // Rainfall
                            title: {
                                text: ''
                            },
                            gridLineWidth: 0,
                            labels: {
                                enabled: false
                            }
                        }, {
                            // Pressure
                            title: {
                                text: ''
                            },
                            gridLineWidth: 0,
                            labels: {
                                enabled: false
                            }
                        }

                    ],
                    plotOptions: {
                        series: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    loading: false,
                    series: [{
                        name: 'Rainfall',
                        type: 'areaspline',
                        data: data.rain,
                        color: '#58ACFA',
                        pointStart: Date.parse(data.timedate) - this.timeOffset + this.timeZone,
                        pointInterval: 3600 * 1000, // one hour
                        yAxis: 0
                    },
                        {
                            name: 'Pressure',
                            type: 'line',
                            data: data.baro,
                            color: '#585858',
                            pointStart: Date.parse(data.timedate) - this.timeOffset + this.timeZone,
                            pointInterval: 3600 * 1000, // one hour
                            yAxis: 1,
                            marker: {
                                enabled: false
                            }
                        }
                    ]
                };
            });
    }

    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }
}
