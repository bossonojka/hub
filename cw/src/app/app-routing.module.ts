import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StoreComponent} from './store/store.component';
import {CartDetailComponent} from './store/cart-detail/cart-detail.component';
import {CheckoutComponent} from './store/checkout/checkout.component';
import {StoreFirstGuard} from './storeFirst.guard';


const routes: Routes = [
    {
        path: '', component: StoreComponent,
        canActivate: [StoreFirstGuard]
    },
    {
        path: 'admin', loadChildren: './admin/admin.module#AdminModule',
        canActivate: [StoreFirstGuard]
    },

    {
        path: 'user', loadChildren: './user/user.module#UserModule'
    },

    {
        path: 'cart', component: CartDetailComponent,
        canActivate: [StoreFirstGuard]
    },
    {
        path: 'checkout', component: CheckoutComponent,
        canActivate: [StoreFirstGuard]
    },
    {path: '**', redirectTo: '/'},

];


@NgModule({
    imports:
        [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
