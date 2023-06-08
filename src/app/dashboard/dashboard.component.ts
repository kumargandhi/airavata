import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Store, ActionsSubject } from '@ngrx/store';
import { takeUntil, skip } from 'rxjs/operators';

import {
    WOS_FETCHED,
    getWorkOrders,
} from '../common/state/actions/work-order.actions';
import { DestroyService } from '../common/services/destroy.service';
import { IWorkOrder } from '../common/interfaces/work-order.interface';
import { PRIORITIES } from '../main/constants';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyService],
})
export class DashboardComponent implements OnInit {
    loading = false;
    workOrders: IWorkOrder[];
    data: any;
    options: any;

    priorities = Object.keys(PRIORITIES);

    constructor(
        private _destroy$: DestroyService,
        private _actionListener: ActionsSubject,
        private _cd: ChangeDetectorRef,
        private _store: Store
    ) {}

    ngOnInit(): void {
        this.loading = true;
        // Dispatch action to get the work orders.
        this._store.dispatch(getWorkOrders());
        this._actionListener
            .pipe(takeUntil(this._destroy$), skip(1))
            .subscribe((action: any) => {
                if (action.type === WOS_FETCHED) {
                    this.workOrders = action.val;
                    this.computeChart();
                }
                this.loading = false;
                this._cd.detectChanges();
            });
    }

    computeChart() {
        const chartData: number[] = [];
        this.priorities.forEach((val) => {
            chartData.push(
                this.workOrders.filter((wo) => {
                    return wo.priority === val;
                }).length
            );
        });
        this.data = {
            labels: this.priorities,
            datasets: [
                {
                    data: chartData,
                    backgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#FFCE56', '#36A2EB'],
                },
            ],
        };

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057',
                    },
                },
            },
            responsive: false,
            maintainAspectRatio: false,
        };
    }
}
