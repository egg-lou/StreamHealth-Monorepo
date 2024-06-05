import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-quantity-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    NgIf,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    MatError
  ],
  templateUrl: './quantity-dialog.component.html',
  styleUrl: './quantity-dialog.component.css'
})
export class QuantityDialogComponent {
  quantityControl = new FormControl(1, [Validators.required, Validators.min(1)]);

  constructor(
    public dialogRef: MatDialogRef<QuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
