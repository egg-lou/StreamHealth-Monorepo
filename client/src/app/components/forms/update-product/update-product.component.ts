import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { NgIf } from '@angular/common';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import {
    decimalValidator,
    integerOnlyValidator,
} from '../../../../custom-validators';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { Product } from '../../../models/product';

@Component({
    selector: 'app-update-product',
    standalone: true,
    imports: [FormsModule, MatRipple, NgIf, ReactiveFormsModule],
    templateUrl: './update-product.component.html',
    styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
    @Output() productUpdate: EventEmitter<void> = new EventEmitter();
    updateForm: FormGroup;
    centered = false;
    disabled = false;
    unbounded = false;
    radius: number = 400;
    color: string = 'accent';

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<UpdateProductComponent>,
        @Inject(MAT_DIALOG_DATA) public product: Product,
        private apiService: ApiService,
        private dialog: MatDialog
    ) {
        this.updateForm = this.formBuilder.group({
            productName: [product.productName, Validators.required],
            productDescription: [
                product.productDescription,
                Validators.required,
            ],
            productPrice: [
                product.productPrice,
                [Validators.required, Validators.min(0), decimalValidator()],
            ],
            productStock: [
                product.productStock,
                [
                    Validators.required,
                    Validators.min(0),
                    integerOnlyValidator(),
                ],
            ],
        });
    }

    ngOnInit() {}

    updateProduct() {
        if (this.updateForm.valid) {
            const updatedProduct = this.updateForm.value;
            updatedProduct.productPrice = parseFloat(
                updatedProduct.productPrice
            );
            updatedProduct.productStock = parseInt(updatedProduct.productStock);
            const productId = this.product.productId;

            this.apiService
                .updateProduct(productId, updatedProduct)
                .then(response => {
                    this.dialog.closeAll();
                    this.dialog.open(MessageDialogComponent, {
                        data: {
                            message: 'Product updated successfully',
                            status: 'success',
                        },
                    });
                    this.productUpdate.emit();
                })
                .catch(error => {
                    this.dialog.open(MessageDialogComponent, {
                        data: {
                            message: 'Error updating product',
                            status: 'error',
                        },
                    });
                });
        }
    }

    getErrorMessage(field: string) {
        let message;
        const formField = this.updateForm.get(field);

        if (formField) {
            if (formField.hasError('required')) {
                message = 'You must enter a value';
            } else if (formField.hasError('min')) {
                message = 'The value must be greater than 0';
            } else if (formField.hasError('decimalOnly')) {
                message = 'The value must be a decimal';
            } else if (formField.hasError('integerOnly')) {
                message = 'The value must be an integer';
            }
        }
        return message;
    }
}
