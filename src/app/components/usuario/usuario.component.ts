import { Component, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class FormComponent implements OnInit {
  cuentaForm: FormGroup;
  mensaje: string = '';
  usuarioActual: string | null = null;
  hoy: string = '';
  horaMin = '06:00';
  horaMax = '23:00';

  checkboxValues = [false, false, false]; // Para sesiones 1, 2, 3
  sesionesSeleccionadas: number[] = [];   // Guardará los valores elegidos

actualizarSesiones() {
  // Limpiamos las sesiones seleccionadas
  this.sesionesSeleccionadas = [];
// En tu componente (por ejemplo, en Angular)
this.resumen.sesiones = 10; // O el valor adecuado, asegúrate de que no sea un booleano
    this.resumen.sesiones = this.checkboxValues.filter(value => value).length;

  // Iteramos sobre los valores de los checkboxes
  this.checkboxValues.forEach((valor, index) => {
    if (valor) {
      // Si el checkbox está marcado, agregamos su valor (index + 1) a sesionesSeleccionadas
      this.sesionesSeleccionadas.push(index + 1);
    }
  });

  // Verificamos si hay más de una sesión seleccionada
  if (this.sesionesSeleccionadas.length > 1) {
    Swal.fire({
      icon: 'warning',
      title: 'Máximo una sesión',
      text: 'Solo puedes seleccionar una sesión.',
      confirmButtonColor: '#d33'
    });

    // Restablecemos los valores de los checkboxes
    this.checkboxValues = [false, false, false];
    this.sesionesSeleccionadas = []; // Limpiamos la selección

  } else if (this.sesionesSeleccionadas.length === 1) {
    // Si solo hay una sesión seleccionada, lo guardamos correctamente
    this.checkboxValues = [false, false, false]; // Reseteamos
    this.checkboxValues[this.sesionesSeleccionadas[0] - 1] = true; // Marcamos el checkbox correspondiente
  }
  
  // Almacenamos los valores en localStorage
  localStorage.setItem('sesionesSeleccionadas', JSON.stringify(this.sesionesSeleccionadas));
}

  
  admins = [
    { usuario: 'abraham', contrasena: '123' },
    { usuario: 'pepe', contrasena: '123' },
    { usuario: 'luis', contrasena: '123' }
  ];

  @ViewChild('formTemplate') formTemplate!: NgForm;

  constructor(private fb: FormBuilder, private router: Router) {
  this.cuentaForm = this.fb.group({
    nombre: ['', Validators.required],
    usuario: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required]
  });

  // Recuperamos los datos de la última sesión guardada
  const ultimaSesion = localStorage.getItem('ultimaSesion');
  if (ultimaSesion) {
    const datos = JSON.parse(ultimaSesion);
    this.resumen = datos; // Asignamos los datos al resumen

    // Asignar los valores recuperados al formulario
    this.formTemplate.setValue({
      nombre: datos.nombre,
      usuario: datos.usuario,
      hora: datos.hora,
      sesiones: datos.sesiones
    });

    // Aseguramos que el resumen se vea si se ha recuperado una sesión
    this.resumenVisible = true;
  }
}

ngAfterViewInit() {
  const ultimaSesion = localStorage.getItem('ultimaSesion');
  if (ultimaSesion && this.formTemplate) {
    const datos = JSON.parse(ultimaSesion);
    this.resumen = datos;
    this.formTemplate.setValue({
      nombre: datos.nombre,
      usuario: datos.usuario,
      hora: datos.hora,
      sesiones: datos.sesiones
    });
    this.resumenVisible = true;
  }
}


  ngOnInit() {
  const hoy = new Date();
  this.hoy = hoy.toISOString().split('T')[0]; // YYYY-MM-DD
  // Verificamos si el usuario está logueado
  this.usuarioActual = localStorage.getItem('usuarioActual');
  if (this.usuarioActual) {
    // Intentamos cargar los datos de la última sesión agendada desde localStorage
    const savedSession = localStorage.getItem('formTemplateData');
    if (savedSession) {
      this.resumen = JSON.parse(savedSession);
      this.resumenVisible = true; // Mostramos automáticamente el resumen
    }
    
    // Recuperamos las sesiones seleccionadas desde localStorage
    const sesionesGuardadas = localStorage.getItem('sesionesSeleccionadas');
    if (sesionesGuardadas) {
      this.sesionesSeleccionadas = JSON.parse(sesionesGuardadas);
      this.checkboxValues = [false, false, false];
      this.sesionesSeleccionadas.forEach(sesion => {
        this.checkboxValues[sesion - 1] = true;
      });
    }
  }
}



actualizarHoraSegunDia(fecha: string) {
  const dia = new Date(fecha).getDay(); // 0: Domingo, ..., 6: Sábado

  if (dia === 6) {
    // Sábado
    this.horaMax = '14:00';
  } else if (dia >= 1 && dia <= 5) {
    // Lunes a Viernes
    this.horaMax = '23:00';
  } else {
    // Domingo
    this.horaMin = '';
    this.horaMax = '';
  }
}


validarDia(event: any) {
  const fecha = new Date(event.target.value);
  const dia = fecha.getDay();

  if (dia === 0) {
    this.mensaje = "El gimnasio no abre los domingos. Elige otro día.";
    event.target.value = '';
  } else {
    this.mensaje = '';
    this.actualizarHoraSegunDia(event.target.value);
  }
}



guardar() {
  if (this.cuentaForm.valid) {
    const { usuario, contrasena } = this.cuentaForm.value;

    const adminValido = this.admins.some(
      admin => admin.usuario === usuario && admin.contrasena === contrasena
    );

    if (adminValido) {
      localStorage.setItem('usuarioActual', usuario);
      this.usuarioActual = usuario;
      this.mostrarFormularioTemplate = true; // Mostrar el formulario de agendar sesión

      Swal.fire({
        icon: 'success',
        title: '¡Usuario registrado!',
        text: `Bienvenido ${usuario}`,
        confirmButtonColor: '#3085d6'
      });

      this.cuentaForm.reset();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Usuario inválido',
        text: 'El usuario o contraseña no son correctos',
        confirmButtonColor: '#d33'
      });
    }
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor llena todos los campos',
      confirmButtonColor: '#d33'
    });
  }
}

  
  guardarTemplate(form: NgForm) {
  if (form.valid) {
    // Guardar los datos en el localStorage
    const datosFormulario = {
      nombre: form.value.nombre,
      usuario: form.value.usuario,
      hora: form.value.hora,
      sesiones: form.value.sesiones
    };
    
    localStorage.setItem('ultimaSesion', JSON.stringify(datosFormulario)); // Guardamos en el localStorage

    Swal.fire({
      icon: 'success',
      title: 'Formulario enviado (Template)',
      text: `Usuario: ${form.value.usuario}`,
      confirmButtonColor: '#3085d6'
    });

    form.reset(); // Limpiar formulario
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Formulario incompleto',
      text: 'Por favor, llena todos los campos del formulario por template.',
      confirmButtonColor: '#d33'
    });
  }
}

editarSesion() {
  if (this.resumen) {
    this.mostrarFormularioTemplate = true;
    setTimeout(() => {
      this.formTemplate.setValue({
        nombre: this.resumen.nombre,
        usuario: this.resumen.usuario,
        hora: this.resumen.hora,
        sesiones: this.resumen.sesiones
      });
    });
    Swal.fire({
      icon: 'info',
      title: 'Editar sesión',
      text: 'Puedes modificar los datos y volver a guardarlos.',
      confirmButtonColor: '#3085d6'
    });
  }
}


eliminarSesion() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará la sesión guardada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('ultimaSesion');
      this.resumen = {};
      this.resumenVisible = false;
      Swal.fire('Eliminado', 'La sesión ha sido eliminada.', 'success');
    }
  });
}


  cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('formTemplateData');  
    this.usuarioActual = null;
    this.resumenVisible = false;
    

    Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      confirmButtonColor: '#3085d6'
    });

    this.router.navigate(['titulo-container']);  // Redirige a la ruta de login
  }

  resumenVisible = false;
  resumen: any = {};

  mostrarResumen() {
    if (this.formTemplate.valid) {
      this.resumenVisible = !this.resumenVisible;
  
      if (this.resumenVisible) {
        this.resumen = {
          nombre: this.formTemplate.value.nombre,
          usuario: this.formTemplate.value.usuario,
          hora: this.formTemplate.value.hora,
          sesiones: this.formTemplate.value.sesiones
        };
      }
    } else {
      this.resumenVisible = false;
  
      // SweetAlert en lugar de alert()
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonColor: '#ff6f00',
        background: '#fff',
        color: '#000'
      });
    }
  }

  mostrarFormularioTemplate: boolean = false;


  mostrarAlerta(mensaje: string) {
    let icono: 'success' | 'warning' | 'info' = 'info';
  
    if (mensaje.includes('correctamente')) {
      icono = 'success';
    } else if (mensaje.includes('Por favor')) {
      icono = 'warning';
    }
  
    Swal.fire({
      title: mensaje.includes('correctamente') ? '¡Éxito!' : 'Atención',
      text: mensaje,
      icon: icono,
      confirmButtonColor: '#ff6f00',
      background: '#000',
      color: '#fff'
    });
  }
  
}
