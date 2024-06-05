import { Component, Inject } from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe, NgForOf } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-print-transaction',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    NgForOf,
    DatePipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatButton,
  ],
  templateUrl: './print-transaction.component.html',
  styleUrl: './print-transaction.component.css'
})
export class PrintTransactionComponent {
  printData: any;
  transactionId: string = '';
  cashierName: string = '';
  clientName: string = '';
  discountType: string = '';
  paymentMethod: string = '';
  products: any[] = [];
  transactionDate: string = '';
  totalAmount: number = 0;
  displayedColumns: string[] = ['productName', 'quantitySold'];


  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.printData = data.transaction;
    this.transactionId = this.printData.transactionId;
    this.cashierName = this.printData.cashier.name;
    this.clientName = this.printData.clientName;
    this.discountType = this.printData.discountType;
    this.paymentMethod = this.printData.paymentMethod;
    this.products = this.printData.products;
    this.transactionDate = this.printData.transactionDate;
    this.totalAmount = this.printData.totalAmount;
  }

  downloadAsPDF() {
    const doc = new jsPDF();
    doc.setFont('Poppins');
    doc.setTextColor(100);

    const columnCount = 2; // Number of columns in the table
    const padding = 3; // Padding for each cell
    const cellWidth = 50; // Width of each cell
    const tableWidth = columnCount * (cellWidth + (2 * padding));
    const pageWidth = doc.internal.pageSize.getWidth();
    const leftMargin = (pageWidth - tableWidth) / 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    const title = "STREAMHEALTH";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (pageWidth - titleWidth) / 2;
    const subTitle = "Transaction Receipt";
    const subTitleWidth = doc.getTextWidth(subTitle);
    const subTitleX = (pageWidth - subTitleWidth) / 2;
    const formatedDate = new DatePipe('en-US').transform(this.transactionDate, 'medium');

    doc.setFontSize(16);
    doc.text(title, titleX, 20)
    doc.text(subTitle, subTitleX, 30)

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${this.transactionId}`, 15, 50);
    doc.text('Date: ' + formatedDate, 15, 60);
    doc.text(`Cashier: ${this.cashierName}`, 15, 80);
    doc.text(`Client: ${this.clientName}`, 15, 70);
    doc.text(`Discount Type: ${this.discountType}`, 15, 90);
    doc.text(`Payment Method: ${this.paymentMethod}`, 15, 100);
    doc.text(`Total Amount: ${this.totalAmount}`, 15, 110);

    autoTable(doc, {
      head: [['Product Name', 'Quantity Sold']],
      body: this.products.map(product => [product.productName, product.quantitySold]),
      startY: 120,
      theme: 'plain',
      styles: {
        cellPadding: padding,
        fontSize: 10,
        font: 'Poppins',
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      },
      margin: { left: 15 }
    });

    doc.save(`transaction-${this.transactionId}-${formatedDate}.pdf`);
  }
}
