import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { FooterComponent } from './components/footer/footer.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { RedesComponent } from './components/redes/redes.component';
import { ResponsablesComponent } from './components/responsables/responsables.component';
import { MatCardModule } from '@angular/material/card';
import { VideoCardsComponent } from './components/video-cards/video-cards.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CarruselComponent, 
    FooterComponent, RouterModule, UbicacionComponent, NosotrosComponent, 
    ServiciosComponent, RedesComponent,ResponsablesComponent, MatCardModule, 
    VideoCardsComponent, EjerciciosComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practicaLibreria';
}
