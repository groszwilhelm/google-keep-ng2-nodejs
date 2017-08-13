import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoteModule } from './components/notes/notes.module';
import { NoteFormModule } from './components/note-form/note-form.module';
import { NotificationsModule } from 'app/notifications/notifications.module';
import { ColorPaletteModule } from './components/color-palette/color-palette.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NoteModule,
    NoteFormModule,
    NotificationsModule,
    ColorPaletteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
