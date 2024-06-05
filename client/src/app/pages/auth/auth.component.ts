import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LoginComponent } from '../../components/forms/login/login.component';
import { RegisterComponent } from '../../components/forms/register/register.component';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [MatTabGroup, MatTab, LoginComponent, RegisterComponent],
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.css',
})
export class AuthComponent {}
