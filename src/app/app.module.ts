import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { MainComponent } from './main/main.component';
import { AdminModule } from './admin/admin.module';
import { MainLayoutComponent } from './shared/components/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    MainComponent,
    InfoPageComponent
  ],
  imports: [
    AdminModule,
    MaterialModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularYandexMapsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
