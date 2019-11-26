import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './pokemon/results/results.component';
import { HomeComponent } from './pokemon/home/home.component';



const APPROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'results', component: ResultsComponent },
    { path: '**', component: HomeComponent },
];

export const APP_ROUTES = RouterModule.forRoot( APPROUTES);