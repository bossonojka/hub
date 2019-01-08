import {Injectable} from '@angular/core';

import {Router} from '@angular/router';
import {User} from './user.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    public user;
    public userId;
    public users;
    public statusCreateUser;
    public registr;
    public data;

    private_options = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

    constructor(private http: HttpClient, private router: Router) {
        if (this.chekRegistr()) {
            const email = localStorage.getItem('email');
            this.http.get<any>('http://localhost:3000/users/usermail/' + email).subscribe(data => {
                this.user = data;
            });
            return this.user;
        }
        this.getUsers();
    }

    getUsers() {
        if (this.users !== undefined) {
            return this.users;
        }
        else {
            this.http.get<any>('http://localhost:3000/users').subscribe(data => {
                this.users = data;
            });
            return this.users;
        }
    }


    updateUsers() {
        this.http.get<any>('http://localhost:3000/users').subscribe(data => {
            this.users = data;
        });

    }

    createUser(user: User) {
        this.http.post<any>('http://localhost:3000/users/registration', user).subscribe((data) => this.data = data.message);
        return this.data;
    }

    upgradeUser(user) {
        return this.http.put<any>('http://localhost:3000/users/' + user.id, user).subscribe(data => {
        });
    }

    deleteUser(userId) {
        this.http.delete('http://localhost:3000/users/' + userId).subscribe(() => {
        });
    }


    loginUser(userData) {
        // this.http.post<any>('http://localhost:3000/users/login', userData);
        this.http.post<any>('http://localhost:3000/users/login', userData).subscribe(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRoles', data.role);
            localStorage.setItem('email', data.email);
            if (data.role === 'admin') {
                this.router.navigateByUrl('/admin/main');
            }

            if (data.role === 'user') {
                this.router.navigateByUrl('/user');
            }
        });
    }

    getUser(email) {
        this.http.get<any>('http://localhost:3000/users/usermail/' + email).subscribe(data => {
            this.user = data;
        });
        return this.user;
    }

    getUserId(id) {
        return this.http.get<any>('http://localhost:3000/users/userid/' + id);
    }

    chekRegistr(): boolean {

        if (localStorage.length > 0) {
            return this.registr = true;
        }
        else {
            return this.registr = false;
        }
    }

    checkRol(role): boolean {
        let returnValue = false;
        const roleUser = localStorage.getItem('userRoles');
        if (roleUser === role) {
            returnValue = true;
        }
        return returnValue;
    }

    logout() {
        localStorage.clear();
    }

}
