import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogClose } from '@angular/material/dialog';
import { QuantityDialogComponent } from '../../dialogs/quantity-dialog/quantity-dialog.component';
import { FormControl, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';

@Component({
    selector: 'app-pos-container',
    standalone: true,
  imports: [
    NgForOf,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogClose,
    NgIf,
    NgClass,
    MatIcon,
    FormsModule,
  ],
    templateUrl: './pos-container.component.html',
    styleUrl: './pos-container.component.css',
})
export class PosContainerComponent  {
  page: number = 1;
  totalPages: number = 0;
  isLastPage: boolean = false;
  pages: number[] = [];
  products: any[] = [];
  totalAmount: number = 0;
  cartItems: any[] = [];
  quantityControl = new FormControl('');

  payload = {
    clientName: "",
    totalAmount: 0,
    paymentMethod: "",
    discountType: "",
    discountPercentage: 0,
    products: this.cartItems.map(item => ({
      productId: item.product.productId,
      quantitySold: item.quantity
    }))
  };

  constructor(
    private apiService: ApiService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts(searchValue: string = '', page: number = this.page) {
    this.apiService.getAllProducts(searchValue, page - 1).then(data => {
      this.products = data.content;
      this.totalPages = data.totalPages;
      this.isLastPage = data.last;
      this.pages = Array.from(
        { length: Math.min(5, this.totalPages) },
        (_, i) => i + 1
      );
      this.changeDetectorRefs.detectChanges();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.fetchProducts(filterValue, this.page);
  }

  submitTransaction() {
    if (this.payload.clientName === "" ||
      this.payload.totalAmount === 0 ||
      this.payload.paymentMethod === "" ||
      this.payload.discountType === "" ||
      this.payload.products.length === 0) {
      this.snackBar.open('Please fill up all fields', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      this.resetCart();
      return;
    }

    this.apiService.addSale(this.payload).then(response => {
      let status = response === 200 || response === 201 ? 'success' : 'error';
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Transaction successful',
          status: status
        }
      });
      this.resetCart();
    }).catch(error => {
      this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'Error creating transaction: ' + error.message,
          status: 'error'
        }
      });
    })
  }

openAddQuantityDialog(product: any) {
  const dialogRef = this.dialog.open(QuantityDialogComponent, {
    width: '250px',
    data: { product }
  });

  if (dialogRef) {
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result > product.productStock) {
          this.snackBar.open('Quantity inputted is greater than the product stock', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
          return;
        }

        const existingCartItem = this.cartItems.find(item => item.product.productId === product.productId);

        if (existingCartItem) {
          if (existingCartItem.quantity + result > product.productStock) {
            this.snackBar.open('Total quantity is greater than the product stock', 'Close', {
              duration: 3000,
              verticalPosition: 'top'
            });
            return;
          }

          existingCartItem.quantity += result;
        } else {
          this.cartItems.push({
            product,
            quantity: result
          });
        }
        this.recalculateTotalAmount();
        this.updateCartList()
      }
    });
  }
}

removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.recalculateTotalAmount()
  this.updateCartList()
}

resetCart() {
    this.cartItems = [];
    this.totalAmount = 0;
    this.payload.totalAmount = 0;
    this.payload.discountPercentage = 0;
    this.payload.products = [];
}

clearCartItems() {
    this.cartItems = [];
}

recalculateTotalAmount() {
  this.totalAmount = this.cartItems.reduce((total, item) => {
    return total + (item.product.productPrice * item.quantity);
  }, 0);
  this.payload.totalAmount = parseFloat((this.totalAmount * (1 - this.payload.discountPercentage)).toFixed(2));
}

updateCartList() {
    this.payload.products = this.cartItems.map(item => ({
      productId: item.product.productId,
      quantitySold: item.quantity
    }));
}

applyDiscount() {
  let discountPercentage: number;
  switch (this.payload.discountType) {
    case 'PWD':
      discountPercentage = 0.20;
      break;
    case 'SENIOR':
      discountPercentage = 0.20;
      break;
    default:
      discountPercentage = 0;
  }
  this.payload.discountPercentage = discountPercentage;
  this.recalculateTotalAmount();
}

  nextPage() {
    if (!this.isLastPage) {
      this.page++;
      this.fetchProducts( '',this.page);
    }
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.fetchProducts('', this.page);
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchProducts('', this.page);
    }
  }

}
