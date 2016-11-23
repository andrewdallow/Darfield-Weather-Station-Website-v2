export class ClimateChart {
    private options = {
        chart: {
            // backgroundColor: '#EFEFFB',
            plotBorderWidth: 0,
            animation: false,
            plotShadow: false,
            height: 350
        },
        title: {
            text: '',
        },
        exporting: {
            enabled: false
        },
        legend: {
            itemStyle: {
                width: 40
            },
            title: {
                text: 'click to<br/>show/hide',
                style: {
                    fontWeight: 'normal',
                    fontSize: '10px',
                    fontStyle: 'italic'
                }
            },
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical'

        },
        tooltip: {
            useHTML: true,
            formatter: function() {
                return this.x + ' ' + this.series.name + '<br />' + this.y + this.series.options.tooltip.valueSuffix;
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            crosshair: {
                snap: false
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: ''
            },
            gridLineWidth: 1
        },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        lineWidthPlus: 0
                    }
                },
                marker: {
                    enabled: false
                },
                lineWidth: 2,
            },

        },
        loading: false,
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
