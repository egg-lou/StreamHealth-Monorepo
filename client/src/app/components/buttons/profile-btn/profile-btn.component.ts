import { Component, ElementRef, HostListener } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NavigationStart, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-profile-btn',
    standalone: true,
    imports: [NgIf, MatButton],
    templateUrl: './profile-btn.component.html',
    styleUrl: './profile-btn.component.css',
})
export class ProfileBtnComponent {
    dropdownOpen = false;
    username = '';

    constructor(
        private apiService: ApiService,
        private routerService: Router,
        private elementRef: ElementRef
    ) {
        this.routerService.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.dropdownOpen = false;
            }
        });
    }

    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }

    onDashboardClick() {
        this.routerService.navigate(['/dashboard']);
    }

    onLogoutClick() {
        this.apiService.logoutUser();
        this.routerService.navigate(['/']);
    }

    ngOnInit() {
        this.apiService.getProfile().then(response => {
            this.username = response.data.login;
        });
    }

    @HostListener('document:click', ['$event'])
    clickout(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.dropdownOpen = false;
        }
    }
}
