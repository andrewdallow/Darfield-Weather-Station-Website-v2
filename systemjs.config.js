/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
    System.config({
        defaultJSExtensions: true,
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
            'angular2-highcharts': 'npm:angular2-highcharts',
            'highcharts': 'npm:highcharts',
            'ng2-bootstrap': 'npm:ng2-bootstrap',
            'ng2-pagination': 'npm:ng2-pagination',
            'moment': 'npm:moment/moment.js',
            'angular2-google-maps/core': 'npm:angular2-google-maps/core/core.umd.js',
            'ng2-facebook-sdk': 'npm:ng2-facebook-sdk/dist'

        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-highcharts': {
                main: './index.js',
                format: 'cjs',
                defaultExtension: 'js'
            },
            'ng2-bootstrap': {
                main: './ng2-bootstrap.js',
                format: 'cjs',
                defaultExtension: 'js'
            },
            'ng2-pagination': {
                main: './index.js',
                format: 'cjs',
                defaultExtension: 'js'
            },
            'ng2-facebook-sdk': {
                main: './index.js',
                format: 'cjs',
                defaultExtension: 'js'
            },
            'highcharts': {
                // NOTE: You should set './highcharts.src.js' here
                // if you are not going to use <chart type="StockChart"
                main: './highstock.src.js',

                defaultExtension: 'js'
            }

        }
    });
})(this);
