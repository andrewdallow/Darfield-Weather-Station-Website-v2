import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { HistoricDataService } from '../../services/historic-data.service';
import { ClimateChart } from './climate-chart.model';

@Component({
    selector: 'climate-chart',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>',
})
export class ClimateChartComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() meta: any;
    private options: Object;
    private chart: any;

    constructor(private historicDataService: HistoricDataService) { }

    ngOnInit(): void {
        this.updateGraph();
    }
    ngOnChanges(): void {
        this.updateGraph();
    }

    updateGraph(): void {
        let series: any = [];
        let chart: ClimateChart;

        for (let year of this.data) {

            series.push({ name: year.name, data: year.data, type: this.meta.type, tooltip: { valueSuffix: this.meta.unit } });

        }

        chart = new ClimateChart({ series: series });
        this.options = chart.plotOptions;
    }

    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }
}
