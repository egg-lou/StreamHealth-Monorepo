import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NgIf,
        MatRipple,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements User {
    username: string;
    password: string;
    name: string;
    submitted: boolean;
    centered = false;
    disabled = false;
    unbounded = false;

    radius: number = 400;
    color: string = 'accent';

    constructor(
        private routerService: Router,
        private apiService: ApiService,
        private dialog: MatDialog
    ) {
        this.name = '';
        this.username = '';
        this.password = '';
        this.submitted = false;
    }

    onLogin(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.apiService
                .login(this.username, this.password)
                .then(status => {
                    if (status === 200) {
                        const dialogRef = this.dialog.open(
                            MessageDialogComponent,
                            {
                                data: {
                                    message: 'Login successful',
                                    status: 'success',
                                },
                            }
                        );
                        dialogRef.afterClosed().subscribe(() => {
                            this.routerService.navigate(['/dashboard']);
                        });
                    }
                })
                .catch(err => {
                    this.dialog.open(MessageDialogComponent, {
                        data: {
                            message: 'Error: ' + err.message,
                            status: 'error',
                        },
                    });
                });
        } else {
            console.log('Form is invalid');
        }
    }
}
