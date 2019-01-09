import {Component, OnInit} from '@angular/core';
import {DatasourseService} from '../../model/datasourse.service';
import {Cart} from '../../model/cart.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserService} from '../../model/user.service';
import {OrderService} from '../../model/ordersourse.service';
import {Product} from '../../model/product.model';

@Component({
    selector: 'app-order-table',
    templateUrl: './order-table.component.html',
    styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

    private myOrders;

    constructor(private data: DatasourseService, private  cart: Cart,
                private route: Router, public orderService: OrderService) {
    }

    ngOnInit() {
        this.myOrders = this.orderService.getOrder(null);
    }

    deleteOrder(id, order) {
        if (id !== null) {
            this.orderService.deleteOrder(id);
            alert('Order has been deleted, update data.');
        }
        else {
            const changeOrder = {
                id : order._id,
                lines: order.lines,
                cartPrice: order.cartPrice,
                user: order.user,
                date: order.date,
                checked: true,
            };
            this.data.updateOrder(changeOrder);
        }
    }


    updateAll() {
        this.myOrders = this.orderService.getOrders();
    }

    get orders() {
        return this.myOrders = this.orderService.getOrders();
    }

}
