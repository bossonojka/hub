import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {DatasourseService} from '../../model/datasourse.service';
import {Cart} from '../../model/cart.model';
import {Product} from '../../model/product.model';

@Component({
    selector: 'app-slider-store',
    templateUrl: './slider-store.component.html',
    styleUrls: ['./slider-store.component.css']
})
export class SliderStoreComponent implements OnInit {


    public sliderList: Product[];


    constructor(config: NgbCarouselConfig, private data: DatasourseService, private  cart: Cart) {
        config.showNavigationIndicators = false;
    }

    ngOnInit() {

    }

    get products() {
        return this.data.getProductSlider();
    }

    // get categories(): string[] {
    //     return this.data.getCategories();
    // }
    addProductToCart(product: Product) {
        this.cart.addLine(product);
        // this.route.navigateByUrl('/cart');
    }
}
