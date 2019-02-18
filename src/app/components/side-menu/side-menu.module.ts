import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '../../angular-material.module';
// TODO: are these modules necessary, as all or some are imported by AngularMaterialModule?
import { MatListModule, MatIconModule, MatButtonModule, MatInputModule, MatCheckboxModule } from '@angular/material';

import { SideMenuComponent, SideMenuItemComponent } from './side-menu.component';

const routes: Routes = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    /* Those as the angular components used in this component. Do not uncomment this.
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,*/
    RouterModule.forChild(routes),
  ],
  exports: [SideMenuComponent],
  declarations: [ SideMenuComponent]
})
export class SideMenuModule { }
