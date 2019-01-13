import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {DatasourseService} from '../../model/datasourse.service';
import {Cart} from '../../model/cart.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from '../../model/user.service';
import {FormControl, NgForm, Validators} from '@angular/forms';

@Component({
    selector: 'app-product-editor',
    templateUrl: './product-editor.component.html',
    styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit {

    product: any;
    showImg = false;
    private mode = 'create';
    private productId: string;
    image = new FormControl(null, [Validators.required]);
    takeImage;
    wayImg;
    wayImgFront;

    constructor(private data: DatasourseService, private  cart: Cart, public router: ActivatedRoute,
                private route: Router, public dialog: MatDialog, public  user: UserService, public  registrValidation: MatSnackBar) {
    }

    ngOnInit() {
        this.router.paramMap.subscribe((paraMap: ParamMap) => {
            if (paraMap.has('id')) {
                this.mode = 'edit';
                this.showImg = true;
                this.productId = paraMap.get('id');
                this.data.getProduct(this.productId).subscribe((value) => {
                    this.product = value;
                    this.wayImg = this.product.url;
                });
            }
            else {
                this.mode = 'create';
                this.productId = null;
            }
            console.log(this.product);
        });
    }

    onSavePost(form: NgForm) {
        if (form.invalid) {
            return;
        }

        if (this.mode === 'create') {
            const newProduct = {
                id: null,
                name: form.value.name,
                manufacturer: form.value.manufacturer,
                price: form.value.price,
                bestProduct: form.value.bestProduct,
                description: form.value.description,
                specifications: form.value.specifications,
                type: form.value.type,
                url: this.wayImg
            };
            this.data.addProduct(newProduct);
            //alert('This product has been added, go back and update the data.');
            this.route.navigateByUrl('/admin/main/products');
        }
        if (this.mode === 'edit') {
            const editProduct = {
                id: this.productId,
                name: form.value.name,
                manufacturer: form.value.manufacturer,
                price: form.value.price,
                bestProduct: form.value.bestProduct,
                type: form.value.type,
                description: form.value.description,
                specifications: form.value.specifications,
                url: this.wayImg
            };
            this.data.upgradeProduct(editProduct);
            //alert('The product has been changed, go back and update the data.');
            this.route.navigateByUrl('/admin/main/products');
        }
    }

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.wayImg = 'assets/img/' + file.name;
        console.log(this.wayImg);
        this.wayImgFront = file.name;
        this.showImg = false;
        const reader = new FileReader();
        reader.onload = () => {
            this.takeImage = reader.result;
        };
        reader.readAsDataURL(file);
    }

}
