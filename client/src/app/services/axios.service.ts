import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AxiosService {
    public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    private hasToken(): boolean {
        return this.getAuthToken() !== null;
    }
    constructor() {
        axios.defaults.baseURL = 'http://localhost:3000';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    getAuthToken(): string | null {
        return window.localStorage.getItem('authToken');
    }

    setAuthToken(token: string | null) {
        if (token !== null) {
            window.localStorage.setItem('authToken', token);
            this.loggedIn.next(true);
        } else {
            window.localStorage.removeItem('authToken');
            this.loggedIn.next(false);
        }
    }

    logout() {
        return new Promise<void>(resolve => {
            window.localStorage.clear();
            this.loggedIn.next(false);
            resolve();
        });
    }

    request(method: string, url: string, data: any) {
        let headers = {};

        if (this.getAuthToken() !== null) {
            headers = { Authorization: 'Bearer ' + this.getAuthToken() };
        }
        return axios({
            method,
            url,
            data,
            headers,
        });
    }
}
