import { Component, OnInit } from '@angular/core';

import {FacebookService, FacebookInitParams} from 'ng2-facebook-sdk';
import { SettingsService } from '../config/settings.service';

declare var window: any;
declare var FB: any;


@Component({
    moduleId: module.id,
    selector: 'social-follow',
    templateUrl: 'social-follow.component.html',
    providers: [FacebookService]
})
export class SocialFollowComponent implements OnInit {
    public facebookUrl: string;
    public twitter: any;

    constructor(
        private fb: FacebookService,
        private settingsService: SettingsService
    ) {

        let fbParams: FacebookInitParams = {
            appId: '1113794715386263',
            xfbml: true,
            version: 'v2.8'
        };
        this.fb.init(fbParams);
    }
    ngOnInit(): void {
        this.settingsService.config.then(
            (_config: any) => {
                this.facebookUrl = _config.social.facebook;
                this.twitter = _config.social.twitter;
            })
    }
}
