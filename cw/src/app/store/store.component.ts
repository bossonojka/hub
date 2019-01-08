import {Component, OnInit} from '@angular/core';
import {DatasourseService} from '../model/datasourse.service';
import {Product} from '../model/product.model';
import {Cart} from '../model/cart.model';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ModelProductComponent} from './model-product/model-product.component';
import {UserService} from '../model/user.service';


@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    // moduleId: module.id,
    styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

    public selectedCategory = null;
    public productsPerPage = 6;
    public selectedPage = 1;
    public myUser;

    constructor(private data: DatasourseService, private  cart: Cart,
                private route: Router, public dialog: MatDialog, public  user: UserService, public matSnack: MatSnackBar) {
    }

    ngOnInit() {
        // this.data.getProductData();
    }

    openDialog(product?: Product): void {
        const dialogRef = this.dialog.open(ModelProductComponent, {
            data: product,
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result !== undefined) {
                this.cart.addLine(result);
                this.matSnack.open('Товар был добавлен', 'Ok', {duration: 1000});
            }
        });
    }

    get products(): Product[] {
        return this.data.getProducts(this.selectedCategory);
    }

    get Allproduct(): Product[] {
        return this.data.getAllProduct();
    }

    get BestProduct(): Product [] {
        return this.data.getBestProduct();
    }

    get categories(): string[] {
        return this.data.getCategories();
    }

    changeCategory(newCategory?: string) {
        this.selectedCategory = newCategory;
        return false;
    }

    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    get pageNumbers(): number[] {
        return Array(Math.ceil(this.data.getProducts(this.selectedCategory).length / this.productsPerPage)).fill(0).map((x, i) => i + 1);
    }

    addProductToCart(product: Product) {
        this.cart.addLine(product);
        this.route.navigateByUrl('/cart');
    }
}
