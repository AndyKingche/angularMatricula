import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { TipoService } from '../../services/tipo.service';
import { Tipo } from '../../models/Tipo'


@Component({
  selector: 'app-tipo-categoria-form',
  templateUrl: './tipo-categoria-form.component.html',
  styleUrls: ['./tipo-categoria-form.component.css']
})
export class TipoCategoriaFormComponent implements OnInit {
  @HostBinding('class') clasess ='row';

  aumentarTipo: string;
  buttonValido: boolean;
  formCategoria: FormGroup;

  categoria: Categoria ={
    id: 0,
    nombre: '',
    descripcion: '',
    tipo:[{nombre:'',descripcion:''}]
  };

  
  constructor(private categoriaService: CategoriaService, private tipoService: TipoService) { }

  ngOnInit() {
    this.formCategoria = new FormGroup({
    nombre: new FormControl(),
    descripcion: new FormControl(),
    tipo: new FormArray([]),
    });


  }

  anadirTipo() {
    (this.formCategoria.controls['tipo'] as FormArray).push(new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required)
    }));
  
    
  }
  eliminarTipo(index: number) {
    (this.formCategoria.controls['tipo'] as FormArray).removeAt(index);
  }

  saveNewCategoria() {
    
    
  }
  
}
