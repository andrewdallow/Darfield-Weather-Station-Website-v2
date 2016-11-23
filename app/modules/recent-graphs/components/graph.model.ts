export class Graph {
    private options = {
        isTrackable: true,
        chart: {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20,
            height: 300
        },
        title: {
            text: '',
            align: 'left',
            margin: 0,
            x: 30
        },
        credits: {
            enabled: false
        },
        legend: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top'

        },
        plotOptions: {
            series: {
                fillOpacity: 0.9
            },
            line: {
                marker: {
                    enabled: false,
                    lineWidth: 1
                }
            },
            spline: {
                marker: {
                    enabled: false,
                    lineWidth: 1
                }
            },
            areaspline: {
                marker: {
                    enabled: false
                }
            },
            area: {
                marker: {
                    enabled: false
                }
            },
            scatter: {
                marker: {
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        xAxis: {
            crosshair: true,
            type: 'datetime'
        },
        yAxis: [
            {
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
        exporting: {
            enabled: false
        },
        tooltip: {
            crosshairs: true,
            backgroundColor: '#EFEFFB',
            borderWidth: false,
            shared: true,
            shadow: false,
            useHTML: true,
            hideDelay: 1000000000,
            formatter: function() {
                let s: any[] = [],
                    points = this.points,
                    pointsLength = points.length,
                    index: any,
                    tag =
                        '<span class="graphToolTip">' +
                        '<span style="color:',
                    dotTag = '">\u25CF</span> ';
                for (index = 0; index < pointsLength;
                    index += 1) {
                    s.push(tag + points[index]
                        .series.color +
                        dotTag +
                        points[index].series.name + ': ' +
                        points[index].y +
                        points[index]
                            .series.userOptions.unit +
                        '<span>'
                    );
                }
                return s.join(', ');
            },
            positioner: function() {
                return {
                    x: this.chart.chartWidth -
                    this.label.width, // right aligned
                    y: -1 // align to title
                };
            }
        }
    };


    constructor(config: Object) {
        this.setOptions(config);
    }
    /**
     * Get the highchart plot options.
     * @return {Object} highchart options
     */
    get plotOptions(): Object {
        return this.options;
    }
    /**
     * Set and Add the given Graph options
     * @param  {Object} config object of highcharts options
     */
    private setOptions(config: Object): void {
        for (let option in config) {
            if (config.hasOwnProperty(option)) {
                this.options[option] = config[option];
            }
        }
    }
}
