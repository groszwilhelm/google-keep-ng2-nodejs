import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Note } from 'app/components/notes/note/note.model';
import { Color } from '../color-palette/color.model';
import { NotesService } from 'app/services/notes.service';
import { NotificationsService } from 'app/notifications/notifications.service';
import { NotificationTypes } from '../../notifications/notifications.interface';
import { ColorPaletteService } from '../color-palette/color-palette.service';

@Component({
    selector: 'note-form',
    templateUrl: 'note-form.component.html',
    styleUrls: ['note-form.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class NoteFormComponent implements OnInit {
    private isToggled = false;
    private colorToggle = false;
    private notificationTypes = new NotificationTypes;
    private selectedColor = '#ffffff';
    public message: string = '';
    private colors = new Color();

    constructor(private noteService: NotesService, private norificationsService: NotificationsService, private colorService: ColorPaletteService) { }

    private toggle() {
        this.isToggled = !this.isToggled;
    }

    private saveNote(formRef: NgForm, note: Note) {
        this.isToggled = false;
        note.color = this.selectedColor;

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
        this.selectedColor = '#ffffff';
    }

    private toggleColorView() {
        this.colorToggle = !this.colorToggle;
    }

    private setColor(color) {
        this.colorToggle = !this.colorToggle;
        this.selectedColor = color;
    }

    ngOnInit() { }
}