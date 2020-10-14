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

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProvinciaFromComponent,
    ProvinciaListComponent,
    CantonesFormComponent,
    CantonesListComponent,
    MateriasFormComponent,
    MateriasListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProvinciaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
