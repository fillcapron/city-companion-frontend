import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";
import { MaterialModule } from "../material.module";
import { AUTH_API_URL } from "./admin-injection-tokens";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AdminLayoutComponent } from "./shared/components/layout/admin-layout.component";
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from "./shared/services/auth.service";
import { AuthGuard } from "./shared/guards/auth.guard";
import { AdminRoutingModule } from "./admin-routing.module";
import { MenuListItemComponent } from "./shared/components/menu/menu-list-item.component";
import { PlacesModule } from "./dashboard/places/places.module";
import { AddressModule } from "./dashboard/address/address.module";
import { CategoriesModule } from "./dashboard/categories/categories.module";
import { UsersModule } from "./dashboard/users/users.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

export function tokenGetter() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
} 

@NgModule(
    {
        imports: [
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            BrowserAnimationsModule,
            MaterialModule,
            AdminRoutingModule,
            PlacesModule,
            AddressModule,
            CategoriesModule,
            UsersModule,
            JwtModule.forRoot({
                config: {
                    tokenGetter,
                }
            })
        ],
        declarations: [
            AdminLayoutComponent,
            DashboardComponent,
            LoginComponent,
            MenuListItemComponent
        ],
        providers: [
            {
                provide: AUTH_API_URL,
                useValue: environment.authApi
            },
            AuthGuard
        ],
        exports: [RouterModule]
    }
)
export class AdminModule { }