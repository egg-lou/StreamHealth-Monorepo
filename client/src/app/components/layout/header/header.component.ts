import { Component } from '@angular/core';
import { DashboardBtnComponent } from '../../buttons/dashboard-btn/dashboard-btn.component';
import { Router, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { ApiService } from '../../../services/api.service';
import { AxiosService } from '../../../services/axios.service';
import { ProfileBtnComponent } from '../../buttons/profile-btn/profile-btn.component';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        DashboardBtnComponent,
        RouterLink,
        NgForOf,
        NgIf,
        MatButton,
        ProfileBtnComponent,
        MatIcon,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    constructor(
        private apiService: ApiService,
        private routerService: Router,
        private axiosService: AxiosService
    ) {}

    loggedIn: boolean = false;

    links: { name: string; path: string }[] = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
    ];

    async onLogout() {
        await this.apiService.logoutUser();
        await this.routerService.navigate(['/']);
    }

    ngOnInit() {
        this.axiosService.loggedIn.subscribe(value => {
            this.loggedIn = value;
        });
    }
}
