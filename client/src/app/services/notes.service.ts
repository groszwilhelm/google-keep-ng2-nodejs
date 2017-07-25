import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as io from 'socket.io-client';

import { Note } from '../components/notes/note/note.model';

@Injectable()
export class NotesService {
    private url = 'api/notes';
    private socket;

    constructor(private http: Http) { }
    
    readAll(): Observable<Array<Note>> {
        this.getNotes();
        return this.http.get(this.url)
            .map((response: Response) => response.json());
    }
    getNotes() {
        let observable = new Observable(observer => {
          this.socket = io('http://localhost:3000');
          this.socket.on('notes', (data) => {
            observer.next(data);    
          });
          return () => {
            this.socket.disconnect();
          };  
        })     
        observable.subscribe(observer => {
            console.log(observer);
        })
      }  
}
