import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RealtimeGraphDataService } from '../../../shared/realtime-sql-data/realtime-graph-data.service';
import { Graph } from './graph.model';
import { Windrose } from '../../../shared/models/windrose.model';
import { SettingsService } from '../../../shared/config/settings.service';

@Component({
    moduleId: module.id,
    templateUrl: './recent-graphs.html',
    providers: [RealtimeGraphDataService]
})
export class RecentGraphsComponent implements OnInit {
    public charts: any[];
    public buttons: number[];
    public selectedButton: number;
    public tabs: string[] = ['compare', 'temperature', 'wind',
        'wind-rose', 'pressure', 'rainfall'];
    public selectedTab: string;
    public showSpinner: boolean;
    private chartInstances: any[] = [];
    private data: any;

    constructor(
        private graphDataService: RealtimeGraphDataService,
        private titleService: Title,
        private route: ActivatedRoute,
        private router: Router,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.showSpinner = true;
        this.settingsService.config.then(
            (_config) => {
                this.titleService.setTitle('Graphs - ' + _config.siteName);
                this.buttons = _config.recentGraphsTimescales;
                this.selectTabButton();
            });
    }

    selectTabButton(): void {
        this.route.params.subscribe(
            (params: Params) => {
                this.selectedTab = params['tab'];
                this.selectedButton = +params['hours'];
                this.initCharts();
            }
        );
    }

    /**
     * Update the currently selected tab.
     * @param {string} tab name
     */
    selectTab(tab: string): void {
        this.showSpinner = true;
        this.router.navigate(['/graphs', tab, this.selectedButton]);
    }

    /**
     * Initalise the charts and subscribe to the graph data service.
     */
    private initCharts(): void {
        this.showSpinner = true;
        this.graphDataService.setGraphData(this.selectedButton).then(
            () => {
                this.graphDataService.getGraphData().subscribe(
                    (data: any) => {
                        this.data = data;
                        this.createCharts();
                    }
                );
            }
        );

    }
    /**
     * Change the time span of the graphs to the given hours.
     * @param {number} hours time span in hours
     */
    changeTimeSpan(hours: number): void {
        this.router.navigate(['/graphs', this.selectedTab, hours]);
    }
    /**
     * Save an instance of the Highchart and add it to the array of charts
     * @param {any} chartInstance chart instance
     */
    saveInstance(chartInstance: any): void {
        this.chartInstances.push(chartInstance);
    }
    /**
     * Share the data point location between all current charts to
     * synchronise crosshair and tooltip changes.
     * @param {any} e mouseover position.
     */
    graphCombo(e: any): void {
        let chart: any, points: any, i: number;

        for (i = 0; i < this.chartInstances.length; i++) {
            chart = this.chartInstances[i];
            if (chart.options.isTrackable) {
                // Find coordinates within the chart
                e = chart.pointer.normalize(e);
                points = this.getPoints(chart, e);

                if (points.length > 0) {
                    chart.tooltip.refresh(points); // Show the tooltip
                    // Show the crosshair
                    chart.xAxis[0].drawCrosshair(e, points[0]);
                    chart.redraw();
                }
            }

        }
    }

    /**
     * Get the points of the specfied chart and mouse position.
     * @param  {any} chart highchart instance
     * @param  {any} e     mouseover position
     * @return {any}       chart points
     */
    private getPoints(chart: any, e: any): any {
        let points: any[] = [];
        // Get the hovered points
        for (let series of chart.series) {
            let point = series.searchPoint(e, true);
            if (series.name !== 'Navigator') {
                if (point) {
                    points.push(point);
                    point.onMouseOver(); // Show the hover marker
                }
            }
        }
        return points;
    }



    /**
     * Add a chart options object to the array of all chart options.
     * @param {any} chart [description]
     */
    private addChart(chart: any): void {
        this.charts.push(chart);
    }

    /**
     * Create the charts for the currently selected tab.
     * @param {any} data graph data.
     */
    private createCharts(): void {
        this.chartInstances = [];
        this.charts = [];
        if (this.selectedTab === 'compare') {
            this.createAllGraphs();
        } else if (this.selectedTab === 'temperature') {
            this.addChart(
                this.createTemperatureGraph({ height: 500 })
            );
        } else if (this.selectedTab === 'wind') {
            this.addChart(
                this.createWindGraph({ height: 500 })
            );
            this.addChart(
                this.createWindDirectionGraph({ height: 500 })
            );
        } else if (this.selectedTab === 'wind-rose') {
            this.addChart(
                this.createWindRose({ height: 500 })
            );
        } else if (this.selectedTab === 'pressure') {
            this.addChart(
                this.createPressureGraph({ height: 500 })
            );
        } else if (this.selectedTab === 'rainfall') {
            this.addChart(
                this.createRainGraph({ height: 500 })
            );
        }
        this.showSpinner = false;
    }

    /**
     * Create highchart graphs options for each chart.
     */
    private createAllGraphs(): void {
        this.addChart(this.createTemperatureGraph({ height: 300 }));
        this.addChart(this.createWindGraph({ height: 300 }));
        this.addChart(this.createWindDirectionGraph({ height: 300 }));
        this.addChart(this.createPressureGraph({ height: 300 }));
        this.addChart(this.createRainGraph({ height: 300 }));

    }
    /**
     * Get the highcharts graph options object with the given series data.
     * @param  {Object} series series data and options
     * @return {Object}        highchart graph options
     */
    private getGraphOptions(series: Object): Object {
        let graph = new Graph(series);
        return graph.plotOptions;
    }
    /**
     * Create the highcharts options object for the temperature graph.
     * @return {Object}      highcharts options object
     */
    private createTemperatureGraph(size: any): Object {
        let options = {
            chart: {
                marginLeft: 40,
                spacingTop: 20,
                spacingBottom: 20,
                height: size.height,
                width: size.width
            },
            series: [
                {
                    name: 'Temperature',
                    unit: '&deg;C',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.temperature),
                    type: 'spline',
                    color: '#FF0000',
                    yAxis: 0,
                    zIndex: 3
                },
                {
                    name: 'Dewpoint',
                    unit: '&deg;C',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.dewpoint),
                    type: 'spline',
                    color: '#642EFE',
                    yAxis: 0,
                    zIndex: 2
                },
                {
                    name: 'Wind Chill',
                    unit: '&deg;C',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.windChill),
                    type: 'spline',
                    color: '#04B4AE',
                    yAxis: 0,
                    zIndex: 1
                }
            ]
        };
        return this.getGraphOptions(options);
    }
    /**
     * Create the highcharts options object for the wind graph.
     * @return {Object}      highcharts options object
     */
    private createWindGraph(size: any): Object {
        let options = {
            chart: {
                marginLeft: 40,
                spacingTop: 20,
                spacingBottom: 20,
                height: size.height,
                width: size.width
            },
            series: [
                {
                    name: 'Wind Speed',
                    unit: 'km/h',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.windSpeed),
                    type: 'areaspline',
                    color: '#848484',
                    yAxis: 0,
                    zIndex: 2
                },
                {
                    name: 'Wind Gust',
                    unit: 'km/h',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.windGust),
                    type: 'areaspline',
                    color: '#60A91C',
                    yAxis: 0,
                    zIndex: 1
                }
            ]
        };
        return this.getGraphOptions(options);
    }

    /**
     * Create the highcharts options object for the wind direction graph.
     * @return {Object}      highcharts options object
     */
    private createWindDirectionGraph(size: any): Object {
        let options = {
            chart: {
                marginLeft: 40,
                spacingTop: 20,
                spacingBottom: 20,
                height: size.height,
                width: size.width
            },
            yAxis: [{
                min: 0,
                max: 360,
                title: {
                    text: ''
                },
                tickPositions: [0, 90, 180, 270, 360],
                labels: {
                    formatter: function() {
                        let dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE',
                            'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W',
                            'WNW', 'NW', 'NNW', 'N'];
                        return dirs[Math.round(this.value / 22.5)];
                    }
                }
            }],
            series: [
                {
                    name: 'Wind Direction',
                    unit: '&deg;',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.windDirection),
                    type: 'line',
                    lineWidth: 0,
                    marker: {
                        enabled: true,
                        radius: 2,
                        lineColor: '#5882FA'
                    },
                    states: {
                        hover: {
                            lineWidthPlus: 0
                        }
                    },
                    color: '#5882FA',
                    yAxis: 0
                }
            ]
        };
        return this.getGraphOptions(options);
    }

    /**
     * Create the highcharts options object for the pressure and humidity graph.
     * @return {Object}      highcharts options object
     */
    private createPressureGraph(size: any): Object {
        let options = {
            chart: {
                marginLeft: 40,
                spacingTop: 20,
                spacingBottom: 20,
                height: size.height,
                width: size.width
            },
            yAxis: [
                {
                    max: 100,
                    title: {
                        text: ''
                    }
                },
                {
                    opposite: true,
                    title: {
                        text: ''
                    }
                }
            ],
            series: [
                {
                    name: 'Humidity',
                    unit: '%',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.humidity),
                    type: 'spline',
                    color: '#DBA901',
                    yAxis: 0,
                    zIndex: 2
                },
                {
                    name: 'Barometric Pressure',
                    unit: ' hPa',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.pressure),
                    type: 'spline',
                    color: '#A901DB',
                    yAxis: 1,
                    zIndex: 1
                }
            ]
        };
        return this.getGraphOptions(options);
    }

    /**
     * Create the highcharts options object for the rainfall graph.
     * @return {Object}      highcharts options object
     */
    private createRainGraph(size: any): Object {
        let options = {
            chart: {
                marginLeft: 40,
                spacingTop: 20,
                spacingBottom: 20,
                height: size.height,
                width: size.width
            },
            series: [
                {
                    name: 'Rain Fall',
                    unit: ' mm',
                    data: this.graphDataService
                        .mapSeries(this.data.xData, this.data.datasets.rainRate),
                    type: 'areaspline',
                    color: '#2E2EFE',
                    yAxis: 0,
                }
            ]
        };
        return this.getGraphOptions(options);
    }

    private createWindRose(size: any): Object {
        let options: any, windrose: Windrose, series: number[][];
        options = {
            chart: {
                polar: true,
                type: 'column',
                backgroundColor: 'rgba(0,0,0,0)',
                plotBorderWidth: 0,
                plotShadow: false,
                spacingBottom: 60,
                height: size.height,
                width: size.width
            }
        };
        series = this.graphDataService
            .mapSeries(this.data.datasets.windDirection, this.data.datasets.windSpeed);

        windrose = new Windrose(options, series);
        return windrose.plotOptions;

    }

}
