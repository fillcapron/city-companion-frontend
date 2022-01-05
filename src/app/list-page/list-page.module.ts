import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageComponent } from './list-page.component';
import { MaterialModule } from '../material.module';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { PluralDirective } from '../shared/directives/plural.directive';
import { FilterPipe } from '../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { RatingModule } from '../shared/components/rating/rating.module';
@NgModule({
  declarations: [
    ListPageComponent,
    PluralDirective,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AngularYandexMapsModule,
    FormsModule,
    RatingModule  
  ]
})
export class ListPageModule { }
