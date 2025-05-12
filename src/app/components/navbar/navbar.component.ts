import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnInit {
  mostrarMenuUsuario: boolean = false;
  usuarioActual: string | null = null;

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @ViewChild('menuToggle') menuToggle!: ElementRef;

  constructor(private authService: AuthServiceService) {}  

  ngOnInit() {
    this.usuarioActual = localStorage.getItem('usuarioActual');

    this.authService.usuarioActual$.subscribe(usuario => {
      this.usuarioActual = usuario;
    });
  }


  ngAfterViewInit(): void {}

  toggleMenuUsuario(): void {
    this.mostrarMenuUsuario = !this.mostrarMenuUsuario;
  }

  toggleMenu() {
    const menu = this.sideMenu.nativeElement as HTMLElement;
    const toggle = this.menuToggle.nativeElement as HTMLElement;

    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      toggle.style.display = 'flex';
    } else {
      menu.classList.add('active');
      toggle.style.display = 'none';
    }
  }

  cerrarSesion() {
    this.authService.logout(); 
  }
}
