import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Note } from './note/note.model';
import { NotesService } from '../../services/notes.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'notes',
    templateUrl: 'notes.component.html',
    styleUrls: ['notes.component.css']
})

export class NotesComponent implements OnInit, OnDestroy {
    @Input('setNotes') notes$;
    private noteSubscription: Subscription;
    public notesArray: Array<Note> = [];

    constructor(private notesService: NotesService) { }

    ngOnInit() {
        if (this.notes$) {
            this.noteSubscription = this.notes$
                .subscribe((res) => this.notesArray = res);
        } else {
            this.notesService.read()
                .subscribe((notes: Array<Note>) => {
                    this.notesArray = notes;
                });
        }
    }

    ngOnDestroy() {
        this.noteSubscription ? this.noteSubscription.unsubscribe() : '';
    }
}
