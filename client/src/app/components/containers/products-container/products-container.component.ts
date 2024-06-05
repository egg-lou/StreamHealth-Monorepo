import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { CreateProductComponent } from '../../buttons/create-product/create-product.component';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { Product } from '../../../models/product';
import { UpdateProductComponent } from '../../forms/update-product/update-product.component';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-products-container',
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatHeaderRowDef,
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        CreateProductComponent,
        MatIcon,
        MatIconButton,
        NgForOf,
        NgClass,
    ],
    templateUrl: './products-container.component.html',
    styleUrl: './products-container.component.css',
})
export class ProductsContainerComponent {
    dataSource: any = [];
    page: number = 1;
    pageSize: number = 5;
    totalElements: number = 0;
    totalPages: number = 0;
    isLastPage: boolean = false;
    pages: number[] = [];

    displayedColumns: string[] = [
        'productName',
        'productDescription',
        'productPrice',
        'productStock',
        'Action',
    ];
    constructor(
        private apiService: ApiService,
        private changeDetectorRefs: ChangeDetectorRef,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        this.fetchProducts();
    }

    fetchProducts(searchValue: string = '', page: number = this.page) {
        this.apiService.getAllProducts(searchValue, page - 1).then(data => {
            this.totalPages = data.totalPages;
            this.isLastPage = data.last;
            this.dataSource = data.content;
            this.pages = Array.from(
                { length: Math.min(5, this.totalPages) },
                (_, i) => i + 1
            );
            this.changeDetectorRefs.detectChanges();
        });
    }

    nextPage() {
        if (!this.isLastPage) {
            this.page++;
            this.fetchProducts('', this.page);
        }
    }

    previousPage() {
        if (this.page > 1) {
            this.page--;
            this.fetchProducts('', this.page);
        }
    }

    updateProduct(product: Product) {
        const dialogRef = this.dialog.open(UpdateProductComponent, {
            data: product,
            width: '500px',
        });

        dialogRef.componentInstance.productUpdate.subscribe(() => {
            this.page = 1;
            this.fetchProducts('', this.page);
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response) {
                this.page = 1;
                this.fetchProducts('', this.page);
            }
        });
    }

    deleteProduct(id: number, name: string) {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            width: '450px',
            height: '200px',
            data: { name: 'Product ' + name, title: 'Delete Product' },
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response) {
                this.apiService
                    .deleteProduct(id)
                    .then(() => {
                        this.page = 1;
                        this.fetchProducts('', this.page);
                        this.dialog.open(MessageDialogComponent, {
                            data: {
                                message: 'Product deleted successfully',
                                status: 'success',
                            },
                        });
                    })
                    .catch(err => {
                        this.dialog.open(MessageDialogComponent, {
                            data: {
                                message:
                                    'Error deleting product: ' + err.message,
                                status: 'error',
                            },
                        });
                    });
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.page = 1;
        this.fetchProducts(filterValue, this.page);
    }

    goToPage(pageNumber: number) {
        this.page = pageNumber;
        this.fetchProducts('', this.page);
    }
}
