import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { WeatherDataService } from '../../weather-data/weather-data.service';
import { Highcharts } from 'angular2-highcharts';


require('highcharts/highcharts-more.js')(Highcharts);


@Component({
    moduleId: module.id,
    selector: 'wind-vane',
    template: '<chart [options]="options" (load)="saveInstance($event.context)"></chart>'
})

export class WindVaneComponent implements OnDestroy {

    private options: Object;
    private chart: HighchartsChartObject;
    private timer: any;

    constructor(private weatherDataService: WeatherDataService) {

        this.options = {
            chart: {
                type: 'gauge',
                backgroundColor: 'rgba(0,0,0,0)',
                plotBorderWidth: 0,
                plotShadow: false,
                height: 100,
                width: 130
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    borderWidth: 0,
                    backgroundColor: 'transparent'
                }]
            },
            yAxis: {
                min: 0,
                max: 360,
                offset: -6,
                tickPosition: 'outside',
                tickInterval: 22.5,
                tickWidth: 0,
                minorGridLineWidth: 0,
                minorTickLength: 0,
                tickColor: '#A4A4A4',
                lineColor: '#A4A4A4',
                lineWidth: 2,
                labels: {
                    distance: 14,
                    step: 4,
                    formatter: function() {
                        let windDirections = [
                            'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                            'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
                        ];
                        return windDirections[
                            Math.floor((
                                (parseInt(this.value, 10) + 11.25) / 22.5
                            ))];
                    },
                    style: {
                        fontSize: '12px',
                        color: 'grey'
                    }
                }
            },
            plotOptions: {
                gauge: {
                    dial: {
                        radius: '100%',
                        backgroundColor: 'red',
                        borderColor: 'white',
                        borderWidth: 1,
                        baseWidth: 1,
                        topWidth: 15,
                        baseLength: '55%', // of radius
                        rearLength: '-55%'
                    },
                    pivot: {
                        radius: 0
                    },
                    dataLabels: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                enabled: false
            },
            series: [{
                data: [180],
                animation: {
                    duration: 2000
                }
            }],
            loading: false,
        };

        this.timer = Observable.interval(1000).subscribe(
            time => {
                this.timer = this.updateGuage();
            }
        );
    }

    /**
     * Save an instance of the Highcharts Object.
     * @param chartInstance - the HighchartsObject instance.
     */
    private saveInstance(chartInstance: HighchartsChartObject): void {
        this.chart = chartInstance;
    }

    private updateGuage(): void {
        this.chart.series[0].setData([this.windDirection]);
    }

    private get windDirection(): number {
        return parseFloat(this.weatherDataService
            .getRealtimeData().windDir);
    }


    /**
     * Destroy timer on exit.
     */
    ngOnDestroy(): void {
        if (this.timer) {
            this.timer.unsubscribe();
        }
    }
}
