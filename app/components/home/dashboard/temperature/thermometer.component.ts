import { Component, OnDestroy } from '@angular/core';
import { WeatherDataService } from '../../weather-data/weather-data.service';

@Component({
    moduleId: module.id,
    selector: 'thermometer',
    template: '<chart [options]="options" (load)="renderChart($event.context)"></chart>'
})

export class ThermometerComponent implements OnDestroy {
    private options: Object;
    private chart: HighchartsChartObject;
    private timer: any;

    constructor(private weatherDataService: WeatherDataService) {
        this.options = {
            chart: {
                backgroundColor: 'rgba(0,0,0,0)',
                plotBorderWidth: 0,
                plotShadow: false,
                height: 150,
                width: 140,
                marginBottom: 50,
                marginTop: 5,
                marginLeft: 0,
                spacingRight: 0
            },
            tooltip: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [
                {
                    data: [19.89],
                    type: 'column',
                    pointWidth: 22,
                    threshold: -40,
                    borderWidth: 1,
                    borderRadius: 0,
                    borderColor: 'black',
                    name: 'background',
                    grouping: false,
                    color: '#FFFFFF',
                    animation: false
                },
                {
                    data: [this.outTemp],
                    type: 'column',
                    pointWidth: 16,
                    threshold: -40,
                    borderWidth: 0,
                    name: 'Temp'
                },
            ],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            xAxis: {
                labels: {
                    enabled: false
                },
                lineWidth: 0,
                tickWidth: 0
            },
            yAxis: [{
                min: 0,
                max: 20,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: ''
                },
                tickInterval: 5,
                minorTickInterval: 1,
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                tickWidth: 1,
                minorTickWidth: 1,
                offset: -52
            },
            {
                min: 0,
                max: 20,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: ''
                },
                tickPositions: [0],
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                tickWidth: 2,
                minorTickWidth: 1,
                offset: -55,
                opposite: true,
                tickColor: '#FF0000',
                labels: {
                    style: {
                        color: '#FF0000'
                    },
                    formatter: function() {
                        return '';
                    }
                }
            },
            {
                min: 0,
                max: 20,
                minPadding: 0,
                maxPadding: 0,
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: ''
                },
                tickPositions: [0],
                gridLineWidth: 0,
                minorGridLineWidth: 0,
                tickWidth: 2,
                minorTickWidth: 1,
                offset: -55,
                opposite: true,
                tickColor: '#0000FF',
                labels: {
                    style: {
                        color: '#0000FF'
                    },
                    formatter: function() {
                        return '';
                    }
                }
            }
            ],
            plotOptions: {
                series: {
                    color: '#FF0000'
                }
            },
            title: {
                text: ''
            },
            loading: false

        };

        setInterval((count: any) => {
            this.timer = this.updateChart();
        }, 1000);

    }


    /**
     * Destroy timer on exit.
     */
    ngOnDestroy(): void {
        if (this.timer) {
            this.timer.unsubscribe();
        }
    }
    /**
     * Render chart and save an instance of the Highcharts Object.
     * @param chartInstance - the HighchartsObject instance.
     */
    private renderChart(chartInstance: HighchartsChartObject): void {
        this.chart = chartInstance;
        this.thermometerBase(chartInstance);
    }
    /**
     * Update the variables and axes of the thermometer with the most
     * recent data.
     */
    private updateChart(): void {
        let offset = 5;
        // Current Temperature
        this.chart.series[0].setData([this.highTemp + 4.8]);
        this.chart.series[1].setData([this.outTemp]);

        // Extremes
        for (let i = 0; i < this.chart.yAxis.length; i++) {
            this.chart.yAxis[i].setExtremes(
                this.lowTemp - offset,
                this.highTemp + offset
            );
        }
        // High Temperature Tick
        this.chart.yAxis[1].update({
            tickPositions: [this.highTemp]
        });
        // Low Temperature Tick
        this.chart.yAxis[2].update({
            tickPositions: [this.lowTemp]
        });
    }
    /**
     * Get the current outside temperature.
     * @return {number} outTemp - outside temperature or zero if undefined.
     */
    private get outTemp(): number {
        if (this.weatherDataService.getRealtimeData()) {
            return parseFloat(this.weatherDataService
                .getRealtimeData().outTemp.value);
        }
        return 0;
    }
    /**
     * Get the current minimum temperature.
     * @return {number} - minimum temperature or zero if undefined.
     */
    private get lowTemp(): number {
        let positions = 0;
        if (this.weatherDataService.getRealtimeData()) {
            positions = parseFloat(this.weatherDataService
                .getRealtimeData().tempMinValueT.value);
        }
        return positions;
    }
    /**
     * Get the current maximum temperature.
     * @return {number} - maximum temperature or zero if undefined.
     */
    private get highTemp(): number {
        let positions = 0;
        if (this.weatherDataService.getRealtimeData()) {
            positions = parseFloat(this.weatherDataService
                .getRealtimeData().tempMaxValueT.value);
        }
        return positions;
    }
    /**
     * Draw the circular part of the thermometer below the bar chart.
     */
    private thermometerBase(chartInstance: HighchartsChartObject): void {
        let posX = 65,
            posY = 112,
            radiusOuterCircle = 17,
            radiusInnerCircle = 15;

        // Outer Circle with black boarder
        chartInstance.renderer.circle(posX, posY, radiusOuterCircle).attr({
            fill: 'white',
            'stroke-width': 1,
            stroke: 'black'
        }).add();

        // Inner circle with red to white gradient.
        chartInstance.renderer.circle(posX, posY, radiusInnerCircle).attr({
            fill: {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.5,
                    r: 0.5
                },
                stops: [
                    [0, '#FFFFFF'],
                    [1, '#FF0000']
                ]
            }
        }).add();
    }


}
