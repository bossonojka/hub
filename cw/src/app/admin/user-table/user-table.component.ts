import {Component, OnInit} from '@angular/core';
import {DatasourseService} from '../../model/datasourse.service';
import {Cart} from '../../model/cart.model';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserService} from '../../model/user.service';


@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

    public myUsers;

    constructor(private data: DatasourseService, private  cart: Cart,
                private route: Router, public dialog: MatDialog, public  userService: UserService,
                public matSnack: MatSnackBar) {
    }

    ngOnInit() {
    }

    get users() {
        return this.userService.getUsers();
    }

    deleteUser(id) {
        this.userService.deleteUser(id);
        alert('Пользователь был удалён , обновите данные');
        // this.matSnack.open('Данные были удалены, обновите данные', 'Ok', {duration: 1000});
    }

    updateAll() {
        this.userService.updateUsers();
    }
}
