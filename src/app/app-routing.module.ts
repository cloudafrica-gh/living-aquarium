import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ReportsexpenseComponent } from './reports/reportsexpense/reportsexpense.component';
import { ReportsmainComponent } from './reports/reportsmain/reportsmain.component';
import { ReportsinvoiceComponent } from './reports/reportsinvoice/reportsinvoice.component';
import { DafabetComponent } from './reports/dafabet/dafabet.component';
import { UsersComponent } from './users/users.component';
import { MyPondsComponent } from './ponds/myponds.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientProfileDetailsComponent } from './clients/client-profile-details/client-profile-details.component';
import { ClientProfileEditComponent } from './clients/client-profile-edit/client-profile-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'reports', component: ReportsmainComponent, children: [
      { path: '', redirectTo: 'dafabet', pathMatch: 'full' },
      { path: 'la', component: DafabetComponent },
      { path: 'myponds', component: MyPondsComponent },
      { path: 'expense-reports', component: ReportsexpenseComponent },
      { path: 'invoice-reports', component: ReportsinvoiceComponent }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'ponds',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'allponds', component: ClientComponent },
  { path: 'clients/edit', component: ClientDetailsComponent },
  { path: 'clients/profile/details', component: ClientProfileDetailsComponent },
  { path: 'clients/profile/edit', component: ClientProfileEditComponent },
  { path: 'allusers', component: UsersComponent },
  { path: 'myponds', component: MyPondsComponent },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
