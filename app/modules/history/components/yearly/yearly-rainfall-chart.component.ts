import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as moment from 'moment';

import { HistoricDataService } from '../../services/historic-data.service';
import { HistoricData } from '../../services/historic-data.model';

@Component({
    moduleId: module.id,
    selector: 'yearly-rainfall-chart',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>',
})
export class YearlyRainfallChartComponent implements OnInit, OnChanges {
    @Input() data: any;
    private options: Object;
    private chart: any;

    constructor(private historicDataService: HistoricDataService) { }

    ngOnInit(): void {

        this.options = {
            chart: {
                // backgroundColor: '#EFEFFB',
                plotBorderWidth: 0,
                animation: false,
                plotShadow: false,
                spacingTop: 0,
                spacingBottom: 0,
                height: 186
            },
            title: {
                useHTML: true,
                text: '<span class="small grey">Monthly Rainfall (mm)</span>',
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
                crosshair: {
                    snap: false
                },
                labels: {
                    enabled: true,
                    formatter: function() {
                        return moment(this.value, 'MM').format('MMM');
                    }
                },
                tickInterval: 1,
                min: 1,
                step: 1,
                max: 12,
                tickLength: 0
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
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    },
                    dataLabels: {
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        enabled: true,
                        align: 'center',
                        y: -12,
                        verticalAlign: 'middle',
                        style: {
                            fontSize: '12px',
                        },
                        formatter: function() {
                            if (this.y > 0.5) {
                                return this.y;
                            } else {
                                return '&deg;';
                            }
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    lineWidth: 1,
                },

            },
            loading: false,
            series: [
                {
                    name: 'Daily Rainfall',
                    type: 'column',
                    maxPointWidth: 50,
                    borderColor: '#000',
                    color: '#0080ff',
                    dataLabels: {
                        color: '#000'
                    },
                    data: this.getRain(this.data)
                }
            ]
        };
    }
    ngOnChanges(): void {
        this.updateGraph();
    }

    updateGraph(): void {
        if (this.chart && this.data.graphData.length > 0) {
            this.chart.series[0].setData(this.getRain(this.data));
        }
    }

    private getRain(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('MM');
            result.push([day, +entry.totRainFall]);
        }
        return result;
    }


    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }
}
