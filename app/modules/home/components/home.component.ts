import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { AppSettings } from '../../../shared/config/settings';

@Component({
    moduleId: module.id,
    selector: 'home-component',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
    constructor(private titleService: Title) { }

    ngOnInit(): void {
        this.titleService.setTitle('Home - ' + AppSettings.SITE_NAME);
    }
}
