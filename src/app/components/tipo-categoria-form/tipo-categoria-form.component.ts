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

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.formCategoria = this.fb.group({
    nombre: '',
    descripcion: '',
    tipo: this.fb.array([])
    });
  }

  anadirTipo() {
    (this.formCategoria.controls['tipo'] as FormArray).push(this.fb.group({
      nombre: '',
      descripcion: ''
    }));
  }

  eliminarTipo(index: number) {
    (this.formCategoria.controls['tipo'] as FormArray).removeAt(index);
  }

  saveNewCategoria() {
    let categorias: Categoria = Object.assign({}, this.formCategoria.value);
    console.table(categorias);
    this.categoriaService.saveCategoria(categorias).subscribe(res => {
    },err=>console.error(err));
  }
}
