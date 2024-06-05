import { Component } from '@angular/core';
import { HeroComponent } from '../../components/layout/hero/hero.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { WhatWeOfferComponent } from '../../components/layout/what-we-offer/what-we-offer.component';
import { TeamComponent } from '../../components/layout/team/team.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        HeroComponent,
        FooterComponent,
        WhatWeOfferComponent,
        TeamComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent {}
