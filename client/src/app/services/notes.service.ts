import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import * as io from 'socket.io-client';

import { Note } from '../components/notes/note/note.model';
import { AppConfig } from 'app/app.config';

@Injectable()
export class NotesService {
	private endpoint: string = '/notes';
	private notesArray: Array<Note> = [];
	private config = new AppConfig;
	public editNote$ = new Subject<any>();
	private socket;

	constructor(private http: Http) {
		// this.socket = io(this.config.host);
		this.socket = io.connect();
	}

	public add(note: Note): Observable<Note> {
		return this.http.post(this.config.api + this.endpoint, note)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				return Observable.throw(error.json());
			});
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

	public instantSearch(term: Observable<string>, debounceMs = 400) {
		return term
			.debounceTime(400)
			.distinctUntilChanged()
			.switchMap(term => this.rawSearch(term));
	}

	public rawSearch(term: string): Observable<Array<Note>> {
		let search = new URLSearchParams();
		search.set('search', term);

		return this.http.get(this.config.api + this.endpoint + '/' + term, { search })
			.map(res => res.json());
	}

	public update(note: Note): Observable<Note> {
		return this.http.put(this.config.api + this.endpoint + '/' + note.id, note)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				return Observable.throw(error.json());
			});
	}

	public delete(id: number): Observable<{ message: string }> {
		return this.http.delete(this.config.api + this.endpoint + '/' + id)
			.map((response: Response) => {
				return response.json();
			});
	}

	public getEditNoteObservable(): Observable<Note> {
		return this.editNote$;
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

		this.socket.on('updateNotes', (data) => {
			for (let i = 0; i < this.notesArray.length; i++) {
				if (this.notesArray[i].id === data.id) {
					this.notesArray[i] = data;
					console.log(this.notesArray[i], data);
					break;
				}
			}
			console.log(this.notesArray);
			return observer.next(this.notesArray);
		});
	}
}
