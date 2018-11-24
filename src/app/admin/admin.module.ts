import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DataManagementComponent } from './data-management/data-management.component';


const modules = [
  CommonModule,
  AdminRoutingModule
];

@NgModule({
  imports: [...modules]
})
export class AdminModule {}
