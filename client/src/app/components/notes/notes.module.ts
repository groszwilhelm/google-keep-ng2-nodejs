import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes.component';
import { NotesService } from '../../services/notes.service';

@NgModule({
    imports: [
        CommonModule
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
