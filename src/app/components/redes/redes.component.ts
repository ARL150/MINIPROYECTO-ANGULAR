import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-redes',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule, NgIf],
  templateUrl: './redes.component.html',
  styleUrl: './redes.component.css'
})
export class RedesComponent {

}



