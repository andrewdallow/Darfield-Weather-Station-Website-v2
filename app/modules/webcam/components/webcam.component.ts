import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, ActivatedRoute }   from '@angular/router';
import { Location }                 from '@angular/common';

import * as moment from 'moment';
declare var window: any;
declare var FB: any;

import { SettingsService } from '../../../shared/config/settings.service';
import { WebcamFilesService } from '../services/webcam-files.service';


interface Image {
    path: string;
    time: number;
}
/**
 * [Component description]
 */
@Component({
    moduleId: module.id,
    selector: 'webcam',
    templateUrl: './webcam.component.html',
})
export class WebcamComponent implements OnInit {
    public selectedImage: Image = {
        path: '',
        time: 0
    };
    public isPaused: boolean = true;
    public isLoading: boolean;
    public sliderModel: any = { value: 0, min: 0, max: 10 };
    public groupedImages: Array<any> = [[], [], [], [], [], [], []];
    public daysAgo: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    public days: string[] = [];
    private selectedDay: string;
    private webcamImages: Array<any>;
    private timeOffset: number = -250;

    constructor(
        private titleService: Title,
        private webcamFileService: WebcamFilesService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private settingsService: SettingsService
    ) {

    }


    ngOnInit(): void {

        this.settingsService.config.then(
            (_config: any) => {
                this.titleService.setTitle('Webcam - ' + _config.siteName);
                for (let day of this.daysAgo) {
                    this.days.push(this.daysAgoName(day));
                }
                this.getWebcamImages();
            });
    }


    timelapse(event?: any): void {
        this.isLoading = false;
        if (!this.isPaused) {
            let nextImage: number = this.sliderModel.value + 1;
            let numImages = this.groupedImages[this.days.indexOf(this.selectedDay)].length;

            if (nextImage >= numImages) {
                nextImage = 0;
            }
            setTimeout(() => {
                this.changeImage(nextImage);
                this.sliderModel.value = nextImage;
            }, 100);
        }


    }


    public play(): void {
        this.isPaused = !this.isPaused;
        this.timelapse();
    }


    /**
     * Function to get the list of all current webcam image paths and times and
     * stores it in the webcamImages Array.
     */
    getWebcamImages(): void {
        this.webcamFileService.setFileNames().then(
            () => {
                this.webcamFileService.getFileNames()
                    .then((files: any) => {
                        this.webcamImages = files;
                        this.groupImages();
                        this.setLandingDay();
                    });
            });

    }
    /**
     * Changes the selected webcam image and time corresponding to the
     * specfied index.
     * @param {number} index index of webcam images list.
     */
    changeImage(index: number): void {
        let file = this.groupedImages[this.days.indexOf(this.selectedDay)][index];
        this.isLoading = true;

        this.selectedImage.path = this.getUrl(file.name.replace('-thm', ''));
        this.selectedImage.time = file.time + this.timeOffset;
    }
    /**
     * Determines if the specified day is currently selected or not.
     * @param  {string}  image image path
     * @return {boolean}       true if seleceted, false if not.
     */
    isSelected(day: string): boolean {
        return this.selectedDay === day;
    }

    /**
     * Determine if the specified day has images or should be disabled.
     * @param  {number}  day number of days ago
     * @return {boolean}     true if no images, false otherwise.
     */
    isDisabled(day: string): boolean {
        return this.groupedImages[this.days.indexOf(day)].length === 0;
    }

    /**
     * Add the root directory to the supplied url.
     * @param  {string} url url to be fixed
     * @return {string}     fixed url
     */
    getUrl(url: string): string {
        return url;
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
        }).toLowerCase();
    }
    onSelect(day: string): void {
        this.selectedDay = day;
    }
    gotoDay(day: string): void {
        if (!this.isPaused) {
            this.isPaused = !this.isPaused;
        }
        this.selectedDay = day;
        this.sliderModel.max = this.groupedImages[this.days.indexOf(this.selectedDay)].length - 1;
        this.sliderModel.value = this.sliderModel.max;
        this.changeImage(this.sliderModel.max);
        this.router.navigate(['/webcam', this.selectedDay]);


    }
    private setLandingDay(): void {
        for (let i = 0; i < this.groupedImages.length; i++) {
            if (this.groupedImages[i].length > 0) {
                this.gotoDay(this.days[i]);
                break;
            }
        }
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
