import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { WebcamComponent } from './components/webcam.component';
import { WebcamFilesService } from './services/webcam-files.service';


@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        WebcamComponent
    ],
    exports: [WebcamComponent],
    providers: [WebcamFilesService]
})

export class WebcamModule { }
