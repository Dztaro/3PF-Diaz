import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../../alumno.model';

@Component({
  selector: 'app-alumno-form',
  standalone: false,
  templateUrl: './alumno-form.component.html',
  styleUrl: './alumno-form.component.scss'
})
export class AlumnoFormComponent implements OnInit {
  alumnoForm!: FormGroup;
  id: string | null = null
  modoEdicion = false;

  constructor(
    private fb: FormBuilder,
    private alumnosService: AlumnosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      curso: ['', Validators.required],
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.modoEdicion = true;
      const alumno = this.alumnosService.getAlumnoPorId(Number(this.id));
      if (alumno) {
        this.alumnoForm.patchValue(alumno);
      }
    }
  }


  guardar(): void {
    if (this.alumnoForm.invalid) return;

    const nuevoAlumno: Alumno = {
      id: this.id ? Number(this.id) : Date.now(),
      ...this.alumnoForm.value,
    };

    if (this.modoEdicion) {
      this.alumnosService.agregarAlumno(nuevoAlumno);
    } else {
      this.alumnosService.agregarAlumno(nuevoAlumno);
    }

    this.router.navigate(['/alumnos']);
  }
}