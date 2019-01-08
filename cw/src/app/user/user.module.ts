import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MatCardModule} from '@angular/material/card';


import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {UserMainComponent} from './user-main/user-main.component';
import {UserInformatonComponent} from './user-informaton/user-informaton.component';
import {UserOrderComponent} from './user-order/user-order.component';


const routing = [
    {
        path: 'main',
        component: UserMainComponent,
        children: [
            {
                path: 'information', component: UserInformatonComponent
            },
            {
                path: 'orders', component: UserOrderComponent,
            },
            {
                path: '**',
                redirectTo: 'information'
            }
        ]
    },
];

@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule.forChild(routing)
        , MatCardModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule, MatFormFieldModule,
        MatTabsModule, MatSnackBarModule
    ],
    declarations: [UserMainComponent, UserInformatonComponent, UserOrderComponent],
})
export class UserModule {
}
