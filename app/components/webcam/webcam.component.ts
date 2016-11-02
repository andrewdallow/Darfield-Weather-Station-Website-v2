import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { AppSettings } from '../../config/settings';
import { TimeService } from '../../shared/time.service';
import { WebcamFilesService } from './webcam-files.service';

@Component({
    moduleId: module.id,
    selector: 'webcam',
    templateUrl: './webcam.component.html',
    providers: [WebcamFilesService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebcamComponent implements OnInit {
    public page: number = 1;
    public imagesPerPage: number = 3;
    public selectedImage: string;
    private root: string = 'app/';
    private webcamImages: Observable<Array<Object>>;
    private cacheReset: number;

    constructor(
        private titleService: Title,
        private webcamFileService: WebcamFilesService,
        private timeService: TimeService) {
        this.cacheReset = Date.now();
        this.selectedImage = 'app/data/webcam_img/webcamimage0.jpg';

    }

    ngOnInit(): void {
        this.titleService.setTitle('Webcam - ' + AppSettings.SITE_NAME);

        this.webcamImages = this.webcamFileService.fileNames;
    }

    isSelected(image: string): boolean {
        return this.getUrl(image.replace('-thm', '')) === this.selectedImage;
    }

    getUrl(url: string): string {
        return this.root + url;
    }

    formatTime(time: number): string {
        return this.timeService.unixTimeConverter(time * 1000);
    }

    onSelect(image: string): void {
        this.selectedImage = this.getUrl(image.replace('-thm', ''));
    }
}
