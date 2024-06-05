import { Component, EventEmitter, Output } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [MatDrawer, MatDrawerContainer, MatIcon, MatIconButton],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
    @Output() profileClick = new EventEmitter<void>();
    @Output() productsClick = new EventEmitter<void>();
    @Output() posClick = new EventEmitter<void>();
    @Output() salesClick = new EventEmitter<void>();
    selectedButton: string;

    constructor() {
        this.selectedButton = '';
    }

    onButtonClick(button: string, eventEmitter: EventEmitter<void>) {
        eventEmitter.emit();
        console.log(`${button} clicked`);
        this.selectedButton = button;
    }
}
