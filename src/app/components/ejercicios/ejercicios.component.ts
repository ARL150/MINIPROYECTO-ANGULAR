import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatTableModule, MatCardModule],
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.css']
})
export class EjerciciosComponent implements OnInit {
  datosPorParte: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://gym-proyecto.free.beeceptor.com/todos').subscribe(data => {
      this.datosPorParte = data.cuerpo; // ya viene agrupado por parte
    });
  }

  columnas: string[] = ['nombre', 'series', 'repeticiones', 'equipo'];
}
