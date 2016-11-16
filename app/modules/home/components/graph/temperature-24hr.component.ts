import { Component, OnInit } from '@angular/core';

import { WeatherDataService } from '../../../../shared/weather-data/weather-data.service';

@Component({

    selector: 'temperature-24hr',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>',
    providers: []
})

export class Temperature24HrComponent implements OnInit {
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
                        height: 250
                    },
                    title: {
                        useHTML: true,
                        text: '<span class="small grey">Temperature (&deg;C)</span>',
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
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    xAxis: {
                        type: 'datetime',

                        crosshair: true,
                        labels: {
                            enabled: false
                        },

                        tickInterval: 2 * 3600 * 1000,
                        gridLineWidth: 0.7,
                        gridLineDashStyle: 'longdash'
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        gridLineWidth: 0,
                        labels: {
                            enabled: false
                        }
                    },
                    plotOptions: {
                        series: {
                            animation: false,
                            dataLabels: {
                                useHTML: true,
                                enabled: true,
                                align: 'center',
                                verticalAlign: 'middle',
                                style: {
                                    fontSize: '15px'
                                },
                                // formats datalabel colours based on temperature
                                formatter: function() {
                                    let color = '#000000';
                                    if (this.y >= 30) {
                                        color = 'temp8';
                                    } else if (this.y >= 25 && this.y < 30) {
                                        color = 'temp7';
                                    } else if (this.y >= 20 && this.y < 25) {
                                        color = 'temp6';
                                    } else if (this.y >= 15 && this.y < 20) {
                                        color = 'temp5';
                                    } else if (this.y >= 10 && this.y < 15) {
                                        color = 'temp4';
                                    } else if (this.y >= 5 && this.y < 10) {
                                        color = 'temp3';
                                    } else if (this.y >= 0 && this.y < 5) {
                                        color = 'temp2';
                                    } else if (this.y < 0) {
                                        color = 'temp1';
                                    }
                                    return '<span class="' + color + '">' + this.y + '</span>';
                                }
                            },
                            marker: {
                                enabled: false
                            },
                            enableMouseTracking: false,
                            lineWidth: 1,
                            color: '#BDBDBD'
                        }
                    },
                    loading: false,
                    series: [{
                        name: 'Temperature',
                        type: 'line',
                        pointStart: Date.parse(data.timedate) - this.timeOffset + this.timeZone,
                        pointInterval: 3600 * 1000, // one hour
                        data: data.temp
                    }]
                };
            }
        );
    }

    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }
}
