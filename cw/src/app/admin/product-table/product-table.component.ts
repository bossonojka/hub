import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {DatasourseService} from '../../model/datasourse.service';
import {Cart} from '../../model/cart.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserService} from '../../model/user.service';
import {OrderService} from '../../model/ordersourse.service';

@Component({
    selector: 'app-product-table',
    templateUrl: './product-table.component.html',
    styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {

    public selectedCategory = null;

    constructor(private data: DatasourseService, private  cart: Cart,
                private route: Router, public dialog: MatDialog, public  user: UserService, public orderService: OrderService) {
    }

    get myOrder() {
        return this.orderService.getOrder(null);
    }

    get products(): Product[] {
        return this.data.getProducts(this.selectedCategory);
    }

    deleteProduct(id) {
        this.data.deleteProduct(id);
        alert('Товар был удалён ,обновите данные');
    }

    updateAll() {
        this.data.updateAllProducts();
    }

    ngOnInit() {
    }

}
