import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CreateProductComponent as CreateProductFormComponent } from '../../forms/create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-create-product',
    standalone: true,
    imports: [MatMiniFabButton, MatIconButton, MatIcon],
    templateUrl: './create-product.component.html',
    styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
    @Output() productCreated: EventEmitter<void> = new EventEmitter<void>();
    productForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
        this.productForm = this.formBuilder.group({});
    }

    ngOnInit() {}

    openDialog() {
        const dialogRef = this.dialog.open(CreateProductFormComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            this.productCreated.emit();
        });
    }
}
