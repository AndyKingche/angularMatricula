import { Component, HostBinding, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Tipo } from 'src/app/models/Tipo';

@Component({
  selector: 'app-tipo-categoria-form',
  templateUrl: './tipo-categoria-form.component.html',
  styleUrls: ['./tipo-categoria-form.component.css']
})
export class TipoCategoriaFormComponent implements OnInit {
  tipo_categoria: Categoria={
    id: 0,
    nombre: '',
    descripcion: '',
    tipo: []
  };
  aumentarTipo: string;
  buttonValido: boolean;

  constructor() { }

  ngOnInit() {
    this.buttonValido = false;
  }

  obtenerValor(valor: string, id: number) {
    if (valor.length == 0){
      this.buttonValido = true;
    } else {
      this.buttonValido = false;
    }
    console.log('este es el valor', this.tipo_categoria.tipo[id],"id " + id);
  }

  tipoAumentar() {
    this.buttonValido = true;
    this.tipo_categoria.tipo.push('');
  }

}
