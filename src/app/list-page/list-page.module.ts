import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page.component';
import { MaterialModule } from '../material.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { PluralDirective } from '../shared/directives/plural.directive';

@NgModule({
  declarations: [
    ListPageComponent,
    PluralDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularYandexMapsModule
  ]
})
export class ListPageModule { }
