import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes.component';
import { NotesService } from '../../services/notes.service';
import { NotificationsModule } from "app/notifications/notifications.module";
import { ColorPaletteModule } from '../color-palette/color-palette.module';

@NgModule({
    imports: [
        CommonModule,
        NotificationsModule,
        ColorPaletteModule
    ],
    exports: [
        NoteComponent,
        NotesComponent
    ],
    declarations: [
        NotesComponent,
        NoteComponent
    ],
    providers: [
        NotesService
    ],
})
export class NoteModule { }
