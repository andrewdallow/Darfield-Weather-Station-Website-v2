import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as moment from 'moment';

import { HistoricDataService } from '../../services/historic-data.service';
import { HistoricData } from '../../services/historic-data.model';

@Component({
    moduleId: module.id,
    selector: 'monthly-temp-chart',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>',
})
export class MonthlyTemperatureChartComponent implements OnInit, OnChanges {
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
                height: 300
            },
            title: {
                useHTML: true,
                text: '<span class="small grey">High and Low Temperature (&deg;C)</span>',
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
                    enabled: false
                },
                min: 1,
                step: 1,
                max: moment(this.data.graphData[0].logDate, 'YYYY-MM-DD').endOf('month').format('DD'),
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
                        enabled: true,
                        align: 'center',
                        verticalAlign: 'middle',
                        style: {
                            fontSize: '12px',
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    lineWidth: 1,
                    color: '#BDBDBD'
                },

            },
            loading: false,
            series: [
                {
                    name: 'High Temperatures',
                    type: 'line',
                    color: '#d3d3d3',
                    dataLabels: {
                        color: '#f00'
                    },
                    data: this.getHiTemp(this.data)
                },
                {
                    name: 'Low Temperatures',
                    type: 'line',
                    color: '#d3d3d3',
                    dataLabels: {
                        color: '#00f'
                    },
                    data: this.getLowTemp(this.data)
                }
            ]
        };
    }
    ngOnChanges(): void {
        this.updateGraph();
    }

    updateGraph(): void {
        if (this.chart) {
            this.chart.series[0].setData(this.getHiTemp(this.data));
            this.chart.series[1].setData(this.getLowTemp(this.data));
        }
    }

    private getHiTemp(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('DD');
            result.push([day, +entry.maxTemp]);
        }
        return result;
    }

    private getLowTemp(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('DD');
            result.push([day, +entry.minTemp]);
        }
        return result;
    }
    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }
}
