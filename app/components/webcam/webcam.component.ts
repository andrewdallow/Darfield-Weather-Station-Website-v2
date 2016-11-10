import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { AppSettings } from '../../config/settings';
import { TimeService } from '../../shared/time.service';
import { WebcamFilesService } from './webcam-files.service';

interface Image {
    path: string;
    time: number;
}

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
    public selectedImage: Image = { path: 'app/data/webcam_img/webcamimage0.jpg', time: Date.now() / 1000 };
    public sliderModel: any;
    private root: string = 'app/';
    public webcamImages: Array<any>;
    private cacheReset: number;


    constructor(
        private titleService: Title,
        private webcamFileService: WebcamFilesService,
        private timeService: TimeService) { }

    getWebcamImages(): void {
        this.webcamFileService.getFileNames()
            .then((files: any) => {
                this.webcamImages = files;
                this.changeImage(0);
                this.sliderModel.max = files.length - 1;
                this.sliderModel.value = 0;
                console.log(this.selectedImage);
            });
    }

    ngOnInit(): void {
        this.titleService.setTitle('Webcam - ' + AppSettings.SITE_NAME);
        this.cacheReset = Date.now();
        this.sliderModel = { value: 0, min: 0, max: 10 };
        this.getWebcamImages();


    }

    changeImage(index: any): void {
        let file = this.webcamImages[index];
        this.selectedImage.path = this.getUrl(file.name.replace('-thm', ''));
        this.selectedImage.time = file.time;
    }

    isSelected(image: string): boolean {
        return this.getUrl(image.replace('-thm', '')) === this.selectedImage.path;
    }

    getUrl(url: string): string {
        return this.root + url;
    }

    formatTime(time: number): string {
        return this.timeService.unixTimeConverter(time * 1000);
    }

    onSelect(image: string, time: number): void {
        console.log(time);
        this.selectedImage.path = this.getUrl(image.replace('-thm', ''));
        this.selectedImage.time = time;
    }
}
