import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Note } from 'app/components/notes/note/note.model';
import { Color } from 'app/components/notes/note/note.model';
import { NotesService } from 'app/services/notes.service';
import { NotificationsService } from 'app/notifications/notifications.service';
import { NotificationTypes } from '../../notifications/notifications.interface';

@Component({
    selector: 'note-form',
    templateUrl: 'note-form.component.html',
    styleUrls: ['note-form.component.css']
})

export class NoteFormComponent implements OnInit {
    private isToggled = false;
    private notificationTypes = new NotificationTypes;
    public message: string = '';
    private color = new Color();

    constructor(private noteService: NotesService, private norificationsService: NotificationsService) { }

    private toggle() {
        this.isToggled = !this.isToggled;
    }

    private saveNote(formRef: NgForm, note: Note) {
        this.isToggled = false;
        note.color = this.color.red;
        
        this.noteService.add(note)
            .subscribe(note => {
                formRef.resetForm();
                this.norificationsService.openNotification({
                    message: 'Note was saved successfully',
                    type: this.notificationTypes.SUCCESS
                });
            },
            (error) => {
                this.norificationsService.openNotification({
                    message: error.message,
                    type: this.notificationTypes.ERROR
                });
            });
        }

    ngOnInit() { }
}