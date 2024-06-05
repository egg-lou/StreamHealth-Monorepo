import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import {
    integerOnlyValidator,
    decimalValidator,
} from '../../../../custom-validators';
import { ApiService } from '../../../services/api.service';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-create-product',
    standalone: true,
    imports: [
        FormsModule,
        MatRipple,
        NgIf,
        ReactiveFormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatButton,
    ],
    templateUrl: './create-product.component.html',
    styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
    productForm: FormGroup;
    centered = false;
    disabled = false;
    unbounded = false;
    radius: number = 400;
    color: string = 'accent';

    constructor(
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private apiService: ApiService
    ) {
        this.productForm = this.formBuilder.group({
            productName: ['', Validators.required],
            productDescription: ['', Validators.required],
            productPrice: [
                '',
                [Validators.required, Validators.min(0), decimalValidator()],
            ],
            productStock: [
                '',
                [
                    Validators.required,
                    Validators.min(0),
                    integerOnlyValidator(),
                ],
            ],
        });
    }

    ngOnInit() {}

    createProduct() {
        if (this.productForm.valid) {
            const productData = this.productForm.value;
            productData.productPrice = parseFloat(productData.productPrice);
            productData.productStock = parseInt(productData.productStock);

            this.apiService
                .createProduct(productData)
                .then(response => {
                    this.productForm.reset();
                    let status =
                        response === 200 || response === 201
                            ? 'success'
                            : 'error';
                    this.dialog.closeAll();
                    this.dialog.open(MessageDialogComponent, {
                        data: {
                            message: 'Product created successfully',
                            status: status,
                        },
                    });
                })
                .catch(error => {
                    this.dialog.open(MessageDialogComponent, {
                        data: {
                            message: 'Error creating product: ' + error.message,
                            status: 'error',
                        },
                    });
                });
        }
    }

    getErrorMessage(controlName: string) {
        let control = this.productForm.get(controlName);

        if (control) {
            if (control.hasError('required')) {
                return 'You must enter a value';
            } else if (control.hasError('decimalOnly')) {
                return 'The value must be a decimal';
            } else if (control.hasError('integerOnly')) {
                return 'The value must be an integer';
            }
        }

        return '';
    }
}
