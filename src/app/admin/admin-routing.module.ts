import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
// import { UserComponent } from './user/user.component';
// import { DataManagementComponent } from './data-management/data-management.component';
// import { ApiManagementComponent } from './api-management/api-management.component';
// import { AuthManagementComponent } from './auth-management/auth-management.component';
import { ListMenusComponent } from './site-navigation/list-menus/list-menus.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule, MatButtonModule, MatIconModule } from '@angular/material';
import { AngularMaterialModule } from '../angular-material.module';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'site-navigation',
    loadChildren: './site-navigation/site-navigation.module#SiteNavigationModule'
  },
  {
    path: 'data-management',
    loadChildren: './data-management/data-management.module#DataManagementModule'
  },
  // {
  //   path: 'admin/api-management',
  //   component: ApiManagementComponent
  // },
  // {
  //   path: 'admin/auth-management',
  //   component: AuthManagementComponent
  // }
];

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminComponent,
    // DataManagementComponent,
    // ApiManagementComponent,
    // AuthManagementComponent
]
})
export class AdminRoutingModule {}
