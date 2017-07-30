import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as io from 'socket.io-client';

import { Note } from '../components/notes/note/note.model';
import { AppConfig } from 'app/app.config';

@Injectable()
export class NotesService {
	private endpoint: string = '/notes';
	private notesArray: Array<Note> = [];
	private config = new AppConfig;
	private socket;

	constructor(private http: Http) {
		this.socket = io(this.config.host);
	}

	public add(note: Note): Observable<Note> {
		return this.http.post(this.config.api + this.endpoint, note)
			.map((response: Response) => response.json());
	}

	public read(): Observable<Array<Note>> {
		return new Observable(observer => {
			this.http.get(this.config.api + this.endpoint)
				.subscribe((response: Response) => {
					this.notesArray = response.json();
					observer.next(response.json());
				});
			this.handleSockets(observer);
		});
	}

	public delete(id: number): Observable<{ message: string }> {
		return this.http.delete(this.config.api + this.endpoint + '/' + id)
			.map((response: Response) => {
				this.socket.emit('deleteNotes', id);
				return response.json();
			});
	}

	private handleSockets(observer) {
		this.socket.on('addNotes', (data) => {
			this.notesArray.push(data);
			return observer.next(this.notesArray);
		});

		this.socket.on('deleteNotes', (id) => {
			this.notesArray = this.notesArray.filter((note) => {
				return note.id != id;
			});
			return observer.next(this.notesArray);
		});
	}
}
