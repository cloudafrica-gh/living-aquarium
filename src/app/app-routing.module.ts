import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {ReportsexpenseComponent} from './reports/reportsexpense/reportsexpense.component';
import {ReportsmainComponent} from './reports/reportsmain/reportsmain.component';
import {ReportsinvoiceComponent} from './reports/reportsinvoice/reportsinvoice.component';
import {DafabetComponent} from './reports/dafabet/dafabet.component';
import { UsersComponent } from './users/users.component';
import { MyPondsComponent } from './ponds/myponds.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'reports', component: ReportsmainComponent, children: [
      {path: '', redirectTo: 'dafabet', pathMatch: 'full'},
      {path: 'la', component: DafabetComponent},
      {path: 'myponds', component: MyPondsComponent, canActivate: [AuthGuard]},
      {path: 'expense-reports', component: ReportsexpenseComponent},
      {path: 'invoice-reports', component: ReportsinvoiceComponent}
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ponds',
    loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {path: 'myponds', component: MyPondsComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
