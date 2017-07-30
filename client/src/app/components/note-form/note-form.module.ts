import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { NoteFormComponent } from './note-form.component';
import { SharedModule } from "app/shared/shared.module";

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule
    ],
    exports: [NoteFormComponent],
    declarations: [NoteFormComponent],
    providers: [],
})
export class NoteFormModule { }