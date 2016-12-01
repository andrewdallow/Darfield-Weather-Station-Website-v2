import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { SettingsService } from '../../../shared/config/settings.service';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'about.component.html',
    styles: ['.sebm-google-map-container { height: 300px;}'],
    providers: []
})
export class AboutComponent implements OnInit {
    public lat: number;
    public lng: number;
    public zoom: number;
    public settings: any;
    constructor(private titleService: Title,
        private settingsService: SettingsService) { }

    ngOnInit(): void {
        this.settingsService.config.then(
            (_config: any) => {
                this.settings = _config;
                this.lat = _config.location.lattitude;
                this.lng = _config.location.longitude;
                this.zoom = _config.location.mapZoom;
                this.titleService.setTitle('About - ' + _config.siteName);
            });

    }
}
