import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

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
    @ViewChild('formButton') formButton: ElementRef;
    private btnName = 'Save';
    private isToggled = false;
    private colorToggle = false;
    private notificationTypes = new NotificationTypes;
    private noteForm: FormGroup;
    private selectedColor = '#ffffff';
    private colors = new Color();

    constructor(private noteService: NotesService, private norificationsService: NotificationsService, private colorService: ColorPaletteService) { }

    private toggle() {
        this.isToggled = !this.isToggled;
        this.colorToggle = false;
    }

    private handleAction(note: Note) {
        if (note.id) {
            this.updateNote(note);
        } else {
            this.saveNote(note);
        }
    }

    private saveNote(note: Note) {
        note.color = this.selectedColor;

        this.noteService.add(note)
            .subscribe(resp => {
                this.handleFormState();
                this.norificationsService.openNotification({
                    message: 'Note was saved successfully',
                    type: this.notificationTypes.SUCCESS
                });
            },
            error => {
                this.norificationsService.openNotification({
                    message: error.message,
                    type: this.notificationTypes.ERROR
                });
            });
    }

    private updateNote(note: Note) {
        note.color = this.selectedColor;

        this.noteService.update(note)
            .subscribe(resp => {
                this.handleFormState();
                this.norificationsService.openNotification({
                    message: 'Note was edited successfully',
                    type: this.notificationTypes.INFO
                });
            },
            error => {
                this.norificationsService.openNotification({
                    message: error.message,
                    type: this.notificationTypes.ERROR
                });
            });
    }

    private handleFormState() {
        this.isToggled = false;
        this.colorToggle = false;
        this.selectedColor = '#ffffff';
        this.formButton.nativeElement.textContent = 'Save';
        this.noteForm.reset();

    }

    private toggleColorView() {
        this.colorToggle = !this.colorToggle;
    }

    private setColor(color) {
        this.colorToggle = !this.colorToggle;
        this.selectedColor = color;
    }

    ngOnInit() {
        this.noteForm = new FormGroup({
            'note': new FormGroup({
                'id': new FormControl(null, []),
                'title': new FormControl(null, []),
                'description': new FormControl(null, [])
            })
        });

        this.noteService.getEditNoteObservable()
            .subscribe((note) => {
                this.formButton.nativeElement.textContent = 'Update';
                this.isToggled = true;
                this.selectedColor = <string>note.color;
                this.noteForm.setValue({
                    'note': {
                        'id': note.id,
                        'title': note.title,
                        'description': note.description
                    }
                });
            });
    }
}