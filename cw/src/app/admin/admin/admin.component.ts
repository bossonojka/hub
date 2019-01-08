import {Component, OnInit} from '@angular/core';
import {Cart} from '../../model/cart.model';
import {UserService} from '../../model/user.service';
import {Router} from '@angular/router';
import {OrderService} from '../../model/ordersourse.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    myUser;

    constructor(public cart: Cart, public user: UserService, public router: Router, public orderService: OrderService) {
    }

    get registUser() {
        if (this.myUser === undefined)
            return this.myUser = this.user.getUser(localStorage.getItem('email'));
    }

    ngOnInit() {

    }

}
