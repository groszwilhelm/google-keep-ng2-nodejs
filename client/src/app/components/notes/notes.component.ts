import { Component, OnInit } from '@angular/core';

import { Note } from './note/note.model';
import { NotesService } from '../../services/notes.service';

@Component({
    selector: 'notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.css']
})

export class NotesComponent implements OnInit {
    public notesArray: Array<Note> = [];

    constructor(private notesService: NotesService) { }

    ngOnInit() { 
        this.notesService.read()
            .subscribe((notes: Array<Note>) => {
                this.notesArray = notes;
            });
    }
}
