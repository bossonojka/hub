import {Injectable} from '@angular/core';
import {Cart, CartLine} from './cart.model';

@Injectable()
export class Order {
    public id: number;
    public lines?: any;
    public name?: string;
    public surname?: string;
    public adress?: string;
    public city?: string;
    public phone?: string;
    public checked: boolean;

    constructor(public cart: Cart) {
    }

    clear() {
        this.id = null;
        this.name = this.adress = this.city = null;
        this.phone = this.surname = null;
        this.checked = false;
        this.cart.clear();
    }
}

