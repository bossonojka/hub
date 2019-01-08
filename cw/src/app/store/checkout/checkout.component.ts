import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {OrderService} from '../../model/ordersourse.service';
import {Order} from '../../model/order.model';
import {Cart, CartLine} from '../../model/cart.model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    public orderSent = false;
    public submitted = false;

    ngOnInit() {
    }

    constructor(public repository: OrderService, public  card: Cart, public order: Order) {
    }


    saveOrder(form: NgForm) {
        this.submitted = true;
        if (!form.valid) {
            return;
        }
        const newOrder: { lines: CartLine[]; id: null; name: any; surname: any; adress: any; city: any; phone: any; checked: boolean } = {
            lines: this.card.lines,
            id: null,
            name: form.value.name,
            surname: form.value.surname,
            adress: form.value.adress,
            city: form.value.city,
            phone: form.value.phone,
            checked: false,
        };
        this.repository.addOrder(newOrder);
        this.orderSent = true;
    }
}
