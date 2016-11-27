import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { SettingsService } from '../../../shared/config/settings.service';

@Component({
    moduleId: module.id,
    selector: 'home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(private titleService: Title,
        private settingsService: SettingsService
    ) { }

    ngOnInit(): void {
        this.settingsService.config.then(
            (_config) => {
                this.titleService.setTitle('Home - ' + _config.siteName);
            });
    }
}
