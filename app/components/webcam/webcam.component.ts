import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import * as moment from 'moment';

import { AppSettings } from '../../config/settings';
import { WebcamFilesService } from './webcam-files.service';

interface Image {
    path: string;
    time: number;
}

@Component({
    moduleId: module.id,
    selector: 'webcam',
    templateUrl: './webcam.component.html',
    providers: [WebcamFilesService]
})
export class WebcamComponent implements OnInit {
    public selectedImage: Image;
    public sliderModel: any;
    public groupedImages: Array<any>;
    public daysAgo: Array<number>;
    private selectedDay: number;
    private webcamImages: Array<any>;
    private cacheReset: number;
    private root: string;
    private timeOffset: number;

    constructor(
        private titleService: Title,
        private webcamFileService: WebcamFilesService
    ) {
        this.timeOffset = -250;
        this.groupedImages = [[], [], [], [], [], [], []];
        this.selectedImage = {
            path: 'app/data/webcam_img/webcamimage0.jpg',
            time: Date.now() / 1000
        };
        this.daysAgo = [0, 1, 2, 3, 4, 5, 6];
        this.selectedDay = 0;
        this.root = 'app/';
    }


    ngOnInit(): void {
        this.titleService.setTitle('Webcam - ' + AppSettings.SITE_NAME);
        this.cacheReset = Date.now();
        this.sliderModel = { value: 0, min: 0, max: 10 };
        this.getWebcamImages();
    }
    /**
     * Function to get the list of all current webcam image paths and times and
     * stores it in the webcamImages Array.
     */
    getWebcamImages(): void {
        this.webcamFileService.getFileNames()
            .then((files: any) => {
                this.webcamImages = files;
                this.groupImages();
                if (this.groupedImages[0].length !== 0) {
                    this.sliderModel.max = this.groupedImages[0].length - 1;
                    this.selectedDay = 0;
                } else {
                    this.sliderModel.max = this.groupedImages[1].length - 1;
                    this.selectedDay = 1;
                }
                this.sliderModel.value = 0;
                this.changeImage(0);
            });
    }
    /**
     * Changes the selected webcam image and time corresponding to the
     * specfied index.
     * @param {number} index index of webcam images list.
     */
    changeImage(index: number): void {
        let file = this.groupedImages[this.selectedDay][index];
        this.selectedImage.path = this.getUrl(file.name.replace('-thm', ''));
        this.selectedImage.time = file.time + this.timeOffset;
    }
    /**
     * Determines if the specified day is currently selected or not.
     * @param  {string}  image image path
     * @return {boolean}       true if seleceted, false if not.
     */
    isSelected(day: number): boolean {
        return this.selectedDay === day;
    }

    /**
     * Determine if the specified day has images or should be disabled.
     * @param  {number}  day number of days ago
     * @return {boolean}     true if no images, false otherwise.
     */
    isDisabled(day: number): boolean {
        return this.groupedImages[day].length === 0;
    }

    /**
     * Add the root directory to the supplied url.
     * @param  {string} url url to be fixed
     * @return {string}     fixed url
     */
    getUrl(url: string): string {
        return this.root + url;
    }

    /**
     * Format the specfied UNIX time to [dddd, Do MMM YYYY, hh:mm:ss a].
     * @param  {number} time UNIX time
     * @return {string}      formated date string.
     */
    formatTime(time: number): string {
        return moment(time * 1000).format('dddd, Do MMM YYYY, hh:mm a');
    }

    daysAgoName(days: number): string {
        return moment().subtract(days, 'days').calendar(null, {
            sameDay: '[Today]',
            nextDay: '[Tomorrow]',
            nextWeek: 'dddd',
            lastDay: '[Yesterday]',
            lastWeek: 'dddd',
            sameElse: 'dd/MM/YY'
        });
    }

    selectDay(day: number): void {
        this.selectedDay = day;
        this.sliderModel.max = this.groupedImages[day].length - 1;
        this.sliderModel.value = 0;
        this.changeImage(0);
    }
    /**
     * Group webcam images by day.
     */
    private groupImages(): void {
        for (let image of this.webcamImages) {
            for (let day of this.daysAgo) {
                if (image.time > moment().startOf('day').subtract(day, 'days').unix()) {
                    this.groupedImages[day].push(image);
                    break;
                }
            }
        }
    }
}
