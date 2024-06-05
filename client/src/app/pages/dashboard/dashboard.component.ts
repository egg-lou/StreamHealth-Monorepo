import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AxiosService } from '../../services/axios.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/layout/sidebar/sidebar.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { ProfileContainerComponent } from '../../components/containers/profile-container/profile-container.component';
import { PosContainerComponent } from '../../components/containers/pos-container/pos-container.component';
import { ProductsContainerComponent } from '../../components/containers/products-container/products-container.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatDrawerContainer,
        MatDrawer,
        SidebarComponent,
        MatIconButton,
        MatIcon,
        ProfileContainerComponent,
        PosContainerComponent,
        ProductsContainerComponent,
        NgIf,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
    selectedButton: string;

    constructor(
        private axiosService: AxiosService,
        private routerService: Router
    ) {
        this.selectedButton = '';
    }

    getSelectedView() {
        this.sidebarComponent.profileClick.subscribe(() => {
            this.selectedButton = 'profile';
            localStorage.setItem('selectedView', 'profile');
        });
        this.sidebarComponent.productsClick.subscribe(() => {
            this.selectedButton = 'products';
            localStorage.setItem('selectedView', 'products');
        });
        this.sidebarComponent.posClick.subscribe(() => {
            this.selectedButton = 'pos';
            localStorage.setItem('selectedView', 'pos');
        });
        this.sidebarComponent.salesClick.subscribe(() => {
            this.selectedButton = 'sales';
            localStorage.setItem('selectedView', 'sales');
        });
    }

    getAuthProfile() {
        if (this.axiosService.getAuthToken() === null) {
            this.routerService.navigate(['/auth']);
        }
    }

    ngOnInit() {
        const savedView = localStorage.getItem('selectedView');
        this.selectedButton = savedView ? savedView : 'profile';
        this.getAuthProfile();
    }

    ngAfterViewInit() {
        this.getSelectedView();
    }
}
