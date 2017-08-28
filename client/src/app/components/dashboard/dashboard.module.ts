import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard.component';
import { AppRoutingRoutingModule } from '../../app.routing';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingRoutingModule
    ],
    exports: [
        DashboardComponent
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [],
})
export class DashboardModule { }
