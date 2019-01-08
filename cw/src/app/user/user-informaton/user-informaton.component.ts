import {Component, OnInit} from '@angular/core';
import {Cart} from '../../model/cart.model';
import {UserService} from '../../model/user.service';
import {Router} from '@angular/router';
import {OrderService} from '../../model/ordersourse.service';

@Component({
    selector: 'app-user-informaton',
    templateUrl: './user-informaton.component.html',
    styleUrls: ['./user-informaton.component.css']
})
export class UserInformatonComponent implements OnInit {

    constructor(public cart: Cart, public user: UserService, public router: Router, public orderService: OrderService) {
    }

    get registUser() {
        // if (localStorage.getItem('email'))
        return this.user.getUser(localStorage.getItem('email'));
    }

    ngOnInit() {
    }

}
