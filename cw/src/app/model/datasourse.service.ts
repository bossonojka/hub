import {Injectable, OnInit} from '@angular/core';
import {Product} from './product.model';
import {Observable, Subject} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

// СДЕЛАТЬ ОТДЕЛЬНО ФАЙЛ КОТОРЫЙ ПОЛУЧАЕТ ЗАПРОСЫ И ВСЕ А ТУТ ПРОСТО ВЫЗЫВАЕТ МЕТОДЫ С ЭТОГО ФАЛЙА


export class DatasourseService implements OnInit {

    private products: Product[];
    private orders;
    private type: string [];
    private productUpdates = new Subject<Product []>();

    constructor(private http: HttpClient) {
        this.http.get<any>('http://localhost:3000/products').pipe(map(function (postData) {
            return postData.map(post => {
                return {
                    id: post._id,
                    name: post.name,
                    manufacturer: post.manufacturer,
                    url: post.url,
                    description: post.description,
                    specifications: post.specifications,
                    type: post.type,
                    price: post.price,
                    bestProduct: post.bestProduct,
                };
            });
        })).subscribe((transProduct) => {
            this.products = transProduct;
            this.type = transProduct.map(p => p.type).filter((c, index, array) =>
                array.indexOf(c) === index).sort();
            this.productUpdates.next([...this.products]);
        });
    }

    ngOnInit(): void {

    }

    getOrders() {
        this.http.get<any>('http://localhost:3000/orders').subscribe(data => {
            this.orders = data;
        });
        return this.orders;
    }

    getProductUpdates() {
        return this.productUpdates.asObservable();
    }

    updateAllProducts() {
        this.http.get<any>('http://localhost:3000/products').pipe(map(function (postData) {
            return postData.map(post => {
                return {
                    id: post._id,
                    name: post.name,
                    manufacturer: post.manufacturer,
                    url: post.url,
                    description: post.description,
                    specifications: post.specifications,
                    type: post.type,
                    price: post.price,
                    bestProduct: post.bestProduct,
                };
            });
        })).subscribe((transProduct) => {
            this.products = transProduct;
            this.type = transProduct.map(p => p.type).filter((c, index, array) =>
                array.indexOf(c) === index).sort();
            this.productUpdates.next([...this.products]);
        });
    }

    addProduct(product) {
        this.http.post<any>('http://localhost:3000/products', product).subscribe((newProduct) => {
            this.products.push(newProduct);
            this.productUpdates.next([...this.products]);
        });
    }

    updateProduct(product) {
        this.http.put<any>('http://localhost:3000/products/' + product.id, product).subscribe((newProduct) => {
            this.productUpdates.next([...this.products]);
        });
    }

    deleteProduct(productId) {
        this.http.delete('http://localhost:3000/products/' + productId).subscribe(() => {
        });
    }

    updateOrder(order) {
        this.http.put<any>('http://localhost:3000/orders/' + order.id, order).subscribe(next => {
        });
    }

    upgradeProduct(product) {
        this.http.put<any>('http://localhost:3000/products/' + product.id, product).subscribe((newProduct) => {
            // let updateProduct = this.products;
            // let oldIndex = updateProduct.find(p => p.id === product.id);
            // updateProduct[oldIndex] = newProduct;
            // this.products = updateProduct;
            // // this.products.push(newProduct);
            // this.productUpdates.next([...this.products]);
        });
    }

    getProducts(category: string = null): Product[] {
        return this.products !== undefined ? this.products.filter(p => category == null || category === p.type) : undefined;
    }


    getProduct(id: string) {
        return this.http.get<any>('http://localhost:3000/products/' + id);
    }

    getCategories(): string[] {
        return this.type !== undefined ? this.type : undefined;
    }

    getProductSlider() {
        const category1 = 'InstaPump Fury';
        const category2 = 'VeaponX';
        const category3 = 'OZWEEGO';
        let product1: Product[] = this.products !== undefined ? this.products.filter(p => category1 === p.name) : undefined;
        let product2: Product[] = this.products !== undefined ? this.products.filter(p => category2 === p.name) : undefined;
        let product3: Product[] = this.products !== undefined ? this.products.filter(p => category3 === p.name) : undefined;
        let returnItem: Product [] = [product1[0], product2[0], product3[0]];
        return returnItem;
    }

    getBestProduct() {
        return this.products !== undefined ? this.products.filter(p => p.bestProduct === 'true') : undefined;
    }

    getAllProduct() {
        return this.products !== undefined ? this.products : undefined;
    }
}
