import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableGeneratedColumnsAddress } from './dashboard/address/address.component';
import { TableGeneratedColumnsCategories } from './dashboard/categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableGeneratedColumnsPlaces } from './dashboard/places/places.component';
import { TableGeneratedColumnsUsers } from './dashboard/users/users.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './shared/components/layout/admin-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

const childRoutes: Routes = [
    { path: 'Категории', component: TableGeneratedColumnsCategories },
    { path: 'Пользователи', component: TableGeneratedColumnsUsers },
    { path: 'Места', component: TableGeneratedColumnsPlaces },
    { path: 'Адреса', component: TableGeneratedColumnsAddress }
];

const adminRoutes: Routes = [{
    path: 'admin', component: AdminLayoutComponent, children: [
        { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: childRoutes },
        { path: '**', redirectTo: '/admin/login' }
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
