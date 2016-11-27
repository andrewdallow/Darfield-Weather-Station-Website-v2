import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as moment from 'moment';

import { HistoricDataService } from '../../services/historic-data.service';
import { HistoricData } from '../../services/historic-data.model';

@Component({
    moduleId: module.id,
    selector: 'yearly-temp-chart',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>',
})
export class YearlyTemperatureChartComponent implements OnInit, OnChanges {
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
                height: 400
            },
            title: {
                useHTML: true,
                text: '<span class="small grey">Extreme high, average high, average low, extreme low temperatures (&deg;C)</span>',
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
                min: 0,
                max: 11,
                labels: {
                    enabled: false
                },
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
                    'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

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
                        shape: 'circle',
                        backgroundColor: '#fff',
                        enabled: true,
                        allowOverlap: true,
                        align: 'center',
                        verticalAlign: 'middle',
                        style: {
                            fontSize: '14px',
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
                    name: 'High Temperatures',
                    type: 'line',
                    color: '#f00',
                    lineWidth: 1,
                    dataLabels: {
                        color: '#f00'
                    },
                    data: this.getHiTemp(this.data)
                },
                {
                    name: 'High Avg Temperatures',
                    type: 'line',
                    color: '#ff8000',
                    dataLabels: {
                        color: '#ff8000'
                    },
                    data: this.getHiAvgTemp(this.data)
                },
                {
                    name: 'Low Avg Temperatures',
                    type: 'line',
                    color: '#04b4ae',
                    dataLabels: {
                        color: '#04b4ae'
                    },
                    data: this.getLowAvgTemp(this.data)
                },
                {
                    name: 'Low Temperatures',
                    type: 'line',
                    color: '#0431b4',
                    dataLabels: {
                        color: '#0431b4'
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
            this.chart.series[1].setData(this.getHiAvgTemp(this.data));
            this.chart.series[2].setData(this.getLowAvgTemp(this.data));
            this.chart.series[3].setData(this.getLowTemp(this.data));
        }
    }

    private getHiTemp(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('MM') - 1;
            result.push([day, +entry.maxTemp]);
        }
        return result;
    }
    private getHiAvgTemp(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('MM') - 1;
            result.push([day, +entry.avgMaxTemp]);
        }
        return result;
    }

    private getLowAvgTemp(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('MM') - 1;
            result.push([day, +entry.avgMinTemp]);
        }
        return result;
    }

    private getLowTemp(data: HistoricData): number[][] {
        let result: number[][] = [];
        let day: number;
        for (let entry of data.graphData) {
            day = +moment(entry.logDate, 'YYYY-MM-DD').format('MM') - 1;
            result.push([day, +entry.minTemp]);
        }
        return result;
    }
    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }
}
