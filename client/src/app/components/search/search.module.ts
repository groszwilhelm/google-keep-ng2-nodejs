import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';
import { NoteModule } from '../notes/notes.module';

@NgModule({
    imports: [
        NoteModule
    ],
    exports: [
        SearchComponent
    ],
    declarations: [
        SearchComponent
    ],
    providers: [],
})
export class SearchModule { }
