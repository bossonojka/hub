import {Component, OnInit} from '@angular/core';

import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../model/user.model';
import {UserService} from '../../model/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
    inputEmail = new FormControl('', [Validators.required, Validators.email]);
    inputPassword = new FormControl('5', [Validators.required, Validators.min(6)]);
    inputName = new FormControl('', [Validators.required]);
    inputSurname = new FormControl('', [Validators.required]);
    inputAdress = new FormControl('', [Validators.required]);
    inputCity = new FormControl('', [Validators.required]);
    inputNumber = new FormControl('', [Validators.required]);
    hide = true;
    requiredInput = new FormControl('', Validators.required);
    control = new FormControl('2', [Validators.min(6), Validators.email, Validators.required]);


    constructor(public userService: UserService, public route: Router, public  registrValidation: MatSnackBar) {

    }


    inputEmailAutoriz = new FormControl('', [Validators.required, Validators.email]);
    inputPasswordAutoriz = new FormControl('5', [Validators.required, Validators.min(6)]);


    getErrorEmail() {
        return this.inputEmail.hasError('required') ? 'Поле должно быть заполненным' :
            this.inputEmail.hasError('email') ? 'Not a valid email' :
                ' ';
    }

    getErrorPassword() {
        return this.inputPassword.hasError('required') ? 'You must enter a value' :
            this.control.hasError('min') ? ' Пароль должен быть больше 6-ти символов' : '';
    }

    getErrorRequired() {
        return this.requiredInput.hasError('required') ? 'Поле должно быть заполненным' : '';
    }

    saveUser() {
        if (!this.inputSurname.valid && !this.inputName.valid && !this.inputEmail.valid && !this.inputCity.valid &&
            !this.inputAdress.valid && this.inputPassword.valid !== true) {
            return;
        }

        const newUser: { id: null; email: any; name: any; surname: any; city: any; number:
                any; adress: any; password: any; role: string } = {
            id: null,
            email: this.inputEmail.value,
            name: this.inputName.value,
            surname: this.inputSurname.value,
            city: this.inputCity.value,
            adress: this.inputAdress.value,
            number: this.inputNumber.value,
            password: this.inputPassword.value,
            role: 'user'
        };

        const message = this.userService.createUser(newUser);
        this.registrValidation.open(message, 'Ok', {duration: 1000});
    }


    enterenseUser() {
        const userData = {
            email: this.inputEmailAutoriz.value,
            password: this.inputPasswordAutoriz.value
        };
        this.userService.loginUser(userData);
    }


    ngOnInit() {
    }

}
