import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-tipo-categoria-form',
  templateUrl: './tipo-categoria-form.component.html',
  styleUrls: ['./tipo-categoria-form.component.css']
})
export class TipoCategoriaFormComponent implements OnInit {

  aumentarTipo: string;
  buttonValido: boolean;
  formCategoria: FormGroup;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formCategoria = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', [Validators.required]),
    tipo: new FormArray([])
    });

    this.buttonValido = false;
  }

  anadirTipo() {
    (this.formCategoria.controls['tipo'] as FormArray).push(new FormGroup({
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required)
    }));
  }

  eliminarTipo(index: number) {
    (this.formCategoria.controls['tipo'] as FormArray).removeAt(index);
  }

}
