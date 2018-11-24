import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataManagementRoutingModule } from './data-management-routing.module';
import { DataManagementComponent } from './data-management.component';
import { MatIconModule, MatButtonModule } from '@angular/material';
import { AngularMaterialModule } from '../../angular-material.module';

// const angularMaterialModules = [// Import AngularMaterialModule
//   MatIconModule,
//   MatButtonModule
// ];

@NgModule({
  declarations: [DataManagementComponent],
  imports: [
    CommonModule,
    DataManagementRoutingModule,
    AngularMaterialModule
  ]
})
export class DataManagementModule { }
