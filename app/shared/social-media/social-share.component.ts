import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location }                 from '@angular/common';

import {FacebookService, FacebookInitParams} from 'ng2-facebook-sdk';
declare var window: any;
declare var twttr: any;
declare var PinUtils: any;


@Component({
    moduleId: module.id,
    selector: 'social-share',
    templateUrl: 'social-share.component.html',
    providers: [FacebookService]
})
export class SocialShareComponent implements OnInit, AfterViewInit {
    public currentUrl: string;

    constructor(
        private fb: FacebookService,
        private location: Location) {

        let fbParams: FacebookInitParams = {
            appId: '1113794715386263',
            xfbml: true,
            version: 'v2.8'
        };
        this.fb.init(fbParams);
    }
    ngOnInit(): void {

        this.currentUrl = this.location.prepareExternalUrl(this.location.path());
    }

    ngAfterViewInit(): void {
        this.loadTwitter();
        this.loadPinerest();

    }

    private loadPinerest(): void {
        let s = 'script', id = 'pinterest-jssdk', d = document;
        let js: any, fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = '//assets.pinterest.com/js/pinit.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
        if (window.PinUtils) {
            PinUtils.build();
        }
    }

    private loadTwitter(): void {
        let s = 'script', id = 'twitter-wjs', d = document;
        let js: any,
            fjs = d.getElementsByTagName(s)[0];
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = '//platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
        if (window.twttr) {
            twttr.widgets.load();
        }

    }
}
