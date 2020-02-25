import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectProfileDetailsComponent } from './project-profile-details/project-profile-details.component';
import { ProjectProfileEditComponent } from './project-profile-edit/project-profile-edit.component';
import { ProjectsRoutingModule } from './projects-routing.module';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectProfileDetailsComponent,
    ProjectProfileEditComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }

