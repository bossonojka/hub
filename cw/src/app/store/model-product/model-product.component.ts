import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {MatDialogRef} from '@angular/material';
import {Product} from '../../model/product.model';
import {Router} from '@angular/router';



@Component({
    selector: 'app-model-product',
    templateUrl: './model-product.component.html',
    styleUrls: ['./model-product.component.css']
})
export class ModelProductComponent implements OnInit {
    
    constructor(public dialogRef: MatDialogRef<ModelProductComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any, private route: Router) {
    }

    ngOnInit() {
    }

    getData(){
        return this.data;
    }

    close() {
        this.dialogRef.close(undefined);
    }

    save() {
        this.dialogRef.close(this.data);
    }
}
