import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layout/header/header.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';

@Component({
    selector: 'app-master',
    standalone: true,
    imports: [HeaderComponent, FooterComponent],
    templateUrl: './master.component.html',
    styleUrl: './master.component.css',
})
export class MasterComponent {}
