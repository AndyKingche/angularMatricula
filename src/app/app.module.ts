import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProvinciaFromComponent } from './components/provincia-from/provincia-from.component';
import { ProvinciaListComponent } from './components/provincia-list/provincia-list.component';

import {ProvinciaService} from './services/provincia.service';
import { CantonesFormComponent } from './components/cantones-form/cantones-form.component';
import { CantonesListComponent } from './components/cantones-list/cantones-list.component';
import { MateriasFormComponent } from './components/materias-form/materias-form.component';
import { MateriasListComponent } from './components/materias-list/materias-list.component';
import { ProfesoresFormComponent } from './components/profesores-form/profesores-form.component';
import { ProfesoresListComponent } from './components/profesores-list/profesores-list.component';
import { MatriculaFormComponent } from './components/matricula-form/matricula-form.component';
import { MatriculaListComponent } from './components/matricula-list/matricula-list.component';
import { AlumnosFormComponent } from './components/alumnos-form/alumnos-form.component';
import { AlumnosListComponent } from './components/alumnos-list/alumnos-list.component';
import { TipoCategoriaFormComponent } from './components/tipo-categoria-form/tipo-categoria-form.component';
import { TipoCategoriaListComponent } from './components/tipo-categoria-list/tipo-categoria-list.component';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProvinciaFromComponent,
    ProvinciaListComponent,
    CantonesFormComponent,
    CantonesListComponent,
    MateriasFormComponent,
    MateriasListComponent,
    ProfesoresFormComponent,
    ProfesoresListComponent,
    MatriculaFormComponent,
    MatriculaListComponent,
    AlumnosFormComponent,
    AlumnosListComponent,
    TipoCategoriaFormComponent,
    TipoCategoriaListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelect2Module
  ],
  providers: [ProvinciaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
