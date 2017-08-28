import { Component, OnInit } from '@angular/core';

import { Note } from 'app/components/notes/note/note.model';
import { NotesService } from 'app/services/notes.service';

import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'search',
    templateUrl: 'search.component.html',
    styleUrls: ['search.component.css']
})

export class SearchComponent implements OnInit {
    private notes$ = new Subject();
    private term$ = new Subject<string>();

    constructor(private notesService: NotesService) { }

    ngOnInit() {
        this.notesService.instantSearch(this.term$)
            .subscribe(res => this.notes$.next(res));
    }
}