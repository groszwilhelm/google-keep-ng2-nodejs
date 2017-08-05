import { Component, OnInit, Input } from '@angular/core';

import { Note } from './note.model';
import { NotesService } from 'app/services/notes.service';
import { NotificationsService } from 'app/notifications/notifications.service';
import { NotificationTypes } from 'app/notifications/notifications.interface';

@Component({
    selector: 'note',
    templateUrl: 'note.component.html',
    styleUrls: ['note.component.css']
})

export class NoteComponent implements OnInit {
    @Input() note: Note;
    private notificationsType = new NotificationTypes;

    constructor(private notesService: NotesService, private notificationsService: NotificationsService) { }

    private deleteNote(id) {
        this.notesService.delete(id)
            .subscribe(data => {
                this.notificationsService.openNotification({
                    type: this.notificationsType.INFO,
                    message: data.message
                })
            })
    }

    ngOnInit() { }
}
