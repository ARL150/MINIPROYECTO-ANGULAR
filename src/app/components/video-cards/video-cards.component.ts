import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-video-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, SafeUrlPipe],
  templateUrl: './video-cards.component.html',
  styleUrls: ['./video-cards.component.scss']
})
export class VideoCardsComponent implements OnChanges {
  @Input() parte: string = '';

  videoIds: string[] = [
    'UglCbW0bmEw?si=kS0sVhqsQmqmHi9L',
    'KXnOryN4ENc?si=N8Xihz3SpbOdYmwK',
    'i1PzWkmY7gQ?si=0bvnYhzR_3puqxhz',
    'wzIsWDRQmVs?si=EsIV-f4Yjb-oyb3S',
    'YB6PwKTnKnw?si=ljeSm1ddRxD0EZwM',
    'nHtypUjIB-A?si=nc4io85oFCS3RiPG'
  ];

  partesDelCuerpo: string[] = ['pecho', 'espalda', 'piernas', 'hombros', 'brazos', 'abdomen'];

  visibilidadVideos: boolean[] = [];
  mostrarTodos: boolean = true;

  constructor() {
    this.visibilidadVideos = this.videoIds.map(() => true);
  }

  ngOnChanges(): void {
    if (this.parte) {
      this.mostrarUnSoloVideo(this.parte);
    }
  }

  toggleTodosVideos(): void {
    this.mostrarTodos = !this.mostrarTodos;
    this.visibilidadVideos = this.videoIds.map(() => this.mostrarTodos);
  }

  mostrarUnSoloVideo(parte: string): void {
    const indice = this.partesDelCuerpo.findIndex(p => p.toLowerCase() === parte.toLowerCase());
    if (indice !== -1) {
      this.visibilidadVideos = this.videoIds.map((_, i) => i === indice);
    }
  }
}
