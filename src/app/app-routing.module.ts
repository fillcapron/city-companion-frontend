import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { ListPageComponent } from './list-page/list-page.component';
import { MainLayoutComponent } from './shared/components/layout/main-layout.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: MainComponent },
      { path: 'place/:id', component: InfoPageComponent },
      { path: 'categories/:name', component: ListPageComponent },
      { path: 'search/:name', component: SearchPageComponent},
      { path: '**', redirectTo: '/' }
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
