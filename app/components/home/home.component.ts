import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { WeatherDataService } from '../../components';
import { AppSettings } from '../../config/settings';

@Component({
    moduleId: module.id,
    selector: 'home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(
        private weatherDataService: WeatherDataService,
        private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Home - ' + AppSettings.SITE_NAME);
    }
}
