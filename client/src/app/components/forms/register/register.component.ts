import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatRipple } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf, MatRipple],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent implements User {
    name: string;
    password: string;
    username: string;
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
        this.password = '';
        this.username = '';
        this.submitted = false;
    }

    onRegister(form: NgForm) {
        this.submitted = true;
        if (form.valid) {
            this.apiService
                .register(this.username, this.name, this.password)
                .then(status => {
                    if (status === 201) {
                        const dialogRef = this.dialog.open(
                            MessageDialogComponent,
                            {
                                data: {
                                    message: 'Registered Successfully!',
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
