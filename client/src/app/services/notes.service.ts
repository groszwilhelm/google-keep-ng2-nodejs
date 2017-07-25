import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Note } from '../components/notes/note/note.model';

@Injectable()
export class NotesService {
    private url = 'api/notes';

    constructor(private http: Http) { }
    
    readAll(): Observable<Array<Note>> {
        return this.http.get(this.url)
            .map((response: Response) => response.json());
    }
}
