import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Order} from './order.model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orders;
    private orderUpdates = new Subject<Order []>();


    constructor(private http: HttpClient, private router: Router) {
        this.http.get<any>('http://localhost:3000/orders').subscribe(data => {
            this.orders = data;
        });
    }

    getOrders() {
        this.http.get<any>('http://localhost:3000/orders').subscribe(data => {
            this.orders = data;
        });
        return this.orders;
    }

    getOrder(order) {
        return this.orders;
    }

    addOrder(order) {
        this.http.post<any>('http://localhost:3000/orders', order).subscribe(newOrder => console.log(newOrder));
    }

    updateOrder(order) {
        this.http.put<any>('http://localhost:3000/orders/' + order.id, order);
    }

    deleteOrder(orderId) {
        this.http.delete('http://localhost:3000/orders/' + orderId).subscribe(() => {
        });
    }
}
