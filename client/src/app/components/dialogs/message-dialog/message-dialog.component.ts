import { Component, Inject, Input } from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogRef,
} from '@angular/material/dialog';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-message-dialog',
    standalone: true,
    imports: [
        MatDialogContent,
        NgClass,
        MatDialogActions,
        MatButton,
        MatIconModule,
        NgIf,
        NgStyle,
    ],
    templateUrl: './message-dialog.component.html',
    styleUrl: './message-dialog.component.css',
})
export class MessageDialogComponent {
    @Input() message: string = '';
    @Input() status: string = '';

    constructor(
        public dialogRef: MatDialogRef<MessageDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.message = data.message;
        this.status = data.status;
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
