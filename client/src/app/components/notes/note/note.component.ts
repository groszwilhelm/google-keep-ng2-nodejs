import { Component, OnInit, Input } from '@angular/core';

import { Note } from './note.model';
import { NotesService } from 'app/services/notes.service';
import { NotificationsService } from 'app/notifications/notifications.service';
import { NotificationTypes } from 'app/notifications/notifications.interface';
import { ColorPaletteService } from 'app/components/color-palette/color-palette.service';

@Component({
    selector: 'note',
    templateUrl: 'note.component.html',
    styleUrls: ['note.component.css']
})

export class NoteComponent implements OnInit {
    @Input() note: Note;
    private notificationsType = new NotificationTypes;
    private toggle = false;

    constructor(private notesService: NotesService, private notificationsService: NotificationsService, private colorService: ColorPaletteService) { }

    private deleteNote(id) {
        this.notesService.delete(id)
            .subscribe(data => {
                this.notificationsService.openNotification({
                    type: this.notificationsType.INFO,
                    message: data.message
                })
            })
    }

    private toggleColorView() {
        this.toggle = !this.toggle;
        console.log(this.toggle);
        this.toggle ? this.colorService.open() : this.colorService.close();
    }

    ngOnInit() { }
}
