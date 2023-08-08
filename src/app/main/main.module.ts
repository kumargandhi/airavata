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
import { InfoComponent } from '../common/components/info/info.component';
import { UserProfileComponent } from '../common/components/user-profile/user-profile.component';
import { AddEditWorkOrderComponent } from '../work-orders/add-edit-work-order/add-edit-work-order.component';
import { DetailsStepComponent } from '../work-orders/add-edit-work-order/components/details-step/details-step.component';
import { EstimateStepComponent } from '../work-orders/add-edit-work-order/components/estimate-step/estimate-step.component';
import { ActionStepComponent } from '../work-orders/add-edit-work-order/components/action-step/action-step.component';
import { SummaryStepComponent } from '../work-orders/add-edit-work-order/components/summary-step/summary-step.component';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        InfoComponent,
        UserProfileComponent,
        MainComponent,
        DashboardComponent,
        WorkOrdersComponent,
        AddEditWorkOrderComponent,
        DetailsStepComponent,
        EstimateStepComponent,
        ActionStepComponent,
        SummaryStepComponent
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
