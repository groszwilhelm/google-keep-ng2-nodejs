import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NoteModule } from './components/notes/notes.module';
import { NoteFormModule } from './components/note-form/note-form.module';
import { NotificationsModule } from 'app/notifications/notifications.module';
import { ColorPaletteModule } from './components/color-palette/color-palette.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AppRoutingRoutingModule } from './app.routing';
import { SearchModule } from './components/search/search.module';

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
    ColorPaletteModule,
    DashboardModule,
    SearchModule,
    AppRoutingRoutingModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
