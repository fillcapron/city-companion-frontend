import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListPageModule } from './list-page/list-page.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { MainComponent } from './main/main.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout.component';
import { CarouselComponent } from './shared/components/carousel/carousel.component';
import { ReviewsDialogModule } from './shared/components/reviews-dialog/reviews-dialog.module';
import { LoaderModule } from './shared/components/loader/loader.module';
import { RatingModule } from './shared/components/rating/rating.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainComponent,
    InfoPageComponent,
    CarouselComponent,
  ],
  imports: [
    AdminModule,
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularYandexMapsModule,
    HttpClientModule,
    ListPageModule,
    ReviewsDialogModule,
    LoaderModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
