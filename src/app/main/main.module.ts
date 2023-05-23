import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MAIN_PRIME_NG_MODULES } from '../constants';
import { LogoModule } from '../common/components/logo/logo.module';
import { WorkOrdersComponent } from '../work-orders/work-orders.component';
import { SidebarComponent } from '../common/components/sidebar/sidebar.component';
import { HeaderComponent } from '../common/components/header/header.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        MainComponent,
        DashboardComponent,
        WorkOrdersComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ...MAIN_PRIME_NG_MODULES,
        MainRoutingModule,
        LogoModule,
    ],
    exports: [],
})
export class MainModule {}
