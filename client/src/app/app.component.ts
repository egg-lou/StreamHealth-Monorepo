import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AxiosService } from './services/axios.service';
import { Title } from '@angular/platform-browser';
import { MasterComponent } from './layout/master/master.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MasterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
    title = 'Stream Health';

    data: string[] = [];

    constructor(
        private axiosService: AxiosService,
        private titleService: Title
    ) {}

    ngOnInit(): void {
        this.titleService.setTitle(this.title);
        this.axiosService
            .request('GET', '/api/v1', {})
            .then(response => {
                this.data = response.data;
            })
            .finally(() => {
                console.log('Request completed: ', this.data);
            });
    }
}
