import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreFirstGuard} from './storeFirst.guard';

import {Order} from './model/order.model';
import {HeaderComponent} from './header/header.component';

import {
    MatToolbarModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
} from '@angular/material';

import {MatDialogModule} from '@angular/material/dialog';


import {StoreComponent} from './store/store.component';
import {Cart} from './model/cart.model';
import {CartSummaryComponent} from './store/cart-summary/cart-summary.component';
import {CartDetailComponent} from './store/cart-detail/cart-detail.component';
import {CheckoutComponent} from './store/checkout/checkout.component';
import {RouterModule} from '@angular/router';
import {SliderStoreComponent} from './store/slider-store/slider-store.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModelProductComponent} from './store/model-product/model-product.component';
import {OrderService} from './model/ordersourse.service';

import {ProductTableComponent} from './admin/product-table/product-table.component';
import {ProductEditorComponent} from './admin/product-editor/product-editor.component';
import {OrderTableComponent} from './admin/order-table/order-table.component';
import {UserMainComponent} from './user/user-main/user-main.component';
import {UserInformatonComponent} from './user/user-informaton/user-informaton.component';
import {UserOrderComponent} from './user/user-order/user-order.component';
import { UserEditorComponent } from './admin/user-editor/user-editor.component';
import { UserTableComponent } from './admin/user-table/user-table.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        StoreComponent,
        CartSummaryComponent,
        CartDetailComponent,
        CheckoutComponent,
        SliderStoreComponent,
        ModelProductComponent,
        // UserEditorComponent,
        // UserTableComponent,
        // UserMainComponent,
        // UserInformatonComponent,
        // UserOrderComponent,
        // ProductTableComponent,
        // ProductEditorComponent,
        // OrderTableComponent,
    ],
    imports: [
        NgbModule,
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatDialogModule
    ],
    entryComponents: [ModelProductComponent],
    providers: [AppComponent, Cart, StoreFirstGuard, Order, OrderService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
