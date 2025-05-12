import { Routes } from '@angular/router';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';  
import { FormComponent } from './components/usuario/usuario.component';
import { CarruselComponent } from './components/carrusel/carrusel.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ResponsablesComponent } from './components/responsables/responsables.component';
import { VideoCardsComponent } from './components/video-cards/video-cards.component';
import { RedesComponent } from './components/redes/redes.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { FooterComponent } from './components/footer/footer.component';
import { EjerciciosComponent } from './components/ejercicios/ejercicios.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },  
    { path: 'ubicacion', component: UbicacionComponent},
    { path: 'carrusel', component: CarruselComponent},  
    { path: 'servicio', component: ServiciosComponent},
    { path: 'responsables', component: ResponsablesComponent},
    { path: 'form', component: FormComponent },  
    { path: 'redes/:id', component: RedesComponent},  
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'ejercicios', component: EjerciciosComponent},
    { path: 'videos', component: VideoCardsComponent},
];