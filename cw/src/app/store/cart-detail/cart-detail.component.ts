import {Component, OnInit} from '@angular/core';
import {Cart} from '../../model/cart.model';
import {UserService} from '../../model/user.service';
import {Router} from '@angular/router';
import {OrderService} from '../../model/ordersourse.service';
import {User} from '../../model/user.model';

@Component({
    selector: 'app-cart-detail',
    templateUrl: './cart-detail.component.html',
    styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {

    public myUser;

    constructor(public cart: Cart, public user: UserService, public router: Router, public orderService: OrderService) {
    }

    ngOnInit() {
    }

    get registr(): boolean {
        return this.user.chekRegistr();
    }


    get registUser() {
        // if (localStorage.getItem('email'))
        return this.user.getUser(localStorage.getItem('email'));
    }

    makeOrder() {
        if (!this.registr) {
            this.router.navigateByUrl('/admin/auth');
        }

        let order = {
            lines: this.cart.lines,
            cartPrice: this.cart.cartPrice,
            user: this.registUser,
        };
        this.orderService.addOrder(order);
        alert('Заказ был принят');
    }
}
