import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';
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
import { MatIcon } from '@angular/material/icon';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { Transaction } from '../../../models/transaction';
import { UpdateTransactionComponent } from '../../forms/update-transaction/update-transaction.component';
import { PrintTransactionComponent } from '../../dialogs/print-transaction/print-transaction.component';

@Component({
    selector: 'app-profile-container',
    standalone: true,
  imports: [
    MatSlideToggle,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButton,
    NgIf,
    MatTable,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    NgForOf,
    MatIcon,
    MatIconButton,
    DatePipe,
    NgClass,
  ],
    providers: [
        provideNativeDateAdapter(),
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'YYYY-MM-DD',
                },
                display: {
                    dateInput: 'YYYY-MM-DD',
                    monthYearLabel: 'MMM YYYY',
                    dateA11yLabel: 'LL',
                    monthYearA11yLabel: 'MMMM YYYY',
                },
            },
        },
    ],
    templateUrl: './profile-container.component.html',
    styleUrl: './profile-container.component.css',
})
export class ProfileContainerComponent {
    dataSource: any = [];
    page: number = 1;
    totalPages: number = 0;
    isLastPage: boolean = false;
    pages: number[] = [];
    profileName: string = '';
    totalSalesToday: string = '';
    filterByCashier: boolean = false;
    filterByDate: string = '';
    searchId: string = '';

    displayedColumns: string[] = [
        'transactionId',
        'clientName',
        'products',
        'transactionDate',
        'paymentMethod',
        'totalAmount',
        'discountType',
        'discountPercentage',
        'cashier',
        'action',
    ];

    constructor(
        private apiService: ApiService,
        private changeDetectorRef: ChangeDetectorRef,
        public dialog: MatDialog
    ) {}

    getProfile() {
        this.apiService.getProfile().then(response => {
            this.profileName = response.data.name;
            this.totalSalesToday = parseFloat(
                response.data.totalSalesToday
            ).toFixed(2);
        });
    }

    fetchTransactions(
        filterByCashier: boolean = this.filterByCashier,
        page: number = this.page,
        searchId: string = '',
        dateFilter: string = ''
    ) {
        this.apiService
            .getSales(filterByCashier, searchId, dateFilter, page - 1)
            .then(data => {
                this.dataSource = data.content;
                this.totalPages = data.totalPages;
                this.isLastPage = data.last;
                console.log(this.dataSource);
                this.pages = Array.from(
                    { length: this.totalPages },
                    (_, i) => i + 1
                );
                this.changeDetectorRef.detectChanges();
            });
    }

    ngOnInit() {
        this.getProfile();
        this.fetchTransactions();
    }

    searchFilter(event: Event) {
       const searchId = (event.target as HTMLInputElement).value;
       this.page = 1;
       this.fetchTransactions(this.filterByCashier, this.page, searchId);
    }

    applyFilterByCashier(value: boolean) {
        this.filterByCashier = value;
        this.page = 1;
        this.fetchTransactions(this.filterByCashier, this.page);
    }

  applyFilterDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      let date = event.value;
      let utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      this.filterByDate = utcDate.toISOString().split('T')[0];
      this.page = 1;
      this.fetchTransactions(this.filterByCashier, this.page, '', this.filterByDate);
    } else {
      console.log('Date is null');
    }
  }

    resetFilters() {
        this.filterByCashier = false;
        this.filterByDate = '';
        this.searchId = '';
        this.fetchTransactions(false, 1, '', '');
    }

  nextPage() {
    if (!this.isLastPage) {
      this.page++;
      this.fetchTransactions(this.filterByCashier, this.page);
    }
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.fetchTransactions(this.filterByCashier, this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchTransactions(this.filterByCashier, this.page);
    }
  }

  updateTransaction(transaction: Transaction) {
      const  dialogRef = this.dialog.open(UpdateTransactionComponent, {
        width: '800px',
        data: transaction,
      });

      dialogRef.componentInstance.transactionUpdate.subscribe(() => {
        this.page = 1;
        this.fetchTransactions(this.filterByCashier, this.page);
      });

      dialogRef.afterClosed().subscribe(response => {
        if (response) {
          this.page = 1;
          this.fetchTransactions(this.filterByCashier, this.page);
        }
      });
  }

    deleteTransaction(id: number) {
        const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            width: '450px',
            height: '200px',
            data: { name: 'Transaction ' + id, title: 'Delete Transaction' },
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response) {
                this.apiService
                  .deleteSale(id)
                    .then(() => {
                        this.page = 1;
                        this.fetchTransactions(this.filterByCashier, this.page);
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

    printTransaction(transactionId: number) {
        this.apiService.getSale(transactionId).then(response => {
          console.log(response);
          this.dialog.open(PrintTransactionComponent, {
            data: {
              width: '800px',
              transaction: response
            }
          });
        });
    }
}
