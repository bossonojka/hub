import {Component, OnInit} from '@angular/core';
import {DatasourseService} from '../../model/datasourse.service';
import {Cart} from '../../model/cart.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from '../../model/user.service';
import {NgForm} from '@angular/forms';
import { setTimeout } from 'timers';

@Component({
    selector: 'app-user-editor',
    templateUrl: './user-editor.component.html',
    styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {

    user: any;
    private mode = 'create';
    private userId: string;

    constructor(private data: DatasourseService, private  cart: Cart, public router: ActivatedRoute,
                private route: Router, public dialog: MatDialog, public  matSnack: MatSnackBar, public  userService: UserService) {
    }

    ngOnInit() {
        this.router.paramMap.subscribe((paraMap: ParamMap) => {
            if (paraMap.has('id')) {
                this.mode = 'edit';
                this.userId = paraMap.get('id');
                this.userService.getUserId(this.userId).subscribe((value) => {
                    this.user = value;
                });
            }
            else {
                this.mode = 'create';
                this.userId = null;
            }
        });
    }

    checkMode() {
        return true ? this.mode === 'create' : false;
    }

    getPasswort() {
        return this.user.password;
    }

    onSaveUser(form: NgForm) {
        if (form.invalid) {
            return;
        }
        if (this.mode === 'create') {
            const newUser = {
                id: null,
                email: form.value.email,
                name: form.value.name,
                surname: form.value.surname,
                city: form.value.city,
                adress: form.value.adress,
                number: form.value.number,
                password: form.value.password,
                role: form.value.role,
            };
            this.userService.createUser(newUser);
            alert('The user has been added, go back and update the data.');
            this.route.navigateByUrl('/admin/main/users');
        }
        else {
            const editUser = {
                id: this.userId,
                email: form.value.email,
                name: form.value.name,
                surname: form.value.surname,
                city: form.value.city,
                adress: form.value.adress,
                number: form.value.number,
                password: this.getPasswort(),
                role: form.value.role,
            };
            this.userService.upgradeUser(editUser);
            //alert('User has been changed, go back and update data.');
            this.route.navigateByUrl('/admin/main/users');
        }
    }
}
