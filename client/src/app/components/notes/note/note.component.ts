import { Component, OnInit, Input } from '@angular/core';

import { Note } from './note.model';
import { NotesService } from 'app/services/notes.service';

@Component({
    selector: 'note',
    templateUrl: 'note.component.html',
    styleUrls: ['note.component.css']
})

export class NoteComponent implements OnInit {
    @Input() note: Note;

    constructor(private notesService: NotesService) { }

    private deleteNote(id) {
        this.notesService.delete(id)
            .subscribe(data => {
                console.log(data.message);
            })
    }

    ngOnInit() { }
}
