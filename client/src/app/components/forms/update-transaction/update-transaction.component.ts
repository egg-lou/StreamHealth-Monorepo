import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Transaction } from '../../../models/transaction';
import { NgForOf, NgIf } from '@angular/common';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-update-transaction',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatRipple,
    NgForOf,
  ],
  templateUrl: './update-transaction.component.html',
  styleUrl: './update-transaction.component.css'
})
export class UpdateTransactionComponent implements OnInit{
  @Output() transactionUpdate: EventEmitter<void> = new EventEmitter();
  updateForm: FormGroup;
  centered = false;
  disabled = false;
  unbounded = false;
  radius: number = 400;
  color: string = 'accent';

  constructor(
    private  formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public transaction: Transaction,
  ) {
    this.updateForm = this.formBuilder.group({
      clientName: [transaction.clientName, Validators.required],
      paymentMethod: [transaction.paymentMethod, Validators.required],
      discountType: [transaction.discountType, Validators.required],
      discountPercentage: [transaction.discountPercentage, Validators.required],
      totalAmount: [transaction.totalAmount, Validators.required],
      products: this.formBuilder.array(transaction.products.map(product => this.createProduct(product)))
    });
  }

  createProduct(product: any): FormGroup {
    return this.formBuilder.group({
      productId: [product.productId, Validators.required],
      quantitySold: [product.quantitySold, Validators.required]
    });
  }

  addProduct(): void {
    (this.updateForm.get('products') as FormArray).push(this.createProduct({productId: '', quantitySold: ''}));
  }

  ngOnInit(): void {}

  updateTransaction(): void {
    console.log(this.updateForm.value);
  }

  removeProduct(index: number): void {
    (this.updateForm.get('products') as FormArray).removeAt(index);
  }

  get productForms() {
    return (this.updateForm.get('products') as FormArray).controls;
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
