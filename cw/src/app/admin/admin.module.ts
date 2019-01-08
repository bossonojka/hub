import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AuthComponent} from './auth/auth.component';
import {MatCardModule} from '@angular/material/card';


import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatTabsModule} from '@angular/material';
import {OrderTableComponent} from './order-table/order-table.component';
import {ProductEditorComponent} from './product-editor/product-editor.component';
import {ProductTableComponent} from './product-table/product-table.component';
import {UserTableComponent} from './user-table/user-table.component';
import {UserEditorComponent} from './user-editor/user-editor.component';

const routing = [
    {path: 'auth', component: AuthComponent},
    {
        path: 'main',
        component: AdminComponent,
        children: [
            {
                path: 'products/edit/:id', component: ProductEditorComponent
            },
            {
                path: 'products/create', component: ProductEditorComponent
            },
            {
                path: 'products/:mode',
                component: ProductEditorComponent
            }, {
                path: 'products', component: ProductTableComponent
            }, {
                path: 'orders', component: OrderTableComponent
            },
            {
                path: 'users', component: UserTableComponent
            },
            {
                path: 'users/create', component: UserEditorComponent
            },
            {
                path: 'users/edit/:id', component: UserEditorComponent
            },
            {
                path: '**',
                redirectTo: 'products'
            }]
    },
    {path: '**', redirectTo: 'auth'}];

@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule.forChild(routing)
        , MatCardModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule, MatIconModule, MatFormFieldModule,
        MatTabsModule, MatSnackBarModule
    ], declarations:
        [AuthComponent, AdminComponent, ProductEditorComponent, ProductTableComponent, OrderTableComponent, UserEditorComponent,
            UserTableComponent,
        ]
})
export class AdminModule {
}


