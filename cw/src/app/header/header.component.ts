import {Component, OnInit} from '@angular/core';
import {UserService} from '../model/user.service';
import {register} from 'ts-node';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header-component.css']
})

export class HeaderComponent implements OnInit {

    public elem = false;

    ngOnInit() {

    }

    constructor(public user: UserService, public  router: Router) {
        this.elem = user.checkRol('admin');
    }

    get registr(): boolean {
        return this.user.chekRegistr();
    }

    logout() {
        this.user.logout();
        // this.registr = false;
    }

}