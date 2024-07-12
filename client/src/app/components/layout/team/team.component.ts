import { Component } from '@angular/core';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'app-team',
    standalone: true,
    imports: [ProfileCardComponent, NgForOf],
    templateUrl: './team.component.html',
    styleUrl: './team.component.css',
})
export class TeamComponent {
    members = [
        {
            name: 'Jedd Eishen Aguilar',
            imgUrl: '../assets/members/Aguilar.png',
            profession: 'Researcher',
            imgHeight: '78.9%',
        },
        {
            name: 'Fionna Coralde',
            imgUrl: '../assets/members/Coralde.png',
            profession: 'UI/UX Designer',
            imgHeight: '78.9%',
        },
        {
            name: 'Jessica Erasmo',
            imgUrl: '../assets/members/Erasmo.png',
            profession: 'Frontend Engineer',
            imgHeight: '84.9%',
        },
        {
            name: 'Rafael Louie Miguel',
            imgUrl: '../assets/members/Miguel.png',
            profession: 'Backend Engineer',
            imgHeight: '77.3%',
        },
        {
            name: 'Maria Claire Reyes',
            imgUrl: '../assets/members/Reyes.png',
            profession: 'Frontend Engineer',
            imgHeight: '79.5%',
        },
    ];
}
