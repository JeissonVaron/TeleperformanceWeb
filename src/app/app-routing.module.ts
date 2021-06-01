import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { ValidateCompanyNitComponent } from './Components/validate-company-nit/validate-company-nit.component';
const routes: Routes = [
    { path: '', redirectTo: '/validate-company-nit', pathMatch: 'full'},
    { path: "validate-company-nit", component: ValidateCompanyNitComponent},
    { path: "register", component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }