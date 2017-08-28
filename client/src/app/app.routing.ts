import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteFormComponent } from './components/note-form/note-form.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'notes'
    },
    {
        path: 'notes',
        component: NoteFormComponent
    },
    {
        path: 'search',
        component: SearchComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingRoutingModule { }