import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Note } from 'app/components/notes/note/note.model';
import { Color } from 'app/components/notes/note/note.model';
import { NotesService } from 'app/services/notes.service';

@Component({
    selector: 'note-form',
    templateUrl: 'note-form.component.html',
    styleUrls: ['note-form.component.css']
})

export class NoteFormComponent implements OnInit {
    private isToggled = false;
    public message: string = '';
    private color = new Color();

    constructor(private noteService: NotesService) { }

    private toggle() {
        this.isToggled = !this.isToggled;
    }

    private saveNote(formRef: NgForm, note: Note) {
        this.isToggled = false;
        note.color = this.color.red;
        
        this.noteService.add(note)
            .subscribe(note => {
                formRef.resetForm();
                this.message = 'Note saved';
                this.closeInfoMessage();
            });
        }

    private closeInfoMessage() {
        setTimeout(() => {
            this.message = null;
        }, 2000);
    }

    ngOnInit() { }
}