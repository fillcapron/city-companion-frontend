import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

const material = [
  MatFormFieldModule,
  MatMenuModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatOptionModule,
  MatSelectModule,
  MatListModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTooltipModule
];

@NgModule({
  imports: [...material],
  exports: [...material]
})
export class MaterialModule { }
