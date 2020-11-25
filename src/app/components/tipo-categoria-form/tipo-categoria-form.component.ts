import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-tipo-categoria-form',
  templateUrl: './tipo-categoria-form.component.html',
  styleUrls: ['./tipo-categoria-form.component.css']
})
export class TipoCategoriaFormComponent implements OnInit {

  aumentarTipo: string;
  buttonValido: boolean;
  formCategoria: FormGroup;

  categoria: Categoria ={
    id: 0,
    nombre: '',
    descripcion: '',
    tipo: []
  };
  

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.formCategoria = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
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

  saveNewCategoria() {
    this.categoriaService.saveCategoria(this.categoria).subscribe(
      res => {
        this.categoria.nombre = '',
        this.categoria.descripcion = '',
        this.categoria.tipo = []
      }
    )
  }

}
