import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasesService } from '../../../../core/services/clases.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Clase } from '../../clases.model';

@Component({
  selector: 'app-clase-form',
  standalone: false,
  templateUrl: './clase-form.component.html',
  styleUrl: './clase-form.component.scss'
})
export class ClaseFormComponent implements OnInit {

  claseForm!: FormGroup;
  idClase!: number | null;

  constructor(
    private fb: FormBuilder,
    private clasesService: ClasesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idClase = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

    const clase = this.idClase
      ? this.clasesService.obtenerClasePorId(this.idClase)
      : { nombre: '', horario: '' };

    this.claseForm = this.fb.group({
      nombre: [clase?.nombre || '', Validators.required],
      horario: [clase?.horario || '', Validators.required]
    });
  }

  guardar(): void {
    const claseData: Clase = this.claseForm.value;

    if (this.idClase !== null) {
      this.clasesService.editarClase(this.idClase, claseData);
    } else {
      this.clasesService.agregarClase(claseData);
    }

    this.router.navigate(['/clases']);
  }

}
